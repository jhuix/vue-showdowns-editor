<!--
 * @Description: example of showdown-mardown-editor
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-09-06 09:59:50
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-10-04 11:46:33
 -->

<template>
  <showdown-mde
    :hasToolbar="hasToolbar"
    :markdown="mdDoc"
    :previewExtensions="previewExtensions"
    @toolclick="handlerToolClick"
    ref="smde"
  ></showdown-mde>
</template>

<script>
import { ShowdownMDE } from '../../src';
import axios from 'axios';
import zlibcodec from '../../src/scripts/utils/zlib-codec.js';
//例如：若需加入showdown-footnotes的showdown扩展时,
//现在<script/>区域import该showdown-footnotes扩展，
//然后再在下面的export default对象的data返回对象中的数组属性previewExtensions加入该showdown-footnotes扩展。
//代码例子如下：
//import showdownFootnotes from '../src/scripts/showdown-ext/showdown-footnotes.js';
//export default
// data() {
//   previewExtensions: [showdownFootnotes]
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
    [ShowdownMDE.name]: ShowdownMDE
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
      if (this.$refs.smde && type === 'preview') {
        const html = zlibcodec.encode(this.$refs.smde.getPreviewHtml());
        //this.$store.dispatch('setPreviewHtml', html);
        sessionStorage.previewHtml = html;
        let url = window.location.protocol === 'file:' ? './index.html' : './';
        url += '#/preview';
        window.open(url);
      }
    }
  },
  created() {
    console.log('the app is created!', this);

    this.$nextTick(function() {
      this.$refs.smde.addRootMenu(previewMenuItem);

      let that = this;
      var defHtml = axios.get(
        'https://raw.githubusercontent.com/jhuix/showdown-markdown-editor/master/docs/demo.md'
      );
      defHtml
        .then(function(res) {
          that.mdDoc = res.data;
          return axios.get(
            "https://raw.githubusercontent.com/jhuix/showdown-markdown-editor/master/docs/Showdown's-Markdown-syntax.md"
          );
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
<style lang="stylus"></style>
