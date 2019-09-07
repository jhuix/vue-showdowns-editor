<!--
 * @Description: mde-buttons element of mde-ui
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-08-30 18:28:00
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 19:50:26
 -->

<template>
  <div class="mde-ui buttons" v-bind:class="className">
    <mde-button
      v-bind:disabled="item.disabled"
      v-bind:icon="item.icon"
      v-bind:key="item.type"
      v-bind:menu="item.menu"
      v-bind:shortkey="item.shortkey"
      v-bind:text="item.text"
      v-bind:tooltip="item.tooltip"
      v-bind:type="item.type"
      v-for="item in items"
      v-on:click.native="handleClick($event, item)"
    ></mde-button>
  </div>
</template>

<script type="text/javascript">
import Button from './mde-button.vue';

export default {
  name: 'mde-buttons',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    items: {
      type: [Object, Array],
      required: true,
      default: () => []
    }
  },
  components: {
    [Button.name]: Button
  },
  data() {
    return {};
  },
  computed: {
    className() {
      return this.disabled ? 'disabled' : '';
    }
  },
  methods: {
    handleClick(event, item) {
      this.$emit('click', event, item);
    }
  }
};
</script>

<style lang="stylus">
.mde-ui.buttons {
  display: inline-flex;
  flex-direction: row;
  vertical-align: baseline;
  margin: 0 0.25em 0 0;
  box-shadow: none;
  font-size: 1rem;

  .button {
    position: relative;
  }
}

.mde-ui.buttons:after {
  content: '.';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
  font-size: 0;
}

.mde-ui.buttons .button {
  flex: 1 0 auto;
  border-radius: 0;
  margin: 0;
}

.mde-ui.buttons>.button, .mde-ui.buttons>.mde-ui.button {
  box-shadow: inset 0 0 0 1px transparent, inset 0 0 0 0 rgba(34, 36, 38, 0.15);
}

.mde-ui.buttons .button:first-child {
  border-left: none;
  margin-left: 0;
  border-top-left-radius: 0.28571429rem;
  border-bottom-left-radius: 0.28571429rem;
}

.mde-ui.buttons .button:last-child {
  border-top-right-radius: 0.28571429rem;
  border-bottom-right-radius: 0.28571429rem;
}
</style>
