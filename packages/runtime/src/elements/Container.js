import { Element } from "../Element";
import classNames from "classnames";

export const Container = ({ element }) => {
  const { className, children } = element;

  return (
    <div
      data-element-type="container"
      className={classNames(className, {
        [`h-[${element.height}]`]: element.height !== undefined,
      })}
    >
      {
        children.map(child => <Element element={child} key={child.id} />)
      }
    </div>
  );
}

