# showdown-markdown-editor

A markdown editor using codemirror and previewer using showdown for Vue.js

## Supporting some markdown extension features

- [LaTeX](https://www.latex-project.org/) math and [AsciiMath](http://asciimath.org/)

  It's supported by [showdown-katex](https://github.com/obedm503/showdown-katex.git), that render LaTeX math and AsciiMath using [KaTeX](https://github.com/Khan/KaTeX), You can check [KaTeX supported functions/symbols](https://khan.github.io/KaTeX/function-support.html).

- TOC(Table of Contents)

  It's implemented child TOC in showdown-toc.js, use for reference the [showdown-toc](https://github.com/ravisorg/showdown-toc).

- [mermaid](https://github.com/knsv/mermaid)

  It's implemented in showdown-mermaid.js, it's surpport diagrams of Flowchart and Sequence and
  Gantt, check [mermaid doc](https://mermaidjs.github.io) for more information.

- [plantuml](http://plantuml.com)

  It's implemented in showdown-plantuml.js, To know more about PlantUML, please visit http://plantuml.com/.

- footnotes

  It's implemented in showdown-footnotes.js, use for reference the [showdown-footnotes](https://github.com/Kriegslustig/showdown-footnotes).

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, [Jhuix](mailto:jhuix0117@gmail.com) (Hui Jin)
