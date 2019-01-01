<template>

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
    
</template>

<script>
export default {
    name: 'Header',
}
</script>


