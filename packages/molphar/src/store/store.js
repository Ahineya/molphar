import {nanoid} from 'nanoid'
import create from 'zustand'
import {createElementsSlice} from './elements.slice'
import {createModalsSlice} from './modals.slice';

export const useStore = create((set, get) => {

  const elements = {
    'ROOT': {
      id: 'ROOT',
      type: 'ROOT',
      className: 'h-screen'
    },
    'container1': {
      id: 'container1',
      type: 'container',
      parentId: 'ROOT',
      name: 'container1',
    },
    'text': {
      id: 'text',
      type: 'text',
      className: 'bg-slate-400 w-[200px] h-[200px]',
      text: 'Hello there!',
      parentId: 'container1',
      name: 'text1',
    },
    'button': {
      id: 'button',
      type: 'button',
      className: 'text-white bg-slate-500',
      text: 'Click me!',
      parentId: 'container1',
      name: 'button1',
    },
    'input': {
      id: 'input',
      type: 'input',
      placeholder: 'Your text...',
      className: 'border border-slate-300 bg-slate-100',
      text: '',
      parentId: 'container1',
      name: 'input1',
    },
    'unknown': {
      id: nanoid(),
      type: 'unknown',
      className: 'bg-slate-400 w-[200px] h-[200px]',
      text: 'Hello there!',
      parentId: 'ROOT',
    }
  };

  const flows = {
    'ROOT': {
      id: 'ROOT',
      type: 'ROOT',
      className: 'h-screen'
    },
    'flow1': {
      id: 'flow1',
      name: 'flow1',
      type: 'flow',
      trigger: 'click',
      elementId: 'button',
      parentId: 'ROOT',
    },
    'step1': {
      id: 'step1',
      name: 'step1',
      type: 'js',
      code: 'console.log("Hello world!");',
      parentId: 'flow1',
    },
    'step2': {
      id: 'step2',
      name: 'step2',
      type: 'email:send',
      email: 'deadswallow@gmail.com',
      parentId: 'flow1',
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
    },
  };

  const [elementsTree] = elementsToTree(Object.values(elements));
  const [flowsTree] = elementsToTree(Object.values(flows));

  return {
    flows,
    flowsTree,
    elements,
    elementsTree,
    selectedId: null,

    selectEntity(id) {
      set(state => ({
        ...state,
        selectedId: id
      }));
    },

    ...createElementsSlice(set, get),
    ...createModalsSlice(set, get),
  }
})

function elementsToTree(list) {
  var map = {}, node, roots = [], i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId) {
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
