/*
 * @Description: showdown markdown editor
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-08-18 14:05:41
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 20:03:43
 */

import ShowdownMDE from './components/ShowdownMDE.vue';

// 以数组的结构保存组件，便于遍历
const components = [ShowdownMDE];

// 定义 install 方法
const install = function(Vue, config) {
  if (config) {
    if (config.editOptions) {
      ShowdownMDE.props.editOptions.default = () => config.editOptions;
    }
    if (config.previewOptions) {
      ShowdownMDE.props.previewOptions.default = () => config.previewOptions;
    }

    if (config.previewExtensions) {
      ShowdownMDE.props.previewExtensions.default = () =>
        config.previewExtensions;
    }
  }

  // 遍历并注册全局组件
  components.map(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const VueShowdownMDE = { install, ...components };
export { VueShowdownMDE as default, ShowdownMDE };
