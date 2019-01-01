<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu 
        :default-openeds="[defaultOpens]"
        :default-active="activePath"
        unique-opened
        router
    >
      <el-submenu index="user">
        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="/user/list">用户列表</el-menu-item>
          <el-menu-item index="/user/create">用户添加</el-menu-item>
          <el-menu-item index="/user/update">信息修改</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="category">
        <template slot="title"><i class="el-icon-menu"></i>基础管理</template>
        <el-menu-item-group>
          <el-menu-item index="/category/list">基础列表</el-menu-item>
          <el-menu-item index="/category/update">基础编辑</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-tickets"></i>记录管理</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">记录列表</el-menu-item>
          <el-menu-item index="3-2">记录添加</el-menu-item>
          <el-menu-item index="3-3">记录编辑</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-view"></i>统计管理</template>
        <el-menu-item-group>
          <el-menu-item index="4-1">统计列表</el-menu-item>
          <el-menu-item index="4-2">个人账单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
    name: 'Navigate',
    data() {
        return {
            
        }
    },
    computed: {
        defaultOpens () {
            let { groups: { path } } = /^\/(?<path>.*)\//.exec(this.$route.path)
            return path
        },
        activePath () {
            return this.$route.path;
        }
    }
}
</script>

<style>
  .el-header {
    background-color: #96c1f9;
    color: #fff;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-submenu{
      border-bottom: 1px solid #f2f2f2;
  }
  .el-menu-item-group__title{
    border-bottom: 1px solid #f2f2f2;
    padding: 0 0 0 40px !important;
  }
</style>


