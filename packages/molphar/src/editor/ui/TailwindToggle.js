import classNames from "classnames";

export const TailwindToggle = ({
  classes,
  classString,
  onChange,
}) => {
  const classesArray = classString.split(" ");

  const toggleClasses = (c) => {
    const newClasses = classesArray.filter(c => !classes.includes(c)).concat(c).join(' ');
    onChange(newClasses);
  }

  return (
    <div>
      {
        classes.map(c => {
          return <button
            key={c}
            onClick={() => toggleClasses(c)}
            className={classNames('hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded', {
              'text-blue-500': !classesArray.includes(c),
              'bg-blue-500 text-white': classesArray.includes(c),
            })}
          >{c}</button>
        })
      }
    </div>
  )
}
