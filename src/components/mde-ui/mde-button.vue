<!--
 * @Description: mde-button element of mde-ui
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-08-30 13:53:20
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 19:50:20
 -->

<template>
  <div
    class="mde-ui icon button"
    v-bind:class="buttonClassName"
    v-on:mousedown="onMouseDown"
    v-on:mouseleave="onMouseLeave"
  >
    <i class="icon" v-bind:class="iconClassName" v-if="icon"></i>
    <span
      v-bind:data-inverted="tooltip.inverted"
      v-bind:data-position="tooltip.position"
      v-bind:data-tooltip="tooltipInfo"
      v-bind:data-tooltip-small="tooltip.small"
      v-if="hasTooltip"
      v-show="showTooltip"
    ></span>
    {{ text }}
    <p class="shortkey" v-if="hasMenu">{{ keyContent }}</p>
    <b class="caret" v-if="caret"></b>
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
      show: false,
      inverted: true,
      small: true,
      position: 'bottom left',
      info: ''
    }
  },
  data() {
    return {
      activeTooltip: true
    };
  },
  computed: {
    tooltipInfo() {
      const text = this.tooltip.info ? `${this.tooltip.info}` : `${this.text}`;
      const key = this.shortkey ? `(${this.shortkey})` : ``;
      return `${text}${key}`;
    },
    buttonClassName() {
      return this.disabled ? 'disabled' : '';
    },
    iconClassName() {
      return this.type;
    },
    keyContent() {
      return this.shortkey ? this.shortkey : '';
    },
    showTooltip() {
      return this.tooltip && this.tooltip.show && this.activeTooltip;
    },
    hasTooltip() {
      return this.tooltip;
    },
    hasMenu() {
      return this.menu;
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

.mde-ui.button {
  font-size: 1rem;

  span[data-tooltip] {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
  }
}

.mde-ui.button:disabled, .mde-ui.button.disabled, .mde-ui.button.disabled:hover {
  cursor: default;
  opacity: 0.45 !important;
  background-image: none !important;
  box-shadow: none !important;
  pointer-events: none !important;
}

.mde-ui.button {
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  outline: none;
  border: none;
  vertical-align: baseline;
  background: #e0e1e2 none;
  color: rgba(0, 0, 0, 0.6);
  margin: 0 0.25em 0 0;
  padding: 0.78571429em 1.5em;
  text-transform: none;
  text-shadow: none;
  font-weight: 400;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border-radius: 0.28571429rem;
  user-select: none;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
  will-change: '';
  -webkit-tap-highlight-color: transparent;
}

.mde-ui.button, .mde-ui.button:hover {
  box-shadow: inset 0 0 0 1px transparent, inset 0 0 0 0 rgba(34, 36, 38, 0.15);
}

.mde-ui.button:hover {
  background-color: #cacbcd;
  background-image: none;
  color: rgba(0, 0, 0, 0.8);
}

.mde-ui.button:hover .icon {
  opacity: 0.85;
}

.mde-ui.button:focus {
  background-color: #cacbcd;
  color: rgba(0, 0, 0, 0.8);
  background-image: '' !important;
  box-shadow: '' !important;
}

.mde-ui.button:focus .icon {
  opacity: 0.85;
}

.mde-ui.button:active {
  background-color: #babbbc;
  background-image: '';
  color: rgba(0, 0, 0, 0.9);
  box-shadow: inset 0 0 0 1px transparent, none;
}

.mde-ui.icon.button {
  padding: 0.78571429em;
}

.mde-ui.icon.button > .icon {
  margin: auto !important;
  vertical-align: top;
  width: 20px;
  transition: opacity 0.1s ease;
}

.mde-ui.button > .shortkey {
  float: right;
}

.mde-ui.icon.button > .caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}
</style>
