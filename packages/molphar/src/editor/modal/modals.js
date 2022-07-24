import classNames from "classnames";
import { useState } from "react";
import { createPortal } from "react-dom"
import { useStore } from "../../store/store";
import { Modal } from "./modal";

export const Modals = () => {
  const [isMoving, setIsMoving] = useState(false);
  const modals = useStore(state => state.modals);

  return createPortal(<>
    {/*<div className={classNames("fixed top-0 left-0 right-0 bottom-0 z-50 overflow-auto text-sm", {*/}
    {/*  'pointer-events-none': !isMoving,*/}
    {/*})}>*/}
    {/*  {modals.map(modal => <Modal key={modal.name} modal={modal} onMoveStart={() => setIsMoving(true)} onMoveEnd={() => setIsMoving(false)}/>)}*/}
    {/*</div>*/}
  </>, document.querySelector('#modals'));
}
