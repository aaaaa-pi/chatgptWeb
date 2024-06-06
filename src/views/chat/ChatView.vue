<template>
  <div id="Chat">
    <h2 class="title">Preview</h2>
    <div id="chatBox">
      <a-scrollbar id="chatScrollbar" style="height: 100%; overflow: auto">
        <div v-for="(msg, index) in messageList" :key="index">
          <ChatMessage
            :name="msg.sender === 'user' ? 'username' : 'botname'"
            :messageClassName="msg.sender === 'user' ? 'userMessage' : 'botMessage'"
          >
            <p v-if="msg.sender === 'user'" :class="['userMessage', 'message']">
              {{ msg.content }}
            </p>
            <p v-else id="botMessage" class="message">{{ msg.content }}</p>
          </ChatMessage>
        </div>
      </a-scrollbar>
    </div>
    <div class="chatBottom">
      <div class="bottom-safe-area"></div>
      <div class="chatInput">
        <a-textarea
          id="chatTextarea"
          placeholder="来说点什么吧...（Shift + Enter = 换行)"
          v-model="userMessage"
          :auto-size="{
            minRows: 1,
            maxRows: 5
          }"
          allow-clear
        />
        <a-button type="primary" class="sendButton" @click="sendMessage">
          <icon-send />
        </a-button>
      </div>
      <div class="bottomTip">
        <span>内容由AI生成，无法确保真实准确，仅供参考。</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconSend } from '@arco-design/web-vue/es/icon'
import ChatMessage from '@/components/message/ChatMessage.vue'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { ref, nextTick } from 'vue'

let userMessage = ref('')
let queryMessage = ref('')
let answer = ref('')
let messageList = ref([])

function sendMessage() {
  if (userMessage.value) {
    submitChat(userMessage.value)
    // adjustScroll()
  }
}
// function adjustScroll() {
//   let chatBox = document.getElementById('chatBox')

//   // 滚动到底部以显示新消息
//   chatBox.scrollTop = chatBox.scrollHeight
// }
// 提交对话
const submitChat = async (message) => {
  const messageItem = {
    id: String(messageList.value.length + 1),
    content: message,
    sender: 'user'
  }
  messageList.value.push(messageItem)
  queryMessage.value = message
  userMessage.value = '' // 清空输入框

  const ctrl = new AbortController() // 创建AbortController实例，以便中止请求
  await fetchEventSource('http://222.16.24.191:8000/generate-text/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: queryMessage.value
    }),
    openWhenHidden: true, // 取消visibilityChange事件
    signal: ctrl.signal, // AbortSignal
    async onmessage(ev) {
      const data = ev.data
      if (data != '{}') {
        answer.value += data
      }
      await nextTick()
    },
    onclose() {
      if (answer.value) {
        const messageItem = {
          id: String(messageList.value.length + 1),
          content: answer.value,
          sender: 'bot'
        }
        messageList.value.push(messageItem)
        answer.value = ''
      }
      // loading.value = false
    },
    onerror(err) {
      const messageItem = {
        id: String(messageList.value.length + 1),
        content: '出错了，请重试',
        sender: 'bot'
      }
      messageList.value.push(messageItem)
      // loading.value = false
      ctrl.abort()
      throw err // 直接抛出错误，避免反复调用
    }
  })
}
</script>

<style scoped>
#Chat {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  padding: 0 16px 16px 28px !important;
  border-bottom: 1px solid #eee;
}
#chatBox {
  flex: 1;
  width: 100%;
  overflow: hidden;
}
::v-deep(.arco-scrollbar) {
  height: 100%;
}
.bottom-safe-area {
  padding: 12px;
}

.message {
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  width: fit-content;
  max-width: 80%;
}

.userMessage {
  background-color: #007bff;
  color: white;
  margin-left: auto; /* 用户消息靠右 */
}

#botMessage {
  background-color: #e5e5ea;
  color: black;
  margin-right: auto; /* 机器人消息靠左 */
}

.chatInput {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  padding: 20px 20px 0 20px;
  height: fit-content;
}
.chatInput #chatTextarea {
  overflow-y: hidden;
  resize: none;
  border-radius: 0;
  color: #2e2e38;
  display: flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin: 0;
  outline: none;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  caret-color: #0a65cc;
  margin-right: 5px;
}
.sendButton {
  background: #0a65cc;
}
.bottomTip {
  color: rgba(29, 28, 35, 0.35);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  padding: 8px 24px 16px 24px;
  text-align: center;
  width: 100%;
}
</style>