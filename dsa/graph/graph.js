class Graph {
    constructor(directed = false) {
        this.directed = directed;
        this.adjacencyList = new Map();
    }

    // Add vertex to the graph
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    // Add edge between two vertices
    addEdge(from, to, weight = 1) {
        this.addVertex(from);
        this.addVertex(to);
        
        this.adjacencyList.get(from).push({ vertex: to, weight });
        
        if (!this.directed) {
            this.adjacencyList.get(to).push({ vertex: from, weight });
        }
    }

    // Get all vertices
    getVertices() {
        return Array.from(this.adjacencyList.keys());
    }

    // Get neighbors of a vertex
    getNeighbors(vertex) {
        return this.adjacencyList.get(vertex) || [];
    }

    // Display the graph
    display() {
        for (let [vertex, edges] of this.adjacencyList) {
            const connections = edges.map(edge => 
                `${edge.vertex}(${edge.weight})`
            ).join(', ');
            console.log(`${vertex} -> ${connections}`);
        }
    }

    // 1. BREADTH-FIRST SEARCH (BFS)
    bfs(startVertex, targetVertex = null) {
        const visited = new Set();
        const queue = [startVertex];
        const result = [];
        const parent = new Map();
        
        visited.add(startVertex);
        parent.set(startVertex, null);
        
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current);
            
            if (targetVertex && current === targetVertex) {
                return this.reconstructPath(parent, startVertex, targetVertex);
            }
            
            const neighbors = this.getNeighbors(current);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.vertex)) {
                    visited.add(neighbor.vertex);
                    parent.set(neighbor.vertex, current);
                    queue.push(neighbor.vertex);
                }
            }
        }
        
        return targetVertex ? null : result;
    }

    // 2. DEPTH-FIRST SEARCH (DFS)
    dfs(startVertex, targetVertex = null) {
        const visited = new Set();
        const result = [];
        const parent = new Map();
        
        const dfsHelper = (vertex) => {
            visited.add(vertex);
            result.push(vertex);
            
            if (targetVertex && vertex === targetVertex) {
                return true;
            }
            
            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.vertex)) {
                    parent.set(neighbor.vertex, vertex);
                    if (dfsHelper(neighbor.vertex)) {
                        return true;
                    }
                }
            }
            return false;
        };
        
        parent.set(startVertex, null);
        const found = dfsHelper(startVertex);
        
        if (targetVertex) {
            return found ? this.reconstructPath(parent, startVertex, targetVertex) : null;
        }
        
        return result;
    }

    // 3. TOPOLOGICAL SORT (Kahn's Algorithm)
    topologicalSort() {
        if (!this.directed) {
            throw new Error("Topological sort only works on directed graphs");
        }
        
        const inDegree = new Map();
        const vertices = this.getVertices();
        
        // Initialize in-degree
        for (let vertex of vertices) {
            inDegree.set(vertex, 0);
        }
        
        // Calculate in-degree for each vertex
        for (let vertex of vertices) {
            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                inDegree.set(neighbor.vertex, inDegree.get(neighbor.vertex) + 1);
            }
        }
        
        // Find vertices with no incoming edges
        const queue = [];
        for (let [vertex, degree] of inDegree) {
            if (degree === 0) {
                queue.push(vertex);
            }
        }
        
        const result = [];
        
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current);
            
            const neighbors = this.getNeighbors(current);
            for (let neighbor of neighbors) {
                inDegree.set(neighbor.vertex, inDegree.get(neighbor.vertex) - 1);
                if (inDegree.get(neighbor.vertex) === 0) {
                    queue.push(neighbor.vertex);
                }
            }
        }
        
        // Check for cycles
        if (result.length !== vertices.length) {
            throw new Error("Graph has cycles - topological sort not possible");
        }
        
        return result;
    }

    // 4. DIJKSTRA'S ALGORITHM
    dijkstra(startVertex) {
        const distances = new Map();
        const previous = new Map();
        const visited = new Set();
        const vertices = this.getVertices();
        
        // Initialize distances
        for (let vertex of vertices) {
            distances.set(vertex, vertex === startVertex ? 0 : Infinity);
            previous.set(vertex, null);
        }
        
        while (visited.size < vertices.length) {
            // Find unvisited vertex with minimum distance
            let minVertex = null;
            let minDistance = Infinity;
            
            for (let vertex of vertices) {
                if (!visited.has(vertex) && distances.get(vertex) < minDistance) {
                    minDistance = distances.get(vertex);
                    minVertex = vertex;
                }
            }
            
            if (minVertex === null) break;
            
            visited.add(minVertex);
            
            // Update distances to neighbors
            const neighbors = this.getNeighbors(minVertex);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.vertex)) {
                    const newDistance = distances.get(minVertex) + neighbor.weight;
                    if (newDistance < distances.get(neighbor.vertex)) {
                        distances.set(neighbor.vertex, newDistance);
                        previous.set(neighbor.vertex, minVertex);
                    }
                }
            }
        }
        
        return { distances, previous };
    }

    // 5. BELLMAN-FORD ALGORITHM
    bellmanFord(startVertex) {
        const distances = new Map();
        const previous = new Map();
        const vertices = this.getVertices();
        
        // Initialize distances
        for (let vertex of vertices) {
            distances.set(vertex, vertex === startVertex ? 0 : Infinity);
            previous.set(vertex, null);
        }
        
        // Relax edges V-1 times
        for (let i = 0; i < vertices.length - 1; i++) {
            for (let vertex of vertices) {
                if (distances.get(vertex) === Infinity) continue;
                
                const neighbors = this.getNeighbors(vertex);
                for (let neighbor of neighbors) {
                    const newDistance = distances.get(vertex) + neighbor.weight;
                    if (newDistance < distances.get(neighbor.vertex)) {
                        distances.set(neighbor.vertex, newDistance);
                        previous.set(neighbor.vertex, vertex);
                    }
                }
            }
        }
        
        // Check for negative cycles
        for (let vertex of vertices) {
            if (distances.get(vertex) === Infinity) continue;
            
            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                const newDistance = distances.get(vertex) + neighbor.weight;
                if (newDistance < distances.get(neighbor.vertex)) {
                    throw new Error("Graph contains negative cycle");
                }
            }
        }
        
        return { distances, previous };
    }

    // 6. A* SEARCH ALGORITHM
    aStar(start, goal, heuristic) {
        const openSet = [start];
        const closedSet = new Set();
        const gScore = new Map();
        const fScore = new Map();
        const previous = new Map();
        
        gScore.set(start, 0);
        fScore.set(start, heuristic(start, goal));
        
        while (openSet.length > 0) {
            // Find node with lowest fScore
            let current = openSet.reduce((min, node) => 
                fScore.get(node) < fScore.get(min) ? node : min
            );
            
            if (current === goal) {
                return this.reconstructPath(previous, start, goal);
            }
            
            openSet.splice(openSet.indexOf(current), 1);
            closedSet.add(current);
            
            const neighbors = this.getNeighbors(current);
            for (let neighbor of neighbors) {
                if (closedSet.has(neighbor.vertex)) continue;
                
                const tentativeGScore = gScore.get(current) + neighbor.weight;
                
                if (!openSet.includes(neighbor.vertex)) {
                    openSet.push(neighbor.vertex);
                } else if (tentativeGScore >= (gScore.get(neighbor.vertex) || Infinity)) {
                    continue;
                }
                
                previous.set(neighbor.vertex, current);
                gScore.set(neighbor.vertex, tentativeGScore);
                fScore.set(neighbor.vertex, tentativeGScore + heuristic(neighbor.vertex, goal));
            }
        }
        
        return null; // No path found
    }

    // 7. FLOYD-WARSHALL ALGORITHM
    floydWarshall() {
        const vertices = this.getVertices();
        const dist = new Map();
        
        // Initialize distance matrix
        for (let i of vertices) {
            dist.set(i, new Map());
            for (let j of vertices) {
                if (i === j) {
                    dist.get(i).set(j, 0);
                } else {
                    dist.get(i).set(j, Infinity);
                }
            }
        }
        
        // Set direct edge weights
        for (let vertex of vertices) {
            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                dist.get(vertex).set(neighbor.vertex, neighbor.weight);
            }
        }
        
        // Floyd-Warshall main algorithm
        for (let k of vertices) {
            for (let i of vertices) {
                for (let j of vertices) {
                    const newDist = dist.get(i).get(k) + dist.get(k).get(j);
                    if (newDist < dist.get(i).get(j)) {
                        dist.get(i).set(j, newDist);
                    }
                }
            }
        }
        
        return dist;
    }

    // 8. PRIM'S ALGORITHM (MST)
    primMST() {
        if (this.directed) {
            throw new Error("MST algorithms work on undirected graphs");
        }
        
        const vertices = this.getVertices();
        if (vertices.length === 0) return [];
        
        const mst = [];
        const visited = new Set();
        const minHeap = [];
        
        // Start with arbitrary vertex
        const startVertex = vertices[0];
        visited.add(startVertex);
        
        // Add all edges from start vertex to heap
        const startNeighbors = this.getNeighbors(startVertex);
        for (let neighbor of startNeighbors) {
            minHeap.push({
                from: startVertex,
                to: neighbor.vertex,
                weight: neighbor.weight
            });
        }
        
        while (minHeap.length > 0 && visited.size < vertices.length) {
            // Sort to get minimum weight edge
            minHeap.sort((a, b) => a.weight - b.weight);
            const edge = minHeap.shift();
            
            if (visited.has(edge.to)) continue;
            
            // Add edge to MST
            mst.push(edge);
            visited.add(edge.to);
            
            // Add new edges to heap
            const neighbors = this.getNeighbors(edge.to);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.vertex)) {
                    minHeap.push({
                        from: edge.to,
                        to: neighbor.vertex,
                        weight: neighbor.weight
                    });
                }
            }
        }
        
        return mst;
    }

    // 9. UNION-FIND (DISJOINT SET)
    static createUnionFind(vertices) {
        const parent = new Map();
        const rank = new Map();
        
        // Initialize
        for (let vertex of vertices) {
            parent.set(vertex, vertex);
            rank.set(vertex, 0);
        }
        
        const find = (x) => {
            if (parent.get(x) !== x) {
                parent.set(x, find(parent.get(x))); // Path compression
            }
            return parent.get(x);
        };
        
        const union = (x, y) => {
            const rootX = find(x);
            const rootY = find(y);
            
            if (rootX !== rootY) {
                // Union by rank
                if (rank.get(rootX) < rank.get(rootY)) {
                    parent.set(rootX, rootY);
                } else if (rank.get(rootX) > rank.get(rootY)) {
                    parent.set(rootY, rootX);
                } else {
                    parent.set(rootY, rootX);
                    rank.set(rootX, rank.get(rootX) + 1);
                }
                return true;
            }
            return false;
        };
        
        return { find, union };
    }

    // KRUSKAL'S ALGORITHM (MST)
    kruskalMST() {
        if (this.directed) {
            throw new Error("MST algorithms work on undirected graphs");
        }
        
        const vertices = this.getVertices();
        const edges = [];
        const mst = [];
        
        // Collect all edges
        const addedEdges = new Set();
        for (let vertex of vertices) {
            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                const edgeKey = [vertex, neighbor.vertex].sort().join('-');
                if (!addedEdges.has(edgeKey)) {
                    edges.push({
                        from: vertex,
                        to: neighbor.vertex,
                        weight: neighbor.weight
                    });
                    addedEdges.add(edgeKey);
                }
            }
        }
        
        // Sort edges by weight
        edges.sort((a, b) => a.weight - b.weight);
        
        const uf = Graph.createUnionFind(vertices);
        
        for (let edge of edges) {
            if (uf.union(edge.from, edge.to)) {
                mst.push(edge);
                if (mst.length === vertices.length - 1) break;
            }
        }
        
        return mst;
    }

    // 10. TARJAN'S ALGORITHM (Strongly Connected Components)
    tarjanSCC() {
        if (!this.directed) {
            throw new Error("SCC algorithms work on directed graphs");
        }
        
        const vertices = this.getVertices();
        const visited = new Set();
        const stack = [];
        const onStack = new Set();
        const lowLink = new Map();
        const ids = new Map();
        const sccs = [];
        let id = 0;
        
        const dfs = (vertex) => {
            stack.push(vertex);
            onStack.add(vertex);
            ids.set(vertex, id);
            lowLink.set(vertex, id);
            id++;
            
            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                if (!ids.has(neighbor.vertex)) {
                    dfs(neighbor.vertex);
                }
                if (onStack.has(neighbor.vertex)) {
                    lowLink.set(vertex, Math.min(lowLink.get(vertex), lowLink.get(neighbor.vertex)));
                }
            }
            
            // Found SCC root
            if (ids.get(vertex) === lowLink.get(vertex)) {
                const scc = [];
                let w;
                do {
                    w = stack.pop();
                    onStack.delete(w);
                    scc.push(w);
                } while (w !== vertex);
                sccs.push(scc);
            }
        };
        
        for (let vertex of vertices) {
            if (!ids.has(vertex)) {
                dfs(vertex);
            }
        }
        
        return sccs;
    }

    // 11. CYCLE DETECTION
    hasCycle() {
        if (this.directed) {
            return this.hasCycleDirected();
        } else {
            return this.hasCycleUndirected();
        }
    }

    hasCycleDirected() {
        const vertices = this.getVertices();
        const color = new Map(); // 0: white, 1: gray, 2: black
        
        for (let vertex of vertices) {
            color.set(vertex, 0);
        }
        
        const dfs = (vertex) => {
            color.set(vertex, 1); // Gray
            
            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                if (color.get(neighbor.vertex) === 1) {
                    return true; // Back edge found
                }
                if (color.get(neighbor.vertex) === 0 && dfs(neighbor.vertex)) {
                    return true;
                }
            }
            
            color.set(vertex, 2); // Black
            return false;
        };
        
        for (let vertex of vertices) {
            if (color.get(vertex) === 0) {
                if (dfs(vertex)) {
                    return true;
                }
            }
        }
        
        return false;
    }

    hasCycleUndirected() {
        const vertices = this.getVertices();
        const uf = Graph.createUnionFind(vertices);
        
        const processedEdges = new Set();
        
        for (let vertex of vertices) {
            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                const edgeKey = [vertex, neighbor.vertex].sort().join('-');
                if (!processedEdges.has(edgeKey)) {
                    if (!uf.union(vertex, neighbor.vertex)) {
                        return true; // Cycle found
                    }
                    processedEdges.add(edgeKey);
                }
            }
        }
        
        return false;
    }

    // Helper method to reconstruct path
    reconstructPath(parent, start, end) {
        const path = [];
        let current = end;
        
        while (current !== null) {
            path.unshift(current);
            current = parent.get(current);
        }
        
        return path[0] === start ? path : null;
    }

    // Get shortest path using Dijkstra
    getShortestPath(start, end) {
        const result = this.dijkstra(start);
        const path = this.reconstructPath(result.previous, start, end);
        return {
            path,
            distance: result.distances.get(end)
        };
    }
}

// Example usage and testing
function testGraph() {
    console.log("=== Graph Algorithms Demo ===\n");
    
    // Create a directed graph
    const graph = new Graph(true);
    
    // Add vertices and edges
    graph.addEdge('A', 'B', 4);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'C', 1);
    graph.addEdge('B', 'D', 5);
    graph.addEdge('C', 'D', 8);
    graph.addEdge('C', 'E', 10);
    graph.addEdge('D', 'E', 2);
    
    console.log("Graph structure:");
    graph.display();
    
    console.log("\n1. BFS from A:", graph.bfs('A'));
    console.log("2. DFS from A:", graph.dfs('A'));
    
    try {
        console.log("3. Topological Sort:", graph.topologicalSort());
    } catch (e) {
        console.log("3. Topological Sort:", e.message);
    }
    
    console.log("4. Dijkstra from A:", graph.dijkstra('A'));
    console.log("5. Bellman-Ford from A:", graph.bellmanFord('A'));
    
    // A* example with Manhattan distance heuristic
    const heuristic = (a, b) => Math.abs(a.charCodeAt(0) - b.charCodeAt(0));
    console.log("6. A* from A to E:", graph.aStar('A', 'E', heuristic));
    
    console.log("7. Floyd-Warshall:", graph.floydWarshall());
    console.log("8. Has Cycle:", graph.hasCycle());
    console.log("9. Strongly Connected Components:", graph.tarjanSCC());
    
    // Test MST on undirected graph
    const undirectedGraph = new Graph(false);
    undirectedGraph.addEdge('A', 'B', 4);
    undirectedGraph.addEdge('A', 'C', 2);
    undirectedGraph.addEdge('B', 'C', 1);
    undirectedGraph.addEdge('B', 'D', 5);
    undirectedGraph.addEdge('C', 'D', 8);
    
    console.log("\n=== MST Algorithms (Undirected Graph) ===");
    console.log("Prim's MST:", undirectedGraph.primMST());
    console.log("Kruskal's MST:", undirectedGraph.kruskalMST());
}

// Run the test
testGraph();