import { postAction } from './http'
import type { UptimeRobotApiParams, UptimeRobotApiResponse } from '../types/uptime-robot-type'
import config from '../config/system'
import type { AxiosResponse } from 'axios'
import { getCustomUptimeRangesStr } from '../config/uptime-robot-param-generator'

/**
 * 监控内容数据
 */
export const getMonitors = (
  params: UptimeRobotApiParams
): Promise<AxiosResponse<UptimeRobotApiResponse>> => {
  // 获取当前日期
  const now = new Date()
  // 设置时间为今天的0点
  now.setHours(0, 0, 0, 0)
  const defaultParam: UptimeRobotApiParams = {
    custom_uptime_ranges: getCustomUptimeRangesStr(), // 设定网站日志范围
    format: 'json',
    log_types: '1-2',
    logs: 1,
    logs_start_date: (now.getTime() - config.countDays * 24 * 60 * 60 * 1000) / 1000, // 日志开始时间（时间戳，秒为单位）
    logs_end_date: (now.getTime() + 24 * 60 * 60 * 1000) / 1000 // 日志结束时间（时间戳，秒为单位）
  } as UptimeRobotApiParams
  return postAction(config.apiUrl, { ...defaultParam, ...params })
}
