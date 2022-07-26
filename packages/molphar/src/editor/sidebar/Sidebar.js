import { Elements } from "./Elements"
import { ElementsTree } from "./ElementsTree/ElementsTree"

export const Sidebar = ({
  showPanel,
                        }) => {
  return (
    <div className="flex flex-col w-[320px] min-w-[320px] bg-slate-100 text-sm border-r border-slate-200" style={{
      maxHeight: `calc(100vh - 56px - ${showPanel ? '320px' : '48px'})`,
    }}>
      <div className="flex-grow bg-white overflow-auto">
        <ElementsTree />
      </div>
      <Elements />
    </div>
  )
}
