<template>
  <div class="notify">
    <el-button 
      type="primary" 
      plain 
      style="margin-bottom: 20px; margin-left: 60px" 
      @click="dialogAddVisible = true"
    >点击发送通知</el-button>
    <el-table
      :data="notify"
      style="width: 90%; margin-left: 50px">
      <el-table-column
        label="时间"
        width="240"
        align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.create_time | getDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="message"
        label="内容"
        width="300"
        align="center">
      </el-table-column>
      <el-table-column
        prop="handle"
        label="操作"
        align="center"
        width="250"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="getNotifyDetail(scope.row)"
          >通知接收详情</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
      </template>
      </el-table-column>
    </el-table>

    <!--新增比赛弹窗-->
    <el-dialog title="发送通知" :visible.sync="dialogAddVisible" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm NotifyForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="message">
            <el-input v-model="ruleForm.message"></el-input>
        </el-form-item>
        <el-form-item label="队伍" prop="teamName">
          <el-select v-model="ruleForm.teamName" placeholder="请选择接收队伍">
            <el-option 
              v-for="team in teams"
              :key="team.id"
              :label="team.teamName"
              :value="team.teamName">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">点击发送通知</el-button>
      </div>
    </el-dialog>

    <!-- 查看详情弹窗 -->
    <el-dialog title="通知接收详情" :visible.sync="dialogTeamVisible" width="37%">
        <el-table
          :data="notifyDetail"
          style="padding-left: 40px;"
        >
          <el-table-column
            prop="teamName"
            label="队伍"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="status"
            label="状态"
          >
            <template slot-scope="scope">
              <el-tag size="medium" :type="scope.row.status | statusStyleFilter">{{ scope.row.status | statusFilter }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

  </div>
</template>

<script>
    import { getNotify, getTeam, getNotifyDetail, sendNotify, deleteNotify } from "../../api/http";
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
                },
                dialogAddVisible: false,
                dialogTeamVisible: false,
                notifyDetail: []
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
                        let titleArr = [...new Set(notify.map(item => item.title))]
                        let notifyArr = []
                        for(let title of titleArr) {
                          if(notifyArr.some(item => item.title === title)) continue;
                          else {
                            notifyArr.push(notify.filter(item => item.title===title)[0])
                          }
                        }
                        this.notify = notifyArr
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
                                this.dialogAddVisible = false;
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            // 查看通知接收详情
            getNotifyDetail(row) {
              this.dialogTeamVisible = true
              getNotifyDetail({title: row.title}).then(res => {
                if(res.data.code === 200) {
                  this.notifyDetail = res.data.data
                }
              })
            },
            // 删除通知
            handleDelete(row) {
              this.$confirm('您确定是否删除该通知?', '删除提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  deleteNotify({title: row.title}).then(res => {
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
                  Message({
                      type: 'info',
                      message: '已取消删除'
                  })
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
</style>