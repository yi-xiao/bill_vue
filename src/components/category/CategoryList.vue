<template>
<div class="category-container">
    <el-table
        :data="dataList"
        stripe
        style="width: 100%">
        <el-table-column
        type="index"
        label="#"
        width="180">
        </el-table-column>
        <el-table-column
        prop="id"
        label="ID"
        width="180">
        </el-table-column>
        <el-table-column
        prop="type"
        label="描述"
        width="250"
        >
        </el-table-column>
        
        <el-table-column
        label="操作"
        >
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="create-btn" @click="createCategory">
        <i class="el-icon-circle-plus-outline"></i>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
    name: 'CategoryList',
    data() {
        return {
            // dataList: []
        }
    },
    computed: {
         dataList() {
             return this.$store.getters.getTypeList;
         }
    },
    created() {
        // axios.get('/api/base').then(res => {
        //     this.dataList = res.data
        // })
        this.$store.dispatch('getTypeList');
    },
    methods: {
        createCategory() {
            this.$prompt('输入您要新增的类型内容', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '在这里输入内容~',
                inputPattern: /\S+/,
                inputErrorMessage: '内容不能为空哦！'
            }).then(async ({ value }) => {
                const info = {
                    "type": value
                }
                await this.updateCategory(info);
                this.$message({
                    type: 'success',
                    message: '新建成功'
                });
            }).catch(() => {});
        },
        handleClick(data) {
            console.log(data)
            this.$prompt('修改需慎重', '修改进行中', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '在这里输入新的内容~',
                inputValue: data.type,
                inputPattern: /\S+/,
                inputErrorMessage: '内容不能为空哦！'
            }).then(async ({ value }) => {
                const info = {
                    "id": data.id,
                    "type": value
                }
                await this.updateCategory(info);
                this.$message({
                    type: 'success',
                    message: '编辑成功'
                });
            }).catch(() => {});
        },
        handleDelete(data) {
            console.log(data)
            this.$confirm('确定删除该分类吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //todo...
                await this.removeCategory(data);
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            }).catch(() => {});
        },
        ...mapActions(['updateCategory','removeCategory'])
    }
}
</script>
<style>
    .create-btn{
        position: fixed;
        right: 30px;
        bottom: 80px;
        font-size: 60px;
        border-radius: 50%;
        color: #3bb3c2;
        cursor: pointer;
    }
    .create-btn:hover{
        color: #117f8d;
    }
</style>
