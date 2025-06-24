// ========================================
// COMPREHENSIVE TREE IMPLEMENTATIONS IN JAVASCRIPT
// ========================================

// ========================================
// 1. BASIC TREE NODE CLASSES
// ========================================

class TreeNode {
    constructor(val = 0, children = []) {
        this.val = val;
        this.children = children;
    }
}

class BinaryTreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// ========================================
// 2. BINARY SEARCH TREE (BST)
// ========================================

class BST {
    constructor() {
        this.root = null;
    }

    insert(val) {
        this.root = this._insertHelper(this.root, val);
    }

    _insertHelper(node, val) {
        if (!node) return new BinaryTreeNode(val);
        
        if (val < node.val) {
            node.left = this._insertHelper(node.left, val);
        } else if (val > node.val) {
            node.right = this._insertHelper(node.right, val);
        }
        return node;
    }

    search(val) {
        return this._searchHelper(this.root, val);
    }

    _searchHelper(node, val) {
        if (!node || node.val === val) return node;
        return val < node.val ? 
            this._searchHelper(node.left, val) : 
            this._searchHelper(node.right, val);
    }

    delete(val) {
        this.root = this._deleteHelper(this.root, val);
    }

    _deleteHelper(node, val) {
        if (!node) return null;

        if (val < node.val) {
            node.left = this._deleteHelper(node.left, val);
        } else if (val > node.val) {
            node.right = this._deleteHelper(node.right, val);
        } else {
            // Node to delete found
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            
            // Node has two children
            let minRight = this._findMin(node.right);
            node.val = minRight.val;
            node.right = this._deleteHelper(node.right, minRight.val);
        }
        return node;
    }

    _findMin(node) {
        while (node.left) node = node.left;
        return node;
    }

    inOrder() {
        const result = [];
        this._inOrderHelper(this.root, result);
        return result;
    }

    _inOrderHelper(node, result) {
        if (node) {
            this._inOrderHelper(node.left, result);
            result.push(node.val);
            this._inOrderHelper(node.right, result);
        }
    }
}

// ========================================
// 3. AVL TREE (SELF-BALANCING BST)
// ========================================

class AVLNode extends BinaryTreeNode {
    constructor(val) {
        super(val);
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        return node ? node.height : 0;
    }

    getBalance(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    updateHeight(node) {
        if (node) {
            node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        }
    }

    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;
        
        x.right = y;
        y.left = T2;
        
        this.updateHeight(y);
        this.updateHeight(x);
        
        return x;
    }

    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;
        
        y.left = x;
        x.right = T2;
        
        this.updateHeight(x);
        this.updateHeight(y);
        
        return y;
    }

    insert(val) {
        this.root = this._insertHelper(this.root, val);
    }

    _insertHelper(node, val) {
        // Standard BST insertion
        if (!node) return new AVLNode(val);
        
        if (val < node.val) {
            node.left = this._insertHelper(node.left, val);
        } else if (val > node.val) {
            node.right = this._insertHelper(node.right, val);
        } else {
            return node; // Duplicate values not allowed
        }

        // Update height
        this.updateHeight(node);

        // Get balance factor
        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && val < node.left.val) {
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && val > node.right.val) {
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balance > 1 && val > node.left.val) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balance < -1 && val < node.right.val) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }
}

// ========================================
// 4. RED-BLACK TREE
// ========================================

class RBNode extends BinaryTreeNode {
    constructor(val, color = 'RED') {
        super(val);
        this.color = color;
        this.parent = null;
    }
}

class RedBlackTree {
    constructor() {
        this.NIL = new RBNode(null, 'BLACK');
        this.root = this.NIL;
    }

    leftRotate(x) {
        const y = x.right;
        x.right = y.left;
        
        if (y.left !== this.NIL) {
            y.left.parent = x;
        }
        
        y.parent = x.parent;
        
        if (x.parent === null) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        
        y.left = x;
        x.parent = y;
    }

    rightRotate(x) {
        const y = x.left;
        x.left = y.right;
        
        if (y.right !== this.NIL) {
            y.right.parent = x;
        }
        
        y.parent = x.parent;
        
        if (x.parent === null) {
            this.root = y;
        } else if (x === x.parent.right) {
            x.parent.right = y;
        } else {
            x.parent.left = y;
        }
        
        y.right = x;
        x.parent = y;
    }

    insert(val) {
        const node = new RBNode(val);
        node.left = this.NIL;
        node.right = this.NIL;
        
        let y = null;
        let x = this.root;
        
        while (x !== this.NIL) {
            y = x;
            if (node.val < x.val) {
                x = x.left;
            } else {
                x = x.right;
            }
        }
        
        node.parent = y;
        if (y === null) {
            this.root = node;
        } else if (node.val < y.val) {
            y.left = node;
        } else {
            y.right = node;
        }
        
        if (node.parent === null) {
            node.color = 'BLACK';
            return;
        }
        
        if (node.parent.parent === null) {
            return;
        }
        
        this.fixInsert(node);
    }

    fixInsert(k) {
        let u;
        while (k.parent.color === 'RED') {
            if (k.parent === k.parent.parent.right) {
                u = k.parent.parent.left;
                if (u.color === 'RED') {
                    u.color = 'BLACK';
                    k.parent.color = 'BLACK';
                    k.parent.parent.color = 'RED';
                    k = k.parent.parent;
                } else {
                    if (k === k.parent.left) {
                        k = k.parent;
                        this.rightRotate(k);
                    }
                    k.parent.color = 'BLACK';
                    k.parent.parent.color = 'RED';
                    this.leftRotate(k.parent.parent);
                }
            } else {
                u = k.parent.parent.right;
                if (u.color === 'RED') {
                    u.color = 'BLACK';
                    k.parent.color = 'BLACK';
                    k.parent.parent.color = 'RED';
                    k = k.parent.parent;
                } else {
                    if (k === k.parent.right) {
                        k = k.parent;
                        this.leftRotate(k);
                    }
                    k.parent.color = 'BLACK';
                    k.parent.parent.color = 'RED';
                    this.rightRotate(k.parent.parent);
                }
            }
            if (k === this.root) {
                break;
            }
        }
        this.root.color = 'BLACK';
    }
}

// ========================================
// 5. SEGMENT TREE
// ========================================

class SegmentTree {
    constructor(arr) {
        this.n = arr.length;
        this.tree = new Array(4 * this.n);
        this.build(arr, 0, 0, this.n - 1);
    }

    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = arr[start];
        } else {
            const mid = Math.floor((start + end) / 2);
            this.build(arr, 2 * node + 1, start, mid);
            this.build(arr, 2 * node + 2, mid + 1, end);
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
        }
    }

    update(idx, val) {
        this.updateHelper(0, 0, this.n - 1, idx, val);
    }

    updateHelper(node, start, end, idx, val) {
        if (start === end) {
            this.tree[node] = val;
        } else {
            const mid = Math.floor((start + end) / 2);
            if (idx <= mid) {
                this.updateHelper(2 * node + 1, start, mid, idx, val);
            } else {
                this.updateHelper(2 * node + 2, mid + 1, end, idx, val);
            }
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
        }
    }

    query(l, r) {
        return this.queryHelper(0, 0, this.n - 1, l, r);
    }

    queryHelper(node, start, end, l, r) {
        if (r < start || end < l) {
            return 0;
        }
        if (l <= start && end <= r) {
            return this.tree[node];
        }
        const mid = Math.floor((start + end) / 2);
        const p1 = this.queryHelper(2 * node + 1, start, mid, l, r);
        const p2 = this.queryHelper(2 * node + 2, mid + 1, end, l, r);
        return p1 + p2;
    }
}

// ========================================
// 6. FENWICK TREE (BINARY INDEXED TREE)
// ========================================

class FenwickTree {
    constructor(n) {
        this.n = n;
        this.tree = new Array(n + 1).fill(0);
    }

    update(idx, delta) {
        for (let i = idx; i <= this.n; i += i & (-i)) {
            this.tree[i] += delta;
        }
    }

    query(idx) {
        let sum = 0;
        for (let i = idx; i > 0; i -= i & (-i)) {
            sum += this.tree[i];
        }
        return sum;
    }

    rangeQuery(l, r) {
        return this.query(r) - this.query(l - 1);
    }
}

// ========================================
// 7. TRIE (PREFIX TREE)
// ========================================

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let current = this.root;
        for (let char of word) {
            if (!(char in current.children)) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isEndOfWord = true;
    }

    search(word) {
        let current = this.root;
        for (let char of word) {
            if (!(char in current.children)) {
                return false;
            }
            current = current.children[char];
        }
        return current.isEndOfWord;
    }

    startsWith(prefix) {
        let current = this.root;
        for (let char of prefix) {
            if (!(char in current.children)) {
                return false;
            }
            current = current.children[char];
        }
        return true;
    }

    getAllWords() {
        const words = [];
        this._dfs(this.root, '', words);
        return words;
    }

    _dfs(node, currentWord, words) {
        if (node.isEndOfWord) {
            words.push(currentWord);
        }
        for (let char in node.children) {
            this._dfs(node.children[char], currentWord + char, words);
        }
    }
}

// ========================================
// 8. HEAP (PRIORITY QUEUE)
// ========================================

class MinHeap {
    constructor() {
        this.heap = [];
    }

    parent(i) { return Math.floor((i - 1) / 2); }
    leftChild(i) { return 2 * i + 1; }
    rightChild(i) { return 2 * i + 2; }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(i) {
        while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    heapifyDown(i) {
        let minIndex = i;
        const left = this.leftChild(i);
        const right = this.rightChild(i);

        if (left < this.heap.length && this.heap[left] < this.heap[minIndex]) {
            minIndex = left;
        }
        if (right < this.heap.length && this.heap[right] < this.heap[minIndex]) {
            minIndex = right;
        }
        if (i !== minIndex) {
            this.swap(i, minIndex);
            this.heapifyDown(minIndex);
        }
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }
}

// ========================================
// 9. TREAP (RANDOMIZED BST)
// ========================================

class TreapNode {
    constructor(key, priority = Math.random()) {
        this.key = key;
        this.priority = priority;
        this.left = null;
        this.right = null;
    }
}

class Treap {
    constructor() {
        this.root = null;
    }

    rotateRight(y) {
        const x = y.left;
        y.left = x.right;
        x.right = y;
        return x;
    }

    rotateLeft(x) {
        const y = x.right;
        x.right = y.left;
        y.left = x;
        return y;
    }

    insert(key) {
        this.root = this._insertHelper(this.root, key);
    }

    _insertHelper(root, key) {
        if (!root) {
            return new TreapNode(key);
        }

        if (key <= root.key) {
            root.left = this._insertHelper(root.left, key);
            if (root.left.priority > root.priority) {
                root = this.rotateRight(root);
            }
        } else {
            root.right = this._insertHelper(root.right, key);
            if (root.right.priority > root.priority) {
                root = this.rotateLeft(root);
            }
        }
        return root;
    }

    search(key) {
        return this._searchHelper(this.root, key);
    }

    _searchHelper(root, key) {
        if (!root || root.key === key) {
            return root !== null;
        }
        return key < root.key ? 
            this._searchHelper(root.left, key) : 
            this._searchHelper(root.right, key);
    }
}

// ========================================
// 10. ADVANCED TREE ALGORITHMS
// ========================================

// Lowest Common Ancestor (LCA)
class LCATree {
    constructor(root) {
        this.root = root;
        this.parent = new Map();
        this.depth = new Map();
        this.up = new Map(); // For binary lifting
        this.LOG = 20; // log2(maxN)
        
        this.dfs(root, null, 0);
        this.preprocess();
    }

    dfs(node, par, d) {
        this.parent.set(node, par);
        this.depth.set(node, d);
        
        if (node.left) this.dfs(node.left, node, d + 1);
        if (node.right) this.dfs(node.right, node, d + 1);
    }

    preprocess() {
        // Binary lifting preprocessing
        for (let node of this.parent.keys()) {
            if (!this.up.has(node)) this.up.set(node, new Array(this.LOG));
            this.up.get(node)[0] = this.parent.get(node);
        }

        for (let j = 1; j < this.LOG; j++) {
            for (let node of this.parent.keys()) {
                if (this.up.get(node)[j - 1]) {
                    this.up.get(node)[j] = this.up.get(this.up.get(node)[j - 1])[j - 1];
                }
            }
        }
    }

    lca(u, v) {
        if (this.depth.get(u) < this.depth.get(v)) {
            [u, v] = [v, u];
        }

        // Bring u to the same level as v
        let diff = this.depth.get(u) - this.depth.get(v);
        for (let i = 0; i < this.LOG; i++) {
            if ((diff >> i) & 1) {
                u = this.up.get(u)[i];
            }
        }

        if (u === v) return u;

        // Binary lifting to find LCA
        for (let i = this.LOG - 1; i >= 0; i--) {
            if (this.up.get(u)[i] !== this.up.get(v)[i]) {
                u = this.up.get(u)[i];
                v = this.up.get(v)[i];
            }
        }

        return this.up.get(u)[0];
    }
}

// Heavy-Light Decomposition
class HeavyLightDecomposition {
    constructor(adj, root) {
        this.n = adj.length;
        this.adj = adj;
        this.root = root;
        this.parent = new Array(this.n);
        this.depth = new Array(this.n);
        this.heavy = new Array(this.n).fill(-1);
        this.head = new Array(this.n);
        this.pos = new Array(this.n);
        this.currentPos = 0;

        this.dfs(root, -1);
        this.decompose(root, root);
    }

    dfs(v, p) {
        let size = 1;
        let maxChildSize = 0;
        
        this.parent[v] = p;
        this.depth[v] = p === -1 ? 0 : this.depth[p] + 1;

        for (let u of this.adj[v]) {
            if (u !== p) {
                let childSize = this.dfs(u, v);
                size += childSize;
                if (childSize > maxChildSize) {
                    maxChildSize = childSize;
                    this.heavy[v] = u;
                }
            }
        }
        return size;
    }

    decompose(v, h) {
        this.head[v] = h;
        this.pos[v] = this.currentPos++;

        if (this.heavy[v] !== -1) {
            this.decompose(this.heavy[v], h);
        }

        for (let u of this.adj[v]) {
            if (u !== this.parent[v] && u !== this.heavy[v]) {
                this.decompose(u, u);
            }
        }
    }

    lca(u, v) {
        while (this.head[u] !== this.head[v]) {
            if (this.depth[this.head[u]] > this.depth[this.head[v]]) {
                u = this.parent[this.head[u]];
            } else {
                v = this.parent[this.head[v]];
            }
        }
        return this.depth[u] < this.depth[v] ? u : v;
    }
}

// Suffix Tree (Simplified)
class SuffixTreeNode {
    constructor() {
        this.children = {};
        this.suffixIndex = -1;
    }
}

class SuffixTree {
    constructor(text) {
        this.text = text + '$'; // End marker
        this.root = new SuffixTreeNode();
        this.build();
    }

    build() {
        for (let i = 0; i < this.text.length; i++) {
            this.insertSuffix(i);
        }
    }

    insertSuffix(suffixIndex) {
        let current = this.root;
        for (let i = suffixIndex; i < this.text.length; i++) {
            let char = this.text[i];
            if (!(char in current.children)) {
                current.children[char] = new SuffixTreeNode();
            }
            current = current.children[char];
        }
        current.suffixIndex = suffixIndex;
    }

    search(pattern) {
        let current = this.root;
        for (let char of pattern) {
            if (!(char in current.children)) {
                return false;
            }
            current = current.children[char];
        }
        return true;
    }
}

// Tree Isomorphism Check
class TreeIsomorphism {
    static getCanonicalForm(root) {
        if (!root) return '';
        
        const subtrees = [];
        if (root.left) subtrees.push(this.getCanonicalForm(root.left));
        if (root.right) subtrees.push(this.getCanonicalForm(root.right));
        
        subtrees.sort();
        return '(' + subtrees.join('') + ')';
    }

    static areIsomorphic(root1, root2) {
        return this.getCanonicalForm(root1) === this.getCanonicalForm(root2);
    }
}

// ========================================
// 11. USAGE EXAMPLES
// ========================================

// Example usage:
function demonstrateTreeStructures() {
    console.log('=== Tree Data Structures Demo ===');
    
    // BST Example
    const bst = new BST();
    [50, 30, 70, 20, 40, 60, 80].forEach(val => bst.insert(val));
    console.log('BST In-order:', bst.inOrder()); // [20, 30, 40, 50, 60, 70, 80]
    
    // AVL Tree Example
    const avl = new AVLTree();
    [10, 20, 30, 40, 50, 25].forEach(val => avl.insert(val));
    console.log('AVL Tree created and balanced');
    
    // Segment Tree Example
    const segTree = new SegmentTree([1, 3, 5, 7, 9, 11]);
    console.log('Sum of range [1, 3]:', segTree.query(1, 3)); // 15
    
    // Fenwick Tree Example
    const fenwick = new FenwickTree(10);
    fenwick.update(1, 5);
    fenwick.update(3, 3);
    console.log('Prefix sum up to index 3:', fenwick.query(3)); // 8
    
    // Trie Example
    const trie = new Trie();
    ['apple', 'app', 'application'].forEach(word => trie.insert(word));
    console.log('Search "app":', trie.search('app')); // true
    console.log('Starts with "app":', trie.startsWith('app')); // true
    
    // Min Heap Example
    const heap = new MinHeap();
    [3, 1, 6, 5, 2, 4].forEach(val => heap.insert(val));
    console.log('Min element:', heap.peek()); // 1
    console.log('Extract min:', heap.extractMin()); // 1
    
    // Treap Example
    const treap = new Treap();
    [1, 2, 3, 4, 5].forEach(key => treap.insert(key));
    console.log('Treap search 3:', treap.search(3)); // true
    
    // Suffix Tree Example
    const suffixTree = new SuffixTree('banana');
    console.log('Search "ana":', suffixTree.search('ana')); // true
    console.log('Search "xyz":', suffixTree.search('xyz')); // false
}

// Run demonstration
// demonstrateTreeStructures();