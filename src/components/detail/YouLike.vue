<template>
    <div v-if="getYouLike.length>=1">
    <el-card shadow="never" style="margin-top: 10px">
        <div slot="header" style="color: #FA7F64;font-size: 16px;">

            <i class="icon iconfont icon-xihuan" style="color: #E6A23C;font-size: 18px;"></i>

            <span>猜你喜欢</span>
        </div>
        <el-row :gutter="20" style="text-align: center">

            <el-col :span="4" class="pic" v-for="(v,k) in getYouLike" :key="v.vod_id">
                <router-link  :to="{ name: 'detail', params: { vid: v.vod_id }}" tag="li">
                    <img v-lazy="v.vod_pic" alt="">
                    <span style="display: block;font-size: 14px;margin: 10px" class="text-overflow">{{v.vod_name}}</span>
                    <span style="display: block; font-size: 14px;margin: 10px;color: #999;" class="text-overflow">{{v.vod_actor}}</span>
                </router-link>
            </el-col>

        </el-row>
    </el-card>
    </div>
</template>
<script>
    import store from '@/store/video'
    export default {
        computed:{
            getYouLike:function(){
                return store.state.youLike

            }

        },
    }
</script>