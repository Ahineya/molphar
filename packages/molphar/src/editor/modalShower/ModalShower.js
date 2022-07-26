import {createElement, useEffect} from "react";
import {useStore} from "../../store/store";
import {Input} from "../ui/Input";
import {TailwindToggle} from "../ui/TailwindToggle";
import {EmailSendStepModal} from "./EmailSendStepModal";
import {Modal} from "../modal/modal";
import {Dropdown} from "../ui/Dropdown";

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

    showModal({
      name: 'elementSettings',
      x: lastX,
      y: lastY,
    });
  }, [selectedEntity]);

  const getModalElement = () => {
    if (!selectedEntity) {
      return null;
    }

    switch (selectedEntity.type) {
      case 'ROOT':
        return null;
      case 'button':
        return createElement(ButtonModal, {id: selectedEntity.id}); //<ButtonModal id={element.id} />,
      case 'container':
        return <ContainerModal id={selectedEntity.id}/>;
      case 'text':
        return <TextModal id={selectedEntity.id}/>;
      case 'input':
        return <InputModal id={selectedEntity.id}/>;
      case 'flow':
        return <TriggerModal id={selectedEntity.id}/>;
      case 'js':
        return <JSStepModal id={selectedEntity.id}/>;
      case 'email:send':
        return <EmailSendStepModal id={selectedEntity.id}/>;
      case 'data:create':
        return <DataCreateStepModal id={selectedEntity.id}/>;
      default:
        return <div className="text-red-500">This is a bug, please, contact developers</div>
    }
  }

  const getModalHeader = () => {
    if (!selectedEntity) {
      return null;
    }

    switch (selectedEntity.type) {
      case 'ROOT':
        return 'Body';
      case 'button':
        return 'Button';
      case 'container':
        return 'Container';
      case 'text':
        return 'Text';
      case 'input':
        return 'Input';
      case 'flow':
        return 'Flow';
      case 'js':
        return 'JS';
      case 'email:send':
        return 'Email';
      case 'data:create':
        return 'Data';
      default:
        return <div className="text-red-500">Unknown</div>
    }
  }

  return (
    <Modal name="elementSettings" header={<div className="px-3 py-2 text-sm font-medium">Edit {getModalHeader()}</div>}>
      {
        getModalElement()
      }
    </Modal>
  );
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
      <Input type="text" value={element.placeholder}
             onChange={e => changeElementProperty(element.id, 'placeholder', e.target.value)}/>
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
      <Input type="number" value={element.height}
             onChange={e => changeElementProperty(element.id, 'height', e.target.value)}/>
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
  const elements = useStore(state => state.elements);
  const element = useStore(state => state.flows[id]);
  const changeElementProperty = useStore(state => state.changeElementProperty);
  const hideModal = useStore(state => state.hideModal);

  return (
    <div className="flex flex-col px-3 py-2">
      <Dropdown header={elements[element.elementId]?.name} name="select-element">
        {
          Object.values(elements).map(el => (
            <div className="cursor-default hover:bg-slate-300 px-2" key={el.id} onClick={() => {
              changeElementProperty(element.id, 'elementId', el.id);
              hideModal('select-element');
            }}>{el.name}</div>
          ))
        }
      </Dropdown>
      <Input type="text" value={element.trigger}
             onChange={e => changeElementProperty(element.id, 'trigger', e.target.value)}/>
      <TailwindToggle
        classes={['bg-slate-300', 'bg-purple-300', 'bg-blue-300', 'bg-orange-300', 'bg-green-300', 'bg-red-300']}
        classString={element.color}
        onChange={newClasses => changeElementProperty(element.id, 'color', newClasses)}
      />
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
