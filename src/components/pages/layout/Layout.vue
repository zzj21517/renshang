<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <top/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain ,Top} from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  created(){
    console.log(this.$router.options.routes)
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Top
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import "src/styles/mixin.scss";
 .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    top:0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    top:60px;
    margin-left: 180px;
    position: relative;
  }
    .sidebar-container {
    transition: width 0.28s;
    width: 180px !important;
    height:100%;
    position:fixed;
    font-size: 0px;
    border-right: 1px solid #e6e6e6;
    top:60px;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    //reset element-ui css
    }
</style>
