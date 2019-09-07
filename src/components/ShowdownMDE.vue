<!--
 * @Description: showdown markdown editor
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-08-18 14:05:41
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 20:23:20
 -->

<template>
  <div class="mde-workspace-container">
    <div class="mde-toolbar" v-if="hasToolbar">
      <div class="mde-toolbar-actions nav">
        <mde-buttons v-bind:items="toolSet.rootItems" v-on:click="handleClick"></mde-buttons>
        <mde-buttons v-bind:items="toolSet.editItems" v-on:click="handleClick"></mde-buttons>
      </div>
      <div class="mde-toolbar-actions edit" ref="edittool">
        <mde-menu
          ref="titlemenutool"
          v-bind:item="menuSet.title.item"
          v-bind:items="menuSet.title.menuItems"
          v-if="showTitleMenu"
          v-on:menuclick="handleClick"
        ></mde-menu>
        <mde-buttons
          ref="titletool"
          v-bind:items="toolSet.titleItems"
          v-else
          v-on:click="handleClick"
        ></mde-buttons>
        <mde-menu
          ref="fontmenutool"
          v-bind:item="menuSet.font.item"
          v-bind:items="menuSet.font.menuItems"
          v-if="showFontMenu"
          v-on:menuclick="handleClick"
        ></mde-menu>
        <mde-buttons
          ref="fonttool"
          v-bind:items="toolSet.fontItems"
          v-else
          v-on:click="handleClick"
        ></mde-buttons>
        <mde-menu
          ref="alignmenutool"
          v-bind:item="menuSet.align.item"
          v-bind:items="menuSet.align.menuItems"
          v-if="showAlignMenu"
          v-on:menuclick="handleClick"
        ></mde-menu>
        <mde-buttons
          ref="aligntool"
          v-bind:items="toolSet.alignItems"
          v-else
          v-on:click="handleClick"
        ></mde-buttons>
        <mde-menu
          ref="listmenutool"
          v-bind:item="menuSet.list.item"
          v-bind:items="menuSet.list.menuItems"
          v-if="showListMenu"
          v-on:menuclick="handleClick"
        ></mde-menu>
        <mde-buttons
          ref="listtool"
          v-bind:items="toolSet.listItems"
          v-else
          v-on:click="handleClick"
        ></mde-buttons>
        <mde-buttons ref="othertool" v-bind:items="toolSet.otherItems" v-on:click="handleClick"></mde-buttons>
      </div>
    </div>
    <div class="mde-editor-container">
      <mde-splitpane
        defaultSize="50%"
        pane1ClassName="raw-editor"
        pane2ClassName="raw-previewer"
        split="vertical"
      >
        <template slot="pane1">
          <div class="mde-scroll-container">
            <mdeditor
              :markdown="mdDoc"
              :options="mdeOptions"
              @input="onMdChange"
              @scroll="onMdScroll"
              class="mde-editor"
              ref="mdeditor"
            ></mdeditor>
          </div>
        </template>
        <template slot="pane2">
          <div class="mde-scroll-container">
            <mdpreviewer
              :extensions="previewExtensions"
              :markdown="mdDoc"
              :options="mdpOptions"
              class="mde-previewer"
              ref="mdpreviewer"
            ></mdpreviewer>
          </div>
        </template>
      </mde-splitpane>
    </div>
  </div>
</template>

<script type="text/javascript">
import Editor from '@/components/Editor.vue';
import Previewer from '@/components/Previewer.vue';
import SplitPane from '@/components/mde-ui/mde-splitpane.vue';
import Buttons from '@/components/mde-ui/mde-buttons.vue';
import Menu from '@/components/mde-ui/mde-menu.vue';
import debounce from 'lodash/debounce';

const getToolSet = function() {
  return {
    rootItems: [
      {
        type: 'shezhi',
        text: '',
        shortkey: 'Ctrl+Shift+S',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom left',
          info: ''
        }
      }
    ],
    editItems: [
      {
        type: 'chexiao',
        text: '',
        shortkey: 'Ctrl+Z',
        disabled: true,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '撤销'
        }
      },
      {
        type: 'zhongzuo',
        text: '',
        shortkey: 'Ctrl+Y',
        disabled: true,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '重做'
        }
      }
    ],
    titleItems: [
      {
        type: 'biaoti1',
        text: '',
        shortkey: 'Ctrl+1',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '标题一'
        }
      },
      {
        type: 'biaoti2',
        text: '',
        shortkey: 'Ctrl+2',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '标题二'
        }
      },
      {
        type: 'biaoti3',
        text: '',
        shortkey: 'Ctrl+3',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '标题三'
        }
      },
      {
        type: 'biaoti4',
        text: '',
        shortkey: 'Ctrl+4',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '标题四'
        }
      },
      {
        type: 'biaoti5',
        text: '',
        shortkey: 'Ctrl+5',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '标题五'
        }
      },
      {
        type: 'biaoti6',
        text: '',
        shortkey: 'Ctrl+6',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '标题六'
        }
      }
    ],
    fontItems: [
      {
        type: 'jiacu',
        text: '',
        shortkey: 'Ctrl+B',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '加粗'
        }
      },
      {
        type: 'xieti',
        text: '',
        shortkey: 'Ctrl+I',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '斜体'
        }
      },
      {
        type: 'shanchuxian',
        text: '',
        shortkey: 'Ctrl+Shift+X',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '删除线'
        }
      },
      {
        type: 'xiahuaxian',
        text: '',
        shortkey: 'Ctrl+Shift+U',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '下划线'
        }
      },
      {
        type: 'charudaima',
        text: '',
        shortkey: 'Ctrl+E',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '插入代码'
        }
      }
    ],
    alignItems: [
      {
        type: 'juzuoduiqi',
        text: '',
        shortkey: 'Ctrl+Alt+L',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '居左对齐'
        }
      },
      {
        type: 'juzhongduiqi',
        text: '',
        shortkey: 'Ctrl+Alt+M',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '居中对齐'
        }
      },
      {
        type: 'juyouduiqi',
        text: '',
        shortkey: 'Ctrl+Alt+R',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '居右对齐'
        }
      }
    ],
    listItems: [
      {
        type: 'wuxuliebiao',
        text: '',
        shortkey: 'Ctrl+Alt+B',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '无序列表'
        }
      },
      {
        type: 'youxuliebiao',
        text: '',
        shortkey: 'Ctrl+Alt+O',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '有序列表'
        }
      },
      {
        type: 'renwuliebiao',
        text: '',
        shortkey: 'Ctrl+Alt+T',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '任务列表'
        }
      }
    ],
    otherItems: [
      {
        type: 'chaolianjie',
        text: '',
        shortkey: 'Ctrl+L',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '超链接'
        }
      },
      {
        type: 'tupian',
        text: '',
        shortkey: 'Ctrl+Alt+I',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '图片'
        }
      },
      {
        type: 'daimakuai',
        text: '',
        shortkey: 'Ctrl+Shift+E',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '代码块'
        }
      },
      {
        type: 'fengexian',
        text: '',
        shortkey: 'Ctrl+H',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '分割线'
        }
      },
      {
        type: 'yinyong',
        text: '',
        shortkey: 'Ctrl+Q',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '引用'
        }
      },
      {
        type: 'biaoge',
        text: '',
        shortkey: 'Ctrl+T',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '表格'
        }
      },
      {
        type: 'zhangjiemulu',
        text: '',
        shortkey: 'Ctrl+M',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom right',
          info: '章节目录'
        }
      }
    ]
  };
};

const getMenuSet = function() {
  return {
    title: {
      item: {
        type: 'biaoti',
        text: '',
        shortkey: 'Atl+H',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '标题菜单'
        }
      },
      menuItems: [
        {
          type: 'biaoti1',
          text: '标题一',
          shortkey: 'Ctrl+1',
          menu: true,
          disabled: false
        },
        {
          type: 'biaoti2',
          text: '标题二',
          shortkey: 'Ctrl+2',
          menu: true,
          disabled: false
        },
        {
          type: 'biaoti3',
          text: '标题三',
          shortkey: 'Ctrl+3',
          menu: true,
          disabled: false
        },
        {
          type: 'biaoti4',
          text: '标题四',
          shortkey: 'Ctrl+4',
          menu: true,
          disabled: false
        },
        {
          type: 'biaoti5',
          text: '标题五',
          shortkey: 'Ctrl+5',
          menu: true,
          disabled: false
        },
        {
          type: 'biaoti6',
          text: '标题六',
          shortkey: 'Ctrl+6',
          menu: true,
          disabled: false
        }
      ]
    },
    font: {
      item: {
        type: 'ziti',
        text: '',
        shortkey: 'Atl+F',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '字体'
        }
      },
      menuItems: [
        {
          type: 'jiacu',
          text: '加粗',
          shortkey: 'Ctrl+B',
          menu: true,
          disabled: false
        },
        {
          type: 'xieti',
          text: '斜体',
          shortkey: 'Ctrl+I',
          menu: true,
          disabled: false
        },
        {
          type: 'shanchuxian',
          text: '删除线',
          shortkey: 'Ctrl+Shift+X',
          menu: true,
          disabled: false
        },
        {
          type: 'xiahuaxian',
          text: '下划线',
          shortkey: 'Ctrl+Shift+U',
          menu: true,
          disabled: false
        },
        {
          type: 'charudaima',
          text: '插入代码',
          shortkey: 'Ctrl+E',
          menu: true,
          disabled: false
        }
      ]
    },
    align: {
      item: {
        type: 'duiqifangshi',
        text: '',
        shortkey: 'Atl+A',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '对齐方式'
        }
      },
      menuItems: [
        {
          type: 'juzuoduiqi',
          text: '居左对齐',
          shortkey: 'Ctrl+Alt+L',
          menu: true,
          disabled: false
        },
        {
          type: 'juzhongduiqi',
          text: '居中对齐',
          shortkey: 'Ctrl+Alt+M',
          menu: true,
          disabled: false
        },
        {
          type: 'juyouduiqi',
          text: '居右对齐',
          shortkey: 'Ctrl+Alt+R',
          menu: true,
          disabled: false
        }
      ]
    },
    list: {
      item: {
        type: 'wuxuliebiao',
        text: '',
        shortkey: 'Atl+L',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: '内容列表'
        }
      },
      menuItems: [
        {
          type: 'wuxuliebiao',
          text: '无序列表',
          shortkey: 'Ctrl+Alt+B',
          menu: true,
          disabled: false
        },
        {
          type: 'youxuliebiao',
          text: '有序列表',
          shortkey: 'Ctrl+Alt+O',
          menu: true,
          disabled: false
        },
        {
          type: 'renwuliebiao',
          text: '任务列表',
          shortkey: 'Ctrl+Alt+T',
          menu: true,
          disabled: false
        }
      ]
    }
  };
};

export default {
  name: 'showdown-mde',
  props: {
    markdown: String,
    hasToolbar: {
      type: Boolean,
      default: true
    },
    editOptions: {
      type: Object,
      default: () => ({})
    },
    previewOptions: {
      type: Object,
      default: () => ({})
    },
    previewExtensions: {
      type: [Object, Array],
      required: false,
      default: null
    }
  },
  components: {
    [Editor.name]: Editor,
    [Previewer.name]: Previewer,
    [SplitPane.name]: SplitPane,
    [Buttons.name]: Buttons,
    [Menu.name]: Menu
  },
  data() {
    return {
      mdDoc: this.markdown,
      mdeOptions: this.editOptions,
      mdpOptions: this.previewOptions,
      editor: null,
      previewer: null,
      edittool: null,
      othertool: null,
      toolSet: getToolSet(),
      menuSet: getMenuSet(),
      screenWidth: document.documentElement.clientWidth,
      lastToolOffset: 0,
      titleToolWidth: 0,
      fontToolWidth: 0,
      alignToolWidth: 0,
      listToolWidth: 0,
      showTitleMenu: false,
      showFontMenu: false,
      showAlignMenu: false,
      showListMenu: false
    };
  },
  created() {},
  watch: {
    markdown(val) {
      this.mdDoc = val;
    },
    editOptions: {
      deep: true,
      handler(options) {
        this.mdeOptions = Object.assign({}, this.mdeOptions, options);
      }
    },
    previewOptions: {
      deep: true,
      handler(options) {
        this.mdpOptions = Object.assign({}, this.mdpOptions, options);
      }
    },
    disableUndo(n) {
      if (this.toolSet.editItems && this.toolSet.editItems.length > 0)
        this.toolSet.editItems[0].disabled = n;
    },
    disableRedo(n) {
      if (this.toolSet.editItems && this.toolSet.editItems.length > 1)
        this.toolSet.editItems[1].disabled = n;
    },
    showMenuChange() {
      this.$nextTick(() => {
        this.getLastToolOffset();
        this.controlChangeMenu = false;
      });
    },
    lastOffsetChange() {
      debounce(function(that) {
        if (!that.controlChangeMenu) {
          const srceenWidth = that.screenWidth;
          const lastToolOffset = that.lastToolOffset;
          //Switch menus and toolbars
          if (lastToolOffset > srceenWidth) {
            if (!that.showTitleMenu) {
              that.controlChangeMenu = true;
              that.showTitleMenu = true;
            } else if (!that.showFontMenu) {
              that.controlChangeMenu = true;
              that.showFontMenu = true;
            } else if (!that.showAlignMenu) {
              that.controlChangeMenu = true;
              that.showAlignMenu = true;
            } else if (!that.showListMenu) {
              that.controlChangeMenu = true;
              that.showListMenu = true;
            }
          } else if (lastToolOffset < srceenWidth && that.edittool) {
            const editToolOffset =
              that.edittool.offsetLeft + that.edittool.offsetWidth;
            if (editToolOffset <= srceenWidth) {
              let offset = srceenWidth - editToolOffset;
              if (that.showListMenu) {
                offset += that.$refs.listmenutool.$el.clientWidth;
                if (offset > that.listToolWidth) that.showListMenu = false;
              } else if (that.showAlignMenu) {
                offset += that.$refs.alignmenutool.$el.clientWidth;
                if (offset > that.alignToolWidth) that.showAlignMenu = false;
              } else if (that.showFontMenu) {
                offset += that.$refs.fontmenutool.$el.clientWidth;
                if (offset > that.fontToolWidth) that.showFontMenu = false;
              } else if (that.showTitleMenu) {
                offset += that.$refs.titlemenutool.$el.clientWidth;
                if (offset > that.titleToolWidth) that.showTitleMenu = false;
              }
            }
          }
        }
      }, 300)(this);
    }
  },
  computed: {
    disableUndo() {
      return !this.editor || !this.editor.hasUndo();
    },
    disableRedo() {
      return !this.editor || !this.editor.hasRedo();
    },
    showMenuChange() {
      return [
        this.showTitleMenu,
        this.showFontMenu,
        this.showAlignMenu,
        this.showListMenu
      ];
    },
    lastOffsetChange() {
      return [this.screenWidth, this.lastToolOffset];
    },
    toolLeft() {
      return this.othertool ? this.othertool.getOffsetLeft() : 0;
    }
  },
  methods: {
    insertMarkdownContent(type) {
      if (type) {
        if (type !== 'settings') {
          this.editor.insertMarkdownContent(type);
        } else {
          //TODO
        }
      }
    },
    getLastToolOffset() {
      if (this.othertool)
        this.lastToolOffset =
          this.othertool.$el.offsetLeft + this.othertool.$el.offsetWidth;
      return this.lastToolOffset;
    },
    handleClick(e, item) {
      this.insertMarkdownContent(item.type);
    },
    onMdChange(doc) {
      this.mdDoc = doc;
    },
    onMdScroll(cm) {
      if (this.previewer) {
        try {
          // scrolling with the same percentage
          const scrollInfo = cm.getScrollInfo();
          let preview = this.previewer.$el;
          preview.scrollTop =
            (preview.scrollHeight * scrollInfo.top) / scrollInfo.height;
        } catch (e) {
          console.log('scroll current object to failed:', cm);
        }
      }
    }
  },
  mounted() {
    this.editor = this.$refs.mdeditor;
    this.previewer = this.$refs.mdpreviewer;
    if (this.hasToolbar) {
      this.edittool = this.$refs.edittool;
      this.titletool = this.$refs.titletool;
      if (this.titletool) this.titleToolWidth = this.titletool.$el.clientWidth;
      this.fonttool = this.$refs.fonttool;
      if (this.fonttool) this.fontToolWidth = this.fonttool.$el.clientWidth;
      this.aligntool = this.$refs.aligntool;
      if (this.aligntool) this.alignToolWidth = this.aligntool.$el.clientWidth;
      this.listtool = this.$refs.listtool;
      if (this.listtool) this.listToolWidth = this.listtool.$el.clientWidth;
      this.othertool = this.$refs.othertool;
      this.getLastToolOffset();

      let that = this;
      window.addEventListener('resize', function() {
        that.screenWidth = document.documentElement.clientWidth;
        that.getLastToolOffset();
      });
    }
  }
};
</script>

<style lang="stylus">
.mde-workspace-container {
  position: relative;
  flex: 1;
  outline: none;
  overflow: hidden;
  min-width: 885px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  .mde-toolbar {
    position: relative;
    border-bottom: 1px solid #ddd;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    z-index: 201;

    .mde-toolbar-actions {
      padding: 4px 5px;
      min-height: 44px;
      display: inline-flex;
      flex-direction: row;
      flex-wrap: nowrap;

      &.nav {
        min-width: 190px;

        .mde-ui.buttons {
          margin: 0 1em 0 0;
        }
      }
    }
  }

  .mde-editor-container {
    position: relative;
    flex: 1;

    .raw-editor {
      min-width: 442px;
    }

    .mde-scroll-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 10px;
      height: 10px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
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
  }
}
</style>
