<template>
  <div id="sider">
    <h2 class="title">Prompt</h2>
    <div class="content">
      <textarea
        id="prompt-text-area"
        cols="4"
        rows="20"
        class="semi-input-textarea"
        v-model="prompt"
        placeholder="请填写提示词优化chatgpt"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import debounce from 'lodash/debounce'
import { useStore } from 'vuex'
const store = useStore()
let prompt = ref('')

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  if (localStorage.getItem('prompt')) {
    prompt.value = localStorage.getItem('prompt')
  }
})
watch(
  () => prompt.value,
  () => debouncedSetPrompt()
)
const setPrompt = () => {
  store.commit('prompt/setPrompt', {
    prompt: prompt.value
  })
}
const debouncedSetPrompt = debounce(setPrompt, 500)
</script>

<style scoped>
#sider {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  padding: 0 16px 16px 28px !important;
  border-bottom: 1px solid #eee;
}
.content {
  padding-left: 16px;
  flex: 1;
}
.semi-input-textarea {
  background-color: transparent;
  border: 0 solid transparent;
  box-shadow: none;
  box-sizing: border-box;
  color: var(--semi-color-text-0);
  cursor: text;
  font-family:
    SF Pro Display,
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    PingFang SC,
    Hiragino Sans GB,
    Microsoft YaHei,
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 14px;
  line-height: 22px;
  outline: none;
  padding: 5px 12px;
  position: relative;
  resize: none;
  vertical-align: bottom;
  width: 100%;
  height: 100%;
}
</style>
