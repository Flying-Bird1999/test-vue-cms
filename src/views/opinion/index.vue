<template>
    <div>
        <el-table
                :data="opinion"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="用户"
                    width="140"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="context"
                    label="反馈意见"
                    width="280"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="contact"
                    label="联系方式"
                    width="140"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="handle"
                    label="状态"
                    width="200"
                    align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.handle==1" size="medium" :type="scope.row.handle | handleStyleFilter">{{ scope.row.handle | handleFilter }}</el-tag>
                    <el-button v-else size="mini" type="primary" @click="handleOpinion(scope.row)">点击处理</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { getOpinion,handleOpinion, deleteOpinion } from "../../api/http";
    import { Message } from 'element-ui'

    export default {
        data() {
            return {
                opinion: []
            }
        },
        created(){
            this.getList()
        },
        methods: {
            //获取意见反馈列表
            getList(){
                getOpinion().then(res => {
                    if (res.data.code === 200){
                        this.opinion = res.data.data
                        // console.log(this.opinion)
                    }
                })
            },
            //处理用户反馈的意见
            handleOpinion(row){
                this.$confirm('您确定是否已处理该用户反馈问题?', '确定提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    handleOpinion(row.id).then(res => {
                        if (res.data.code === 200) {
                            Message({
                                type: 'success',
                                message: '已成功处理该用户反馈内容'
                            })
                            this.getList()
                        } else {
                            Message.error('请求失败');
                        }
                    })
                }).catch(() => {
                    Message.info('请求失败');
                })
            },
            handleDelete(row) {
              // console.log(row)
              this.$confirm('您确定是否删除该意见?', '删除提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  deleteOpinion(row.id).then(res => {
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
            handleFilter(handle){
                switch (handle) {
                    case 1: return '已处理'; break;
                    case 0: return '未处理'; break;
                }
            },
            handleStyleFilter(handle){
                switch (handle) {
                    case 1: return 'danger'; break;
                    case 0: return 'info'; break;
                }

            }
        }
    }
</script>

<style scoped lang="scss">

</style>