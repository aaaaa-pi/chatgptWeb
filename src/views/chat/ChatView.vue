<template>
  <div id="Chat">
    <h2 class="title">Preview</h2>
    <div id="chatBox">
      <a-scrollbar ref="chatScrollbar" style="height: 100%; overflow: auto">
        <div class="groupMessage">
          <div v-for="(msg, index) in messageList" :key="index">
            <ChatMessage
              :name="msg.sender === 'user' ? 'user' : 'bot'"
              :messageClassName="msg.sender === 'user' ? 'userMessage' : 'botMessage'"
            >
              <p v-if="msg.sender === 'user'" :class="['userMessage', 'message']">
                {{ msg.content }}
              </p>
              <div v-else id="botMessage" class="message">
                <p>
                  {{ msg.content ? msg.content : answer }}
                  <CursorLoading :loading="loading" />
                </p>
              </div>
            </ChatMessage>
          </div>
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
          @keydown.enter="onKeydown"
        />
        <a-button type="primary" class="sendButton" @click="sendMessage" :disabled="loading">
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
import { useStore } from 'vuex'
import ChatMessage from '@/components/message/ChatMessage.vue'
import CursorLoading from '@/components/message/CursorLoading.vue'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { ref, computed } from 'vue'

const store = useStore()
let userMessage = ref('')
let queryMessage = ref('')
let answer = ref('')
let messageList = ref([])
let loading = ref(false)
let chatScrollbar = ref()
const prompt = computed(() => store.state.prompt.prompt)

function onKeydown(event) {
  // 检查按下的键是否是回车键且没有按下Shift键
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault() // 阻止回车键的默认换行行为
    sendMessage()
  }
}
function sendMessage() {
  if (userMessage.value) {
    displayMessage('user', userMessage.value)
    loading.value = true
    displayMessage('bot')
    submitChat()
  }
}
function displayMessage(sender, message) {
  if (sender === 'user') {
    const messageItem = {
      id: String(messageList.value.length + 1),
      content: message,
      sender: 'user'
    }
    messageList.value.push(messageItem)
    queryMessage.value = message
    userMessage.value = '' // 清空输入框
  } else {
    const messageItem = {
      id: String(messageList.value.length + 1),
      content: '',
      sender: 'bot'
    }
    messageList.value.push(messageItem)
  }
}
// 提交对话
const submitChat = async () => {
  const ctrl = new AbortController() // 创建AbortController实例，以便中止请求
  await fetchEventSource('http://222.16.24.191:8000/generate-text/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: queryMessage.value,
      systemPrompt: prompt.value
    }),
    openWhenHidden: true, // 取消visibilityChange事件
    signal: ctrl.signal, // AbortSignal
    onmessage(ev) {
      const data = ev.data
      if (data != '{}') {
        answer.value += data
      }
    },
    onclose() {
      if (messageList.value.length > 0 && answer.value) {
        const lastIndex = messageList.value.length - 1
        messageList.value[lastIndex].content = answer.value
        answer.value = ''
      }
      loading.value = false
    },
    onerror(err) {
      if (messageList.value.length > 0) {
        const lastIndex = messageList.value.length - 1
        messageList.value[lastIndex].content = '出错了，请刷新重试！'
        answer.value = ''
      }
      loading.value = false
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
  padding: 8px 8px 8px 28px !important;
  border-bottom: 1px solid #eee;
}
#chatBox {
  flex: 1;
  width: 100%;
  overflow: hidden;
}
::v-deep(.arco-scrollbar-container) {
  display: flex;
  flex-direction: column-reverse;
}
::v-deep(.arco-scrollbar) {
  height: 100%;
}
::v-deep(.arco-scrollbar.arco-scrollbar-type-embed:hover .arco-scrollbar-thumb) {
  opacity: 0;
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
  white-space: pre-wrap;
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
