import {Element} from "./Element";
import {useStore} from "./store/store";

export const Home = () => {
  const elementsTree = useStore(state => state.elementsTree);

  return (
    <Element element={elementsTree} />
  )
}
