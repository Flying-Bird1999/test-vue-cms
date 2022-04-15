<template>
    <div class="teamInfo">
        <div class="team-item" v-for="(item, index) in teamInfo" :key="index">
            <h1 style="padding-left: 30px; font-size: 22px">{{item[0].groupName}}组队伍</h1>
            <el-table
                    :data="item"
                    style="width: 80%">
                <el-table-column
                        label="队伍名称"
                        width="120"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.teamName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="队伍组别"
                        width="100"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.groupName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="照片"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.teampic" style="width: 150px; height: 90px;">
                    </template>
                </el-table-column>
                <el-table-column
                        label="评分"
                        width="100"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.score }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="小组积分"
                        width="100"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.integral }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="getCompetitionInfo(scope.row)">战绩详情</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="getUserInfo(scope.row)">队员详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

        <!-- 人员详情弹窗 -->
        <el-dialog title="查看队员详情" :visible.sync="dialogUserVisible" width="60%">
            <el-table
                    :data="userInfo"
                    style="width: 100%">
                <el-table-column
                        label="姓名"
                        width="100"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="班级"
                        width="120"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.class }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="号码"
                        width="90"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.num }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="身份"
                        width="100"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.identity | getIdentity }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="得分"
                        width="90"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.point }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="篮板"
                        width="90"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.backboard }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="助攻"
                        width="90"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.assist }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="犯规"
                        width="90"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.foul }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUserVisible = false">取消</el-button>
            </div>
        </el-dialog>

        <!-- 战绩详情弹窗 -->
        <el-dialog title="查看战绩详情" :visible.sync="dialogTeamVisible" width="50%">
            <el-table
                    :data="teamScoreInfo"
                    style="width: 100%">
                <el-table-column
                        label="时间"
                        width="180"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.time | getDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="性质"
                        width="120"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.team_status }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="90"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag size="medium" :type="scope.row.status | statusStyleFilter">{{ scope.row.status | statusFilter }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="战况"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <div class="team-score" v-if="scope.row.status == 1">
                            <div class="teamInfo">
                                <div class="team">{{ scope.row.teamNameA }}</div>
                                <div class="score">{{ scope.row.countA }}</div>
                            </div>
                            <div class="teamInfo">
                                <div class="team">{{ scope.row.teamNameB }}</div>
                                <div class="score">{{ scope.row.countB }}</div>
                            </div>
                        </div>
                        <span style="margin-left: 10px" v-else>暂无相关战况</span>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTeamVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { getTeamInfo,getTeamUserInfo,getTeamScoreInfo } from "../../api/http";

    export default {
        data() {
            return {
                teamInfo: [],
                dialogUserVisible: false,
                userInfo: [],
                dialogTeamVisible: false,
                teamScoreInfo: []
            }
        },
        created(){
            this.getList()
        },
        methods: {
            getList(){
                getTeamInfo().then(res => {
                    if (res.data.code === 200){
                        this.teamInfo = res.data.data
                        let teamInfo = res.data.data

                        // 将所有的组别筛选出来形成一个数组
                        let dataGroup = teamInfo.map(item => item.groupName)
                        // 将含有组别的数组进行去重
                        dataGroup = [...new Set(dataGroup)]
                        // 将含有组别的数组进行排序
                        dataGroup = dataGroup.sort()
                        // 重新定义一个新数组
                        let newData = []
                        // 遍历组别数组
                        for(let i=0; i< dataGroup.length; i++) {
                            // 二维数组
                            newData[i] = []
                            teamInfo.forEach(item => {
                                if(item.groupName == dataGroup[i]){
                                    // 当数据中的组别 与 组别数组 相同时，在新数组的二维中插入该数据
                                    newData[i].push(item)
                                }
                            })
                        }
                        // 将最终获得的新数组的二维数组 按照integral的大小 进行排序
                        newData.forEach(item => {
                            item.sort((a,b) => {
                                return b.integral - a.integral
                            })
                        })
                        this.teamInfo = newData
                        console.log(this.teamInfo)
                    }
                })
            },
            getCompetitionInfo(row) {
                getTeamScoreInfo(row.id).then(res=>{
                    if (res.data.code === 200) {
                        this.teamScoreInfo = res.data.data
                        // console.log(this.teamScoreInfo)
                        this.dialogTeamVisible = true
                    }
                })

            },
            getUserInfo(row) {
                getTeamUserInfo(row.id).then(res=>{
                    if (res.data.code === 200) {
                        this.userInfo = res.data.data
                        this.userInfo.forEach(user => {
                            for(let item in user) {
                                if(item == 'point' || item == 'backboard' || item == 'assist' || item == 'foul') {
                                    user[item] = (user[item]).toFixed(1)
                                }
                            }
                        })
                        // console.log(this.userInfo)
                        this.dialogUserVisible = true
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .team-score {
        display: flex;
        flex-direction: column;
        .teamInfo {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-left: 40px;
            .score {
                margin-right: 25px;
            }
        }
    }
</style>