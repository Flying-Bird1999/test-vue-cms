<template>
    <div class="title">
        计科院篮球赛后台管理系统
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                <i class="el-icon-s-custom"></i>
                {{username}}
                <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix">
                    <span @click="logout">退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import { getUsername,removeToken,removeUsername } from "../../utils/token";

    export default {
        data() {
            return {
                username: '曾晓灿'
            }
        },
        mounted(){
            this.getUser()
        },
        methods: {
            getUser(){
                this.username = getUsername()
            },
            logout(){
                this.$store.dispatch('logout')
                removeToken()
                removeUsername()
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped lang="scss">
    .title {
        position: fixed;
        width: 100%;
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #ccc;
        text-align: left;
        color: #409eff;
        font-size: 25px;
        font-weight: bold;
        background-color: #545c64;
        display: flex;
        justify-content: space-between;
        padding: 0 30px 0 60px;
    }

    .el-dropdown {
        vertical-align: top;
        color: #fff;
    }
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-dropdown-link {
        font-size: 16px;
    }
    .el-dropdown-link:hover {
        cursor: pointer;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }
</style>