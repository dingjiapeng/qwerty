<template>
    <div  style="margin-top: 60px">
        <el-card shadow="never">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>剧集高级筛选</el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
        <el-card class="box-card boxboder" style="margin-top: 10px" shadow="never">
            <!--<div slot="header" class="clearfix" style="text-align: center;font-size: 16px">-->
            <!--<span>电影 - 高级搜索</span>-->
            <!--</div>-->
            <div class="text item">
                <el-row style="margin-bottom: 10px">
                    <el-col :span="2"><el-tag type="danger">类型</el-tag></el-col>
                    <el-col :span="22">
                        <el-radio-group v-model="type_name" size="small">
                            <el-radio-button label="全部"></el-radio-button>
                            <el-radio-button label="国产剧"></el-radio-button>
                            <el-radio-button label="香港剧"></el-radio-button>
                            <el-radio-button label="台湾剧"></el-radio-button>
                            <el-radio-button label="欧美剧"></el-radio-button>
                            <el-radio-button label="日本剧"></el-radio-button>
                            <el-radio-button label="韩国剧"></el-radio-button>
                            <el-radio-button label="泰国剧"></el-radio-button>
                            <el-radio-button label="海外剧"></el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 10px">
                    <el-col :span="2"><el-tag type="danger">地区</el-tag></el-col>
                    <el-col :span="22">
                        <el-radio-group v-model="vod_area" size="small">
                            <el-radio-button label="全部"></el-radio-button>
                            <el-radio-button label="大陆"></el-radio-button>
                            <el-radio-button label="香港"></el-radio-button>
                            <el-radio-button label="台湾"></el-radio-button>
                            <el-radio-button label="欧美"></el-radio-button>
                            <el-radio-button label="日本"></el-radio-button>
                            <el-radio-button label="韩国"></el-radio-button>
                            <el-radio-button label="英国"></el-radio-button>
                            <el-radio-button label="美国"></el-radio-button>
                            <el-radio-button label="法国"></el-radio-button>
                            <el-radio-button label="泰国"></el-radio-button>
                            <el-radio-button label="印度"></el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 10px">
                    <el-col :span="2"><el-tag type="danger">语言</el-tag></el-col>
                    <el-col :span="22">
                        <el-radio-group v-model="vod_lang" size="small">
                            <el-radio-button label="全部"></el-radio-button>
                            <el-radio-button label="国语"></el-radio-button>
                            <el-radio-button label="粤语"></el-radio-button>
                            <el-radio-button label="英语"></el-radio-button>
                            <el-radio-button label="日语"></el-radio-button>
                            <el-radio-button label="韩语"></el-radio-button>
                            <el-radio-button label="法语"></el-radio-button>
                            <el-radio-button label="泰语"></el-radio-button>
                            <el-radio-button label="俄语"></el-radio-button>
                            <el-radio-button label="印度语"></el-radio-button>
                            <el-radio-button label="西班牙语"></el-radio-button>
                            <el-radio-button label="荷兰语"></el-radio-button>
                            <el-radio-button label="意大利语"></el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 10px">
                    <el-col :span="2"><el-tag type="danger">年代</el-tag></el-col>
                    <el-col :span="22">
                        <el-radio-group v-model="vod_year" size="small">
                            <el-radio-button label="全部"></el-radio-button>
                            <el-radio-button label="2018"></el-radio-button>
                            <el-radio-button label="2017"></el-radio-button>
                            <el-radio-button label="2016"></el-radio-button>
                            <el-radio-button label="2015"></el-radio-button>
                            <el-radio-button label="2014"></el-radio-button>
                            <el-radio-button label="2013"></el-radio-button>
                            <el-radio-button label="2012"></el-radio-button>
                            <el-radio-button label="2011"></el-radio-button>
                            <el-radio-button label="2010"></el-radio-button>
                            <el-radio-button label="2009"></el-radio-button>
                            <el-radio-button label="2008"></el-radio-button>
                            <el-radio-button label="2007"></el-radio-button>
                            <el-radio-button label="2006"></el-radio-button>
                            <el-radio-button label="2005"></el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <app-rank></app-rank>
            </div>
            <div style="text-align: center;margin-top: 20px">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-count="Number(page.total)"
                        @current-change="changePage"
                >
                </el-pagination>
            </div>

        </el-card>
    </div>
</template>
<script>
    import Rank from '@/components/type/Rank'
    import store from '@/store/type'

    export default {
        data(){
            return {
                type_name:'全部',
                vod_area:'全部',
                vod_lang:'全部',
                vod_year:'全部',


            }
        },
        computed:{
            page(){
                return store.state.page
            }
        },
        methods:{
            changePage(page){

                store.dispatch("setVideoData",{
                    url:"/api/dianshijuall",
                    page:page,
                    type_name:this.type_name,
                    vod_area:this.vod_area,
                    vod_lang:this.vod_lang,
                    vod_year:this.vod_year
                })
                // console.log(page)
            }
        },
        watch:{
            // params:{
            //     handler(newValue, oldValue) {
            //         console.log(this.leixing)
            //         store.dispatch("setVideoData",{url:"/api/dianyingall"})
            //     },
            //     deep: true
            // },
            type_name:{
                handler(newValue, oldValue) {
                    console.log(this.type_name)
                    store.dispatch("setVideoData",{
                        url:"/api/dianshijuall",
                        type_name:this.type_name,
                        vod_area:this.vod_area,
                        vod_lang:this.vod_lang,
                        vod_year:this.vod_year
                    })

                },
                deep: true
            },
            vod_area:{
                handler(newValue, oldValue) {
                    console.log(this.vod_area)
                    store.dispatch("setVideoData",{
                        url:"/api/dianshijuall",
                        type_name:this.type_name,
                        vod_area:this.vod_area,
                        vod_lang:this.vod_lang,
                        vod_year:this.vod_year
                    })
                },
                deep: true
            },
            vod_lang:{
                handler(newValue, oldValue) {
                    console.log(this.vod_lang)
                    store.dispatch("setVideoData",{
                        url:"/api/dianshijuall",
                        type_name:this.type_name,
                        vod_area:this.vod_area,
                        vod_lang:this.vod_lang,
                        vod_year:this.vod_year
                    })
                },
                deep: true
            },
            vod_year:{
                handler(newValue, oldValue) {
                    console.log(this.vod_year)
                    store.dispatch("setVideoData",{
                        url:"/api/dianshijuall",
                        type_name:this.type_name,
                        vod_area:this.vod_area,
                        yuyan:this.yuyan,
                        vod_year:this.vod_year
                    })
                },
                deep: true
            }

        },
        components:{
            "app-rank":Rank
        },
        created(){
            store.dispatch("setVideoData",{url:"/api/dianshijuall"})
        }
    }
</script>
<style>
    .boxboder {
        border-top: 2px solid #fa7f64;

    }
    .el-card__body {
        padding: 20px;
    }
</style>