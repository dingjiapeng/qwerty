<template>
    <el-row >
        <el-col>
            <!--轮播图-->
            <app-carousel></app-carousel>
            <!--最近更新-->
            <app-gengxin></app-gengxin>
            <!--电视剧-->
            <app-dianshi></app-dianshi>
            <!--电影-->
            <app-dianying></app-dianying>
            <!--动漫-->
            <app-dongman></app-dongman>
            <!--综艺-->
            <app-zongyi></app-zongyi>
            <!--友情链接-->
            <app-friend></app-friend>
        </el-col>


    </el-row>
</template>
<script>
    import Header from "@/components/common/Header"
    import Carousel from "@/components/common/Carousel"
    import Footer from "@/components/common/Footer"
    import Friend from "@/components/common/Friend"
    import GengXin from "@/components/recommend/GengXin"
    import DianShi from "@/components/recommend/DianShi"
    import DianYing from "@/components/recommend/DianYing"
    import DongMan from "@/components/recommend/DongMan"
    import ZongYi from "@/components/recommend/ZongYi"
    export default {
        data(){
            return{

            }
        },
        components:{
            "app-header":Header,
            "app-carousel":Carousel,
            "app-gengxin":GengXin,
            "app-dianshi":DianShi,
            "app-dianying":DianYing,
            "app-dongman":DongMan,
            "app-zongyi":ZongYi,
            "app-footer":Footer,
            "app-friend":Friend
        }
    }
</script>