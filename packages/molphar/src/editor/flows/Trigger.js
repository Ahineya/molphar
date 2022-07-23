import classNames from "classnames";
import { useStore } from "../../store/store";

export const Trigger = ({
  flow,
  elements,
}) => {
  const selectedId = useStore(state => state.selectedId);
  const selectEntity = useStore(state => state.selectEntity);

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
      className={classNames("border border-slate-700 bg-slate-400 select-none p-2", {
        ["outline outline-blue-600 outline-2"]: selectedId === flow.id
      })}
      onClick={() => { selectEntity(flow.id) }}
    >
      <span>When {elements[flow.elementId].name} {getActionName(flow.trigger)}</span>
    </div>
  )
}
