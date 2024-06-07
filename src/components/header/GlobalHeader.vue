<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu mode="horizontal" :selected-keys="selectedKeys" @menu-item-click="doMenuClick">
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          <component :is="item.meta?.icon"> </component>
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <userAvatar />
    </a-col>
  </a-row>
</template>

<script setup>
import { useRouter } from 'vue-router'
import userAvatar from '@/components/header/userAvatar.vue'
import { routes } from '@/router/routes'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import checkAccess from '@/access/checkAccess'

const store = useStore()
const router = useRouter()

const user = store.state.user
const visibleRoutes = computed(() => {
  const loginUser = user.loginUser
  return routes.filter((item) => {
    if (item.meta?.hideInMenu || item.path === '/user') {
      return false
    }
    return checkAccess(loginUser, item.meta?.access)
  })
})
// 默认主页
const selectedKeys = ref(['/'])

// 路由跳转后，更新选中的菜单项的高亮
router.afterEach((to) => {
  selectedKeys.value = [to.path]
})
const doMenuClick = (key) => {
  if (key === '/') {
    router.push({
      path: '/'
    })
  } else {
    router.push({
      path: key
    })
  }
}

onMounted(() => {
  let currentPath = router.currentRoute.value.path
  selectedKeys.value = [currentPath]
})
</script>

<style scoped>
#globalHeader {
  height: 70px;
}
.title-bar {
  padding-top: 10px;
}

:deep(.arco-menu-horizontal .arco-menu-inner) {
  height: 70px;
  padding: 0px 20px;
}
</style>
