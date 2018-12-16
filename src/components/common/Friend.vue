<template>
    <el-card shadow="never" style="margin-top: 10px">
        <div slot="header" class="clearfix" style="color: #FA7F64;font-size: 16px;">
            <i class="icon iconfont icon-lianjie"></i>
            <span>友情链接</span>
        </div>
        <a v-for="(v,k) in friend" target="view_window" :href="'http://'+v.link_url" style="margin-right: 10px">
            <el-button>{{v.link_name}}</el-button>
        </a>
    </el-card>
</template>
<script>
    import store from '@/store/video'
    export default {
        data(){
            return{

            }
        },
        created(){
            store.dispatch("getFriendData");
        },
        computed:{
            friend(){
                return store.state.friend
            }
        }
    }
</script>