<!--
 * @Description: example of showdown-mardown-editor
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-09-06 09:59:50
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 19:52:04
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>
<style lang="stylus">
* {
  margin: 0;
  padding: 0;
  border: none;
}

html {
  box-sizing: border-box;
  text-size-adjust: 100%;
  font-size: 14px;
  line-height: 1.15;
  height: 100%;
}

*, :after, :before {
  box-sizing: inherit;
}

body {
  background: #fff;
  font-size: 14px;
  line-height: 1.4285em;
  min-height: 100%;
  position: relative;
  font-family: Helvetica Neue, NotoSansHans-Regular, AvenirNext-Regular, arial, Hiragino Sans GB, Microsoft Yahei, WenQuanYi Micro Hei, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  height: 100%;
}

#app {
  color: rgba(0, 0, 0, 0.87);
  height: 100%;
  font-size: 14px;
}
</style>
