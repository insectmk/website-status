/**
 * 将时间戳转换为 yyyy-MM-dd HH:mm:ss 格式的日期字符串
 * @param timestamp 时间戳（单位：秒或毫秒）
 * @param isMillisecond 是否为毫秒时间戳（默认 false，表示秒时间戳）
 * @returns yyyy-MM-dd HH:mm:ss 格式的日期字符串
 */
export const formatTimestamp = (timestamp: number, isMillisecond: boolean = false): string => {
  // 如果时间戳是秒单位，转换为毫秒
  const msTimestamp = isMillisecond ? timestamp : timestamp * 1000

  // 创建 Date 对象
  const date = new Date(msTimestamp)

  // 提取年、月、日、时、分、秒
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，需要 +1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // 拼接为 yyyy-MM-dd HH:mm:ss 格式
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * 将秒转为文本
 * @param seconds 秒数
 */
export const formatDuration = (seconds: number): string => {
  let s = seconds
  let m = 0
  let h = 0
  if (s >= 60) {
    m = Math.floor(s / 60)
    s = Math.floor(s % 60)
    if (m >= 60) {
      h = Math.floor(m / 60)
      m = Math.floor(m % 60)
    }
  }
  let text = `${s} 秒`
  if (m > 0) text = `${m} 分 ${text}`
  if (h > 0) text = `${h} 小时 ${text}`
  return text
}
