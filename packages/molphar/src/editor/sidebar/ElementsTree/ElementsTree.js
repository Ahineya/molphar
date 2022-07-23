import { useStore } from "../../../store/store";
import { TreeElement } from "./TreeElement";

const elementsTreeToArray = (elementsTree, parent, level) => {
  const elements = [];

  elements.push({
    ...elementsTree,
    parent,
    level,
  });

  if (elementsTree.children) {
    elementsTree.children.forEach((child) => {
      elements.push(...elementsTreeToArray(child, elementsTree, level + 1));
    });
  }

  delete elementsTree.children;

  return elements;
}

export const ElementsTree = () => {
  const elementsTree = useStore(state => state.elementsTree);
  const elements = elementsTreeToArray(JSON.parse(JSON.stringify(elementsTree)), null, -1).slice(1);

  return (
    <div className="h-full flex-grow bg-white">
      <header>Elements</header>
      {
        elements.map(element => {
          return <TreeElement element={element} key={element.id} />
        })
      }
    </div>
  )
}