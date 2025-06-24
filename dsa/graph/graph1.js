// Base Graph Class with common algorithms
class Graph {
  constructor(directed = false) {
    this.adjacencyList = new Map();
    this.directed = directed;
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2, weight = 1) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    
    this.adjacencyList.get(vertex1).push({ vertex: vertex2, weight });
    
    if (!this.directed) {
      this.adjacencyList.get(vertex2).push({ vertex: vertex1, weight });
    }
  }

  getVertices() {
    return Array.from(this.adjacencyList.keys());
  }

  getNeighbors(vertex) {
    return this.adjacencyList.get(vertex) || [];
  }

  // Dijkstra's Algorithm for shortest path
  dijkstra(start, end) {
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set();

    // Initialize distances
    for (let vertex of this.adjacencyList.keys()) {
      distances.set(vertex, vertex === start ? 0 : Infinity);
      unvisited.add(vertex);
    }

    while (unvisited.size > 0) {
      // Find unvisited vertex with minimum distance
      let current = null;
      let minDistance = Infinity;
      for (let vertex of unvisited) {
        if (distances.get(vertex) < minDistance) {
          minDistance = distances.get(vertex);
          current = vertex;
        }
      }

      if (current === null || current === end) break;

      unvisited.delete(current);

      // Update distances to neighbors
      for (let neighbor of this.getNeighbors(current)) {
        const alt = distances.get(current) + neighbor.weight;
        if (alt < distances.get(neighbor.vertex)) {
          distances.set(neighbor.vertex, alt);
          previous.set(neighbor.vertex, current);
        }
      }
    }

    // Reconstruct path
    const path = [];
    let current = end;
    while (current !== undefined) {
      path.unshift(current);
      current = previous.get(current);
    }

    return {
      distance: distances.get(end),
      path: path[0] === start ? path : []
    };
  }

  // Breadth-First Search
  bfs(start) {
    const visited = new Set();
    const queue = [start];
    const result = [];

    while (queue.length > 0) {
      const vertex = queue.shift();
      if (!visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);
        
        for (let neighbor of this.getNeighbors(vertex)) {
          if (!visited.has(neighbor.vertex)) {
            queue.push(neighbor.vertex);
          }
        }
      }
    }

    return result;
  }

  // Topological Sort (for DAGs)
  topologicalSort() {
    const visited = new Set();
    const stack = [];

    const dfsUtil = (vertex) => {
      visited.add(vertex);
      for (let neighbor of this.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          dfsUtil(neighbor.vertex);
        }
      }
      stack.push(vertex);
    };

    for (let vertex of this.adjacencyList.keys()) {
      if (!visited.has(vertex)) {
        dfsUtil(vertex);
      }
    }

    return stack.reverse();
  }

  // Detect cycles (useful for fraud detection)
  hasCycle() {
    const visited = new Set();
    const recStack = new Set();

    const dfsUtil = (vertex) => {
      visited.add(vertex);
      recStack.add(vertex);

      for (let neighbor of this.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          if (dfsUtil(neighbor.vertex)) return true;
        } else if (recStack.has(neighbor.vertex)) {
          return true;
        }
      }

      recStack.delete(vertex);
      return false;
    };

    for (let vertex of this.adjacencyList.keys()) {
      if (!visited.has(vertex)) {
        if (dfsUtil(vertex)) return true;
      }
    }

    return false;
  }
}

// 1. Social Network Implementation
class SocialNetwork extends Graph {
  constructor() {
    super(false); // Undirected graph for friendships
    this.userProfiles = new Map();
  }

  addUser(userId, profile) {
    this.addVertex(userId);
    this.userProfiles.set(userId, profile);
  }

  addFriendship(user1, user2) {
    this.addEdge(user1, user2);
  }

  findMutualFriends(user1, user2) {
    const friends1 = new Set(this.getNeighbors(user1).map(n => n.vertex));
    const friends2 = new Set(this.getNeighbors(user2).map(n => n.vertex));
    
    return [...friends1].filter(friend => friends2.has(friend));
  }

  findShortestConnection(user1, user2) {
    return this.dijkstra(user1, user2);
  }

  findInfluencers() {
    const influencers = [];
    for (let user of this.getVertices()) {
      const connections = this.getNeighbors(user).length;
      influencers.push({ user, connections });
    }
    return influencers.sort((a, b) => b.connections - a.connections);
  }
}

// 2. Navigation & Maps Implementation
class NavigationSystem extends Graph {
  constructor() {
    super(false); // Roads are typically bidirectional
    this.locations = new Map();
  }

  addLocation(locationId, coordinates) {
    this.addVertex(locationId);
    this.locations.set(locationId, coordinates);
  }

  addRoad(location1, location2, distance) {
    this.addEdge(location1, location2, distance);
  }

  findShortestRoute(start, destination) {
    return this.dijkstra(start, destination);
  }

  findNearbyLocations(location, maxDistance) {
    const nearby = [];
    const visited = new Set();
    const queue = [{ location, distance: 0 }];

    while (queue.length > 0) {
      const { location: current, distance } = queue.shift();
      
      if (visited.has(current) || distance > maxDistance) continue;
      visited.add(current);
      
      if (current !== location) {
        nearby.push({ location: current, distance });
      }

      for (let neighbor of this.getNeighbors(current)) {
        const newDistance = distance + neighbor.weight;
        if (newDistance <= maxDistance && !visited.has(neighbor.vertex)) {
          queue.push({ location: neighbor.vertex, distance: newDistance });
        }
      }
    }

    return nearby.sort((a, b) => a.distance - b.distance);
  }
}

// 3. Recommendation System Implementation
class RecommendationSystem extends Graph {
  constructor() {
    super(false);
    this.userInteractions = new Map();
    this.itemData = new Map();
  }

  addUser(userId) {
    this.addVertex(`user_${userId}`);
    this.userInteractions.set(userId, new Set());
  }

  addItem(itemId, metadata) {
    this.addVertex(`item_${itemId}`);
    this.itemData.set(itemId, metadata);
  }

  addInteraction(userId, itemId, strength = 1) {
    this.addEdge(`user_${userId}`, `item_${itemId}`, strength);
    this.userInteractions.get(userId).add(itemId);
  }

  getRecommendations(userId, limit = 5) {
    const userVertex = `user_${userId}`;
    const recommendations = new Map();
    
    // Find similar users based on common interactions
    for (let neighbor of this.getNeighbors(userVertex)) {
      if (neighbor.vertex.startsWith('item_')) {
        const itemId = neighbor.vertex.replace('item_', '');
        
        // Find other users who interacted with this item
        for (let itemNeighbor of this.getNeighbors(neighbor.vertex)) {
          if (itemNeighbor.vertex.startsWith('user_') && itemNeighbor.vertex !== userVertex) {
            const otherUserId = itemNeighbor.vertex.replace('user_', '');
            
            // Get items this similar user likes
            for (let otherUserItem of this.getNeighbors(itemNeighbor.vertex)) {
              if (otherUserItem.vertex.startsWith('item_')) {
                const recommendedItemId = otherUserItem.vertex.replace('item_', '');
                
                // Don't recommend items user already interacted with
                if (!this.userInteractions.get(userId).has(recommendedItemId)) {
                  const score = neighbor.weight * itemNeighbor.weight * otherUserItem.weight;
                  recommendations.set(recommendedItemId, 
                    (recommendations.get(recommendedItemId) || 0) + score);
                }
              }
            }
          }
        }
      }
    }

    return Array.from(recommendations.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([itemId, score]) => ({ itemId, score, metadata: this.itemData.get(itemId) }));
  }
}

// 4. Dependency Resolution Implementation
class DependencyResolver extends Graph {
  constructor() {
    super(true); // Directed graph for dependencies
    this.packages = new Map();
  }

  addPackage(packageName, version = '1.0.0') {
    this.addVertex(packageName);
    this.packages.set(packageName, { version, dependencies: [] });
  }

  addDependency(package1, package2) {
    this.addEdge(package1, package2);
    this.packages.get(package1).dependencies.push(package2);
  }

  getInstallOrder() {
    if (this.hasCycle()) {
      throw new Error('Circular dependency detected!');
    }
    return this.topologicalSort();
  }

  checkForCircularDependencies() {
    return this.hasCycle();
  }

  getDependencyTree(packageName) {
    const tree = {};
    const visited = new Set();

    const buildTree = (pkg) => {
      if (visited.has(pkg)) return null;
      visited.add(pkg);

      const dependencies = {};
      for (let neighbor of this.getNeighbors(pkg)) {
        dependencies[neighbor.vertex] = buildTree(neighbor.vertex);
      }

      return Object.keys(dependencies).length > 0 ? dependencies : null;
    };

    tree[packageName] = buildTree(packageName);
    return tree;
  }
}

// 5. Network Routing Implementation
class NetworkRouter extends Graph {
  constructor() {
    super(false);
    this.routers = new Map();
  }

  addRouter(routerId, capacity) {
    this.addVertex(routerId);
    this.routers.set(routerId, { capacity, load: 0 });
  }

  addConnection(router1, router2, bandwidth, latency) {
    this.addEdge(router1, router2, latency); // Use latency as weight for shortest path
    // Store bandwidth info separately for load balancing
    this.routers.get(router1).connections = this.routers.get(router1).connections || new Map();
    this.routers.get(router1).connections.set(router2, bandwidth);
  }

  findOptimalPath(source, destination) {
    return this.dijkstra(source, destination);
  }

  findLoadBalancedPath(source, destination, dataSize) {
    // Custom pathfinding considering router load and bandwidth
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set();

    for (let vertex of this.adjacencyList.keys()) {
      distances.set(vertex, vertex === source ? 0 : Infinity);
      unvisited.add(vertex);
    }

    while (unvisited.size > 0) {
      let current = null;
      let minCost = Infinity;
      
      for (let vertex of unvisited) {
        const routerLoad = this.routers.get(vertex).load;
        const routerCapacity = this.routers.get(vertex).capacity;
        const loadFactor = routerLoad / routerCapacity;
        const cost = distances.get(vertex) * (1 + loadFactor);
        
        if (cost < minCost) {
          minCost = cost;
          current = vertex;
        }
      }

      if (current === null || current === destination) break;
      unvisited.delete(current);

      for (let neighbor of this.getNeighbors(current)) {
        const alt = distances.get(current) + neighbor.weight;
        if (alt < distances.get(neighbor.vertex)) {
          distances.set(neighbor.vertex, alt);
          previous.set(neighbor.vertex, current);
        }
      }
    }

    const path = [];
    let curr = destination;
    while (curr !== undefined) {
      path.unshift(curr);
      curr = previous.get(curr);
    }

    return { path: path[0] === source ? path : [], cost: distances.get(destination) };
  }
}

// 6. Web Crawler / PageRank Implementation
class WebCrawler extends Graph {
  constructor() {
    super(true); // Directed graph for web links
    this.pages = new Map();
  }

  addPage(url, title, content) {
    this.addVertex(url);
    this.pages.set(url, { title, content, pageRank: 1.0 });
  }

  addLink(fromUrl, toUrl) {
    this.addEdge(fromUrl, toUrl);
  }

  calculatePageRank(iterations = 50, dampingFactor = 0.85) {
    const vertices = this.getVertices();
    const n = vertices.length;
    
    // Initialize PageRank values
    for (let vertex of vertices) {
      this.pages.get(vertex).pageRank = 1.0 / n;
    }

    for (let i = 0; i < iterations; i++) {
      const newRanks = new Map();
      
      for (let vertex of vertices) {
        let rank = (1 - dampingFactor) / n;
        
        // Find all pages that link to this vertex
        for (let otherVertex of vertices) {
          const neighbors = this.getNeighbors(otherVertex);
          const linksTo = neighbors.find(n => n.vertex === vertex);
          
          if (linksTo) {
            const outboundLinks = neighbors.length;
            rank += dampingFactor * (this.pages.get(otherVertex).pageRank / outboundLinks);
          }
        }
        
        newRanks.set(vertex, rank);
      }
      
      // Update PageRank values
      for (let [vertex, rank] of newRanks) {
        this.pages.get(vertex).pageRank = rank;
      }
    }
  }

  getTopPages(limit = 10) {
    return Array.from(this.pages.entries())
      .sort((a, b) => b[1].pageRank - a[1].pageRank)
      .slice(0, limit)
      .map(([url, data]) => ({ url, title: data.title, pageRank: data.pageRank }));
  }
}

// 7. Fraud Detection Implementation
class FraudDetectionSystem extends Graph {
  constructor() {
    super(true);
    this.transactions = new Map();
    this.accounts = new Map();
  }

  addAccount(accountId, accountType) {
    this.addVertex(accountId);
    this.accounts.set(accountId, { type: accountType, riskScore: 0 });
  }

  addTransaction(fromAccount, toAccount, amount, timestamp) {
    const transactionId = `${fromAccount}-${toAccount}-${timestamp}`;
    this.addEdge(fromAccount, toAccount, amount);
    this.transactions.set(transactionId, {
      from: fromAccount,
      to: toAccount,
      amount,
      timestamp,
      flagged: false
    });
  }

  detectSuspiciousPatterns() {
    const suspiciousAccounts = [];
    
    // Detect accounts with unusual transaction patterns
    for (let account of this.getVertices()) {
      const outgoing = this.getNeighbors(account);
      const totalOutgoing = outgoing.reduce((sum, t) => sum + t.weight, 0);
      const transactionCount = outgoing.length;
      
      // Flag accounts with high-value or high-frequency transactions
      if (totalOutgoing > 100000 || transactionCount > 50) {
        this.accounts.get(account).riskScore += 50;
        suspiciousAccounts.push({
          account,
          reason: 'High transaction volume or frequency',
          riskScore: this.accounts.get(account).riskScore
        });
      }
    }

    // Detect circular transaction patterns (potential money laundering)
    if (this.hasCycle()) {
      suspiciousAccounts.push({
        account: 'SYSTEM',
        reason: 'Circular transaction pattern detected',
        riskScore: 100
      });
    }

    return suspiciousAccounts;
  }

  findTransactionChain(startAccount, endAccount) {
    return this.dijkstra(startAccount, endAccount);
  }
}

// 8. Version Control System Implementation
class VersionControlSystem extends Graph {
  constructor() {
    super(true); // DAG structure
    this.commits = new Map();
    this.branches = new Map();
  }

  addCommit(commitHash, message, author, timestamp, parentCommits = []) {
    this.addVertex(commitHash);
    this.commits.set(commitHash, { message, author, timestamp });
    
    // Add edges from parent commits
    for (let parent of parentCommits) {
      this.addEdge(parent, commitHash);
    }
  }

  createBranch(branchName, fromCommit) {
    this.branches.set(branchName, fromCommit);
  }

  getCommitHistory(fromCommit) {
    const history = [];
    const visited = new Set();
    const stack = [fromCommit];

    while (stack.length > 0) {
      const commit = stack.pop();
      if (!visited.has(commit)) {
        visited.add(commit);
        history.push({
          hash: commit,
          ...this.commits.get(commit)
        });

        // Add parent commits to stack
        for (let vertex of this.getVertices()) {
          const neighbors = this.getNeighbors(vertex);
          if (neighbors.some(n => n.vertex === commit)) {
            stack.push(vertex);
          }
        }
      }
    }

    return history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  findCommonAncestor(commit1, commit2) {
    const ancestors1 = new Set();
    const stack1 = [commit1];
    
    // Find all ancestors of commit1
    while (stack1.length > 0) {
      const commit = stack1.pop();
      ancestors1.add(commit);
      
      for (let vertex of this.getVertices()) {
        const neighbors = this.getNeighbors(vertex);
        if (neighbors.some(n => n.vertex === commit)) {
          stack1.push(vertex);
        }
      }
    }

    // Find first common ancestor with commit2
    const stack2 = [commit2];
    const visited = new Set();
    
    while (stack2.length > 0) {
      const commit = stack2.pop();
      if (ancestors1.has(commit)) {
        return commit;
      }
      
      if (!visited.has(commit)) {
        visited.add(commit);
        for (let vertex of this.getVertices()) {
          const neighbors = this.getNeighbors(vertex);
          if (neighbors.some(n => n.vertex === commit)) {
            stack2.push(vertex);
          }
        }
      }
    }

    return null;
  }
}

// 9. Compiler Optimization Implementation
class CompilerOptimizer extends Graph {
  constructor() {
    super(true);
    this.basicBlocks = new Map();
  }

  addBasicBlock(blockId, instructions) {
    this.addVertex(blockId);
    this.basicBlocks.set(blockId, { instructions, reachable: false });
  }

  addControlFlow(fromBlock, toBlock) {
    this.addEdge(fromBlock, toBlock);
  }

  findUnreachableCode(entryBlock) {
    // Mark all reachable blocks
    const reachable = this.bfs(entryBlock);
    
    for (let block of reachable) {
      this.basicBlocks.get(block).reachable = true;
    }

    // Find unreachable blocks
    const unreachable = [];
    for (let [blockId, blockData] of this.basicBlocks) {
      if (!blockData.reachable) {
        unreachable.push(blockId);
      }
    }

    return unreachable;
  }

  optimizeInstructionOrder() {
    // Use topological sort to optimize instruction scheduling
    const orderedBlocks = this.topologicalSort();
    return orderedBlocks.map(blockId => ({
      blockId,
      instructions: this.basicBlocks.get(blockId).instructions
    }));
  }

  detectDeadCode() {
    const deadBlocks = [];
    
    for (let [blockId, blockData] of this.basicBlocks) {
      // Check if block has no incoming edges (except entry block)
      let hasIncoming = false;
      for (let vertex of this.getVertices()) {
        if (this.getNeighbors(vertex).some(n => n.vertex === blockId)) {
          hasIncoming = true;
          break;
        }
      }
      
      if (!hasIncoming && !blockData.reachable) {
        deadBlocks.push(blockId);
      }
    }

    return deadBlocks;
  }
}

// 10. Supply Chain / Logistics Implementation
class SupplyChainManager extends Graph {
  constructor() {
    super(true);
    this.locations = new Map();
    this.inventory = new Map();
  }

  addLocation(locationId, type, coordinates) {
    this.addVertex(locationId);
    this.locations.set(locationId, { type, coordinates });
    this.inventory.set(locationId, new Map());
  }

  addRoute(from, to, cost, capacity, transitTime) {
    this.addEdge(from, to, cost);
    // Store additional route info
    const fromLocation = this.locations.get(from);
    fromLocation.routes = fromLocation.routes || new Map();
    fromLocation.routes.set(to, { capacity, transitTime, cost });
  }

  updateInventory(locationId, item, quantity) {
    this.inventory.get(locationId).set(item, quantity);
  }

  findOptimalDeliveryRoute(from, to) {
    return this.dijkstra(from, to);
  }

  optimizeInventoryFlow(item, demand) {
    const flowPlan = [];
    
    // Find locations with surplus and deficit
    const surplus = [];
    const deficit = [];
    
    for (let [locationId, inventory] of this.inventory) {
      const currentStock = inventory.get(item) || 0;
      const requiredStock = demand.get(locationId) || 0;
      const difference = currentStock - requiredStock;
      
      if (difference > 0) {
        surplus.push({ location: locationId, surplus: difference });
      } else if (difference < 0) {
        deficit.push({ location: locationId, deficit: -difference });
      }
    }

    // Plan transfers from surplus to deficit locations
    for (let deficitLocation of deficit) {
      let remainingDeficit = deficitLocation.deficit;
      
      for (let surplusLocation of surplus) {
        if (remainingDeficit <= 0 || surplusLocation.surplus <= 0) continue;
        
        const transferAmount = Math.min(remainingDeficit, surplusLocation.surplus);
        const route = this.findOptimalDeliveryRoute(
          surplusLocation.location, 
          deficitLocation.location
        );
        
        flowPlan.push({
          from: surplusLocation.location,
          to: deficitLocation.location,
          item,
          quantity: transferAmount,
          route: route.path,
          cost: route.distance * transferAmount
        });
        
        remainingDeficit -= transferAmount;
        surplusLocation.surplus -= transferAmount;
      }
    }

    return flowPlan;
  }
}

// Example usage and demonstrations
console.log('=== Graph Use Cases Implementation ===\n');

// 1. Social Network Example
console.log('1. Social Network:');
const socialNet = new SocialNetwork();
socialNet.addUser('alice', { name: 'Alice', age: 25 });
socialNet.addUser('bob', { name: 'Bob', age: 30 });
socialNet.addUser('charlie', { name: 'Charlie', age: 28 });
socialNet.addUser('david', { name: 'David', age: 26 });

socialNet.addFriendship('alice', 'bob');
socialNet.addFriendship('bob', 'charlie');
socialNet.addFriendship('alice', 'david');
socialNet.addFriendship('charlie', 'david');

console.log('Mutual friends of Alice and Charlie:', socialNet.findMutualFriends('alice', 'charlie'));
console.log('Connection path Alice to Charlie:', socialNet.findShortestConnection('alice', 'charlie'));
console.log('Top influencers:', socialNet.findInfluencers().slice(0, 2));

// 2. Navigation System Example
console.log('\n2. Navigation System:');
const navSystem = new NavigationSystem();
navSystem.addLocation('A', { lat: 40.7128, lng: -74.0060 });
navSystem.addLocation('B', { lat: 34.0522, lng: -118.2437 });
navSystem.addLocation('C', { lat: 41.8781, lng: -87.6298 });

navSystem.addRoad('A', 'B', 2445); // miles
navSystem.addRoad('B', 'C', 1745);
navSystem.addRoad('A', 'C', 790);

console.log('Shortest route A to B:', navSystem.findShortestRoute('A', 'B'));
console.log('Locations within 1000 miles of A:', navSystem.findNearbyLocations('A', 1000));

// 3. Dependency Resolution Example
console.log('\n3. Dependency Resolution:');
const depResolver = new DependencyResolver();
depResolver.addPackage('express');
depResolver.addPackage('lodash');
depResolver.addPackage('react');
depResolver.addPackage('webpack');

depResolver.addDependency('react', 'lodash');
depResolver.addDependency('webpack', 'lodash');
depResolver.addDependency('express', 'lodash');

console.log('Install order:', depResolver.getInstallOrder());
console.log('Has circular dependencies:', depResolver.checkForCircularDependencies());

// 4. Recommendation System Example
console.log('\n4. Recommendation System:');
const recSystem = new RecommendationSystem();
recSystem.addUser('user1');
recSystem.addUser('user2');
recSystem.addUser('user3');

recSystem.addItem('movie1', { title: 'Inception', genre: 'Sci-Fi' });
recSystem.addItem('movie2', { title: 'The Matrix', genre: 'Sci-Fi' });
recSystem.addItem('movie3', { title: 'Titanic', genre: 'Romance' });

recSystem.addInteraction('user1', 'movie1', 5);
recSystem.addInteraction('user1', 'movie2', 4);
recSystem.addInteraction('user2', 'movie1', 4);
recSystem.addInteraction('user2', 'movie3', 5);
recSystem.addInteraction('user3', 'movie2', 3);

console.log('Recommendations for user3:', recSystem.getRecommendations('user3', 3));

// 5. Network Routing Example
console.log('\n5. Network Routing:');
const router = new NetworkRouter();
router.addRouter('R1', 1000);
router.addRouter('R2', 800);
router.addRouter('R3', 1200);
router.addRouter('R4', 900);

router.addConnection('R1', 'R2', 100, 10); // bandwidth, latency
router.addConnection('R2', 'R3', 150, 15);
router.addConnection('R1', 'R4', 200, 20);
router.addConnection('R4', 'R3', 120, 12);

console.log('Optimal path R1 to R3:', router.findOptimalPath('R1', 'R3'));
console.log('Load balanced path R1 to R3:', router.findLoadBalancedPath('R1', 'R3', 50));

// 6. Web Crawler / PageRank Example
console.log('\n6. Web Crawler / PageRank:');
const webCrawler = new WebCrawler();
webCrawler.addPage('page1.com', 'Home Page', 'Welcome to our site');
webCrawler.addPage('page2.com', 'About Us', 'Learn about our company');
webCrawler.addPage('page3.com', 'Products', 'Our amazing products');
webCrawler.addPage('page4.com', 'Blog', 'Latest news and updates');

webCrawler.addLink('page1.com', 'page2.com');
webCrawler.addLink('page1.com', 'page3.com');
webCrawler.addLink('page2.com', 'page3.com');
webCrawler.addLink('page3.com', 'page4.com');
webCrawler.addLink('page4.com', 'page1.com');

webCrawler.calculatePageRank(20);
console.log('Top pages by PageRank:', webCrawler.getTopPages(3));

// 7. Fraud Detection Example
console.log('\n7. Fraud Detection:');
const fraudSystem = new FraudDetectionSystem();
fraudSystem.addAccount('acc1', 'personal');
fraudSystem.addAccount('acc2', 'business');
fraudSystem.addAccount('acc3', 'personal');
fraudSystem.addAccount('acc4', 'business');

fraudSystem.addTransaction('acc1', 'acc2', 150000, Date.now());
fraudSystem.addTransaction('acc2', 'acc3', 75000, Date.now());
fraudSystem.addTransaction('acc3', 'acc1', 50000, Date.now());
fraudSystem.addTransaction('acc1', 'acc4', 200000, Date.now());

console.log('Suspicious patterns:', fraudSystem.detectSuspiciousPatterns());
console.log('Transaction chain acc1 to acc3:', fraudSystem.findTransactionChain('acc1', 'acc3'));

// 8. Version Control System Example
console.log('\n8. Version Control System:');
const vcs = new VersionControlSystem();
const now = new Date();

vcs.addCommit('commit1', 'Initial commit', 'alice', now.toISOString());
vcs.addCommit('commit2', 'Add login feature', 'bob', new Date(now.getTime() + 3600000).toISOString(), ['commit1']);
vcs.addCommit('commit3', 'Fix bug in login', 'alice', new Date(now.getTime() + 7200000).toISOString(), ['commit2']);
vcs.addCommit('commit4', 'Add user profile', 'charlie', new Date(now.getTime() + 10800000).toISOString(), ['commit2']);
vcs.addCommit('commit5', 'Merge profile feature', 'alice', new Date(now.getTime() + 14400000).toISOString(), ['commit3', 'commit4']);

vcs.createBranch('main', 'commit5');
vcs.createBranch('feature', 'commit4');

console.log('Commit history from commit5:', vcs.getCommitHistory('commit5').slice(0, 3));
console.log('Common ancestor of commit3 and commit4:', vcs.findCommonAncestor('commit3', 'commit4'));

// 9. Compiler Optimization Example
console.log('\n9. Compiler Optimization:');
const compiler = new CompilerOptimizer();
compiler.addBasicBlock('entry', ['load a', 'load b']);
compiler.addBasicBlock('block1', ['add a, b', 'store c']);
compiler.addBasicBlock('block2', ['mul c, 2', 'store d']);
compiler.addBasicBlock('block3', ['print d', 'exit']);
compiler.addBasicBlock('deadblock', ['useless code']);

compiler.addControlFlow('entry', 'block1');
compiler.addControlFlow('block1', 'block2');
compiler.addControlFlow('block2', 'block3');

console.log('Unreachable code blocks:', compiler.findUnreachableCode('entry'));
console.log('Optimized instruction order:', compiler.optimizeInstructionOrder().map(b => b.blockId));
console.log('Dead code blocks:', compiler.detectDeadCode());

// 10. Supply Chain Management Example
console.log('\n10. Supply Chain Management:');
const supplyChain = new SupplyChainManager();
supplyChain.addLocation('warehouse1', 'warehouse', { lat: 40.7128, lng: -74.0060 });
supplyChain.addLocation('warehouse2', 'warehouse', { lat: 34.0522, lng: -118.2437 });
supplyChain.addLocation('store1', 'retail', { lat: 41.8781, lng: -87.6298 });
supplyChain.addLocation('store2', 'retail', { lat: 29.7604, lng: -95.3698 });

supplyChain.addRoute('warehouse1', 'store1', 50, 1000, 2); // cost, capacity, transit time
supplyChain.addRoute('warehouse1', 'store2', 80, 800, 3);
supplyChain.addRoute('warehouse2', 'store1', 90, 600, 4);
supplyChain.addRoute('warehouse2', 'store2', 60, 1200, 2);

// Set inventory levels
supplyChain.updateInventory('warehouse1', 'product_A', 500);
supplyChain.updateInventory('warehouse2', 'product_A', 300);
supplyChain.updateInventory('store1', 'product_A', 50);
supplyChain.updateInventory('store2', 'product_A', 30);

// Define demand
const demand = new Map([
  ['store1', 200],
  ['store2', 150]
]);

console.log('Optimal delivery route warehouse1 to store2:', supplyChain.findOptimalDeliveryRoute('warehouse1', 'store2'));
console.log('Inventory flow optimization:', supplyChain.optimizeInventoryFlow('product_A', demand));

console.log('\n=== Complete Implementation with Examples ===');
console.log('✅ Social Networks - Friend connections and influence analysis');
console.log('✅ Navigation Systems - Route optimization and location services');
console.log('✅ Recommendation Systems - Collaborative filtering algorithms');
console.log('✅ Dependency Resolution - Package management and circular dependency detection');
console.log('✅ Network Routing - Optimal path finding with load balancing');
console.log('✅ Web Crawlers - PageRank algorithm for search engines');
console.log('✅ Fraud Detection - Suspicious transaction pattern analysis');
console.log('✅ Version Control - Git-like commit history and branch management');
console.log('✅ Compiler Optimization - Dead code elimination and instruction ordering');
console.log('✅ Supply Chain Management - Inventory optimization and logistics planning');
console.log('\nAll implementations include practical algorithms and real-world applicable methods!');