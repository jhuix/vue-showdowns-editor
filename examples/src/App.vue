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
  font-size: 15px;
  line-height: 1.5;
  height: 100%;
}

*, :after, :before {
  box-sizing: inherit;
}

body {
  background: #fbfbfb;
  color: #24292e;
  font-size: 15px;
  line-height: 1.5;
  min-height: 100%;
  position: relative;
  font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New", "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

#app {
  height: 100%;
  font-size: 15px;
}
</style>
