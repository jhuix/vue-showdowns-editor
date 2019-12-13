<!--
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: markdown showdowns editor (MDSE)
-->

<template>
  <div class="mde-workspace-container">
    <div class="mde-toolbar" v-if="hasToolbar">
      <div class="mde-toolbar-left">
        <div class="mde-toolbar-actions nav">
          <mde-menubutton
            ref="mainmenu"
            class="mainmenu"
            v-bind:item="mainSet.item"
            v-bind:items="mainSet.menuItems"
            v-on:menuclick="handleClick"
          ></mde-menubutton>
          <mde-buttons v-bind:items="toolSet.editItems" v-on:click="handleClick"></mde-buttons>
        </div>
        <div class="mde-toolbar-actions edit" ref="edittool">
          <mde-menubutton
            ref="titlemenutool"
            v-bind:item="menuSet.heading.item"
            v-bind:items="menuSet.heading.menuItems"
            v-if="showTitleMenu"
            v-on:menuclick="handleClick"
          ></mde-menubutton>
          <mde-buttons
            ref="titletool"
            v-bind:items="toolSet.headingItems"
            v-else
            v-on:click="handleClick"
          ></mde-buttons>
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
      <div class="mde-toolbar-right" v-if="hasRightTool">
        <div class="mde-toolbar-actions help">
          <mde-menubutton
            ref="helpmenutool"
            v-bind:item="menuSet.help.item"
            v-bind:items="menuSet.help.menuItems"
            v-if="showHelpMenu"
            v-on:menuclick="handleClick"
          ></mde-menubutton>
        </div>
      </div>
    </div>
    <div class="mde-editor-container">
      <mde-splitpane defaultSize="50%" pane1ClassName="raw-editor" pane2ClassName="raw-previewer" split="vertical">
        <template slot="pane1">
          <div class="mde-scroll-container">
            <mdse-editor
              :markdown="mdDoc"
              :options="mdeOptions"
              @input="onMdChange"
              @scroll="onMdScroll"
              class="mdse-editor"
              ref="mdseEditor"
            ></mdse-editor>
          </div>
        </template>
        <template slot="pane2">
          <div class="mde-scroll-container">
            <mdse-showdowns
              :extensions="previewExtensions"
              :markdown="mdDoc"
              :showdownOptions="mdpOptions"
              class="mdse-preview"
              ref="mdsePreviewer"
            ></mdse-showdowns>
          </div>
        </template>
      </mde-splitpane>
    </div>
  </div>
</template>

<script type="text/javascript">
import debounce from 'lodash/debounce';
import ToolbarSet from '@/scripts/toolbar.js';
import SplitPane from '@/components/mde-ui/mde-splitpane.vue';
import Buttons from '@/components/mde-ui/mde-buttons.vue';
import MenuButton from '@/components/mde-ui/mde-menubutton.vue';
import Editor from '@/components/Editor.vue';
import Previewer from '@/components/Showdowns.vue';
import i18n from '@/scripts/i18n.js';

export default {
  name: 'mdse-showdowns-editor',
  props: {
    markdown: String,
    locale: {
      type: String,
      required: false,
      default: 'en'
    },
    hasToolbar: {
      type: Boolean,
      default: true
    },
    hasRightTool: {
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
      maintool: null,
      edittool: null,
      othertool: null,
      rootSet: ToolbarSet.getRootSet(),
      toolSet: ToolbarSet.getToolSet(),
      menuSet: ToolbarSet.getMenuSet(),
      mainSet: {},
      screenWidth: document.documentElement.clientWidth,
      lastToolOffset: 0,
      titleToolWidth: 0,
      fontToolWidth: 0,
      alignToolWidth: 0,
      listToolWidth: 0,
      showTitleMenu: false,
      showFontMenu: false,
      showAlignMenu: false,
      showListMenu: false,
      i18nLocale: this.locale,
      activeLangItem: null,
      outsideMenu: null
    };
  },
  created() {},
  watch: {
    locale(val) {
      this.i18nLocale = val;
    },
    markdown(val) {
      this.mdDoc = val;
    },
    changeLocale(val) {
      i18n.locale = val;
      this.selectLocaleItem();
      this.resetMainMenu();
      if (this.toolSet.editItems) {
        if (this.toolSet.editItems.length > 0) {
          this.toolSet.editItems[0].disabled = this.disableUndo;
        }
        if (this.toolSet.editItems.length > 1) {
          this.toolSet.editItems[1].disabled = this.disableRedo;
        }
      }
      this.$emit('localeChanged', i18n);
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
    changeRootSet: {
      deep: true,
      handler() {
        this.resetMainMenu();
      }
    },
    disableUndo(n) {
      if (this.toolSet.editItems && this.toolSet.editItems.length > 0) {
        this.toolSet.editItems[0].disabled = n;
      }
    },
    disableRedo(n) {
      if (this.toolSet.editItems && this.toolSet.editItems.length > 1) {
        this.toolSet.editItems[1].disabled = n;
      }
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
    changeLocale() {
      return this.i18nLocale;
    },
    changeRootSet() {
      return this.rootSet;
    },
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
    },
    showHelpMenu() {
      return this.hasToolbar && this.hasRightTool && this.menuSet && this.menuSet.help && this.menuSet.help.menuItems;
    }
  },
  methods: {
    insertMarkdownContent(type) {
      return this.editor.insertMarkdownContent(type);
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
      let csslinks = [];
      const cssTypes = this.previewer.cssTypes;
      if (cssTypes.hasKatex) {
        csslinks.push(cssTypes.css.katex);
      }
      if (cssTypes.hasSequence) {
        csslinks.push(cssTypes.css.sequence);
      }
      if (cssTypes.hasRailroad) {
        csslinks.push(cssTypes.css.railroad);
      }
      let cssstyles = [];
      const vegaStyle = document.getElementById('vega-embed-style');
      if (vegaStyle && vegaStyle.tagName.toLowerCase() === 'style') {
        let styleHTML = vegaStyle.outerHTML;
        styleHTML = styleHTML.replace(/\<br[\/]?\>/g, '');
        cssstyles.push(styleHTML);
      }
      return {
        html: this.previewer ? this.previewer.$el.innerHTML : '',
        cssLinks: csslinks,
        cssStyles: cssstyles
      };
    },
    getI18N() {
      return i18n;
    },
    addOutsideMenu(outsideMenu) {
      this.outsideMenu = outsideMenu;
      this.resetMainMenu();
    },
    handleClick(e, item) {
      if (item.type) {
        const type = item.type;
        console.log('the click object type is ', type);
        switch (type) {
          case 'zh-cn':
            this.i18nLocale = type;
            break;
          case 'en':
            this.i18nLocale = type;
            break;
          default:
            if (!this.insertMarkdownContent(type)) {
              this.$emit('toolClick', type);
            }
            break;
        }
      }
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
    },
    selectLocaleItem() {
      if (this.menuSet && this.menuSet.help && this.menuSet.help.menuItems) {
        this.menuSet.help.menuItems.map(
          function(item) {
            if (item.type === this.i18nLocale) {
              item.disabled = true;
            } else {
              item.disabled = false;
            }
          }.bind(this)
        );
      }
    },
    resetMainMenu() {
      let mainSet = JSON.parse(JSON.stringify(this.rootSet));
      if (typeof this.outsideMenu === 'function') {
        const outsideMenuItems = this.outsideMenu(this.i18nLocale);
        mainSet.menuItems = mainSet.menuItems.concat(outsideMenuItems);
      }
      this.mainSet = mainSet;
    }
  },
  mounted() {
    this.editor = this.$refs.mdseEditor;
    this.previewer = this.$refs.mdsePreviewer;
    i18n.locale = this.i18nLocale;
    this.selectLocaleItem();
    this.resetMainMenu();
    this.$nextTick(() => {
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
    });
  }
};
</script>

<style lang="stylus">
.mde-workspace-container {
  position: relative;
  flex: 1;
  outline: none;
  min-width: 50em;
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
    justify-content: space-between;
    z-index: 201;

    .mde-toolbar-left, .mde-toolbat-right {
      display: inherit;
    }

    .mde-toolbar-actions {
      padding: 4px 5px;
      min-height: 34px;
      display: inline-flex;
      flex-direction: row;
      flex-wrap: nowrap;

      &.nav {
        min-width: 40px;
        padding-left: 0;

        .mde-ui.dropdown {
          &.mainmenu {
            background: url('../assets/img/logo.png') no-repeat;
            background-size: contain;

            .icon-button {
              background-color: unset;
            }
          }

          .icon-button {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }

        .mde-ui.buttons {
          margin-right: 1em;
        }
      }
    }
  }

  .mde-editor-container {
    position: relative;
    flex: 1;

    .raw-editor {
      min-width: 25em;
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
