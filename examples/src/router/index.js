/*
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: example of mardown-showdowns-editor
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Mainview from '../views/mainview.vue';
import Preview from '../views/preview.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'mainview',
      component: Mainview
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    }
  ]
});

export default router;
