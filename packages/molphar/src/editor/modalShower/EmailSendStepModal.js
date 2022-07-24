import {useStore} from "../../store/store";
import {Input} from "../ui/Input";
import {Evaluator} from "../Evaluator";

export const EmailSendStepModal = ({
                                     id,
                                   }) => {
  const element = useStore(state => state.flows[id]);
  const changeElementProperty = useStore(state => state.changeElementProperty);

  return (
    <div className="flex flex-col px-3 py-2">
      <Input type="text" value={element.email}
             onChange={e => changeElementProperty(element.id, 'email', e.target.value)}/>

      <div>
        {
          element.email.map((email, index) => {
            if (email.type === 'expression') {
              return <Evaluator clauses={email.clauses} key={index} hideDebug setClauses={(newClauses) => {
                changeElementProperty(element.id, 'email', {
                  type: 'expression',
                  clauses: newClauses,
                });
              }}/>
            }
          })
        }
      </div>

      {/*<Evaluator/>*/}
    </div>
  )
}
