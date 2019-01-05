<template>
    <el-main>
      <el-table :data="billList">
        <el-table-column prop="id" label="ID" width="60">
        </el-table-column>
        <el-table-column label="头像" width="80">
             <template slot-scope="scope">
                <img :src="defaultOrigin+scope.row.user.avatar_info.path" class="user-avatar" alt="">
            </template>
        </el-table-column>
        <el-table-column prop="user.name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="user.nickName" label="昵称" width="120">
        </el-table-column>
        <el-table-column label="金额 ( 元 )" width="120">
            <template slot-scope="scope">
                {{ scope.row.price/100 }}
            </template>
        </el-table-column>
        <el-table-column prop="category.type" label="类型" width="120">
        </el-table-column>
        <el-table-column label="支付时间" width="140">
            <template slot-scope="scope">
                <span>{{ scope.row.date | formatDate }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="更新时间">
            <template slot-scope="scope">
                <span>{{ scope.row.updated_at | formatDate }}</span>
            </template>
        </el-table-column>
      </el-table>
    </el-main>
</template>
<script>
import { formatDate } from '../../../utils/date'
export default {
    name: 'RecordList',
    data() {
        return {
            defaultOrigin: ''
        }
    },
    created() {
        this.$store.dispatch('getBillList');
        this.defaultOrigin = this.$store.getters.getDefaultOrigin
    },
    computed: {
         billList() {
            return this.$store.getters.getBillList;
         }
    },
    methods: {
       
    },
    filters:{
        formatDate(time){
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
    },
}
</script>

