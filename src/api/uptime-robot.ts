import { postAction } from './http'
import type { UptimeRobotApiParams, UptimeRobotApiResponse } from '../types/uptime-robot-type'
import { getCustomUptimeReqParam } from '../config/uptime-robot-param-generator'
import system from '../config/system-config'

/**
 * 获取监控内容数据
 */
export const getMonitors = async (
  params: UptimeRobotApiParams
): Promise<UptimeRobotApiResponse> => {
  const axiosResp = await postAction(system.apiUrl, {
    ...getCustomUptimeReqParam(),
    ...params
  })
  return axiosResp.data as UptimeRobotApiResponse
}
