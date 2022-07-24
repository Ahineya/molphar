function applyClause(clause, context) {
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

export function evaluate(clauses, context) {
  const evaluated = Object.values(clauses).reduce((context, clause) => {
    return applyClause(clause, context).value;
  }, context);

  if (evaluated === context) {
    return null;
  }

  return evaluated;
}
