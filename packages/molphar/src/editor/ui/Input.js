import classNames from "classnames";

export const Input = ({
  className,
  ...rest
}) => {
  return <input className={classNames('border border-transparent hover:border-slate-300', className)} {...rest} />;
}
