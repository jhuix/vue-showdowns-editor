/*
 * @Description: example of showdown-mardown-editor
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-09-06 09:59:50
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 19:52:04
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    previewHtml: ''
  },
  mutations: {
    setPreviewHtml(state, html) {
      state.previewHtml = html;
    }
  },
  actions: {
    setPreviewHtml(context, html) {
      context.commit('setPreviewHtml', html);
    }
  }
});

export default store;
