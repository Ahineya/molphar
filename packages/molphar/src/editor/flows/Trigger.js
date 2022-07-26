import classNames from "classnames";
import { useStore } from "../../store/store";

export const Trigger = ({
  flow,
}) => {
  const selectedId = useStore(state => state.selectedId);
  const selectEntity = useStore(state => state.selectEntity);
  const elements = useStore(state => state.elements);

  const getActionName = (type) => {
    switch (type) {
      case 'click':
        return 'is clicked';
      default:
        return 'is UNKNOWN';
    }
  }

  return (
    <div
      className={classNames("border border-slate-700 select-none p-2", {
        ["outline outline-blue-600 outline-2"]: selectedId === flow.id,
        [flow.color || 'bg-slate-300']: true,
      })}
      onClick={() => { selectEntity(flow.id) }}
    >
      <span>When {elements[flow.elementId]?.name || '[select element]'} {getActionName(flow.trigger)}</span>
    </div>
  )
}
