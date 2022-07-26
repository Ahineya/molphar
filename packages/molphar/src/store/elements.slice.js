import {nanoid} from "nanoid";
import {elementsToTree} from "common/elementsToTree";
import {generateKeyBetween} from "fractional-indexing";

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
    removeEntity(id) {
      const state = get();

      const elements = copyObject(state.elements);
      const flows = copyObject(state.flows);

      delete elements[id];
      delete flows[id];

      set(state => ({
        ...state,
        elements,
        flows,
        elementsTree: copyObject(elementsToTree(Object.values(elements))[0]),
        flowsTree: copyObject(elementsToTree(Object.values(flows))[0]),
      }));
    },
    addElement(element) {
      const id = nanoid();

      const state = get();

      if (!['ROOT', 'container'].includes(state.elements[state.selectedId].type)) {
        throw new Error('Parent element must be container');
      }

      const siblings = Object.values(state.elements).filter(e => e.parentId === state.selectedId || 'ROOT').sort((a, b) => a.order.localeCompare(b.order));
      const last = siblings[siblings.length - 1];
      const order = last ? generateKeyBetween(last.order, null) : generateKeyBetween(null, null);

      set(state => ({
        ...state,
        elements: {
          ...state.elements,
          [id]: {
            ...element,
            id,
            parentId: state.selectedId || 'ROOT',
            order,
            name: `New ${element.type}`,
          }
        },
        selectedId: id,
      }));

      console.log(get().elements);

      set(state => ({
        ...state,
        elementsTree: copyObject(elementsToTree(Object.values(state.elements))[0]),
      }));
    },
    addFlow(flow, parentId = 'ROOT') {
      const id = nanoid();
      const state = get();

      const siblings = Object.values(state.flows).filter(e => e.parentId === 'ROOT').sort((a, b) => a.order.localeCompare(b.order));
      const last = siblings[siblings.length - 1];
      const order = last ? generateKeyBetween(last.order, null) : generateKeyBetween(null, null);

      set(state => ({
        ...state,
        flows: {
          ...state.flows,
          [id]: {
            ...flow,
            id,
            parentId,
            order,
          }
        },
        selectedId: id,
      }));

      console.log(get().elements);

      set(state => ({
        ...state,
        flowsTree: copyObject(elementsToTree(Object.values(state.flows))[0]),
      }));
    }
  }

}

const copyObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}
