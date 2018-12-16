<template>

        <el-main>
            <el-row >
                <el-col>
                    <!--详情页的内容主体-->
                    <app-body></app-body>
                </el-col>
            </el-row>
        </el-main>

</template>
<script>
    import Header from "@/components/common/Header"
    import Footer from "@/components/common/Footer"
    import Body from "@/components/detail/Body"


    export default {
        data(){
            return{

            }
        },
        computed:{

        },
        components:{
            "app-header":Header,
            "app-footer":Footer,
            "app-body":Body
        }
    }
</script>
<style>
    .el-header {
        padding: 0 0px;
        text-align: center;
        line-height: 60px;
        height: 60px;
        overflow: hidden;
        background-color: #ffffff;
        box-shadow: 0 1px 4px rgba(0,0,0,.1);
        position: fixed;
        top:0px;
        z-index: 1000;
        width: 100%;
    }
    .el-footer {
        padding: 0 0px;
    }
</style>