// =============================================================================
// 1. DATABASE INDEXING - B+ TREE IMPLEMENTATION
// =============================================================================

class BPlusTreeNode {
    constructor(isLeaf = false, order = 3) {
        this.isLeaf = isLeaf;
        this.keys = [];
        this.values = []; // Only used in leaf nodes
        this.children = []; // Only used in internal nodes
        this.next = null; // Only used in leaf nodes for linked list
        this.order = order;
        this.maxKeys = order - 1;
    }

    isFull() {
        return this.keys.length >= this.maxKeys;
    }

    insertKey(key, value = null, child = null) {
        let i = 0;
        while (i < this.keys.length && key > this.keys[i]) {
            i++;
        }
        
        this.keys.splice(i, 0, key);
        
        if (this.isLeaf) {
            this.values.splice(i, 0, value);
        } else if (child) {
            this.children.splice(i + 1, 0, child);
        }
    }
}

class BPlusTree {
    constructor(order = 3) {
        this.root = new BPlusTreeNode(true, order);
        this.order = order;
    }

    search(key) {
        return this._searchHelper(this.root, key);
    }

    _searchHelper(node, key) {
        if (node.isLeaf) {
            const index = node.keys.indexOf(key);
            return index !== -1 ? node.values[index] : null;
        }

        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) {
            i++;
        }
        return this._searchHelper(node.children[i], key);
    }

    insert(key, value) {
        if (this.root.isFull()) {
            const newRoot = new BPlusTreeNode(false, this.order);
            newRoot.children.push(this.root);
            this._splitChild(newRoot, 0);
            this.root = newRoot;
        }
        this._insertNonFull(this.root, key, value);
    }

    _insertNonFull(node, key, value) {
        if (node.isLeaf) {
            node.insertKey(key, value);
        } else {
            let i = 0;
            while (i < node.keys.length && key > node.keys[i]) {
                i++;
            }

            if (node.children[i].isFull()) {
                this._splitChild(node, i);
                if (key > node.keys[i]) {
                    i++;
                }
            }
            this._insertNonFull(node.children[i], key, value);
        }
    }

    _splitChild(parent, index) {
        const fullChild = parent.children[index];
        const newChild = new BPlusTreeNode(fullChild.isLeaf, this.order);
        const mid = Math.floor(fullChild.maxKeys / 2);

        // Move half the keys to new node
        newChild.keys = fullChild.keys.splice(mid + (fullChild.isLeaf ? 0 : 1));
        
        if (fullChild.isLeaf) {
            newChild.values = fullChild.values.splice(mid);
            newChild.next = fullChild.next;
            fullChild.next = newChild;
            parent.insertKey(fullChild.keys[mid], null, newChild);
        } else {
            newChild.children = fullChild.children.splice(mid + 1);
            parent.insertKey(fullChild.keys[mid], null, newChild);
            fullChild.keys.splice(mid, 1);
        }
    }

    rangeQuery(startKey, endKey) {
        const results = [];
        let current = this._findLeafNode(startKey);
        
        while (current) {
            for (let i = 0; i < current.keys.length; i++) {
                if (current.keys[i] >= startKey && current.keys[i] <= endKey) {
                    results.push({ key: current.keys[i], value: current.values[i] });
                } else if (current.keys[i] > endKey) {
                    return results;
                }
            }
            current = current.next;
        }
        return results;
    }

    _findLeafNode(key) {
        let current = this.root;
        while (!current.isLeaf) {
            let i = 0;
            while (i < current.keys.length && key > current.keys[i]) {
                i++;
            }
            current = current.children[i];
        }
        return current;
    }

    printTree() {
        const levels = [];
        this._collectLevels(this.root, 0, levels);
        levels.forEach((level, i) => {
            console.log(`Level ${i}:`, level.map(node => node.keys).join(' | '));
        });
    }

    _collectLevels(node, level, levels) {
        if (!levels[level]) levels[level] = [];
        levels[level].push(node);
        
        if (!node.isLeaf) {
            node.children.forEach(child => {
                this._collectLevels(child, level + 1, levels);
            });
        }
    }
}

// =============================================================================
// 2. NETWORK ROUTING - HIERARCHICAL ROUTING TABLE
// =============================================================================

class RoutingNode {
    constructor(networkId, mask = 32) {
        this.networkId = networkId; // e.g., "192.168.1.0"
        this.mask = mask; // CIDR notation
        this.gateway = null;
        this.interface = null;
        this.metric = 0;
        this.children = new Map(); // Map<string, RoutingNode>
        this.parent = null;
        this.isLeaf = true;
    }

    addChild(child) {
        this.children.set(child.networkId, child);
        child.parent = this;
        this.isLeaf = false;
    }

    getNetworkAddress() {
        return `${this.networkId}/${this.mask}`;
    }
}

class HierarchicalRoutingTable {
    constructor() {
        this.root = new RoutingNode("0.0.0.0", 0); // Default route
        this.routes = new Map(); // Fast lookup cache
    }

    addRoute(networkId, mask, gateway, interfaceName, metric = 1) {
        const route = new RoutingNode(networkId, mask);
        route.gateway = gateway;
        route.interface = interfaceName;
        route.metric = metric;

        // Add to cache for fast lookup
        this.routes.set(`${networkId}/${mask}`, route);

        // Insert into hierarchy
        this._insertIntoHierarchy(route);
        return route;
    }

    _insertIntoHierarchy(newRoute) {
        let current = this.root;
        const newNetworkBits = this._getNetworkBits(newRoute.networkId, newRoute.mask);

        // Find the best parent (longest matching prefix)
        let bestParent = this.root;
        
        for (const [key, existingRoute] of this.routes) {
            if (existingRoute === newRoute) continue;
            
            const existingBits = this._getNetworkBits(existingRoute.networkId, existingRoute.mask);
            
            // Check if existing route is a potential parent
            if (existingRoute.mask < newRoute.mask && 
                this._isSubnet(newNetworkBits, existingBits, existingRoute.mask)) {
                if (existingRoute.mask > bestParent.mask) {
                    bestParent = existingRoute;
                }
            }
        }

        bestParent.addChild(newRoute);

        // Check if any existing routes should become children of this new route
        const childrenToMove = [];
        for (const [key, existingRoute] of this.routes) {
            if (existingRoute === newRoute || existingRoute.parent !== bestParent) continue;
            
            const existingBits = this._getNetworkBits(existingRoute.networkId, existingRoute.mask);
            
            if (newRoute.mask < existingRoute.mask && 
                this._isSubnet(existingBits, newNetworkBits, newRoute.mask)) {
                childrenToMove.push(existingRoute);
            }
        }

        // Move children
        childrenToMove.forEach(child => {
            bestParent.children.delete(child.networkId);
            newRoute.addChild(child);
        });
    }

    _getNetworkBits(ip, mask) {
        const parts = ip.split('.').map(Number);
        const ipInt = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
        const maskInt = (0xFFFFFFFF << (32 - mask)) >>> 0;
        return (ipInt & maskInt) >>> 0;
    }

    _isSubnet(targetBits, networkBits, mask) {
        const maskInt = (0xFFFFFFFF << (32 - mask)) >>> 0;
        return (targetBits & maskInt) === (networkBits & maskInt);
    }

    findRoute(targetIp) {
        const targetBits = this._getNetworkBits(targetIp, 32);
        return this._findBestMatch(this.root, targetBits, null);
    }

    _findBestMatch(node, targetBits, bestMatch) {
        // Check if current node matches
        if (node.gateway && node.networkId !== "0.0.0.0") {
            const nodeBits = this._getNetworkBits(node.networkId, node.mask);
            if (this._isSubnet(targetBits, nodeBits, node.mask)) {
                bestMatch = node;
            }
        } else if (node.networkId === "0.0.0.0" && !bestMatch) {
            bestMatch = node; // Default route
        }

        // Check children
        for (const child of node.children.values()) {
            const childBits = this._getNetworkBits(child.networkId, child.mask);
            if (this._isSubnet(targetBits, childBits, child.mask)) {
                bestMatch = this._findBestMatch(child, targetBits, bestMatch);
            }
        }

        return bestMatch;
    }

    optimizeMulticast(multicastGroup, sourceIp) {
        const multicastTree = new Map();
        const visitedNodes = new Set();

        // Build spanning tree for multicast delivery
        this._buildMulticastTree(this.root, multicastGroup, sourceIp, multicastTree, visitedNodes);
        return multicastTree;
    }

    _buildMulticastTree(node, group, source, tree, visited) {
        if (visited.has(node.networkId)) return;
        visited.add(node.networkId);

        const routeInfo = {
            networkId: node.networkId,
            interface: node.interface,
            children: [],
            isForwarder: false
        };

        // Determine if this node should forward multicast traffic
        if (node.children.size > 0 || this._hasMulticastMembers(node, group)) {
            routeInfo.isForwarder = true;
        }

        tree.set(node.networkId, routeInfo);

        // Process children
        for (const child of node.children.values()) {
            this._buildMulticastTree(child, group, source, tree, visited);
            if (tree.get(child.networkId)?.isForwarder) {
                routeInfo.children.push(child.networkId);
            }
        }
    }

    _hasMulticastMembers(node, group) {
        // Simplified: assume leaf networks may have multicast members
        return node.isLeaf && Math.random() > 0.7; // 30% chance for demo
    }

    printRoutingTable() {
        console.log("Hierarchical Routing Table:");
        this._printNode(this.root, 0);
    }

    _printNode(node, depth) {
        const indent = "  ".repeat(depth);
        const route = node.gateway ? 
            `${node.getNetworkAddress()} via ${node.gateway} dev ${node.interface}` :
            `${node.getNetworkAddress()} (root)`;
        console.log(`${indent}${route}`);
        
        for (const child of node.children.values()) {
            this._printNode(child, depth + 1);
        }
    }
}

// =============================================================================
// 3. XML/JSON DATA REPRESENTATION - DOCUMENT TREE
// =============================================================================

class DocumentNode {
    constructor(type, name = null, value = null) {
        this.type = type; // 'element', 'text', 'attribute', 'array', 'object'
        this.name = name;
        this.value = value;
        this.attributes = new Map();
        this.children = [];
        this.parent = null;
    }

    addChild(child) {
        child.parent = this;
        this.children.push(child);
        return child;
    }

    addAttribute(name, value) {
        this.attributes.set(name, value);
    }

    getPath() {
        const path = [];
        let current = this;
        while (current && current.name) {
            if (current.type === 'array') {
                const index = current.parent ? 
                    current.parent.children.indexOf(current) : 0;
                path.unshift(`[${index}]`);
            } else {
                path.unshift(current.name);
            }
            current = current.parent;
        }
        return path.join('.');
    }
}

class DocumentTree {
    constructor() {
        this.root = null;
    }

    parseJSON(jsonString) {
        const data = JSON.parse(jsonString);
        this.root = this._buildFromJSON(data, 'root');
        return this.root;
    }

    _buildFromJSON(data, name, parent = null) {
        let node;

        if (Array.isArray(data)) {
            node = new DocumentNode('array', name);
            data.forEach((item, index) => {
                const child = this._buildFromJSON(item, index.toString(), node);
                node.addChild(child);
            });
        } else if (typeof data === 'object' && data !== null) {
            node = new DocumentNode('object', name);
            Object.entries(data).forEach(([key, value]) => {
                const child = this._buildFromJSON(value, key, node);
                node.addChild(child);
            });
        } else {
            node = new DocumentNode('text', name, data);
        }

        return node;
    }

    parseXML(xmlString) {
        // Simplified XML parser (in real implementation, use DOMParser)
        const parser = new SimpleXMLParser();
        this.root = parser.parse(xmlString);
        return this.root;
    }

    // JSONPath-like query implementation
    query(path) {
        if (!this.root) return [];
        
        const parts = this._parsePath(path);
        return this._executeQuery(this.root, parts, 0);
    }

    _parsePath(path) {
        // Simple path parser: $.store.book[*].title
        const parts = [];
        const tokens = path.split(/[.\[\]]/).filter(t => t);
        
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token === '$') continue;
            
            if (token === '*') {
                parts.push({ type: 'wildcard' });
            } else if (/^\d+$/.test(token)) {
                parts.push({ type: 'index', value: parseInt(token) });
            } else {
                parts.push({ type: 'property', value: token });
            }
        }
        
        return parts;
    }

    _executeQuery(node, parts, partIndex) {
        if (partIndex >= parts.length) {
            return [node];
        }

        const part = parts[partIndex];
        const results = [];

        switch (part.type) {
            case 'property':
                const child = node.children.find(c => c.name === part.value);
                if (child) {
                    results.push(...this._executeQuery(child, parts, partIndex + 1));
                }
                break;

            case 'index':
                if (node.type === 'array' && part.value < node.children.length) {
                    results.push(...this._executeQuery(node.children[part.value], parts, partIndex + 1));
                }
                break;

            case 'wildcard':
                node.children.forEach(child => {
                    results.push(...this._executeQuery(child, parts, partIndex + 1));
                });
                break;
        }

        return results;
    }

    // XPath-like query for XML
    xpath(expression) {
        if (!this.root) return [];
        
        // Simplified XPath: //element[@attr='value']
        const results = [];
        this._xpathHelper(this.root, expression, results);
        return results;
    }

    _xpathHelper(node, expression, results) {
        // Simple XPath implementation for demonstration
        if (expression.startsWith('//')) {
            const elementName = expression.substring(2);
            if (node.name === elementName || elementName === '*') {
                results.push(node);
            }
            node.children.forEach(child => {
                this._xpathHelper(child, expression, results);
            });
        }
    }

    // Get all paths in the document
    getAllPaths() {
        const paths = [];
        if (this.root) {
            this._collectPaths(this.root, paths);
        }
        return paths;
    }

    _collectPaths(node, paths) {
        if (node.type === 'text') {
            paths.push({
                path: node.getPath(),
                value: node.value,
                type: typeof node.value
            });
        }

        node.children.forEach(child => {
            this._collectPaths(child, paths);
        });
    }

    printTree() {
        if (this.root) {
            this._printNode(this.root, 0);
        }
    }

    _printNode(node, depth) {
        const indent = "  ".repeat(depth);
        let nodeStr = `${indent}${node.type}`;
        
        if (node.name) {
            nodeStr += `: ${node.name}`;
        }
        
        if (node.value !== null && node.value !== undefined) {
            nodeStr += ` = ${JSON.stringify(node.value)}`;
        }

        if (node.attributes.size > 0) {
            const attrs = Array.from(node.attributes.entries())
                .map(([k, v]) => `${k}="${v}"`)
                .join(' ');
            nodeStr += ` [${attrs}]`;
        }

        console.log(nodeStr);
        
        node.children.forEach(child => {
            this._printNode(child, depth + 1);
        });
    }
}

// Simple XML Parser for demonstration
class SimpleXMLParser {
    parse(xmlString) {
        // This is a very simplified XML parser
        // In production, use DOMParser or a proper XML library
        const root = new DocumentNode('element', 'document');
        
        // Mock parsing - in real implementation, this would be much more complex
        const mockData = {
            store: {
                book: [
                    { title: "Book 1", author: "Author 1", price: 29.99 },
                    { title: "Book 2", author: "Author 2", price: 39.99 }
                ]
            }
        };
        
        return this._buildFromObject(mockData, 'root');
    }

    _buildFromObject(obj, name) {
        const node = new DocumentNode('element', name);
        
        if (typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
                obj.forEach((item, index) => {
                    const child = this._buildFromObject(item, `item[${index}]`);
                    node.addChild(child);
                });
            } else {
                Object.entries(obj).forEach(([key, value]) => {
                    const child = this._buildFromObject(value, key);
                    node.addChild(child);
                });
            }
        } else {
            node.value = obj;
            node.type = 'text';
        }
        
        return node;
    }
}

// =============================================================================
// USAGE EXAMPLES AND TESTING
// =============================================================================

// Example usage:
console.log("=== B+ Tree Database Index Example ===");
const btree = new BPlusTree(4);
btree.insert(10, "Record 10");
btree.insert(20, "Record 20");
btree.insert(5, "Record 5");
btree.insert(15, "Record 15");
btree.insert(25, "Record 25");
btree.insert(30, "Record 30");

console.log("Search for key 15:", btree.search(15));
console.log("Range query 10-25:", btree.rangeQuery(10, 25));
btree.printTree();

console.log("\n=== Hierarchical Routing Table Example ===");
const routingTable = new HierarchicalRoutingTable();
routingTable.addRoute("192.168.0.0", 16, "10.0.0.1", "eth0", 1);
routingTable.addRoute("192.168.1.0", 24, "192.168.0.1", "eth1", 1);
routingTable.addRoute("192.168.1.128", 25, "192.168.1.1", "eth2", 1);
routingTable.addRoute("10.0.0.0", 8, "172.16.0.1", "eth3", 2);

const route = routingTable.findRoute("192.168.1.150");
console.log("Route for 192.168.1.150:", route ? route.getNetworkAddress() : "No route");
routingTable.printRoutingTable();

console.log("\n=== Document Tree JSON Example ===");
const docTree = new DocumentTree();
const jsonData = `{
    "store": {
        "book": [
            {"title": "JavaScript Guide", "author": "John Doe", "price": 29.99},
            {"title": "Python Basics", "author": "Jane Smith", "price": 24.99}
        ],
        "bicycle": {"color": "red", "price": 299.99}
    }
}`;

docTree.parseJSON(jsonData);
console.log("Query $.store.book[*].title:");
const titles = docTree.query("$.store.book.*.title");
titles.forEach(node => console.log("  -", node.value));

console.log("\nAll paths in document:");
docTree.getAllPaths().forEach(path => {
    console.log(`  ${path.path}: ${path.value} (${path.type})`);
});

docTree.printTree();