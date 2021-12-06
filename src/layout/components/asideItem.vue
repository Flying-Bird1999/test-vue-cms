<template>
    <div>
        <!--没子级-->
        <el-menu-item :index="basePath" v-if="!item.children">
            <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
        <!--有子级-->
        <el-submenu :index="basePath" v-else>
            <template slot="title">
                <span slot="title">{{item.meta.title}}</span>
            </template>
            <AsideItem v-for="child in item.children" :key="child.path" :item="child" :basePath="resolvePath(child.path)" />
        </el-submenu>
    </div>
</template>

<script>
    import path from 'path'
    export default {
        name: 'AsideItem',
        props: ['item', 'basePath'],
        methods: {
            resolvePath(routePath){
                return path.resolve(this.basePath, routePath)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>