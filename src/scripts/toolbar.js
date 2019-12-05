'use strict';

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
          info: '撤销'
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
          info: '重做'
        }
      }
    ],
    titleItems: [
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
          info: '标题一'
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
          info: '标题二'
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
          info: '标题三'
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
          info: '标题四'
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
          info: '标题五'
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
          info: '标题六'
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
          info: '加粗'
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
          info: '斜体'
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
          info: '删除线'
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
          info: '下划线'
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
          info: '插入代码'
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
          info: '居左对齐'
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
          info: '居中对齐'
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
          info: '居右对齐'
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
          info: '无序列表'
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
          info: '有序列表'
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
          info: '任务列表'
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
          info: '超链接'
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
          info: '图片'
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
          info: '代码块'
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
          info: '分割线'
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
          info: '引用'
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
          info: '表格'
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
          info: '章节目录'
        }
      }
    ]
  };
};

const getMenuSet = function() {
  return {
    title: {
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
          info: '标题菜单'
        }
      },
      menuItems: [
        {
          type: 'h1',
          text: '标题一',
          shortkey: 'Ctrl+1',
          menu: true,
          disabled: false
        },
        {
          type: 'h2',
          text: '标题二',
          shortkey: 'Ctrl+2',
          menu: true,
          disabled: false
        },
        {
          type: 'h3',
          text: '标题三',
          shortkey: 'Ctrl+3',
          menu: true,
          disabled: false
        },
        {
          type: 'h4',
          text: '标题四',
          shortkey: 'Ctrl+4',
          menu: true,
          disabled: false
        },
        {
          type: 'h5',
          text: '标题五',
          shortkey: 'Ctrl+5',
          menu: true,
          disabled: false
        },
        {
          type: 'h6',
          text: '标题六',
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
          info: '字体'
        }
      },
      menuItems: [
        {
          type: 'bold',
          text: '加粗',
          shortkey: 'Ctrl+B',
          menu: true,
          disabled: false
        },
        {
          type: 'italic',
          text: '斜体',
          shortkey: 'Ctrl+I',
          menu: true,
          disabled: false
        },
        {
          type: 'strikethrough',
          text: '删除线',
          shortkey: 'Ctrl+Shift+X',
          menu: true,
          disabled: false
        },
        {
          type: 'underline',
          text: '下划线',
          shortkey: 'Ctrl+Shift+U',
          menu: true,
          disabled: false
        },
        {
          type: 'code',
          text: '插入代码',
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
          info: '对齐方式'
        }
      },
      menuItems: [
        {
          type: 'align-left',
          text: '居左对齐',
          shortkey: 'Ctrl+Alt+L',
          menu: true,
          disabled: false
        },
        {
          type: 'align-center',
          text: '居中对齐',
          shortkey: 'Ctrl+Alt+M',
          menu: true,
          disabled: false
        },
        {
          type: 'align-right',
          text: '居右对齐',
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
          info: '内容列表'
        }
      },
      menuItems: [
        {
          type: 'bullet',
          text: '无序列表',
          shortkey: 'Ctrl+Alt+B',
          menu: true,
          disabled: false
        },
        {
          type: 'ordered',
          text: '有序列表',
          shortkey: 'Ctrl+Alt+O',
          menu: true,
          disabled: false
        },
        {
          type: 'tasks',
          text: '任务列表',
          shortkey: 'Ctrl+Alt+T',
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
        info: '设置'
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
