<template>
    <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
            <div class="navbar-header">
                <router-link to="/">
                    <img src="https://tiantian123-1254212318.cos.ap-guangzhou.myqcloud.com/video/newlogo.png" style="height: 50px;">
                </router-link>
            </div>

        <div class="collapse navbar-collapse">

            <ul class="nav navbar-nav navbar-right">

                <router-link tag="li" to="/">首页</router-link>
                <router-link tag="li" to="/dianying">
                    电影
                </router-link>
                <router-link tag="li" to="/dianshiju">剧集</router-link>
                <router-link tag="li" to="/zongyi">综艺</router-link>
                <router-link tag="li" to="/dongman">动漫</router-link>
                <router-link tag="li" to="/gbook">留言</router-link>

                <router-link tag="li" to="/login" v-show="!islogin">登录</router-link>
                <router-link tag="li" to="/register" v-show="!islogin">
                    <el-button type="primary" size="small" >注册</el-button>
                </router-link>

                <li v-show="islogin">
                    <el-dropdown  @command="handleCommand">
                        <el-button type="primary" size="small">
                            我的
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userhome">
                                <i class="icon iconfont icon-huiyuan"></i>
                                会员中心
                            </el-dropdown-item>
                            <el-dropdown-item command="videorecord">
                                <i class="icon iconfont icon-clock"></i>
                                观看记录
                            </el-dropdown-item>
                            <el-dropdown-item command="logout">
                                <i class="icon iconfont icon-tuichu"></i>
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
            <form class="nav navbar-nav navbar-right" style="line-height: 61px" autocomplete="off" @submit.prevent="onSubmit">
                <el-input v-model="search"
                          :maxlength="20"
                          :clearable="true"
                          size="mini"
                          placeholder="请输入搜索内容"
                          suffix-icon="el-icon-search"
                          @keyup.enter.native="toSearch"
                          style="border-radius: 20px"></el-input>
            </form>
        </div>
    </div>
    </nav>
</template>
<script>
    import store from '@/store/video'
    export default {
        data(){
            return {
                search:'',
                active:"1",
                config:{}
            }
        },
        computed:{
            islogin(){
                // 判断是否登录
                if (this.$store.state.token) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods:{
            handleCommand(command){

                // 退出登录
                if(command == 'logout'){
                    this.$confirm('确定退出登录吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 退出登录
                        this.$store.commit("del_token")
                        // 跳转页面
                        this.$router.push("/login")
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                    })
                }
                // 会员中心
                if(command == 'userhome'){
                    this.$router.push('/user')
                }
            },
            // 获取用户详细信息
            getinfo(){
                this.$axios.post("/api/auth/me")
                    .then(data=>{
                        console.log(data)
                    })
                    .catch(error=>{
                        console.log(error)
                    })
            },
            toSearch(){
                if(!this.search.trim()){
                    this.$message.warning("请输入搜索内容");
                    this.search = ''
                }else{
                    // this.$router.push('/search/'+this.search)
                    this.$router.push({path: '/search/'+this.search});

                    // this.search=''
                }
                // store.commit("setKeyWord",this.search)
                // alert(123);
                // console.log(this.search)
            },
            onSubmit: function(){
                return false;
            }

        },
        beforeCreate(){
            this.$axios.post('/api/config')
                .then(data=>{
                    this.config = data.data.data[0]
                    console.log(this.config)
                    document.title = this.config.title
                    if(this.config.wzkg==0){
                        this.$router.push('/close')
                    }
                    // console.log(this.config)
                })
        }

    }
</script>
<style>
    .el-header {
        /*text-align: center;*/
        height: 60px;
        overflow: hidden;
        background-color: #ffffff;
        -webkit-box-shadow: 0 2px 10px 0 rgba(44,125,250,0.1);
        box-shadow: 0 2px 10px 0 rgba(44,125,250,0.1);
        position: fixed;
        z-index: 1000;
        width: 100%;
    }
    .navbar-default {
        background-color: #ffffff;
        -webkit-box-shadow: 0 2px 10px 0 rgba(44,125,250,0.1);
        box-shadow: 0 2px 10px 0 rgba(44,125,250,0.1);
    }
    .navbar-nav li{
        line-height: 60px;
        text-align: center;
        width: 60px;
        height: 60px;
        color: #999;
    }
    .navbar-nav li:hover{
        color: #333;
    }
    .navbar-nav li:after{

        content: "";
        width: 0;
        height: 2px;
        background: #fa7f64;
        position: absolute;
        top: 80%;
        left: 50%;
        transition: all .6s;
    }
    .navbar-nav li:hover:after{
        left: 0%;
        width: 100%;
    }
    .el-input__inner {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 20px!important;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 61px;
        outline: 0;
        /*padding: 0 15px;*/
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
    }
</style>