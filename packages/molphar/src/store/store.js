import create from 'zustand'
import {createElementsSlice} from './elements.slice'
import {createModalsSlice} from './modals.slice';
import {elements, flows} from "common/state";
import {elementsToTree} from "common/elementsToTree";

export const useStore = create((set, get) => {
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
