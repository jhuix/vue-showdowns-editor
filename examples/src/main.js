/*
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: example of mardown-showdowns-editor
 */

import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

//import VueMDSE from '../src';
//Vue.use(VueMDSE);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app');
