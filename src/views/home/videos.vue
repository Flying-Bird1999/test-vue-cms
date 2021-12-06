<template>
    <div class="video">
        <div class="video-title">
            <el-button type="primary" plain @click="dialogAddVisible=true">点击添加精彩瞬间</el-button>
        </div>
        <el-table
                :data="videos"
                style="width: 100%">
            <el-table-column
                    label="视频"
                    width="280">
                <template slot-scope="scope">
                    <video @play="meIsPlaying(scope.$index)" :src="scope.row.url" :ref="'video'+scope.$index" controls width="240px"> </video>
                </template>
            </el-table-column>
            <el-table-column
                    label="封面"
                    width="280">
                <template slot-scope="scope">
                    <img :src="scope.row.poster" width="240px">
                </template>
            </el-table-column>
            <el-table-column
                    label="描述"
                    width="280">
                <template slot-scope="scope">
                    <div style="width: 240px;">{{ scope.row.describe }}</div>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="medium" type="primary" @click="handleEdit(scope.row)">修改描述</el-button>
                    <el-button size="medium" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--修改描述弹窗-->
        <el-dialog title="修改框" :visible.sync="dialogEditVisible" width="40%">
            <el-form :model="form">
                <el-form-item label="修改描述" label-width="80px" style="margin-top: 20px;">
                    <el-input v-model="form.describe" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSuccess(editId)">确 定</el-button>
            </div>
        </el-dialog>

        <!--新增弹窗-->
        <el-dialog title="新增精彩瞬间" :visible.sync="dialogAddVisible" width="40%">
            <el-form :model="add">
                <el-upload
                        class="upload-demo"
                        :http-request="addFiles"
                        multiple
                        :limit="2"
                        :file-list="fileList"
                        action="http://localhost:3000/admin/index/addBanners">
                    <el-button type="primary" plain>点击上传视频与封面</el-button>
                    <div slot="tip" class="el-upload__tip">切记同时选择2个文件，分别为视频mp4文件和封面jpg/png文件</div>
                </el-upload>
                <el-form-item label="描述" label-width="40px" style="margin-top: 20px;">
                    <el-input type="textarea" v-model="add.describe" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSuccess">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { getVideos,delVideos,editVideos,addVideos } from "../../api/http";
    import { Message } from 'element-ui'
    export default {
        data() {
            return {
                videos: [], // 精彩瞬间列表
                dialogEditVisible: false,  //控制编辑弹窗的显示隐藏
                form: {
                    describe: ''
                },
                editId: '',  // 要编辑那一项的id（点击编辑，将id赋值给此）
                dialogAddVisible: false,  //控制新增弹窗的显示隐藏
                fileList: [],  // 上传文件(视频和图片)的内容
                add: {
                    describe: ''
                },
                formData: new FormData()
            }
        },
        created(){
            this.getList()
        },
        methods: {
            // 获取精彩瞬间列表
            getList(){
                getVideos().then(res => {
                    if (res.data.code === 200){
                        this.videos = res.data.data
                        // console.log(this.videos)
                    }
                })
            },
            // 播放选中视频，暂停其他视频
            meIsPlaying(index){
                // 通过ref来获取dom元素,从而控制其播放与暂停
                // 也可以用id选择器,但是vue里边尽量少用dom
                this.$refs['video'+index].play()
                for(let i=0; i<this.videos.length; i++) {
                    if(index !== i) {
                        this.$refs['video'+i].pause()
                    }
                }
            },
            // 点击编辑按钮时触发
            handleEdit(row) {
                this.dialogEditVisible = true
                this.form.describe = row.describe
                this.editId = row.id
            },
            // 修改精彩瞬间描述，发送请求
            editSuccess(id){
                editVideos({id: id,describe: this.form.describe}).then(res => {
                    if (res.data.code === 200){
                        Message({
                            type: 'success',
                            message: '修改描述成功!'
                        })
                        this.getList()
                        this.dialogEditVisible = false
                    }
                })
            },
            // 删除精彩瞬间
            handleDelete(row) {
                console.log(row.id);
                this.$confirm('您确定是否删除该精彩瞬间?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delVideos(row.id).then(res => {
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
                this.formData.append("file", params.file);
            },
            // 将描述添加到this.formData
            addSuccess(){
                this.formData.append("describe", this.add.describe);
                addVideos(this.formData).then(res => {
                    if (res.data.code === 200) {
                        Message({
                            type: 'success',
                            message: '新增精彩瞬间成功!'
                        })
                        // 将this.formData内容清空
                        this.formData.delete("file");
                        this.formData.delete("describe");
                        // 将新增弹窗的内容和图片都清空
                        this.add.describe = ''
                        this.fileList = []
                        this.getList()
                        this.dialogAddVisible = false
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">

</style>