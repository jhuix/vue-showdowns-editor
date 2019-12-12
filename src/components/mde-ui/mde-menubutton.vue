<!--
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: mde-menubutton element of mde-ui.
-->

<template>
  <div class="mde-ui dropdown" tabindex="-1" v-on:focusout="onBlur">
    <mde-button
      class="menubutton"
      v-bind:caret="item.caret"
      v-bind:disabled="item.disabled"
      v-bind:icon="item.icon"
      v-bind:shortkey="item.shortkey"
      v-bind:text="item.text"
      v-bind:tooltip="item.tooltip"
      v-bind:type="item.type"
      v-on:click.native="handleClick($event, item)"
    ></mde-button>
    <mde-buttons class="dropdown" v-bind:items="items" v-on:click="handleMenuClick" v-show="isShowMenu"></mde-buttons>
  </div>
</template>

<script type="text/javascript">
import Button from '@/components/mde-ui/mde-button.vue';
import Buttons from '@/components/mde-ui/mde-buttons.vue';

export default {
  name: 'mde-menubutton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: [Object, Array],
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      isShowMenu: false
    };
  },
  components: {
    [Button.name]: Button,
    [Buttons.name]: Buttons
  },
  methods: {
    handleClick(event, item) {
      event.preventDefault();
      this.isShowMenu = !this.isShowMenu;
    },
    handleMenuClick(event, item) {
      this.isShowMenu = false;
      this.$emit('menuclick', event, item);
    },
    onBlur() {
      this.isShowMenu = false;
    }
  }
};
</script>

<style lang="stylus">
.mde-ui.dropdown {
  display: inline-flex;
  flex-direction: column;
  vertical-align: baseline;
  margin: 0 0.28571429em 0 0;
  box-shadow: none;
  font-size: 1em;
  outline: 0;
}

.mde-ui.dropdown .icon-button {
  position: relative;
  flex: 1 0 auto;
  border-radius: 0.28571429em;
  margin: 0;
  text-align: left;
  white-space: nowrap;

  &.menubutton {
    .content-right {
      padding-right: 0.28571429em;
      border-top-right-radius: 0.28571429em;
      border-bottom-right-radius: 0.28571429em;
    }

    .content-left {
      border-top-left-radius: 0.28571429em;
      border-bottom-left-radius: 0.28571429em;
    }
  }
}

.mde-ui.buttons.dropdown {
  flex-direction: column;
  position: absolute;
  top: 40px;
  z-index: 999;
  float: left;
  min-width: 180px;
  padding: 5px 0;
  text-align: left;
  outline: 0;
  background: #e0e1e2 none;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.28571429em;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);

  .icon-button:first-child, .icon-button:last-child, .icon-button:first-child div:first-child, .icon-button:last-child div:last-child {
    border-radius: 0;
  }
}
</style>
