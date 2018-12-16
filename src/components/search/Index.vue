<template>
    <el-row style="margin-top: 60px">
        <el-col>
            <el-card shadow="never">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>影片搜索</el-breadcrumb-item>
                    <el-breadcrumb-item>{{this.$route.params.key}}</el-breadcrumb-item>
                </el-breadcrumb>

                    <!--视频详情-->
                    <el-card shadow="never" v-show="!searchdata.total" style="margin: 150px 20px;text-align: center;color: #999;">
                        <i class="icon iconfont icon-wukongbiaoqing" style="font-size: 50px"></i>
                        <span style="font-size: 35px;">没有找到相关视频哦~~</span>
                    </el-card>
                        <el-row style="background-color: #E8E8E8;height: 276px;margin-top: 20px;overflow: hidden" v-for="(v,k) in searchdata.data" :key="v.vod_id">
                            <router-link  :to="'/detail/'+v.vod_id" tag="li">
                                <el-col :span="5" >
                                    <img v-lazy="v.vod_pic" width="188px" height="276px">
                                </el-col>
                                <el-col :span="18" style="font-size: 16px;margin-top: 5px">
                                    <ul style="margin: 5px auto;">
                                        <h3>{{v.vod_name}}</h3>
                                        <li>主演:{{v.vod_actor}}</li>
                                        <li>播放量:{{v.vod_hot}}</li>
                                        <li>时间:{{v.vod_year}}</li>
                                        <li>类型:{{v.type_name}}</li>
                                        <div  style="height: 50px;">
                                            简介:{{v.vod_content.substr(0,200)+'......'}}
                                        </div>
                                    </ul>
                                </el-col>
                            </router-link>
                        </el-row>


                <div style="text-align: center;margin-top: 20px">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :page-count="Number(searchdata.last_page)"
                            @current-change="changePage"
                            v-show="searchdata.total"
                    >
                    </el-pagination>
                </div>
            </el-card>

        </el-col>
    </el-row>

</template>

<script>
    import store from '@/store/video'
    export default {
        computed:{
            searchdata(){
                return store.state.searchdata;
            }
        },
        methods:{
            changePage(page){
                // console.log(page)
                store.dispatch("getSearchData",{'key':this.$route.params.key,'page':page})

            }
        },
        beforeCreate() {
            store.dispatch("getSearchData",{'key':this.$route.params.key,'page':1})
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .text-overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        /*color: #999;*/
    }
</style>