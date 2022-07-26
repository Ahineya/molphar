import classNames from "classnames";
import {useStore} from "../../store/store";
import {Element} from "../Element";
import {Input} from "../ui/Input";
import {TailwindToggle} from "../ui/TailwindToggle";

export const Container = ({element}) => {
  const {className, children} = element;
  const selectEntity = useStore(state => state.selectEntity);
  const selectedId = useStore(state => state.selectedId);

  const showModal = useStore(state => state.showModal);

  const lastX = useStore(state => state.lastX);
  const lastY = useStore(state => state.lastY);

  return (
    <div
      data-element-type="container"
      className={classNames(className, 'cursor-default', {
        'outline outline-blue-600 outline-2': selectedId === element.id,
        [`h-[${element.height}]`]: element.height !== undefined,
      })}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        selectEntity(element.id);
      }}
    >
      {
        children.map(child => <Element element={child} key={child.id}/>)
      }
    </div>
  );
}

