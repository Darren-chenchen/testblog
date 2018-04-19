import Vue from 'vue'
import Router from 'vue-router'
import AdminHome from '../components/home/home.vue'
import Login from '../components/login/login.vue'
import UserList from '../components/user/userList.vue'
import CreatUser from '../components/user/createUser.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/adminHome',
      component: AdminHome,
      children: [
        {
          path: '/userList/:type',
          name: 'UserList',
          component: UserList
        },
        {
          path: '/creatUser',
          component: CreatUser
        }
      ]
    }
  ]
})
