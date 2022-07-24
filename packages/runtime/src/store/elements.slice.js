import { nanoid } from "nanoid";
import {elementsToTree} from "common/elementsToTree";
import {copyObject} from "common/copyObject";
import {executeFlowSteps} from "../flowExecutor/flowExecutor";

export const createElementsSlice = (set, get) => {
  return {
    changeElementProperty(id, property, value) {
      set(state => ({
        ...state,
        elements: {
          ...state.elements,
          [id]: {
            ...state.elements[id],
            [property]: value
          }
        },
      }));

      set(state => ({
        ...state,
        elementsTree: copyObject(elementsToTree(Object.values(state.elements))[0]),
      }));
    },
    addElement(element) {
      const id = nanoid();

      const state = get();

      if (state.elements[state.selectedId].type !== 'container') {
        throw new Error('Parent element must be container');
      }

      set(state => ({
        ...state,
        elements: {
          ...state.elements,
          [id]: {
            ...element,
            id,
            parentId: state.selectedId || 'ROOT',
          }
        },
        selectedId: id,
      }));

      set(state => ({
        ...state,
        elementsTree: copyObject(elementsToTree(Object.values(state.elements))[0]),
      }));
    },

    executeElementFlow(id) {
      const state = get();

      const elementFlows = state.flowsTree.children.filter(flow => {
        return flow.trigger === 'click' && flow.elementId === id;
      });

      executeFlowSteps(elementFlows[0].children, get().elements);

    }
  }
}
