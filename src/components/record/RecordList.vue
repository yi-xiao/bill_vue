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
            <el-table-column prop="category_info.text" label="说明" width="120">
            </el-table-column>
            <el-table-column label="类型" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.category_info.type ? '收入' : '支出' }}</span>
                </template>
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
            <el-table-column
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-main>
</template>
<script>
    import { formatDate } from '../../../utils/date'
    import { mapActions,mapGetters } from 'vuex'

    export default {
        name: 'RecordList',
        data() {
            return {}
        },
        created() {
            this.getRecordList()
        },
        computed: {
            ...mapGetters({
                defaultOrigin: 'getDefaultOrigin',
                billList: 'getRecordList'
            })
        },
        methods: {
            ...mapActions(['getRecordList','removeRecord']),
            handleEdit(data) {
                this.$router.push({
                    // path: '/record/update', 此方式可配合query （地址栏可见参数）
                    name: 'recordUpdate',
                    params: {
                        data
                    }
                })
            },
            handleDelete(id) {
                this.removeRecord({ id })
            }
        },
        filters:{
            formatDate(time){
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        },
    }
</script>

