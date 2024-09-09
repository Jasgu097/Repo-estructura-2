import TreeNode from "./tree-node";

class Heap {
  private root: TreeNode | null;

  constructor(rootValue: number) {
    this.root = new TreeNode(rootValue);
  }
  
  public insert(value: number): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    const queue: (TreeNode | null)[] = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();

      if (current) {
        if (!current.left) {
          current.left = newNode;
          this.heapifyUp(current.left);
          return;
        } else {
          queue.push(current.left);
        }

        if (!current.right) {
          current.right = newNode;
          this.heapifyUp(current.right);
          return;
        } else {
          queue.push(current.right);
        }
      }
    }
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

  private heapifyUp(node: TreeNode | null): void {
    if (!node || !this.root) {
      return;
    }

    let current = node;
    let parent = this.findParent(current);

    while (parent && parent.data > current.data) { // For a Min-Heap
      this.swap(parent, current);
      current = parent;
      parent = this.findParent(current);
    }
  }

  private findParent(child: TreeNode): TreeNode | null {
    const queue: (TreeNode | null)[] = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();

      if (current) {
        if (current.left === child || current.right === child) {
          return current;
        }
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
    return null;
  }

  private swap(node1: TreeNode, node2: TreeNode): void {
    const temp = node1.data;
    node1.data = node2.data;
    node2.data = temp;
  }

  // Método para extraer la raíz
  public extractMin(): number | null {
    if (!this.root) {
      return null;
    }

    const minValue = this.root.data;

    // Mueve el último nodo a la raíz
    const lastNode = this.removeLastNode();
    if (lastNode && this.root !== lastNode) {
      this.root.data = lastNode.data; // Ajustar el heap
      this.heapifyDown(this.root); // Si el heap tenía solo un nodo, ahora está vacío
    }

    return minValue;
  }

  private removeLastNode(): TreeNode | null {
    if (!this.root) {
      return null;
    }

    const queue: (TreeNode | null)[] = [this.root];
    let lastNode: TreeNode | null = null;
    let parent: TreeNode | null = null;

    while (queue.length > 0) {
      const current = queue.shift();

      if (current) {
        lastNode = current;

        if (current.left) {
          parent = current;
          queue.push(current.left);
        }

        if (current.right) {
          parent = current;
          queue.push(current.right);
        }
      }
    }

    if (parent) {
      if (parent.right === lastNode) {
        parent.right = null;
      } else if (parent.left === lastNode) {
        parent.left = null;
      }
    } else {
      this.root = null;
    }

    return lastNode;
  }

  private heapifyDown(node: TreeNode): void {
    let current = node;

    while (true) {
      let smallest = current;
      if (current.left && current.left.data < smallest.data) {
        smallest = current.left;
      }
      if (current.right && current.right.data < smallest.data) {
        smallest = current.right;
      }
      if (smallest === current) {
        break;
      }
      this.swap(current, smallest);
      current = smallest;
    }
  }
}

export default Heap;
