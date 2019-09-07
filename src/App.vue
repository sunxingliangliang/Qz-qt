<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
      <!-- <footerl/> -->
  </div>
</template>

<script>
// import footerl from './view/footer/footerl.vue'
export default {
  // components: {
  //   footerl
  // },
   name: 'App',
    // 提供reload方法
    provide: function () {
      return {
        reload: this.reload
      }
    },
    // isRouterAlive控制显示
    data: function () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      // 刷新方法
      reload: function () {
        this.isRouterAlive = false;
        // 该方法会在dom更新后执行
        this.$nextTick(function () { this.isRouterAlive = true })
      }
    }
}
</script>

<style>
#app {
  font-family: PingFangSC-Medium;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
