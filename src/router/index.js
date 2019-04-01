import Vue from 'vue'
import Router from 'vue-router'
import tinymce from '@/components/Tinymce'
import subjectList from '@/page/SubjectList'

import entry from '@/page/entry'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'entry',
      component: entry,
      children: [
        {
          path: '/',
          component: subjectList
        },
        {
          path: '/tinymce',
          component: tinymce
        }
      ]
    }
  ]
})
