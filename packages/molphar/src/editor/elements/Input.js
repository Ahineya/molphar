import classNames from "classnames";
import { useStore } from "../../store/store";

export const Input = ({ element }) => {
  const { className, text, placeholder } = element;
  const selectEntity = useStore(state => state.selectEntity);
  const selectedId = useStore(state => state.selectedId);

  return (
    <input
      className={classNames(className, 'cursor-default', {
        'outline outline-blue-600 outline-2': selectedId === element.id
      })}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        selectEntity(element.id);
      }}
      onClick={e => e.preventDefault()}
      value={text}
      placeholder={placeholder}
    />
  );
}

