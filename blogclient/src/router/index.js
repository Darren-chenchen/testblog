import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'

import MyNote from '../components/myNote/myNote.vue'
import ArticleDetail from '../components/myNote/articleDetail.vue'
import Content from '../components/content/content.vue'
import Search from '../components/myNote/search.vue'
import Myworks from '../components/myWorks/myWorks.vue'
import WorksDetail from '../components/myWorks/worksDetail.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: App,
      redirect: '',
      children: [
        {
          path: '/',
          component: Content,
          redirect: '/mynote',
          children: [
            {
              path: '/mynote',
              component: MyNote
            },
            {
              path: '/detail/:articleId',
              name: 'ArticleDetail',
              component: ArticleDetail
            }
          ]
        },
        {
          path: '/mywork',
          name: 'Myworks',
          component: Myworks,
          children: [
          ]
        },
        {
          path: '/mywork/worksDetail',
          name: 'WorksDetail',
          component: WorksDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
