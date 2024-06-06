import { fetchEventSource } from '@microsoft/fetch-event-source'

export async function startEventSource(option) {
  try {
    await fetchEventSource('http://222.16.24.191:8000/generate-text/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        query: option.query
      }),
      onmessage(event) {
        console.log('Received message:', event.data)
        // 在这里处理收到的信息
        // 例如，更新UI或调用其他函数处理这些数据
      },
      onopen() {
        console.log('Connection opened')
      },
      onerror(error) {
        console.error('Error:', error)
      }
    }),
      console.log('SSE 连接成功')
  } catch (err) {
    console.err('SSE 连接失败')
  }
}
