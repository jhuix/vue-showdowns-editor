/*
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: markdown showdowns editor
 */

import _showdowns from '@jhuix/showdowns';
import ShowdownsEditor from './components/ShowdownsEditor.vue';
import Showdowns from './components/Showdowns.vue';
import Editor from './components/Editor.vue';

const showdowns = window && window.showdowns ? window.showdowns : _showdowns;
// 以数组的结构保存组件，便于遍历
const components = [ShowdownsEditor, Showdowns, Editor];

// 定义 install 方法
const install = function (Vue, config) {
  if (config) {
    if (config.editOptions) {
      ShowdownsEditor.props.editOptions.default = () => config.editOptions;
    }
    if (config.previewOptions) {
      ShowdownsEditor.props.previewOptions.default = () => config.previewOptions;
    }

    if (config.previewExtensions) {
      ShowdownsEditor.props.previewExtensions.default = () => config.previewExtensions;
    }
  }

  // 遍历并注册全局组件
  components.map((componet) => {
    Vue.component(componet.name, componet);
  });
};

const VueMDSE = { ShowdownsEditor, Showdowns, Editor, showdowns, install };
export default VueMDSE;
export { ShowdownsEditor, Showdowns, Editor, showdowns, install };
