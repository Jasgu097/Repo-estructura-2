import Heap from "./prueba";

function main() {
  const numbers = new Heap(1);
  numbers.insert(2);
  numbers.insert(3);
  numbers.insert(4);
  numbers.insert(5);
  numbers.insert(6);
  numbers.insert(7);
  numbers.insert(8);
  numbers.insert(9);
  numbers.insert(10);
  numbers.insert(11);
  numbers.insert(12);
  numbers.insert(13);
  console.log("Preorder");
  console.log(numbers.preorder());
  numbers.extractMin()
  console.log("Ultimo preorden");
  console.log(numbers.preorder());

}

main();
