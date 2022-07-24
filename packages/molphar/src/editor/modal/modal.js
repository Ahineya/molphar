import {useStore} from "../../store/store";
import {createPortal} from "react-dom";
import classNames from "classnames";
import {useEffect, useState} from "react";

export const Modal = ({
                           name,
                           header,
                           children,
                           hideOnClickOutside = false,
                         }) => {
  const [isMoving, setIsMoving] = useState(false);

  const modals = useStore(state => state.modals);
  const modal = modals.find(modal => modal.name === name);

  const moveModal = useStore(state => state.moveModal);
  const hideModal = useStore(state => state.hideModal);

  const startDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {clientX, clientY} = e;
    const {x: startX, y: startY} = modal;

    const rect = e.target.getBoundingClientRect();
    const elementX = rect.left;
    const elementY = rect.top;

    const offsetX = clientX - elementX;
    const offsetY = clientY - elementY;

    const drag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const {clientX: endX, clientY: endY} = e;
      const deltaX = endX - startX - offsetX;
      const deltaY = endY - startY - offsetY;

      moveModal(modal.name, modal.x + deltaX, modal.y + deltaY);
    }

    const stopDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
      setIsMoving(false);
    }

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    setIsMoving(true);
  }

  useEffect(() => {
    if (!hideOnClickOutside || !modal) {
      return;
    }

    console.log('Register hide on click outside', hideOnClickOutside)

    const clickOutside = (e) => {
      if (!e.target.closest(`[data-modal-name="${modal.name}"]`)) {
        hideModal(modal.name);
      }
    }

    const clickOutsideEditor = (e) => {
      hideModal(modal.name);
    }

    document.addEventListener('mousedown', clickOutside);
    document.addEventListener('editorMouseDown', clickOutsideEditor);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
      document.removeEventListener('editorMouseDown', clickOutsideEditor);
    }
  }, [modal]);

  return createPortal(<>
    {
      modal ? <div
          className={classNames("fixed top-0 left-0 right-0 bottom-0 z-50 overflow-auto text-sm", {
            'pointer-events-none': !isMoving,
          })}
          onClick={e => e.stopPropagation()}
        >
          <div
            data-modal-name={modal.name}
            className="absolute bg-white pointer-events-auto shadow-default rounded max-w-[320px] min-w-[320px]"
            style={{
              transform: `translate(${modal.x}px, ${modal.y}px)`,
            }}
          >
            {
              header && <header
                className="cursor-default select-none border-b border-solid border-gray-300 flex justify-between items-center"
                onMouseDown={startDrag}
              >
                <div>
                  {header}
                </div>
                <div
                  className="pr-1 text-slate-400 hover:text-slate-700"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    hideModal(modal.name);
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"/>
                  </svg>
                </div>
              </header>
            }
            <div style={{
              maxHeight: "calc(100vh - 112px)"
            }}>
              {children}
            </div>
          </div>
        </div>
        : null
    }
  </>, document.querySelector('#modals-new'));
}
