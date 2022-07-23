import { useStore } from "../store/store";
import { BuilderLayoutIframe } from "./BuilderLayoutIframe";
import { Element } from "./Element";

export const Editor = () => {

  const elementsTree = useStore(state => state.elementsTree);
  const selectedId = useStore(state => state.selectedId);

  return (
    <div className="h-full flex-grow bg-white">
      <BuilderLayoutIframe>
        <Element element={elementsTree} selectedId={selectedId} />
      </BuilderLayoutIframe>
    </div >
  )
}
