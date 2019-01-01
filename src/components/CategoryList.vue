<template>
    <el-table
        :data="dataList"
        stripe
        style="width: 100%">
        <el-table-column
        prop="id"
        label="ID"
        width="180">
        </el-table-column>
        <el-table-column
        prop="type"
        label="描述">
        </el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CategoryList',
    data() {
        return {
            dataList: ''
        }
    },
    created() {
        axios.get('/api/base').then(res => {
            this.dataList = res.data
        })
    }
}
</script>
