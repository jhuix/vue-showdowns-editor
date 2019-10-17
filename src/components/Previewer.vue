<!--
 * @Description: previewer for showdown
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-08-26 10:52:33
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 20:28:17
 -->

<script type="text/javascript">
import showdown from 'showdown';
import showdownKatex from 'showdown-katex';
import showdowToc from '@/scripts/showdown-ext/showdown-toc.js';
import showdownAlign from '@/scripts/showdown-ext/showdown-align.js';
import showdownMermaid from '@/scripts/showdown-ext/showdown-mermaid.js';
import showdownPlantuml from '@/scripts/showdown-ext/showdown-plantuml.js';
import showdownFootnotes from '@/scripts/showdown-ext/showdown-footnotes.js';

const getOptions = function(options) {
  return {
    flavor: 'github',
    strikethrough: true,
    tables: true,
    tasklists: true,
    underline: true,
    emoji: true,
    ghCompatibleHeaderId: false,
    rawHeaderId: true,
    ...options
  };
};

const getExtensions = function(extensions) {
  return [
    showdowToc,
    showdownAlign,
    showdownFootnotes,
    showdownKatex(),
    showdownMermaid({ selectors: 'div.markdown-preview' }),
    showdownPlantuml({ imageFormat: 'svg' })
  ].concat(extensions ? extensions : []);
};

//The above behavior is how many browsers actually implement NodeList.prototype.forEach
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

export default {
  name: 'mdpreviewer',
  props: {
    markdown: String,
    /**
     * Showdown options
     * @see https://github.com/showdownjs/showdown#valid-options
     */
    options: {
      type: Object,
      default: () => ({})
    },
    /**
     * Showdown extensions
     * @see https://github.com/showdownjs/showdown#extensions
     */
    extensions: {
      type: [Object, Array],
      required: false,
      default: null
    }
  },
  data() {
    return {
      showdownOptions: getOptions(this.options),
      showdownExtensions: getExtensions(this.extensions)
    };
  },
  watch: {
    options: {
      deep: true,
      handler(options) {
        this.showdownOptions = Object.assign({}, this.showdownOptions, options);
      }
    },
    extensions: {
      deep: true,
      handler(extensions) {
        if (extensions && this.converter) {
          for (var i = 0; i < extensions.length; i++) {
            this.converter.addExtension(extensions[i]);
          }
        }
      }
    }
  },
  computed: {
    converter() {
      // converter instance of showdown
      const converter = new showdown.Converter({
        extensions: this.showdownExtensions
      });

      // set options of this instance (include flavor)
      for (const key in this.showdownOptions) {
        if (key == 'flavor') {
          converter.setFlavor(this.showdownOptions[key]);
        } else {
          converter.setOption(key, this.showdownOptions[key]);
        }
      }
      return converter;
    },

    inputMarkdown() {
      return this.markdown === null
        ? this.$slots.default[0].text
        : this.markdown;
    },

    outputHtml() {
      return this.converter ? this.converter.makeHtml(this.inputMarkdown) : '';
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
</style>
