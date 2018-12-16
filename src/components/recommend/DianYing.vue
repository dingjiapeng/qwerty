<template>
    <div v-if="videodata.length>=1">
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix" style="color: #FA7F64;font-size: 16px;">
                <i class="icon iconfont icon-dianying"></i>
                <span>热播电影</span>
                <el-button style="float: right; padding: 3px 0" type="text">

                    更多
                    <i class="icon iconfont icon-iconmore-copy""></i>
                </el-button>
            </div>

            <el-row :gutter="20" style="text-align: center">

                <el-col :span="4" class="pic" v-for="(v,k) in videodata" :key="v.vod_id">
                    <router-link  :to="'/detail/'+v.vod_id" tag="li">
                        <img v-lazy="v.vod_pic" class="img-responsive">
                        <span style="display: block;font-size: 14px;margin: 6px 0px" class="text-overflow">{{v.vod_name}}</span>
                        <span v-if="v.vod_actor">
                        <span style="display: block; font-size: 14px;margin: 6px 0px;color: #999;" class="text-overflow">{{v.vod_actor}}</span>
                    </span>
                        <span v-else>
                        <span style="display: block; font-size: 14px;margin: 6px 0px;color: #999;" class="text-overflow">暂时没有演员数据</span>
                    </span>
                    </router-link>
                </el-col>

            </el-row>

        </el-card>
    </div>

</template>
<script>
    import store from '@/store/video'
    export default {
        data(){
            return{

            }
        },
        methods:{
            toDianYing(){
                this.$router.push('/dianying')
            }
        },
        computed:{
            videodata:function(){
                // console.log(store.state.videodata)
                return store.state.dianying;
            }
        },
        created:function(){
            store.dispatch("getDianying");
        }
    }
</script>
<style>
    .box-card{
        margin-top:10px;
    }
    .pic img{
        width: 170px;
        height: 238px;
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