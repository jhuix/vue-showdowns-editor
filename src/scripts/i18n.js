/*
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 */

const I18nPath = {
  _cache: {},

  /**
   * External parse that check for a cache hit first
   */
  parsePath: function(path) {
    let hit = this._cache[path];
    if (!hit) {
      hit = path.split('.');
      if (hit) {
        this._cache[path] = hit;
      }
    }
    return hit || [];
  },

  /**
   * Get path value from path string
   */
  getPathValue: function(obj, path) {
    if (typeof obj !== 'object' || !obj) {
      return null;
    }

    const paths = this.parsePath(path);
    if (paths.length === 0) {
      return null;
    } else {
      const length = paths.length;
      let last = obj;
      let i = 0;
      while (i < length) {
        const value = last[paths[i]];
        if (typeof value === 'undefined') {
          return null;
        }
        last = value;
        i++;
      }

      return last;
    }
  }
};

const I18N = {
  'zh-cn': require('@/assets/i18n/zh-cn.json'),
  'zh-cht': require('@/assets/i18n/zh-cht.json'),
  en: require('@/assets/i18n/en.json'),
  ko: require('@/assets/i18n/ko.json'),
  ja: require('@/assets/i18n/ja.json'),
  ru: require('@/assets/i18n/ru.json')
};

const i18n_prefix = 'i18n://lang.';

const i18n = {
  // 定义默认语言为中文zh-cn
  locale: 'zh-cn',
  get lang() {
    if (I18N.hasOwnProperty(this.locale)) {
      return I18N[this.locale];
    }
    return I18N['en'];
  },
  set lang(val) {
    if (I18N.hasOwnProperty(locale)) {
      this.locale = val;
    }
  },
  getLang: function(locale) {
    if (I18N.hasOwnProperty(locale)) {
      return I18N[locale];
    }
    return this.lang;
  },
  getMessage: function(key, locale) {
    if (key && key.startsWith(i18n_prefix)) {
      if (typeof locale === 'undefined' || !locale) {
        locale = this.locale;
      }
      const keys = key.substr(i18n_prefix.length).split('?');
      if (keys) {
        const msg = I18nPath.getPathValue(this.getLang(locale), keys[0]);
        return msg ? msg : keys.length > 1 ? keys.slice(1).join('?') : '';
      }
    }
    return key;
  }
};
export default i18n;
