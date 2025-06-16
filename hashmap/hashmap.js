class HashMap {
    constructor(initialCapacity = 16) {
        this.capacity = initialCapacity;
        this.size = 0;
        this.buckets = new Array(this.capacity);
        this.loadFactorThreshold = 0.75;
        
        // Initialize buckets as empty arrays for chaining
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
    }
    
    // Hash function using djb2 algorithm
    _hash(key) {
        let hash = 5381;
        const str = String(key);
        
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
        }
        
        return Math.abs(hash) % this.capacity;
    }
    
    // Resize the hash map when load factor exceeds threshold
    _resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.size = 0;
        this.buckets = new Array(this.capacity);
        
        // Initialize new buckets
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
        
        // Rehash all existing key-value pairs
        for (const bucket of oldBuckets) {
            for (const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }
    
    // Set a key-value pair
    set(key, value) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        // Check if key already exists
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value; // Update existing value
                return;
            }
        }
        
        // Add new key-value pair
        bucket.push([key, value]);
        this.size++;
        
        // Check if resize is needed
        if (this.size > this.capacity * this.loadFactorThreshold) {
            this._resize();
        }
    }
    
    // Get value by key
    get(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (const [k, v] of bucket) {
            if (k === key) {
                return v;
            }
        }
        
        return undefined;
    }
    
    // Check if key exists
    has(key) {
        return this.get(key) !== undefined;
    }
    
    // Delete a key-value pair
    delete(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        
        return false;
    }
    
    // Clear all key-value pairs
    clear() {
        this.size = 0;
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
    }
    
    // Get all keys
    keys() {
        const keys = [];
        for (const bucket of this.buckets) {
            for (const [key] of bucket) {
                keys.push(key);
            }
        }
        return keys;
    }
    
    // Get all values
    values() {
        const values = [];
        for (const bucket of this.buckets) {
            for (const [, value] of bucket) {
                values.push(value);
            }
        }
        return values;
    }
    
    // Get all key-value pairs as entries
    entries() {
        const entries = [];
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                entries.push([...entry]);
            }
        }
        return entries;
    }
    
    // Iterator for for...of loops
    *[Symbol.iterator]() {
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                yield [key, value];
            }
        }
    }
    
    // Get current load factor
    getLoadFactor() {
        return this.size / this.capacity;
    }
    
    // Display hash map statistics
    getStats() {
        let maxChainLength = 0;
        let nonEmptyBuckets = 0;
        
        for (const bucket of this.buckets) {
            if (bucket.length > 0) {
                nonEmptyBuckets++;
                maxChainLength = Math.max(maxChainLength, bucket.length);
            }
        }
        
        return {
            size: this.size,
            capacity: this.capacity,
            loadFactor: this.getLoadFactor(),
            nonEmptyBuckets,
            maxChainLength,
            efficiency: nonEmptyBuckets / this.capacity
        };
    }
    
    // Convert to string representation
    toString() {
        const entries = this.entries();
        return `HashMap { ${entries.map(([k, v]) => `${k}: ${v}`).join(', ')} }`;
    }
}

// Example usage and testing
const map = new HashMap();

// Basic operations
map.set('name', 'John');
map.set('age', 30);
map.set('city', 'New York');
map.set(42, 'answer');
map.set(true, 'boolean key');

console.log('Get operations:');
console.log(map.get('name')); // John
console.log(map.get('age'));  // 30
console.log(map.get(42));     // answer

console.log('\nHas operations:');
console.log(map.has('name'));     // true
console.log(map.has('unknown')); // false

console.log('\nIteration:');
for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}

console.log('\nKeys:', map.keys());
console.log('Values:', map.values());

console.log('\nStats:', map.getStats());
console.log('String representation:', map.toString());

// Test collision handling by forcing collisions
console.log('\n--- Testing collision handling ---');
const smallMap = new HashMap(4); // Small capacity to force collisions

smallMap.set('a', 1);
smallMap.set('b', 2);
smallMap.set('c', 3);
smallMap.set('d', 4);
smallMap.set('e', 5); // This should trigger resize

console.log('Small map stats:', smallMap.getStats());
console.log('Small map contents:', smallMap.toString());