export function elementsToTree(list) {
  const map = {};
  let node;
  const roots = [];

  for (let i = 0; i < list.length; i += 1) {
    map[list[i].id] = i;
    list[i].children = [];
  }

  for (let i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId) {
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }

  for (let i = 0; i < list.length; i += 1) {
    list[i].children.sort((a, b) => a.order.localeCompare(b.order));
  }

  return roots;
}
