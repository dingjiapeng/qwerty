<template>

    <el-container>

        <el-header>
            <el-row >
             <el-col :span="20" :offset="2">
                 <app-header></app-header>
             </el-col>
            </el-row>
            <!--头部-->

        </el-header>
        <div class="container">
            <el-main>
                <!--<transition mode="out-in" enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">-->
                <router-view class="animated" :key="key"></router-view>
                <!--</transition>-->
            </el-main>
        </div>
        <el-footer style="padding: 0px!important;">
            <!--底部版权-->
            <app-footer></app-footer>
        </el-footer>
        <!--返回顶部组件-->
        <vueToTop color="#fa7f64" type="4" size="45"></vueToTop>
    </el-container>

</template>
<script>
    import Header from "@/components/common/Header"
    import Carousel from "@/components/common/Carousel"
    import Footer from "@/components/common/Footer"
    export default {
        data(){
            return{

            }
        },
        components:{
            "app-header":Header,

            "app-footer":Footer,

        },
        computed: {
            key() {
                return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
            }
        }
    }
</script>
<style>
    .el-main {
        display: block;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -ms-flex-preferred-size: auto;
        flex-basis: auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
    }
    .el-footer {
        padding: 0 0px;
    }

</style>