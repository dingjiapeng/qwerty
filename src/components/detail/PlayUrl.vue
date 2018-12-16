<template>
    <!--播放源-->
    <el-card shadow="never" style="margin-top: 10px">
        <div slot="header" style="color: #FA7F64;font-size: 16px;">
            <i class="icon iconfont icon-bofang" style="color: #E6A23C;font-size: 18px;"></i>
            <span>在线播放</span>
        </div>
        <el-row :gutter="10">
            <el-col
                    :span="3"
                    v-for="(v,k) in getDetail.vod_play_url"
                    :key="v.vod_id"
                    style="margin-top: 10px;"
                    >
                <el-button plain @click="toPlay(getDetail.vod_id,k)" style="width: 100%">{{v['name']}}</el-button>
            </el-col>
        </el-row>


    </el-card>
</template>
<script>
    import store from '@/store/video'
    export default {
        computed:{
            getDetail:function(){
                // console.log(store.state.videoDetail)
                store.state.videoDetail.vod_score = Number(store.state.videoDetail.vod_score)

                return store.state.videoDetail
            }

        },
        methods:{
            // 点击获取视频id和数组id
            toPlay(id,k){
                if (!this.$store.state.token) {
                    this.$message.warning("请先登陆")
                    this.$router.push(`/player/${id}/${k}`);
                }else{
                    this.$router.push(`/player/${id}/${k}`);
                }
                // console.log(id,k)
            }
        }
    }
</script>