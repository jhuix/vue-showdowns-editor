<!--
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: example of mardown-showdowns-editor
-->

<script>
import zlibcodec from '../utils/zlib-codec.js';

export default {
  name: 'Preview',
  data() {
    return {
      outputHtml: ''
    };
  },
  created() {
    const zcontent = this.$route.query.content ? this.$route.query.content : sessionStorage.previewContent;
    if (zcontent) {
      const content = JSON.parse(zlibcodec.zDecode(zcontent));
      this.outputHtml = content.html;
      if (content.cssLinks) {
        content.cssLinks.map(href => {
          const head = document.head || document.getElementsByTagName('head')[0];
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          head.appendChild(link);
        });
      }
      if (content.cssStyles) {
        content.cssStyles.map(css => {
          const head = document.head || document.getElementsByTagName('head')[0];
          let style = document.createElement('style');
          head.appendChild(style);
          style.outerHTML = css;
        });
      }
    }
  },
  render(h) {
    return h('div', {
      class: {
        'showdowns-container': true
      },
      domProps: {
        innerHTML: this.outputHtml
      }
    });
  }
};
</script>

<style lang="stylus">
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
