import TreeNode from "./tree-node";

class Heap {
  private root: TreeNode | null;

  constructor(rootValue: number) {
    this.root = new TreeNode(rootValue);
  }

  // Inserta un valor en el montículo de manera recursiva
  public insert(value: number) {
    if (this.root === null) {
      // Si no hay raíz, el nuevo valor se convierte en la raíz
      this.root = new TreeNode(value);
    } else {
      // Insertamos el nuevo valor recursivamente en la posición correcta
      this.root = this.insertRecursively(this.root, value);
    }
  }

  // Método auxiliar para insertar recursivamente en el árbol
  private insertRecursively(node: TreeNode | null, value: number): TreeNode {
    // Si el nodo es nulo, significa que hemos encontrado una posición vacía
    if (node === null) {
      return new TreeNode(value);
    }
  
    // Comprobamos en qué subárbol debemos insertar
    if (this.subtreeSize(node.left) <= this.subtreeSize(node.right)) {
      // Si el subárbol izquierdo es más pequeño o igual, insertamos a la izquierda
      node.left = this.insertRecursively(node.left, value);
    } else {
      // Si el subárbol derecho es más pequeño, insertamos a la derecha
      node.right = this.insertRecursively(node.right, value);
    }
  
    // Después de insertar, necesitamos "heapify" hacia arriba para mantener las propiedades del montículo
    return this.heapifyUp(node);
  }
  
  // Reorganiza el árbol para que cumpla las propiedades del montículo
  private heapifyUp(node: TreeNode): TreeNode {
    // Si no hay padre, no hacemos nada
    if (node.left === null && node.right === null) {
      return node;
    }

    let smallest = node;

    // Verificamos si el nodo izquierdo es menor
    if (node.left !== null && node.left.data < node.data) {
      smallest = node.left;
    }

    // Verificamos si el nodo derecho es menor
    if (node.right !== null && node.right.data < smallest.data) {
      smallest = node.right;
    }

    // Si encontramos un hijo más pequeño, intercambiamos
    if (smallest !== node) {
      const temp = node.data;
      node.data = smallest.data;
      smallest.data = temp;

      // Recursivamente aplicamos heapify hacia el hijo más pequeño
      this.heapifyUp(smallest);
    }

    return node;
  }

  // Método para calcular el tamaño de un subárbol de manera recursiva
  private subtreeSize(node: TreeNode | null): number {
    if (node === null) {
      return 0;
    }
    return 1 + this.subtreeSize(node.left) + this.subtreeSize(node.right);
  }

  // Método para mostrar el árbol en preorden (para propósitos de depuración)
  public preorder(ref: TreeNode | null = this.root): string {
    if (ref === null) {
      return "";
    }

    if (ref.left === null && ref.right === null) {
      return ref.data.toString();
    }

    let result = `${ref.data} (`;
    result += `${this.preorder(ref.left)},`;
    result += `${this.preorder(ref.right)})`;

    return result;
  }

  // Inserta un valor en un heap máximo
  public insertMaxHeap(value: number) {
    if (this.root === null) {
      this.root = new TreeNode(value);
    } else {
      this.root = this.insertMaxHeapRecursively(this.root, value);
    }
  }

  // Método auxiliar para insertar recursivamente en el árbol en un heap máximo
  private insertMaxHeapRecursively(node: TreeNode | null, value: number): TreeNode {
    if (node === null) {
      return new TreeNode(value);
    }

    if (this.subtreeSize(node.left) <= this.subtreeSize(node.right)) {
      node.left = this.insertMaxHeapRecursively(node.left, value);
    } else {
      node.right = this.insertMaxHeapRecursively(node.right, value);
    }

    return this.heapifyDownMax(node);
  }

  // Reorganiza el árbol para que cumpla las propiedades del montículo máximo
  private heapifyDownMax(node: TreeNode): TreeNode {
    let largest = node;

    if (node.left !== null && node.left.data > largest.data) {
      largest = node.left;
    }

    if (node.right !== null && node.right.data > largest.data) {
      largest = node.right;
    }

    if (largest !== node) {
      const temp = node.data;
      node.data = largest.data;
      largest.data = temp;

      this.heapifyDownMax(largest);
    }

    return node;
  }
   // Método para extraer el mínimo (la raíz) del heap
   public extractMin(): number | null {
    if (this.root === null) {
      return null; // Si el heap está vacío, no hay nada que extraer
    }

    const minValue = this.root.data;

    if (this.root.left === null && this.root.right === null) {
      // Si solo hay un elemento en el heap, lo eliminamos
      this.root = null;
    } else {
      // Reemplazamos la raíz con el último elemento del heap y hacemos heapify
      this.root = this.removeLastElementAndReplaceRoot(this.root);
      this.heapifyDown(this.root);
    }

    return minValue;
  }

  // Método auxiliar para eliminar el último elemento y reemplazar la raíz
  private removeLastElementAndReplaceRoot(node: TreeNode): TreeNode | null {
    const nodes: TreeNode[] = [];
    const queue: (TreeNode | null)[] = [node];

    // Usamos una cola para hacer un recorrido nivel por nivel (BFS)
    while (queue.length > 0) {
      const current = queue.shift();

      if (current) {
        nodes.push(current);
        if (current.left !== null) queue.push(current.left);
        if (current.right !== null) queue.push(current.right);
      }
    }

    const lastNode = nodes.pop();

    if (lastNode) {
      // Reemplazamos los datos de la raíz con los del último nodo
      node.data = lastNode.data;

      // Eliminamos el último nodo del árbol
      this.deleteLastNode(node, lastNode);
    }

    return node;
  }

  // Método auxiliar para eliminar el último nodo del árbol
  private deleteLastNode(root: TreeNode, lastNode: TreeNode): void {
    const queue: (TreeNode | null)[] = [root];

    while (queue.length > 0) {
      const current = queue.shift();

      if (current) {
        if (current.left === lastNode) {
          current.left = null;
          return;
        } else if (current.left !== null) {
          queue.push(current.left);
        }

        if (current.right === lastNode) {
          current.right = null;
          return;
        } else if (current.right !== null) {
          queue.push(current.right);
        }
      }
    }
  }

  // Método para hacer heapify hacia abajo después de la eliminación
  private heapifyDown(node: TreeNode | null): void {
    if (node === null) return;

    let smallest = node;

    if (node.left !== null && node.left.data < smallest.data) {
      smallest = node.left;
    }

    if (node.right !== null && node.right.data < smallest.data) {
      smallest = node.right;
    }

    if (smallest !== node) {
      const temp = node.data;
      node.data = smallest.data;
      smallest.data = temp;

      this.heapifyDown(smallest);
    }
  }
}

export default Heap;
