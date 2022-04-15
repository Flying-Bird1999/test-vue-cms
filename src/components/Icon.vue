<template>
    <i class="iconfont" :class="[iconClass, extraClass]"></i>
</template>

<script>
    var map = {
        arrowUp: 'icon-jiantoushang',
        arrowDown: 'icon-jiantouxia',
        arrowLeft: 'icon-fangxiang-xiangzuo',
        arrowRight: 'icon-fangxiang-xiangyou',
        search: 'icon-sousuo',
        home: 'icon-shouye',
        game: 'icon-lanqiu',
        list: 'icon-jiangbei',
        mine: 'icon-wo',
        sign: 'icon-baoming'
    }
    export default {
        name: 'Icon',
        props: {
            type: {
                type: String,
                required: true
            },
            extraClass: {
                type: String,
                default: ''
            }
        },
        computed: {
            iconClass(){
                return map[this.type]
            }
        }
    }
</script>

<style scoped>
    @import "//at.alicdn.com/t/font_2104068_8t6wskn8i1v.css";
</style>