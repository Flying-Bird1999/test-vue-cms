<template>
    <div class="create">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username" :rules="rules.username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="className">
                <el-input v-model="ruleForm.className"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="identity">
                <el-radio-group v-model="ruleForm.identity" @change="identityFlagChange">
                    <el-radio label="1" border>队长</el-radio>
                    <el-radio label="0" border>队员</el-radio>
                    <el-radio label="-1" border>观众</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="队伍" prop="teamName" v-if="identityFlag">
                <el-select v-model="ruleForm.teamName" placeholder="请选择参赛队伍">
                    <el-option v-for="team in teams"
                               :key="team.id"
                               :label="team.teamName"
                               :value="team.teamName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="号码" prop="num" v-if="identityFlag">
                <el-input v-model="ruleForm.num"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { getTeam,createUser } from "../../api/http";
    import { Message } from 'element-ui'

    export default {
        data() {
            return {
                teams: [],
                ruleForm: {
                    username: '',
                    name: '',
                    password: '',
                    className: '',
                    identity: '',
                    teamName: '',
                    num: ''
                },
                identityFlag: true,
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    className: [
                        { required: true, message: '请输入班级名称', trigger: 'blur' }
                    ],
                    identity: [
                        { required: true, message: '请选择身份', trigger: 'change' }
                    ],
                    teamName: [
                        { required: true, message: '请选择队伍名称', trigger: 'change' }
                    ],
                    num: [
                        { required: true, message: '请输入号码', trigger: 'blur' }
                    ],

                }
            }
        },
        created(){
            this.getTeam()
        },
        methods: {
            getTeam(){
                getTeam().then(res => {
                    if (res.data.code === 200){
                        this.teams = res.data.data
                        // console.log(this.teams)
                    }
                })
            },
            identityFlagChange(){
                if (this.ruleForm.identity == 1 || this.ruleForm.identity == 0) {
                    this.identityFlag = true
                }else{
                    this.identityFlag = false
                    this.ruleForm.teamName = null
                    this.ruleForm.num = null
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        createUser(this.ruleForm).then(res => {
                            if (res.data.code === 200){
                                Message({
                                    type: 'success',
                                    message: res.data.msg
                                })
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="scss">
    .create {
        width: 600px;
    }
</style>