import classNames from "classnames";
import { useStore } from "../../store/store";

export const Step = ({
  flow,
  step,
}) => {
  const selectedId = useStore(state => state.selectedId);
  const selectEntity = useStore(state => state.selectEntity);

  const getActionName = (type) => {
    switch (type) {
      case 'js':
        return 'Execute JavaScript';
      case 'email:send':
        return 'Send Email';
      case 'data:create':
        return 'Create Data';
      default:
        return 'UNKNOWN';
    }
  }

  return (
    <div
      key={step.id}
      className={classNames("border border-slate-300 bg-slate-100 select-none p-2", {
        ["outline outline-blue-600 outline-2"]: selectedId === step.id
      })}
      onClick={() => { selectEntity(step.id) }}
    >
      <span>
        {getActionName(step.type)}
      </span>
    </div>
  )
}
