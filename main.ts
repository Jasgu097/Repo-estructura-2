import AvlTree from "./heap";

function main() {
  const numbers = new AvlTree();
  numbers.insert(60);
  numbers.insert(23);
  numbers.insert(90);
  numbers.insert(4);
  numbers.insert(41);
  numbers.insert(1);
  numbers.insert(29);
  numbers.insert(37);
  numbers.insert(71);
  numbers.insert(100);
  numbers.insert(84);

  console.log("Preorder");
  console.log(numbers.preorder());
  console.log(numbers.min(numbers.root?.left?.right));
}

main();
