<!--
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: example of mardown-showdowns-editor
-->

<template>
  <mdse-showdowns-editor
    :hasToolbar="hasToolbar"
    :markdown="mdDoc"
    :previewExtensions="previewExtensions"
    @toolclick="handlerToolClick"
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

const previewMenuItem = {
  type: 'preview',
  text: '预览',
  shortkey: 'Ctrl+Alt+P',
  menu: true,
  disabled: false
};

export default {
  name: 'mainview',
  components: {
     [ShowdownsEditor.name]: ShowdownsEditor
  },
  data() {
    return {
      mdDoc: '',
      hasToolbar: true,
      previewExtensions: null
    };
  },
  methods: {
    handlerToolClick(type) {
      if (this.$refs.mdse && type === 'preview') {
        const content = zlibcodec.zEncode(JSON.stringify(this.$refs.mdse.getPreviewHtml()));
        //this.$store.dispatch('setPreviewHtml', html);
        sessionStorage.previewContent = content;
        let url = window.location.protocol === 'file:' ? './index.html' : './';
        url += '#/preview';
        window.open(url);
      }
    }
  },
  created() {
    console.log('the app is created!', this);

    this.$nextTick(function() {
      this.$refs.mdse.addRootMenu(previewMenuItem);

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
@import '../../../../markdown-showdowns-editor/dist/lib/vue-mdse.css';
</style>

