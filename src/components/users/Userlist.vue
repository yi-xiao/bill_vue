<template>
    <el-main>
        <el-table :data="userList">
            <el-table-column prop="id" label="ID" width="60">
            </el-table-column>
            <el-table-column label="头像" width="80">
                <template slot-scope="scope">
                    <img :src="defaultOrigin+scope.row.avatar_info.path" class="user-avatar" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" width="120">
            </el-table-column>
            <el-table-column label="性别" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.sex | formatSex }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄(岁)" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.birth | formatUserAge }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="140">
                <template slot-scope="scope">
                    <span>{{ scope.row.created_at | formatDate }}</span>
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
    import { formatSex, formatUserAge } from '../../../utils/common_utils'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'Header',
        data() {
            return {}
        },
        methods: {
            ...mapActions(['getUserList'])
        },
        filters:{
            formatDate(time){
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            },
            formatSex(sex) {
                return formatSex(sex);
            },
            formatUserAge(birth) {
                return formatUserAge(birth)
            }
        },
        computed: {
            ...mapGetters({
                userList: 'getUserList',
                defaultOrigin: 'getDefaultOrigin'
            })
        },
        created() {
            this.getUserList();
        }
    }
</script>
<style>
    .user-avatar{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>

