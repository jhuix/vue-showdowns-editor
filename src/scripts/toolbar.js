/*
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 */

const getToolSet = function() {
  return {
    editItems: [
      {
        type: 'undo',
        text: '',
        shortkey: 'Ctrl+Z',
        disabled: true,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.edit.undo'
        }
      },
      {
        type: 'redo',
        text: '',
        shortkey: 'Ctrl+Y',
        disabled: true,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.edit.redo'
        }
      }
    ],
    headingItems: [
      {
        type: 'ch1',
        text: '',
        shortkey: 'Ctrl+1',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.heading.ch1'
        }
      },
      {
        type: 'ch2',
        text: '',
        shortkey: 'Ctrl+2',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.heading.ch2'
        }
      },
      {
        type: 'ch3',
        text: '',
        shortkey: 'Ctrl+3',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.heading.ch3'
        }
      },
      {
        type: 'ch4',
        text: '',
        shortkey: 'Ctrl+4',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.heading.ch4'
        }
      },
      {
        type: 'ch5',
        text: '',
        shortkey: 'Ctrl+5',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.heading.ch5'
        }
      },
      {
        type: 'ch6',
        text: '',
        shortkey: 'Ctrl+6',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.heading.ch6'
        }
      }
    ],
    fontItems: [
      {
        type: 'bold',
        text: '',
        shortkey: 'Ctrl+B',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.font.bold'
        }
      },
      {
        type: 'italic',
        text: '',
        shortkey: 'Ctrl+I',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.font.italic'
        }
      },
      {
        type: 'strikethrough',
        text: '',
        shortkey: 'Ctrl+Alt+S',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.font.strikethrough'
        }
      },
      {
        type: 'underline',
        text: '',
        shortkey: 'Ctrl+Alt+U',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.font.underline'
        }
      },
      {
        type: 'code',
        text: '',
        shortkey: 'Ctrl+E',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.font.code'
        }
      }
    ],
    alignItems: [
      {
        type: 'align-left',
        text: '',
        shortkey: 'Ctrl+Alt+L',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.align.left'
        }
      },
      {
        type: 'align-center',
        text: '',
        shortkey: 'Ctrl+Alt+M',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.align.center'
        }
      },
      {
        type: 'align-right',
        text: '',
        shortkey: 'Ctrl+Alt+R',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.align.right'
        }
      }
    ],
    listItems: [
      {
        type: 'bullet',
        text: '',
        shortkey: 'Ctrl+Alt+B',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.list.bullet'
        }
      },
      {
        type: 'ordered',
        text: '',
        shortkey: 'Ctrl+Alt+O',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.list.ordered'
        }
      },
      {
        type: 'tasks',
        text: '',
        shortkey: 'Ctrl+Alt+K',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.list.tasks'
        }
      }
    ],
    otherItems: [
      {
        type: 'link',
        text: '',
        shortkey: 'Ctrl+L',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.other.link'
        }
      },
      {
        type: 'image',
        text: '',
        shortkey: 'Ctrl+Alt+I',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.other.image'
        }
      },
      {
        type: 'codeblock',
        text: '',
        shortkey: 'Ctrl+Alt+E',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.other.codeblock'
        }
      },
      {
        type: 'splitline',
        text: '',
        shortkey: 'Ctrl+-',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.other.splitline'
        }
      },
      {
        type: 'quote',
        text: '',
        shortkey: 'Ctrl+Q',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.other.quote'
        }
      },
      {
        type: 'table',
        text: '',
        shortkey: 'Ctrl+Alt+T',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.other.table'
        }
      },
      {
        type: 'toc',
        text: '',
        shortkey: 'Ctrl+M',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom right',
          info: 'i18n://lang.other.toc'
        }
      }
    ]
  };
};

const getMenuSet = function() {
  return {
    heading: {
      item: {
        type: 'heading',
        text: '',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.heading.menu'
        }
      },
      menuItems: [
        {
          type: 'ch1',
          text: 'i18n://lang.heading.ch1',
          shortkey: 'Ctrl+1',
          menu: true,
          disabled: false
        },
        {
          type: 'ch2',
          text: 'i18n://lang.heading.ch2',
          shortkey: 'Ctrl+2',
          menu: true,
          disabled: false
        },
        {
          type: 'ch3',
          text: 'i18n://lang.heading.ch3',
          shortkey: 'Ctrl+3',
          menu: true,
          disabled: false
        },
        {
          type: 'ch4',
          text: 'i18n://lang.heading.ch4',
          shortkey: 'Ctrl+4',
          menu: true,
          disabled: false
        },
        {
          type: 'ch5',
          text: 'i18n://lang.heading.ch5',
          shortkey: 'Ctrl+5',
          menu: true,
          disabled: false
        },
        {
          type: 'ch6',
          text: 'i18n://lang.heading.ch6',
          shortkey: 'Ctrl+6',
          menu: true,
          disabled: false
        }
      ]
    },
    font: {
      item: {
        type: 'font',
        text: '',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.font.menu'
        }
      },
      menuItems: [
        {
          type: 'bold',
          text: 'i18n://lang.font.bold',
          shortkey: 'Ctrl+B',
          menu: true,
          disabled: false
        },
        {
          type: 'italic',
          text: 'i18n://lang.font.italic',
          shortkey: 'Ctrl+I',
          menu: true,
          disabled: false
        },
        {
          type: 'strikethrough',
          text: 'i18n://lang.font.strikethrough',
          shortkey: 'Ctrl+Alt+S',
          menu: true,
          disabled: false
        },
        {
          type: 'underline',
          text: 'i18n://lang.font.underline',
          shortkey: 'Ctrl+Alt+U',
          menu: true,
          disabled: false
        },
        {
          type: 'code',
          text: 'i18n://lang.font.code',
          shortkey: 'Ctrl+E',
          menu: true,
          disabled: false
        }
      ]
    },
    align: {
      item: {
        type: 'align-justify',
        text: '',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.align.menu'
        }
      },
      menuItems: [
        {
          type: 'align-left',
          text: 'i18n://lang.align.left',
          shortkey: 'Ctrl+Alt+L',
          menu: true,
          disabled: false
        },
        {
          type: 'align-center',
          text: 'i18n://lang.align.center',
          shortkey: 'Ctrl+Alt+M',
          menu: true,
          disabled: false
        },
        {
          type: 'align-right',
          text: 'i18n://lang.align.right',
          shortkey: 'Ctrl+Alt+R',
          menu: true,
          disabled: false
        }
      ]
    },
    list: {
      item: {
        type: 'list',
        text: '',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          info: 'i18n://lang.list.menu'
        }
      },
      menuItems: [
        {
          type: 'bullet',
          text: 'i18n://lang.list.bullet',
          shortkey: 'Ctrl+Alt+B',
          menu: true,
          disabled: false
        },
        {
          type: 'ordered',
          text: 'i18n://lang.list.ordered',
          shortkey: 'Ctrl+Alt+O',
          menu: true,
          disabled: false
        },
        {
          type: 'tasks',
          text: 'i18n://lang.list.tasks',
          shortkey: 'Ctrl+Alt+K',
          menu: true,
          disabled: false
        }
      ]
    },
    help: {
      item: {
        type: 'help',
        text: '',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom right',
          info: 'i18n://lang.help.menu'
        }
      },
      menuItems: [
        {
          type: 'locale:zh-cn',
          text: '简体中文',
          menu: true,
          disabled: false
        },
        {
          type: 'separator'
        },
        {
          type: 'locale:zh-cht',
          text: '繁体中文',
          menu: true,
          disabled: false
        },
        {
          type: 'locale:en',
          text: 'English',
          menu: true,
          disabled: false
        },
        {
          type: 'locale:ja',
          text: '日本語',
          menu: true,
          disabled: false
        },
        {
          type: 'locale:ko',
          text: '한글',
          menu: true,
          disabled: false
        },
        {
          type: 'locale:ru',
          text: 'русский язык',
          menu: true,
          disabled: false
        }
      ]
    }
  };
};

const getRootSet = function() {
  return {
    item: {
      type: 'main',
      text: '',
      shortkey: 'Ctrl+Shift+S',
      caret: true,
      disabled: false,
      tooltip: {
        show: true,
        inverted: true,
        small: true,
        position: 'bottom left',
        info: 'i18n://lang.main.menu'
      }
    },
    menuItems: []
  };
};

const ToolbarSet = {
  getToolSet,
  getMenuSet,
  getRootSet
};

export default ToolbarSet;
