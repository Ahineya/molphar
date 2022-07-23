import { nanoid } from "nanoid";

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

      console.log('changeElementProperty', id, property, value);

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

      console.log(get().elements);

      set(state => ({
        ...state,
        elementsTree: copyObject(elementsToTree(Object.values(state.elements))[0]),
      }));
    }
  }
}

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

const copyObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}