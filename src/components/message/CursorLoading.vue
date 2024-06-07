<template>
  <p :class="typeClass"></p>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'
import { defineProps } from 'vue'
const props = defineProps({
  loading: Boolean
})
const { loading } = toRefs(props)

let typeClass = ref(['typing'])

watch(loading, (newValue) => {
  if (!newValue) {
    if (!typeClass.value.includes('finished')) {
      typeClass.value.push('finished')
    }
  }
})
</script>

<style scoped>
.typing {
  display: inline-block;
  color: var(--color-text-1);
  letter-spacing: 0.15em;
  position: relative; /* 设置为相对定位使得伪元素可以相对于它定位 */
}

/* 使用伪元素来创建动态光标效果 */
.typing::after {
  content: '';
  display: inline-block;
  width: 0.15em; /* 光标的宽度 */
  height: 1.5em; /* 光标的高度，可以根据需要调整 */
  background-color: #0a65cc;

  animation: blink-caret 0.75s step-end infinite; /* 应用光标闪烁动画 */
  vertical-align: bottom; /* 确保光标与文字基线对齐 */
}

/* 文字输出完毕后的光标效果 */
.typing.finished {
  display: none;
}

@keyframes blink-caret {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
