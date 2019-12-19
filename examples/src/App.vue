<!--
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: example of mardown-showdowns-editor
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
  font-size: 16px;
  line-height: 1.6;
  height: 100%;
}

*, :after, :before {
  box-sizing: inherit;
}

body {
  background: #fff;
  font-size: 16px;
  line-height: 1.6;
  min-height: 100%;
  position: relative;
  font-family: Helvetica Neue, NotoSansHans-Regular, AvenirNext-Regular, Hiragino Sans GB, Microsoft Yahei, WenQuanYi Micro Hei, Arial, Helvetica, sans-serif;
  font-smoothing: antialiased;
  height: 100%;
}

#app {
  color: rgba(0, 0, 0, 0.87);
  height: 100%;
  font-size: 16px;
}
</style>
