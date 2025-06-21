// ===================================================================
// COMPREHENSIVE GRAPH PROBLEMS SOLUTIONS IN JAVASCRIPT
// ===================================================================

// 1. Create a Graph and Print it
// Question: Create a graph data structure and implement methods to add vertices, edges, and print the graph
// Approach: Use adjacency list representation with Map/Object for efficient storage
// Time Complexity: O(1) for addVertex, O(1) for addEdge, O(V+E) for print
class Graph {
    constructor(isDirected = false) {
        this.adjacencyList = new Map();
        this.isDirected = isDirected;
    }
    
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }
    
    addEdge(vertex1, vertex2, weight = 1) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        
        this.adjacencyList.get(vertex1).push({node: vertex2, weight});
        if (!this.isDirected) {
            this.adjacencyList.get(vertex2).push({node: vertex1, weight});
        }
    }
    
    printGraph() {
        console.log("Graph Structure:");
        for (let [vertex, edges] of this.adjacencyList) {
            console.log(`${vertex} -> ${edges.map(e => `${e.node}(${e.weight})`).join(', ')}`);
        }
    }
    
    getVertices() {
        return Array.from(this.adjacencyList.keys());
    }
    
    getNeighbors(vertex) {
        return this.adjacencyList.get(vertex) || [];
    }
}

// Test Case for Graph Creation
console.log("=== Graph Creation Test ===");
const graph = new Graph();
graph.addEdge('A', 'B', 2);
graph.addEdge('A', 'C', 3);
graph.addEdge('B', 'D', 4);
graph.addEdge('C', 'D', 1);
graph.printGraph();

// ===================================================================

// 2. Implement BFS Algorithm
// Question: Implement Breadth-First Search traversal for a graph
// Approach: Use queue to visit nodes level by level, mark visited to avoid cycles
// Time Complexity: O(V + E), Space Complexity: O(V)
function bfs(graph, startVertex) {
    const visited = new Set();
    const queue = [startVertex];
    const result = [];
    
    visited.add(startVertex);
    
    while (queue.length > 0) {
        const currentVertex = queue.shift();
        result.push(currentVertex);
        
        const neighbors = graph.getNeighbors(currentVertex);
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor.node)) {
                visited.add(neighbor.node);
                queue.push(neighbor.node);
            }
        }
    }
    
    return result;
}

// Test Case for BFS
console.log("\n=== BFS Test ===");
const bfsResult = bfs(graph, 'A');
console.log("BFS Traversal:", bfsResult);

// ===================================================================

// 3. Implement DFS Algorithm
// Question: Implement Depth-First Search traversal for a graph
// Approach: Use recursion or stack to go deep into each path before backtracking
// Time Complexity: O(V + E), Space Complexity: O(V)
function dfsRecursive(graph, startVertex, visited = new Set(), result = []) {
    visited.add(startVertex);
    result.push(startVertex);
    
    const neighbors = graph.getNeighbors(startVertex);
    for (let neighbor of neighbors) {
        if (!visited.has(neighbor.node)) {
            dfsRecursive(graph, neighbor.node, visited, result);
        }
    }
    
    return result;
}

function dfsIterative(graph, startVertex) {
    const visited = new Set();
    const stack = [startVertex];
    const result = [];
    
    while (stack.length > 0) {
        const currentVertex = stack.pop();
        
        if (!visited.has(currentVertex)) {
            visited.add(currentVertex);
            result.push(currentVertex);
            
            const neighbors = graph.getNeighbors(currentVertex);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    stack.push(neighbor.node);
                }
            }
        }
    }
    
    return result;
}

// Test Case for DFS
console.log("\n=== DFS Test ===");
const dfsRecResult = dfsRecursive(graph, 'A');
const dfsIterResult = dfsIterative(graph, 'A');
console.log("DFS Recursive:", dfsRecResult);
console.log("DFS Iterative:", dfsIterResult);

// ===================================================================

// 4. Detect Cycle in Directed Graph using DFS
// Question: Check if a directed graph contains a cycle
// Approach: Use DFS with three states - white(unvisited), gray(processing), black(processed)
// Time Complexity: O(V + E), Space Complexity: O(V)
function hasCycleDirected(graph) {
    const color = new Map(); // white: 0, gray: 1, black: 2
    
    // Initialize all vertices as white
    for (let vertex of graph.getVertices()) {
        color.set(vertex, 0);
    }
    
    function dfsVisit(vertex) {
        color.set(vertex, 1); // Mark as gray (processing)
        
        const neighbors = graph.getNeighbors(vertex);
        for (let neighbor of neighbors) {
            if (color.get(neighbor.node) === 1) { // Back edge found
                return true;
            }
            if (color.get(neighbor.node) === 0 && dfsVisit(neighbor.node)) {
                return true;
            }
        }
        
        color.set(vertex, 2); // Mark as black (processed)
        return false;
    }
    
    for (let vertex of graph.getVertices()) {
        if (color.get(vertex) === 0) {
            if (dfsVisit(vertex)) {
                return true;
            }
        }
    }
    
    return false;
}

// Test Case for Directed Graph Cycle Detection
console.log("\n=== Directed Graph Cycle Detection Test ===");
const directedGraph = new Graph(true);
directedGraph.addEdge('A', 'B');
directedGraph.addEdge('B', 'C');
directedGraph.addEdge('C', 'A'); // Creates a cycle
console.log("Has cycle in directed graph:", hasCycleDirected(directedGraph));

// ===================================================================

// 5. Detect Cycle in Undirected Graph using DFS
// Question: Check if an undirected graph contains a cycle
// Approach: Use DFS and track parent to distinguish between back edge and parent edge
// Time Complexity: O(V + E), Space Complexity: O(V)
function hasCycleUndirected(graph) {
    const visited = new Set();
    
    function dfsVisit(vertex, parent) {
        visited.add(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor.node)) {
                if (dfsVisit(neighbor.node, vertex)) {
                    return true;
                }
            } else if (neighbor.node !== parent) {
                return true; // Back edge found
            }
        }
        
        return false;
    }
    
    for (let vertex of graph.getVertices()) {
        if (!visited.has(vertex)) {
            if (dfsVisit(vertex, null)) {
                return true;
            }
        }
    }
    
    return false;
}

// Test Case for Undirected Graph Cycle Detection
console.log("\n=== Undirected Graph Cycle Detection Test ===");
console.log("Has cycle in undirected graph:", hasCycleUndirected(graph));

// ===================================================================

// 6. Search in a Maze
// Question: Find if there's a path from start to end in a maze
// Approach: Use BFS/DFS to explore all possible paths, treating 0 as walkable and 1 as wall
// Time Complexity: O(rows * cols), Space Complexity: O(rows * cols)
function searchMaze(maze, start, end) {
    const rows = maze.length;
    const cols = maze[0].length;
    const visited = Array.from({length: rows}, () => Array(cols).fill(false));
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
    
    function isValid(row, col) {
        return row >= 0 && row < rows && col >= 0 && col < cols && 
               maze[row][col] === 0 && !visited[row][col];
    }
    
    const queue = [start];
    visited[start[0]][start[1]] = true;
    
    while (queue.length > 0) {
        const [currentRow, currentCol] = queue.shift();
        
        if (currentRow === end[0] && currentCol === end[1]) {
            return true;
        }
        
        for (let [dRow, dCol] of directions) {
            const newRow = currentRow + dRow;
            const newCol = currentCol + dCol;
            
            if (isValid(newRow, newCol)) {
                visited[newRow][newCol] = true;
                queue.push([newRow, newCol]);
            }
        }
    }
    
    return false;
}

// Test Case for Maze Search
console.log("\n=== Maze Search Test ===");
const maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
];
console.log("Path exists in maze:", searchMaze(maze, [0, 0], [4, 4]));

// ===================================================================

// 7. Minimum Steps by Knight
// Question: Find minimum steps for a knight to reach target position on chessboard
// Approach: Use BFS as it gives shortest path, knight has 8 possible moves
// Time Complexity: O(n²), Space Complexity: O(n²)
function minStepsByKnight(n, start, target) {
    if (start[0] === target[0] && start[1] === target[1]) return 0;
    
    const visited = Array.from({length: n}, () => Array(n).fill(false));
    const knightMoves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    
    function isValid(row, col) {
        return row >= 0 && row < n && col >= 0 && col < n && !visited[row][col];
    }
    
    const queue = [[start[0], start[1], 0]]; // [row, col, steps]
    visited[start[0]][start[1]] = true;
    
    while (queue.length > 0) {
        const [currentRow, currentCol, steps] = queue.shift();
        
        for (let [dRow, dCol] of knightMoves) {
            const newRow = currentRow + dRow;
            const newCol = currentCol + dCol;
            
            if (newRow === target[0] && newCol === target[1]) {
                return steps + 1;
            }
            
            if (isValid(newRow, newCol)) {
                visited[newRow][newCol] = true;
                queue.push([newRow, newCol, steps + 1]);
            }
        }
    }
    
    return -1; // Target unreachable
}

// Test Case for Knight's Minimum Steps
console.log("\n=== Knight's Minimum Steps Test ===");
console.log("Min steps by knight:", minStepsByKnight(8, [0, 0], [7, 7]));

// ===================================================================

// 8. Flood Fill Algorithm
// Question: Change color of connected pixels (like paint bucket tool)
// Approach: Use DFS/BFS to visit all connected pixels with same color and change them
// Time Complexity: O(rows * cols), Space Complexity: O(rows * cols)
function floodFill(image, sr, sc, newColor) {
    const originalColor = image[sr][sc];
    if (originalColor === newColor) return image;
    
    const rows = image.length;
    const cols = image[0].length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    function dfs(row, col) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || 
            image[row][col] !== originalColor) {
            return;
        }
        
        image[row][col] = newColor;
        
        for (let [dRow, dCol] of directions) {
            dfs(row + dRow, col + dCol);
        }
    }
    
    dfs(sr, sc);
    return image;
}

// Test Case for Flood Fill
console.log("\n=== Flood Fill Test ===");
const image = [[1,1,1],[1,1,0],[1,0,1]];
console.log("Original image:", image);
const filledImage = floodFill(JSON.parse(JSON.stringify(image)), 1, 1, 2);
console.log("After flood fill:", filledImage);

// ===================================================================

// 9. Clone a Graph
// Question: Create a deep copy of a graph
// Approach: Use DFS/BFS with HashMap to map original nodes to cloned nodes
// Time Complexity: O(V + E), Space Complexity: O(V)
class GraphNode {
    constructor(val, neighbors = []) {
        this.val = val;
        this.neighbors = neighbors;
    }
}

function cloneGraph(node) {
    if (!node) return null;
    
    const cloneMap = new Map();
    
    function dfsClone(originalNode) {
        if (cloneMap.has(originalNode)) {
            return cloneMap.get(originalNode);
        }
        
        const clonedNode = new GraphNode(originalNode.val);
        cloneMap.set(originalNode, clonedNode);
        
        for (let neighbor of originalNode.neighbors) {
            clonedNode.neighbors.push(dfsClone(neighbor));
        }
        
        return clonedNode;
    }
    
    return dfsClone(node);
}

// Test Case for Graph Cloning
console.log("\n=== Graph Clone Test ===");
const node1 = new GraphNode(1);
const node2 = new GraphNode(2);
const node3 = new GraphNode(3);
node1.neighbors = [node2, node3];
node2.neighbors = [node1, node3];
node3.neighbors = [node1, node2];

const clonedGraph = cloneGraph(node1);
console.log("Original node value:", node1.val);
console.log("Cloned node value:", clonedGraph.val);
console.log("Are they the same object?", node1 === clonedGraph);

// ===================================================================

// 10. Making Wired Connections
// Question: Find minimum connections to remove to make network connected
// Approach: Use Union-Find to count components and extra edges
// Time Complexity: O(n), Space Complexity: O(n)
function makeConnected(n, connections) {
    if (connections.length < n - 1) return -1; // Not enough edges
    
    const parent = Array.from({length: n}, (_, i) => i);
    let components = n;
    let extraEdges = 0;
    
    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    function union(x, y) {
        const rootX = find(x);
        const rootY = find(y);
        
        if (rootX === rootY) {
            extraEdges++;
        } else {
            parent[rootX] = rootY;
            components--;
        }
    }
    
    for (let [a, b] of connections) {
        union(a, b);
    }
    
    return components - 1;
}

// Test Case for Making Wired Connections
console.log("\n=== Making Wired Connections Test ===");
console.log("Connections needed:", makeConnected(4, [[0,1],[0,2],[1,2]]));

// ===================================================================

// 11. Word Ladder
// Question: Find shortest transformation sequence from beginWord to endWord
// Approach: Use BFS to find shortest path, each step changes one character
// Time Complexity: O(M²×N), Space Complexity: O(M²×N) where M=word length, N=wordList size
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue = [[beginWord, 1]];
    const visited = new Set([beginWord]);
    
    while (queue.length > 0) {
        const [currentWord, level] = queue.shift();
        
        if (currentWord === endWord) return level;
        
        for (let i = 0; i < currentWord.length; i++) {
            for (let c = 97; c <= 122; c++) { // 'a' to 'z'
                const char = String.fromCharCode(c);
                const newWord = currentWord.slice(0, i) + char + currentWord.slice(i + 1);
                
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, level + 1]);
                }
            }
        }
    }
    
    return 0;
}

// Test Case for Word Ladder
console.log("\n=== Word Ladder Test ===");
console.log("Ladder length:", ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"]));

// ===================================================================

// 12. Dijkstra's Algorithm
// Question: Find shortest path from source to all vertices in weighted graph
// Approach: Use priority queue (min-heap) to always process nearest unvisited vertex
// Time Complexity: O((V + E) log V), Space Complexity: O(V)
function dijkstra(graph, startVertex) {
    const distances = new Map();
    const previous = new Map();
    const unvisited = [];
    
    // Initialize distances
    for (let vertex of graph.getVertices()) {
        distances.set(vertex, vertex === startVertex ? 0 : Infinity);
        previous.set(vertex, null);
        unvisited.push(vertex);
    }
    
    while (unvisited.length > 0) {
        // Find vertex with minimum distance
        unvisited.sort((a, b) => distances.get(a) - distances.get(b));
        const currentVertex = unvisited.shift();
        
        if (distances.get(currentVertex) === Infinity) break;
        
        const neighbors = graph.getNeighbors(currentVertex);
        for (let neighbor of neighbors) {
            if (unvisited.includes(neighbor.node)) {
                const newDistance = distances.get(currentVertex) + neighbor.weight;
                if (newDistance < distances.get(neighbor.node)) {
                    distances.set(neighbor.node, newDistance);
                    previous.set(neighbor.node, currentVertex);
                }
            }
        }
    }
    
    return {distances, previous};
}

// Test Case for Dijkstra's Algorithm
console.log("\n=== Dijkstra's Algorithm Test ===");
const weightedGraph = new Graph(true);
weightedGraph.addEdge('A', 'B', 4);
weightedGraph.addEdge('A', 'C', 2);
weightedGraph.addEdge('B', 'D', 3);
weightedGraph.addEdge('C', 'D', 1);
weightedGraph.addEdge('C', 'B', 1);

const dijkstraResult = dijkstra(weightedGraph, 'A');
console.log("Shortest distances from A:", Object.fromEntries(dijkstraResult.distances));

// ===================================================================

// 13. Topological Sort
// Question: Linear ordering of vertices in DAG such that for every edge u->v, u comes before v
// Approach: Use DFS and stack, or Kahn's algorithm with in-degree
// Time Complexity: O(V + E), Space Complexity: O(V)
function topologicalSort(graph) {
    const visited = new Set();
    const stack = [];
    
    function dfsVisit(vertex) {
        visited.add(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor.node)) {
                dfsVisit(neighbor.node);
            }
        }
        
        stack.push(vertex);
    }
    
    for (let vertex of graph.getVertices()) {
        if (!visited.has(vertex)) {
            dfsVisit(vertex);
        }
    }
    
    return stack.reverse();
}

// Kahn's Algorithm for Topological Sort
function topologicalSortKahn(graph) {
    const inDegree = new Map();
    const queue = [];
    const result = [];
    
    // Initialize in-degrees
    for (let vertex of graph.getVertices()) {
        inDegree.set(vertex, 0);
    }
    
    // Calculate in-degrees
    for (let vertex of graph.getVertices()) {
        const neighbors = graph.getNeighbors(vertex);
        for (let neighbor of neighbors) {
            inDegree.set(neighbor.node, inDegree.get(neighbor.node) + 1);
        }
    }
    
    // Find vertices with 0 in-degree
    for (let [vertex, degree] of inDegree) {
        if (degree === 0) {
            queue.push(vertex);
        }
    }
    
    while (queue.length > 0) {
        const currentVertex = queue.shift();
        result.push(currentVertex);
        
        const neighbors = graph.getNeighbors(currentVertex);
        for (let neighbor of neighbors) {
            inDegree.set(neighbor.node, inDegree.get(neighbor.node) - 1);
            if (inDegree.get(neighbor.node) === 0) {
                queue.push(neighbor.node);
            }
        }
    }
    
    return result.length === graph.getVertices().length ? result : []; // Check for cycle
}

// Test Case for Topological Sort
console.log("\n=== Topological Sort Test ===");
const dagGraph = new Graph(true);
dagGraph.addEdge('A', 'C');
dagGraph.addEdge('B', 'C');
dagGraph.addEdge('B', 'D');
dagGraph.addEdge('C', 'E');
dagGraph.addEdge('D', 'F');
dagGraph.addEdge('E', 'F');

console.log("Topological Sort (DFS):", topologicalSort(dagGraph));
console.log("Topological Sort (Kahn):", topologicalSortKahn(dagGraph));

// ===================================================================

// 14. Minimum Time for Job Completion (Critical Path Method)
// Question: Find minimum time to complete all jobs with dependencies
// Approach: Use topological sort and find longest path (critical path)
// Time Complexity: O(V + E), Space Complexity: O(V)
function minTimeJobCompletion(jobs, dependencies) {
    const graph = new Map();
    const inDegree = new Map();
    const jobTime = new Map();
    
    // Initialize
    for (let job of jobs) {
        graph.set(job.id, []);
        inDegree.set(job.id, 0);
        jobTime.set(job.id, job.time);
    }
    
    // Build graph
    for (let [from, to] of dependencies) {
        graph.get(from).push(to);
        inDegree.set(to, inDegree.get(to) + 1);
    }
    
    const queue = [];
    const completionTime = new Map();
    
    // Find jobs with no dependencies
    for (let [job, degree] of inDegree) {
        if (degree === 0) {
            queue.push(job);
            completionTime.set(job, jobTime.get(job));
        }
    }
    
    while (queue.length > 0) {
        const currentJob = queue.shift();
        
        for (let dependent of graph.get(currentJob)) {
            const newCompletionTime = completionTime.get(currentJob) + jobTime.get(dependent);
            completionTime.set(dependent, Math.max(
                completionTime.get(dependent) || 0, 
                newCompletionTime
            ));
            
            inDegree.set(dependent, inDegree.get(dependent) - 1);
            if (inDegree.get(dependent) === 0) {
                queue.push(dependent);
            }
        }
    }
    
    return Math.max(...completionTime.values());
}

// Test Case for Job Completion Time
console.log("\n=== Job Completion Time Test ===");
const jobs = [
    {id: 'A', time: 3},
    {id: 'B', time: 2},
    {id: 'C', time: 4},
    {id: 'D', time: 1}
];
const jobDependencies = [['A', 'C'], ['B', 'C'], ['C', 'D']];
console.log("Minimum completion time:", minTimeJobCompletion(jobs, jobDependencies));

// ===================================================================

// 15. Course Schedule (Task Dependencies)
// Question: Determine if all courses can be finished given prerequisites
// Approach: Use topological sort, if we can't sort all courses, there's a cycle
// Time Complexity: O(V + E), Space Complexity: O(V)
function canFinish(numCourses, prerequisites) {
    const graph = Array.from({length: numCourses}, () => []);
    const inDegree = Array(numCourses).fill(0);
    
    // Build graph
    for (let [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }
    
    const queue = [];
    let completedCourses = 0;
    
    // Find courses with no prerequisites
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    while (queue.length > 0) {
        const currentCourse = queue.shift();
        completedCourses++;
        
        for (let dependent of graph[currentCourse]) {
            inDegree[dependent]--;
            if (inDegree[dependent] === 0) {
                queue.push(dependent);
            }
        }
    }
    
    return completedCourses === numCourses;
}

// Test Case for Course Schedule
console.log("\n=== Course Schedule Test ===");
console.log("Can finish courses:", canFinish(2, [[1,0]]));
console.log("Can finish courses with cycle:", canFinish(2, [[1,0],[0,1]]));

// ===================================================================

// 16. Number of Islands
// Question: Count number of islands (connected 1s) in 2D grid
// Approach: Use DFS/BFS to mark all connected 1s as visited
// Time Complexity: O(rows × cols), Space Complexity: O(rows × cols)
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;
    
    function dfs(row, col) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
            return;
        }
        
        grid[row][col] = '0'; // Mark as visited
        
        // Visit all 4 directions
        dfs(row + 1, col);
        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row, col - 1);
    }
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1') {
                islands++;
                dfs(row, col);
            }
        }
    }
    
    return islands;
}

// Test Case for Number of Islands
console.log("\n=== Number of Islands Test ===");
const islandGrid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
];
console.log("Number of islands:", numIslands(JSON.parse(JSON.stringify(islandGrid))));

// ===================================================================

// 17. Alien Dictionary
// Question: Find order of characters in alien language from sorted dictionary
// Approach: Build graph from character ordering, then topological sort
// Time Complexity: O(C + N×M), Space Complexity: O(C) where C=unique chars, N=words, M=avg length
function alienOrder(words) {
    const graph = new Map();
    const inDegree = new Map();
    
    // Initialize all characters
    for (let word of words) {
        for (let char of word) {
            graph.set(char, []);
            inDegree.set(char, 0);
        }
    }
    
    // Build graph from adjacent words
    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];
        
        // Check if word1 is prefix of word2 but longer (invalid case)
        if (word1.length > word2.length && word1.startsWith(word2)) {
            return "";
        }
        
        // Find first different character
        for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
            if (word1[j] !== word2[j]) {
                if (!graph.get(word1[j]).includes(word2[j])) {
                    graph.get(word1[j]).push(word2[j]);
                    inDegree.set(word2[j], inDegree.get(word2[j]) + 1);
                }
                break;
            }
        }
    }
    
    // Topological sort using Kahn's algorithm
    const queue = [];
    const result = [];
    
    for (let [char, degree] of inDegree) {
        if (degree === 0) {
            queue.push(char);
        }
    }
    
    while (queue.length > 0) {
        const currentChar = queue.shift();
        result.push(currentChar);
        
        for (let neighbor of graph.get(currentChar)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return result.length === graph.size ? result.join('') : '';
}

// Test Case for Alien Dictionary
console.log("\n=== Alien Dictionary Test ===");
console.log("Alien order:", alienOrder(["wrt","wrf","er","ett","rftt"]));

// ===================================================================

// 18. Kruskal's Algorithm (Minimum Spanning Tree)
// Question: Find minimum spanning tree using Kruskal's algorithm
// Approach: Sort edges by weight, use Union-Find to detect cycles
// Time Complexity: O(E log E), Space Complexity: O(V)
class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = Array(n).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) return false;
        
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        
        return true;
    }
}

function kruskalMST(vertices, edges) {
    const vertexMap = new Map();
    vertices.forEach((vertex, index) => vertexMap.set(vertex, index));
    
    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);
    
    const uf = new UnionFind(vertices.length);
    const mst = [];
    let totalWeight = 0;
    
    for (let edge of edges) {
        const u = vertexMap.get(edge.from);
        const v = vertexMap.get(edge.to);
        
        if (uf.union(u, v)) {
            mst.push(edge);
            totalWeight += edge.weight;
        }
    }
    
    return {mst, totalWeight};
}

// Test Case for Kruskal's Algorithm
console.log("\n=== Kruskal's Algorithm Test ===");
const kruskalVertices = ['A', 'B', 'C', 'D'];
const kruskalEdges = [
    {from: 'A', to: 'B', weight: 2},
    {from: 'A', to: 'C', weight: 3},
    {from: 'B', to: 'C', weight: 1},
    {from: 'B', to: 'D', weight: 4},
    {from: 'C', to: 'D', weight: 5}
];
const kruskalResult = kruskalMST(kruskalVertices, kruskalEdges);
console.log("MST edges:", kruskalResult.mst);
console.log("Total weight:", kruskalResult.totalWeight);

// ===================================================================

// 19. Prim's Algorithm (Minimum Spanning Tree)
// Question: Find minimum spanning tree using Prim's algorithm
// Approach: Start from any vertex, always add minimum weight edge to MST
// Time Complexity: O((V + E) log V), Space Complexity: O(V)
function primMST(graph, startVertex) {
    const visited = new Set();
    const mst = [];
    let totalWeight = 0;
    
    // Priority queue: [weight, from, to]
    const pq = [];
    
    function addEdges(vertex) {
        visited.add(vertex);
        const neighbors = graph.getNeighbors(vertex);
        
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor.node)) {
                pq.push([neighbor.weight, vertex, neighbor.node]);
            }
        }
        
        pq.sort((a, b) => a[0] - b[0]); // Sort by weight
    }
    
    addEdges(startVertex);
    
    while (pq.length > 0 && visited.size < graph.getVertices().length) {
        const [weight, from, to] = pq.shift();
        
        if (!visited.has(to)) {
            mst.push({from, to, weight});
            totalWeight += weight;
            addEdges(to);
        }
    }
    
    return {mst, totalWeight};
}

// Test Case for Prim's Algorithm
console.log("\n=== Prim's Algorithm Test ===");
const primGraph = new Graph();
primGraph.addEdge('A', 'B', 2);
primGraph.addEdge('A', 'C', 3);
primGraph.addEdge('B', 'C', 1);
primGraph.addEdge('B', 'D', 4);
primGraph.addEdge('C', 'D', 5);

const primResult = primMST(primGraph, 'A');
console.log("MST edges:", primResult.mst);
console.log("Total weight:", primResult.totalWeight);

// ===================================================================

// 20. Bellman-Ford Algorithm
// Question: Find shortest paths from source, can handle negative weights
// Approach: Relax all edges V-1 times, check for negative cycles
// Time Complexity: O(VE), Space Complexity: O(V)
function bellmanFord(vertices, edges, source) {
    const distance = new Map();
    const predecessor = new Map();
    
    // Initialize distances
    for (let vertex of vertices) {
        distance.set(vertex, vertex === source ? 0 : Infinity);
        predecessor.set(vertex, null);
    }
    
    // Relax edges V-1 times
    for (let i = 0; i < vertices.length - 1; i++) {
        for (let edge of edges) {
            const u = edge.from;
            const v = edge.to;
            const weight = edge.weight;
            
            if (distance.get(u) !== Infinity && distance.get(u) + weight < distance.get(v)) {
                distance.set(v, distance.get(u) + weight);
                predecessor.set(v, u);
            }
        }
    }
    
    // Check for negative cycles
    for (let edge of edges) {
        const u = edge.from;
        const v = edge.to;
        const weight = edge.weight;
        
        if (distance.get(u) !== Infinity && distance.get(u) + weight < distance.get(v)) {
            return {hasNegativeCycle: true};
        }
    }
    
    return {hasNegativeCycle: false, distance, predecessor};
}

// Test Case for Bellman-Ford Algorithm
console.log("\n=== Bellman-Ford Algorithm Test ===");
const bfVertices = ['A', 'B', 'C', 'D'];
const bfEdges = [
    {from: 'A', to: 'B', weight: 1},
    {from: 'A', to: 'C', weight: 4},
    {from: 'B', to: 'C', weight: -3},
    {from: 'B', to: 'D', weight: 2},
    {from: 'C', to: 'D', weight: 3}
];
const bfResult = bellmanFord(bfVertices, bfEdges, 'A');
console.log("Has negative cycle:", bfResult.hasNegativeCycle);
if (!bfResult.hasNegativeCycle) {
    console.log("Shortest distances:", Object.fromEntries(bfResult.distance));
}

// ===================================================================

// 21. Floyd-Warshall Algorithm
// Question: Find shortest paths between all pairs of vertices
// Approach: Dynamic programming, try all intermediate vertices
// Time Complexity: O(V³), Space Complexity: O(V²)
function floydWarshall(vertices, edges) {
    const n = vertices.length;
    const vertexMap = new Map();
    vertices.forEach((vertex, index) => vertexMap.set(vertex, index));
    
    // Initialize distance matrix
    const dist = Array.from({length: n}, () => Array(n).fill(Infinity));
    
    // Distance from vertex to itself is 0
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0;
    }
    
    // Fill initial distances from edges
    for (let edge of edges) {
        const u = vertexMap.get(edge.from);
        const v = vertexMap.get(edge.to);
        dist[u][v] = edge.weight;
    }
    
    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    return dist;
}

// Test Case for Floyd-Warshall Algorithm
console.log("\n=== Floyd-Warshall Algorithm Test ===");
const fwVertices = ['A', 'B', 'C', 'D'];
const fwEdges = [
    {from: 'A', to: 'B', weight: 5},
    {from: 'A', to: 'D', weight: 10},
    {from: 'B', to: 'C', weight: 3},
    {from: 'C', to: 'D', weight: 1}
];
const fwResult = floydWarshall(fwVertices, fwEdges);
console.log("All pairs shortest paths:");
for (let i = 0; i < fwVertices.length; i++) {
    console.log(`From ${fwVertices[i]}:`, fwResult[i].map((d, j) => `${fwVertices[j]}:${d === Infinity ? '∞' : d}`));
}

// ===================================================================

// 22. Travelling Salesman Problem (TSP)
// Question: Find shortest route visiting all cities exactly once
// Approach: Use dynamic programming with bitmask for small instances
// Time Complexity: O(n²2ⁿ), Space Complexity: O(n2ⁿ)
function tsp(cities, distances) {
    const n = cities.length;
    const dp = Array.from({length: 1 << n}, () => Array(n).fill(Infinity));
    
    // Base case: start from city 0
    dp[1][0] = 0;
    
    for (let mask = 0; mask < (1 << n); mask++) {
        for (let u = 0; u < n; u++) {
            if (!(mask & (1 << u))) continue;
            
            for (let v = 0; v < n; v++) {
                if (mask & (1 << v)) continue;
                
                const newMask = mask | (1 << v);
                dp[newMask][v] = Math.min(dp[newMask][v], dp[mask][u] + distances[u][v]);
            }
        }
    }
    
    // Find minimum cost to return to start
    let minCost = Infinity;
    for (let i = 1; i < n; i++) {
        minCost = Math.min(minCost, dp[(1 << n) - 1][i] + distances[i][0]);
    }
    
    return minCost;
}

// Test Case for TSP
console.log("\n=== Travelling Salesman Problem Test ===");
const tspCities = ['A', 'B', 'C', 'D'];
const tspDistances = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
];
console.log("Minimum TSP cost:", tsp(tspCities, tspDistances));

// ===================================================================

// 23. Graph Coloring Problem
// Question: Color graph vertices such that no adjacent vertices have same color
// Approach: Use backtracking to try different color assignments
// Time Complexity: O(m^n) where m=colors, n=vertices, Space Complexity: O(n)
function graphColoring(graph, numColors) {
    const vertices = graph.getVertices();
    const colors = Array(vertices.length).fill(-1);
    const vertexMap = new Map();
    vertices.forEach((vertex, index) => vertexMap.set(vertex, index));
    
    function isSafe(vertex, color) {
        const neighbors = graph.getNeighbors(vertex);
        for (let neighbor of neighbors) {
            const neighborIndex = vertexMap.get(neighbor.node);
            if (colors[neighborIndex] === color) {
                return false;
            }
        }
        return true;
    }
    
    function solve(vertexIndex) {
        if (vertexIndex === vertices.length) {
            return true;
        }
        
        const vertex = vertices[vertexIndex];
        for (let color = 0; color < numColors; color++) {
            if (isSafe(vertex, color)) {
                colors[vertexIndex] = color;
                
                if (solve(vertexIndex + 1)) {
                    return true;
                }
                
                colors[vertexIndex] = -1; // Backtrack
            }
        }
        
        return false;
    }
    
    if (solve(0)) {
        const result = new Map();
        vertices.forEach((vertex, index) => result.set(vertex, colors[index]));
        return result;
    }
    
    return null;
}

// Test Case for Graph Coloring
console.log("\n=== Graph Coloring Test ===");
const colorGraph = new Graph();
colorGraph.addEdge('A', 'B');
colorGraph.addEdge('A', 'C');
colorGraph.addEdge('B', 'C');
colorGraph.addEdge('B', 'D');

const coloringResult = graphColoring(colorGraph, 3);
console.log("Graph coloring:", coloringResult ? Object.fromEntries(coloringResult) : "No solution");

// ===================================================================

// 24. Snake and Ladders Problem
// Question: Find minimum moves to reach end of board with snakes and ladders
// Approach: Use BFS treating each cell as graph node
// Time Complexity: O(n), Space Complexity: O(n)
function snakesAndLadders(board) {
    const n = board.length;
    const target = n * n;
    
    function getPosition(num) {
        const row = Math.floor((num - 1) / n);
        const col = (num - 1) % n;
        
        // Reverse column for odd rows (boustrophedon style)
        if (row % 2 === 1) {
            return [n - 1 - row, n - 1 - col];
        }
        return [n - 1 - row, col];
    }
    
    const visited = new Set([1]);
    const queue = [[1, 0]]; // [position, moves]
    
    while (queue.length > 0) {
        const [pos, moves] = queue.shift();
        
        if (pos === target) return moves;
        
        // Try all dice rolls (1 to 6)
        for (let i = 1; i <= 6; i++) {
            let next = pos + i;
            if (next > target) break;
            
            const [row, col] = getPosition(next);
            
            // Check for snake or ladder
            if (board[row][col] !== -1) {
                next = board[row][col];
            }
            
            if (!visited.has(next)) {
                visited.add(next);
                queue.push([next, moves + 1]);
            }
        }
    }
    
    return -1;
}

// Test Case for Snake and Ladders
console.log("\n=== Snake and Ladders Test ===");
const snakeBoard = [
    [-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1],
    [-1,35,-1,-1,13,-1],
    [-1,-1,-1,-1,-1,-1],
    [-1,15,-1,-1,-1,-1]
];
console.log("Minimum moves:", snakesAndLadders(snakeBoard));

// ===================================================================

// 25. Find Bridges in Graph
// Question: Find all bridges (edges whose removal increases connected components)
// Approach: Use Tarjan's algorithm with DFS and low-link values
// Time Complexity: O(V + E), Space Complexity: O(V)
function findBridges(graph) {
    const vertices = graph.getVertices();
    const visited = new Set();
    const disc = new Map(); // Discovery time
    const low = new Map();  // Low-link value
    const parent = new Map();
    const bridges = [];
    let time = 0;
    
    function bridgeUtil(u) {
        visited.add(u);
        disc.set(u, time);
        low.set(u, time);
        time++;
        
        const neighbors = graph.getNeighbors(u);
        for (let neighbor of neighbors) {
            const v = neighbor.node;
            
            if (!visited.has(v)) {
                parent.set(v, u);
                bridgeUtil(v);
                
                // Update low-link value
                low.set(u, Math.min(low.get(u), low.get(v)));
                
                // Check if edge u-v is a bridge
                if (low.get(v) > disc.get(u)) {
                    bridges.push([u, v]);
                }
            } else if (v !== parent.get(u)) {
                low.set(u, Math.min(low.get(u), disc.get(v)));
            }
        }
    }
    
    for (let vertex of vertices) {
        if (!visited.has(vertex)) {
            parent.set(vertex, null);
            bridgeUtil(vertex);
        }
    }
    
    return bridges;
}

// Test Case for Finding Bridges
console.log("\n=== Find Bridges Test ===");
const bridgeGraph = new Graph();
bridgeGraph.addEdge('A', 'B');
bridgeGraph.addEdge('B', 'C');
bridgeGraph.addEdge('C', 'D');
bridgeGraph.addEdge('D', 'E');
bridgeGraph.addEdge('E', 'F');
bridgeGraph.addEdge('F', 'D'); // Creates cycle

const bridges = findBridges(bridgeGraph);
console.log("Bridges in graph:", bridges);

// ===================================================================

// 26. Strongly Connected Components (Kosaraju's Algorithm)
// Question: Find all strongly connected components in directed graph
// Approach: Two DFS passes - first on original graph, second on transpose
// Time Complexity: O(V + E), Space Complexity: O(V)
function stronglyConnectedComponents(graph) {
    const vertices = graph.getVertices();
    const visited = new Set();
    const stack = [];
    
    // First DFS to fill stack
    function dfs1(vertex) {
        visited.add(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor.node)) {
                dfs1(neighbor.node);
            }
        }
        
        stack.push(vertex);
    }
    
    // Create transpose graph
    function createTranspose() {
        const transpose = new Graph(true);
        
        for (let vertex of vertices) {
            const neighbors = graph.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                transpose.addEdge(neighbor.node, vertex);
            }
        }
        
        return transpose;
    }
    
    // Second DFS on transpose
    function dfs2(transposeGraph, vertex, component) {
        visited.add(vertex);
        component.push(vertex);
        
        const neighbors = transposeGraph.getNeighbors(vertex);
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor.node)) {
                dfs2(transposeGraph, neighbor.node, component);
            }
        }
    }
    
    // Step 1: Fill stack with finishing times
    for (let vertex of vertices) {
        if (!visited.has(vertex)) {
            dfs1(vertex);
        }
    }
    
    // Step 2: Create transpose and reset visited
    const transpose = createTranspose();
    visited.clear();
    
    // Step 3: Process vertices in reverse finishing order
    const sccs = [];
    while (stack.length > 0) {
        const vertex = stack.pop();
        if (!visited.has(vertex)) {
            const component = [];
            dfs2(transpose, vertex, component);
            sccs.push(component);
        }
    }
    
    return sccs;
}

// Test Case for Strongly Connected Components
console.log("\n=== Strongly Connected Components Test ===");
const sccGraph = new Graph(true);
sccGraph.addEdge('A', 'B');
sccGraph.addEdge('B', 'C');
sccGraph.addEdge('C', 'A');
sccGraph.addEdge('B', 'D');
sccGraph.addEdge('D', 'E');
sccGraph.addEdge('E', 'F');
sccGraph.addEdge('F', 'D');

const sccs = stronglyConnectedComponents(sccGraph);
console.log("Strongly Connected Components:", sccs);

// ===================================================================

// 27. Check if Graph is Bipartite
// Question: Determine if graph can be colored with 2 colors (no adjacent same color)
// Approach: Use BFS/DFS to color graph, check for conflicts
// Time Complexity: O(V + E), Space Complexity: O(V)
function isBipartite(graph) {
    const vertices = graph.getVertices();
    const color = new Map();
    
    function bfsCheck(start) {
        const queue = [start];
        color.set(start, 0);
        
        while (queue.length > 0) {
            const vertex = queue.shift();
            const neighbors = graph.getNeighbors(vertex);
            
            for (let neighbor of neighbors) {
                if (!color.has(neighbor.node)) {
                    color.set(neighbor.node, 1 - color.get(vertex));
                    queue.push(neighbor.node);
                } else if (color.get(neighbor.node) === color.get(vertex)) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    for (let vertex of vertices) {
        if (!color.has(vertex)) {
            if (!bfsCheck(vertex)) {
                return false;
            }
        }
    }
    
    return true;
}

// Test Case for Bipartite Check
console.log("\n=== Bipartite Check Test ===");
const bipartiteGraph = new Graph();
bipartiteGraph.addEdge('A', 'B');
bipartiteGraph.addEdge('A', 'D');
bipartiteGraph.addEdge('B', 'C');
bipartiteGraph.addEdge('C', 'D');

console.log("Is bipartite:", isBipartite(bipartiteGraph));

// ===================================================================

// 28. Water Jug Problem using BFS
// Question: Measure exact amount of water using two jugs of different capacities
// Approach: Use BFS to explore all possible states (x, y) where x, y are water amounts
// Time Complexity: O(a × b), Space Complexity: O(a × b)
function waterJugProblem(jug1, jug2, target) {
    if (target > Math.max(jug1, jug2)) return -1;
    if (target % gcd(jug1, jug2) !== 0) return -1;
    
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }
    
    const visited = new Set();
    const queue = [[0, 0, 0]]; // [jug1_amount, jug2_amount, steps]
    
    while (queue.length > 0) {
        const [x, y, steps] = queue.shift();
        
        if (x === target || y === target) {
            return steps;
        }
        
        const state = `${x},${y}`;
        if (visited.has(state)) continue;
        visited.add(state);
        
        // All possible operations
        const nextStates = [
            [jug1, y],      // Fill jug1
            [x, jug2],      // Fill jug2
            [0, y],         // Empty jug1
            [x, 0],         // Empty jug2
            [Math.max(0, x - (jug2 - y)), Math.min(jug2, y + x)], // Pour jug1 to jug2
            [Math.min(jug1, x + y), Math.max(0, y - (jug1 - x))]  // Pour jug2 to jug1
        ];
        
        for (let [newX, newY] of nextStates) {
            const newState = `${newX},${newY}`;
            if (!visited.has(newState)) {
                queue.push([newX, newY, steps + 1]);
            }
        }
    }
    
    return -1;
}

// Test Case for Water Jug Problem
console.log("\n=== Water Jug Problem Test ===");
console.log("Min steps to measure 4L with 3L and 5L jugs:", waterJugProblem(3, 5, 4));

// ===================================================================

// 29. Longest Path in DAG
// Question: Find longest path in Directed Acyclic Graph
// Approach: Use topological sort and relax edges in topological order
// Time Complexity: O(V + E), Space Complexity: O(V)
function longestPathDAG(graph, source) {
    const vertices = graph.getVertices();
    const distance = new Map();
    const inDegree = new Map();
    
    // Initialize
    for (let vertex of vertices) {
        distance.set(vertex, vertex === source ? 0 : -Infinity);
        inDegree.set(vertex, 0);
    }
    
    // Calculate in-degrees
    for (let vertex of vertices) {
        const neighbors = graph.getNeighbors(vertex);
        for (let neighbor of neighbors) {
            inDegree.set(neighbor.node, inDegree.get(neighbor.node) + 1);
        }
    }
    
    // Topological sort using Kahn's algorithm
    const queue = [];
    for (let [vertex, degree] of inDegree) {
        if (degree === 0) {
            queue.push(vertex);
        }
    }
    
    while (queue.length > 0) {
        const u = queue.shift();
        
        const neighbors = graph.getNeighbors(u);
        for (let neighbor of neighbors) {
            const v = neighbor.node;
            const weight = neighbor.weight;
            
            // Relax edge for longest path
            if (distance.get(u) !== -Infinity && distance.get(u) + weight > distance.get(v)) {
                distance.set(v, distance.get(u) + weight);
            }
            
            inDegree.set(v, inDegree.get(v) - 1);
            if (inDegree.get(v) === 0) {
                queue.push(v);
            }
        }
    }
    
    return distance;
}

// Test Case for Longest Path in DAG
console.log("\n=== Longest Path in DAG Test ===");
const dagLongest = new Graph(true);
dagLongest.addEdge('A', 'B', 5);
dagLongest.addEdge('A', 'C', 3);
dagLongest.addEdge('B', 'D', 6);
dagLongest.addEdge('B', 'C', 2);
dagLongest.addEdge('C', 'D', 7);
dagLongest.addEdge('C', 'E', 4);
dagLongest.addEdge('D', 'E', 2);

const longestPaths = longestPathDAG(dagLongest, 'A');
console.log("Longest paths from A:", Object.fromEntries(longestPaths));

// ===================================================================

