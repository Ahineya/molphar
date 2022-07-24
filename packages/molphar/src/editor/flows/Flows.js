import {useStore} from "../../store/store"
import {Evaluator} from "../Evaluator";
import {AddStep} from "./AddStep";
import {Step} from "./Step";
import {Trigger} from "./Trigger";
import {useState} from "react";
import {AddFlow} from "./AddFlow";

export const Flows = () => {

  const flowsTree = useStore(state => state.flowsTree);
  const elements = useStore(state => state.elements);

  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex items-start">
        {
          flowsTree.children.map(flow => (
            <div key={flow.id} className="flex items-center gap-1">
              <Trigger flow={flow} elements={elements}/>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
              {
                flow.children.map(step => (
                  <>
                    <Step flow={flow} step={step}/>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </>
                ))
              }

              <AddStep/>
            </div>
          ))
        }
      </div>
      <AddFlow />

    </div>
  )
}
