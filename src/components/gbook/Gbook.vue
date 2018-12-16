<template>
    <el-row style="margin-top: 60px">
        <el-card shadow="never">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>留言咨询</el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
        <el-card shadow="never" style="margin-top: 10px">
            <el-form :model="gbook" ref="gbookform" label-width="100px" :rules="rules">
                <el-form-item
                        label="留言内容"
                        prop="msg"
                        >
                    <el-input type="textarea" v-model="gbook.msg" autocomplete="off" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('gbookform')" :loading="loading">提交</el-button>
                    <el-button @click="resetForm('gbookform')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!--留言列表-->

        <el-card class="box-card" style="margin-top: 10px">
            <div slot="header" class="clearfix">
                <i class="el-icon-tickets" style="font-size: 20px;color: #E6A23C"></i>
                <span>留言列表</span>
            </div>
            <!--留言列表开始-->
            <div class="bs-example" data-example-id="default-media" v-for="(v,k) in gbookdata.data">
                <div class="media">
                    <div class="media-left">
                        <a href="#">
                            <img class="media-object" :src="v.user_pic" data-holder-rendered="true" style="width: 40px; height: 40px;border-radr-re 50%">
                        </a>
                    </div>
                    <div class="media-body" style="color: #606266">
                        <h5 class="media-heading">{{v.user_name}}</h5>
                        <span>
                            {{v.gbook_content}}
                        </span>

                        <!--<div class="media">-->
                            <!--<div class="media-left">-->
                                <!--<a href="#">-->
                                    <!--<img class="media-object" data-src="holder.js/64x64" alt="64x64" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNjc4NzgxMGI0OSB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE2Nzg3ODEwYjQ5Ij48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy4xNzk2ODc1IiB5PSIzNi41NTYyNSI+NjR4NjQ8L3RleHQ+PC9nPjwvZz48L3N2Zz4=" data-holder-rendered="true" style="width: 64px; height: 64px;">-->
                                <!--</a>-->
                            <!--</div>-->
                            <!--<div class="media-body">-->
                                <!--<h4 class="media-heading">管理员</h4>-->
                                <!--管理员回复内容-->
                            <!--</div>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
            <!--留言列表结束-->
            <!--分页-->
            <div style="text-align: center">
                <div v-if="gbookdata.data.length>=1">
                    <el-pagination
                            background
                            style="margin-top:20px"
                            layout="prev, pager, next"
                            :page-count="Number(gbookdata.last_page)"
                            @current-change="changePage">
                    </el-pagination>
                </div>

            </div>
        </el-card>


    </el-row>

</template>

<script>
    export default {
        data () {
            return {
                loading:false,
                gbookdata:[],
                gbook:{
                    msg:''
                },
                rules: {
                    msg: [
                        { required: true, message: '请输入留言内容', trigger: 'blur' },
                        { min: 10, max: 200, message: '长度在 10 到 200 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 变更按钮状态
                        this.loading = true
                        // 发送请求
                        this.$axios.post('/api/creategbook',this.gbook)
                            .then(data=>{
                                if (data.data.code == 1){
                                    this.$axios.post('/api/gbook')
                                        .then(data=>{
                                            this.gbookdata = data.data.data
                                            this.$message.success('留言成功')
                                            this.loading = false
                                        })
                                } else{
                                    this.$message.error(data.data.msg)
                                    this.loading = false
                                }
                            })
                    } else {
                        // console.log('error submit!!');
                        this.$message.warning('留言内容至少需要10个字')
                        this.loading = false
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            changePage(page){
                const loading = this.$loading({
                    lock: true,
                    text: '正在加载中...',
                    spinner: 'el-icon-loading',
                });
                this.$axios.post('/api/gbook?page='+page)
                    .then(data=>{
                        console.log(data)
                        this.gbookdata = data.data.data
                        loading.close();
                        // console.log(this.gbookdata)
                    })
                console.log(page)
            }
        },
        created() {
            const loading = this.$loading({
                lock: true,
                text: '正在加载中...',
                spinner: 'el-icon-loading',
            });
            // 获取留言数据
            this.$axios.post('/api/gbook')
                .then(data=>{
                    // console.log(data)
                    this.gbookdata = data.data.data
                    loading.close();
                    // console.log(this.gbookdata)
                })
        },


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bs-example{
    margin-bottom: 10px;
}

</style>