/**
 * 代码信息
 */
export type CodeInfo = {
  id: string | number // 编码，原
  code: string // 编码，可读
  name: string // 名称
  desc: string // 描述
  type: 'success' | 'danger' | 'warning' // 类型
}

/**
 * UptimeRobot接口日志：type代码含义
 */
export const LOG_TYPE_MAP: Record<number, CodeInfo> = {
  1: {
    id: '1',
    code: 'up',
    name: '上线',
    desc: '监控目标从不可用状态变为可用状态',
    type: 'success',
  },
  2: {
    id: '2',
    code: 'down',
    name: '下线',
    desc: '监控目标从可用状态变为不可用状态',
    type: 'danger',
  },
  99: {
    id: '99',
    code: 'paused',
    name: '暂停',
    desc: '监控目标被手动暂停',
    type: 'warning',
  },
  98: {
    id: '98',
    code: 'started',
    name: '启动',
    desc: '监控目标被手动启动',
    type: 'success',
  },
}

/**
 * UptimeRobot接口日志：reason.code代码含义
 */
export const LOG_REASON_CODE_MAP: Record<string, CodeInfo> = {
  '200': {
    id: '200',
    code: 'http_200',
    name: 'HTTP 200 OK',
    desc: '监控目标返回 HTTP 状态码 200，表示正常',
    type: 'success',
  },
  '404': {
    id: '404',
    code: 'http_404',
    name: 'HTTP 404 Not Found',
    desc: '监控目标返回 HTTP 状态码 404，表示资源未找到',
    type: 'danger',
  },
  '500': {
    id: '500',
    code: 'http_500',
    name: 'HTTP 500 Internal Server Error',
    desc: '监控目标返回 HTTP 状态码 500，表示服务器内部错误',
    type: 'danger',
  },
  '333333': {
    id: '333333',
    code: 'timeout',
    name: '超时',
    desc: '监控目标在指定时间内未响应，导致超时',
    type: 'danger',
  },
  timeout: {
    id: 'timeout',
    code: 'timeout',
    name: '超时',
    desc: '监控目标在指定时间内未响应，导致超时',
    type: 'danger',
  },
  dns: {
    id: 'dns',
    code: 'dns',
    name: 'DNS 解析失败',
    desc: '监控目标的域名无法解析',
    type: 'danger',
  },
  ssl: {
    id: 'ssl',
    code: 'ssl',
    name: 'SSL 证书错误',
    desc: '监控目标的 SSL 证书无效或过期',
    type: 'warning',
  },
  connection: {
    id: 'connection',
    code: 'connection',
    name: '连接失败',
    desc: '无法与监控目标建立连接',
    type: 'danger',
  },
  unknown: {
    id: 'unknown',
    code: 'unknown',
    name: '未知错误',
    desc: '其他未知错误',
    type: 'warning',
  },
}
