/*
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 */
const I18N = {
  // 定义默认语言为中文zh-cn
  locale: 'zh-cn',
  messages: {
    'zh-cn': require('@/assets/i18n/zh-cn.json'),
    en: require('@/assets/i18n/en.json')
  }
};

const i18n = Object.create(
  {},
  {
    locale: {
      get: function() {
        return I18N.locale;
      },
      set: function(val) {
        if (I18N.messages.hasOwnProperty(val)) {
          I18N.locale = val;
        }
      }
    },
    lang: {
      get: function() {
        return I18N.messages[I18N.locale];
      },
      set: function(val) {
        if (I18N.messages.hasOwnProperty(val)) {
          I18N.locale = val;
        }
      }
    }
  }
);
export default i18n;
