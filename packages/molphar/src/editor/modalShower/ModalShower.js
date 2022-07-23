import {createElement, useEffect} from "react";
import {useStore} from "../../store/store";
import {Input} from "../ui/Input";
import {TailwindToggle} from "../ui/TailwindToggle";
import {Evaluator} from "../Evaluator";

export const ModalShower = () => {
  const selectedId = useStore(state => state.selectedId);
  const elements = useStore(state => state.elements);
  const flows = useStore(state => state.flows);
  const showModal = useStore(state => state.showModal);
  const hideAllModals = useStore(state => state.hideAllModals);

  const lastX = useStore(state => state.lastX);
  const lastY = useStore(state => state.lastY);

  const element = elements[selectedId];
  const flow = flows[selectedId];

  const selectedEntity = element || flow;

  useEffect(() => {
    if (!selectedEntity) {
      hideAllModals();
      return;
    }

    switch (selectedEntity.type) {
      case 'button':
        showModal({
          name: 'elementSettings',
          element: createElement(ButtonModal, {id: selectedEntity.id}), //<ButtonModal id={element.id} />,
          header: <div className="px-3 py-2 text-sm font-medium">Edit button</div>,
          x: lastX,
          y: lastY,
        });
        break;
      case 'container':
        showModal({
          name: 'elementSettings',
          element: <ContainerModal id={selectedEntity.id}/>,
          header: <div className="px-3 py-2 text-sm font-medium">Edit container</div>,
          x: lastX,
          y: lastY,
        });
        break;
      case 'text':
        showModal({
          name: 'elementSettings',
          element: <TextModal id={selectedEntity.id}/>,
          header: <div className="px-3 py-2 text-sm font-medium">Edit text</div>,
          x: lastX,
          y: lastY,
        });
        break;
      case 'input':
        showModal({
          name: 'elementSettings',
          element: <InputModal id={selectedEntity.id}/>,
          header: <div className="px-3 py-2 text-sm font-medium">Edit input</div>,
          x: lastX,
          y: lastY,
        });
        break;
      case 'flow':
        showModal({
          name: 'elementSettings',
          element: <TriggerModal id={selectedEntity.id}/>,
          header: <div className="px-3 py-2 text-sm font-medium">Edit trigger</div>,
          x: lastX,
          y: lastY,
        });
        break;
      case 'js':
        showModal({
          name: 'elementSettings',
          element: <JSStepModal id={selectedEntity.id}/>,
          header: <div className="px-3 py-2 text-sm font-medium">Edit step</div>,
          x: lastX,
          y: lastY,
        });
        break;
      case 'email:send':
        showModal({
          name: 'elementSettings',
          element: <EmailSendStepModal id={selectedEntity.id}/>,
          header: <div className="px-3 py-2 text-sm font-medium">Edit step</div>,
          x: lastX,
          y: lastY,
        });
        break;
      case 'data:create':
        showModal({
          name: 'elementSettings',
          element: <DataCreateStepModal id={selectedEntity.id}/>,
          header: <div className="px-3 py-2 text-sm font-medium">Edit step</div>,
          x: lastX,
          y: lastY,
        });
        break;
    }
  }, [selectedEntity]);

  return null;
}

const ButtonModal = ({
                       id,
                     }) => {
  const element = useStore(state => state.elements[id]);
  const changeElementProperty = useStore(state => state.changeElementProperty);

  return (
    <div className="flex flex-col px-3 py-2">
      <Input type="text" value={element.name || element.text}
             onChange={e => changeElementProperty(element.id, 'name', e.target.value)}/>
      <Input type="text" value={element.text}
             onChange={e => changeElementProperty(element.id, 'text', e.target.value)}/>
      <Input type="text" value={element.className}
             onChange={e => changeElementProperty(element.id, 'className', e.target.value)}/>
      <TailwindToggle
        classes={['text-left', 'text-center', 'text-right']}
        classString={element.className}
        onChange={newClasses => changeElementProperty(element.id, 'className', newClasses)}
      />
    </div>
  )
}

const InputModal = ({
                      id,
                    }) => {
  const element = useStore(state => state.elements[id]);
  const changeElementProperty = useStore(state => state.changeElementProperty);

  return (
    <div className="flex flex-col px-3 py-2">
      <Input type="text" value={element.name || element.text}
             onChange={e => changeElementProperty(element.id, 'name', e.target.value)}/>
      <Input type="text" value={element.text}
             onChange={e => changeElementProperty(element.id, 'text', e.target.value)}/>
      <Input type="text" value={element.className}
             onChange={e => changeElementProperty(element.id, 'className', e.target.value)}/>
      <TailwindToggle
        classes={['text-left', 'text-center', 'text-right']}
        classString={element.className}
        onChange={newClasses => changeElementProperty(element.id, 'className', newClasses)}
      />
    </div>
  )
}

const ContainerModal = ({
                          id,
                        }) => {
  const element = useStore(state => state.elements[id]);
  const changeElementProperty = useStore(state => state.changeElementProperty);

  return (
    <div className="flex flex-col px-3 py-2">
      <Input type="text" value={element.name || element.type}
             onChange={e => changeElementProperty(element.id, 'name', e.target.value)}/>
      <Input type="text" value={element.className}
             onChange={e => changeElementProperty(element.id, 'className', e.target.value)}/>
      <TailwindToggle
        classes={['flex', 'block', 'inline', 'inline-block', 'inline-flex', 'grid']}
        classString={element.className || ''}
        onChange={newClasses => changeElementProperty(element.id, 'className', newClasses)}
      />
      <TailwindToggle
        classes={['items-start', 'items-center', 'items-end']}
        classString={element.className || ''}
        onChange={newClasses => changeElementProperty(element.id, 'className', newClasses)}
      />
      <TailwindToggle
        classes={['justify-start', 'justify-center', 'justify-end', 'justify-between', 'justify-around']}
        classString={element.className || ''}
        onChange={newClasses => changeElementProperty(element.id, 'className', newClasses)}
      />
    </div>
  )
}

const TextModal = ({
                     id,
                   }) => {
  const element = useStore(state => state.elements[id]);
  const changeElementProperty = useStore(state => state.changeElementProperty);

  return (
    <div className="flex flex-col px-3 py-2">
      <Input type="text" value={element.name || element.text}
             onChange={e => changeElementProperty(element.id, 'name', e.target.value)}/>
      <Input type="text" value={element.text}
             onChange={e => changeElementProperty(element.id, 'text', e.target.value)}/>
      <Input type="text" value={element.className}
             onChange={e => changeElementProperty(element.id, 'className', e.target.value)}/>
      <TailwindToggle
        classes={['text-left', 'text-center', 'text-right']}
        classString={element.className}
        onChange={newClasses => changeElementProperty(element.id, 'className', newClasses)}
      />
    </div>
  )
}

const TriggerModal = ({
                        id,
                      }) => {
  const element = useStore(state => state.flows[id]);
  const changeElementProperty = useStore(state => state.changeElementProperty);

  return (
    <div className="flex flex-col px-3 py-2">
      <Input type="text" value={element.trigger}
             onChange={e => changeElementProperty(element.id, 'trigger', e.target.value)}/>
      <Input type="text" value={element.elementId}
             onChange={e => changeElementProperty(element.id, 'elementId', e.target.value)}/>
    </div>
  )
}

const JSStepModal = ({
                       id,
                     }) => {
  const element = useStore(state => state.flows[id]);
  const changeElementProperty = useStore(state => state.changeElementProperty);

  return (
    <div className="flex flex-col px-3 py-2">
      <Input type="text" value={element.code}
             onChange={e => changeElementProperty(element.id, 'code', e.target.value)}/>
    </div>
  )
}

const EmailSendStepModal = ({
                              id,
                            }) => {
  const element = useStore(state => state.flows[id]);
  const changeElementProperty = useStore(state => state.changeElementProperty);

  return (
    <div className="flex flex-col px-3 py-2">
      <Input type="text" value={element.email}
             onChange={e => changeElementProperty(element.id, 'email', e.target.value)}/>

      <Evaluator />
    </div>
  )
}

const DataCreateStepModal = ({
                              id,
                            }) => {
  const element = useStore(state => state.flows[id]);
  const changeElementProperty = useStore(state => state.changeElementProperty);

  return (
    <div className="flex flex-col px-3 py-2">
      <Input type="text" value={element.dataType}
             onChange={e => changeElementProperty(element.id, 'dataType', e.target.value)}/>
      {
        JSON.stringify(element.values)
      }
    </div>
  )
}
