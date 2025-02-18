import type { StatusRangeInfo } from '../types/uptime-robot-type'

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
