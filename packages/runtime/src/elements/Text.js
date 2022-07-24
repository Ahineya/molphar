export const Text = ({ element }) => {
  const { className, text } = element;

  return (
    <div
      className={className}
    >
      {text}
    </div>
  );
}
