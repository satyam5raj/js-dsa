// Custom Set Implementation
class CustomSet {
    constructor(iterable = null) {
        this.capacity = 16;
        this.size = 0;
        this.buckets = new Array(this.capacity);
        this.loadFactorThreshold = 0.75;
        
        // Initialize buckets
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
        
        // Add initial values if provided
        if (iterable) {
            for (const value of iterable) {
                this.add(value);
            }
        }
    }
    
    // Hash function
    _hash(value) {
        let hash = 5381;
        const str = String(value);
        
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
        }
        
        return Math.abs(hash) % this.capacity;
    }
    
    // Resize when load factor exceeds threshold
    _resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.size = 0;
        this.buckets = new Array(this.capacity);
        
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
        
        // Rehash all existing values
        for (const bucket of oldBuckets) {
            for (const value of bucket) {
                this.add(value);
            }
        }
    }
    
    // Add a value to the set
    add(value) {
        const index = this._hash(value);
        const bucket = this.buckets[index];
        
        // Check if value already exists
        if (bucket.includes(value)) {
            return this; // Value already exists, return for chaining
        }
        
        bucket.push(value);
        this.size++;
        
        // Check if resize is needed
        if (this.size > this.capacity * this.loadFactorThreshold) {
            this._resize();
        }
        
        return this; // For method chaining
    }
    
    // Check if value exists
    has(value) {
        const index = this._hash(value);
        const bucket = this.buckets[index];
        return bucket.includes(value);
    }
    
    // Delete a value
    delete(value) {
        const index = this._hash(value);
        const bucket = this.buckets[index];
        const valueIndex = bucket.indexOf(value);
        
        if (valueIndex !== -1) {
            bucket.splice(valueIndex, 1);
            this.size--;
            return true;
        }
        
        return false;
    }
    
    // Clear all values
    clear() {
        this.size = 0;
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
    }
    
    // Iterator for values
    *values() {
        for (const bucket of this.buckets) {
            for (const value of bucket) {
                yield value;
            }
        }
    }
    
    // Iterator for keys (same as values in Set)
    keys() {
        return this.values();
    }
    
    // Iterator for entries [value, value]
    *entries() {
        for (const bucket of this.buckets) {
            for (const value of bucket) {
                yield [value, value];
            }
        }
    }
    
    // Default iterator
    *[Symbol.iterator]() {
        yield* this.values();
    }
    
    // Execute callback for each value
    forEach(callback, thisArg = undefined) {
        for (const value of this) {
            callback.call(thisArg, value, value, this);
        }
    }
    
    // Convert to array
    toArray() {
        return [...this];
    }
    
    // Union operation
    union(other) {
        const result = new CustomSet(this);
        for (const value of other) {
            result.add(value);
        }
        return result;
    }
    
    // Intersection operation
    intersection(other) {
        const result = new CustomSet();
        for (const value of this) {
            if (other.has(value)) {
                result.add(value);
            }
        }
        return result;
    }
    
    // Difference operation
    difference(other) {
        const result = new CustomSet();
        for (const value of this) {
            if (!other.has(value)) {
                result.add(value);
            }
        }
        return result;
    }
    
    // Check if subset
    isSubsetOf(other) {
        for (const value of this) {
            if (!other.has(value)) {
                return false;
            }
        }
        return true;
    }
    
    toString() {
        return `CustomSet { ${[...this].join(', ')} }`;
    }
}

// Custom Map Implementation
class CustomMap {
    constructor(iterable = null) {
        this.capacity = 16;
        this.size = 0;
        this.buckets = new Array(this.capacity);
        this.loadFactorThreshold = 0.75;
        
        // Initialize buckets
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
        
        // Add initial entries if provided
        if (iterable) {
            for (const [key, value] of iterable) {
                this.set(key, value);
            }
        }
    }
    
    // Hash function
    _hash(key) {
        let hash = 5381;
        const str = String(key);
        
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
        }
        
        return Math.abs(hash) % this.capacity;
    }
    
    // Resize when load factor exceeds threshold
    _resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.size = 0;
        this.buckets = new Array(this.capacity);
        
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
                bucket[i][1] = value;
                return this;
            }
        }
        
        // Add new key-value pair
        bucket.push([key, value]);
        this.size++;
        
        // Check if resize is needed
        if (this.size > this.capacity * this.loadFactorThreshold) {
            this._resize();
        }
        
        return this; // For method chaining
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
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (const [k] of bucket) {
            if (k === key) {
                return true;
            }
        }
        
        return false;
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
    
    // Clear all entries
    clear() {
        this.size = 0;
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
    }
    
    // Iterator for keys
    *keys() {
        for (const bucket of this.buckets) {
            for (const [key] of bucket) {
                yield key;
            }
        }
    }
    
    // Iterator for values
    *values() {
        for (const bucket of this.buckets) {
            for (const [, value] of bucket) {
                yield value;
            }
        }
    }
    
    // Iterator for entries
    *entries() {
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                yield [...entry];
            }
        }
    }
    
    // Default iterator (entries)
    *[Symbol.iterator]() {
        yield* this.entries();
    }
    
    // Execute callback for each entry
    forEach(callback, thisArg = undefined) {
        for (const [key, value] of this) {
            callback.call(thisArg, value, key, this);
        }
    }
    
    // Convert to array of entries
    toArray() {
        return [...this.entries()];
    }
    
    toString() {
        const entries = [...this.entries()];
        return `CustomMap { ${entries.map(([k, v]) => `${k} => ${v}`).join(', ')} }`;
    }
}

// Example usage and testing
console.log('=== CustomSet Testing ===');

const set1 = new CustomSet([1, 2, 3, 4, 5]);
const set2 = new CustomSet([4, 5, 6, 7, 8]);

console.log('Set1:', set1.toString());
console.log('Set2:', set2.toString());

// Basic operations
set1.add(10);
console.log('After adding 10:', set1.toString());
console.log('Has 3:', set1.has(3));
console.log('Has 99:', set1.has(99));

// Set operations
console.log('Union:', set1.union(set2).toString());
console.log('Intersection:', set1.intersection(set2).toString());
console.log('Difference:', set1.difference(set2).toString());

// Iteration
console.log('Iterating through set1:');
for (const value of set1) {
    console.log(value);
}

// forEach
console.log('Using forEach:');
set1.forEach(value => console.log(`Value: ${value}`));

console.log('\n=== CustomMap Testing ===');

const map1 = new CustomMap([['a', 1], ['b', 2], ['c', 3]]);
console.log('Initial map:', map1.toString());

// Basic operations
map1.set('d', 4);
map1.set('e', 5);
console.log('After additions:', map1.toString());

console.log('Get "b":', map1.get('b'));
console.log('Has "c":', map1.has('c'));
console.log('Has "z":', map1.has('z'));

// Iteration
console.log('Keys:', [...map1.keys()]);
console.log('Values:', [...map1.values()]);
console.log('Entries:', [...map1.entries()]);

// forEach
console.log('Using forEach:');
map1.forEach((value, key) => console.log(`${key}: ${value}`));

// Method chaining
const map2 = new CustomMap()
    .set('name', 'John')
    .set('age', 30)
    .set('city', 'New York');

console.log('Chained map:', map2.toString());

// Test with different data types
const mixedSet = new CustomSet();
mixedSet.add('string');
mixedSet.add(42);
mixedSet.add(true);
mixedSet.add(null);
mixedSet.add({key: 'object'});

console.log('Mixed type set:', mixedSet.toString());

const mixedMap = new CustomMap();
mixedMap.set('string', 'value1');
mixedMap.set(42, 'value2');
mixedMap.set(true, 'value3');
mixedMap.set({key: 'obj'}, 'value4');

console.log('Mixed type map:', mixedMap.toString());