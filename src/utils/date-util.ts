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
 * 将秒数转换为格式化的时间文本，自动包含天数以避免小时数过多。
 *
 * @param seconds - 要转换的秒数
 * @returns 格式化后的时间文本，例如 "2 天 3 小时 45 分 30 秒"
 */
export const formatDuration = (seconds: number): string => {
  if (seconds < 0) {
    throw new Error('秒数不能为负数')
  }

  const timeUnits: { unit: string; seconds: number; plural?: string }[] = [
    { unit: '年', seconds: 31536000 },
    { unit: '天', seconds: 86400 },
    { unit: '小时', seconds: 3600 },
    { unit: '分钟', seconds: 60 },
    { unit: '秒', seconds: 1 },
  ]

  const parts: string[] = []

  for (const { unit, seconds: unitSeconds, plural } of timeUnits) {
    if (seconds >= unitSeconds) {
      const count = Math.floor(seconds / unitSeconds)
      seconds -= count * unitSeconds
      // 根据单位是否定义了复数形式，决定如何添加 "s"
      const unitText = plural ? `${count}${unit}${count !== 1 ? plural : ''}` : `${count}${unit}`
      parts.push(unitText)
    }
  }

  return parts.join('')
}
