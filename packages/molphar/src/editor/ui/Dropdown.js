import {Modal} from "../modal/modal";
import {useStore} from "../../store/store";

export const Dropdown = ({
                           name,
                           header,
                           children
                         }) => {
  const showModal = useStore(state => state.showModal);

  return (
    <div
      key={name}
      className="js-dropdown cursor-default"
      onClick={(e) => {
        const el = e.target.closest('.js-dropdown');

        const rect = el.getBoundingClientRect();

        showModal({
          name,
          x: rect.left,
          y: rect.top + rect.height,
        })
      }}
    >
      <div className="flex items-center justify-between border border-transparent hover:border-slate-300">
        {header}

        <div className="text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"/>
          </svg>
        </div>
      </div>

      <Modal name={name} hideOnClickOutside>
        <div>
          {children}
        </div>
      </Modal>
    </div>
  )
}
