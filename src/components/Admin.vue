<template>
	<div>
		<h1>已经登录</h1>
		<button @click="getinfo">获取详情</button>
		<button @click="logout">退出</button>
	</div>

</template>
<script>
	export default{
		data(){
			return {

			}
		},
		methods:{
			logout(){
				// 退出登录
				this.$store.commit("del_token")
				// 跳转页面
				this.$router.push("login")
			},
			getinfo(){
				this.$axios.post("/api/auth/me")
				.then(data=>{
					console.log(data)
				})
				.catch(error=>{
					console.log(error)
				})
			}
		}
	}

</script>