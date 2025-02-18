import config from './system'

/**
 * 根据用户时间范围生产uptime robot需要的参数格式
 * 时间戳范围；_表示范围，-表示分割
 */
export const getCustomUptimeRangesStr = (): string => {
  const countDays = config.countDays
  const ranges = []

  // 获取当前日期
  const now = new Date()
  // 设置时间为今天的0点
  now.setHours(0, 0, 0, 0)

  // 循环生成过去 countDays 天每一天的时间范围
  for (let i = 0; i < countDays; i++) {
    // 计算每天的开始时间戳（0点）
    const dayStart = now.getTime() - i * 24 * 60 * 60 * 1000
    // 计算每天结束时间戳（下一天的0点）
    const dayEnd = dayStart + 24 * 60 * 60 * 1000
    // 将时间戳转换为秒并添加到数组
    ranges.push(`${Math.floor(dayStart / 1000)}_${Math.floor(dayEnd / 1000)}`)
  }

  // 将所有时间范围用 '-' 连接起来
  return ranges.join('-')
}
