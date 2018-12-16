import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        gengxin:[],
        dianshi:[],
        dianying:[],
        dongman:[],
        zongyi:[],
        friend:[],
        somap:[],
        videoDetail:{},
        youLike:[],
        // 搜索数据
        searchdata:[],
        loading:false,
        // 评论数据
        commentData:[],

    },

    getters:{
      getDetail:state=>state.videoDetail
    },
    mutations:{

    },
    actions:{
        getGengXin(store){
            axios.post('/api/gengxin')
                .then(data=>{
                    store.state.gengxin = data.data.data
                    // console.log(store.state.videodata)
                })
        },
        getDianShi(store){
            axios.post('/api/dianshi')
                .then(data=>{
                    store.state.dianshi = data.data.data
                    // console.log(data)
                })
        },
        getDianying(store){
            axios.post('/api/dianying')
                .then(data=>{
                    store.state.dianying = data.data.data
                    // console.log(data)
                })
        },
        getDongMan(store){
            axios.post('/api/dongman')
                .then(data=>{
                    store.state.dongman = data.data.data
                    // console.log(data)
                })
        },
        getZongYi(store){
            axios.post('/api/zongyi')
                .then(data=>{
                    store.state.zongyi = data.data.data
                    // console.log(data)
                })
        },
        // 获取详情
        getDetail(store,vid){
            const loading = Loading.service({
                lock: true,
                text: '拼命加载中...',
                spinner: 'el-icon-loading',
            });
            axios.post('/api/detail',{'vid':vid})
                .then(data=>{
                    store.state.videoDetail = data.data.data
                    axios.post('/api/youlike',{'tid':data.data.data.type_id})
                        .then(data=>{
                            store.state.youLike = data.data.data
                            loading.close();
                        })
                    // console.log(store.state.videoDetail)
                })
        },
        getYouLike(state,tid){
            axios.post('/api/youlike',{'tid':store.state.videoDetail.type_id})
                .then(data=>{
                    // console.log(store.state.videoDetail)
                })


        },
        // 获取搜索数据
        getSearchData(store,param){
            // 发送axios获取数据
            const loading = Loading.service({
                lock: true,
                text: '拼命加载中...',
                spinner: 'el-icon-loading',
            });
            axios.post('/api/search?page='+param.page,{'keyword':param.key})
                .then(data=>{
                    store.state.searchdata = data.data.data
                    loading.close();
                })
        },
        // 获取友情链接数据
        getFriendData(store){
            axios.post('/api/friend')
                .then(data=>{
                    store.state.friend = data.data.data
                })
        },
        // 获取轮播数据
        getSomapData(store){
            axios.post('/api/somap')
                .then(data=>{
                    store.state.somap = data.data.data
                })
        },
        // 新增评论
        toComment(store,data){
            store.state.loading=true
            axios.post('/api/comment/save',{comment_content:data.comment,comment_video_id:store.state.videoDetail.vod_id})
                .then(data=>{
                    store.state.commentData = data.data.data
                    // Message.success("评论成功")
                    store.state.loading=false
                })
                .catch(error=>{
                    store.state.loading=false
                })
        },
        // 获取评论信息
        getCommentData(store,data){
            const loading = Loading.service({
                lock: true,
                text: '拼命加载中...',
                spinner: 'el-icon-loading',
            });
            axios.post('/api/comment?page='+data.page,{comment_video_id:data.vod_id})
                .then(data=>{
                    store.state.commentData = data.data.data
                    loading.close();

                    // console.log(store.state.commentData)
                    // Message.success("评论成功")
                    // store.state.loading=false

                })
                .catch(error=>{
                    loading.close();
                })
        }
    }



})
