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
    const html = this.$route.query.html ? this.$route.query.html : sessionStorage.previewHtml;
    if (html) {
      this.outputHtml = zlibcodec.zDecode(html);
    }
  },
  render(h) {
    return h('div', {
      class: {
        "showdowns-container": true
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
