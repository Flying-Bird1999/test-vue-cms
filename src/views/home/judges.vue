<template>
    <div>
        <div class="judges">
            <div class="judges-title">
                <el-button type="primary" plain @click="dialogFormVisible = true">点击增加裁判</el-button>
            </div>
            <div class="judges-con">
                <div class="item" v-for="judge in judges" :key="judge.id">
                    <img :src="judge.judgepic" class="item-pic">
                    <div class="item-message">姓名：<span>{{judge.name}}</span></div>
                    <div class="item-message">班级：<span>{{judge.class}}</span></div>
                    <div class="icon" @click="delJudges(judge.id)">
                        <i class="el-icon-close"></i>
                    </div>
                </div>
            </div>
        </div>

        <!--新增弹窗-->
        <el-dialog title="新增裁判" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="form">
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :http-request="addFiles">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">点击上传裁判头像——只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-form-item label="姓名" label-width="80px" style="margin-top: 20px;">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="班级" label-width="80px">
                    <el-input v-model="form.className" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSuccess">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { getJudges,delJudges,addJudges } from "../../api/http";
    import { Message } from 'element-ui'
    export default {
        data() {
            return {
                judges: [], // 裁判列表
                dialogFormVisible: false,  //控制新增弹窗的显示隐藏
                form: {   // 新增弹窗的内容
                    name: '',
                    className: ''
                },
                imageUrl: '',  // 上传图片 图片的地址
                formData: new FormData() // 新增裁判的数据格式
            }
        },
        created(){
            this.getList()
        },
        methods: {
            // 获取裁判队伍列表
            getList(){
                getJudges().then(res => {
                    if (res.data.code === 200){
                        this.judges = res.data.data
                        // console.log(this.judges)
                    }
                })
            },
            // 删除裁判队伍
            delJudges(id){
                this.$confirm('您确定是否删除该裁判信息?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delJudges(id).then(res => {
                        if (res.data.code === 200){
                            Message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.getList()
                        }else {
                            Message.error('删除失败');
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            // 上传图片，并添加到this.formData
            addFiles(params){
                // console.log(params)
                this.imageUrl = URL.createObjectURL(params.file);
                this.formData.append("file", params.file);
            },
            // 将新增窗口的数据内容添加到this.formData，发送请求
            addSuccess(){
                this.dialogFormVisible = false
                this.formData.append("name", this.form.name);
                this.formData.append("className", this.form.className);
                addJudges(this.formData).then(res => {
                    if (res.data.code === 200) {
                        Message({
                            type: 'success',
                            message: '新增裁判成功!'
                        })
                        // 将this.formData内容清空
                        this.formData.delete("file");
                        this.formData.delete("name");
                        this.formData.delete("className");
                        // 将新增弹窗的内容清空
                        this.form.name = ''
                        this.form.className = ''
                        // 将新增弹窗的图片地址清空
                        this.imageUrl = ''
                        this.getList()
                    }
                })
            }
        }

    }
</script>

<style scoped lang="scss">
    .judges {
        .judges-con {
            margin-top: 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .item {
                padding: 12px;
                border: 2px solid #000;
                margin-right: 50px;
                margin-bottom: 30px;
                text-align: center;
                position: relative;
                .item-pic {
                    width: 170px;
                    height: 220px;
                }
                .item-message {
                    color: #606266;
                    font-weight: bold;
                    line-height: 25px;
                    span {
                        color: #303133;
                    }
                }
                .icon {
                    width: 35px;
                    height: 35px;
                    background-color: #DCDFE6;
                    border-radius: 50%;
                    position: absolute;
                    top: -15px;
                    right: -15px;
                    text-align: center;
                    padding-top: 5px;
                    cursor: pointer;
                    i {
                        font-size: 25px;
                        color: #606266;
                        font-weight: bold;
                    }
                }
            }
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
        border-color: #409EFF;
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