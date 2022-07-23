import { useEffect } from "react";
import { useStore } from "../../store/store";

export const Modal = ({
  modal,
  onMoveStart,
  onMoveEnd,
}) => {

  const moveModal = useStore(state => state.moveModal);
  const hideModal = useStore(state => state.hideModal);

  const startDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { clientX, clientY } = e;
    const { x: startX, y: startY } = modal;

    const rect = e.target.getBoundingClientRect();
    const elementX = rect.left;
    const elementY = rect.top;

    const offsetX = clientX - elementX;
    const offsetY = clientY - elementY;

    const drag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const { clientX: endX, clientY: endY } = e;
      const deltaX = endX - startX - offsetX;
      const deltaY = endY - startY - offsetY;

      moveModal(modal.name, modal.x + deltaX, modal.y + deltaY);
    }

    const stopDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
      onMoveEnd();
    }

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    onMoveStart();
  }

  useEffect(() => {
    const clickOutside = (e) => {
      if (!e.target.closest(`[data-modal-name="${modal.name}"]`)) {
        // hideModal(modal.name);
      }
    }

    const clickOutsideEditor = (e) => {
      // hideModal(modal.name);
    }

    document.addEventListener('mousedown', clickOutside);
    document.addEventListener('editorMouseDown', clickOutsideEditor);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
      document.removeEventListener('editorMouseDown', clickOutsideEditor);
    }
  }, []);

  return (
    <div
      data-modal-name={modal.name}
      className="absolute bg-white pointer-events-auto shadow-default rounded max-w-[320px] min-w-[320px]"
      style={{
        transform: `translate(${modal.x}px, ${modal.y}px)`,
      }}
    >
      <header
        className="cursor-default select-none border-b border-solid border-gray-300"
        onMouseDown={startDrag}
      >
        {modal.header}
      </header>
      <div style={{
        maxHeight: "calc(100vh - 112px)"
      }}>
        {modal.element}
      </div>
    </div>
  )
}
