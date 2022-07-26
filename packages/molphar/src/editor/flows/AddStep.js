import {Modal} from "../modal/modal";
import {useStore} from "../../store/store";

export const AddStep = ({
                          parentFlowId,
                        }) => {
  const showModal = useStore(state => state.showModal);
  const hideModal = useStore(state => state.hideModal);
  const addFlow = useStore(state => state.addFlow);

  return (
    <div
      key="add-flow"
      className="js-add-flow border border-dotted border-slate-300 bg-white select-none p-2 text-slate-600 w-fit hover:bg-slate-100"
      onClick={(e) => showModal({
        name: "add-step",
        x: e.target.closest('.js-add-flow').offsetLeft,
        y: e.target.closest('.js-add-flow').offsetTop + e.target.closest('.js-add-flow').offsetHeight,
      })}
    >
      <span>
        Add Step...
      </span>
      <Modal name="add-step" hideOnClickOutside>
        <div>
          <button onClick={() => {
            addFlow({
              name: 'step',
              type: 'js',
              code: 'console.log("Hello world!");',
            }, parentFlowId);

            hideModal('add-step');
          }}>
            Execute Javascript
          </button>
          <button onClick={() => {
            addFlow({
              name: 'step',
              type: 'email:send',
              email: [{
                type: 'expression',
                clauses: {}
              }]
            }, parentFlowId);

            hideModal('add-step');
          }}>
            Send email
          </button>
        </div>
      </Modal>
    </div>
  )
}
