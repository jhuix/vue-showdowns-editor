/*
 * @Description: showdown toc extension for markdown
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-08-27 16:57:06
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-15 21:27:51
 * Reference website: https://github.com/ravisorg/showdown-toc
 */

'use strict';

function renderTocElements(wrapper) {
  let element = null;
  let toc = null;
  let headingLevel = null;
  let preLevel = null;
  const elements = wrapper.querySelectorAll('p,h1,h2,h3,h4,h5,h6');
  for (let i = 0; i < elements.length; i++) {
    element = elements[i];

    // Does the element consist only of [toc]?
    // If so, we can replace this element with out list.
    if (element.textContent.trim().toLowerCase() == '[toc]') {
      // Our new table of contents container.
      toc = wrapper.ownerDocument.createElement('ul');
      toc.className = 'showdown-toc';
      element.parentNode.replaceChild(toc, element);
      headingLevel = null;
    }
    // If we've started a table of contents, but have nothing in it yet,
    // look for the first header tag we encounter (after the [toc]).
    // That's going to be what we use as contents entries for this table
    // of contents.
    else if (element['tagName']) {
      switch (element['tagName']) {
        case 'H1':
        case 'H2':
        case 'H3':
        case 'H4':
        case 'H5':
        case 'H6':
          {
            const thisLevel = parseInt(element['tagName'].substr(1));
            if (!toc) {
              headingLevel = thisLevel;
              preLevel = thisLevel;
            } else {
              // If we know what header level we're looking for (either we just
              // found it above, or we're continuing to look for more) then check to
              // see if this heading should be added to the contents.
              if (!headingLevel) headingLevel = thisLevel;
              if (!preLevel) preLevel = thisLevel;

              // If we move up in what would be the document tree
              // (eg: if we're looking for H2 and we suddenly find an
              // H1) then we can probably safely assume that we want
              // the table of contents to end for this section.
              if (thisLevel < headingLevel) {
                toc = null;
                headingLevel = null;
                preLevel = null;
                break;
              }

              if (thisLevel > preLevel) {
                toc = toc.appendChild(
                  wrapper.ownerDocument.createElement('ul')
                );
                preLevel = thisLevel;
              } else {
                while (thisLevel < preLevel) {
                  toc = toc.parentNode;
                  preLevel--;
                }
              }

              const child = toc
                .appendChild(wrapper.ownerDocument.createElement('li'))
                .appendChild(wrapper.ownerDocument.createElement('a'));
              child.appendChild(
                wrapper.ownerDocument.createTextNode(element.textContent)
              );
              child.href = '#' + element.id;
            }
          }
          break;
      }
    }
  }
}

var showdownToc = function() {
  const parser = new DOMParser();
  return [
    {
      type: 'output',
      filter: function(html) {
        // parse html
        const wrapper = parser.parseFromString(html, 'text/html').body;
        renderTocElements(wrapper);
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
  window.showdown.extension('showdown-toc', showdownToc);
}

export default showdownToc;
