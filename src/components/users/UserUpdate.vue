<template>
    <div class="update-form-container">  
        
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户">
            <el-select v-model="selectValue" placeholder="请选择">
            <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="头像">
            <el-upload
                class="avatar-uploader"
                action="/api/user/uploadAvatar"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
                <img v-if="form.avatar" :src="form.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
            <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">{{btnText}}</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>  
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    name: 'UserUpdate',
     data() {
      return {
          user_id: '',
        form: {
          name: '',
          nickName: '',
          sex: '',
          avatar: '',
          birth: '',
        },
        rules: {
            name: [
                { required: true, message: '请输入用户姓名', trigger: 'change' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'change' }
            ],
            birth: [
                { required: true, type: 'date', trigger: 'change', message: '生日不能为空' }
            ],
            sex: [
                { required: true, trigger: 'change', message: '请选择性别' }
            ],
        },
        btnText: '更新',
        selectValue: '',
        media_id: 0,
        defaultOrigin: ''
      }
    },
    methods: {
      onSubmit(form) {
          let data = {
              "user_id": this.user_id,
              "name": this.form.name,
              "birth": this.form.birth,
              "sex": this.form.sex,
              "avatar": this.media_id,
              "nickName": this.form.nickName
          }
          data = qs.stringify(data);
          this.$refs[form].validate(async (valid) => {
            if (valid) {
                await this.$store.dispatch('updateUserDetail', data);
                this.$message('更新成功')
                setTimeout(() => {
                    this.$router.push('/user/list')
                },200)
            } else {
                console.log('error submit!!');
                return false;
            }
          });
      },
      handleAvatarSuccess(res, file) {
        //   console.log(file)
        // this.form.avatar = URL.createObjectURL(file.raw);
         let { path, id }  = file.response.info;
        this.form.avatar = this.defaultOrigin+path,
        this.media_id = id
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    watch: {
        selectValue(id) {
            this.user_id = id;
            this.userList.filter(item => {
                if(item.id == id){
                    this.form.name = item.name
                    this.form.nickName = item.nickName
                    this.form.sex = item.sex+''
                    this.form.birth = new Date(item.birth)
                    this.form.avatar = this.defaultOrigin + item.avatar_info.path
                    this.media_id = item.avatar_info.id
                }
            })
        },
        'form.birth' () {
            //监控对象某个特定属性的写法
        }
    },
    computed: {
         userList() {
             return this.$store.getters.getUserList;
         }
    },
    created() {
        this.defaultOrigin = this.$store.getters.getDefaultOrigin

        // axios.get('/api/user').then(res => {
        //     this.userList = res.data;
        // })
    }
}
</script>
<style type="scope">
    .update-form-container{
        width: 400px;
        padding: 50px;
    }

    .avatar-uploader{
        text-align: left;
        height: 82px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
    object-fit: cover;
  }

  .el-form-item__content{
      text-align: left
  }
</style>
