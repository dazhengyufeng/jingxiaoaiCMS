import Vue from 'vue'
import Router from 'vue-router'
import tinymce from '@/components/Tinymce'
import subjectList from '@/page/SubjectList'
import checkSubject from '@/components/checkSubject'

import entry from '@/page/entry'

Vue.use(Router)

const vueRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'entry',
      component: entry,
      children: [
        {
          path: '/subjectList',
          component: subjectList,
          meta: {
            keepAlive: true, //该字段表示该页面需要缓存
            isBack: false,
          },
        },
        {
          path: '/checkSubject:id',
          component: checkSubject,
        },
        {
          path: '/tinymce',
          component: tinymce
        },
      ]
    }
  ]
})

vueRouter.beforeEach(function (to, from, next) {
  if (from.path !== '/tinymce' && from.path !== '/subjectList' && from.path !== '/') {
    to.meta.isBack = true; // 设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
  }else {
    to.meta.isBack = false;
  }
  next()
});

export default vueRouter
