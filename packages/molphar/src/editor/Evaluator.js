import classNames from "classnames";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useStore } from "../store/store";
import {evaluate} from "common/evaluator";

export const Evaluator = ({
  clauses,
  setClauses,
  debug,
                          }) => {
  const showModal = useStore(state => state.showModal);
  const elements = useStore(state => state.elements);

  const applyClause = (clause, context) => {
    switch (clause.type) {
      case 'elementRef':
        return {
          value: context[clause.elementId],
          type: `element:${clause.elementId}`,
        }
      case 'property':
        return {
          value: context[clause.property],
          type: typeof context[clause.property]
        }
      default:
        return {
          value: 'UNKNOWN',
          type: 'UNKNOWN',
        }
    }
  }

  const getClause = (clause, context) => {
    switch (clause.type) {
      case 'elementRef':
        return {
          view: elements[clause.elementId].name,
          ...applyClause(clause, context),
          clause,
        }
      case 'property':
        return {
          view: `'s ${clause.property}`,
          ...applyClause(clause, context),
          clause,
        }
      default:
        return {
          view: 'UNKNOWN',
          ...applyClause(clause, context),
          clause,
        }
    }
  }

  const showClauseInterface = (e, evaluatedClause, clauseIndex, evaluatedClauses) => {
    switch (evaluatedClause.clause.type) {
      case 'elementRef':
        // Show Select something modal
        showModal({
          name: 'clauseSettings',
          element: <div>
            {
              Object.values(elements).map(element => {
                return (
                  <div
                    key={element.id}
                    onClick={() => {
                      const newClauses = JSON.parse(JSON.stringify(clauses));
                      newClauses[evaluatedClause.clause.id].elementId = element.id;
                      // TODO: Check validity of the next clause

                      setClauses(newClauses);
                    }}
                  >{element.name}</div>
                )
              })
            }
          </div>,
          header: <div className="px-3 py-2 text-sm font-medium">{evaluatedClause.view}</div>,
          x: e.clientX,
          y: e.clientY,
        });
        return;
      case 'property':
        // Show previous clause properties modal
        showModal({
          name: 'clauseSettings',
          element: <div>
            {
              Object.keys(elements[evaluatedClauses[clauseIndex - 1].clause.elementId]).map(property => {
                return (
                  <div onClick={() => {
                    const newClauses = JSON.parse(JSON.stringify(clauses));
                    newClauses[evaluatedClause.clause.id].property = property;
                    setClauses(newClauses);
                  }}>{property}</div>
                )
              })
            }
          </div>,
          header: <div className="px-3 py-2 text-sm font-medium">{evaluatedClause.view}</div>,
          x: e.clientX,
          y: e.clientY,
        });
        return;
      default:
        return null;
    }
  }

  const showNewClause = (e) => {
    // Show suggestions modal based on the previous clause
    const prevClause = clauses[Object.keys(clauses)[Object.keys(clauses).length - 1]];
    if (!prevClause) {
      showModal({
        name: 'clauseSettings',
        element: <div>
          {
            Object.values(elements).map(element => {
              return (
                <div
                  key={element.id}
                  onClick={() => {
                    const newClauses = JSON.parse(JSON.stringify(clauses));
                    const newId = nanoid();
                    newClauses[newId] = {
                      id: newId,
                      type: 'elementRef',
                      elementId: element.id,
                      order: Object.values(clauses).map(c => c.order).reduce((a, b) => {
                        return a > b ? a : b
                      }, 0) + 1,
                    }

                    setClauses(newClauses);
                  }}
                >{element.name}</div>
              )
            })
          }
        </div>,
        header: <div className="px-3 py-2 text-sm font-medium">Element</div>,
        x: e.clientX,
        y: e.clientY,
      });
    } else {
      switch (prevClause.type) {
        case 'elementRef':
          showModal({
            name: 'clauseSettings',
            element: <div>
              {
                Object.keys(elements[prevClause.elementId]).map(property => {
                  return (
                    <div onClick={() => {
                      const newClauses = JSON.parse(JSON.stringify(clauses));
                      const newId = nanoid();
                      newClauses[newId] = {
                        id: newId,
                        type: 'property',
                        property,
                        order: Object.values(clauses).map(c => c.order).reduce((a, b) => {
                          return a > b ? a : b
                        }, 0) + 1,
                      }
                      setClauses(newClauses);
                    }}>{property}</div>
                  )
                })
              }
            </div>,
            header: <div className="px-3 py-2 text-sm font-medium">{elements[prevClause.elementId].name}</div>,
            x: e.clientX,
            y: e.clientY,
          });
          return;
        case 'property':
          alert('not implemented');
          return;
        default:
          return;
      }
    }
  }

  return (
    <div className="flex-grow">
      {
        debug && <h1>Evaluator</h1>
      }

      <div>
        {
          Object.values(clauses).reduce((acc, clause) => {
            const evaluatedClause = getClause(clause, acc.context);
            acc.clauses.push(evaluatedClause);
            acc.context = evaluatedClause.value;
            return acc;
          }, { context: elements, clauses: [] })
            .clauses.map((evaluatedClause, i, arr) => {
              return (
                <span
                  key={evaluatedClause.clause.id}
                  className={classNames("cursor-default select-none hover:text-cyan-700", {
                    'border border-dashed border-gray-600 ml-1 px-1 inline-block': evaluatedClause.type === 'new',
                  })}
                  title={evaluatedClause.type}
                  onClick={(e) => showClauseInterface(e, evaluatedClause, i, arr)}
                >
                  {evaluatedClause.view}
                </span>
              )
            })
        }
        <span
          key='new'
          className="cursor-default select-none hover:text-cyan-700 border border-dashed border-gray-600 ml-1 px-1 inline-block"
          title="New clause"
          onClick={(e) => showNewClause(e)}
        >
          New
        </span>
      </div>

      {
        debug && <div>
          Evaluated:
          {
            JSON.stringify(evaluate(clauses, elements))
          }
        </div>
      }
    </div>
  )
}
