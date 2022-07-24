import {useStore} from "../store/store";

export const Button = ({ element }) => {
  const { className, text } = element;

  const executeElementFlow = useStore(state => state.executeElementFlow);

  return (
    <button
      className={className}
      onClick={e => {
        executeElementFlow(element.id);
      }}
    >
      {text}
    </button>
  );
}

