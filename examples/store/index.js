/*
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: example of mardown-showdowns-editor
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    previewContent: ''
  },
  mutations: {
    setPreviewContent(state, content) {
      state.previewContent = content;
    }
  },
  actions: {
    setPreviewContent(context, content) {
      context.commit('setPreviewContent', content);
    }
  }
});

export default store;
