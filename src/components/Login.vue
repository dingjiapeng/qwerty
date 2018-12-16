<template>
  <el-row style="margin-top: 60px">
    <el-col>
      <div class="col-md-6 col-md-offset-3">
        <el-card class="box-card" style="margin: 90px auto;">
          <div style="margin: 20px 50px;">
            <div class="row">
              <div class="col-md-6" style="margin-bottom: 20px">
                <h2>用户登录</h2>
              </div>
            </div>
          <el-form ref="form" :model="form" label-width="0px" :rules="rules" status-icon>
            <el-form-item prop="email">
              <el-input v-model="form.email" autocomplete="off" placeholder="邮箱" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="form.password" clearable autocomplete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <app-yzm></app-yzm>
            </el-form-item>
            <el-form-item>
              <div class="row">
                <div class="col-md-6">
                  <el-checkbox v-model="autologin">自动登录</el-checkbox>
                </div>
                <div class="col-md-6" style="text-align: right">
                  <el-button type="text">忘记密码</el-button>
                </div>
              </div>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :loading="loading" @click="onSubmit('form')" size="">立即登录</el-button>
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
      return {
          loading:false,
          autologin:true,
        form: {
            email: '',
            password:''
        },
          rules: {
              email: [
                  {required: true, message: '请输入邮箱', trigger: 'blur'},
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }

              ],
              password: [
                  {required: true, message: '请输入密码', trigger: 'blur'},
                  {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
              ]
          }
      }
    },
    methods:{
      login(){
        //根据api接口获取token
        var url = "/api/auth/login";
        this.$axios.post(url, {
        email: "admin@qq.com",
        password: "123456"
        }).then(res => {
          // console.log(res.data);
          this.$Message.success('登录成功');
          let data = res.data;
          //根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
          this.$store.commit('set_token', 'Bearer'+data.access_token);

          if (this.$store.state.token) {
            this.$router.push('/')
            console.log(this.$store.state.token)
          } else {
            this.$router.replace('/login');
          }

        })
        .catch(error=>{
          this.$Message.error("邮箱或密码不对！")
        })
      },
      onSubmit(formName) {
        if(this.$store.state.yzm){
            this.$message.warning('请拖动滑块验证');
        }else{


            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    //根据api接口获取token
                    this.$axios.post('/api/auth/login', {
                        user_email: this.form.email,
                        password: this.form.password
                    }).then(res => {
                        // console.log(res.data);
                        this.$message.success('登录成功');
                        let data = res.data;
                        //根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
                        this.$store.commit('set_token', 'Bearer'+data.access_token);
                        this.$store.commit("yanzhengma")
                        this.loading = false
                        this.$store.state.yzm=false
                        if (this.$store.state.token) {
                            // this.$message.warning("已经登录")
                            this.$router.go(-1)
                            // console.log(this.$store.state.token)
                        } else {
                            this.$router.replace('/login');
                        }

                    }).catch(error=>{
                        this.$message.error("邮箱或密码不对！")
                        this.loading = false
                        this.$store.state.yzm=false
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
    },
    created(){
        if (this.$store.state.token) {
            this.$router.go(-1)
            // console.log(this.$store.state.token)
        } else {
            this.$router.replace('/login');
        }
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
