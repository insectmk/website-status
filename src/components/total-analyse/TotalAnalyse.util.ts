import type { Monitor } from '../../types/uptime-robot-type.ts'
import type { WebInfo } from '../website-status/WebSiteCard.util.ts'
import { getWebInfo } from '../website-status/WebSiteCard.util.ts'
import systemConfig from '../../config/system-config.ts'

/**
 * 获取所有网站的统计信息
 * @param monitors 所有的UptimeRobot网站监控数据
 */
export const getTotalAnalyse = (monitors: Monitor[]): TotalAnalyse => {
  // 获取所有的网站信息
  const webInfos: WebInfo[] = []
  for (const monitor of monitors) {
    webInfos.push(getWebInfo(monitor))
  }
  // 获取所有网站的分析数据
  const totalAnalyse: TotalAnalyse = new TotalAnalyse()
  // 统计天
  totalAnalyse.days = systemConfig.countDays
  // 故障次数
  totalAnalyse.downTimes = webInfos.reduce((sum, webInfo) => {
    return sum + (webInfo.analyse.downTimes || 0) // 如果 downTimes 为 null 或 undefined，则按 0 计算
  }, 0)
  // 故障持续时间
  totalAnalyse.downDuration = webInfos.reduce((sum, webInfo) => {
    return sum + (webInfo.analyse.downDuration || 0) // 如果 downTimes 为 null 或 undefined，则按 0 计算
  }, 0)
  // 平均可用率
  totalAnalyse.avgUptime = parseFloat(
    (webInfos.reduce((avg, webInfo) => avg + (webInfo.analyse.avgUptime || 0), 0) / webInfos.length)
      .toFixed(3)
      .slice(0, -1)
  )
  return totalAnalyse
}

/**
 * 全局分析类：分析所有网站的监控信息
 */
export class TotalAnalyse {
  private _days: number // 统计天数
  private _downTimes: number // 故障次数
  private _downDuration: number // 故障持续时间
  private _avgUptime: number // 平均可用率

  constructor()
  constructor(days?: number, downTimes?: number, downDuration?: number, avgUptime?: number) {
    this._days = days ?? 0
    this._downTimes = downTimes ?? 0
    this._downDuration = downDuration ?? 0
    this._avgUptime = avgUptime ?? 0
  }

  get days(): number {
    return this._days
  }

  set days(value: number) {
    this._days = value
  }

  get downTimes(): number {
    return this._downTimes
  }

  set downTimes(value: number) {
    this._downTimes = value
  }

  get downDuration(): number {
    return this._downDuration
  }

  set downDuration(value: number) {
    this._downDuration = value
  }

  get avgUptime(): number {
    return this._avgUptime
  }

  set avgUptime(value: number) {
    this._avgUptime = value
  }

  /**
   * 将测试内容转为字符串
   */
  toString(): string {
    return ''
  }
}
