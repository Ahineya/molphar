import {Editor} from "./Editor"
import {Flows} from "./flows/Flows"
import {ModalShower} from "./modalShower/ModalShower"
import {Sidebar} from "./sidebar/Sidebar"
import {useState} from "react";
import classNames from "classnames";

export const EditorLayout = () => {

  const [mode, setMode] = useState("builder");
  const [showPanel, setShowPanel] = useState(false);

  const toggleMode = () => {
    setMode(mode === "builder" ? "run" : "builder");
  }

  return (
    <div className="flex flex-col h-screen" onContextMenu={e => e.preventDefault()}>
      <div className="flex h-[56px] min-h-[56px] bg-slate-900">
        Header

        <button className="text-white" onClick={toggleMode}>{
          mode === "builder" ? "Run" : "Builder"
        }</button>
      </div>
      {
        mode === "builder" ?
          <>
            <div className="flex flex-grow">
              <Sidebar showPanel={showPanel}/>
              <Editor showPanel={showPanel}/>
            </div>
            <div className={classNames("flex flex-col bg-white border-t border-slate-300", {
              ["h-[320px] min-h-[320px]"]: showPanel,
              ["h-[48px] min-h-[48px]"]: !showPanel,
            })}>
              <div
                className="flex items-center px-4 h-[48px] border-b border-slate-300 bg-slate-200 text-xl font-bold text-slate-600 hover:bg-slate-300"
                onClick={() => setShowPanel(!showPanel)}
              >
                Flows
              </div>
              <div className={classNames({
                ["hidden"]: !showPanel,
              })}>
                <Flows/>
              </div>
            </div>
            <ModalShower/>
          </>
          : <div className="flex flex-grow">
            <iframe className="h-full" src="http://localhost:3000"/>
          </div>

      }
    </div>
  )
}
