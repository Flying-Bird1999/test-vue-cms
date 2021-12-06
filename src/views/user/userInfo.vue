<template>
    <div>
        <el-form :model="list" ref="ruleForm" label-width="100px">
            <el-form-item label="用户列表" prop="identity">
                <el-select v-model="list.identity" placeholder="请选择参赛队伍"  @change="getList">
                    <el-option label="所有用户" value="all"></el-option>
                    <el-option label="队长" value="1"></el-option>
                    <el-option label="队员" value="0"></el-option>
                    <el-option label="观众" value="-1"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%"
                border
                height="410">
            <el-table-column
                    label="用户名"
                    width="80"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="密码"
                    width="80"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.password }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="手机号"
                    width="120"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="邮箱"
                    width="170"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.email }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="姓名"
                    width="80"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="班级"
                    width="140"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.class }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="性别"
                    width="70"
                    align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.sex | sexStyleFilter">{{ scope.row.sex | sexFilter }}</el-tag>
                    <span style="margin-left: 10px"></span>
                </template>
            </el-table-column>
            <el-table-column
                    label="出生日期"
                    width="140"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.birthday | getBirthday }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="参赛队伍"
                    width="140"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.teamName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="身份"
                    width="80"
                    align="center">
                <template slot-scope="scope">
                    <!--<span style="margin-left: 10px">{{ scope.row.identity | getIdentity }}</span>-->
                    <el-tag :type="scope.row.identity | identityStyleFilter">{{ scope.row.identity | getIdentity }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">修改资料</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--修改资料弹窗-->
        <el-dialog title="修改用户详情" :visible.sync="dialogDetailsVisible" width="60%">
            <el-form :model="userInfo" label-position="right" label-width="100px" :inline="true" class="demo-form-inline">
                <el-form-item label="用户名" style="margin-right: 80px">
                    <el-input v-model="userInfo.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="userInfo.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" style="margin-right: 80px">
                    <el-input v-model="userInfo.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="userInfo.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" style="margin-right: 80px">
                    <el-input v-model="userInfo.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                    <el-input v-model="userInfo.class" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="userInfo.sex" placeholder="选择性别" style="margin-right: 70px;width: 202px;">
                        <el-option label="男" :value="sex.man"></el-option>
                        <el-option label="女" :value="sex.woman"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker type="date" placeholder="选择出生时间" v-model="userInfo.birthday" style="width: 202px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="参赛队伍" v-if="userInfo.identity==1 || userInfo.identity==0">
                    <el-select v-model="userInfo.teamName" placeholder="请选择参赛队伍" style="margin-right: 70px;width: 202px;">
                        <el-option v-for="team in teams"
                                   :key="team.id"
                                   :label="team.teamName"
                                   :value="team.teamName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份">
                    <el-select v-model="userInfo.identity" placeholder="选择性别" style="width: 202px;">
                        <el-option label="队长" value="1"></el-option>
                        <el-option label="队员" value="0"></el-option>
                        <el-option label="观众" value="-1"></el-option>
                    </el-select>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDetailsVisible = false">取消</el-button>
                <el-button type="primary" @click="editSuccess">确定修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { getUserInfo,getTeam,editUserInfo } from "../../api/http";
    import { Message } from 'element-ui'
    export default {
        data() {
            return {
                list: {
                    identity: 'all'
                },
                tableData: [],
                dialogDetailsVisible: false, // 修改弹层
                userInfo: {},
                teams: [],
                sex: {
                    man: Number("1"),
                    woman: Number("0")
                }
            }
        },
        created(){
            this.getList()
        },
        methods: {
            getList(){
                getUserInfo(this.list).then(res => {
                    this.tableData = res.data.data
                    // console.log(this.tableData)
                })
            },
            handleEdit(index, row) {
                this.dialogDetailsVisible = true
                let userInfoArr = this.tableData.filter(item => item.id == row.id)
                this.userInfo = userInfoArr[0]
                this.getTeam()
            },
            getTeam(){
                getTeam().then(res => {
                    if (res.data.code === 200){
                        this.teams = res.data.data
                    }
                })
            },
            dateFilter(time){
                // 当用户生日未设置时，依旧设置为 null
                // 当用户生日已设置时，将时间戳的格式改为：1999-07-27
                // 只有这样转换，才能在修改资料时，将该数据格式发送给后端
                let d = new Date(time)
                let times = d.getFullYear() +'-'+ ((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1)) +'-'+ ((d.getDate())<10?'0'+(d.getDate()):(d.getDate()))
                switch(time) {
                    case null: return null; break;
                    default: return times; break;
                }
            },
            editSuccess(){
                this.userInfo.birthday = this.dateFilter(this.userInfo.birthday)
                let userInfo = {
                    ...this.userInfo,
                    className: this.userInfo.class
                }
                // console.log(userInfo)
                editUserInfo(userInfo).then(res => {
                    if (res.data.code === 200){
                        Message({
                            type: 'success',
                            message: '修改用户资料成功!'
                        })
                        this.getList()
                        this.dialogDetailsVisible = false
                    }
                })
            }
        },
        filters: {
            sexFilter(sex){
                switch (sex) {
                    case '1': return '男'; break;
                    case 1: return '男'; break;
                    case 0: return '女'; break;
                    case '0': return '女'; break;
                }
            },
            sexStyleFilter(sex){
                switch (sex) {
                    case '1': return ''; break;
                    case 1: return ''; break;
                    case 0: return 'danger'; break;
                    case '0': return 'danger'; break;
                }
            },
            identityStyleFilter(identity) {
                switch (identity) {
                    case '1': return ''; break;
                    case '0': return 'success'; break;
                    case '-1': return 'info'; break;
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>