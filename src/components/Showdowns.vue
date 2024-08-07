<!--
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: previewer for showdowns
-->

<script type="text/javascript">
import showdowns from '@jhuix/showdowns';

export default {
  name: 'mdse-showdowns',
  props: {
    markdown: String,
    flavor: {
      type: String,
      required: false,
      default: 'github',
      validator: (flavor) => ['ghost', 'vanilla', 'github'].includes(flavor)
    },
    plantumlImageFormat: {
      type: String,
      required: false,
      default: 'svg',
      validator: (imgFmt) => ['png', 'svg', 'jpg'].includes(imgFmt)
    },
    mermaidTheme: {
      type: String,
      required: false,
      default: 'default',
      validator: (theme) => ['default', 'forest', 'dark', 'neutral'].includes(theme)
    },
    vegaTheme: {
      type: String,
      required: false,
      default: 'vox',
      validator: (theme) => ['excel', 'ggplot2', 'quartz', 'vox', 'dark'].includes(theme)
    },
    vegaRenderer: {
      type: String,
      required: false,
      default: 'svg',
      validator: (renderer) => ['canvas', 'svg'].includes(renderer)
    },
    /**
     * Showdowns options
     * @see https://github.com/jhuix/showdowns#defaultoptions
     */
    showdownOptions: {
      type: Object,
      required: false,
      default: () => ({})
    },
    mermaidOptions: {
      type: Object,
      required: false,
      default: () => ({})
    },
    plantumlOptions: {
      type: Object,
      required: false,
      default: () => ({})
    },
    vegaOptions: {
      type: Object,
      required: false,
      default: () => ({})
    },
    /**
     * Showdowns extensions
     * @see https://github.com/jhuix/showdowns#defaultextensions
     */
    extensions: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      showdownsOptions: {
        showdown: {},
        mermaid: {},
        plantuml: {},
        vega: {}
      },
      showdownsExtensions: {},
      cssTypes: {},
      scripts: [],
      outputHtml: ''
    };
  },
  watch: {
    flavor(val) {
      if (!this.showdownsOptions.showdown.hasOwnProperty('flavor')) {
        const options = { flavor: val };
        showdowns.setShowdownOptions(options);
      }
    },
    plantumlImageFormat(val) {
      if (!this.showdownsOptions.plantuml.hasOwnProperty('imageFormat')) {
        showdowns.setPlantumlOptions({ imageFormat: val });
      }
    },
    mermaidTheme(val) {
      if (!this.showdownsOptions.mermaid.hasOwnProperty('theme')) {
        showdowns.setMermaidOptions({ theme: val });
      }
    },
    vegaTheme(val) {
      if (!this.showdownsOptions.vega.hasOwnProperty('theme')) {
        showdowns.setVegaOptions({ theme: val });
      }
    },
    vegaRenderer(val) {
      if (!this.showdownsOptions.vega.hasOwnProperty('renderer')) {
        showdowns.setVegaOptions({ renderer: val });
      }
    },
    showdownOptions: {
      deep: true,
      handler(options) {
        if (options) {
          this.showdownsOptions.showdown = Object.assign(this.showdownsOptions.showdown || {}, options);
          showdowns.setShowdownOptions(this.showdownsOptions.showdown);
        }
      }
    },
    mermaidOptions: {
      deep: true,
      handler(options) {
        if (options) {
          this.showdownsOptions.mermaid = Object.assign(this.showdownsOptions.mermaid || {}, options);
          showdowns.setMermaidOptions(this.showdownsOptions.mermaid);
        }
      }
    },
    plantumlOptions: {
      deep: true,
      handler(options) {
        if (options) {
          this.showdownsOptions.plantuml = Object.assign(this.showdownsOptions.plantuml || {}, options);
          showdowns.setPlantumlOptions(this.showdownsOptions.plantuml);
        }
      }
    },
    vegaOptions: {
      deep: true,
      handler(options) {
        if (options) {
          this.showdownsOptions.vega = Object.assign(this.showdownsOptions.vega || {}, options);
          showdowns.setVegaOptions(this.showdownsOptions.vega);
        }
      }
    },
    extensions: {
      deep: true,
      handler(exts) {
        if (exts) {
          this.showdownsExtensions = Object.assign(this.showdownsExtensions, exts);
          for (let prop in exts) {
            if (exts.hasOwnProperty(prop)) {
              showdowns.addExtension(prop, exts[prop]);
            }
          }
        }
      }
    },
    inputMarkdown(val) {
      const that = this;
      showdowns
        .makeHtml(this.inputMarkdown, (csstypes) => {
          that.cssTypes = csstypes;
        })
        .then((res) => {
          if (typeof res === 'object') {
            that.scripts = res.scripts;
            that.outputHtml = res.html;
          } else {
            that.scripts = [];
            that.outputHtml = res;
          }
          that.$nextTick(() => {
            showdowns.completedHtml(that.scripts, '.showdowns');
          });
        })
        .catch((err) => {
          that.scripts = [];
          that.outputHtml = '';
          console.log(err);
        });
    }
  },
  computed: {
    inputMarkdown() {
      return this.markdown === null ? this.$slots.default[0].text : this.markdown;
    }
  },
  methods: {
    initialize() {
      showdowns.setShowdownOptions(Object.assign({ flavor: this.flavor }, this.showdownsOptions.showdown));
      showdowns.setMermaidOptions(Object.assign({ theme: this.mermaidTheme }, this.showdownsOptions.mermaid));
      showdowns.setPlantumlOptions(
        Object.assign({ imageFormat: this.plantumlImageFormat }, this.showdownsOptions.plantuml)
      );
      showdowns.setVegaOptions(
        Object.assign({ theme: this.vegaTheme, renderer: this.vegaRenderer }, this.showdownsOptions.vega)
      );
      showdowns.init();
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
  },
  mounted() {
    this.initialize();
  }
};
</script>

<style lang="stylus">
@import '../../node_modules/@jhuix/showdowns/dist/showdowns.min.css';
@import '../../src/assets/stylus/preview.styl';
</style>
