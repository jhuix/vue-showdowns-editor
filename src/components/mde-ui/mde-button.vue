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
      v-bind:data-position="tooltipPositon"
      v-bind:data-tooltip="tooltipInfo"
      v-bind:data-tooltip-small="tooltip.small"
      v-if="hasTooltip"
      v-show="showTooltip"
    ></span>
    <div class="content-left" v-if="hasIcon">
      <i class="icon" v-bind:class="iconClassName"></i>
    </div>
    <div class="content-right" v-if="hasContent">
      {{ `${buttonText}` }}
      <p class="shortkey" v-if="hasMenu">{{ keyContent }}</p>
      <b class="caret" v-if="hasCaret"></b>
    </div>
  </div>
</template>

<script type="text/javascript">
import i18n from '@/scripts/i18n.js';

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
    selected: {
      type: Boolean,
      required: false,
      default: false
    },
    // For example:
    // tooltip{
    //   show: true,
    //   inverted: true,
    //   small: true,
    //   position: 'bottom left',
    //   info: ''
    // }
    tooltip: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      locale: i18n.locale,
      activeTooltip: true
    };
  },
  watch: {
    'changedI8N.locale': {
      deep: true,
      handler(val) {
        this.locale = val;
      }
    }
  },
  computed: {
    tooltipInfo() {
      const text = this.tooltip && this.tooltip.info ? this.tooltip.info : this.text;
      const msg = this.locale ? i18n.getMessage(text, this.locale) : text;
      return `${msg} (${this.keyContent})`;
    },
    changedI8N() {
      return i18n;
    },
    tooltipPositon() {
      return this.tooltip && this.tooltip.position ? this.tooltip.position : '';
    },
    buttonClassName() {
      if (this.isSeparator) return 'separator';
      return this.disabled ? 'disabled' : this.selected ? 'selected' : '';
    },
    buttonText() {
      return this.isSeparator ? '' : i18n.getMessage(this.text, i18n.locale);
    },
    iconClassName() {
      return this.selected ? 'tick' : this.type;
    },
    keyContent() {
      return this.shortkey ? i18n.getMessage(this.shortkey, i18n.locale) : '';
    },
    showTooltip() {
      return !this.isSeparator && !!this.tooltip && this.tooltip.show && this.activeTooltip;
    },
    hasTooltip() {
      return !this.isSeparator && !!this.tooltip;
    },
    hasIcon() {
      return !this.isSeparator && this.icon;
    },
    hasMenu() {
      return !this.isSeparator && this.menu;
    },
    hasCaret() {
      return !this.isSeparator && this.caret;
    },
    hasContent() {
      return this.hasMenu || this.hasCaret || !!this.buttonText;
    },
    isSeparator() {
      return this.type === 'separator';
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
  cursor: pointer;
  display: inline-flex;
  position: relative;
  flex: 1 0 auto;
  min-height: 1em;
  outline: none;
  border: none;
  vertical-align: baseline;
  background: #e0e1e2 none;
  color: rgba(0, 0, 0, 0.6);
  text-transform: none;
  text-shadow: none;
  font-size: 1em;
  font-weight: 400;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  user-select: none;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
  will-change: '';
  -webkit-tap-highlight-color: transparent;

  span[data-tooltip] {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
  }

  .content-left {
    display: inherit;
    padding: 0.618em;
  }

  .content-right {
    display: inherit;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.618em 0.618em 0.618em 0;
  }
}

.mde-ui.icon-button.separator {
  cursor: default;
  opacity: 0.2 !important;
  background-image: none !important;
  box-shadow: none !important;
  pointer-events: none !important;
  border: 2px solid rgba(255, 255, 255, 0);
  min-height: 5px;
  min-width: 5px;
  background-color: #464646;
  background-clip: padding-box;
}

.mde-ui.icon-button:disabled, .mde-ui.icon-button.disabled, .mde-ui.icon-button.disabled:hover {
  cursor: default;
  opacity: 0.45 !important;
  background-image: none !important;
  box-shadow: none !important;
  pointer-events: none !important;
}

.mde-ui.icon-button:selected, .mde-ui.icon-button.selected, .mde-ui.icon-button.selected:hover {
  cursor: default;
  box-shadow: none !important;
  pointer-events: none !important;
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
