/*
 * @Description: showdown align extension for markdown
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-08-27 16:57:06
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-15 21:27:51
 */

'use strict';

function renderAlignElements(wrapper) {
  let element = null;
  let childNode = null;
  const elements = wrapper.querySelectorAll(
    'p, li, h1, h2, h3, h4, h5, h6, div.paragraph'
  );
  for (let i = 0; i < elements.length; i++) {
    element = elements[i];
    childNode = element.firstChild;
    while (childNode) {
      // Text node type is 3.
      if (childNode.nodeType === 3) {
        // Does the element consist of ':-:' or '--:'
        let results = childNode.nodeValue.match(
          /^([\s\S]*?)([:-]-:)(?:[\s]?)([\s\S]*)$/
        );
        if (results) {
          if (results[2] === ':-:') {
            // align-center
            childNode.nodeValue = results[3];
            if (element.className) {
              element.className += ` align-center`;
            } else {
              element.className = `align-center`;
            }
          } else if (results[2] === '--:') {
            //align-right
            childNode.nodeValue = results[3];
            if (element.className) {
              element.className += ` align-right`;
            } else {
              element.className = `align-right`;
            }
          }
          //default algin-left
        }
        break;
      }
      childNode = childNode.nextSibling;
    }
  }
}

var showdownAlign = function() {
  const parser = new DOMParser();
  return [
    {
      type: 'output',
      filter: function(html) {
        // parse html
        const wrapper = parser.parseFromString(html, 'text/html').body;
        renderAlignElements(wrapper);
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
  window.showdown.extension('showdown-align', showdownAlign);
}

export default showdownAlign;
