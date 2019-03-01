<template>
<el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      active-text-color="#409EFF"
      style="height:100%"
    >
      <sidebar-item v-for="route in routers" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
</el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
       'routers',
      'sidebar'
    ]),
    //  routes() {
    //   return global.antRouter
    // },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
