# showdown-markdown-editor

A markdown editor using codemirror and previewer using showdown for Vue.js.

![intro](https://raw.githubusercontent.com/jhuix/showdown-markdown-editor/master/docs/screenshot/preview-intro.png)

## Demo

[showdownmde demo](https://jhuix.github.io/showdown-markdown-editor/demo/)

## Markdown editor

[CodeMirror](https://github.com/codemirror/CodeMirror) is a versatile text editor implemented in JavaScript for the browser. It is specialized for editing code, and comes with over 100 language modes and various addons that implement more advanced editing functionality. Every language comes with fully-featured code and syntax highlighting to help with reading and editing complex code.

Markdown editor of [showdown-markdown-editor](https://github.com/jhuix/showdown-markdown-editor), edit markdown text using [vue-codemirror](https://github.com/surmon-china/vue-codemirror) to access codemirror. You can find more information (and the [manual](https://codemirror.net/doc/manual.html)) on the [codemirror project page](https://codemirror.net/).

## Markdown previewer

[Showdown](https://github.com/showdownjs/showdown) is a Javascript Markdown to HTML converter, based on the original works by John Gruber. Showdown can be used client side (in the browser) or server side (with NodeJs).

Markdown previewer of [showdown-markdown-editor](https://github.com/jhuix/showdown-markdown-editor), preview markdown content with HTML using the showdown to converte it. For more information, refer to the following document:

- [Showdown's Markdown syntax](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax)
- [Showdown Options](https://github.com/showdownjs/showdown/wiki/Showdown-options)

## Supporting some markdown extension features

- [LaTeX math and AsciiMath](#LaTeX-math-and-AsciiMath)

- [Table of Contents](#Table-of-Contents)

- [Mermaid](#Mermaid)

- [Plantuml](#Plantuml)

- [Footnotes](#Footnotes)

### LaTeX math and AsciiMath

It's supported by [showdown-katex](https://github.com/obedm503/showdown-katex.git), that render [LaTeX](https://www.latex-project.org/) math and [AsciiMath](http://asciimath.org/) using [KaTeX](https://github.com/Khan/KaTeX), You can check [KaTeX supported functions/symbols](https://khan.github.io/KaTeX/function-support.html).

- Math examples

      ```asciimath
          x = (-b +- sqrt(b^2-4ac)) / (2a)
      ```

  ```asciimath
  x = (-b +- sqrt(b^2-4ac)) / (2a)
  ```

      ```latex
         x=\frac{ -b\pm\sqrt{ b^2-4ac } } {2a}
      ```

  ```latex
  x=\frac{ -b\pm\sqrt{ b^2-4ac } } {2a}
  ```

- Show pictures

  ![math](https://raw.githubusercontent.com/jhuix/showdown-markdown-editor/master/docs/screenshot/preview-math.png)

### Table of Contents

It's implemented sub-TOC in showdown-toc.js.

- TOC examples

```
  [TOC]
```

- Show pictures

  ![toc](https://raw.githubusercontent.com/jhuix/showdown-markdown-editor/master/docs/screenshot/preview-toc.png)

### Mermaid

It's implemented in showdown-mermaid.js, render diagrams of Flowchart or Sequence or Gantt using [mermaid](https://github.com/knsv/mermaid), check [mermaid doc](https://mermaidjs.github.io) for more information.

Mermaid examples:

- Flowchart

        ```mermaid
        graph TD;
           A-->B;
           A-->C;
           B-->D;
           C-->D;
        ```

  ![flowchart](https://raw.githubusercontent.com/jhuix/showdown-markdown-editor/master/docs/screenshot/preview-flowchart.png)

- Sequence diagram

       ```mermaid
       sequenceDiagram
           participant Alice
           participant Bob
           Alice->>John: Hello John, how are you?
           loop Healthcheck
               John->>John: Fight against hypochondria
           end
           Note right of John: Rational thoughts <br/>prevail!
           John-->>Alice: Great!
           John->>Bob: How about you?
           Bob-->>John: Jolly good!
       ```

  ![sequence](https://raw.githubusercontent.com/jhuix/showdown-markdown-editor/master/docs/screenshot/preview-sequence.png)

- Gantt diagram

       ```mermaid
       gantt
       dateFormat  YYYY-MM-DD
       title Adding GANTT diagram to mermaid
       excludes weekdays 2014-01-10

       section A section
       Completed task            :done,    des1, 2014-01-06,2014-01-08
       Active task               :active,  des2, 2014-01-09, 3d
       Future task               :         des3, after des2, 5d
       Future task2               :         des4, after des3, 5d
       ```

  ![gantt](https://raw.githubusercontent.com/jhuix/showdown-markdown-editor/master/docs/screenshot/preview-gantt.png)

### Plantuml

It's implemented in showdown-plantuml.js. render diagrams of uml using [plantuml](http://plantuml.com). To know more about PlantUML, please visit [plantuml website](http://plantuml.com/).

- Plantuml examples

      ```plantuml
      @startuml
      participant User

      User -> A: DoWork
      activate A

      A -> B: << createRequest >>
      activate B

      B -> C: DoWork
      activate C
      C --> B: WorkDone
      destroy C

      B --> A: RequestCreated
      deactivate B

      A -> User: Done
      deactivate A

      @enduml
      ```

- Show pictures

  ![plantuml](https://raw.githubusercontent.com/jhuix/showdown-markdown-editor/master/docs/screenshot/preview-plantuml.png)

### Footnotes

It's implemented in showdown-footnotes.js, use for reference the [showdown-footnotes](https://github.com/Kriegslustig/showdown-footnotes).

- Footnotes examples

  [^1]: The explanation.

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
