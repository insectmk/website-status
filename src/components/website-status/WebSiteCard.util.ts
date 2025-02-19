import type { Monitor, Status, StatusRangeInfo } from '../../types/uptime-robot-type.ts'
import { formatDuration } from '../../utils/date-util.ts'
import { getStatus, getStatusRangeInfos } from '../../utils/uptime-robot-param-util.ts'
import systemConfig from '../../config/system-config.ts'

/**
 * 网站分析类
 */
export class WebAnalyse {
  public days: number // 统计天数
  public downTimes: number // 故障次数
  public downDuration: number // 故障持续时间
  public avgUptime: number // 平均可用率

  constructor(days: number, downTimes: number, downDuration: number, avgUptime: number) {
    this.days = days
    this.downTimes = downTimes
    this.downDuration = downDuration
    this.avgUptime = avgUptime
  }

  /**
   * 将测试内容转为字符串
   */
  toString(): string {
    if (this.downTimes > 0) {
      return `最近 ${this.days} 天故障 ${this.downTimes} 次，累计 ${formatDuration(this.downDuration)}，平均可用率 ${this.avgUptime}%`
    } else {
      return `最近 ${this.days} 天可用率 ${this.avgUptime}%`
    }
  }
}

/**
 * 自定义的网站信息，包含uptime monitor内容
 */
export interface WebInfo extends Monitor {
  statusRangeInfos: StatusRangeInfo[] // 时间线详情
  statusInfo: Status // 网站状态
  startTime: number // 监控开始天时间戳
  endTime: number // 监控结束天时间戳
  analyse: WebAnalyse // 网站分析
}

/**
 * 根据网站监控信息，转换为有效数据
 */
export const getWebInfo = (monitor: Monitor): WebInfo => {
  const statusRangeInfos = getStatusRangeInfos(monitor.custom_uptime_ranges, monitor.logs)
  // 装载分析数据
  const analyse = new WebAnalyse(
    systemConfig.countDays, // 总天数
    statusRangeInfos.reduce((downTime, info) => downTime + info.downTimes, 0), // 故障次数
    statusRangeInfos.reduce((downDuration, info) => downDuration + info.downDuration, 0), // 故障持续时间（s）
    parseFloat(
      (statusRangeInfos.reduce((acc, info) => acc + info.uptime, 0) / statusRangeInfos.length)
        .toFixed(3)
        .slice(0, -1)
    )
  ) // 平均可用率
  return {
    // 装载封装数据
    ...monitor, // 复制官方数据
    statusRangeInfos, // 网站时间线信息
    statusInfo: getStatus(monitor.status), // 网站当前状态信息,
    startTime: statusRangeInfos[0].startDate, // 监控开始天时间戳
    endTime: statusRangeInfos.slice(-1)[0].startDate, // 监控结束天时间戳
    analyse // 网站分析
  }
}

/**
 * 故障次数
 */
export const downTimes = (statusRangeInfos: StatusRangeInfo[]): number => {
  return statusRangeInfos.reduce((downTime, info) => downTime + info.downTimes, 0)
}
/**
 * 平均运行状态
 */
export const avgUptime = (statusRangeInfos: StatusRangeInfo[]): number => {
  return parseFloat(
    (statusRangeInfos.reduce((acc, info) => acc + info.uptime, 0) / statusRangeInfos.length)
      .toFixed(3)
      .slice(0, -1)
  )
}
