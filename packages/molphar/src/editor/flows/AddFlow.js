import {Modal} from "../modal/modal";
import {useStore} from "../../store/store";

export const AddFlow = () => {

  const showModal = useStore(state => state.showModal);
  const hideModal = useStore(state => state.hideModal);
  const addFlow = useStore(state => state.addFlow);

  return (
    <div
      key="add-flow"
      className="js-add-flow border border-dotted border-slate-300 bg-slate-100 select-none p-2 text-slate-600 w-fit hover:bg-slate-200"
      onClick={(e) => showModal({
        name: "add-flow",
        x: e.target.closest('.js-add-flow').offsetLeft,
        y: e.target.closest('.js-add-flow').offsetTop + e.target.closest('.js-add-flow').offsetHeight,
      })}
    >
      <span>
        Add flow...
      </span>
      <Modal name="add-flow" hideOnClickOutside>
        <div>
          <button onClick={() => {
            addFlow({
              name: 'flow',
              type: 'flow',
              trigger: 'click',
              elementId: null,
            });

            hideModal('add-flow');
          }}>
            Element action
          </button>
        </div>
      </Modal>
    </div>
  )
}
