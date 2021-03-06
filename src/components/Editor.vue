<!--
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: edtior for coremirror
-->

<template>
  <codemirror
    :options="codeOptions"
    :value="mdDoc"
    @input="onMdCodeChange"
    @ready="onMdReady"
    @scroll="onMdScroll"
    ref="mdEditor"
  ></codemirror>
</template>

<script type="text/javascript">
import i18n from '@/scripts/i18n.js';
import debounce from 'lodash/debounce';
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/gfm/gfm.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/addon/edit/continuelist.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/mode/overlay.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/selection/active-line.js';

const _CodeMirror = require('codemirror');
const CodeMirror = window.CodeMirror || _CodeMirror;

const getOptions = function (options) {
  return {
    mode: 'text/x-markdown',
    theme: 'default',
    autofocus: true,
    showCursorWhenSelecting: true,
    line: true,
    lineNumbers: true, // 显示行数
    lineWrapping: true, // 自动换行
    foldGutter: true, // 展开收起
    tabSize: 4,
    matchBrackets: true, // 括号匹配
    dragDrop: false,
    autoCloseBrackets: true, // 自动闭合括号匹配
    autoCloseTags: true, //自动闭合tagname匹配
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    styleActiveLine: true, // 当前行背景高亮
    extraKeys: {
      Enter: 'newlineAndIndentContinueMarkdownList',
      Tab: function (cm) {
        var spaces = Array(cm.getOption('tabSize')).join(' ');
        cm.replaceSelection(spaces);
      },
      // heading 1
      'Ctrl-1': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'ch1');
      },
      // heading 2
      'Ctrl-2': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'ch2');
      },
      // heading 3
      'Ctrl-3': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'ch3');
      },
      // heading 4
      'Ctrl-4': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'ch5');
      },
      // heading 5
      'Ctrl-5': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'ch5');
      },
      // heading 6
      'Ctrl-6': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'ch6');
      },
      // Bold font
      'Ctrl-B': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'bold');
      },
      // Italic font
      'Ctrl-I': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'italic');
      },
      // code
      'Ctrl-E': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'code');
      },
      // link
      'Ctrl-L': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'link');
      },
      // splitline
      'Ctrl--': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'splitline');
      },
      // quote
      'Ctrl-Q': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'quote');
      },
      // toc
      'Ctrl-M': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'toc');
      },
      // table
      'Ctrl-Alt-T': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'table');
      },
      // align-left
      'Ctrl-Alt-L': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'align-left');
      },
      // align-center
      'Ctrl-Alt-M': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'align-center');
      },
      // align-right
      'Ctrl-Alt-R': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'align-right');
      },
      // bullet
      'Ctrl-Alt-B': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'bullet');
      },
      // ordered
      'Ctrl-Alt-O': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'ordered');
      },
      // tasks
      'Ctrl-Alt-K': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'tasks');
      },
      // image
      'Ctrl-Alt-I': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'image');
      },
      // strikethrough
      'Ctrl-Alt-S': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'strikethrough');
      },
      // underline
      'Ctrl-Alt-U': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'underline');
      },
      // codeblock
      'Ctrl-Alt-E': function (cm) {
        CodeMirror.signal(cm, 'shortkey', cm, 'codeblock');
      }
    },
    ...options
  };
};

export default {
  name: 'mdse-editor',
  components: {
    [codemirror.name]: codemirror
  },
  props: {
    markdown: String,
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      mdDoc: this.markdown,
      codeOptions: getOptions(this.options),
      changeDelay: 250
    };
  },
  watch: {
    markdown(val) {
      this.mdDoc = val;
    },
    options: {
      deep: true,
      handler(options) {
        this.codeOptions = Object.assign({}, this.codeOptions, options);
      }
    }
  },
  created() {
    this.onMdCodeChange = debounce(
      function (newCode) {
        this.$emit('input', newCode);
      }.bind(this),
      this.changeDelay
    );
  },
  methods: {
    hasUndo: function () {
      let result = false;
      let his = this.codemirror.getDoc().historySize();
      if (his['undo'] && his['undo'] > 0) result = true;
      return result;
    },
    hasRedo: function () {
      let result = false;
      let his = this.codemirror.getDoc().historySize();
      if (his['redo'] && his['redo'] > 0) result = true;
      return result;
    },
    insertMarkdownContent(type) {
      let result = true;
      let replaceText = null;
      let textMatch = null;
      let prefix = null;
      const selectText = this.codemirror.getSelection();
      let defaultSelectText = selectText;
      const doc = this.codemirror.getDoc();
      let currentPos = doc.getCursor();
      let lineText = doc.getLine(currentPos.line);
      let firstPos = { line: currentPos.line, ch: 0 };
      let lastPos = { line: currentPos.line, ch: lineText.length };
      const lineRangeText = doc.getRange(firstPos, currentPos);
      let defaultLineText = lineRangeText;
      if (!defaultSelectText && !lineText) defaultSelectText = i18n.getMessage('i18n://lang.content.default');
      if (!defaultLineText && !lineText) defaultLineText = i18n.getMessage('i18n://lang.content.default');

      switch (type) {
        //标题一
        case 'ch1':
          prefix = '#';
          break;
        //标题二
        case 'ch2':
          prefix = '##';
          break;
        //标题三
        case 'ch3':
          prefix = '###';
          break;
        //标题四
        case 'ch4':
          prefix = '####';
          break;
        //标题五
        case 'ch5':
          prefix = '#####';
          break;
        //标题六
        case 'ch6':
          prefix = '######';
          break;
      }

      if (prefix) {
        textMatch = lineText.match(/^(#{1,6})(?:\s+)([\S\s]*)$/);
        if (textMatch) {
          if (textMatch[1] !== prefix) {
            replaceText = `${prefix} ${textMatch[2]}`;
          } else {
            replaceText = textMatch[2];
          }
        } else {
          replaceText = `${prefix} ${lineText}`;
        }
        doc.replaceRange(replaceText, firstPos, lastPos);
        prefix = null;
      }

      switch (type) {
        //左对齐
        case 'align-left':
          prefix = '';
          break;
        //居中对齐
        case 'align-center':
          prefix = ':-:';
          break;
        //右对齐
        case 'align-right':
          prefix = '--:';
          break;
      }

      if (prefix != null) {
        //Match defaultLineText consist of ':-:' or '--:'
        textMatch = defaultLineText.match(/^([\s\S]*?)([:-]-:)(?:[\s]?)([\s\S]*)$/);

        if (prefix === '') {
          // It's align left
          if (textMatch) {
            //Delete align mark string ':-:' or '--:'
            replaceText = textMatch[3];
          }
        } else {
          replaceText = `${prefix} ${defaultLineText}`;
          if (textMatch) {
            //If has align right mark string '${prefix}', then delete it;
            //Otherware add it.
            if (textMatch[2] === prefix) {
              replaceText = textMatch[3];
            } else {
              replaceText = `${prefix} ${textMatch[3]}`;
            }
          }
        }
        doc.replaceRange(replaceText, firstPos, currentPos);
        prefix = null;
      }

      switch (type) {
        //撤销
        case 'undo':
          doc.undo();
          break;
        //重做
        case 'redo':
          doc.redo();
          break;
        //黑体
        case 'bold':
          this.codemirror.replaceSelection(`**${selectText}**`, 'around');
          break;
        //斜体
        case 'italic':
          this.codemirror.replaceSelection(`*${selectText}*`, 'around');
          break;
        //下划线
        case 'underline':
          this.codemirror.replaceSelection(`__${selectText}__`, 'around');
          break;
        //删除线
        case 'strikethrough':
          this.codemirror.replaceSelection(`~~${selectText}~~`, 'around');
          break;
        //代码
        case 'code':
          this.codemirror.replaceSelection(`\`${selectText}\``, 'around');
          break;
        //无序列表
        case 'bullet':
          doc.replaceRange(`- ${defaultLineText}`, firstPos, currentPos);
          break;
        //有序列表
        case 'ordered':
          doc.replaceRange(`1. ${defaultLineText}`, firstPos, currentPos);
          break;
        //任务列表
        case 'tasks':
          doc.replaceRange(`- [x] ${defaultLineText}`, firstPos, currentPos);
          break;
        //链接
        case 'link':
          this.codemirror.replaceSelection(
            `${selectText}[${i18n.getMessage('i18n://lang.content.link.text')}](http://${i18n.getMessage(
              'i18n://lang.content.link.url'
            )})`
          );
          break;
        //图片
        case 'image':
          this.codemirror.replaceSelection(
            `![](http://${i18n.getMessage('i18n://lang.content.image.url')})${selectText}`
          );
          break;
        //代码块
        case 'codeblock':
          this.codemirror.replaceSelection(`\n\n\`\`\`\n${selectText}\n\`\`\`\n\n`);
          break;
        //分割线
        case 'splitline':
          this.codemirror.replaceSelection(`\n----\n${selectText}`);
          break;
        //引用
        case 'quote':
          doc.replaceRange(`> ${defaultLineText}`, firstPos, currentPos);
          break;
        //表格
        case 'table':
          this.codemirror.replaceSelection(`\n\n|     |     |\n| --- | --- |\n|     |     |\n\n${selectText}`);
          break;
        //章节导航
        case 'toc':
          this.codemirror.replaceSelection(`${selectText}\n\n[TOC]\n\n`);
          break;
        default:
          result = false;
          break;
      }
      if (result) this.codemirror.focus();
      return result;
    },
    getEditor() {
      return this.codemirror;
    },
    getMarkdown() {
      return this.mdDoc;
    },
    setOption(key, val) {
      if (this.codemirror) {
        this.codemirror.setOption(key, val);
      }
    },
    onMdReady(cm) {
      this.$emit('ready', cm);
    },
    onMdScroll(cm) {
      this.$emit('scroll', cm);
    },
    onShortKey(cm, type) {
      this.insertMarkdownContent(type);
    },
    destroy() {
      // cleanup shortkey event
      this.codemirror.off('shortkey', this.onShortKey);
    }
  },
  computed: {
    codemirror() {
      return this.$refs.mdEditor.cminstance;
    }
  },
  mounted() {
    // you can use this.codemirror to do something...
    this.codemirror.on('shortkey', this.onShortKey);
  },
  beforeDestroy() {
    this.destroy();
  }
};
</script>

<style lang="stylus">
@import '../../node_modules/codemirror/addon/fold/foldgutter.css';
@import '../../node_modules/codemirror/lib/codemirror.css';
@import '../../src/assets/stylus/edit.styl';
</style>
