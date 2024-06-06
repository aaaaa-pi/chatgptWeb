class SSEService {
  constructor(url) {
    this.url = url
    this.eventSource = null
  }

  // 初始化并启动SSE连接
  connect(messageHandler) {
    // 确保未建立其他连接
    if (this.eventSource) {
      console.log('已有一个活动的连接，先关闭它.')
      this.disconnect()
    }

    // 创建新的EventSource
    this.eventSource = new EventSource(this.url)

    // 设置消息处理器
    this.eventSource.onmessage = messageHandler

    // 处理可能的错误
    this.eventSource.onerror = (error) => {
      console.error('SSE 连接错误: ', error)
      this.disconnect() // 出错时断开连接
    }

    console.log('SSE 连接已建立.')
  }

  // 断开SSE连接
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
      console.log('SSE 连接已关闭.')
    }
  }
}

// 导出SSEService实例
export default SSEService
