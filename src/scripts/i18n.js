/*
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 */
const I18N = {
  'zh-cn': require('@/assets/i18n/zh-cn.json'),
  en: require('@/assets/i18n/en.json')
};

const i18n = Object.create(
  {
    // 定义默认语言为中文zh-cn
    locale: 'zh-cn'
  },
  {
    lang: {
      get: function() {
        if (I18N.hasOwnProperty(this.locale)) {
          return I18N[this.locale];
        }
        return I18N['en'];
      },
      set: function(val) {
        if (I18N.hasOwnProperty(locale)) {
          this.locale = val;
        }
      }
    },
    getLang: function(locale) {
      if (I18N.hasOwnProperty(locale)) {
        return I18N[locale];
      }
      return this.lang;
    }
  }
);
export default i18n;
