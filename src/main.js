// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
//设置title
import VueWechatTitle from 'vue-wechat-title'

import vueToTop from 'vue-totop'
//or require
// var vueToTop = require('vue-totop')
Vue.use(ElementUI);
Vue.use(vueToTop)

window.Hls = require('hls.js');

Vue.use(VueWechatTitle)

Vue.use(VueLazyload,{
    error:'https://tiantian123-1254212318.cos.ap-guangzhou.myqcloud.com/video/loading.gif',
    loading:'https://tiantian123-1254212318.cos.ap-guangzhou.myqcloud.com/video/loading.gif'
})

// Vue.prototype.baseURL = process.env.API_ROOT;

Vue.config.productionTip = false
Vue.prototype.$axios= axios
axios.defaults.headers.common['Authorization'] = store.state.token;
/* eslint-disable no-new */

// 设置类似于常量
Vue.prototype.HOST='/api'

// 添加请求拦截器
axios.interceptors.request.use(config => {
// 在发送请求之前做些什么
//判断是否存在token，如果存在将每个页面header都添加token
	if(store.state.token){
		config.headers.common['Authorization']=store.state.token
	}
 
	return config;
}, error => {
// 对请求错误做些什么
	return Promise.reject(error);
});
 
// http response 拦截器
axios.interceptors.response.use(
response => {
 
	return response;
},
error => {
 
if (error.response) {
	switch (error.response.status) {
		case 401:
		this.$store.commit('del_token');
		router.replace({
			path: '/login',
			query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
		})
	}
}
return Promise.reject(error.response.data)
});

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
