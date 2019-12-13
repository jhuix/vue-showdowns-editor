# Vue-Showdowns-Editor

A markdown editor using codemirror and previewer using [@jhuix/showdowns](https://github.com/jhuix/showdowns) for Vue.js.

The [Vue-Showdowns-Editor](https://github.com/jhuix/vue-showdowns-editor) once used a name `MDSE：MarkDown-Showdowns-Editor`.

![intro](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-intro.png)

> If you think the markdown showdowns editor is excellent or can help you, please click on the top right corner to give me a [Star](https://github.com/jhuix/vue-showdowns-editor)⭐️.

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

See more information, refer to the following document:

[Extensions Syntax and Examples](https://github.com/jhuix/showdowns/blob/master/docs/showdowns-features.md)

[Extensions Demo Preview](https://jhuix.github.io/vue-showdowns-editor).

### LaTeX math and AsciiMath

  ![math](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-math.png)

### Table of Contents

  ![toc](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-toc.png)

### Mermaid

  ![gantt](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-gantt.png)

### Plantuml

  ![plantuml](https://raw.githubusercontent.com/jhuix/vue-showdowns-editor/master/docs/screenshot/preview-plantuml.png)

## Usage In VUE

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

Or

```
import { ShowdownsEditor, Showdowns, Editor } from '../src';

Vue.component(ShowdownsEditor.name, ShowdownsEditor);
Vue.component(Showdowns.name, Showdowns);
Vue.component(Editor.name, Editor);
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
