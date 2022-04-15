<template>
  <div class="banners">
    <div class="banners-title">
      <el-upload class="upload-demo"
                 :http-request="addFiles"
                 multiple
                 :limit="3"
                 :on-exceed="handleExceed"
                 action="http://localhost:3000/admin/index/addBanners">
        <el-button type="primary"
                   plain>点击上传轮播图</el-button>
        <div slot="tip"
             class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，最多选择3张图片</div>
      </el-upload>
    </div>
    <div class="banners-con">
      <div class="item"
           v-for="banner in banners"
           :key="banner.id">
        <img :src="banner.image"
             class="item-pic">
        <div class="icon"
             @click="delBanners(banner.id)">
          <i class="el-icon-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanners, delBanners, addBanners } from "../../api/http";
import { Message } from 'element-ui'
export default {
  data () {
    return {
      banners: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取轮播图列表
    getList () {
      getBanners().then(res => {
        if (res.data.code === 200) {
          this.banners = res.data.data
          //console.log(this.banners)
        }
      })
    },
    // 删除轮播图
    delBanners (id) {
      this.$confirm('您确定是否删除该张轮播图?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBanners(id).then(res => {
          if (res.data.code === 200) {
            Message({
              type: 'success',
              message: '删除成功!'
            })
            // 重新渲染轮播图
            this.getList()
          } else {
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
    // 限制最多选择图片的张数
    handleExceed (files) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件`);
    },
    // 新增轮播图
    addFiles (params) {
      // FormData格式
      let form = new FormData();
      form.append("file", params.file);
      addBanners(form).then(res => {
        if (res.data.code === 200) {
          Message({
            type: 'success',
            message: '新增轮播图成功!'
          })
          this.getList()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.banners {
  .banners-con {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .item {
      width: 340px;
      margin-right: 20px;
      margin-bottom: 20px;
      position: relative;
      .item-pic {
        width: 340px;
        height: 205px;
      }
      .icon {
        width: 35px;
        height: 35px;
        background-color: #dcdfe6;
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
</style>