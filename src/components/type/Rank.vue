<template>
    <div style="margin-top: 10px" class="rankvideo">
        <el-row :gutter="20" style="text-align: center;margin-top: 20px">

            <el-col :span="4" class="pic" v-for="(v,k) in videoData" :key="v.vod_id">
                <router-link  :to="'/detail/'+v.vod_id"  tag="li">
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
    </div>
</template>
<script>
    import store from '@/store/type'

    export default {
        data(){
            return{

            }
        },
        computed:{
            videoData:function(){
                // console.log(store.state.videodata)
                return store.state.videoData;
            }
        },
        created:function(){
            window.scrollTo(0,0);
            // store.dispatch("getGengXin");
        }
    }
</script>
<style>
    .rankvideo{
        /*border-top: 2px dashed #fa7f64;*/
    }
    .box-card{
        margin-top:10px;
    }

    .text-overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space: nowrap;
        /*color: #999;*/
    }
    .pic li{
        text-align: center;
    }
    .pic img{
        width: 142px;
        height: 210px;
        border-radius: 5px;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        color: #fff;
        background-color: #fa7f64;
        border-color: #fa7f64;
        -webkit-box-shadow: -1px 0 0 0 #fa7f64;
        box-shadow: -1px 0 0 0 #fa7f64;
    }
    .el-radio-button__inner:hover {
        color: #fa7f64;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #fa7f64;
        color: #fff;
    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: #fa7f64;
    }
</style>