export default {
  // 显示标题
  siteName: 'InsectMk的在线状态',
  /*
   * API接口地址：
   * UptimeRobot官方默认（限制1分钟10次请求）：https://api.uptimerobot.com/v2/getMonitors
   * 本项目（1分钟缓存）https://status-api.insectmk.top/
   * */
  apiUrl: 'https://status-api.insectmk.top/',
  // UptimeRobot Api Keys
  // 支持 Monitor-Specific 和 Read-Only
  apiKeys: [
    'm796898704-62232b37a9720e349d2fa99a', // Hexo个人博客-Butterfly API key
    'm796898728-84b880951ab38555d1bdffa1', // Hexo个人博客-安知鱼 API key
    'm797287553-9e8e66f9568794e101f6b0dd', // memos一款隐私优先的轻量级笔记服务 API key
    'm796898733-6d12c54f9e46ab8c902a1f45', // Waline评论服务端 API key
    'm796905159-14864e22acaeb74c564f722b', // 静态资源网站 API key
    'm796898840-8fc99da36433dffa2151b5be' // InsectMk的在线状态 API key
  ],
  // 日志天数
  countDays: 30,
  // 是否显示检测站点的链接
  showLink: true,
  // 是否正序显示状态，旧数据->新数据
  oldToNew: true
}
