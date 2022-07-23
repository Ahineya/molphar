import { BuilderLayoutIframe } from "./BuilderLayoutIframe"
import { Editor } from "./Editor"
import { Flows } from "./flows/Flows"
import { Modals } from "./modal/modals"
import { ModalShower } from "./modalShower/ModalShower"
import { Sidebar } from "./sidebar/Sidebar"

export const EditorLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-slate-900">
      <div className="flex h-[56px] min-h-[56px]">
        Header
      </div>
      <div className="flex flex-grow">
        <Sidebar />
        <Editor />
      </div>
      <div className="flex h-[320px] min-h-[320px] bg-white border-t border-slate-200">
        <Flows />
      </div>
      <Modals />
      <ModalShower />
    </div >
  )
}
