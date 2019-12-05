<!--
 * @Description: markdown showdowns editor (MDSE)
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-08-18 14:05:41
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 20:23:20
 -->

<template>
  <div class="mde-workspace-container">
    <div class="mde-toolbar" v-if="hasToolbar">
      <div class="mde-toolbar-actions nav">
        <mde-menubutton
          ref="roomenu"
          v-bind:item="rootSet.item"
          v-bind:items="rootSet.menuItems"
          v-on:menuclick="handleClick"
        ></mde-menubutton>
        <mde-buttons v-bind:items="toolSet.editItems" v-on:click="handleClick"></mde-buttons>
      </div>
      <div class="mde-toolbar-actions edit" ref="edittool">
        <mde-menubutton
          ref="titlemenutool"
          v-bind:item="menuSet.title.item"
          v-bind:items="menuSet.title.menuItems"
          v-if="showTitleMenu"
          v-on:menuclick="handleClick"
        ></mde-menubutton>
        <mde-buttons ref="titletool" v-bind:items="toolSet.titleItems" v-else v-on:click="handleClick"></mde-buttons>
        <mde-menubutton
          ref="fontmenutool"
          v-bind:item="menuSet.font.item"
          v-bind:items="menuSet.font.menuItems"
          v-if="showFontMenu"
          v-on:menuclick="handleClick"
        ></mde-menubutton>
        <mde-buttons ref="fonttool" v-bind:items="toolSet.fontItems" v-else v-on:click="handleClick"></mde-buttons>
        <mde-menubutton
          ref="alignmenutool"
          v-bind:item="menuSet.align.item"
          v-bind:items="menuSet.align.menuItems"
          v-if="showAlignMenu"
          v-on:menuclick="handleClick"
        ></mde-menubutton>
        <mde-buttons ref="aligntool" v-bind:items="toolSet.alignItems" v-else v-on:click="handleClick"></mde-buttons>
        <mde-menubutton
          ref="listmenutool"
          v-bind:item="menuSet.list.item"
          v-bind:items="menuSet.list.menuItems"
          v-if="showListMenu"
          v-on:menuclick="handleClick"
        ></mde-menubutton>
        <mde-buttons ref="listtool" v-bind:items="toolSet.listItems" v-else v-on:click="handleClick"></mde-buttons>
        <mde-buttons ref="othertool" v-bind:items="toolSet.otherItems" v-on:click="handleClick"></mde-buttons>
      </div>
    </div>
    <div class="mde-editor-container">
      <mde-splitpane defaultSize="50%" pane1ClassName="raw-editor" pane2ClassName="raw-previewer" split="vertical">
        <template slot="pane1">
          <div class="mde-scroll-container">
            <mdeditor
              :markdown="mdDoc"
              :options="mdeOptions"
              @input="onMdChange"
              @scroll="onMdScroll"
              class="mdse-editor"
              ref="mdseEditor"
            ></mdeditor>
          </div>
        </template>
        <template slot="pane2">
          <div class="mde-scroll-container">
            <showdowns
              :extensions="previewExtensions"
              :markdown="mdDoc"
              :showdownOptions="mdpOptions"
              class="mdse-preview"
              ref="mdsePreviewer"
            ></showdowns>
          </div>
        </template>
      </mde-splitpane>
    </div>
  </div>
</template>

<script type="text/javascript">
import Editor from '@/components/Editor.vue';
import Previewer from '@/components/Showdowns.vue';
import SplitPane from '@/components/mde-ui/mde-splitpane.vue';
import Buttons from '@/components/mde-ui/mde-buttons.vue';
import MenuButton from '@/components/mde-ui/mde-menubutton.vue';
import ToolbarSet from '@/scripts/toolbar.js';
import debounce from 'lodash/debounce';

export default {
  name: 'mdse',
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
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  components: {
    [Editor.name]: Editor,
    [Previewer.name]: Previewer,
    [SplitPane.name]: SplitPane,
    [Buttons.name]: Buttons,
    [MenuButton.name]: MenuButton
  },
  data() {
    return {
      mdDoc: this.markdown,
      mdeOptions: this.editOptions,
      mdpOptions: this.previewOptions,
      editor: null,
      previewer: null,
      rootmenu: null,
      edittool: null,
      othertool: null,
      rootSet: ToolbarSet.getRootSet(),
      toolSet: ToolbarSet.getToolSet(),
      menuSet: ToolbarSet.getMenuSet(),
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
      if (this.toolSet.editItems && this.toolSet.editItems.length > 0) this.toolSet.editItems[0].disabled = n;
    },
    disableRedo(n) {
      if (this.toolSet.editItems && this.toolSet.editItems.length > 1) this.toolSet.editItems[1].disabled = n;
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
            const editToolOffset = that.edittool.offsetLeft + that.edittool.offsetWidth;
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
      return [this.showTitleMenu, this.showFontMenu, this.showAlignMenu, this.showListMenu];
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
        if (!this.editor.insertMarkdownContent(type)) {
          this.$emit('toolclick', type);
        }
      }
    },
    getLastToolOffset() {
      if (this.othertool) this.lastToolOffset = this.othertool.$el.offsetLeft + this.othertool.$el.offsetWidth;
      return this.lastToolOffset;
    },
    getEditor() {
      return this.editor;
    },
    getPreviewor() {
      return this.previewer;
    },
    getPreviewHtml() {
      return this.previewer ? this.previewer.outputHtml : '';
    },
    addRootMenu(item) {
      if (this.rootSet) this.rootSet.menuItems.push(item);
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
          let previewElement = this.previewer.$el;
          previewElement.scrollTop = (previewElement.scrollHeight * scrollInfo.top) / scrollInfo.height;
        } catch (e) {
          console.log('scroll current object to failed:', cm);
        }
      }
    }
  },
  mounted() {
    this.editor = this.$refs.mdseEditor;
    this.previewer = this.$refs.mdsePreviewer;
    this.rootmenu = this.$refs.rootmenu;
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
      overflow: hidden;
      width: 100%;
      height: 100%;

      .mdse-preview {
        width: auto;
        height: 100%;
        overflow-y: auto;
      }
    }

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
  }
}
</style>
