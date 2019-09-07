<!--
 * @Description: mde-splitpane element of mde-ui
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-08-21 15:48:03
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 19:50:37
 -->
<template>
  <div
    :class="splitPaneClassName"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    class="mde-ui splitpane"
  >
    <div :class="paneClassName1" :style="{ [paneType]: splitSize }">
      <slot name="pane1"></slot>
    </div>
    <span :class="resizerClassName" @dblclick="onDoubleClick" @mousedown="onMouseDown"></span>
    <div :class="paneClassName2">
      <slot name="pane2"></slot>
    </div>
  </div>
</template>

<script type="text/javascript">
function getRealSize(defaultSize, minSize, maxSize, draggedSize) {
  if (typeof draggedSize === 'number') {
    const min = typeof minSize === 'number' ? minSize : 0;
    const max =
      typeof maxSize === 'number' && maxSize >= 0 ? maxSize : Infinity;
    return Math.max(min, Math.min(max, draggedSize));
  }
  if (defaultSize !== undefined) {
    return defaultSize;
  }
  return minSize;
}

function unFocus(document, window) {
  if (document.selection) {
    document.selection.empty();
  } else {
    try {
      window.getSelection().removeAllRanges();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

export default {
  name: 'mde-splitpane',
  props: {
    allowResize: {
      type: Boolean,
      default: true
    },
    isPercent: {
      type: Boolean,
      default: true
    },
    minSize: {
      type: Number,
      default: 50
    },
    maxSize: Number,
    defaultSize: String,
    split: {
      validator(value) {
        return ['vertical', 'horizontal'].indexOf(value) >= 0;
      },
      required: true
    },
    pane1ClassName: String,
    pane2ClassName: String
  },
  data() {
    return {
      active: false,
      hasMoved: false,
      currentSize: 0,
      paneType: this.split === 'vertical' ? 'width' : 'height',
      splitSize:
        this.defaultSize !== undefined ? this.defaultSize : this.minSize + 'px'
    };
  },
  watch: {
    defaultSize(n) {
      this.splitSize = n;
    }
  },
  computed: {
    splitPaneClassName() {
      return this.split;
    },
    paneClassName1() {
      return ['mde-ui pane', this.split, 'pane1', this.pane1ClassName];
    },
    resizerClassName() {
      return ['mde-ui resizer', this.split, this.allowResize ? '' : 'disabled'];
    },
    paneClassName2() {
      return ['mde-ui pane', this.split, 'pane2', this.pane2ClassName];
    }
  },
  methods: {
    onDoubleClick() {
      if (this.allowResize && !this.hasMoved) {
        this.splitSize = this.defaultSize;
        this.$emit('resize');
      }
    },
    onMouseDown() {
      if (this.allowResize) {
        this.active = true;
        this.hasMoved = false;
      }
    },
    onMouseUp() {
      if (this.allowResize) this.active = false;
    },
    onMouseMove(e) {
      if (this.allowResize) {
        if (e.buttons === 0 || e.which === 0) {
          this.active = false;
        }

        if (this.active) {
          unFocus(document, window);
          let offset = 0;
          let target = e.currentTarget;
          if (this.split === 'vertical') {
            while (target) {
              offset += target.offsetLeft;
              target = target.offsetParent;
            }
          } else {
            while (target) {
              offset += target.offsetTop;
              target = target.offsetParent;
            }
          }

          const currentPage = this.split === 'vertical' ? e.pageX : e.pageY;
          const draggedSize = getRealSize(
            this.defaultSize,
            this.minSize,
            this.maxSize,
            currentPage - offset
          );
          if (typeof draggedSize !== 'number') {
            if (this.splitSize != draggedSize) {
              this.splitSize = draggedSize;
              this.$emit('resize');
            }
          } else if (this.currentSize != draggedSize) {
            if (this.isPercent) {
              const targetOffset =
                this.split === 'vertical'
                  ? e.currentTarget.offsetWidth
                  : e.currentTarget.offsetHeight;
              const percent =
                Math.floor((draggedSize / targetOffset) * 10000) / 100;
              this.splitSize = percent + '%';
            } else {
              this.splitSize = draggedSize + 'px';
            }
            this.currentSize = draggedSize;
            this.$emit('resize');
          }
          this.hasMoved = true;
        }
      }
    }
  }
};
</script>

<style lang="stylus">
.mde-ui.splitpane {
  display: flex;
  flex: 1;
  position: absolute;
  outline: none;
  overflow: hidden;
  user-select: text;

  &.horizontal {
    width: 100%;
    flex-direction: column;
    top: 0;
    bottom: 0;
  }

  &.vertical {
    height: 100%;
    flex-direction: row;
    left: 0;
    right: 0;
  }
}

.mde-ui.pane {
  overflow: auto;
  position: relative;
  outline: none;

  &.pane1 {
    flex: none;
  }

  &.pane2 {
    flex: 1;
  }
}

.mde-ui.resizer {
  background: #464646;
  opacity: 0.2;
  z-index: 200;
  box-sizing: border-box;
  background-clip: padding-box;

  &:hover {
    transition: all 2s ease;
  }

  &.horizontal {
    height: 11px;
    margin: -5px 0;
    border-top: 5px solid hsla(0, 0%, 100%, 0);
    border-bottom: 5px solid hsla(0, 0%, 100%, 0);
    cursor: row-resize;
    width: 100%;

    &:hover {
      border-top: 5px solid rgba(0, 0, 0, 0.5);
      border-bottom: 5px solid rgba(0, 0, 0, 0.5);
    }
  }

  &.vertical {
    width: 11px;
    margin: 0 -5px;
    border-left: 5px solid hsla(0, 0%, 100%, 0);
    border-right: 5px solid hsla(0, 0%, 100%, 0);
    cursor: col-resize;

    &:hover {
      border-left: 5px solid rgba(0, 0, 0, 0.5);
      border-right: 5px solid rgba(0, 0, 0, 0.5);
    }
  }

  &.disabled {
    cursor: not-allowed;

    &:hover {
      border-color: transparent;
    }
  }
}
</style>
