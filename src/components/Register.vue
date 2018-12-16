<template>
    <el-row style="margin-top: 60px">
        <el-col>
            <div class="col-md-6 col-md-offset-3">
                <el-card class="box-card" style="margin: 90px auto;">
                    <div style="margin: 20px 50px;">
                        <div class="row">
                            <div class="col-md-6" style="margin-bottom: 20px">
                                <h2>用户注册</h2>
                            </div>
                        </div>
                        <el-form ref="form" :model="form" label-width="0px" :rules="rules" status-icon>
                            <el-form-item prop="name">
                                <el-input v-model="form.name" autocomplete="off" placeholder="用户名  3-15个字符" clearable></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" v-model="form.password" clearable autocomplete="off" placeholder="密码  6-20个字符"></el-input>
                            </el-form-item>
                            <el-form-item prop="checkpass">
                                <el-input type="password" v-model="form.checkpass" clearable autocomplete="off" placeholder="确认密码  与密码一致"></el-input>
                            </el-form-item>
                            <el-form-item prop="email">
                                <el-input type="email" v-model="form.email" clearable autocomplete="off" placeholder="邮箱"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <app-yzm></app-yzm>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" :loading="loading" @click="onSubmit('form')" size="">立即注册</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import Yzm from '@/components/common/Yzm'
    export default {
        name: 'Login',
        data () {
            var validatePass2 = (rule, value, callback) => {
                if (this.form.password === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                loading:false,
                autologin:true,
                form: {
                    name:'',
                    email: '',
                    password:'',
                    checkpass:''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }

                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }

                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    checkpass: [

                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            onSubmit(formName) {
                if(this.$store.state.yzm){
                    this.$message.warning('请拖动滑块验证');
                }else{
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.loading = true
                            this.$axios.post('/api/auth/register', {
                                user_name:this.form.name,
                                user_email: this.form.email,
                                password: this.form.password
                            }).then(data => {
                                console.log(data)
                                if(data.data.code==1){
                                    this.$message.success(data.data.msg);
                                    this.loading = false
                                    this.$store.state.yzm== false
                                    this.$router.push('/login')
                                }

                            }).catch(error=>{
                                this.loading = false
                            })
                        }
                        else {
                            // console.log('error submit!!');
                            return false;
                        }
                    });

                }
            }
        },
        components:{
            'app-yzm':Yzm
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
