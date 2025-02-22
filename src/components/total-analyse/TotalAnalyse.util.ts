import type { Monitor } from '../../types/uptime-robot-type.ts'
import type { WebInfo } from '../website-status/WebsiteCard.util.ts'
import { getWebInfo } from '../website-status/WebsiteCard.util.ts'
import systemConfig from '../../config/system-config.ts'
import { formatDuration } from '../../utils/date-util.ts'

/**
 * 获取最弱网站信息
 * @param webInfo
 */
export const getMostUnstableWebsiteMsg = (webInfo: WebInfo) => {
  let msg: string
  if (webInfo.analyse.downTimes === 0) {
    msg = `什么？最弱的网站也这么强嘛，一次也没挂过？`
  } else {
    msg = `这个哥们儿挂过${webInfo.analyse.downTimes}次，平均可用率低至${webInfo.analyse.avgUptime}%！`
  }
  return msg
}

/**
 * 获取最强网站信息
 * @param webInfo
 */
export const getMostStableWebsiteMsg = (webInfo: WebInfo) => {
  let msg: string
  if (webInfo.analyse.downTimes === 0) {
    msg = `太厉害了！居然一次也没挂过！`
  } else {
    msg = `太厉害！居然只挂过${webInfo.analyse.downTimes}次，平均可用率高达${webInfo.analyse.avgUptime}%！`
  }
  return msg
}

/**
 * 获取故障次数信息
 * @param totalAnalyse
 */
export const getDownTimesMsg = (totalAnalyse: TotalAnalyse) => {
  let msg: string
  if (totalAnalyse.downTimes === 0) {
    msg = '牛逼，怎么做到的！'
  } else {
    msg = `故障持续时间：${formatDuration(totalAnalyse.downDuration)}`
  }
  return msg
}

/**
 * 获取平均可用率信息
 * @param totalAnalyse
 */
export const getAvgUptimeMsg = (totalAnalyse: TotalAnalyse) => {
  let msg: string
  if (totalAnalyse.avgUptime < 50) {
    // 小于50
    msg = '稳定性也太差了吧，赶紧修去！'
  } else if (totalAnalyse.avgUptime < 70) {
    // 小于70
    msg = '能用，还能抢救！'
  } else if (totalAnalyse.avgUptime < 90) {
    // 70~90
    msg = '再多抢救一下！'
  } else if (totalAnalyse.avgUptime < 100) {
    // 90~100
    msg = '还算可以'
  } else {
    // 100
    msg = '你太厉害了！'
  }
  return msg
}

/**
 * 获取在线网站信息
 * @param totalAnalyse
 */
export const getUptimeWebsiteMsg = (totalAnalyse: TotalAnalyse) => {
  let msg: string
  if (totalAnalyse.websiteCount === 0) {
    msg = '关于你的网站，我什么也不知道~'
  } else if (totalAnalyse.websiteCount === totalAnalyse.downWebsiteCount) {
    msg = '洗洗睡吧，全挂了！'
  } else if (totalAnalyse.downWebsiteCount === 0) {
    msg = '太棒了，一个都没有挂！'
  } else {
    msg = '不错，只挂了一部分，还有挽救的的机会。'
  }
  return msg
}

/**
 * 获取可用率该使用的原色
 * @param uptime 可用率
 */
export const getAvgUptimeColor = (uptime: number): string => {
  if (uptime < 70) {
    // 小于70
    return '#f56c6c'
  } else if (uptime < 90) {
    // 70~90
    return '#e6a23c'
  } else {
    // 大于90
    return '#5cb87a'
  }
}

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
  // 监控网站数量
  totalAnalyse.websiteCount = webInfos.length
  // 故障网站数量
  totalAnalyse.downTimes = webInfos.reduce((downTimes, webInfo) => {
    return downTimes + (webInfo.analyse.downTimes || 0)
  }, 0)
  // 所有网站信息
  totalAnalyse.webInfos = webInfos
  return totalAnalyse
}

/**
 * 全局分析类：分析所有网站的监控信息
 */
export class TotalAnalyse {
  private _webInfos: WebInfo[] // 网站信息
  private _days: number // 统计天数
  private _websiteCount: number // 监控网站数量
  private _downWebsiteCount: number // 故障网站数
  private _downTimes: number // 故障次数
  private _downDuration: number // 故障持续时间
  private _avgUptime: number // 平均可用率

  constructor()
  constructor(
    webInfos?: WebInfo[],
    days?: number,
    websiteCount?: number,
    downWebsiteCount?: number,
    downTimes?: number,
    downDuration?: number,
    avgUptime?: number
  ) {
    this._webInfos = webInfos ?? []
    this._days = days ?? 0
    this._websiteCount = websiteCount ?? 0
    this._downWebsiteCount = downWebsiteCount ?? 0
    this._downTimes = downTimes ?? 0
    this._downDuration = downDuration ?? 0
    this._avgUptime = avgUptime ?? 0
  }

  /**
   * 获取最不稳定的网站信息
   */
  public getMostUnstableWebsite(): WebInfo {
    return this._webInfos.reduce((unstableWebsite, webSite) => {
      return unstableWebsite.analyse.avgUptime < webSite.analyse.avgUptime
        ? unstableWebsite
        : webSite
    })
  }

  /**
   * 获取最稳定的网站信息
   */
  public getMostStableWebsite(): WebInfo {
    return this._webInfos.reduce((stableWebsite, webSite) => {
      return stableWebsite.analyse.avgUptime > webSite.analyse.avgUptime ? stableWebsite : webSite
    })
  }

  get webInfos(): WebInfo[] {
    return this._webInfos
  }

  set webInfos(value: WebInfo[]) {
    this._webInfos = value
  }

  get downWebsiteCount(): number {
    return this._downWebsiteCount
  }

  set downWebsiteCount(value: number) {
    this._downWebsiteCount = value
  }

  get websiteCount(): number {
    return this._websiteCount
  }

  set websiteCount(value: number) {
    this._websiteCount = value
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
