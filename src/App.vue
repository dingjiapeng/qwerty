<template>
  <div id="app">
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    getinfo(){
      this.$axios.post(this.HOST+'/auth/me')
      .then(data=>{
        console.log(data);
      })
    }
  }
}
</script>

<style>

  a{
    text-decoration:none;
    color:#666;
  }
  li{
    list-style: none;

  }
  li:hover{
    cursor:pointer;
  }
  body{
    min-width:1000px;
    font-family:"Microsoft YaHei";
  }
  .el-card__header {
    padding: 10px 10px;
    border-bottom: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .nav {
    padding-left: 15px;
    margin-bottom: 0;
    list-style: none;
  }
  /*@media (min-width: 768px)*/
  .navbar-right {
    float: right!important;
    margin-right: 15px;
  }
  .el-card__body {
    padding: 13px!important;
  }

</style>
