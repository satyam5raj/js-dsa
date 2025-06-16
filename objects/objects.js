// ==============================================
// CORE OBJECT UTILITY CLASS
// ==============================================

class ObjectUtils {
  
  // 1. DEEP CLONING / DEEP COPY
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (obj instanceof RegExp) return new RegExp(obj);
    
    const cloned = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = this.deepClone(obj[key]);
      }
    }
    return cloned;
  }

  // 2. DEEP COMPARISON / EQUALITY CHECKING
  static deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null) return obj1 === obj2;
    if (typeof obj1 !== typeof obj2) return false;
    
    if (obj1 instanceof Date && obj2 instanceof Date) {
      return obj1.getTime() === obj2.getTime();
    }
    
    if (obj1 instanceof Array && obj2 instanceof Array) {
      if (obj1.length !== obj2.length) return false;
      for (let i = 0; i < obj1.length; i++) {
        if (!this.deepEqual(obj1[i], obj2[i])) return false;
      }
      return true;
    }
    
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) return false;
      
      for (let key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!this.deepEqual(obj1[key], obj2[key])) return false;
      }
      return true;
    }
    
    return obj1 === obj2;
  }

  // 3. MERGING / EXTENDING OBJECTS
  static deepMerge(...objects) {
    const result = {};
    
    for (let obj of objects) {
      if (obj && typeof obj === 'object') {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
              result[key] = this.deepMerge(result[key] || {}, obj[key]);
            } else {
              result[key] = obj[key];
            }
          }
        }
      }
    }
    
    return result;
  }

  // 4. OBJECT FLATTENING AND UNFLATTENING
  static flatten(obj, prefix = '', separator = '.') {
    const flattened = {};
    
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}${separator}${key}` : key;
        
        if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          Object.assign(flattened, this.flatten(obj[key], newKey, separator));
        } else {
          flattened[newKey] = obj[key];
        }
      }
    }
    
    return flattened;
  }

  static unflatten(obj, separator = '.') {
    const result = {};
    
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const keys = key.split(separator);
        let current = result;
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!(keys[i] in current)) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = obj[key];
      }
    }
    
    return result;
  }

  // 5. PROPERTY ENUMERATION AND FILTERING
  static filterProperties(obj, predicate) {
    const result = {};
    
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && predicate(key, obj[key])) {
        result[key] = obj[key];
      }
    }
    
    return result;
  }

  static mapValues(obj, mapper) {
    const result = {};
    
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = mapper(obj[key], key);
      }
    }
    
    return result;
  }

  // 6. KEY PATH ACCESS / DYNAMIC PROPERTY ACCESS
  static getNestedValue(obj, path, defaultValue = undefined) {
    const keys = Array.isArray(path) ? path : path.split('.');
    let current = obj;
    
    for (let key of keys) {
      if (current === null || current === undefined || !(key in current)) {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current;
  }

  static setNestedValue(obj, path, value) {
    const keys = Array.isArray(path) ? path : path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current) || typeof current[keys[i]] !== 'object') {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    return obj;
  }

  // 7. IMPLEMENTING IMMUTABLE DATA STRUCTURES
  static deepFreeze(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    
    Object.freeze(obj);
    
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        this.deepFreeze(obj[key]);
      }
    }
    
    return obj;
  }

  static createImmutableUpdate(obj, path, value) {
    const keys = Array.isArray(path) ? path : path.split('.');
    const result = this.deepClone(obj);
    
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    return result;
  }
}

// ==============================================
// REAL-WORLD USE CASE IMPLEMENTATIONS
// ==============================================

// 1. CONFIGURATION MANAGEMENT
class ConfigManager {
  constructor(defaults = {}) {
    this.defaults = ObjectUtils.deepClone(defaults);
    this.config = ObjectUtils.deepClone(defaults);
  }

  setDefaults(defaults) {
    this.defaults = ObjectUtils.deepMerge(this.defaults, defaults);
    this.config = ObjectUtils.deepMerge(this.config, defaults);
  }

  update(overrides) {
    this.config = ObjectUtils.deepMerge(this.config, overrides);
  }

  get(path, defaultValue) {
    return ObjectUtils.getNestedValue(this.config, path, defaultValue);
  }

  reset() {
    this.config = ObjectUtils.deepClone(this.defaults);
  }

  toJSON() {
    return ObjectUtils.deepClone(this.config);
  }
}

// 2. DATA TRANSFER OBJECTS (DTOs)
class BaseDTO {
  constructor(data = {}) {
    this.data = ObjectUtils.deepClone(data);
  }

  toJSON() {
    return ObjectUtils.deepClone(this.data);
  }

  static fromJSON(json) {
    return new this(json);
  }

  validate() {
    // Override in subclasses
    return true;
  }

  serialize() {
    return JSON.stringify(this.toJSON());
  }
}

class UserDTO extends BaseDTO {
  constructor(data = {}) {
    super(data);
    this.data = ObjectUtils.deepMerge({
      id: null,
      name: '',
      email: '',
      profile: {
        avatar: '',
        bio: '',
        preferences: {}
      }
    }, data);
  }

  validate() {
    return this.data.id && this.data.name && this.data.email;
  }
}

// 3. CACHING AND MEMOIZATION
class MemoCache {
  constructor(maxSize = 100) {
    this.cache = {};
    this.maxSize = maxSize;
    this.accessOrder = [];
  }

  generateKey(args) {
    return JSON.stringify(args);
  }

  get(key) {
    if (key in this.cache) {
      // Update access order
      this.accessOrder = this.accessOrder.filter(k => k !== key);
      this.accessOrder.push(key);
      return this.cache[key];
    }
    return undefined;
  }

  set(key, value) {
    if (Object.keys(this.cache).length >= this.maxSize && !(key in this.cache)) {
      // Remove least recently used
      const lru = this.accessOrder.shift();
      delete this.cache[lru];
    }

    this.cache[key] = value;
    this.accessOrder = this.accessOrder.filter(k => k !== key);
    this.accessOrder.push(key);
  }

  memoize(fn) {
    return (...args) => {
      const key = this.generateKey(args);
      const cached = this.get(key);
      
      if (cached !== undefined) {
        return cached;
      }
      
      const result = fn(...args);
      this.set(key, result);
      return result;
    };
  }
}

// 4. STATE MANAGEMENT
class StateManager {
  constructor(initialState = {}) {
    this.state = ObjectUtils.deepClone(initialState);
    this.listeners = [];
    this.history = [ObjectUtils.deepClone(initialState)];
    this.currentIndex = 0;
  }

  getState(path) {
    if (path) {
      return ObjectUtils.getNestedValue(this.state, path);
    }
    return ObjectUtils.deepClone(this.state);
  }

  setState(path, value) {
    const newState = ObjectUtils.createImmutableUpdate(this.state, path, value);
    
    if (!ObjectUtils.deepEqual(this.state, newState)) {
      this.state = newState;
      this.history = this.history.slice(0, this.currentIndex + 1);
      this.history.push(ObjectUtils.deepClone(newState));
      this.currentIndex++;
      
      this.notifyListeners();
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  undo() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.state = ObjectUtils.deepClone(this.history[this.currentIndex]);
      this.notifyListeners();
    }
  }

  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.state = ObjectUtils.deepClone(this.history[this.currentIndex]);
      this.notifyListeners();
    }
  }
}

// 5. EVENT HANDLING / PUB-SUB SYSTEM
class EventBus {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    // Return unsubscribe function
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event handler for ${event}:`, error);
        }
      });
    }
  }

  once(event, callback) {
    const wrapper = (data) => {
      callback(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

// 6. DYNAMIC FORM HANDLING
class FormManager {
  constructor(schema = {}) {
    this.schema = ObjectUtils.deepClone(schema);
    this.values = {};
    this.errors = {};
    this.touched = {};
    this.validators = {};
  }

  setField(name, value) {
    ObjectUtils.setNestedValue(this.values, name, value);
    ObjectUtils.setNestedValue(this.touched, name, true);
    this.validateField(name);
  }

  getField(name) {
    return ObjectUtils.getNestedValue(this.values, name);
  }

  setValidator(name, validator) {
    this.validators[name] = validator;
  }

  validateField(name) {
    const value = this.getField(name);
    const validator = this.validators[name];
    
    if (validator) {
      const error = validator(value);
      if (error) {
        ObjectUtils.setNestedValue(this.errors, name, error);
      } else {
        this.clearError(name);
      }
    }
  }

  clearError(name) {
    const errors = ObjectUtils.deepClone(this.errors);
    const keys = name.split('.');
    let current = errors;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (current[keys[i]]) {
        current = current[keys[i]];
      } else {
        return;
      }
    }
    
    delete current[keys[keys.length - 1]];
    this.errors = errors;
  }

  isValid() {
    return Object.keys(ObjectUtils.flatten(this.errors)).length === 0;
  }

  serialize() {
    return {
      values: ObjectUtils.deepClone(this.values),
      errors: ObjectUtils.deepClone(this.errors),
      touched: ObjectUtils.deepClone(this.touched)
    };
  }
}

// 7. GRAPH REPRESENTATIONS
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, weight = 1) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    
    this.adjacencyList[vertex1].push({ vertex: vertex2, weight });
    this.adjacencyList[vertex2].push({ vertex: vertex1, weight });
  }

  removeVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      // Remove all edges to this vertex
      for (let neighbor of this.adjacencyList[vertex]) {
        this.adjacencyList[neighbor.vertex] = this.adjacencyList[neighbor.vertex]
          .filter(edge => edge.vertex !== vertex);
      }
      delete this.adjacencyList[vertex];
    }
  }

  getNeighbors(vertex) {
    return this.adjacencyList[vertex] || [];
  }

  breadthFirstSearch(start, target) {
    const queue = [start];
    const visited = new Set();
    const path = {};
    
    visited.add(start);
    
    while (queue.length > 0) {
      const current = queue.shift();
      
      if (current === target) {
        return this.reconstructPath(path, start, target);
      }
      
      for (let neighbor of this.getNeighbors(current)) {
        if (!visited.has(neighbor.vertex)) {
          visited.add(neighbor.vertex);
          path[neighbor.vertex] = current;
          queue.push(neighbor.vertex);
        }
      }
    }
    
    return null;
  }

  reconstructPath(path, start, target) {
    const result = [];
    let current = target;
    
    while (current !== start) {
      result.unshift(current);
      current = path[current];
    }
    
    result.unshift(start);
    return result;
  }
}

// 8. ACCESS CONTROL LISTS (ACLs)
class ACLManager {
  constructor() {
    this.permissions = {};
  }

  grantPermission(user, resource, action) {
    if (!this.permissions[user]) {
      this.permissions[user] = {};
    }
    if (!this.permissions[user][resource]) {
      this.permissions[user][resource] = new Set();
    }
    this.permissions[user][resource].add(action);
  }

  revokePermission(user, resource, action) {
    if (this.permissions[user] && this.permissions[user][resource]) {
      this.permissions[user][resource].delete(action);
      
      if (this.permissions[user][resource].size === 0) {
        delete this.permissions[user][resource];
      }
      
      if (Object.keys(this.permissions[user]).length === 0) {
        delete this.permissions[user];
      }
    }
  }

  hasPermission(user, resource, action) {
    return this.permissions[user] && 
           this.permissions[user][resource] && 
           this.permissions[user][resource].has(action);
  }

  getUserPermissions(user) {
    if (!this.permissions[user]) return {};
    
    const result = {};
    for (let resource in this.permissions[user]) {
      result[resource] = Array.from(this.permissions[user][resource]);
    }
    return result;
  }

  getResourcePermissions(resource) {
    const result = {};
    
    for (let user in this.permissions) {
      if (this.permissions[user][resource]) {
        result[user] = Array.from(this.permissions[user][resource]);
      }
    }
    
    return result;
  }
}

// ==============================================
// USAGE EXAMPLES
// ==============================================

// Example usage of all classes
console.log('=== OBJECT UTILITIES EXAMPLES ===');

// 1. Deep cloning
const original = { a: 1, b: { c: 2, d: [3, 4] } };
const cloned = ObjectUtils.deepClone(original);
console.log('Deep clone:', cloned);

// 2. Deep comparison
console.log('Deep equal:', ObjectUtils.deepEqual(original, cloned));

// 3. Configuration management
const config = new ConfigManager({ 
  api: { url: 'localhost', port: 3000 },
  features: { darkMode: false }
});
config.update({ api: { timeout: 5000 }, features: { darkMode: true } });
console.log('Config:', config.toJSON());

// 4. State management
const state = new StateManager({ user: { name: 'John' }, count: 0 });
state.setState('count', 5);
state.setState('user.name', 'Jane');
console.log('State:', state.getState());

// 5. Event system
const eventBus = new EventBus();
eventBus.on('test', (data) => console.log('Event received:', data));
eventBus.emit('test', { message: 'Hello World' });

// 6. Graph operations
const graph = new Graph();
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('A', 'C');
console.log('Graph BFS A to C:', graph.breadthFirstSearch('A', 'C'));

// 7. ACL system
const acl = new ACLManager();
acl.grantPermission('john', 'document1', 'read');
acl.grantPermission('john', 'document1', 'write');
console.log('John can read document1:', acl.hasPermission('john', 'document1', 'read'));

export {
  ObjectUtils,
  ConfigManager,
  BaseDTO,
  UserDTO,
  MemoCache,
  StateManager,
  EventBus,
  FormManager,
  Graph,
  ACLManager
};