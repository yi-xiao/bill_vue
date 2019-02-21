<template>
    <div class="update-form-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" v-if="record">
            <el-form-item label="用户">
                <el-input v-model="userValue" disabled></el-input>
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
                <el-button @click="cancelUpdate">取消</el-button>
            </el-form-item>
        </el-form>
        <div class="empty-guide" v-else>
            还未选择编辑的对象哦
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'RecordUpdate',
        data() {
            return {
                record: '',
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
        created() {
            if(this.$route.params.data){
                let { id, price, date, user, category } = this.$route.params.data
                this.record = id
                this.userValue = user.name
                this.typeValue = category.id
                this.form = {
                    price,
                    date
                }
            }
        },
        computed: {
            ...mapGetters({
                typeList: 'getTypeList'
            })
        },
        methods: {
            cancelUpdate() {
                this.record = ''
            }
        }
    }
</script>
