// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
var AV = require('leancloud-storage');



// /*线下*/
var APP_ID = 'Fn9M3G5vsgDh9R7uevmnku36-gzGzoHsz';
var APP_KEY = 'Vo29oNxpjjhdm3K45DiexksY';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
