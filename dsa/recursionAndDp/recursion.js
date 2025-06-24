// ============================================================================
// ADVANCED RECURSION ALGORITHMS IN JAVASCRIPT
// ============================================================================

// ============================================================================
// 1. BACKTRACKING ALGORITHMS
// ============================================================================

// N-Queens Problem
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function isValid(board, row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        // Check diagonal (top-left to bottom-right)
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        // Check diagonal (top-right to bottom-left)
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(row => row.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isValid(board, row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.'; // backtrack
            }
        }
    }
    
    backtrack(0);
    return result;
}

// Sudoku Solver
function solveSudoku(board) {
    function isValid(board, row, col, num) {
        // Check row
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === num) return false;
        }
        
        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) return false;
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (board[i][j] === num) return false;
            }
        }
        
        return true;
    }
    
    function solve() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    for (let num = '1'; num <= '9'; num++) {
                        if (isValid(board, i, j, num)) {
                            board[i][j] = num;
                            if (solve()) return true;
                            board[i][j] = '.'; // backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    solve();
    return board;
}

// Maze Solver
function solveMaze(maze) {
    const rows = maze.length;
    const cols = maze[0].length;
    const solution = Array(rows).fill().map(() => Array(cols).fill(0));
    
    function isSafe(x, y) {
        return x >= 0 && x < rows && y >= 0 && y < cols && maze[x][y] === 1;
    }
    
    function solveMazeUtil(x, y) {
        if (x === rows - 1 && y === cols - 1 && maze[x][y] === 1) {
            solution[x][y] = 1;
            return true;
        }
        
        if (isSafe(x, y)) {
            solution[x][y] = 1;
            
            // Move right
            if (solveMazeUtil(x, y + 1)) return true;
            
            // Move down
            if (solveMazeUtil(x + 1, y)) return true;
            
            // Backtrack
            solution[x][y] = 0;
        }
        
        return false;
    }
    
    if (solveMazeUtil(0, 0)) {
        return solution;
    }
    return null;
}

// ============================================================================
// 2. DIVIDE AND CONQUER
// ============================================================================

// Merge Sort
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Quick Sort
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Binary Search
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] > target) return binarySearch(arr, target, left, mid - 1);
    return binarySearch(arr, target, mid + 1, right);
}

// ============================================================================
// 3. DYNAMIC PROGRAMMING WITH RECURSION + MEMOIZATION
// ============================================================================

// Fibonacci with Memoization
function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

// 0/1 Knapsack Problem with Memoization
function knapsack(weights, values, capacity, n = weights.length, memo = {}) {
    const key = `${n}-${capacity}`;
    if (key in memo) return memo[key];
    
    if (n === 0 || capacity === 0) return 0;
    
    if (weights[n - 1] > capacity) {
        memo[key] = knapsack(weights, values, capacity, n - 1, memo);
    } else {
        const include = values[n - 1] + knapsack(weights, values, capacity - weights[n - 1], n - 1, memo);
        const exclude = knapsack(weights, values, capacity, n - 1, memo);
        memo[key] = Math.max(include, exclude);
    }
    
    return memo[key];
}

// Edit Distance (Levenshtein Distance)
function editDistance(str1, str2, m = str1.length, n = str2.length, memo = {}) {
    const key = `${m}-${n}`;
    if (key in memo) return memo[key];
    
    if (m === 0) return n;
    if (n === 0) return m;
    
    if (str1[m - 1] === str2[n - 1]) {
        memo[key] = editDistance(str1, str2, m - 1, n - 1, memo);
    } else {
        const insert = editDistance(str1, str2, m, n - 1, memo);
        const remove = editDistance(str1, str2, m - 1, n, memo);
        const replace = editDistance(str1, str2, m - 1, n - 1, memo);
        memo[key] = 1 + Math.min(insert, remove, replace);
    }
    
    return memo[key];
}

// ============================================================================
// 4. TREE RECURSION
// ============================================================================

// Binary Tree Node
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Count nodes in a binary tree
function countNodes(root) {
    if (!root) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}

// Generate all subsets of a set
function generateSubsets(nums) {
    const result = [];
    
    function backtrack(start, currentSubset) {
        result.push([...currentSubset]);
        
        for (let i = start; i < nums.length; i++) {
            currentSubset.push(nums[i]);
            backtrack(i + 1, currentSubset);
            currentSubset.pop(); // backtrack
        }
    }
    
    backtrack(0, []);
    return result;
}

// Tree traversals
function inorderTraversal(root, result = []) {
    if (root) {
        inorderTraversal(root.left, result);
        result.push(root.val);
        inorderTraversal(root.right, result);
    }
    return result;
}

function preorderTraversal(root, result = []) {
    if (root) {
        result.push(root.val);
        preorderTraversal(root.left, result);
        preorderTraversal(root.right, result);
    }
    return result;
}

function postorderTraversal(root, result = []) {
    if (root) {
        postorderTraversal(root.left, result);
        postorderTraversal(root.right, result);
        result.push(root.val);
    }
    return result;
}

// ============================================================================
// 5. GRAPH TRAVERSAL USING DFS
// ============================================================================

// Graph represented as adjacency list
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    
    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1); // For undirected graph
    }
    
    // DFS Traversal
    dfs(start, visited = new Set()) {
        const result = [];
        
        function dfsHelper(vertex) {
            if (!vertex) return;
            
            visited.add(vertex);
            result.push(vertex);
            
            for (let neighbor of this.adjacencyList[vertex]) {
                if (!visited.has(neighbor)) {
                    dfsHelper.call(this, neighbor);
                }
            }
        }
        
        dfsHelper.call(this, start);
        return result;
    }
    
    // Cycle Detection in Undirected Graph
    hasCycle() {
        const visited = new Set();
        
        function dfsUtil(vertex, parent) {
            visited.add(vertex);
            
            for (let neighbor of this.adjacencyList[vertex]) {
                if (!visited.has(neighbor)) {
                    if (dfsUtil.call(this, neighbor, vertex)) return true;
                } else if (neighbor !== parent) {
                    return true;
                }
            }
            return false;
        }
        
        for (let vertex in this.adjacencyList) {
            if (!visited.has(vertex)) {
                if (dfsUtil.call(this, vertex, -1)) return true;
            }
        }
        return false;
    }
    
    // Connected Components
    connectedComponents() {
        const visited = new Set();
        const components = [];
        
        function dfsComponent(vertex, component) {
            visited.add(vertex);
            component.push(vertex);
            
            for (let neighbor of this.adjacencyList[vertex]) {
                if (!visited.has(neighbor)) {
                    dfsComponent.call(this, neighbor, component);
                }
            }
        }
        
        for (let vertex in this.adjacencyList) {
            if (!visited.has(vertex)) {
                const component = [];
                dfsComponent.call(this, vertex, component);
                components.push(component);
            }
        }
        
        return components;
    }
}

// ============================================================================
// 6. GENERATING COMBINATIONS & PERMUTATIONS
// ============================================================================

// Generate all permutations
function generatePermutations(nums) {
    const result = [];
    
    function backtrack(currentPerm) {
        if (currentPerm.length === nums.length) {
            result.push([...currentPerm]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (currentPerm.includes(nums[i])) continue;
            
            currentPerm.push(nums[i]);
            backtrack(currentPerm);
            currentPerm.pop(); // backtrack
        }
    }
    
    backtrack([]);
    return result;
}

// Generate combinations of size k
function generateCombinations(nums, k) {
    const result = [];
    
    function backtrack(start, currentComb) {
        if (currentComb.length === k) {
            result.push([...currentComb]);
            return;
        }
        
        for (let i = start; i < nums.length; i++) {
            currentComb.push(nums[i]);
            backtrack(i + 1, currentComb);
            currentComb.pop(); // backtrack
        }
    }
    
    backtrack(0, []);
    return result;
}

// Generate all possible passwords with given characters and length
function generatePasswords(chars, length) {
    const result = [];
    
    function backtrack(currentPassword) {
        if (currentPassword.length === length) {
            result.push(currentPassword);
            return;
        }
        
        for (let char of chars) {
            backtrack(currentPassword + char);
        }
    }
    
    backtrack('');
    return result;
}

// ============================================================================
// 7. RECURSIVE DESCENT PARSING
// ============================================================================

// Simple arithmetic expression parser
class ExpressionParser {
    constructor(expression) {
        this.tokens = expression.replace(/\s/g, '').split('');
        this.index = 0;
    }
    
    peek() {
        return this.tokens[this.index];
    }
    
    consume() {
        return this.tokens[this.index++];
    }
    
    // Grammar: Expression -> Term (('+' | '-') Term)*
    parseExpression() {
        let result = this.parseTerm();
        
        while (this.peek() === '+' || this.peek() === '-') {
            const operator = this.consume();
            const right = this.parseTerm();
            result = operator === '+' ? result + right : result - right;
        }
        
        return result;
    }
    
    // Grammar: Term -> Factor (('*' | '/') Factor)*
    parseTerm() {
        let result = this.parseFactor();
        
        while (this.peek() === '*' || this.peek() === '/') {
            const operator = this.consume();
            const right = this.parseFactor();
            result = operator === '*' ? result * right : result / right;
        }
        
        return result;
    }
    
    // Grammar: Factor -> Number | '(' Expression ')'
    parseFactor() {
        if (this.peek() === '(') {
            this.consume(); // consume '('
            const result = this.parseExpression();
            this.consume(); // consume ')'
            return result;
        }
        
        let numStr = '';
        while (this.peek() && /\d/.test(this.peek())) {
            numStr += this.consume();
        }
        
        return parseInt(numStr);
    }
    
    parse() {
        return this.parseExpression();
    }
}

// ============================================================================
// 8. RECURSIVE FRACTALS (GEOMETRIC PATTERNS)
// ============================================================================

// Generate Sierpinski Triangle coordinates
function sierpinskiTriangle(x1, y1, x2, y2, x3, y3, depth) {
    const triangles = [];
    
    function drawTriangle(x1, y1, x2, y2, x3, y3, currentDepth) {
        if (currentDepth === 0) {
            triangles.push({x1, y1, x2, y2, x3, y3});
            return;
        }
        
        // Calculate midpoints
        const mid1x = (x1 + x2) / 2;
        const mid1y = (y1 + y2) / 2;
        const mid2x = (x2 + x3) / 2;
        const mid2y = (y2 + y3) / 2;
        const mid3x = (x3 + x1) / 2;
        const mid3y = (y3 + y1) / 2;
        
        // Recursively draw three smaller triangles
        drawTriangle(x1, y1, mid1x, mid1y, mid3x, mid3y, currentDepth - 1);
        drawTriangle(mid1x, mid1y, x2, y2, mid2x, mid2y, currentDepth - 1);
        drawTriangle(mid3x, mid3y, mid2x, mid2y, x3, y3, currentDepth - 1);
    }
    
    drawTriangle(x1, y1, x2, y2, x3, y3, depth);
    return triangles;
}

// Generate Koch Snowflake points
function kochSnowflake(x1, y1, x2, y2, depth) {
    const points = [{x: x1, y: y1}];
    
    function kochCurve(x1, y1, x2, y2, currentDepth, result) {
        if (currentDepth === 0) {
            result.push({x: x2, y: y2});
            return;
        }
        
        // Calculate the points that divide the line segment into thirds
        const dx = x2 - x1;
        const dy = y2 - y1;
        
        const x3 = x1 + dx / 3;
        const y3 = y1 + dy / 3;
        
        const x4 = x1 + 2 * dx / 3;
        const y4 = y1 + 2 * dy / 3;
        
        // Calculate the peak of the equilateral triangle
        const x5 = x3 + (x4 - x3) * Math.cos(-Math.PI / 3) - (y4 - y3) * Math.sin(-Math.PI / 3);
        const y5 = y3 + (x4 - x3) * Math.sin(-Math.PI / 3) + (y4 - y3) * Math.cos(-Math.PI / 3);
        
        // Recursively apply to the four segments
        kochCurve(x1, y1, x3, y3, currentDepth - 1, result);
        kochCurve(x3, y3, x5, y5, currentDepth - 1, result);
        kochCurve(x5, y5, x4, y4, currentDepth - 1, result);
        kochCurve(x4, y4, x2, y2, currentDepth - 1, result);
    }
    
    kochCurve(x1, y1, x2, y2, depth, points);
    return points;
}

// ============================================================================
// EXAMPLE USAGE AND TESTING
// ============================================================================

// Test N-Queens
console.log("N-Queens (4x4):");
console.log(solveNQueens(4));

// Test Merge Sort
console.log("\nMerge Sort:");
console.log(mergeSort([64, 34, 25, 12, 22, 11, 90]));

// Test Fibonacci with Memoization
console.log("\nFibonacci(10):");
console.log(fibonacci(10));

// Test Binary Tree operations
const root = new TreeNode(1, 
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, new TreeNode(6), new TreeNode(7))
);

console.log("\nTree Node Count:");
console.log(countNodes(root));

console.log("\nInorder Traversal:");
console.log(inorderTraversal(root));

// Test Subsets Generation
console.log("\nAll Subsets of [1,2,3]:");
console.log(generateSubsets([1, 2, 3]));

// Test Graph DFS
const graph = new Graph();
['A', 'B', 'C', 'D', 'E'].forEach(v => graph.addVertex(v));
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');

console.log("\nDFS Traversal:");
console.log(graph.dfs('A'));

// Test Permutations
console.log("\nPermutations of [1,2,3]:");
console.log(generatePermutations([1, 2, 3]));

// Test Expression Parser
console.log("\nExpression Parser (2+3*4):");
const parser = new ExpressionParser("2+3*4");
console.log(parser.parse()); // Should output 14

// Test Sierpinski Triangle
console.log("\nSierpinski Triangle (depth 2):");
console.log(sierpinskiTriangle(0, 0, 100, 0, 50, 87, 2));

// ============================================================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================================================

// Tower of Hanoi
function towerOfHanoi(n, source, destination, auxiliary) {
    const moves = [];
    
    function hanoi(n, src, dest, aux) {
        if (n === 1) {
            moves.push(`Move disk 1 from ${src} to ${dest}`);
            return;
        }
        
        hanoi(n - 1, src, aux, dest);
        moves.push(`Move disk ${n} from ${src} to ${dest}`);
        hanoi(n - 1, aux, dest, src);
    }
    
    hanoi(n, source, destination, auxiliary);
    return moves;
}

// Power function using recursion
function power(base, exponent) {
    if (exponent === 0) return 1;
    if (exponent === 1) return base;
    
    if (exponent % 2 === 0) {
        const half = power(base, exponent / 2);
        return half * half;
    } else {
        return base * power(base, exponent - 1);
    }
}

// GCD using Euclidean algorithm
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

console.log("\nTower of Hanoi (3 disks):");
console.log(towerOfHanoi(3, 'A', 'C', 'B'));

console.log("\nPower(2, 10):");
console.log(power(2, 10));

console.log("\nGCD(48, 18):");
console.log(gcd(48, 18));