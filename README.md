# Vue-Showdowns-Editor

A markdown editor using codemirror and previewer using [@jhuix/showdowns](https://github.com/jhuix/showdowns) for Vue.js.

The [Vue-Showdowns-Editor](https://github.com/jhuix/vue-showdowns-editor) once used a name `MDSE：MarkDown-Showdowns-Editor`.

![intro](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-intro.png)

> If you think the markdown showdowns editor can help you or also hope to encourage the author, please click on the top right corner to give me a [Star](https://github.com/jhuix/vue-showdowns-editor)⭐️. Thanks for your star.

## Live Demo Editor —— `showdowns-editor`

Check a live demo editor here https://jhuix.github.io/vue-showdowns-editor

## Markdown editor

Markdown editor of [vue-showdowns-editor](https://github.com/jhuix/vue-showdowns-editor), edit markdown text using [vue-codemirror](https://github.com/surmon-china/vue-codemirror) to access codemirror.

[CodeMirror](https://github.com/codemirror/CodeMirror) is a versatile text editor implemented in JavaScript for the browser. It is specialized for editing code, and comes with over 100 language modes and various addons that implement more advanced editing functionality. Every language comes with fully-featured code and syntax highlighting to help with reading and editing complex code. You can find more information (and the [manual](https://codemirror.net/doc/manual.html)) on the [codemirror project page](https://codemirror.net/).

## Markdown previewer

Markdown previewer of [vue-showdowns-editor](https://github.com/jhuix/vue-showdowns-editor), preview markdown content with HTML using the [showdowns](https://github.com/jhuix/showdowns) (npm package refer to [@jhuix/showdowns](https://www.npmjs.com/package/@jhuix/showdowns)) to converte it.

[Showdowns](https://github.com/jhuix/showdowns) is a lib that make markdown to html with some extensions of [showdown.js](https://github.com/showdownjs/showdown). And [Showdown](https://github.com/showdownjs/showdown) is a Javascript Markdown to HTML converter, based on the original works by John Gruber. Showdown can be used client side (in the browser) or server side (with NodeJs). For more information, refer to the following document:

- [Showdown's Markdown syntax](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax)
- [Showdown Options](https://github.com/showdownjs/showdown/wiki/Showdown-options)
- [Showdowns readme](https://github.com/jhuix/showdowns/blob/master/README.md)
- [Showdowns Features Syntax](https://github.com/jhuix/showdowns/blob/master/public/showdowns-features.md)

## Supporting some markdown extension features

- [Footnotes](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#footnotes)

- [Table of Contents](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#table-of-contents)

- [LaTeX math and AsciiMath](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#latex-math-and-asciimath)

- [Mermaid](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#mermaid)

- [Plantuml](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#plantuml)

- [Flowchart](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#flowchart)

- [Network Sequence](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#network-sequence)

- [Graphviz's dot](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#graphviz-s-dot)

- [Railroad diagrams](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#railroad-diagrams)

- [WaveDrom](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#wavedrom)

- [Vega and Vega-Lite](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#vega-and-vega-lite)

- [Echarts](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#echarts)

- [ABCJS](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md#abc)


See more information, refer to the following document:

[Extensions Syntax and Examples](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md)

[Extensions Demo Preview](https://jhuix.github.io/vue-showdowns-editor)

### Table of Contents

  ![toc](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-toc.png)

### LaTeX math and AsciiMath

  ![math](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-math.png)

### Mermaid

  ![gantt](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-mermaid-example.png)

### Plantuml

  ![plantuml](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-plantuml.png)

### Flowchart

  ![plantuml](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-flowchart.png)

### Network Sequence

  ![plantuml](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-sequence.png) 

### Graphviz's dot

  ![plantuml](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-dot.png) 

### Railroad diagrams

  ![plantuml](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-railroad.png) 

### WaveDrom

  ![plantuml](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-wavedrom.png) 

### Vega and Vega-Lite

  ![plantuml](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-vega.png) 

## Usage In VUE

  See [`mainview.vue`](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/examples/src/views/mainview.vue) source file of examples.

- Import all components

```
import Vue from 'vue';
import VueMDSE from '../src';

Vue.use(VueMDSE);
```

- Import specified component

```
<script>
  import { ShowdownsEditor, Showdowns, Editor } from '../src';

  export default {
    components: {
      [ShowdownsEditor.name]: ShowdownsEditor,
      [Showdowns.name]: Showdowns,
      [Editor.name]: Editor,
    }
  }
</script>
```

OR

```
import { ShowdownsEditor, Showdowns, Editor } from '../src';

Vue.component(ShowdownsEditor.name, ShowdownsEditor);
Vue.component(Showdowns.name, Showdowns);
Vue.component(Editor.name, Editor);
```

- Set CodeMirror Theme (mdn-like's theme) and add outside menu

```
<template>
  <mdse-showdowns-editor
    @toolClick="handlerToolClick"
    ref="mdse"
  ></mdse-showdowns-editor>
</template>

<script>
import { ShowdownsEditor } from '@jhuix/vue-showdowns-editor';

function getOutsideMenu(locale) {
  return [
    {
      type: 'theme:mdn-like',
      text: 'mdn-like',
      menu: true,
      disabled: false
    }
}

export default {
  name: 'mainview',
  components: {
    [ShowdownsEditor.name]: ShowdownsEditor
  },
  methods: {
    handlerToolClick(type) {
      if (type.startsWith('theme:')) {
        // click menu which type is theme:mdn-like 
        type = type.substr(6);
        if (editor_themes.indexOf(type) != -1) {
          // Set CodeMirror Theme
          this.$refs.mdse.setEditorTheme(type);
        }
      }
    },
  },
  created() {
    this.$nextTick(function() {
      // add outside menu
      this.$refs.mdse.addOutsideMenu(getOutsideMenu);
      // Set CodeMirror Theme
      this.$refs.mdse.setEditorTheme('mdn-like');
    }
  }
}
</script>

// import mdn-like theme css style
<style lang="stylus">
@import ('~@/../node_modules/codemirror/theme/mdn-like.css');
</style>
```

## Development
- Project setup

```
npm install
```

- Compiles and hot-reloads for development

```
npm run serve
```

- Compiles and minifies for production

```
npm run build
```

## License

[MIT](https://github.com/jhuix/vue-showdowns-editor/blob/master/LICENSE)

Copyright (c) 2019-present, [Jhuix](mailto:jhuix0117@gmail.com) (Hui Jin)
