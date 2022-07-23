import classNames from "classnames";
import { useStore } from "../../store/store";

export const Button = ({ element }) => {
  const { className, text } = element;
  const selectEntity = useStore(state => state.selectEntity);
  const selectedId = useStore(state => state.selectedId);

  return (
    <button
      className={classNames(className, 'cursor-default', {
        'outline outline-blue-600 outline-2': selectedId === element.id
      })}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        selectEntity(element.id);
      }}
      onClick={e => e.preventDefault()}
    >
      {text}
    </button>
  );
}

