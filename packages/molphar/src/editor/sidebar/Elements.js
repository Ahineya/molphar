import { useStore } from "../../store/store"

const elements = [
  {
    type: 'container',
    className: '',
  },
  {
    type: 'text',
    className: '',
    text: 'Hello there!',
  },
  {
    type: 'button',
    className: '',
    text: 'Click me!',
  }
]

export const Elements = () => {
  return <div>
    <header>Elements</header>
    {
      elements.map(element => {
        return <Element className="" key={element.type} element={element}>
          {element.type}
        </Element>
      })
    }
  </div>
}

const Element = ({
  element,
}) => {
  const addElement = useStore(state => state.addElement);

  return (
    <div className="cursor-default hover:bg-slate-300 select-none" onClick={() => addElement(element)}>
      {element.type}
    </div>
  )
}
