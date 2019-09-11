/*
 * @Description: example of showdown-mardown-editor
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-09-06 09:59:50
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 19:51:56
 */
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

//import VueShowdownMDE from '../src';
//Vue.use(VueShowdownMDE);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
