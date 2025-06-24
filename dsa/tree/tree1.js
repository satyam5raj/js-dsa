// =============================================
// 1. BASIC BINARY TREE NODE
// =============================================
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// =============================================
// 2. BINARY SEARCH TREE (BST)
// =============================================
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return undefined; // No duplicates
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  search(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      if (value < current.value) current = current.left;
      else current = current.right;
    }
    return null;
  }

  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  preOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  postOrder(node = this.root, result = []) {
    if (node) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  levelOrder() {
    if (!this.root) return [];
    const queue = [this.root];
    const result = [];
    
    while (queue.length) {
      const node = queue.shift();
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }
}

// =============================================
// 3. N-ARY TREE (File System Implementation)
// =============================================
class FileSystemNode {
  constructor(name, isDirectory = false) {
    this.name = name;
    this.isDirectory = isDirectory;
    this.children = isDirectory ? [] : null;
    this.parent = null;
    this.size = 0;
    this.permissions = { read: true, write: true, execute: false };
  }
}

class FileSystem {
  constructor() {
    this.root = new FileSystemNode('/', true);
  }

  createDirectory(path) {
    const parts = path.split('/').filter(p => p);
    let current = this.root;
    
    for (const part of parts) {
      let child = current.children.find(c => c.name === part);
      if (!child) {
        child = new FileSystemNode(part, true);
        child.parent = current;
        current.children.push(child);
      }
      current = child;
    }
    return current;
  }

  createFile(path, size = 0) {
    const parts = path.split('/').filter(p => p);
    const fileName = parts.pop();
    const dirPath = '/' + parts.join('/');
    
    const directory = this.findNode(dirPath);
    if (directory && directory.isDirectory) {
      const file = new FileSystemNode(fileName, false);
      file.parent = directory;
      file.size = size;
      directory.children.push(file);
      return file;
    }
    return null;
  }

  findNode(path) {
    if (path === '/') return this.root;
    
    const parts = path.split('/').filter(p => p);
    let current = this.root;
    
    for (const part of parts) {
      if (!current.isDirectory) return null;
      current = current.children.find(c => c.name === part);
      if (!current) return null;
    }
    return current;
  }

  listDirectory(path) {
    const node = this.findNode(path);
    if (node && node.isDirectory) {
      return node.children.map(child => ({
        name: child.name,
        type: child.isDirectory ? 'directory' : 'file',
        size: child.size
      }));
    }
    return null;
  }

  getTotalSize(node = this.root) {
    if (!node.isDirectory) return node.size;
    
    let total = 0;
    for (const child of node.children) {
      total += this.getTotalSize(child);
    }
    return total;
  }

  propagatePermissions(path, permissions) {
    const node = this.findNode(path);
    if (node) {
      this._propagateHelper(node, permissions);
    }
  }

  _propagateHelper(node, permissions) {
    node.permissions = { ...node.permissions, ...permissions };
    if (node.isDirectory) {
      for (const child of node.children) {
        this._propagateHelper(child, permissions);
      }
    }
  }
}

// =============================================
// 4. EXPRESSION TREE (AST Implementation)
// =============================================
class ExpressionNode {
  constructor(value, type = 'operand') {
    this.value = value;
    this.type = type; // 'operator' or 'operand'
    this.left = null;
    this.right = null;
  }
}

class ExpressionTree {
  constructor() {
    this.root = null;
  }

  // Build tree from postfix expression
  buildFromPostfix(postfix) {
    const stack = [];
    const operators = ['+', '-', '*', '/', '^'];
    
    for (const token of postfix) {
      if (operators.includes(token)) {
        const node = new ExpressionNode(token, 'operator');
        node.right = stack.pop();
        node.left = stack.pop();
        stack.push(node);
      } else {
        stack.push(new ExpressionNode(parseFloat(token) || token, 'operand'));
      }
    }
    
    this.root = stack[0];
    return this;
  }

  evaluate(node = this.root, variables = {}) {
    if (!node) return 0;
    
    if (node.type === 'operand') {
      return typeof node.value === 'string' ? 
        (variables[node.value] || 0) : node.value;
    }
    
    const left = this.evaluate(node.left, variables);
    const right = this.evaluate(node.right, variables);
    
    switch (node.value) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': return left / right;
      case '^': return Math.pow(left, right);
      default: return 0;
    }
  }

  toInfix(node = this.root) {
    if (!node) return '';
    
    if (node.type === 'operand') {
      return node.value.toString();
    }
    
    const left = this.toInfix(node.left);
    const right = this.toInfix(node.right);
    return `(${left} ${node.value} ${right})`;
  }

  getVariables(node = this.root, vars = new Set()) {
    if (!node) return vars;
    
    if (node.type === 'operand' && typeof node.value === 'string') {
      vars.add(node.value);
    }
    
    this.getVariables(node.left, vars);
    this.getVariables(node.right, vars);
    return Array.from(vars);
  }
}

// =============================================
// 5. DECISION TREE (Machine Learning)
// =============================================
class DecisionNode {
  constructor(feature = null, threshold = null, value = null, left = null, right = null) {
    this.feature = feature;      // Feature index for splitting
    this.threshold = threshold;  // Threshold value for splitting
    this.value = value;         // Prediction value (for leaf nodes)
    this.left = left;           // Left subtree
    this.right = right;         // Right subtree
  }

  isLeaf() {
    return this.value !== null;
  }
}

class DecisionTree {
  constructor(maxDepth = 10, minSamplesSplit = 2) {
    this.maxDepth = maxDepth;
    this.minSamplesSplit = minSamplesSplit;
    this.root = null;
  }

  fit(X, y) {
    this.root = this._buildTree(X, y, 0);
  }

  _buildTree(X, y, depth) {
    const numSamples = X.length;
    const numFeatures = X[0].length;
    
    // Stopping criteria
    if (depth >= this.maxDepth || 
        numSamples < this.minSamplesSplit || 
        this._isPure(y)) {
      return new DecisionNode(null, null, this._mostCommonClass(y));
    }
    
    // Find best split
    let bestFeature = 0;
    let bestThreshold = 0;
    let bestGini = Infinity;
    
    for (let feature = 0; feature < numFeatures; feature++) {
      const thresholds = [...new Set(X.map(row => row[feature]))].sort((a, b) => a - b);
      
      for (let i = 0; i < thresholds.length - 1; i++) {
        const threshold = (thresholds[i] + thresholds[i + 1]) / 2;
        const gini = this._calculateGini(X, y, feature, threshold);
        
        if (gini < bestGini) {
          bestGini = gini;
          bestFeature = feature;
          bestThreshold = threshold;
        }
      }
    }
    
    // Split dataset
    const { leftX, leftY, rightX, rightY } = this._split(X, y, bestFeature, bestThreshold);
    
    // Build subtrees
    const leftChild = this._buildTree(leftX, leftY, depth + 1);
    const rightChild = this._buildTree(rightX, rightY, depth + 1);
    
    return new DecisionNode(bestFeature, bestThreshold, null, leftChild, rightChild);
  }

  predict(X) {
    return X.map(sample => this._predictSample(sample, this.root));
  }

  _predictSample(sample, node) {
    if (node.isLeaf()) {
      return node.value;
    }
    
    if (sample[node.feature] <= node.threshold) {
      return this._predictSample(sample, node.left);
    } else {
      return this._predictSample(sample, node.right);
    }
  }

  _calculateGini(X, y, feature, threshold) {
    const { leftY, rightY } = this._splitLabels(X, y, feature, threshold);
    
    const totalSamples = y.length;
    const leftWeight = leftY.length / totalSamples;
    const rightWeight = rightY.length / totalSamples;
    
    return leftWeight * this._giniImpurity(leftY) + rightWeight * this._giniImpurity(rightY);
  }

  _giniImpurity(y) {
    if (y.length === 0) return 0;
    
    const classCounts = {};
    for (const label of y) {
      classCounts[label] = (classCounts[label] || 0) + 1;
    }
    
    let gini = 1;
    for (const count of Object.values(classCounts)) {
      const prob = count / y.length;
      gini -= prob * prob;
    }
    
    return gini;
  }

  _split(X, y, feature, threshold) {
    const leftX = [], leftY = [], rightX = [], rightY = [];
    
    for (let i = 0; i < X.length; i++) {
      if (X[i][feature] <= threshold) {
        leftX.push(X[i]);
        leftY.push(y[i]);
      } else {
        rightX.push(X[i]);
        rightY.push(y[i]);
      }
    }
    
    return { leftX, leftY, rightX, rightY };
  }

  _splitLabels(X, y, feature, threshold) {
    const leftY = [], rightY = [];
    
    for (let i = 0; i < X.length; i++) {
      if (X[i][feature] <= threshold) {
        leftY.push(y[i]);
      } else {
        rightY.push(y[i]);
      }
    }
    
    return { leftY, rightY };
  }

  _isPure(y) {
    return new Set(y).size === 1;
  }

  _mostCommonClass(y) {
    const classCounts = {};
    for (const label of y) {
      classCounts[label] = (classCounts[label] || 0) + 1;
    }
    
    return Object.keys(classCounts).reduce((a, b) => 
      classCounts[a] > classCounts[b] ? a : b
    );
  }

  getFeatureImportance() {
    const importance = {};
    this._calculateImportance(this.root, importance);
    
    // Normalize
    const total = Object.values(importance).reduce((sum, val) => sum + val, 0);
    for (const feature in importance) {
      importance[feature] /= total;
    }
    
    return importance;
  }

  _calculateImportance(node, importance) {
    if (!node || node.isLeaf()) return;
    
    importance[node.feature] = (importance[node.feature] || 0) + 1;
    this._calculateImportance(node.left, importance);
    this._calculateImportance(node.right, importance);
  }
}

// =============================================
// 6. GAME TREE (Minimax with Alpha-Beta Pruning)
// =============================================
class GameNode {
  constructor(state, isMaximizing = true, depth = 0) {
    this.state = state;
    this.isMaximizing = isMaximizing;
    this.depth = depth;
    this.children = [];
    this.value = null;
    this.bestMove = null;
  }
}

class GameTree {
  constructor(maxDepth = 6) {
    this.maxDepth = maxDepth;
  }

  minimax(node, alpha = -Infinity, beta = Infinity) {
    // Terminal condition
    if (node.depth >= this.maxDepth || this.isTerminal(node.state)) {
      node.value = this.evaluate(node.state);
      return node.value;
    }

    if (node.isMaximizing) {
      let maxEval = -Infinity;
      const moves = this.generateMoves(node.state);
      
      for (const move of moves) {
        const newState = this.makeMove(node.state, move);
        const child = new GameNode(newState, false, node.depth + 1);
        node.children.push(child);
        
        const eval_ = this.minimax(child, alpha, beta);
        
        if (eval_ > maxEval) {
          maxEval = eval_;
          node.bestMove = move;
        }
        
        alpha = Math.max(alpha, eval_);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      
      node.value = maxEval;
      return maxEval;
    } else {
      let minEval = Infinity;
      const moves = this.generateMoves(node.state);
      
      for (const move of moves) {
        const newState = this.makeMove(node.state, move);
        const child = new GameNode(newState, true, node.depth + 1);
        node.children.push(child);
        
        const eval_ = this.minimax(child, alpha, beta);
        
        if (eval_ < minEval) {
          minEval = eval_;
          node.bestMove = move;
        }
        
        beta = Math.min(beta, eval_);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      
      node.value = minEval;
      return minEval;
    }
  }

  getBestMove(state) {
    const root = new GameNode(state, true, 0);
    this.minimax(root);
    return root.bestMove;
  }

  // Abstract methods - to be implemented for specific games
  isTerminal(state) {
    // Override for specific game logic
    return false;
  }

  evaluate(state) {
    // Override with game-specific evaluation function
    return 0;
  }

  generateMoves(state) {
    // Override with game-specific move generation
    return [];
  }

  makeMove(state, move) {
    // Override with game-specific move execution
    return state;
  }
}

// =============================================
// 7. TRIE (Prefix Tree) - For Text Processing
// =============================================
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.count = 0; // For frequency counting
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;
    
    for (const char of word.toLowerCase()) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
      current.count++;
    }
    
    current.isEndOfWord = true;
  }

  search(word) {
    const node = this._findNode(word.toLowerCase());
    return node ? node.isEndOfWord : false;
  }

  startsWith(prefix) {
    return this._findNode(prefix.toLowerCase()) !== null;
  }

  _findNode(str) {
    let current = this.root;
    
    for (const char of str) {
      if (!current.children[char]) return null;
      current = current.children[char];
    }
    
    return current;
  }

  getAllWordsWithPrefix(prefix) {
    const node = this._findNode(prefix.toLowerCase());
    if (!node) return [];
    
    const words = [];
    this._dfs(node, prefix.toLowerCase(), words);
    return words;
  }

  _dfs(node, currentWord, words) {
    if (node.isEndOfWord) {
      words.push(currentWord);
    }
    
    for (const [char, childNode] of Object.entries(node.children)) {
      this._dfs(childNode, currentWord + char, words);
    }
  }

  autoComplete(prefix, maxSuggestions = 10) {
    const words = this.getAllWordsWithPrefix(prefix);
    return words.slice(0, maxSuggestions);
  }

  getMostFrequentWords(k = 10) {
    const wordFreq = [];
    this._collectWords(this.root, '', wordFreq);
    
    return wordFreq
      .sort((a, b) => b.count - a.count)
      .slice(0, k)
      .map(item => ({ word: item.word, frequency: item.count }));
  }

  _collectWords(node, currentWord, wordFreq) {
    if (node.isEndOfWord) {
      wordFreq.push({ word: currentWord, count: node.count });
    }
    
    for (const [char, childNode] of Object.entries(node.children)) {
      this._collectWords(childNode, currentWord + char, wordFreq);
    }
  }
}

// =============================================
// USAGE EXAMPLES
// =============================================

// Example 1: Binary Search Tree
console.log("=== Binary Search Tree ===");
const bst = new BinarySearchTree();
[50, 30, 70, 20, 40, 60, 80].forEach(val => bst.insert(val));
console.log("In-order traversal:", bst.inOrder());
console.log("Search 40:", bst.search(40) ? "Found" : "Not found");

// Example 2: File System
console.log("\n=== File System ===");
const fs = new FileSystem();
fs.createDirectory('/home/user/documents');
fs.createFile('/home/user/documents/file.txt', 1024);
console.log("Directory listing:", fs.listDirectory('/home/user'));
console.log("Total size:", fs.getTotalSize(), "bytes");

// Example 3: Expression Tree
console.log("\n=== Expression Tree ===");
const expr = new ExpressionTree();
expr.buildFromPostfix(['3', '4', '+', '2', '*']); // (3 + 4) * 2
console.log("Expression:", expr.toInfix());
console.log("Result:", expr.evaluate());

// Example 4: Decision Tree (Simple example)
console.log("\n=== Decision Tree ===");
const dt = new DecisionTree(3);
const X = [[1, 2], [2, 3], [3, 1], [4, 2]];
const y = [0, 0, 1, 1];
dt.fit(X, y);
console.log("Predictions:", dt.predict([[1.5, 2.5], [3.5, 1.5]]));

// Example 5: Trie
console.log("\n=== Trie (Prefix Tree) ===");
const trie = new Trie();
['apple', 'app', 'application', 'apply', 'banana'].forEach(word => trie.insert(word));
console.log("Search 'app':", trie.search('app'));
console.log("Words with prefix 'app':", trie.getAllWordsWithPrefix('app'));
console.log("Auto-complete 'ap':", trie.autoComplete('ap', 3));