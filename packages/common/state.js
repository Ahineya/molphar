export const elements = {
  'ROOT': {
    id: 'ROOT',
    type: 'ROOT',
    className: 'h-screen',
    order: 'a0',
  },
  'container1': {
    id: 'container1',
    type: 'container',
    parentId: 'ROOT',
    name: 'container1',
    order: 'a0',
  },
  'text': {
    id: 'text',
    type: 'text',
    className: 'bg-slate-400 w-[200px] h-[200px]',
    text: 'Hello there!',
    parentId: 'container1',
    name: 'text1',
    order: 'a0',
  },
  'button': {
    id: 'button',
    type: 'button',
    className: 'text-white bg-slate-500',
    text: 'Click me!',
    parentId: 'container1',
    name: 'button1',
    order: 'a1',
  },
  'input': {
    id: 'input',
    type: 'input',
    placeholder: 'Your text...',
    className: 'border border-slate-300 bg-slate-100',
    text: 'deadswallow@gmail.com',
    parentId: 'container1',
    name: 'input1',
    order: 'a2',
  },
  'unknown': {
    id: 'unknown',
    type: 'unknown',
    className: 'bg-slate-400 w-[200px] h-[200px]',
    text: 'Hello there!',
    parentId: 'ROOT',
    order: 'a1',
  }
};

export const flows = {
  'ROOT': {
    id: 'ROOT',
    type: 'ROOT',
    className: 'h-screen',
    order: 'a0',
  },
  'flow1': {
    id: 'flow1',
    name: 'flow1',
    type: 'flow',
    trigger: 'click',
    elementId: 'button',
    parentId: 'ROOT',
    order: 'a0',
  },
  'step1': {
    id: 'step1',
    name: 'step1',
    type: 'js',
    code: 'console.log("Hello world!");',
    parentId: 'flow1',
    order: 'a0',
  },
  'step2': {
    id: 'step2',
    name: 'step2',
    type: 'email:send',
    email: [{
      type: 'expression',
      clauses: {
        '1': {
          id: '1',
          type: 'elementRef',
          elementId: 'input',
        },
        '2': {
          id: '2',
          type: 'property',
          property: 'text',
        },
      }
    }],
    parentId: 'flow1',
    order: 'a1',
  },
  'step3': {
    id: 'step3',
    name: 'step3',
    type: 'data:create',
    values: [
      {
        email: 'deadswallow@gmail.com',
      }
    ],
    dataType: 'user',
    parentId: 'flow1',
    order: 'a2',
  },
};
