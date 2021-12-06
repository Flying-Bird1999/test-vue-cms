<template>
    <el-aside width="200px">
        <el-menu default-active="$route.path" class="el-menu-vertical-demo" router>
            <AsideItem v-for="route in get_routes[0].children" :key="route.path" :item="route" :basePath="route.path" />
        </el-menu>
    </el-aside>
</template>

<script>
    import {mapGetters} from 'vuex'
    import AsideItem from './asideItem.vue'
    export default {
        data() {
            return {}
        },
        computed: {
            ...mapGetters(['get_routes'])
        },
        components: {
            AsideItem
        },
        mounted(){
            console.log(this.get_routes[0].children)
        }
    }
</script>

<style scoped lang="scss">
    .el-aside {
        position: fixed;
        margin-top: 80px;
        border-right: 1px solid #ccc;
        color: #333;
        text-align: center;
        line-height: 200px;
        height: 100%;
        //overflow: hidden;
    }
    .el-container .el-aside {
        line-height: 320px;
    }
    .el-menu-item,
    .el-menu,
    .el-submenu {
        text-align: left;
        margin-left: 5px;
    }
</style>