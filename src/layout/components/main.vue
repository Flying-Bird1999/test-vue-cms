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
        height: 574px;
        overflow: scroll;
    }
</style>