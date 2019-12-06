/*
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: showdown markdown editor
 */

import showdowns from '@jhuix/showdowns';
import mdse from './components/mdse.vue';
import Showdowns from './components/Showdowns.vue';
import Editor from './components/Editor.vue';

// 以数组的结构保存组件，便于遍历
const components = { mdse, Showdowns, Editor };

// 定义 install 方法
const install = function(Vue, config) {
  if (config) {
    if (config.editOptions) {
      mdse.props.editOptions.default = () => config.editOptions;
    }
    if (config.previewOptions) {
      mdse.props.previewOptions.default = () => config.previewOptions;
    }

    if (config.previewExtensions) {
      mdse.props.previewExtensions.default = () => config.previewExtensions;
    }
  }

  // 遍历并注册全局组件
  for (let key in components) {
    Vue.component(components[key].name, components[key]);
  }
};

const VueMDSE = { mdse, Showdowns, Editor, showdowns, install };

export default VueMDSE;
export { mdse, Showdowns, Editor, showdowns, install };
