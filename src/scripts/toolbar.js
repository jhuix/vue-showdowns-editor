/*
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 */

const getToolSet = function(lang) {
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
          get info() {
            return lang.edit.undo;
          }
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
          get info() {
            return lang.edit.redo;
          }
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
          get info() {
            return lang.heading.ch1;
          }
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
          get info() {
            return lang.heading.ch2;
          }
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
          get info() {
            return lang.heading.ch3;
          }
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
          get info() {
            return lang.heading.ch4;
          }
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
          get info() {
            return lang.heading.ch5;
          }
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
          get info() {
            return lang.heading.ch6;
          }
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
          get info() {
            return lang.font.bold;
          }
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
          get info() {
            return lang.font.italic;
          }
        }
      },
      {
        type: 'strikethrough',
        text: '',
        shortkey: 'Ctrl+Shift+X',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          get info() {
            return lang.font.strikethrough;
          }
        }
      },
      {
        type: 'underline',
        text: '',
        shortkey: 'Ctrl+Shift+U',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          get info() {
            return lang.font.underline;
          }
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
          get info() {
            return lang.font.code;
          }
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
          get info() {
            return lang.align.left;
          }
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
          get info() {
            return lang.align.center;
          }
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
          get info() {
            return lang.align.right;
          }
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
          get info() {
            return lang.list.bullet;
          }
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
          get info() {
            return lang.list.ordered;
          }
        }
      },
      {
        type: 'tasks',
        text: '',
        shortkey: 'Ctrl+Alt+T',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          get info() {
            return lang.list.tasks;
          }
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
          get info() {
            return lang.other.link;
          }
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
          get info() {
            return lang.other.image;
          }
        }
      },
      {
        type: 'codeblock',
        text: '',
        shortkey: 'Ctrl+Shift+E',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          get info() {
            return lang.other.codeblock;
          }
        }
      },
      {
        type: 'splitline',
        text: '',
        shortkey: 'Ctrl+H',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          get info() {
            return lang.other.splitline;
          }
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
          get info() {
            return lang.other.quote;
          }
        }
      },
      {
        type: 'table',
        text: '',
        shortkey: 'Ctrl+T',
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          get info() {
            return lang.other.table;
          }
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
          get info() {
            return lang.other.toc;
          }
        }
      }
    ]
  };
};

const getMenuSet = function(lang) {
  return {
    heading: {
      item: {
        type: 'heading',
        text: '',
        shortkey: 'Atl+H',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          get info() {
            return lang.heading.menu;
          }
        }
      },
      menuItems: [
        {
          type: 'ch1',
          get text() {
            return lang.heading.ch1;
          },
          shortkey: 'Ctrl+1',
          menu: true,
          disabled: false
        },
        {
          type: 'ch2',
          get text() {
            return lang.heading.ch2;
          },
          shortkey: 'Ctrl+2',
          menu: true,
          disabled: false
        },
        {
          type: 'ch3',
          get text() {
            return lang.heading.ch3;
          },
          shortkey: 'Ctrl+3',
          menu: true,
          disabled: false
        },
        {
          type: 'ch4',
          get text() {
            return lang.heading.ch4;
          },
          shortkey: 'Ctrl+4',
          menu: true,
          disabled: false
        },
        {
          type: 'ch5',
          get text() {
            return lang.heading.ch5;
          },
          shortkey: 'Ctrl+5',
          menu: true,
          disabled: false
        },
        {
          type: 'ch6',
          get text() {
            return lang.heading.ch6;
          },
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
        shortkey: 'Atl+F',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          get info() {
            return lang.font.menu;
          }
        }
      },
      menuItems: [
        {
          type: 'bold',
          get text() {
            return lang.font.bold;
          },
          shortkey: 'Ctrl+B',
          menu: true,
          disabled: false
        },
        {
          type: 'italic',
          get text() {
            return lang.font.italic;
          },
          shortkey: 'Ctrl+I',
          menu: true,
          disabled: false
        },
        {
          type: 'strikethrough',
          get text() {
            return lang.font.strikethrough;
          },
          shortkey: 'Ctrl+Shift+X',
          menu: true,
          disabled: false
        },
        {
          type: 'underline',
          get text() {
            return lang.font.underline;
          },
          shortkey: 'Ctrl+Shift+U',
          menu: true,
          disabled: false
        },
        {
          type: 'code',
          get text() {
            return lang.font.code;
          },
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
        shortkey: 'Atl+A',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          get info() {
            return lang.align.menu;
          }
        }
      },
      menuItems: [
        {
          type: 'align-left',
          get text() {
            return lang.align.left;
          },
          shortkey: 'Ctrl+Alt+L',
          menu: true,
          disabled: false
        },
        {
          type: 'align-center',
          get text() {
            return lang.align.center;
          },
          shortkey: 'Ctrl+Alt+M',
          menu: true,
          disabled: false
        },
        {
          type: 'align-right',
          get text() {
            return lang.align.right;
          },
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
        shortkey: 'Atl+L',
        caret: true,
        disabled: false,
        tooltip: {
          show: true,
          inverted: true,
          small: true,
          position: 'bottom center',
          get info() {
            return lang.list.menu;
          }
        }
      },
      menuItems: [
        {
          type: 'bullet',
          get text() {
            return lang.list.bullet;
          },
          shortkey: 'Ctrl+Alt+B',
          menu: true,
          disabled: false
        },
        {
          type: 'ordered',
          get text() {
            return lang.list.ordered;
          },
          shortkey: 'Ctrl+Alt+O',
          menu: true,
          disabled: false
        },
        {
          type: 'tasks',
          get text() {
            return lang.list.tasks;
          },
          shortkey: 'Ctrl+Alt+T',
          menu: true,
          disabled: false
        }
      ]
    }
  };
};

const getRootSet = function(lang) {
  return {
    item: {
      type: 'tools',
      text: '',
      shortkey: 'Ctrl+Shift+S',
      caret: true,
      disabled: false,
      tooltip: {
        show: true,
        inverted: true,
        small: true,
        position: 'bottom left',
        get info() {
          return lang.main.setting;
        }
      }
    },
    menuItems: [
      {
        type: 'zh-cn',
        get text() {
          return lang.main.zhcn;
        },
        shortkey: 'Ctrl+S+Z',
        menu: true,
        disabled: false
      },
      {
        type: 'en',
        get text() {
          return lang.main.en;
        },
        shortkey: 'Ctrl+S+E',
        menu: true,
        disabled: false
      }
    ]
  };
};

const ToolbarSet = {
  getToolSet,
  getMenuSet,
  getRootSet
};

export default ToolbarSet;
