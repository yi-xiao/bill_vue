<template>
    <div class="update-form-container">  
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
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
        btnText: '创建',
        media_id: 0,
      }
    },
    methods: {
      onSubmit(form) {
          let data = {
              "name": this.form.name,
              "birth": this.form.birth,
              "sex": this.form.sex,
              "avatar": this.media_id,
              "nickName": this.form.nickName
          }
          data = qs.stringify(data);
          this.$refs[form].validate((valid) => {
            if (valid) {
                axios.post('/api/user/createUser', data).then(res => {
                    this.$message('添加成功')
                    setTimeout(() => {
                        this.$router.push('/user/list')
                    },200)
                })
            } else {
                console.log('error submit!!');
                return false;
            }
          });
      },
      handleAvatarSuccess(res, file) {
          console.log(file)
        // this.form.avatar = URL.createObjectURL(file.raw);
        let { path, id }  = file.response.info;
        console.log(path)
        this.form.avatar = this.$store.state.defaultOrigin+path,
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
