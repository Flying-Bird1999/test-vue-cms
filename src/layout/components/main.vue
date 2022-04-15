<template>
    <el-main>
        <router-view />
    </el-main>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style scoped lang="scss">
    .el-main {
        margin-top: 60px;
        padding-bottom: 60px;
        color: #333;
        height: calc(100vh - 60px - 70px);
        overflow: scroll;
    }
</style>
