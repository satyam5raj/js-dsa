// ============================================================================
// REAL-WORLD RECURSION USE CASES IN JAVASCRIPT
// ============================================================================

// 1. FILE SYSTEM NAVIGATION
// Simulates traversing a file system structure
function findFilesByExtension(directory, extension) {
    const results = [];
    
    function traverse(node, path = '') {
        const currentPath = path ? `${path}/${node.name}` : node.name;
        
        if (node.type === 'file') {
            if (node.name.endsWith(extension)) {
                results.push({
                    path: currentPath,
                    size: node.size
                });
            }
        } else if (node.type === 'directory' && node.children) {
            node.children.forEach(child => traverse(child, currentPath));
        }
    }
    
    traverse(directory);
    return results;
}

// Sample file system structure
const fileSystem = {
    name: 'root',
    type: 'directory',
    children: [
        {
            name: 'documents',
            type: 'directory',
            children: [
                { name: 'report.pdf', type: 'file', size: 1024 },
                { name: 'data.json', type: 'file', size: 512 },
                {
                    name: 'projects',
                    type: 'directory',
                    children: [
                        { name: 'app.js', type: 'file', size: 2048 },
                        { name: 'config.json', type: 'file', size: 256 }
                    ]
                }
            ]
        },
        { name: 'readme.txt', type: 'file', size: 128 }
    ]
};

console.log('=== FILE SYSTEM NAVIGATION ===');
console.log('Finding all .json files:');
console.log(findFilesByExtension(fileSystem, '.json'));

// ============================================================================

// 2. JSON/XML DEEP PARSING AND MANIPULATION
// Recursively processes nested JSON structures
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}

function findValuesByKey(obj, targetKey) {
    const results = [];
    
    function search(current, path = '') {
        if (typeof current !== 'object' || current === null) {
            return;
        }
        
        for (const key in current) {
            if (current.hasOwnProperty(key)) {
                const newPath = path ? `${path}.${key}` : key;
                
                if (key === targetKey) {
                    results.push({
                        path: newPath,
                        value: current[key]
                    });
                }
                
                if (typeof current[key] === 'object') {
                    search(current[key], newPath);
                }
            }
        }
    }
    
    search(obj);
    return results;
}

const complexData = {
    user: {
        id: 1,
        profile: {
            name: 'John Doe',
            settings: {
                theme: 'dark',
                notifications: {
                    email: true,
                    id: 'email-001'
                }
            }
        }
    },
    posts: [
        {
            id: 101,
            content: 'Hello World',
            comments: [
                { id: 201, text: 'Great post!' }
            ]
        }
    ]
};

console.log('\n=== JSON DEEP PARSING ===');
console.log('Finding all "id" keys:');
console.log(findValuesByKey(complexData, 'id'));

// ============================================================================

// 3. MINIMAX ALGORITHM FOR GAME AI (TIC-TAC-TOE)
// Implements decision-making AI using recursion
class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
    }
    
    checkWinner(board = this.board) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        
        for (const [a, b, c] of lines) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        
        return board.includes(null) ? null : 'tie';
    }
    
    minimax(board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) {
        const winner = this.checkWinner(board);
        
        if (winner === 'O') return 10 - depth;
        if (winner === 'X') return depth - 10;
        if (winner === 'tie') return 0;
        
        if (isMaximizing) {
            let maxEval = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = 'O';
                    const eval1 = this.minimax(board, depth + 1, false, alpha, beta);
                    board[i] = null;
                    maxEval = Math.max(maxEval, eval1);
                    alpha = Math.max(alpha, eval1);
                    if (beta <= alpha) break; // Alpha-beta pruning
                }
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = 'X';
                    const eval2 = this.minimax(board, depth + 1, true, alpha, beta);
                    board[i] = null;
                    minEval = Math.min(minEval, eval2);
                    beta = Math.min(beta, eval2);
                    if (beta <= alpha) break; // Alpha-beta pruning
                }
            }
            return minEval;
        }
    }
    
    getBestMove() {
        let bestScore = -Infinity;
        let bestMove = -1;
        
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                this.board[i] = 'O';
                const score = this.minimax(this.board, 0, false);
                this.board[i] = null;
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        
        return bestMove;
    }
}

console.log('\n=== MINIMAX GAME AI ===');
const game = new TicTacToe();
game.board = ['X', null, 'O', null, 'X', null, null, null, null];
console.log('Current board:', game.board);
console.log('Best move for O:', game.getBestMove());

// ============================================================================

// 4. COMPONENT TREE RENDERING (React-like)
// Simulates recursive rendering of UI component trees
function renderComponent(component, depth = 0) {
    const indent = '  '.repeat(depth);
    let result = `${indent}<${component.type}`;
    
    if (component.props) {
        for (const [key, value] of Object.entries(component.props)) {
            if (key !== 'children') {
                result += ` ${key}="${value}"`;
            }
        }
    }
    
    if (component.children && component.children.length > 0) {
        result += '>\n';
        component.children.forEach(child => {
            if (typeof child === 'string') {
                result += `${indent}  ${child}\n`;
            } else {
                result += renderComponent(child, depth + 1) + '\n';
            }
        });
        result += `${indent}</${component.type}>`;
    } else {
        result += ' />';
    }
    
    return result;
}

const componentTree = {
    type: 'div',
    props: { className: 'app' },
    children: [
        {
            type: 'header',
            props: { className: 'header' },
            children: [
                {
                    type: 'h1',
                    children: ['My App']
                },
                {
                    type: 'nav',
                    children: [
                        { type: 'a', props: { href: '/home' }, children: ['Home'] },
                        { type: 'a', props: { href: '/about' }, children: ['About'] }
                    ]
                }
            ]
        },
        {
            type: 'main',
            props: { className: 'content' },
            children: [
                { type: 'p', children: ['Welcome to my application!'] }
            ]
        }
    ]
};

console.log('\n=== COMPONENT TREE RENDERING ===');
console.log(renderComponent(componentTree));

// ============================================================================

// 5. NETWORK PATH FINDING
// Recursive algorithm to find paths in a network/graph
function findAllPaths(graph, start, end, visited = new Set(), path = []) {
    visited.add(start);
    path.push(start);
    
    if (start === end) {
        return [path.slice()]; // Return copy of current path
    }
    
    const paths = [];
    const neighbors = graph[start] || [];
    
    for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
            const subPaths = findAllPaths(graph, neighbor, end, visited, path);
            paths.push(...subPaths);
        }
    }
    
    // Backtrack
    visited.delete(start);
    path.pop();
    
    return paths;
}

function findShortestPath(graph, start, end) {
    const queue = [[start, [start]]];
    const visited = new Set([start]);
    
    while (queue.length > 0) {
        const [current, path] = queue.shift();
        
        if (current === end) {
            return path;
        }
        
        const neighbors = graph[current] || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, [...path, neighbor]]);
            }
        }
    }
    
    return null; // No path found
}

const networkGraph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};

console.log('\n=== NETWORK PATH FINDING ===');
console.log('All paths from A to F:');
console.log(findAllPaths(networkGraph, 'A', 'F'));
console.log('Shortest path from A to F:');
console.log(findShortestPath(networkGraph, 'A', 'F'));

// ============================================================================

// 6. MATHEMATICAL COMPUTATIONS
// Various mathematical problems solved recursively
function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

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

function hanoi(n, source, destination, auxiliary) {
    if (n === 1) {
        return [`Move disk 1 from ${source} to ${destination}`];
    }
    
    const moves = [];
    moves.push(...hanoi(n - 1, source, auxiliary, destination));
    moves.push(`Move disk ${n} from ${source} to ${destination}`);
    moves.push(...hanoi(n - 1, auxiliary, destination, source));
    
    return moves;
}

console.log('\n=== MATHEMATICAL COMPUTATIONS ===');
console.log('Fibonacci(10):', fibonacci(10));
console.log('GCD(48, 18):', gcd(48, 18));
console.log('2^10:', power(2, 10));
console.log('Tower of Hanoi (3 disks):');
console.log(hanoi(3, 'A', 'C', 'B'));

// ============================================================================

// 7. NATURAL LANGUAGE PROCESSING
// Simple recursive descent parser for mathematical expressions
class ExpressionParser {
    constructor(expression) {
        this.tokens = expression.replace(/\s+/g, '').split('');
        this.index = 0;
    }
    
    peek() {
        return this.tokens[this.index];
    }
    
    consume() {
        return this.tokens[this.index++];
    }
    
    parseExpression() {
        let result = this.parseTerm();
        
        while (this.peek() === '+' || this.peek() === '-') {
            const operator = this.consume();
            const right = this.parseTerm();
            result = operator === '+' ? result + right : result - right;
        }
        
        return result;
    }
    
    parseTerm() {
        let result = this.parseFactor();
        
        while (this.peek() === '*' || this.peek() === '/') {
            const operator = this.consume();
            const right = this.parseFactor();
            result = operator === '*' ? result * right : result / right;
        }
        
        return result;
    }
    
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
    
    evaluate() {
        return this.parseExpression();
    }
}

console.log('\n=== EXPRESSION PARSER ===');
const parser1 = new ExpressionParser('2+3*4');
console.log('2+3*4 =', parser1.evaluate());

const parser2 = new ExpressionParser('(2+3)*4');
console.log('(2+3)*4 =', parser2.evaluate());

// ============================================================================

// 8. PERMUTATIONS AND COMBINATIONS GENERATOR
// Generates all possible arrangements recursively
function generatePermutations(arr) {
    if (arr.length <= 1) return [arr];
    
    const permutations = [];
    
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
        const remainingPerms = generatePermutations(remaining);
        
        for (const perm of remainingPerms) {
            permutations.push([current, ...perm]);
        }
    }
    
    return permutations;
}

function generateCombinations(arr, k) {
    if (k === 0) return [[]];
    if (k > arr.length) return [];
    
    const combinations = [];
    
    for (let i = 0; i <= arr.length - k; i++) {
        const current = arr[i];
        const remaining = arr.slice(i + 1);
        const remainingCombs = generateCombinations(remaining, k - 1);
        
        for (const comb of remainingCombs) {
            combinations.push([current, ...comb]);
        }
    }
    
    return combinations;
}

console.log('\n=== PERMUTATIONS & COMBINATIONS ===');
console.log('Permutations of [1,2,3]:');
console.log(generatePermutations([1, 2, 3]));
console.log('Combinations of [1,2,3,4] choose 2:');
console.log(generateCombinations([1, 2, 3, 4], 2));

console.log('\n=== ALL EXAMPLES COMPLETED ===');