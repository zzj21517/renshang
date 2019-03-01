<template>
  <section class="app-main">
    <!-- <transition name="fade-transition" mode="out-in">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <transition name="fade-transition" mode="out-in">
      <keep-alive>
        <router-view class="child-view" v-if="$route.meta.keepAlive"></router-view> 
      </keep-alive>
    </transition> -->
    <router-view></router-view>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      // key() {
      //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      // }
    }
  }
</script>

<style scoped>
  .app-main {
    min-height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
    padding: 20px;
  }
</style>