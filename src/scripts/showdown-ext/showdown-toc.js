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
    let results = null;
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
    // Does this item contain a [toc] with other stuff?
    // If so, we'll split the element into two
    else if (
      (results = element.textContent
        .trim()
        .match(/^([\s\S]*?)((?:\\)?\[toc\])([\s\S]*)$/))
    ) {
      // If there was a \ before the [toc] they're trying to escape it,
      // so return the [toc] string without the \ and carry on. For
      // some reason (I'm guessing a bug in showdown) you actually
      // appear to need two \ (\\) in order to get this to show up for
      // the filter. Leaving this code here anyway for now because it's
      // "the right thing to do"(tm).
      if (results[2][0] == '\\') {
        element.textContent = results[1] + results[2].substr(1) + results[3];
      }
      // Otherwise start building a new table of contents.
      else {
        let before = null;
        let after = null;

        // Create two of the same element.
        if (element['tagName']) {
          if (results[1].trim().length > 0) {
            before = wrapper.ownerDocument.createElement(element['tagName']);
            before.appendChild(
              wrapper.ownerDocument.createTextNode(results[1])
            );
          }
          if (results[3].trim().length > 0) {
            after = wrapper.ownerDocument.createElement(element['tagName']);
            after.appendChild(wrapper.ownerDocument.createTextNode(results[3]));
          }
        }
        // Otherwise if there's no tagName assume it's a text node
        // and create two of those.
        else {
          if (results[1].trim().length > 0) {
            before = wrapper.ownerDocument.createTextNode(results[1]);
          }
          if (results[3].trim().length > 0) {
            after = wrapper.ownerDocument.createTextNode(results[3]);
          }
        }
        // Our new table of contents container.
        toc = wrapper.ownerDocument.createElement('ul');
        toc.className = 'showdown-toc';
        // If there was text before our [toc], add that in
        if (before) {
          element.parentNode.replaceChild(before, element);
          before.parentNode.insertBefore(toc, before.nextSibling);
        } else {
          element.parentNode.replaceChild(toc, element);
        }
        if (after) {
          toc.parentNode.insertBefore(after, toc.nextSibling);
        }
        // Reset the heading level - we're going to start looking for new
        // headings again
        headingLevel = null;
      }
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
