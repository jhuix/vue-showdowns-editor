<!--
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: mde-button element of mde-ui.
-->

<template>
  <div
    class="mde-ui icon-button"
    v-bind:class="buttonClassName"
    v-on:mousedown="onMouseDown"
    v-on:mouseleave="onMouseLeave"
  >
    <span
      v-bind:data-inverted="tooltip.inverted"
      v-bind:data-position="tooltip.position"
      v-bind:data-tooltip="tooltipInfo"
      v-bind:data-tooltip-small="tooltip.small"
      v-if="hasTooltip"
      v-show="showTooltip"
    ></span>
    <div class="content-left">
      <i class="icon" v-bind:class="iconClassName" v-if="hasIcon"></i>
    </div>
    <div class="content-right" v-if="hasContent">
      {{ `${buttonText}` }}
      <p class="shortkey" v-if="hasMenu">{{ keyContent }}</p>
      <b class="caret" v-if="hasCaret"></b>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'mde-button',
  props: {
    type: String,
    text: String,
    shortkey: String,
    icon: {
      type: Boolean,
      default: true
    },
    menu: {
      type: Boolean,
      default: false
    },
    caret: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeTooltip: true
    };
  },
  computed: {
    tooltipInfo() {
      const text = this.tooltip.info ? this.tooltip.info : `${this.text}`;
      const key = this.shortkey ? `(${this.shortkey})` : ``;
      return `${text} ${key}`;
    },
    buttonClassName() {
      return this.disabled ? 'disabled' : '';
    },
    buttonText() {
      return this.text;
    },
    iconClassName() {
      return this.type;
    },
    keyContent() {
      return this.shortkey ? this.shortkey : '';
    },
    showTooltip() {
      return !!this.tooltip && this.tooltip.show && this.activeTooltip;
    },
    hasTooltip() {
      return !!this.tooltip;
    },
    hasIcon() {
      return this.icon;
    },
    hasMenu() {
      return this.menu;
    },
    hasCaret() {
      return this.caret;
    },
    hasContent() {
      return this.hasMenu || this.hasCaret || !!this.buttonText;
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    },
    onMouseDown() {
      this.activeTooltip = false;
    },
    onMouseLeave() {
      this.activeTooltip = true;
    }
  }
};
</script>

<style lang="stylus">
@import ('../../assets/css/tooltip.css');
@import ('../../assets/css/iconfont.css');

.mde-ui.icon-button {
  font-size: 1em;

  span[data-tooltip] {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
  }

  .content-left {
    padding: 0.618em;
  }

  .content-right {
    width: 100%;
    padding: 0.618em 0.618em 0.618em 0;
  }
}

.mde-ui.icon-button:disabled, .mde-ui.icon-button.disabled, .mde-ui.icon-button.disabled:hover {
  cursor: default;
  opacity: 0.45 !important;
  background-image: none !important;
  box-shadow: none !important;
  pointer-events: none !important;
}

.mde-ui.icon-button {
  cursor: pointer;
  display: inline-flex;
  min-height: 1em;
  outline: none;
  border: none;
  vertical-align: baseline;
  background: #e0e1e2 none;
  color: rgba(0, 0, 0, 0.6);
  text-transform: none;
  text-shadow: none;
  font-weight: 400;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border-radius: 0.28571429em;
  user-select: none;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
  will-change: '';
  -webkit-tap-highlight-color: transparent;
}

.mde-ui.icon-button, .mde-ui.icon-button:hover {
  box-shadow: inset 0 0 0 1px transparent, inset 0 0 0 0 rgba(34, 36, 38, 0.15);
}

.mde-ui.icon-button:hover {
  background-color: #cacbcd;
  background-image: none;
  color: rgba(0, 0, 0, 0.8);
}

.mde-ui.icon-button:hover .icon {
  opacity: 0.85;
}

.mde-ui.icon-button:focus {
  background-color: #cacbcd;
  color: rgba(0, 0, 0, 0.8);
  background-image: '' !important;
  box-shadow: '' !important;
}

.mde-ui.icon-button:focus .icon {
  opacity: 0.85;
}

.mde-ui.icon-button:active {
  background-color: #babbbc;
  background-image: '';
  color: rgba(0, 0, 0, 0.9);
  box-shadow: inset 0 0 0 1px transparent, none;
}

.content-left > .icon {
  margin: auto !important;
  vertical-align: top;
  width: 1em;
  transition: opacity 0.1s ease;
}

.content-right > .shortkey {
  float: right;
  padding-left: 16px;
}

.content-right > .caret {
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: middle;
  border-top: 4px dashed;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}
</style>
