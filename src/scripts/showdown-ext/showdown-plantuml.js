/*
 * @Description: showdown plantuml extension for markdown
 * @Author: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @Date: 2019-08-30 09:32:41
 * @LastEditors: Jhuix (Hui Jin) <jhuix0117@gmail.com>
 * @LastEditTime: 2019-09-07 19:51:07
 */
'use strict';

import plantumlcodec from './plantuml-codec.js';

const defaultUmlWebsite = 'http://www.plantuml.com/plantuml';
const defaultImageFormat = 'img';

// <div class="mermaid"></div>
function renderPlantumlElements(elements, config) {
  if (!elements.length) {
    return;
  }
  elements.forEach(element => {
    const code = element.textContent;
    const name = element.className;
    const imageFormat = config.imageFormat;
    let imageExtension = '';
    if (imageFormat !== defaultImageFormat) imageExtension = `.${imageFormat}`;
    let src = `${config.umlWebSite}/${imageFormat}/${plantumlcodec.encode(
      code
    )}${imageExtension}`;
    element.parentNode.outerHTML = `<div class="${name}"><img src='${src}' alt=''></img></div>`;
  });
}

// Plantuml default config
const getConfig = (config = {}) => ({
  umlWebSite: defaultUmlWebsite,
  imageFormat: defaultImageFormat,
  ...config
});

var showdownPlantuml = function(userConfig) {
  const parser = new DOMParser();
  const config = getConfig(userConfig);

  return [
    {
      type: 'output',
      filter: function(html) {
        // parse html
        const wrapper = parser.parseFromString(html, 'text/html').body;

        // find the plantuml in code blocks
        const elements = wrapper.querySelectorAll(
          'code.plantuml.language-plantuml'
        );

        renderPlantumlElements(elements, config);
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
  window.showdown.extension('showdown-plantuml', showdownPlantuml());
}

export default showdownPlantuml;
