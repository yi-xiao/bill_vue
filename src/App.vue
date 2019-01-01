<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <el-container style="border: 1px solid #eee" :style="clientHeight">
      <Navigate />
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
              <span>王小虎</span>
              <i class="el-icon-caret-bottom" style="margin-left: 5px"></i>
              <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
              <el-dropdown-item>编辑</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import Navigate from './components/Navigate.vue'

export default {
  name: 'app',
  components: {
    Header,
    Navigate
  },
  computed: {
      clientHeight() {
          console.log(window.innerHeight)
          return `height: ${window.innerHeight}px`;
      },
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
