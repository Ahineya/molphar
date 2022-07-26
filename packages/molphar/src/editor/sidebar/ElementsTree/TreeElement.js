import { useStore } from "../../../store/store";
import {Modal} from "../../modal/modal";

export const TreeElement = ({
  element,
}) => {
  const selectEntity = useStore(state => state.selectEntity);
  const removeEntity = useStore(state => state.removeEntity);
  const selectedId = useStore(state => state.selectedId);
  const showModal = useStore(state => state.showModal);

  return (
    <div
      key={element.id}
      className={`cursor-default border border-transparent hover:border-blue-600 select-none ${element.id === selectedId ? 'bg-blue-900 text-white font-medium' : ''}`}
      style={{
        paddingLeft: `${element.level * 8 + 20}px`,
      }}
      onClick={() => selectEntity(element.id)}
      onContextMenu={e => {
        e.preventDefault();
        e.stopPropagation();
        showModal({
          name: `element-context-menu-${element.id}`,
          x: e.clientX,
          y: e.clientY,
        });
      }}
    >
      {element.name}
      <Modal name={`element-context-menu-${element.id}`} hideOnClickOutside>
        <div>
          <button onClick={() => {
            removeEntity(element.id);
          }}>Delete</button>
        </div>
      </Modal>
    </div>
  )
}
