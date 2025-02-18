import config from '../config/system-config.ts'
import type { UptimeRobotApiParams } from '../types/uptime-robot-type.ts'
import type { StatusRangeInfo, Status, Log } from '../types/uptime-robot-type.ts'
import { formatDuration } from './date-util.ts'

/**
 * 根据配置获取获取请求参数
 * 根据用户时间范围生产uptime robot需要的参数格式
 * 时间戳范围；_表示范围，-表示分割
 */
export const getCustomUptimeReqParam = (): UptimeRobotApiParams => {
  const countDays = config.countDays
  const ranges = []

  // 获取当前日期
  const now = new Date()
  // 设置时间为今天的0点
  now.setHours(0, 0, 0, 0)

  // 循环生成过去 countDays 天每一天的时间范围
  for (let i = 0; i < countDays; i++) {
    // 计算每天的开始时间戳（0点）
    const dayStart = now.getTime() - i * 24 * 60 * 60 * 1000
    // 计算每天结束时间戳（下一天的0点）
    const dayEnd = dayStart + 24 * 60 * 60 * 1000
    // 将时间戳转换为秒并添加到数组
    ranges.push(`${Math.floor(dayStart / 1000)}_${Math.floor(dayEnd / 1000)}`)
  }

  return {
    custom_uptime_ranges: ranges.join('-'), // 设定网站日志范围,将所有时间范围用 '-' 连接起来
    format: 'json',
    log_types: '1-2',
    logs: 1,
    logs_start_date: (now.getTime() - config.countDays * 24 * 60 * 60 * 1000) / 1000, // 日志开始时间（时间戳，秒为单位）
    logs_end_date: (now.getTime() + 24 * 60 * 60 * 1000) / 1000 // 日志结束时间（时间戳，秒为单位）
  } as UptimeRobotApiParams
}

/**
 * 获取网站的详细日志内容
 * @param uptimeRanges uptime响应的custom_uptime_ranges字段值
 * @param logs uptime响应的logs字段值
 */
export const getStatusRangeInfos = (uptimeRanges: string, logs: Log[]): StatusRangeInfo[] => {
  const result: StatusRangeInfo[] = []
  const countDays = config.countDays
  const uptimeRangesArr: string[] = uptimeRanges.split('-') // 分割可用率
  // 获取当前日期
  const now = new Date()
  // 设置时间为今天的0点
  now.setHours(0, 0, 0, 0)
  // 分析字符串
  for (let i = 0; i < countDays; i++) {
    // 计算每天的开始时间戳（0点）
    const startDate = now.getTime() - i * 24 * 60 * 60 * 1000
    // 计算每天结束时间戳（下一天的0点）
    const endDate = startDate + 24 * 60 * 60 * 1000
    const uptime: number = parseFloat(parseFloat(uptimeRangesArr[i]).toFixed(2)) //获取可用率
    const dayLogs = logs.filter(
      (log) =>
        log.datetime * 1000 >= startDate &&
        log.datetime * 1000 <= endDate &&
        log.reason.code != '200'
    ) // 故障计数
    const downDuration = dayLogs.reduce((accumulator, current) => {
      return accumulator + current.duration
    }, 0) // 故障持续时间
    // 创建当日状态消息
    const status: Status = {} as Status
    if (uptime >= 100) {
      status.status = 'ok'
      status.statusText = `${formatTimestamp(startDate)} 可用率 ${uptime}%`
    } else if (uptime <= 0 && dayLogs.length === 0) {
      status.status = 'none'
      status.statusText = `${formatTimestamp(startDate)} 无数据`
    } else {
      status.status = 'down'
      status.statusText = `${formatTimestamp(startDate)} 故障 ${dayLogs.length} 次，累计 ${formatDuration(downDuration)}，可用率 ${uptime}%`
    }
    // 装载信息
    result.push({
      status,
      startDate,
      endDate,
      uptime,
      downTimes: dayLogs.length, // 故障次数
      downDuration // 故障时间总和，初始为0
    } as StatusRangeInfo)
  }
  // 是否正序
  if (config.oldToNew) {
    result.reverse()
  }
  return result
}

/**
 * 处理时间戳为yyyy-MM-dd格式的内容
 * @param timestamp 时间戳
 */
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp)
  const formatter = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  const parts = formatter.formatToParts(date)
  const year = parts.find((part) => part.type === 'year')!.value
  const month = parts.find((part) => part.type === 'month')!.value
  const day = parts.find((part) => part.type === 'day')!.value
  return `${year}-${month}-${day}`
}
