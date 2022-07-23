import { useStore } from "../../../store/store";

export const TreeElement = ({
  element,
}) => {
  const selectEntity = useStore(state => state.selectEntity);
  const selectedId = useStore(state => state.selectedId);

  return (
    <div
      key={element.id}
      className={`cursor-default border border-transparent hover:border-blue-600 select-none ${element.id === selectedId ? 'bg-blue-900 text-white font-medium' : ''}`}
      style={{
        paddingLeft: `${element.level * 8 + 20}px`,
      }}
      onClick={() => selectEntity(element.id)}
    >
      {element.type}
    </div>
  )
}