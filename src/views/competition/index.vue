<template>
    <div class="competition">
        <el-button type="primary" plain style="margin-bottom: 20px;" @click="addCompetition">点击新增比赛</el-button>
        <el-table
                :data="competition"
                style="width: 100%">
            <el-table-column
                    label="时间"
                    width="160"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.time | getDate }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="小组"
                    width="60"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.team_group }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="性质"
                    width="100"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.team_status }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="80"
                    align="center">
                <template slot-scope="scope">
                    <el-tag size="medium" :type="scope.row.status | statusStyleFilter">{{ scope.row.status | statusFilter }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    label="队伍A"
                    width="120"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.teamNameA }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="得分A"
                    width="80"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.countA | countFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="队伍B"
                    width="120"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.teamNameB }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="得分B"
                    width="80"
                    align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.countB | countFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="success"
                            :disabled="scope.row.status == 0"
                            @click="handleAdd(scope.row)">录入技术统计</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增比赛弹窗-->
        <el-dialog title="新增比赛" :visible.sync="dialogAddVisible" width="30%">
            <el-form :model="addGame">
                <el-form-item label="比赛时间" label-width="80px" style="margin-top: 20px;">
                    <el-date-picker
                            v-model="addGame.time"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="赛事小组" label-width="80px" style="margin-top: 20px;">
                    <el-select v-model="addGame.team_group" placeholder="请选择赛事小组">
                        <el-option v-for="(group,i) in groupArr"
                                   :key="i"
                                   :label="group"
                                   :value="group">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="赛事性质" prop="team_status" label-width="80px">
                    <el-select v-model="addGame.team_status" placeholder="请选择赛事性质">
                        <el-option label="小组赛" value="小组赛"></el-option>
                        <el-option label="八强赛" value="八强赛"></el-option>
                        <el-option label="四强赛" value="四强赛"></el-option>
                        <el-option label="总决赛" value="总决赛"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="队伍A" prop="teamNameA" label-width="80px">
                    <el-select v-model="addGame.teamNameA" placeholder="请选择参赛队伍">
                        <el-option v-for="team in teams"
                                   :key="team.id"
                                   :label="team.teamName"
                                   :value="team.teamName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="队伍B" prop="teamNameB" label-width="80px">
                    <el-select v-model="addGame.teamNameB" placeholder="请选择参赛队伍">
                        <el-option v-for="team in teams"
                                   :key="team.id"
                                   :label="team.teamName"
                                   :value="team.teamName">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSuccess">确 定</el-button>
            </div>
        </el-dialog>

        <!--编辑弹窗-->
        <el-dialog title="编辑赛事" :visible.sync="dialogEditVisible" width="60%">
            <el-form :model="editGame" :inline="true" class="demo-form-inline">
                <el-form-item label="比赛时间" prop="time" label-width="80px">
                    <el-date-picker
                            v-model="editGame.time"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="性质" prop="team_status" label-width="80px">
                    <el-select v-model="editGame.team_status" placeholder="请选择赛事性质">
                        <el-option label="小组赛" value="小组赛"></el-option>
                        <el-option label="八强赛" value="八强赛"></el-option>
                        <el-option label="四强赛" value="四强赛"></el-option>
                        <el-option label="总决赛" value="总决赛"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="赛事小组" label-width="80px">
                    <el-select v-model="editGame.team_group" placeholder="请选择赛事小组">
                        <el-option v-for="(group,i) in groupArr"
                                   :key="i"
                                   :label="group"
                                   :value="group">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status" label-width="80px">
                    <el-select v-model="editGame.status" placeholder="请选择赛事性质">
                        <el-option label="未开始" :value="status.noStart"></el-option>
                        <el-option label="已结束" :value="status.end"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="队伍A" prop="teamNameA" label-width="80px">
                    <el-select v-model="editGame.teamNameA" placeholder="请选择参赛队伍">
                        <el-option v-for="team in teams"
                                   :key="team.id"
                                   :label="team.teamName"
                                   :value="team.teamName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="得分" prop="countA" label-width="80px">
                    <el-input v-model="editGame.countA" autocomplete="off" style="width: 218px;"></el-input>
                </el-form-item>
                <el-form-item label="队伍B" prop="teamNameB" label-width="80px">
                    <el-select v-model="editGame.teamNameB" placeholder="请选择参赛队伍">
                        <el-option v-for="team in teams"
                                   :key="team.id"
                                   :label="team.teamName"
                                   :value="team.teamName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="得分" prop="countB" label-width="80px">
                    <el-input v-model="editGame.countB" autocomplete="off" style="width: 218px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSuccess()">确 定</el-button>
            </div>
        </el-dialog>

        <!--录入比赛技术统计弹窗-->
        <el-dialog title="技术统计" :visible.sync="dialogScoreVisible" width="70%">
            <div class="dialogScore">
                <div class="scoreA">
                    <h1>{{teamBehavior.behaviorA[0].teamName}}技术统计</h1>
                    <el-form :model="teamBehavior" ref="teamBehavior">
                        <el-table
                                :data="teamBehavior.behaviorA"
                                style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="80"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    label="得分"
                                    width="80"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'behaviorA.' + scope.$index + '.point'" style="padding: 0;margin: 0;">
                                        <el-input v-model="scope.row.point"></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="篮板"
                                    width="80"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'behaviorA.' + scope.$index + '.backboard'" style="padding: 0;margin: 0;">
                                        <el-input v-model="scope.row.backboard"></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="助攻"
                                    width="80"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'behaviorA.' + scope.$index + '.assist'" style="padding: 0;margin: 0;">
                                        <el-input v-model="scope.row.assist"></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="犯规"
                                    width="80"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'behaviorA.' + scope.$index + '.foul'" style="padding: 0;margin: 0;">
                                        <el-input v-model="scope.row.foul"></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </div>
                <div class="scoreB">
                    <h1>{{teamBehavior.behaviorB[0].teamName}}技术统计</h1>
                    <el-form :model="teamBehavior">
                        <el-table
                                :data="teamBehavior.behaviorB"
                                style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="80"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="point"
                                    label="得分"
                                    width="80"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'behaviorB.' + scope.$index + '.point'" style="padding: 0;margin: 0;">
                                        <el-input v-model="scope.row.point"></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="backboard"
                                    label="篮板"
                                    width="80"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'behaviorB.' + scope.$index + '.backboard'" style="padding: 0;margin: 0;">
                                        <el-input v-model="scope.row.backboard"></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="assist"
                                    label="助攻"
                                    width="80"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'behaviorB.' + scope.$index + '.assist'" style="padding: 0;margin: 0;">
                                        <el-input v-model="scope.row.assist"></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="foul"
                                    label="犯规"
                                    width="80"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'behaviorB.' + scope.$index + '.foul'" style="padding: 0;margin: 0;">
                                        <el-input v-model="scope.row.foul"></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogScoreVisible = false">取 消</el-button>
                <el-button type="primary" @click="scoreSuccess()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { getCompetition,addCompetition,getTeam,delCompetition,editCompetition,getTeamUser,editTeamBehavior } from "../../api/http";
    import { Message } from 'element-ui'
    export default {
        data() {
            return {
                competition: [], //赛程列表
                dialogAddVisible: false, //控制新增比赛弹窗的显示与隐藏
                teams: [], //参赛队伍列表
                addGame: {
                    time: '',
                    team_group: '',
                    teamNameA: '',
                    teamNameB: '',
                    team_status: ''
                },
                groupArr: [],  //参赛队伍的组别 -- ABCD

                dialogEditVisible: false, //控制编辑比赛弹窗的显示与隐藏
                // editId: '',
                editGame: {}, //编辑表单的内容
                status: {   //将比赛状态的"0"和"1"强制转换成数字类型
                    end: Number("1"),
                    noStart: Number("0")
                },

                teamBehavior: {  //技术统计的表单内容
                    behaviorA: [{teamName:''}], // 加入teamName属性是为了显示战队名称
                    behaviorB: [{teamName:''}],
                },
                dialogScoreVisible: false //控制技术统计弹窗的显示与隐藏
            }
        },
        created(){
            this.getList()
        },
        methods: {
            // 获取所有赛程列表
            getList(){
                getCompetition().then(res => {
                    if (res.data.code === 200) {
                        this.competition = res.data.data
                        // console.log(this.competition)
                    }
                })
            },
            // 获取所有的参赛队伍
            getTeam(){
                getTeam().then(res => {
                    if (res.data.code === 200){
                        this.teams = res.data.data
                        // 参赛队伍的组别 -- ABCD
                        let groupArr = this.teams.map(item => item.groupName)
                        groupArr = [...new Set(groupArr)].sort()
                        this.groupArr = groupArr
                    }
                })
            },
            // 点击新增比赛按钮
            addCompetition(){
                this.dialogAddVisible = true
                this.getTeam()
            },
            // 新增比赛弹窗 —— 确定
            addSuccess(){
                // 将日期进行格式化
                this.addGame.time = this.getDate(this.addGame.time)
                addCompetition(this.addGame).then(res => {
                    if (res.data.code === 200) {
                        Message({
                            type: 'success',
                            message: '成功添加该赛事!'
                        })
                        this.getList()
                        // 清空新增弹窗的表单内容
                        this.addGame.time = this.addGame.team_group = this.addGame.teamNameA = this.addGame.teamNameB = this.addGame.team_status = ''
                        this.dialogAddVisible = false
                    }
                })
            },
            // 点击删除比赛按钮
            handleDelete(row){
                this.$confirm('您确定是否删除该场赛事?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delCompetition(row.id).then(res => {
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
            },
            // 点击编辑比赛按钮
            handleEdit(row){
                this.dialogEditVisible = true
                // 将赛程表进行过滤，将id相同的一项赋值给this.editGame，可以修改编辑
                this.editGame = (this.competition.filter(item => item.id === row.id))[0]
                // 获取所有队伍
                this.getTeam()
                // console.log(this.editGame)
            },
            // 编辑比赛弹窗 —— 确定
            editSuccess(){
                // 将时间进行格式化 (不同情况下)
                this.editGame.time = this.dateFilter(this.editGame.time)
                editCompetition(this.editGame).then(res => {
                    if (res.data.code === 200){
                        Message({
                            type: 'success',
                            message: '赛程编辑成功!'
                        })
                        this.getList()
                        this.dialogEditVisible = false
                    }
                })
            },
            // 点击录入技术统计按钮
            handleAdd(row){
                // 清空技术统计的表单内容
                // 防止若获取不到队伍资料时,显示的会是上一次的内容
                this.teamBehavior = {
                    behaviorA: [{teamName:''}],
                    behaviorB: [{teamName:''}],
                }
                this.dialogScoreVisible = true
                let {teamNameA, teamNameB} = row
                let data = {
                    teamNameA: teamNameA,
                    teamNameB: teamNameB
                }
                getTeamUser(data).then(res => {
                    if (res.data.code === 200){
                        // console.log(res.data.data)
                        let teams = res.data.data
                        // 获取两队的id (去重)
                        let teamIdArr = [...new Set(teams.map(item => item.team_id))]
                        // 清空上一次的内容,否则会继续push进去
                        let teamBehavior = {
                            behaviorA : [],
                            behaviorB : [],
                        }
                        // 根据两队id的不同，分别将人员信息push到相应的behaviorA/behaviorB数组里
                        teams.forEach(item => {
                            if (item.team_id === teamIdArr[0]){
                                teamBehavior.behaviorA.push(item)
                            } else if (item.team_id === teamIdArr[1]){
                                teamBehavior.behaviorB.push(item)
                            }
                        })
                        // 在每个队员对应的对象中加入新属性competition_id和point backboard assist foul
                        for (let i in teamBehavior){
                            teamBehavior[i].forEach(item => {
                                item.competition_id = row.id
                                item.point = item.backboard = item.assist = item.foul = ''
                            })
                        }
                        // 将整理好的数据赋值给this.teamBehavior
                        this.teamBehavior = teamBehavior
                    }
                })
            },
            // 录入技术统计弹窗 —— 确定
            scoreSuccess(){
                editTeamBehavior(this.teamBehavior).then(res => {
                    if (res.data.code === 200){
                        Message({
                            type: 'success',
                            message: '球员技术统计录入成功!'
                        })
                        this.getList()
                        this.dialogScoreVisible = false
                    }
                })
            },
            getDate(time){
                let d = new Date(time)
                let times = d.getFullYear() +'-'+ ((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1)) +'-'+ ((d.getDate())<10?'0'+(d.getDate()):(d.getDate())) +' '+ ((d.getHours())<10?'0'+(d.getHours()):(d.getHours())) +':'+ ((d.getMinutes())<10?'0'+(d.getMinutes()):(d.getMinutes())) +':'+ ((d.getSeconds())<10?'0'+(d.getSeconds()):(d.getSeconds()))
                return times
            },
            dateFilter(time){
                // 当用户生日未设置时，依旧设置为 null
                // 当用户生日已设置时，将时间戳的格式改为：1999-07-27
                // 只有这样转换，才能在修改资料时，将该数据格式发送给后端
                let d = new Date(time)
                let times = d.getFullYear() +'-'+ ((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1)) +'-'+ ((d.getDate())<10?'0'+(d.getDate()):(d.getDate())) +' '+ ((d.getHours())<10?'0'+(d.getHours()):(d.getHours())) +':'+ ((d.getMinutes())<10?'0'+(d.getMinutes()):(d.getMinutes())) +':'+ ((d.getSeconds())<10?'0'+(d.getSeconds()):(d.getSeconds()))
                switch(time) {
                    case null: return null; break;
                    default: return times; break;
                }
            },
        },
        filters: {
            countFilter(count){
                return count?count:'- -'
            }
        }
    }
</script>

<style scoped lang="scss">
    .dialogScore {
        display: flex;
        flex-direction: row;
        .scoreA {
            margin-right: 50px;
        }
    }
</style>