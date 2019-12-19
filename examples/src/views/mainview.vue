<!--
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: example of mardown-showdowns-editor
-->

<template>
  <mdse-showdowns-editor
    :hasToolbar="hasToolbar"
    :markdown="mdDoc"
    :locale="locale"
    :previewExtensions="previewExtensions"
    @toolClick="handlerToolClick"
    @localeChanged="handlerLocaleChanged"
    ref="mdse"
  ></mdse-showdowns-editor>
</template>

<script>
import { ShowdownsEditor } from '@jhuix/vue-showdowns-editor';
import axios from 'axios';
import zlibcodec from '../utils/zlib-codec.js';
//例如：若需加入showdown-footnotes的showdown扩展时,
//现在<script/>区域import该showdown-footnotes扩展，
//然后再在下面的export default对象的data返回对象中的数组属性previewExtensions加入该showdown-footnotes扩展。
//代码例子如下：
//import showdownFootnotes from '../src/scripts/showdown-ext/showdown-footnotes.js';
//export default
// data() {
//   previewExtensions: {'showdown-footnotes': showdownFootnotes}
// }
//}

// 'lesser-dark', 'mdn-like', 'neat', 'rubyblue', 'seti', 'darcula', 'idea', 'the-matrix']
function getOutsideMenu(locale) {
  return [
    {
      type: 'preview',
      text: 'i18n://lang.main.preview?预览',
      shortkey: 'Ctrl+Alt+P',
      menu: true,
      disabled: false
    },
    {
      type: 'separator'
    },
    {
      type: 'theme:default',
      text: 'default',
      menu: true,
      disabled: false
    },
    {
      type: 'theme:lesser-dark',
      text: 'lesser-dark',
      menu: true,
      disabled: false
    },
    {
      type: 'theme:mdn-like',
      text: 'mdn-like',
      menu: true,
      disabled: false
    },
    {
      type: 'theme:neat',
      text: 'neat',
      menu: true,
      disabled: false
    },
    {
      type: 'theme:rubyblue',
      text: 'rubyblue',
      menu: true,
      disabled: false
    },
    {
      type: 'theme:seti',
      text: 'seti',
      menu: true,
      disabled: false
    },
    {
      type: 'theme:darcula',
      text: 'darcula',
      menu: true,
      disabled: false
    },
    {
      type: 'theme:idea',
      text: 'idea',
      menu: true,
      disabled: false
    },
    {
      type: 'theme:the-matrix',
      text: 'the-matrix',
      menu: true,
      disabled: false
    },
    {
      type: 'theme:solarized light',
      text: 'solarized light',
      menu: true,
      disabled: false
    },
    {
      type: 'theme:solarized dark',
      text: 'solarized dark',
      menu: true,
      disabled: false
    }
  ];
}

const editor_themes = [
  'default',
  'lesser-dark',
  'mdn-like',
  'neat',
  'rubyblue',
  'seti',
  'darcula',
  'idea',
  'the-matrix',
  'solarized light',
  'solarized dark'
];

export default {
  name: 'mainview',
  components: {
    [ShowdownsEditor.name]: ShowdownsEditor
  },
  data() {
    return {
      mdDoc: '',
      locale: 'zh-cn',
      theme: 'default',
      hasToolbar: true,
      previewExtensions: null
    };
  },
  methods: {
    handlerToolClick(type) {
      if (this.$refs.mdse) {
        if (type === 'preview') {
          const content = zlibcodec.zEncode(JSON.stringify(this.$refs.mdse.getPreviewHtml()));
          //this.$store.dispatch('setPreviewHtml', html);
          sessionStorage.previewContent = content;
          let url = window.location.protocol === 'file:' ? './index.html' : './';
          url += '#/preview';
          window.open(url);
        } else if (type.startsWith('theme:')) {
          type = type.substr(6);
          if (editor_themes.indexOf(type) != -1) {
            this.$refs.mdse.setEditorTheme(type);
            localStorage['vue-mdse:theme'] = type;
          }
        }
      }
    },
    handlerLocaleChanged(i18n) {
      this.locale = i18n.locale;
      localStorage['vue-mdse:locale'] = this.locale;
    }
  },
  created() {
    console.log('the app is created!');
    if (localStorage) {
      if (localStorage.hasOwnProperty('vue-mdse:locale')) {
        this.locale = localStorage['vue-mdse:locale'];
      }
      if (localStorage.hasOwnProperty('vue-mdse:theme')) {
        this.theme = localStorage['vue-mdse:theme'];
      }
    }
    console.log(`the app locale is ${this.locale} and theme is ${this.theme}!`);

    this.$nextTick(function() {
      this.$refs.mdse.addOutsideMenu(getOutsideMenu);
      this.$refs.mdse.setEditorTheme(this.theme);
      let that = this;
      var defHtml = axios.get('https://jhuix.github.io/showdowns/showdowns-features.md');
      defHtml
        .then(function(res) {
          that.mdDoc = res.data;
          return axios.get("https://jhuix.github.io/showdowns/Showdown's-Markdown-syntax.md");
        })
        .then(function(res) {
          that.mdDoc = that.mdDoc + '\n\n' + res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
};
</script>
<style lang="stylus">
@import ('~@/../node_modules/codemirror/theme/lesser-dark.css');
@import ('~@/../node_modules/codemirror/theme/mdn-like.css');
@import ('~@/../node_modules/codemirror/theme/neat.css');
@import ('~@/../node_modules/codemirror/theme/rubyblue.css');
@import ('~@/../node_modules/codemirror/theme/seti.css');
@import ('~@/../node_modules/codemirror/theme/darcula.css');
@import ('~@/../node_modules/codemirror/theme/idea.css');
@import ('~@/../node_modules/codemirror/theme/the-matrix.css');
@import ('~@/../node_modules/codemirror/theme/the-matrix.css');
@import ('~@/../node_modules/codemirror/theme/solarized.css');
</style>
