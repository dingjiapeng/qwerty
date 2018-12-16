<template>
    <el-row style="margin-top: 60px">
        <el-card shadow="never">
            <el-tabs type="border-card" :tab-position="tabPosition" style="">
                <el-tab-pane label="我的资料">
                    <div style="height: 500px">

                        <el-tabs v-model="activeName">

                            <el-tab-pane label="基本信息" name="first" style="float: left">

                                <div style="width: 50px;float: left;text-align: right">

                                    <span class="list">用户ID:</span>
                                    <span class="list">用户名:</span>
                                    <span class="list">Q Q:</span>
                                    <span class="list">手机号:</span>
                                    <span class="list">邮箱:</span>
                                </div>
                                <div style="float: left;margin-left: 30px">
                                    <span class="list">{{userInfo.user_id}}</span>
                                    <span class="list">{{userInfo.user_name}}</span>
                                    <span class="list">{{userInfo.user_phone}}</span>
                                    <span class="list">{{userInfo.user_qq}}</span>
                                    <span class="list">{{userInfo.user_email}}</span>
                                </div>

                            </el-tab-pane>
                            <el-tab-pane label="修改信息" name="second">

                                <el-form ref="ruleForm" label-width="80px">
                                    <el-form-item label="用户名" prop="name">
                                        <el-input v-model="userInfo.user_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="QQ" prop="qq">
                                        <el-input v-model="userInfo.user_qq"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号" prop="phone">
                                        <el-input v-model="userInfo.user_phone"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')">
                                            立即修改
                                        </el-button>

                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="我的评论" style="height: 500px">
                    <el-table
                            :data="tableData.data"
                            style="width: 100%">
                        <el-table-column
                                prop="vod_name"
                                label="影片名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="comment_content"
                                label="评论内容"
                                width="580">
                        </el-table-column>
                        <el-table-column
                                prop="time"
                                label="评论时间">
                        </el-table-column>
                    </el-table>
                    <div v-if="tableData.total>5">
                        <div style="text-align: center;margin-top: 20px">
                            <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :page-count="Number(tableData.last_page)"
                                    @current-change="changePage"
                            >
                            </el-pagination>
                        </div>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="头像修改" style="height: 500px;float: left">
                    <div style="float: left">
                        <img :src="userInfo.user_pic" style="width: 150px;height: 150px">
                    </div>
                    <div style="float: left;margin-left: 20px">
                        <el-upload
                                class="upload-demo"
                                drag
                                action="/api/user/userpic"
                                name="user_pic"
                                :on-success="handleAvatarSuccess"
                                multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                将文件拖到此处，或<em>点击上传</em>
                            </div>
                            <div class="el-upload__tip" slot="tip">
                                只能上传jpg/png文件，且不超过500kb
                            </div>
                        </el-upload>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="密码修改" style="height: 500px;float: left">
                    <el-row :gutter="10">
                     <el-col :span="6">

                     </el-col>
                    </el-row>
                        <el-form ref="ruleForm" label-width="80px">
                            <el-form-item label="原密码">
                                <el-input v-model="userInfo.oldpass" type="password"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码">
                                <el-input v-model="userInfo.newpass" type="password"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码">
                                <el-input v-model="userInfo.repass" type="password"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button
                                        :loading="loading"
                                        type="primary"
                                        @click="editpass('ruleForm')">
                                    立即修改
                                </el-button>

                            </el-form-item>
                        </el-form>

                </el-tab-pane>


            </el-tabs>
        </el-card>

    </el-row>
</template>
<script>
    export default {
        data() {
            return {
                imageUrl: '',
                loading:false,
                userInfo:[],
                tabPosition: 'left',
                activeName:'first',
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { type: 'phone' , message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { type: 'email' , message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],


                },
                tableData: []
            };
        },
        methods:{
            editpass(formName) {
                console.log(this.userInfo)
                if(this.userInfo.user_name=='' || this.userInfo.newpass==''||this.userInfo.repass==''){
                    this.$message.error("请填写完整")
                }else if(this.userInfo.newpass!==this.userInfo.repass){
                    this.$message.warning("两次输入密码不一致")
                }else{

                }
            },
            submitForm(formName) {
                // console.log(this.userInfo)
                if(this.userInfo.user_name=='' || this.userInfo.user_phone==''||this.userInfo.user_qq==''){
                    this.$message.error("不能为空")
                }else{
                    this.loading = true
                    this.$axios.post('/api/user/updateuserinfo',{
                        user_name:this.userInfo.user_name,
                        user_phone:this.userInfo.user_phone,
                        user_qq:this.userInfo.user_qq
                    }).then(data=>{
                            if(data.data.code==1){
                                this.$message.success("修改成功")
                                this.loading = false
                            }else{
                                this.$message.warning("修改失败或未修改")
                                this.loading = false

                            }
                        })
                }
            },
            // 获取用户信息
            getUserInfo(){
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                });
                this.$axios.post('/api/user/getuserinifo')
                    .then(data=>{
                        this.userInfo = data.data.data
                        loading.close();
                    })
            },
            // 上传图片成功的回调
            handleAvatarSuccess(res, file) {
                this.imageUrl = file.response.path;
                this.userInfo.user_pic = file.response.path
                // console.log(file)
            },
            // 获取用户评论
            getComment(page=1){
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                });
                this.$axios.post('/api/user/getcomment?page='+page)
                    .then(data=>{
                        this.tableData = data.data.data
                        loading.close();
                        console.log(this.tableData)
                    })
            },
            // 分页
            changePage(page){
                // console.log(page)
                this.getComment(page)
            }


        },
        created(){
            this.getUserInfo()
            this.getComment()
        }
    };
</script>
<style>
    .list{
        display: block;
        margin:20px 0px;
        color: #666;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        height: 50px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
    .el-upload-dragger {
        background-color: #fff;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 200px;
        height: 100px;
        text-align: center;
        position: relative;
        overflow: hidden;
    }
</style>