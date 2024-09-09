import TreeNode from "./tree-node";

class AvlTree {
  private root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  public balanceFactor(ref:TreeNode): number{
    const leftHeight = this.height(ref.left);
    const rightHeight = this.height(ref.right);

    return leftHeight - rightHeight;
  }

  private checkBalanceFactor(value: number, subtree: TreeNode | null = this.root){
    if (subtree === null){
      throw new Error();
    }

    if (subtree.isleaf()){
      if (subtree.data === value){
        return;
      } else{
        throw new Error();
      }
    }

    if (value === subtree.data){
      //Nos movemos al lado izquierdo
      this.checkBalanceFactor(value, subtree.left);
      const balance = this.balanceFactor(subtree);
      if (balance === 0 || balance === -1 || balance === 1){
        return;
      }

      if (balance ===2){
        const child = subtree.left;
        let grandChild;
        if (child?.left){
          grandChild = child.left;
          this.rotateRight(subtree);
          //rotacion simple
        } else{
          grandChild = child?.right;
          //rotacion doble
        }
      }

      if (balance === -2){
        const child = subtree.right;
        if (child && child.right){
          //rotacion simple
          this.rotateLeft(subtree);
        } else {
          //rotacion doble
        }
      }
    } else{
      //Nos movemos al lado derecho
    }
  }

  private rotateRight(subtree: TreeNode) {
    const child = subtree.left;
    if (child === null){
      throw new Error();
    }

    child.right = subtree;
    subtree.left = null;
  }

  private rotateLeft(subtree: TreeNode) {
    const parentData = subtree.data;
    const child = subtree.right;
    if (child === null){
      throw new Error();
    }

    const grandChild =child.right;
    if (grandChild === null){
      throw new Error ();
    }

    subtree.data=child.data;
    subtree.left= new TreeNode (parentData);
    subtree.right = grandChild;
    child.right = null;
  }

  public insert(value:number){
  if (this.root === null){
    const node = new TreeNode(value);
    this.root = node;
  } else{
    this._insert(value,this.root);
  }
  }

  public _insert(value: number, ref: TreeNode | null){
    if (ref === null){
      const newNode = new TreeNode(value);
      return newNode;
    }

    if (value < ref.data){
      if (ref.left === null){
        ref.left = new TreeNode(value);
      } else {
        this._insert(value, ref.left);
      }
      const balanceFactor = this.balanceFactor(ref);
      console.log(balanceFactor);
      if (balanceFactor>1){
        console.log("Arbol desbalanceado");
      }
    } else {
      if (ref.right === null){
        ref.right = new TreeNode(value);
      } else{
        this._insert(value, ref.right);
      }
    }
  }

  public depth(value: number, ref: TreeNode | null = this.root): number {
    if (ref === null) {
      return -1;
    } else if (ref.data === value) {
      return 0;
    }

    const leftDepth = this.depth(value, ref.left);
    const rightDepth = this.depth(value, ref.right);

    if (leftDepth === -1 && rightDepth === -1) {
      return -1;
    }

    return Math.max(leftDepth, rightDepth) + 1;
  }

  public height(ref: TreeNode | null = null): number {
    if (ref === null) {
      return 0;
    }

    return Math.max(this.height(ref.left), this.height(ref.right));
  }
  public min(ref: TreeNode | null = this.root): TreeNode{
    if (ref === null){
      throw new Error();
    }

    if (ref.left === null){
      return ref;
    }

    return this.min(ref.left);
  }
  
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

  public search(
    value: number,
    ref: TreeNode | null = this.root
  ): TreeNode | null {
    if (ref !== null && ref.data === value) {
      return ref;
    } else if (ref !== null) {
      const leftResult = this.search(value, ref.left);

      if (leftResult === null) {
        const rightResult = this.search(value, ref.right);

        return rightResult;
      }

      return leftResult;
    }

    return null;
  }
}

export default AvlTree;
