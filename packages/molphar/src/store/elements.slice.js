import {nanoid} from "nanoid";
import {elementsToTree} from "common/elementsToTree";

export const createElementsSlice = (set, get) => {
  return {
    changeElementProperty(id, property, value) {

      const state = get();

      if (state.elements[id]) {
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

        console.log('changeElementProperty', id, property, value);

        set(state => ({
          ...state,
          elementsTree: copyObject(elementsToTree(Object.values(state.elements))[0]),
        }));
      }

      if (state.flows[id]) {
        set(state => ({
          ...state,
          flows: {
            ...state.flows,
            [id]: {
              ...state.flows[id],
              [property]: value
            }
          },
        }));

        console.log('changeFlowProperty', id, property, value);

        set(state => ({
          ...state,
          flowsTree: copyObject(elementsToTree(Object.values(state.flows))[0]),
        }));
      }
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

      console.log(get().elements);

      set(state => ({
        ...state,
        elementsTree: copyObject(elementsToTree(Object.values(state.elements))[0]),
      }));
    }
  }
}

const copyObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}
