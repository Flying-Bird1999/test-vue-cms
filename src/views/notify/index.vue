<template>
    <div class="notify">
        <div class="sendNotify">
            <h1>发送通知</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm NotifyForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="message">
                    <el-input v-model="ruleForm.message"></el-input>
                </el-form-item>
                <el-form-item label="队伍" prop="teamName">
                    <el-select v-model="ruleForm.teamName" placeholder="请选择接收队伍">
                        <el-option v-for="team in teams"
                                   :key="team.id"
                                   :label="team.teamName"
                                   :value="team.teamName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">点击发送通知</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="notify-Y">
            <h1>已发送通知列表</h1>
            <div class="notify-con" v-for="(item,i) in notify" :key="i">
                <div class="title-time">
                    <div class="con-title">标题：<span>{{item[0].title}}</span></div>
                    <div class="con-time">时间：<span>{{item[0].create_time | getDate}}</span></div>
                </div>
                <div class="con-message">内容：<span>{{item[0].message}}</span></div>
                <div class="con-status">
                    <el-table
                            :data="item"
                            style="width: 100%">
                        <el-table-column
                                prop="teamName"
                                label="队伍"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="状态">
                            <template slot-scope="scope">
                                <el-tag size="medium" :type="scope.row.status | statusStyleFilter">{{ scope.row.status | statusFilter }}</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getNotify,getTeam,sendNotify } from "../../api/http";
    import { Message } from 'element-ui'

    export default {
        data() {
            return {
                notify: [],
                teams: [],
                ruleForm: {
                    title: '',
                    message: '',
                    teamName: ''
                },
                rules: {
                    title: [
                        { required: true, message: '请输入通知标题', trigger: 'blur' }
                    ],
                    message: [
                        { required: true, message: '请输入通知内容', trigger: 'blur' }
                    ],
                    teamName: [
                        { required: true, message: '请选择队伍名称', trigger: 'change' }
                    ]
                }
            }
        },
        created(){
            this.getList()
        },
        methods: {
            // 获取已发送的通知列表
            getList(){
                getNotify().then(res => {
                    if (res.data.code === 200){
                        let notify = res.data.data
                        // 按照通知的不同分成不同的数组 再赋值
                        let messageArr = [...new Set(notify.map(item => item.message))]
                        let notifyData = []
                        for(let i=0; i<messageArr.length; i++){
                            notifyData[i] = []
                            notify.forEach(item => {
                                if (item.message == messageArr[i]){
                                    notifyData[i].push(item)
                                }
                            })
                        }
                        this.notify = notifyData
                        // console.log(this.notify)
                    }
                })
                // 获取所有的队伍、可通知单个队伍、也可通知所有队伍
                getTeam().then(res => {
                    if (res.data.code === 200){
                        this.teams = res.data.data
                        this.teams.unshift({
                            id: 999,
                            teamName: 'all'
                        })
                    }
                })
            },
            // 发送通知
            submitForm(formName){
                // console.log(this.ruleForm)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        sendNotify(this.ruleForm).then(res => {
                            if (res.data.code === 200) {
                                Message({
                                    type: 'success',
                                    message: '发送通知成功'
                                })
                                this.getList()
                                this.ruleForm.title = this.ruleForm.message = this.ruleForm.teamName = ''
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        },
        filters: {
            statusFilter(status){
                switch (status) {
                    case '1': return '已收到'; break;
                    case '0': return '未收到'; break;
                }
            },

            statusStyleFilter(status){
                switch (status) {
                    case '1': return 'danger'; break;
                    case '0': return 'info'; break;
                }
            },

        }
    }
</script>

<style scoped lang="scss">
    .sendNotify {
        width: 700px;
        h1 {
            font-size: 22px;
            margin-top: 0;
        }
        .NotifyForm {
            border: 2px solid #DCDFE6;
            padding: 40px 30px 10px 10px;
            margin-bottom: 15px;
            box-sizing: border-box;
            width: 700px;
        }
    }
    .notify-Y {
        h1 {
            font-size: 22px;
        }
        .notify-con {
            border: 2px solid #DCDFE6;
            padding: 10px;
            margin-bottom: 15px;
            box-sizing: border-box;
            width: 700px;
            .title-time {
                display: flex;
                font-size: 18px;
                font-weight: bold;
                line-height: 35px;
                color: #606266;
                .con-title {
                    margin-right: 40px;
                }
            }
            .con-message {
                font-size: 18px;
                font-weight: bold;
                color: #606266;
            }
        }
    }
</style>