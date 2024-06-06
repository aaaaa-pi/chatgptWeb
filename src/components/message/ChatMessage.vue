<template>
  <div class="chatMessageBox" :class="changeMessageClass(messageClassName, true)">
    <div
      :class="changeMessageClass(messageClassName)"
      :style="{ width: 'fit-content', 'padding-top': '8px' }"
    >
      <a-avatar :style="{ backgroundColor: '#3370ff' }">
        <icon-user />
      </a-avatar>
    </div>
    <div class="textContent">
      <div
        :style="{ width: 'fit-content', color: '#ccc' }"
        :class="changeMessageClass(messageClassName)"
      >
        <span class="user">{{ name }}</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { IconUser } from '@arco-design/web-vue/es/icon'
import { defineProps } from 'vue'
const props = defineProps({
  name: String,
  messageClassName: String
})
const { name, messageClassName } = props

const changeMessageClass = (messageClassName, direction = false) => {
  const isBot = messageClassName === 'botMessage' ? true : false
  if (direction) {
    if (isBot) {
      return ['left', 'row']
    } else {
      return ['right', 'rowReverse']
    }
  }
  return isBot ? 'left' : 'right'
}
</script>

<style scoped>
.chatMessageBox {
  display: flex;
  flex-direction: row;
  max-width: 100%;
}
.row {
  flex-direction: row;
}
.rowReverse {
  flex-direction: row-reverse;
}
/* 消息气泡样式 */
.textContent {
  flex: 1;
}

.left {
  margin-right: auto; /* 机器人消息靠左 */
  margin-left: 10px;
}
.right {
  margin-left: auto; /* 用户消息靠右 */
  margin-right: 10px;
}
</style>
