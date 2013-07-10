var tree = new Tree();
tree.push(9,6,3,425);
tree.childrenOf(3).push(5,4,3,2,1);
tree.childrenOf(6).push(45,28,9,5,225,6);
console.log(tree);
tree.sort();
console.log(tree);
tree.reverse();
console.log(tree);

function compareNumbers(a, b) {
  return a - b;
}

tree.sort(compareNumbers);
console.log(tree);

