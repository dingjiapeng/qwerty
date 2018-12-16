import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import store from '@/store'
import Search from '@/components/search/Index'
Vue.use(Router)

// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
	store.commit('set_token', sessionStorage.getItem('token'))
}

const router = new Router({
	routes: [
	    {
	      path: '/',
	      name: 'Home',
	      component: resolve => require(['@/components/Home'],resolve),
	      // 是否需要登录才能查看
	      meta:{
	      	// title:"悦目视频"
		  },
			children:[
				{
                    path: '/',
                    name: 'index',
                    // component: Index,
                    component: resolve => require(['@/components/common/Index'],resolve),
					meta:{
                    	title:"悦目视频|汇聚全网精彩视频"
					}
				},
				{
                    path: '/detail/:vid',
                    name: 'detail',
                    component: resolve => require(['@/components/detail/Detail'],resolve),
                    meta:{
                        title:"悦目视频|视频详情页"
                    }
                },
                {
                    path: '/player/:vid/:aid',
                    name: 'player',
                    component: resolve => require(['@/components/play/Player'],resolve),
                    meta:{
                        title:"悦目视频|视频播放页",
                        requireAuth:true
                    }
                },
				{
                    path: '/dianying',
                    name: 'dianying',
                    component: resolve => require(['@/components/type/DianYing'],resolve),
                    meta:{
                        title:"悦目视频|电影高级筛选"
                    }
                },
				{
                    path: '/dianshiju',
                    name: 'dianshiju',
                    component: resolve => require(['@/components/type/DianShiJu'],resolve),
                    meta:{
                        title:"悦目视频|剧集高级筛选"
                    }
                },
				{
                    path: '/zongyi',
                    name: 'zongyi',
                    component: resolve => require(['@/components/type/ZongYi'],resolve),
                    meta:{
                        title:"悦目视频|综艺高级筛选"
                    }
                },
                {
                    path: '/dongman',
                    name: 'dongman',
                    component: resolve => require(['@/components/type/DongMan'],resolve),
                    meta:{
                        title:"悦目视频|动漫高级筛选"
                    }
                },
                {
                    path: '/login',
                    name: 'login',
                    component: resolve => require(['@/components/Login'],resolve),
                    // meta:{requireAuth:true}
                },
                {
                    path: '/gbook',
                    name: 'gbook',
                    component: resolve => require(['@/components/gbook/Gbook'],resolve),
                    meta:{requireAuth:true}
                },
                {
                    path: '/search/:key',
                    name: 'search',
                    component: Search,
                    // meta:{requireAuth:true}
                },
                {
                    path: '/register',
                    name: 'register',
                    component: resolve => require(['@/components/Register'],resolve),
                    // meta:{requireAuth:true}
                },
                {
                    path: '/user',
                    name: 'user',
                    component: resolve => require(['@/components/user/Index'],resolve),
                    meta:{requireAuth:true}
                },

			],
            redirect: { name: 'index' }
	    },
        {
            path: '/close',
            name: 'close',
            component: resolve => require(['@/components/Close'],resolve),
        }



	  ]
});
 
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
	if (to.matched.some(r => r.meta.requireAuth)) {           //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
			if (store.state.token) {
				next();
			}
			else {
				next({
					path: '/login',
					query: {redirect: to.fullPath}
				})
			}
		}
	else {
		next();
	}
})

export default router;