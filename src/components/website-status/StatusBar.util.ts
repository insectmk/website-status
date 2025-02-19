import { formatTimestamp } from '../../utils/uptime-robot-param-util.ts'

/**
 * 获取日期，今天转为今天，其他转为yyyy-MM-dd字符串
 * @param datetime 时间戳
 */
export const getDateOrToday = (datetime: number): string => {
  const date = new Date(datetime)
  date.setHours(0, 0, 0, 0)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  if (date.getTime() === now.getTime()) {
    return '今天'
  }
  return formatTimestamp(date.getTime())
}
