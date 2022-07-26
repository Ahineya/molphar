import {useStore} from "../../store/store"

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
  },
  {
    type: 'input',
    className: 'border border-slate-300 bg-slate-100',
    placeholder: 'Your text...',
    text: '',
  },
  {
    type: 'container',
    className: 'flex h-[20px] justify-center gap-4',
    displayName: 'row',
  },
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
      {element.displayName || element.type}
    </div>
  )
}
