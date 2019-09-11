<!--
 * @Description: edtior for coremirror
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-08-26 10:53:06
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 20:34:34
 -->
<template>
  <codemirror
    :options="codeOptions"
    :value="mdDoc"
    @input="onMdCodeChange"
    @ready="onMdReady"
    @scroll="onMdScroll"
    ref="mdeditor"
  ></codemirror>
</template>

<script type="text/javascript">
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/gfm/gfm.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/addon/edit/continuelist.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/mode/overlay.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/selection/active-line.js';

// const controlKey = process.platform === 'win32' ? 'Ctrl' : 'Cmd'
import debounce from 'lodash/debounce';

const getOptions = function(options) {
  return {
    mode: 'text/x-markdown',
    theme: 'default',
    autofocus: true,
    showCursorWhenSelecting: true,
    line: true,
    //inputStyle: 'textarea',
    lineNumbers: true, // 显示行数
    lineWrapping: true, // 自动换行
    foldGutter: true, // 展开收起
    tabSize: 4,
    //electricChars: true,
    matchBrackets: true, // 括号匹配
    dragDrop: false,
    autoCloseBrackets: false, // 关闭括号匹配
    //autoRefresh: true,
    //extraKeys: {},
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    styleSelectedText: true,
    styleActiveLine: true, // 当前行背景高亮
    ...options
  };
};

export default {
  name: 'mdeditor',
  components: {
    codemirror
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
      changeDelay: 500
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
    let that = this;
    that.onMdCodeChange = debounce(function(newCode) {
      that.$emit('input', newCode);
    }, that.changeDelay);
  },
  methods: {
    hasUndo: function() {
      let result = false;
      let his = this.codemirror.getDoc().historySize();
      if (his['undo'] && his['undo'] > 0) result = true;
      return result;
    },
    hasRedo: function() {
      let result = false;
      let his = this.codemirror.getDoc().historySize();
      if (his['redo'] && his['redo'] > 0) result = true;
      return result;
    },
    insertMarkdownContent(type) {
      console.log('the click object type is ', type);
      let result = true;
      const selectText = this.codemirror.getSelection();
      let defaultText = selectText;
      if (!defaultText) defaultText = '请输入文本';
      const doc = this.codemirror.getDoc();
      let currentPos = doc.getCursor();
      let firstPos = { line: currentPos.line, ch: 0 };
      const lineText = doc.getRange(firstPos, currentPos);
      let defaultLineText = lineText;
      if (!defaultLineText) defaultLineText = '请输入文本';
      switch (type) {
        //撤销
        case 'chexiao':
          doc.undo();
          break;
        //重做
        case 'zhongzuo':
          doc.redo();
          break;
        //标题一
        case 'biaoti1':
          doc.replaceRange(`# ${defaultLineText}`, firstPos, currentPos);
          break;
        //标题二
        case 'biaoti2':
          doc.replaceRange(`## ${defaultLineText}`, firstPos, currentPos);
          break;
        //标题三
        case 'biaoti3':
          doc.replaceRange(`### ${defaultLineText}`, firstPos, currentPos);
          break;
        //标题四
        case 'biaoti4':
          doc.replaceRange(`#### ${defaultLineText}`, firstPos, currentPos);
          break;
        //标题五
        case 'biaoti5':
          doc.replaceRange(`##### ${defaultLineText}`, firstPos, currentPos);
          break;
        //标题六
        case 'biaoti6':
          doc.replaceRange(`###### ${defaultLineText}`, firstPos, currentPos);
          break;
        //黑体
        case 'jiacu':
          this.codemirror.replaceSelection(`**${selectText}**`);
          break;
        //斜体
        case 'xieti':
          this.codemirror.replaceSelection(`*${selectText}*`);
          break;
        case 'xiahuaxian':
          this.codemirror.replaceSelection(`__${selectText}__`);
          break;
        //删除线
        case 'shanchuxian':
          this.codemirror.replaceSelection(`~~${selectText}~~`);
          break;
        //代码
        case 'charudaima':
          this.codemirror.replaceSelection(`\`${selectText}\``);
          break;
        //左对齐
        case 'juzuoduiqi':
          break;
        //居中对齐
        case 'juzhongduiqi':
          this.codemirror.replaceSelection(`:-:${selectText}`);
          break;
        //右对齐
        case 'juyouduiqi':
          this.codemirror.replaceSelection(`--:${selectText}`);
          break;
        //无序列表
        case 'wuxuliebiao':
          doc.replaceRange(`- ${defaultLineText}`, firstPos, currentPos);
          break;
        //有序列表
        case 'youxuliebiao':
          doc.replaceRange(`1. ${defaultLineText}`, firstPos, currentPos);
          break;
        //任务列表
        case 'renwuliebiao':
          doc.replaceRange(`- [x] ${defaultLineText}`, firstPos, currentPos);
          break;
        //链接
        case 'chaolianjie':
          this.codemirror.replaceSelection(`${selectText}[链接]()`);
          break;
        //图片
        case 'tupian':
          break;
        //代码块
        case 'daimakuai':
          this.codemirror.replaceSelection(
            `\n\n\`\`\`\n${selectText}\n\`\`\`\n\n`
          );
          break;
        //分割线
        case 'fengexian':
          this.codemirror.replaceSelection(`\n----\n${selectText}`);
          break;
        //引用
        case 'yinyong':
          doc.replaceRange(`> ${defaultLineText}`, firstPos, currentPos);
          break;
        //表格
        case 'biaoge':
          this.codemirror.replaceSelection(
            `\n\n|     |     |\n| --- | --- |\n|     |     |\n\n${selectText}`
          );
          break;
        //章节导航
        case 'zhangjiemulu':
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
    onMdReady(cm) {
      this.$emit('ready', cm);
    },
    onMdScroll(cm) {
      this.$emit('scroll', cm);
    }
  },
  computed: {
    codemirror() {
      return this.$refs.mdeditor.codemirror;
    }
  },
  mounted() {
    //console.log('this is current codemirror object', this.codemirror);
    // you can use this.codemirror to do something...
  }
};
</script>

<style lang="stylus">
// theme css
@import ('../../node_modules/codemirror/theme/lesser-dark.css');
@import ('../../node_modules/codemirror/theme/mdn-like.css');
@import '../../node_modules/codemirror/lib/codemirror.css';
@import '../../src/assets/stylus/edit.styl';
</style>
