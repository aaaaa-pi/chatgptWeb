<template>
  <div id="sider">
    <h2 class="title">Prompt</h2>
    <div class="content">
      <textarea
        id="prompt-text-area"
        cols="4"
        rows="20"
        class="semi-input-textarea"
        placeholder="请填写提示词优化chatgpt"
      ></textarea>
    </div>
  </div>
</template>

<script setup></script>

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
