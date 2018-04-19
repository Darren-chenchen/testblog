import Vue from 'vue'
import Router from 'vue-router'
import AdminHome from '../components/home/home.vue'
import Login from '../components/login/login.vue'
import UserList from '../components/user/userList.vue'
import CreatUser from '../components/user/createUser.vue'
import ArticleMain from '../components/article/articleMain.vue'
import WriteArticle from '../components/article/writeArticle.vue'
import ArticleDetail from '../components/article/articleDetail.vue'
import DraftList from '../components/article/draftList.vue'
import PulishWork from '../components/article/pulishWork.vue'
import WorkMgr from '../components/article/worksMgr.vue'

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
        },
        {
          path: '/article',
          component: ArticleMain
        },
        {
          path: '/detail/:id',
          name: 'ArticleDetail',
          component: ArticleDetail
        },
        {
          path: '/draftList',
          name: 'DraftList',
          component: DraftList
        },
        {
          path: '/workMgr',
          name: 'WorkMgr',
          component: WorkMgr
        }
      ]
    },
    {
      path: '/writeArticle',
      name: 'WriteArticle',
      component: WriteArticle
    },
    {
      path: '/pulishWork',
      name: 'PulishWork',
      component: PulishWork
    }
  ]
})
