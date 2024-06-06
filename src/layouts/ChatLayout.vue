<template>
  <div id="chatLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout style="height: calc(100vh - 400px)">
        <a-layout-sider class="sider">
          <SiderView />
        </a-layout-sider>
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import GlobalHeader from '../components/header/GlobalHeader.vue'
import SiderView from '@/views/chat/SiderView.vue'
</script>

<style scoped>
#chatLayout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

#chatLayout .header {
  background-color: var(--color-menu-light-bg);
  position: relative;
}

#chatLayout .content {
  flex: 1;
  height: 100%;
}
#chatLayout .sider {
  flex: 1;
  background: #f7f7fa;
}

:deep(.arco-table-th) {
  background-color: #0a65cc;
  color: #fff;
}
:deep(.arco-table-container) {
  border-bottom: 4px solid #0a65cc;
  padding-bottom: 10px;
}
</style>
