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
                    <span>{{ format_sex(scope.row.sex) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄(岁)" width="80">
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
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'Header',
        data() {
            return {}
        },
        methods: {
            format_sex (sex) {
                switch(sex){
                    case 1:
                        return '男'
                        break
                    case 2:
                        return '女'
                        break
                    default:
                        return '未完善'
                        break
                }
            },
            ...mapActions(['getUserList'])
        },
        filters:{
            formatDate(time){
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
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

