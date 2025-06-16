// Base Hash Table Implementation
class HashTable {
    constructor(size = 10) {
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => []);
    }

    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.size;
        }
        return hash;
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        // Check if key already exists
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        
        // Add new key-value pair
        bucket.push([key, value]);
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        
        return undefined;
    }

    delete(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        
        return false;
    }

    has(key) {
        return this.get(key) !== undefined;
    }

    keys() {
        const keys = [];
        for (const bucket of this.buckets) {
            for (const [key] of bucket) {
                keys.push(key);
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (const bucket of this.buckets) {
            for (const [, value] of bucket) {
                values.push(value);
            }
        }
        return values;
    }

    size() {
        let count = 0;
        for (const bucket of this.buckets) {
            count += bucket.length;
        }
        return count;
    }
}

// 1. Database Indexing
class DatabaseIndex {
    constructor() {
        this.primaryKeyIndex = new HashTable(100);
        this.secondaryIndexes = new Map();
    }

    createIndex(columnName) {
        this.secondaryIndexes.set(columnName, new HashTable(100));
    }

    insertRecord(primaryKey, record) {
        // Store in primary key index
        this.primaryKeyIndex.set(primaryKey, record);
        
        // Update secondary indexes
        for (const [columnName, index] of this.secondaryIndexes) {
            if (record[columnName] !== undefined) {
                index.set(record[columnName], primaryKey);
            }
        }
    }

    findByPrimaryKey(primaryKey) {
        return this.primaryKeyIndex.get(primaryKey);
    }

    findByColumn(columnName, value) {
        const index = this.secondaryIndexes.get(columnName);
        if (!index) return null;
        
        const primaryKey = index.get(value);
        return primaryKey ? this.primaryKeyIndex.get(primaryKey) : null;
    }
}

// 2. Caching System
class CacheManager {
    constructor(maxSize = 1000, ttl = 3600000) { // 1 hour TTL
        this.cache = new HashTable(100);
        this.maxSize = maxSize;
        this.ttl = ttl;
        this.accessOrder = [];
    }

    set(key, value) {
        const timestamp = Date.now();
        const cacheEntry = { value, timestamp, accessCount: 1 };
        
        if (!this.cache.has(key) && this.cache.size() >= this.maxSize) {
            this.evictLRU();
        }
        
        this.cache.set(key, cacheEntry);
        this.updateAccessOrder(key);
    }

    get(key) {
        const entry = this.cache.get(key);
        if (!entry) return null;
        
        // Check TTL
        if (Date.now() - entry.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        entry.accessCount++;
        this.updateAccessOrder(key);
        return entry.value;
    }

    updateAccessOrder(key) {
        const index = this.accessOrder.indexOf(key);
        if (index > -1) {
            this.accessOrder.splice(index, 1);
        }
        this.accessOrder.push(key);
    }

    evictLRU() {
        if (this.accessOrder.length > 0) {
            const lruKey = this.accessOrder.shift();
            this.cache.delete(lruKey);
        }
    }

    memoize(fn) {
        return (...args) => {
            const key = JSON.stringify(args);
            let result = this.get(key);
            
            if (result === null) {
                result = fn(...args);
                this.set(key, result);
            }
            
            return result;
        };
    }
}

// 3. Symbol Table for Compiler
class SymbolTable {
    constructor() {
        this.scopes = [new HashTable(50)]; // Stack of scopes
        this.currentScope = 0;
    }

    enterScope() {
        this.scopes.push(new HashTable(50));
        this.currentScope++;
    }

    exitScope() {
        if (this.currentScope > 0) {
            this.scopes.pop();
            this.currentScope--;
        }
    }

    declare(identifier, type, value = null, line = 0) {
        const symbol = {
            type,
            value,
            line,
            scope: this.currentScope,
            declared: true
        };
        
        this.scopes[this.currentScope].set(identifier, symbol);
    }

    lookup(identifier) {
        // Search from current scope up to global scope
        for (let i = this.currentScope; i >= 0; i--) {
            const symbol = this.scopes[i].get(identifier);
            if (symbol) {
                return symbol;
            }
        }
        return null;
    }

    update(identifier, value) {
        const symbol = this.lookup(identifier);
        if (symbol) {
            symbol.value = value;
            return true;
        }
        return false;
    }

    isDeclared(identifier) {
        return this.lookup(identifier) !== null;
    }
}

// 4. Authentication System
class AuthenticationSystem {
    constructor() {
        this.users = new HashTable(100);
        this.sessions = new HashTable(100);
        this.refreshTokens = new HashTable(100);
    }

    hashPassword(password, salt = null) {
        if (!salt) {
            salt = Math.random().toString(36).substring(2, 15);
        }
        
        // Simple hash function (use bcrypt in production)
        let hash = 0;
        const combined = password + salt;
        for (let i = 0; i < combined.length; i++) {
            const char = combined.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        return { hash: hash.toString(), salt };
    }

    registerUser(username, password, email) {
        if (this.users.has(username)) {
            throw new Error('Username already exists');
        }
        
        const { hash, salt } = this.hashPassword(password);
        const user = {
            username,
            email,
            passwordHash: hash,
            salt,
            createdAt: new Date(),
            isActive: true
        };
        
        this.users.set(username, user);
        return true;
    }

    authenticateUser(username, password) {
        const user = this.users.get(username);
        if (!user || !user.isActive) {
            return null;
        }
        
        const { hash } = this.hashPassword(password, user.salt);
        if (hash === user.passwordHash) {
            const sessionToken = this.generateToken();
            const refreshToken = this.generateToken();
            
            const session = {
                username,
                sessionToken,
                refreshToken,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 3600000) // 1 hour
            };
            
            this.sessions.set(sessionToken, session);
            this.refreshTokens.set(refreshToken, username);
            
            return { sessionToken, refreshToken };
        }
        
        return null;
    }

    validateSession(sessionToken) {
        const session = this.sessions.get(sessionToken);
        if (!session) return false;
        
        if (new Date() > session.expiresAt) {
            this.sessions.delete(sessionToken);
            return false;
        }
        
        return session;
    }

    generateToken() {
        return Math.random().toString(36).substring(2) + 
               Date.now().toString(36);
    }
}

// 5. Load Balancer with Consistent Hashing
class ConsistentHashingLoadBalancer {
    constructor() {
        this.ring = new Map(); // Sorted map of hash positions to servers
        this.servers = new Set();
        this.virtualNodes = 3; // Number of virtual nodes per server
    }

    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash * 31 + key.charCodeAt(i)) % 2147483647;
        }
        return hash;
    }

    addServer(serverId) {
        this.servers.add(serverId);
        
        // Add virtual nodes
        for (let i = 0; i < this.virtualNodes; i++) {
            const virtualKey = `${serverId}:${i}`;
            const hash = this.hash(virtualKey);
            this.ring.set(hash, serverId);
        }
        
        // Sort the ring
        this.ring = new Map([...this.ring.entries()].sort());
    }

    removeServer(serverId) {
        this.servers.delete(serverId);
        
        // Remove virtual nodes
        for (let i = 0; i < this.virtualNodes; i++) {
            const virtualKey = `${serverId}:${i}`;
            const hash = this.hash(virtualKey);
            this.ring.delete(hash);
        }
    }

    getServer(key) {
        if (this.ring.size === 0) return null;
        
        const keyHash = this.hash(key);
        
        // Find the first server with hash >= keyHash
        for (const [hash, serverId] of this.ring) {
            if (hash >= keyHash) {
                return serverId;
            }
        }
        
        // If no server found, return the first server (wrap around)
        return this.ring.values().next().value;
    }

    distributeRequests(requests) {
        const distribution = {};
        
        for (const request of requests) {
            const server = this.getServer(request);
            if (!distribution[server]) {
                distribution[server] = [];
            }
            distribution[server].push(request);
        }
        
        return distribution;
    }
}

// 6. Duplicate Detection
class DuplicateDetector {
    constructor() {
        this.seen = new HashTable(1000);
        this.duplicates = new HashTable(100);
    }

    addItem(item) {
        const key = this.generateKey(item);
        
        if (this.seen.has(key)) {
            // Mark as duplicate
            if (!this.duplicates.has(key)) {
                this.duplicates.set(key, []);
            }
            this.duplicates.get(key).push(item);
            return true; // Is duplicate
        } else {
            this.seen.set(key, item);
            return false; // Not duplicate
        }
    }

    generateKey(item) {
        if (typeof item === 'string') {
            return item;
        } else if (typeof item === 'object') {
            return JSON.stringify(item);
        }
        return item.toString();
    }

    getDuplicates() {
        return this.duplicates.values();
    }

    findDuplicatesInArray(array) {
        const duplicates = [];
        
        for (const item of array) {
            if (this.addItem(item)) {
                duplicates.push(item);
            }
        }
        
        return duplicates;
    }

    reset() {
        this.seen = new HashTable(1000);
        this.duplicates = new HashTable(100);
    }
}

// 7. Counting & Frequency Analysis
class FrequencyAnalyzer {
    constructor() {
        this.frequencies = new HashTable(1000);
        this.totalCount = 0;
    }

    addWord(word) {
        const normalizedWord = word.toLowerCase().trim();
        const currentCount = this.frequencies.get(normalizedWord) || 0;
        this.frequencies.set(normalizedWord, currentCount + 1);
        this.totalCount++;
    }

    addText(text) {
        const words = text.split(/\s+/);
        for (const word of words) {
            if (word.length > 0) {
                this.addWord(word);
            }
        }
    }

    getFrequency(word) {
        return this.frequencies.get(word.toLowerCase()) || 0;
    }

    getRelativeFrequency(word) {
        const count = this.getFrequency(word);
        return this.totalCount > 0 ? count / this.totalCount : 0;
    }

    getMostFrequent(n = 10) {
        const words = this.frequencies.keys();
        const wordCounts = words.map(word => ({
            word,
            count: this.frequencies.get(word)
        }));
        
        return wordCounts
            .sort((a, b) => b.count - a.count)
            .slice(0, n);
    }

    getWordCloud() {
        const words = this.frequencies.keys();
        return words.map(word => ({
            text: word,
            size: this.frequencies.get(word)
        }));
    }
}

// 8. Distributed Key-Value Store
class DistributedKeyValueStore {
    constructor(nodeId, replicationFactor = 3) {
        this.nodeId = nodeId;
        this.replicationFactor = replicationFactor;
        this.localStore = new HashTable(1000);
        this.nodes = new Map(); // nodeId -> node object
        this.ring = new Map(); // hash -> nodeId (consistent hashing)
    }

    addNode(nodeId, nodeInfo) {
        this.nodes.set(nodeId, nodeInfo);
        
        // Add to consistent hashing ring
        for (let i = 0; i < 3; i++) { // 3 virtual nodes
            const virtualKey = `${nodeId}:${i}`;
            const hash = this.hash(virtualKey);
            this.ring.set(hash, nodeId);
        }
        
        // Sort ring
        this.ring = new Map([...this.ring.entries()].sort());
    }

    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash * 31 + key.charCodeAt(i)) % 2147483647;
        }
        return hash;
    }

    getPreferenceList(key) {
        const keyHash = this.hash(key);
        const nodes = [];
        const ringArray = [...this.ring.entries()];
        
        // Find starting position
        let startIndex = 0;
        for (let i = 0; i < ringArray.length; i++) {
            if (ringArray[i][0] >= keyHash) {
                startIndex = i;
                break;
            }
        }
        
        // Get N unique nodes
        const uniqueNodes = new Set();
        let index = startIndex;
        
        while (uniqueNodes.size < this.replicationFactor && uniqueNodes.size < this.nodes.size) {
            const nodeId = ringArray[index % ringArray.length][1];
            uniqueNodes.add(nodeId);
            index++;
        }
        
        return [...uniqueNodes];
    }

    put(key, value) {
        const preferenceList = this.getPreferenceList(key);
        const timestamp = Date.now();
        const entry = { value, timestamp, version: 1 };
        
        // Store locally if this node is in preference list
        if (preferenceList.includes(this.nodeId)) {
            this.localStore.set(key, entry);
        }
        
        // In a real implementation, you would replicate to other nodes
        return { success: true, replicas: preferenceList };
    }

    get(key) {
        const entry = this.localStore.get(key);
        if (entry) {
            return entry.value;
        }
        
        // In a real implementation, you would check other replicas
        return null;
    }

    delete(key) {
        const success = this.localStore.delete(key);
        // In a real implementation, you would propagate deletion
        return success;
    }

    getLocalKeys() {
        return this.localStore.keys();
    }
}

// Usage Examples and Tests
class HashTableDemo {
    static runAllDemos() {
        console.log("=== Hash Table Use Cases Demo ===\n");
        
        // 1. Database Indexing Demo
        console.log("1. Database Indexing:");
        const db = new DatabaseIndex();
        db.createIndex('email');
        db.createIndex('age');
        
        db.insertRecord('user1', { name: 'John', email: 'john@example.com', age: 30 });
        db.insertRecord('user2', { name: 'Jane', email: 'jane@example.com', age: 25 });
        
        console.log("Find by primary key:", db.findByPrimaryKey('user1'));
        console.log("Find by email:", db.findByColumn('email', 'jane@example.com'));
        console.log();
        
        // 2. Caching Demo
        console.log("2. Caching System:");
        const cache = new CacheManager();
        const expensiveFunction = cache.memoize((n) => {
            console.log(`Computing fibonacci(${n})`);
            return n <= 1 ? n : expensiveFunction(n-1) + expensiveFunction(n-2);
        });
        
        console.log("First call:", expensiveFunction(10));
        console.log("Second call (cached):", expensiveFunction(10));
        console.log();
        
        // 3. Symbol Table Demo
        console.log("3. Symbol Table:");
        const symbolTable = new SymbolTable();
        symbolTable.declare('x', 'int', 10);
        symbolTable.enterScope();
        symbolTable.declare('y', 'string', 'hello');
        
        console.log("Lookup x:", symbolTable.lookup('x'));
        console.log("Lookup y:", symbolTable.lookup('y'));
        symbolTable.exitScope();
        console.log("Lookup y after scope exit:", symbolTable.lookup('y'));
        console.log();
        
        // 4. Authentication Demo
        console.log("4. Authentication System:");
        const auth = new AuthenticationSystem();
        auth.registerUser('testuser', 'password123', 'test@example.com');
        const tokens = auth.authenticateUser('testuser', 'password123');
        console.log("Authentication successful:", !!tokens);
        console.log("Session valid:", !!auth.validateSession(tokens?.sessionToken));
        console.log();
        
        // 5. Load Balancer Demo
        console.log("5. Load Balancer:");
        const lb = new ConsistentHashingLoadBalancer();
        lb.addServer('server1');
        lb.addServer('server2');
        lb.addServer('server3');
        
        const requests = ['user1', 'user2', 'user3', 'user4', 'user5'];
        const distribution = lb.distributeRequests(requests);
        console.log("Request distribution:", distribution);
        console.log();
        
        // 6. Duplicate Detection Demo
        console.log("6. Duplicate Detection:");
        const detector = new DuplicateDetector();
        const data = ['apple', 'banana', 'apple', 'orange', 'banana', 'grape'];
        const duplicates = detector.findDuplicatesInArray(data);
        console.log("Duplicates found:", duplicates);
        console.log();
        
        // 7. Frequency Analysis Demo
        console.log("7. Frequency Analysis:");
        const analyzer = new FrequencyAnalyzer();
        analyzer.addText("the quick brown fox jumps over the lazy dog the fox is quick");
        console.log("Most frequent words:", analyzer.getMostFrequent(5));
        console.log("Frequency of 'the':", analyzer.getFrequency('the'));
        console.log();
        
        // 8. Distributed Store Demo
        console.log("8. Distributed Key-Value Store:");
        const store = new DistributedKeyValueStore('node1');
        store.addNode('node1', { ip: '192.168.1.1', port: 8001 });
        store.addNode('node2', { ip: '192.168.1.2', port: 8002 });
        store.addNode('node3', { ip: '192.168.1.3', port: 8003 });
        
        const putResult = store.put('mykey', 'myvalue');
        console.log("Put result:", putResult);
        console.log("Get value:", store.get('mykey'));
        console.log("Local keys:", store.getLocalKeys());
    }
}

// Run the demo
HashTableDemo.runAllDemos();