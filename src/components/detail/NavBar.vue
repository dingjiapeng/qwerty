<template>
    <el-card shadow="never">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{getDetail.type_name}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{getDetail.vod_name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </el-card>
</template>
<script>
    import store from '@/store/video'
    export default {
        data(){
            return{

            }
        },
        computed:{
            getDetail:function(){
                // console.log(store.state.videoDetail)
                store.state.videoDetail.vod_score = Number(store.state.videoDetail.vod_score)

                return store.state.videoDetail
            },
        }
    }
</script>