<template>
    <div style="margin-top: 60px" v-loading.fullscreen.lock="loading">
        <!--面包屑-->
        <app-navbar></app-navbar>
        <!--视频详情-->
        <el-card shadow="never" style="margin-top: 10px">
            <el-row>
                <el-col :span="7">
                    <img :src="getDetail.vod_pic" width="235" height="310px" style="border: 1px solid #B7B8CA;padding: 5px">
                </el-col>
                <el-col :span="17" style="text-align: left">
                    <span style="font-size: 25px">{{getDetail.vod_name}}</span>
                    <el-card shadow="never" style="margin-top: 10px;color: #666">
                        评分:<el-rate
                        v-model="getDetail.vod_score/2"
                        disabled
                        text-color="#ff9900"
                        style="display: inline;margin-left: 15px;">
                        </el-rate>
                    </el-card>
                    <div style="font-size: 16px;margin-top: 10px">
                        主演：{{getDetail.vod_actor}}
                    </div>
                    <div style="font-size: 16px;margin:10px auto">
                        播放量：{{getDetail.vod_hot}}
                    </div>
                    <div style="font-size: 16px;margin:10px auto">
                        时间：{{getDetail.vod_time}}
                    </div>
                    <div style="font-size: 16px;margin:10px auto">
                        类型：{{getDetail.type_name}}
                    </div>
                    <div style="font-size: 16px;margin:10px auto;line-height: 25px;">
                        简介：{{getDetail.vod_content}}
                    </div>

                </el-col>
                <!--<el-col :span="5"></el-col>-->
            </el-row>

        </el-card>
        <!--播放源-->
        <app-playurl></app-playurl>
        <!--猜你喜欢-->
        <app-youlike></app-youlike>

    </div>

</template>
<script>
    import store from '@/store/video'
    import PlayUrl from '@/components/detail/PlayUrl'
    import YouLike from '@/components/detail/YouLike'
    import Comment from '@/components/detail/Comment'
    import NavBar from '@/components/detail/NavBar'

    export default {
        data(){
            return{
                loading:false
            }
        },
        watch:{
            $route() {
                // 获取视频详情数据
                // this.loading=true
                window.scrollTo(0,0);
                const loading = this.$loading({
                    lock: true,
                    text: '正在疯狂加载中...',
                    spinner: 'el-icon-loading',
                });
                let vid = this.$route.params.vid;
                store.dispatch("getDetail",vid)
                loading.close();
                // this.loading=false
                // console.log(this.$route.params.vid)
            }

        },
        computed:{
            getDetail:function(){
                // console.log(store.state.videoDetail)
                store.state.videoDetail.vod_score = Number(store.state.videoDetail.vod_score)
                document.title="悦目视频|"+store.state.videoDetail.vod_name+'视频详情页'
                return store.state.videoDetail
            },
            getYouLike:function(){
                return store.state.youLike

            }

        },
        created:function(){
            // 获取视频详情数据
            window.scrollTo(0,0);
            let vid = this.$route.params.vid;
            store.dispatch("getDetail",vid)

            // console.log(this.type_id)
        },
        components:{
            "app-playurl":PlayUrl,
            "app-youlike":YouLike,
            "app-navbar":NavBar,
            "app-comment":Comment
        }
    }
</script>
<style>
    .box-card{
        margin-top:10px;
    }
    .pic img{
        width: 150px;
        height: 195px;
        border-radius: 5px;
    }
    .text-overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        /*color: #999;*/
    }
</style>