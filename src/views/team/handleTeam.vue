<template>
    <div class="handleTeam">
        <div class="scoreTeam">
            <h1 class="score-title">队伍评分</h1>
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div id="main" ref="chart" style="width: 1100px;height:500px;"></div>
        </div>

        <div class="createTeam">
            <h1 class="create-title">创建队伍</h1>
            <div class="create-con">
                <el-form :model="form">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :http-request="addFiles"
                            style="margin-left: -25px;">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">点击上传队伍照片——只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <el-form-item label="队伍名称" label-width="80px" style="margin-top: 20px;">
                        <el-input v-model="form.teamName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="队伍组别" label-width="80px">
                        <el-input v-model="form.groupName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="队伍评分" label-width="80px">
                        <el-input v-model="form.score" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-left: 10px;">
                        <el-button type="primary" @click="createSuccess">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { createTeam,getScore } from "../../api/http";
    import { Message } from 'element-ui'
    import echarts from 'echarts'
    export default {
        data() {
            return {
                form: {
                    teamName: '',
                    groupName: '',
                    score: ''
                },
                imageUrl: '',  // 上传图片 图片的地址
                formData: new FormData(), // 新增队伍的数据格式
                // teams: [],
                // score: [],
                myChart: ''
            }
        },
        // created(){
        //     this.getList()
        // },
        mounted(){
            this.init()
            let self = this
            window.onresize = function() {
                self.myChart.resize()
            }
        },
        methods: {
            addFiles(params){
                this.imageUrl = URL.createObjectURL(params.file);
                this.formData.append("file", params.file);
            },
            createSuccess(){
                this.formData.append("teamName", this.form.teamName);
                this.formData.append("groupName", this.form.groupName);
                this.formData.append("score", this.form.score);
                createTeam(this.formData).then(res => {
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
                        this.init()
                    }
                })
            },
            init(){
                let teams,score
                getScore().then(res => {
                    if (res.data.code === 200) {
                        teams = res.data.data.map(item => item.teamName)
                        score = res.data.data.map(item => item.score)
                    }
                })
                setTimeout(()=>{
                    // 基于准备好的dom，初始化echarts实例
                    this.myChart = echarts.init(this.$refs.chart);

                    // 指定图表的配置项和数据
                    let option = {
                        title: {
                            text: ''
                        },
                        tooltip: {},
                        legend: {
                            data:['队伍评分']
                        },
                        xAxis: {
                            data: teams
                        },
                        yAxis: {},
                        series: [{
                            name: '队伍评分',
                            type: 'bar',
                            data: score,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: "#1268f3" // 0% 处的颜色
                                    }, {
                                        offset: 0.6,
                                        color: "#08a4fa" // 60% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: "#01ccfe" // 100% 处的颜色
                                    }], false)
                                }
                            }
                        }]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    this.myChart.setOption(option);
                },100)
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