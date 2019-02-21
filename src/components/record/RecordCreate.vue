<template>
    <div class="update-form-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户">
                <el-select v-model="userValue" placeholder="请选择">
                    <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支付类型">
                <el-select v-model="typeValue" placeholder="请选择">
                    <el-option
                            v-for="item in typeList"
                            :key="item.id"
                            :label="item.type"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="金额" prop="price">
                <el-input v-model.number="form.price"></el-input>
            </el-form-item>
            <el-form-item label="支付日期" prop="date">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import qs from 'qs'
    export default {
        name: 'RecordCreate',
        data() {
            return {
                userValue: '',
                typeValue: '',
                form: {
                    price: '',
                    date: ''
                },
                rules: {
                    price: [
                        { required: true, type: 'number', message: '请输入金额', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', trigger: 'change', message: '请选择支付发生时间' }
                    ],
                }
            }
        },
        methods: {
            onSubmit(form) {
                let data = {
                    "user_id": this.userValue,
                    "date": this.form.date,
                    "price": this.form.price,
                    "type": this.typeValue,
                }
                data = qs.stringify(data);
                this.$refs[form].validate(async (valid) => {
                    if (valid) {
                        let info = await this.$store.dispatch('createBillDetail', data)
                        this.$message('添加成功')
                        setTimeout(() => {
                            this.$router.push('/record/list')
                        },200)

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            ...mapActions(['getUserList','getTypeList'])
        },
        created() {
            this.getUserList();
            this.getTypeList();
        },
        computed: {
            ...mapGetters({
                userList: 'getUserList',
                typeList: 'getTypeList'
            })
        }
    }
</script>

