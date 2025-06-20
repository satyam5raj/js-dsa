// Basic Custom Object Implementation
class CustomObject {
    constructor(obj = null) {
        this.capacity = 16;
        this.size = 0;
        this.buckets = new Array(this.capacity);
        this.loadFactorThreshold = 0.75;
        
        // Initialize buckets
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
        
        // Add initial properties if provided
        if (obj) {
            for (const [key, value] of Object.entries(obj)) {
                this.setProperty(key, value);
            }
        }
    }
    
    // Hash function for property names
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
        
        // Rehash all existing properties
        for (const bucket of oldBuckets) {
            for (const [key, value] of bucket) {
                this.setProperty(key, value);
            }
        }
    }
    
    // Set a property
    setProperty(key, value) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        // Check if property already exists
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return this;
            }
        }
        
        // Add new property
        bucket.push([key, value]);
        this.size++;
        
        // Check if resize is needed
        if (this.size > this.capacity * this.loadFactorThreshold) {
            this._resize();
        }
        
        return this;
    }
    
    // Get a property
    getProperty(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (const [k, v] of bucket) {
            if (k === key) {
                return v;
            }
        }
        
        return undefined;
    }
    
    // Check if property exists
    hasProperty(key) {
        return this.getProperty(key) !== undefined;
    }
    
    // Delete a property
    deleteProperty(key) {
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
    
    // Get all property keys
    keys() {
        const keys = [];
        for (const bucket of this.buckets) {
            for (const [key] of bucket) {
                keys.push(key);
            }
        }
        return keys;
    }
    
    // Get all property values
    values() {
        const values = [];
        for (const bucket of this.buckets) {
            for (const [, value] of bucket) {
                values.push(value);
            }
        }
        return values;
    }
    
    // Get all entries
    entries() {
        const entries = [];
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                entries.push([...entry]);
            }
        }
        return entries;
    }
    
    // Convert to plain object
    toPlainObject() {
        const obj = {};
        for (const [key, value] of this.entries()) {
            obj[key] = value;
        }
        return obj;
    }
    
    // Clone the object
    clone() {
        return new CustomObject(this.toPlainObject());
    }
    
    // Merge with another object
    merge(other) {
        const result = this.clone();
        const otherEntries = other instanceof CustomObject ? other.entries() : Object.entries(other);
        
        for (const [key, value] of otherEntries) {
            result.setProperty(key, value);
        }
        
        return result;
    }
    
    toString() {
        const entries = this.entries();
        return `CustomObject { ${entries.map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ')} }`;
    }
}

// Ordered Object Implementation (maintains insertion order)
class OrderedObject extends CustomObject {
    constructor(obj = null) {
        super();
        this.insertionOrder = []; // Track insertion order
        
        if (obj) {
            for (const [key, value] of Object.entries(obj)) {
                this.setProperty(key, value);
            }
        }
    }
    
    setProperty(key, value) {
        const existed = this.hasProperty(key);
        super.setProperty(key, value);
        
        // Track insertion order only for new properties
        if (!existed) {
            this.insertionOrder.push(key);
        }
        
        return this;
    }
    
    deleteProperty(key) {
        const deleted = super.deleteProperty(key);
        
        if (deleted) {
            const index = this.insertionOrder.indexOf(key);
            if (index > -1) {
                this.insertionOrder.splice(index, 1);
            }
        }
        
        return deleted;
    }
    
    // Override methods to maintain order
    keys() {
        return [...this.insertionOrder];
    }
    
    values() {
        return this.insertionOrder.map(key => this.getProperty(key));
    }
    
    entries() {
        return this.insertionOrder.map(key => [key, this.getProperty(key)]);
    }
    
    // Iterator support
    *[Symbol.iterator]() {
        for (const key of this.insertionOrder) {
            yield [key, this.getProperty(key)];
        }
    }
    
    // Get property at specific index
    getAt(index) {
        const key = this.insertionOrder[index];
        return key ? this.getProperty(key) : undefined;
    }
    
    // Get key at specific index
    keyAt(index) {
        return this.insertionOrder[index];
    }
    
    // First and last properties
    first() {
        const key = this.insertionOrder[0];
        return key ? [key, this.getProperty(key)] : undefined;
    }
    
    last() {
        const key = this.insertionOrder[this.insertionOrder.length - 1];
        return key ? [key, this.getProperty(key)] : undefined;
    }
    
    clone() {
        return new OrderedObject(this.toPlainObject());
    }
}

// Observable Object Implementation (tracks changes)
class ObservableObject extends OrderedObject {
    constructor(obj = null) {
        super(obj);
        this.observers = new Set();
        this.changeHistory = [];
        this.maxHistorySize = 100;
    }
    
    // Add observer
    observe(callback) {
        this.observers.add(callback);
        return () => this.observers.delete(callback); // Return unsubscribe function
    }
    
    // Notify observers
    _notify(change) {
        this.changeHistory.push({
            ...change,
            timestamp: Date.now()
        });
        
        // Limit history size
        if (this.changeHistory.length > this.maxHistorySize) {
            this.changeHistory.shift();
        }
        
        for (const observer of this.observers) {
            try {
                observer(change, this);
            } catch (error) {
                console.error('Observer error:', error);
            }
        }
    }
    
    setProperty(key, value) {
        const oldValue = this.getProperty(key);
        const existed = this.hasProperty(key);
        
        super.setProperty(key, value);
        
        this._notify({
            type: existed ? 'update' : 'add',
            key,
            value,
            oldValue: existed ? oldValue : undefined
        });
        
        return this;
    }
    
    deleteProperty(key) {
        const oldValue = this.getProperty(key);
        const deleted = super.deleteProperty(key);
        
        if (deleted) {
            this._notify({
                type: 'delete',
                key,
                oldValue
            });
        }
        
        return deleted;
    }
    
    // Batch updates without triggering observers for each change
    batch(updateFn) {
        const oldObservers = this.observers;
        this.observers = new Set(); // Temporarily disable observers
        
        try {
            const changes = [];
            const originalNotify = this._notify;
            this._notify = (change) => changes.push(change);
            
            updateFn(this);
            
            this._notify = originalNotify;
            this.observers = oldObservers;
            
            // Notify about batch changes
            if (changes.length > 0) {
                for (const observer of this.observers) {
                    try {
                        observer({ type: 'batch', changes }, this);
                    } catch (error) {
                        console.error('Observer error:', error);
                    }
                }
            }
        } catch (error) {
            this.observers = oldObservers; // Restore observers even if error occurs
            throw error;
        }
        
        return this;
    }
    
    // Get change history
    getHistory() {
        return [...this.changeHistory];
    }
    
    // Clear change history
    clearHistory() {
        this.changeHistory = [];
        return this;
    }
    
    clone() {
        const cloned = new ObservableObject(this.toPlainObject());
        // Don't copy observers or history to the clone
        return cloned;
    }
}

// Proxy-based Object Implementation (native property access)
class ProxyObject {
    constructor(obj = null) {
        this.customObj = new ObservableObject(obj);
        
        return new Proxy(this, {
            get(target, prop) {
                if (prop in target.customObj || typeof target.customObj[prop] === 'function') {
                    return target.customObj[prop];
                }
                return target.customObj.getProperty(prop);
            },
            
            set(target, prop, value) {
                target.customObj.setProperty(prop, value);
                return true;
            },
            
            has(target, prop) {
                return target.customObj.hasProperty(prop);
            },
            
            deleteProperty(target, prop) {
                return target.customObj.deleteProperty(prop);
            },
            
            ownKeys(target) {
                return target.customObj.keys();
            },
            
            getOwnPropertyDescriptor(target, prop) {
                if (target.customObj.hasProperty(prop)) {
                    return {
                        enumerable: true,
                        configurable: true,
                        value: target.customObj.getProperty(prop)
                    };
                }
                return undefined;
            }
        });
    }
}

// Example usage and testing
console.log('=== CustomObject Testing ===');

const obj1 = new CustomObject({ name: 'John', age: 30 });
console.log('Initial object:', obj1.toString());

obj1.setProperty('city', 'New York');
obj1.setProperty('country', 'USA');
console.log('After additions:', obj1.toString());

console.log('Get name:', obj1.getProperty('name'));
console.log('Has age:', obj1.hasProperty('age'));
console.log('Keys:', obj1.keys());
console.log('Values:', obj1.values());

console.log('\n=== OrderedObject Testing ===');

const orderedObj = new OrderedObject();
orderedObj.setProperty('c', 3);
orderedObj.setProperty('a', 1);
orderedObj.setProperty('b', 2);

console.log('Ordered object:', orderedObj.toString());
console.log('Keys in order:', orderedObj.keys());
console.log('First property:', orderedObj.first());
console.log('Last property:', orderedObj.last());

// Test iteration
console.log('Iterating in order:');
for (const [key, value] of orderedObj) {
    console.log(`${key}: ${value}`);
}

console.log('\n=== ObservableObject Testing ===');

const observableObj = new ObservableObject({ x: 10, y: 20 });

// Add observer
const unsubscribe = observableObj.observe((change, obj) => {
    console.log('Change detected:', change);
});

observableObj.setProperty('z', 30);
observableObj.setProperty('x', 15); // Update existing
observableObj.deleteProperty('y');

// Batch updates
console.log('Batch update:');
observableObj.batch(obj => {
    obj.setProperty('a', 1);
    obj.setProperty('b', 2);
    obj.setProperty('c', 3);
});

console.log('Change history:', observableObj.getHistory());

console.log('\n=== ProxyObject Testing ===');

const proxyObj = new ProxyObject({ initial: 'value' });

// Native property access
proxyObj.name = 'Alice';
proxyObj.age = 25;
console.log('Name:', proxyObj.name);
console.log('Age:', proxyObj.age);
console.log('Has name:', 'name' in proxyObj);

// Observer still works
proxyObj.observe((change) => {
    console.log('Proxy change:', change);
});

proxyObj.status = 'active';
delete proxyObj.initial;

console.log('Proxy keys:', Object.keys(proxyObj));
console.log('Final proxy object:', proxyObj.toString());

// Performance comparison
console.log('\n=== Performance Comparison ===');

const iterations = 10000;
const testData = {};
for (let i = 0; i < 100; i++) {
    testData[`key${i}`] = `value${i}`;
}

// Test CustomObject
console.time('CustomObject creation');
for (let i = 0; i < iterations; i++) {
    new CustomObject(testData);
}
console.timeEnd('CustomObject creation');

// Test native Object
console.time('Native Object creation');
for (let i = 0; i < iterations; i++) {
    Object.assign({}, testData);
}
console.timeEnd('Native Object creation');