/**
 * UptimeRobot API 接口参数
 * https://uptimerobot.com/api/
 */
export interface UptimeRobotApiParams {
  api_key: string // API密钥
  custom_uptime_ranges?: string // 状态范围集合_表示从开始到结束，-表示分割，如 1731513600_1731600000-1731427200_1731513600
  format?: string // 如：json
  log_types?: string // 如：1-2
  logs?: number // 1
  logs_start_date?: number // 开始时间戳
  logs_end_date?: number // 结束时间戳
}

/**
 * UptimeRobot API 接口返回值
 * https://uptimerobot.com/api/
 */
export interface UptimeRobotApiResponse {
  monitors: Monitor[]
}
export interface Monitor {
  // 网站监控内容
  id: number
  friendly_name: string
  create_datetime: number //创建时间
  interval: number //监控间隔时间
  url: string
  status: number
  custom_uptime_ranges: string
  logs: Log[]
}
export interface Log {
  // 网站日志
  id: number
  type: number
  datetime: number
  duration: number
  reason: Reason
}
interface Reason {
  // 日志详情
  code: string
  detail: string
}
/**
 * 返回状态
 */
export interface Status {
  code: number
  status: 'ok' | 'down' | 'unknown'
  statusText: string
}
/**
 * 网站日期范围详细信息
 */
export interface StatusRangeInfo {
  status: Status // 状态
  startDate: number
  endDate: number
  uptime: number // 可用率
  downTimes: number // 故障次数
  downDuration: number // 故障持续时间 s
}
