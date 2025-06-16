// Base Hash Table with configurable collision resolution
class HashTable {
    constructor(initialCapacity = 16, strategy = 'chaining') {
        this.capacity = initialCapacity;
        this.size = 0;
        this.strategy = strategy;
        this.loadFactorThreshold = 0.75;
        this.shrinkThreshold = 0.25;
        this.minCapacity = 8;
        
        this._initializeStorage();
    }
    
    _initializeStorage() {
        switch (this.strategy) {
            case 'chaining':
                this.buckets = new Array(this.capacity);
                for (let i = 0; i < this.capacity; i++) {
                    this.buckets[i] = [];
                }
                break;
            case 'linear':
            case 'quadratic':
            case 'double':
            case 'robinhood':
                this.buckets = new Array(this.capacity);
                this.deleted = new Array(this.capacity).fill(false);
                break;
        }
    }
    
    // Hash functions
    _hash1(key) {
        let hash = 5381;
        const str = String(key);
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
        }
        return Math.abs(hash) % this.capacity;
    }
    
    _hash2(key) {
        let hash = 7;
        const str = String(key);
        for (let i = 0; i < str.length; i++) {
            hash = hash * 31 + str.charCodeAt(i);
        }
        return 7 - (Math.abs(hash) % 7); // For double hashing
    }
    
    // Collision resolution methods
    _probe(key, attempt = 0) {
        const hash1 = this._hash1(key);
        
        switch (this.strategy) {
            case 'linear':
                return (hash1 + attempt) % this.capacity;
            case 'quadratic':
                return (hash1 + attempt * attempt) % this.capacity;
            case 'double':
                const hash2 = this._hash2(key);
                return (hash1 + attempt * hash2) % this.capacity;
            default:
                return hash1;
        }
    }
    
    // Resize table
    _resize(newCapacity) {
        const oldBuckets = this.buckets;
        const oldDeleted = this.deleted;
        const oldCapacity = this.capacity;
        
        this.capacity = newCapacity;
        this.size = 0;
        this._initializeStorage();
        
        // Rehash all existing entries
        if (this.strategy === 'chaining') {
            for (const bucket of oldBuckets) {
                for (const [key, value] of bucket) {
                    this.set(key, value);
                }
            }
        } else {
            for (let i = 0; i < oldCapacity; i++) {
                if (oldBuckets[i] && !oldDeleted[i]) {
                    this.set(oldBuckets[i][0], oldBuckets[i][1]);
                }
            }
        }
    }
    
    // Check if resize is needed
    _checkResize() {
        const loadFactor = this.size / this.capacity;
        
        if (loadFactor > this.loadFactorThreshold) {
            this._resize(this.capacity * 2);
        } else if (loadFactor < this.shrinkThreshold && this.capacity > this.minCapacity) {
            this._resize(Math.max(this.capacity / 2, this.minCapacity));
        }
    }
    
    // Set key-value pair
    set(key, value) {
        if (this.strategy === 'chaining') {
            return this._setChaining(key, value);
        } else if (this.strategy === 'robinhood') {
            return this._setRobinHood(key, value);
        } else {
            return this._setOpenAddressing(key, value);
        }
    }
    
    _setChaining(key, value) {
        const index = this._hash1(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        
        bucket.push([key, value]);
        this.size++;
        this._checkResize();
    }
    
    _setOpenAddressing(key, value) {
        let attempt = 0;
        
        while (attempt < this.capacity) {
            const index = this._probe(key, attempt);
            
            if (!this.buckets[index] || this.deleted[index] || this.buckets[index][0] === key) {
                const isUpdate = this.buckets[index] && this.buckets[index][0] === key && !this.deleted[index];
                
                this.buckets[index] = [key, value];
                this.deleted[index] = false;
                
                if (!isUpdate) {
                    this.size++;
                    this._checkResize();
                }
                return;
            }
            
            attempt++;
        }
        
        throw new Error('Hash table is full');
    }
    
    _setRobinHood(key, value, distance = 0) {
        let attempt = 0;
        let currentKey = key;
        let currentValue = value;
        let currentDistance = distance;
        
        while (attempt < this.capacity) {
            const index = this._probe(currentKey, attempt);
            
            if (!this.buckets[index] || this.deleted[index]) {
                this.buckets[index] = [currentKey, currentValue, currentDistance];
                this.deleted[index] = false;
                this.size++;
                this._checkResize();
                return;
            }
            
            const [existingKey, existingValue, existingDistance] = this.buckets[index];
            
            if (existingKey === currentKey) {
                this.buckets[index] = [currentKey, currentValue, currentDistance];
                return;
            }
            
            // Robin Hood: if current entry has traveled farther, swap
            if (currentDistance > existingDistance) {
                this.buckets[index] = [currentKey, currentValue, currentDistance];
                currentKey = existingKey;
                currentValue = existingValue;
                currentDistance = existingDistance;
            }
            
            attempt++;
            currentDistance++;
        }
        
        throw new Error('Hash table is full');
    }
    
    // Get value by key
    get(key) {
        if (this.strategy === 'chaining') {
            return this._getChaining(key);
        } else {
            return this._getOpenAddressing(key);
        }
    }
    
    _getChaining(key) {
        const index = this._hash1(key);
        const bucket = this.buckets[index];
        
        for (const [k, v] of bucket) {
            if (k === key) return v;
        }
        
        return undefined;
    }
    
    _getOpenAddressing(key) {
        let attempt = 0;
        
        while (attempt < this.capacity) {
            const index = this._probe(key, attempt);
            
            if (!this.buckets[index]) return undefined;
            
            if (!this.deleted[index] && this.buckets[index][0] === key) {
                return this.buckets[index][1];
            }
            
            attempt++;
        }
        
        return undefined;
    }
    
    // Delete key
    delete(key) {
        if (this.strategy === 'chaining') {
            return this._deleteChaining(key);
        } else {
            return this._deleteOpenAddressing(key);
        }
    }
    
    _deleteChaining(key) {
        const index = this._hash1(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                this._checkResize();
                return true;
            }
        }
        
        return false;
    }
    
    _deleteOpenAddressing(key) {
        let attempt = 0;
        
        while (attempt < this.capacity) {
            const index = this._probe(key, attempt);
            
            if (!this.buckets[index]) return false;
            
            if (!this.deleted[index] && this.buckets[index][0] === key) {
                this.deleted[index] = true;
                this.size--;
                this._checkResize();
                return true;
            }
            
            attempt++;
        }
        
        return false;
    }
    
    // Check if key exists
    has(key) {
        return this.get(key) !== undefined;
    }
    
    // Get all keys
    keys() {
        const keys = [];
        
        if (this.strategy === 'chaining') {
            for (const bucket of this.buckets) {
                for (const [key] of bucket) {
                    keys.push(key);
                }
            }
        } else {
            for (let i = 0; i < this.capacity; i++) {
                if (this.buckets[i] && !this.deleted[i]) {
                    keys.push(this.buckets[i][0]);
                }
            }
        }
        
        return keys;
    }
    
    // Get statistics
    getStats() {
        let maxChainLength = 0;
        let nonEmptyBuckets = 0;
        let totalProbeDistance = 0;
        
        if (this.strategy === 'chaining') {
            for (const bucket of this.buckets) {
                if (bucket.length > 0) {
                    nonEmptyBuckets++;
                    maxChainLength = Math.max(maxChainLength, bucket.length);
                }
            }
        } else {
            for (let i = 0; i < this.capacity; i++) {
                if (this.buckets[i] && !this.deleted[i]) {
                    nonEmptyBuckets++;
                    if (this.strategy === 'robinhood' && this.buckets[i][2] !== undefined) {
                        totalProbeDistance += this.buckets[i][2];
                    }
                }
            }
        }
        
        return {
            size: this.size,
            capacity: this.capacity,
            loadFactor: this.size / this.capacity,
            strategy: this.strategy,
            nonEmptyBuckets,
            maxChainLength,
            averageProbeDistance: this.strategy === 'robinhood' ? totalProbeDistance / this.size : 'N/A'
        };
    }
}

// Cuckoo Hashing Implementation
class CuckooHashTable {
    constructor(initialCapacity = 16) {
        this.capacity = initialCapacity;
        this.size = 0;
        this.maxAttempts = Math.log2(this.capacity) * 4;
        this.table1 = new Array(this.capacity);
        this.table2 = new Array(this.capacity);
    }
    
    _hash1(key) {
        let hash = 5381;
        const str = String(key);
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
        }
        return Math.abs(hash) % this.capacity;
    }
    
    _hash2(key) {
        let hash = 7919;
        const str = String(key);
        for (let i = 0; i < str.length; i++) {
            hash = hash * 31 + str.charCodeAt(i);
        }
        return Math.abs(hash) % this.capacity;
    }
    
    set(key, value) {
        if (this.get(key) !== undefined) {
            // Update existing key
            const index1 = this._hash1(key);
            const index2 = this._hash2(key);
            
            if (this.table1[index1] && this.table1[index1][0] === key) {
                this.table1[index1][1] = value;
            } else if (this.table2[index2] && this.table2[index2][0] === key) {
                this.table2[index2][1] = value;
            }
            return;
        }
        
        let currentKey = key;
        let currentValue = value;
        let table = 1;
        
        for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
            const index = table === 1 ? this._hash1(currentKey) : this._hash2(currentKey);
            const targetTable = table === 1 ? this.table1 : this.table2;
            
            if (!targetTable[index]) {
                targetTable[index] = [currentKey, currentValue];
                this.size++;
                return;
            }
            
            // Kick out existing element
            const [kickedKey, kickedValue] = targetTable[index];
            targetTable[index] = [currentKey, currentValue];
            
            currentKey = kickedKey;
            currentValue = kickedValue;
            table = table === 1 ? 2 : 1;
        }
        
        // Rehash if insertion failed
        this._rehash();
        this.set(key, value);
    }
    
    get(key) {
        const index1 = this._hash1(key);
        const index2 = this._hash2(key);
        
        if (this.table1[index1] && this.table1[index1][0] === key) {
            return this.table1[index1][1];
        }
        
        if (this.table2[index2] && this.table2[index2][0] === key) {
            return this.table2[index2][1];
        }
        
        return undefined;
    }
    
    delete(key) {
        const index1 = this._hash1(key);
        const index2 = this._hash2(key);
        
        if (this.table1[index1] && this.table1[index1][0] === key) {
            this.table1[index1] = null;
            this.size--;
            return true;
        }
        
        if (this.table2[index2] && this.table2[index2][0] === key) {
            this.table2[index2] = null;
            this.size--;
            return true;
        }
        
        return false;
    }
    
    _rehash() {
        const oldTable1 = this.table1;
        const oldTable2 = this.table2;
        
        this.capacity *= 2;
        this.maxAttempts = Math.log2(this.capacity) * 4;
        this.table1 = new Array(this.capacity);
        this.table2 = new Array(this.capacity);
        this.size = 0;
        
        for (const entry of [...oldTable1, ...oldTable2]) {
            if (entry) {
                this.set(entry[0], entry[1]);
            }
        }
    }
    
    has(key) {
        return this.get(key) !== undefined;
    }
}

// Consistent Hashing Implementation
class ConsistentHashTable {
    constructor(nodes = [], virtualNodes = 150) {
        this.virtualNodes = virtualNodes;
        this.ring = new Map(); // position -> node
        this.nodes = new Set();
        
        for (const node of nodes) {
            this.addNode(node);
        }
    }
    
    _hash(key) {
        let hash = 0;
        const str = String(key);
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }
    
    addNode(node) {
        this.nodes.add(node);
        
        for (let i = 0; i < this.virtualNodes; i++) {
            const virtualNodeKey = `${node}:${i}`;
            const position = this._hash(virtualNodeKey);
            this.ring.set(position, node);
        }
    }
    
    removeNode(node) {
        this.nodes.delete(node);
        
        for (let i = 0; i < this.virtualNodes; i++) {
            const virtualNodeKey = `${node}:${i}`;
            const position = this._hash(virtualNodeKey);
            this.ring.delete(position);
        }
    }
    
    getNode(key) {
        if (this.ring.size === 0) return null;
        
        const keyHash = this._hash(key);
        const positions = Array.from(this.ring.keys()).sort((a, b) => a - b);
        
        // Find the first position greater than or equal to keyHash
        for (const position of positions) {
            if (position >= keyHash) {
                return this.ring.get(position);
            }
        }
        
        // Wrap around to the first position
        return this.ring.get(positions[0]);
    }
    
    getDistribution() {
        const distribution = {};
        const testKeys = [];
        
        // Generate test keys
        for (let i = 0; i < 10000; i++) {
            testKeys.push(`key${i}`);
        }
        
        // Count assignments
        for (const key of testKeys) {
            const node = this.getNode(key);
            distribution[node] = (distribution[node] || 0) + 1;
        }
        
        return distribution;
    }
}

// Bloom Filter Implementation
class BloomFilter {
    constructor(expectedElements = 1000, falsePositiveRate = 0.01) {
        this.expectedElements = expectedElements;
        this.falsePositiveRate = falsePositiveRate;
        
        // Calculate optimal parameters
        this.bitArraySize = Math.ceil(-(expectedElements * Math.log(falsePositiveRate)) / (Math.log(2) ** 2));
        this.numHashFunctions = Math.ceil((this.bitArraySize / expectedElements) * Math.log(2));
        
        this.bitArray = new Array(this.bitArraySize).fill(false);
        this.elementsAdded = 0;
    }
    
    _hash(key, seed) {
        let hash = seed;
        const str = String(key);
        for (let i = 0; i < str.length; i++) {
            hash = hash * 31 + str.charCodeAt(i);
        }
        return Math.abs(hash) % this.bitArraySize;
    }
    
    add(element) {
        for (let i = 0; i < this.numHashFunctions; i++) {
            const index = this._hash(element, i);
            this.bitArray[index] = true;
        }
        this.elementsAdded++;
    }
    
    mightContain(element) {
        for (let i = 0; i < this.numHashFunctions; i++) {
            const index = this._hash(element, i);
            if (!this.bitArray[index]) {
                return false; // Definitely not in set
            }
        }
        return true; // Might be in set
    }
    
    getCurrentFalsePositiveRate() {
        const ratio = this.elementsAdded / this.expectedElements;
        return Math.pow(1 - Math.exp(-this.numHashFunctions * ratio), this.numHashFunctions);
    }
    
    getStats() {
        const setBits = this.bitArray.filter(bit => bit).length;
        return {
            bitArraySize: this.bitArraySize,
            numHashFunctions: this.numHashFunctions,
            elementsAdded: this.elementsAdded,
            setBits,
            fillRatio: setBits / this.bitArraySize,
            expectedFalsePositiveRate: this.falsePositiveRate,
            currentFalsePositiveRate: this.getCurrentFalsePositiveRate()
        };
    }
}

// Counting Hash Table Implementation
class CountingHashTable {
    constructor() {
        this.table = new HashTable(16, 'chaining');
    }
    
    increment(key, count = 1) {
        const currentCount = this.table.get(key) || 0;
        this.table.set(key, currentCount + count);
    }
    
    decrement(key, count = 1) {
        const currentCount = this.table.get(key) || 0;
        const newCount = Math.max(0, currentCount - count);
        
        if (newCount === 0) {
            this.table.delete(key);
        } else {
            this.table.set(key, newCount);
        }
    }
    
    getCount(key) {
        return this.table.get(key) || 0;
    }
    
    getMostFrequent(n = 10) {
        const entries = [];
        for (const key of this.table.keys()) {
            entries.push([key, this.table.get(key)]);
        }
        
        return entries
            .sort((a, b) => b[1] - a[1])
            .slice(0, n);
    }
    
    getTotalCount() {
        let total = 0;
        for (const key of this.table.keys()) {
            total += this.table.get(key);
        }
        return total;
    }
}

// Example usage and testing
console.log('=== Hash Table Collision Resolution Strategies ===');

// Test different collision resolution strategies
const strategies = ['chaining', 'linear', 'quadratic', 'double', 'robinhood'];
const testData = {};
for (let i = 0; i < 100; i++) {
    testData[`key${i}`] = `value${i}`;
}

for (const strategy of strategies) {
    const table = new HashTable(16, strategy);
    
    console.time(`${strategy} insertion`);
    for (const [key, value] of Object.entries(testData)) {
        table.set(key, value);
    }
    console.timeEnd(`${strategy} insertion`);
    
    console.log(`${strategy} stats:`, table.getStats());
}

console.log('\n=== Cuckoo Hashing ===');
const cuckooTable = new CuckooHashTable();
cuckooTable.set('name', 'John');
cuckooTable.set('age', 30);
cuckooTable.set('city', 'NYC');
console.log('Cuckoo get name:', cuckooTable.get('name'));
console.log('Cuckoo has age:', cuckooTable.has('age'));

console.log('\n=== Consistent Hashing ===');
const consistentHash = new ConsistentHashTable(['server1', 'server2', 'server3']);
console.log('Key "user123" maps to:', consistentHash.getNode('user123'));
console.log('Key "user456" maps to:', consistentHash.getNode('user456'));

consistentHash.addNode('server4');
console.log('After adding server4, "user123" maps to:', consistentHash.getNode('user123'));

const distribution = consistentHash.getDistribution();
console.log('Load distribution:', distribution);

console.log('\n=== Bloom Filter ===');
const bloomFilter = new BloomFilter(1000, 0.01);
const testWords = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

for (const word of testWords) {
    bloomFilter.add(word);
}

console.log('Bloom filter stats:', bloomFilter.getStats());
console.log('Contains "apple":', bloomFilter.mightContain('apple'));
console.log('Contains "grape" (not added):', bloomFilter.mightContain('grape'));

console.log('\n=== Counting Hash Table ===');
const countingTable = new CountingHashTable();
const words = ['apple', 'banana', 'apple', 'cherry', 'apple', 'banana'];

for (const word of words) {
    countingTable.increment(word);
}

console.log('Word counts:');
console.log('apple:', countingTable.getCount('apple'));
console.log('banana:', countingTable.getCount('banana'));
console.log('cherry:', countingTable.getCount('cherry'));

console.log('Most frequent words:', countingTable.getMostFrequent(3));
console.log('Total word count:', countingTable.getTotalCount());