import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/MyLogin.vue"
import Home from "@/components/MyHome.vue"
import Users from "@/components/menus/MyUsers.vue"
import Rights from "@/components/menus/MyRights.vue"
import Goods from "@/components/menus/MyGoods.vue"
import Orders from "@/components/menus/MyOrders.vue"
import Settings from "@/components/menus/MySettings.vue"
import UserDeatail from "@/components/user/MyUserDetail.vue";

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    // 路由重定向
    { path:"/", redirect:"/login"},
    { path:"/home", redirect:"/home/user"},
    // 登陆路由规则
    { path: '/login',component:Login },
    // 后台主页的路由规则
    { path: "/home", component:Home, children:[
      { path:"user", component:Users},
      { path:"rights", component:Rights},
      { path:"goods", component:Goods},
      { path:"orders", component:Orders},
      { path:"settings", component:Settings},
      // 用户详情页的规则
      { path:"userinfo/:id",  component:UserDeatail, props:true}
    ]}

  ],

})

// 路由全局前置守卫
router.beforeEach(function(to,from,next){
  if(to.path === "/home"){
    const token = localStorage.getItem("token");
    if(token){
      next();
    }else{
      next("/login");
    }
  }else{
    next();
  }
})

export default router