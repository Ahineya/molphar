import {useStore} from "../store/store";

export const Input = ({ element }) => {
  const { className, text, placeholder } = element;
  const changeElementProperty = useStore(state => state.changeElementProperty);

  return (
    <input
      className={className}
      onClick={e => e.preventDefault()}
      onChange={e => changeElementProperty(element.id, "text", e.target.value)}
      value={text}
      placeholder={placeholder}
    />
  );
}

