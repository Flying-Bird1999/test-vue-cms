<template>
  <div class="handleTeam">
    <div class="createTeam">
      <div class="create-con">
        <el-form :model="form"
                 :rules="rules"
                 ref="form">
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false"
                     :http-request="addFiles"
                     style="margin-left: -25px;">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip"
                 class="el-upload__tip">点击上传队伍照片——只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-form-item label="队伍名称"
                        label-width="80px"
                        style="margin-top: 20px;"
                        prop="teamName">
            <el-input v-model="form.teamName"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="队伍组别"
                        prop="groupName">
            <el-select v-model="form.groupName"
                       style="width: 200px;"
                       placeholder="请选择队伍组别">
              <el-option label="A组"
                         value="A"></el-option>
              <el-option label="B组"
                         value="B"></el-option>
              <el-option label="C组"
                         value="C"></el-option>
              <el-option label="D组"
                         value="D"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="队伍评分"
                        label-width="80px"
                        prop="score">
            <el-input v-model="form.score"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 10px;">
            <el-button type="primary"
                       @click="createSuccess('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { createTeam } from "../../api/http";
import { Message } from 'element-ui'
export default {
  data () {
    return {
      form: {
        teamName: '',
        groupName: '',
        score: ''
      },
      imageUrl: '',  // 上传图片 图片的地址
      formData: new FormData(), // 新增队伍的数据格式
      rules: {
        teamName: [
          { required: true, message: '请输入队伍名称', trigger: 'blur' }
        ],
        groupName: [
          { required: true, message: '请输入队伍组别', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请输入队伍评分', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    addFiles (params) {
      this.imageUrl = URL.createObjectURL(params.file);
      this.formData.append("file", params.file);
    },
    createSuccess (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.append("teamName", this.form.teamName);
          this.formData.append("groupName", this.form.groupName);
          this.formData.append("score", this.form.score);
          createTeam(this.formData).then(res => {
            console.log(this.form)
            if (res.data.code === 200) {
              Message({
                type: 'success',
                message: '创建队伍成功!'
              })
              // 将this.formData内容清空
              this.formData.delete("file");
              this.formData.delete("teamName");
              this.formData.delete("groupName");
              this.formData.delete("score");
              // 将form的内容清空
              this.form.teamName = this.form.groupName = this.form.score = ''
              // 将图片地址清空
              this.imageUrl = ''
            }
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped lang="scss">
.createTeam {
  .create-title {
    font-size: 24px;
  }
  .create-con {
    width: 500px;
    margin-left: 30px;
    margin-top: 20px;
  }
}
.scoreTeam {
  .score-title {
    margin: 0;
    font-size: 24px;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader {
  padding-left: 40px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin-left: 40px;
  margin-bottom: 20px;
}
</style>