<template>
    <el-row style="margin-top: 60px">
        <el-col>
            <el-card shadow="never">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{getDetail.type_name}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{getDetail.vod_name}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{getDetail.vod_play_url[this.$route.params.aid].name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </el-card>
            <d-player
                    ref="player"
                    @play="play"
                    :logo="logo"
                    :lang="lang"
                    :video="getDetail.vod_play_url[this.$route.params.aid]"
                    :contextmenu="contextmenu"
            style="margin: 5px auto;">

            </d-player>
            <!--{{getDetail.vod_play_url[this.$route.params.aid]}}-->
            <app-playurl></app-playurl>
            <app-youlike></app-youlike>
            <!--评论-->
            <app-comment></app-comment>
        </el-col>
    </el-row>

</template>

<script>
    import VueDPlayer from '@/components/VueDPlayerHls';
    import logoImg from '@/assets/logo-big.png';
    import NavBar from '@/components/detail/NavBar'
    import PlayUrl from '@/components/detail/PlayUrl'
    import Comment from '@/components/detail/Comment'
    import YouLike from '@/components/detail/YouLike'
    import store from '@/store/video'
    export default {
        data () {
            return {
                isPlay:true,
                url:[],
                video: {
                    name: '高清',
                    url: '',
                },
                lang: 'zh-cn',
                logo: logoImg,
                autoplay: true,
                player: null,
                contextmenu: [
                    {
                        text: '悦目视频',
                        link: 'https://dplayer.js.org/#/zh-Hans/'
                    }
                ]
            }
        },
        components: {
            'd-player': VueDPlayer,
            "app-navbar":NavBar,
            "app-playurl":PlayUrl,
            "app-youlike":YouLike,
            "app-comment":Comment
        },
        methods: {
            play() {
                // console.log('开始播放...')
                // 记录会员播放记录
            }

        },
        beforeCreate() {
            window.scrollTo(0,0);
            let vid = this.$route.params.vid;
            store.dispatch("getDetail",vid)


        },
        computed:{
            getDetail(){
                // console.log(store.state.videoDetail.vod_play_url)
                // this.url = store.state.videoDetail.vod_play_url;
                document.title="悦目视频|"+store.state.videoDetail.vod_name+'在线播放'
                console.log(store.state.videoDetail)
                return store.state.videoDetail
            }
        },
        watch:{
            $route() {
                // 获取视频详情数据
                window.scrollTo(0,0);
                let vid = this.$route.params.vid;
                let aid = this.$route.params.aid
                store.dispatch("getDetail",vid)

            }

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .dplayer-logo img {
        max-width: 300%!important;
        max-height: 300%!important;
        margin-top: 20px!important;
        background: none;
    }

    .pic img{
        width: 150px;
        height: 195px;
    }

</style>