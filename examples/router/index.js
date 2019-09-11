/*
 * @Description: example of showdown-mardown-editor
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-09-06 09:59:50
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 19:52:04
 */

import Vue from 'vue';
import Router from 'vue-router';
import Mainview from '../mainview';
import Preview from '../preview';

Vue.use(Router);

const router = new Router({
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
