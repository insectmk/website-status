import type { Log } from '../../types/uptime-robot-type.ts'
import { type CodeInfo, LOG_REASON_CODE_MAP, LOG_TYPE_MAP } from '../../constants/uptime-robot.ts'

/**
 * 根据接口返回的Logs数组解析成有用的WebsiteLogs内容
 * @param logs
 */
export const getWebsiteLogs = (logs: Log[]): WebsiteLog[] => {
  const websiteLogs: WebsiteLog[] = []
  logs.forEach(log => websiteLogs.push(new WebsiteLog(log)))
  return websiteLogs
}

/**
 * 日志信息：解析后的日志信息
 */
export class WebsiteLog {
  private _log: Log // 接口返回的日志对象
  private _date: Date // 日志时间
  private _durationTime: number // 持续时间，单位秒
  private _typeCodeInfo: CodeInfo // 日志类型信息
  private _reasonCodeInfo: CodeInfo // 原因编码信息

  constructor(log: Log) {
    this._log = log
    // 解析日志信息到此类中
    this._date = new Date(log.datetime * 1000) // 日志时间
    this._durationTime = log.duration // 持续时间
    this._typeCodeInfo = LOG_TYPE_MAP[log.type] // 日志类型信息
    this._reasonCodeInfo = LOG_REASON_CODE_MAP[log.reason.code] // 原因编码信息
  }

  get date(): Date {
    return this._date
  }

  set date(value: Date) {
    this._date = value
  }

  get durationTime(): number {
    return this._durationTime
  }

  set durationTime(value: number) {
    this._durationTime = value
  }

  get typeCodeInfo(): CodeInfo {
    return this._typeCodeInfo
  }

  set typeCodeInfo(value: CodeInfo) {
    this._typeCodeInfo = value
  }

  get reasonCodeInfo(): CodeInfo {
    return this._reasonCodeInfo
  }

  set reasonCodeInfo(value: CodeInfo) {
    this._reasonCodeInfo = value
  }

  get log(): Log {
    return this._log
  }

  set log(value: Log) {
    this._log = value
  }
}
