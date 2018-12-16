import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Loading } from 'element-ui';

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        videoData:[],
        page:{
            total:''
        }
    },
    getters:{
        getDetail:state=>state.videoDetail
    },
    mutations:{

    },
    actions:{
        setVideoData(store,data){
            // console.log(data)

            const loading = Loading.service({
                lock: true,
                text: '拼命加载中...',
                spinner: 'el-icon-loading',
            });
            axios.post(data.url+'?page='+data.page,data)
                .then(data=>{
                    store.state.videoData = data.data.data.data
                    store.state.page.total =data.data.data.last_page
                    loading.close();
                    window.scrollTo(0,0);
                    // console.log(data)
                })
        },


    }


})
