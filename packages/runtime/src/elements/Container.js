import { Element } from "../Element";

export const Container = ({ element }) => {
  const { className, children } = element;

  return (
    <div
      data-element-type="container"
      className={className}
    >
      {
        children.map(child => <Element element={child} key={child.id} />)
      }
    </div>
  );
}

