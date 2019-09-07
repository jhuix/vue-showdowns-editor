/*
 * @Description: showdown mermaid extension for markdown
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-09-01 11:19:37
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 19:51:02
 */
'use strict';

import mermaid from 'mermaid';

let hasMermaidContentChange = false;

// <div class="mermaid"></div>
function renderMermaidElements(elements) {
  if (!elements.length) {
    return;
  }
  elements.forEach(element => {
    const code = element.textContent;
    const name = element.className;
    element.parentNode.outerHTML = `<div class="${name}">${code}</div>`;
    hasMermaidContentChange = true;
  });
}

// mermaid default config
const getConfig = (config = {}) => ({
  theme: 'forest',
  logLevel: 3,
  selectors: null,
  startOnLoad: false,
  arrowMarkerAbsolute: false,
  flowchart: {
    curve: 'basis'
  },
  gantt: {
    axisFormat: '%m/%d/%Y'
  },
  sequence: {
    actorMargin: 50
  },
  ...config
});

var showdownMermaid = function(userConfig) {
  const parser = new DOMParser();
  const config = getConfig(userConfig);
  mermaid.initialize(config);
  let selectors = config.selectors;

  if (selectors && typeof selectors === 'string') {
    window.addEventListener('load', function() {
      const elements = this.document.querySelectorAll(selectors);
      if (elements && elements.length > 0) {
        elements.forEach(element => {
          element.addEventListener('DOMNodeInserted', function() {
            if (hasMermaidContentChange) {
              hasMermaidContentChange = false;
              mermaid.init();
            }
          });
        });
      }
    });
  }

  return [
    {
      type: 'output',
      filter: function(html) {
        // parse html
        const wrapper = parser.parseFromString(html, 'text/html').body;

        // find the mermaid in code blocks
        const elements = wrapper.querySelectorAll(
          'code.mermaid.language-mermaid'
        );

        renderMermaidElements(elements);
        // return html text content
        return wrapper.innerHTML;
      }
    }
  ];
};

// Client-side export
if (
  typeof window !== 'undefined' &&
  window.Showdown &&
  window.Showdown.extensions
) {
  window.showdown.extension('showdown-mermaid', showdownMermaid());
}

export default showdownMermaid;
