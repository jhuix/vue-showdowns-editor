<!--
 * @Description: example of showdown-mardown-editor
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-09-06 09:59:50
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 19:52:04
 -->

<script>
import zlibcodec from '../../src/scripts/utils/zlib-codec.js';

export default {
  name: 'Preview',
  data() {
    return {
      outputHtml: ''
    };
  },
  created() {
    const html = this.$route.query.html
      ? this.$route.query.html
      : sessionStorage.previewHtml;
    if (html) {
      this.outputHtml = zlibcodec.decode(html);
    }
  },
  render(h) {
    return h('div', {
      class: {
        'markdown-preview': true
      },
      domProps: {
        innerHTML: this.outputHtml
      }
    });
  }
};
</script>

<style lang="stylus">
@import '../../node_modules/katex/dist/katex.min.css';
@import '../../src/assets/stylus/preview.styl';

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: rgb(241, 241, 241);
  border-radius: 0;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.25);
  transition: color 0.2s ease;
}

::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(0, 0, 0, 0.15);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 135, 139, 0.8);
}
</style>
