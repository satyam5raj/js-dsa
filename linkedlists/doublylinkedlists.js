// ==============================================
// DOUBLY LINKED LIST NODE
// ==============================================

class DoublyListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

// ==============================================
// CORE DOUBLY LINKED LIST CLASS
// ==============================================

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 1. INSERTION & DELETION AT BOTH ENDS - O(1)
  
  insertAtHead(data) {
    const newNode = new DoublyListNode(data);
    
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    
    this.size++;
    return newNode;
  }

  insertAtTail(data) {
    const newNode = new DoublyListNode(data);
    
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    
    this.size++;
    return newNode;
  }

  removeFromHead() {
    if (!this.head) return null;
    
    const data = this.head.data;
    
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    
    this.size--;
    return data;
  }

  removeFromTail() {
    if (!this.tail) return null;
    
    const data = this.tail.data;
    
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    
    this.size--;
    return data;
  }

  // 2. REVERSING A DOUBLY LINKED LIST
  
  reverse() {
    if (!this.head || !this.head.next) return;
    
    let current = this.head;
    let temp = null;
    
    // Swap next and prev for all nodes
    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev; // Move to next node (which is now prev)
    }
    
    // Swap head and tail
    temp = this.head;
    this.head = this.tail;
    this.tail = temp;
  }

  // 3. SEARCH & REMOVE NODE
  
  search(data) {
    let current = this.head;
    let position = 0;
    
    while (current) {
      if (current.data === data) {
        return { node: current, position };
      }
      current = current.next;
      position++;
    }
    
    return null;
  }

  searchBackward(data) {
    let current = this.tail;
    let position = this.size - 1;
    
    while (current) {
      if (current.data === data) {
        return { node: current, position };
      }
      current = current.prev;
      position--;
    }
    
    return null;
  }

  removeNode(node) {
    if (!node) return false;
    
    if (node === this.head && node === this.tail) {
      this.head = this.tail = null;
    } else if (node === this.head) {
      this.head = node.next;
      this.head.prev = null;
    } else if (node === this.tail) {
      this.tail = node.prev;
      this.tail.next = null;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    
    this.size--;
    return true;
  }

  removeByValue(data) {
    const result = this.search(data);
    if (result) {
      return this.removeNode(result.node);
    }
    return false;
  }

  // 4. SPLITTING A DOUBLY LINKED LIST
  
  splitAt(position) {
    if (position < 0 || position >= this.size) {
      throw new Error('Invalid position');
    }
    
    const secondList = new DoublyLinkedList();
    
    if (position === 0) {
      // Move entire list to second list
      secondList.head = this.head;
      secondList.tail = this.tail;
      secondList.size = this.size;
      this.head = this.tail = null;
      this.size = 0;
      return secondList;
    }
    
    let current = this.head;
    for (let i = 0; i < position; i++) {
      current = current.next;
    }
    
    // Set up second list
    secondList.head = current;
    secondList.tail = this.tail;
    secondList.size = this.size - position;
    
    // Update first list
    this.tail = current.prev;
    this.tail.next = null;
    this.size = position;
    
    // Break the connection
    current.prev = null;
    
    return secondList;
  }

  // 5. CONCATENATION
  
  concat(otherList) {
    if (!otherList || otherList.size === 0) return;
    
    if (this.size === 0) {
      this.head = otherList.head;
      this.tail = otherList.tail;
      this.size = otherList.size;
    } else {
      this.tail.next = otherList.head;
      if (otherList.head) {
        otherList.head.prev = this.tail;
      }
      this.tail = otherList.tail;
      this.size += otherList.size;
    }
    
    // Clear the other list
    otherList.head = otherList.tail = null;
    otherList.size = 0;
  }

  // UTILITY METHODS
  
  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  toArray() {
    const result = [];
    let current = this.head;
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    return result;
  }

  toArrayReverse() {
    const result = [];
    let current = this.tail;
    
    while (current) {
      result.push(current.data);
      current = current.prev;
    }
    
    return result;
  }

  toString() {
    return this.toArray().join(' <-> ');
  }
}

// ==============================================
// 6. DEQUE IMPLEMENTATION
// ==============================================

class Deque {
  constructor() {
    this.list = new DoublyLinkedList();
  }

  // Add to front
  addFront(item) {
    this.list.insertAtHead(item);
  }

  // Add to rear
  addRear(item) {
    this.list.insertAtTail(item);
  }

  // Remove from front
  removeFront() {
    if (this.isEmpty()) {
      throw new Error('Deque is empty');
    }
    return this.list.removeFromHead();
  }

  // Remove from rear
  removeRear() {
    if (this.isEmpty()) {
      throw new Error('Deque is empty');
    }
    return this.list.removeFromTail();
  }

  // Peek operations
  peekFront() {
    return this.list.head ? this.list.head.data : null;
  }

  peekRear() {
    return this.list.tail ? this.list.tail.data : null;
  }

  isEmpty() {
    return this.list.isEmpty();
  }

  size() {
    return this.list.getSize();
  }

  toArray() {
    return this.list.toArray();
  }
}

// ==============================================
// 7. LRU CACHE IMPLEMENTATION
// ==============================================

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key -> node
    this.list = new DoublyLinkedList();
  }

  get(key) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      // Move to front (most recently used)
      this.list.removeNode(node);
      const newNode = this.list.insertAtHead(node.data);
      this.cache.set(key, newNode);
      return node.data.value;
    }
    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // Update existing
      const node = this.cache.get(key);
      this.list.removeNode(node);
      const newNode = this.list.insertAtHead({ key, value });
      this.cache.set(key, newNode);
    } else {
      // Add new
      if (this.cache.size >= this.capacity) {
        // Remove least recently used (tail)
        const lru = this.list.tail.data;
        this.cache.delete(lru.key);
        this.list.removeFromTail();
      }
      
      const newNode = this.list.insertAtHead({ key, value });
      this.cache.set(key, newNode);
    }
  }

  keys() {
    return Array.from(this.cache.keys());
  }

  values() {
    return this.list.toArray().map(item => item.value);
  }

  size() {
    return this.cache.size;
  }
}

// ==============================================
// REAL-WORLD USE CASE IMPLEMENTATIONS
// ==============================================

// 1. BROWSER HISTORY NAVIGATION
class BrowserHistory {
  constructor() {
    this.history = new DoublyLinkedList();
    this.current = null;
  }

  visit(url) {
    // Remove any forward history when visiting new page
    if (this.current && this.current.next) {
      let nodeToRemove = this.current.next;
      while (nodeToRemove) {
        const next = nodeToRemove.next;
        this.history.removeNode(nodeToRemove);
        nodeToRemove = next;
      }
    }

    // Add new page
    const node = this.history.insertAtTail(url);
    this.current = node;
  }

  back() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      return this.current.data;
    }
    return null;
  }

  forward() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current.data;
    }
    return null;
  }

  getCurrentUrl() {
    return this.current ? this.current.data : null;
  }

  getHistory() {
    return this.history.toArray();
  }

  canGoBack() {
    return this.current && this.current.prev !== null;
  }

  canGoForward() {
    return this.current && this.current.next !== null;
  }
}

// 2. UNDO/REDO FUNCTIONALITY
class UndoRedoManager {
  constructor(maxHistory = 50) {
    this.history = new DoublyLinkedList();
    this.current = null;
    this.maxHistory = maxHistory;
  }

  executeCommand(command) {
    // Remove any redo history
    if (this.current && this.current.next) {
      let nodeToRemove = this.current.next;
      while (nodeToRemove) {
        const next = nodeToRemove.next;
        this.history.removeNode(nodeToRemove);
        nodeToRemove = next;
      }
    }

    // Execute and store command
    command.execute();
    const node = this.history.insertAtTail({
      command,
      timestamp: Date.now()
    });
    this.current = node;

    // Limit history size
    while (this.history.size > this.maxHistory) {
      this.history.removeFromHead();
    }
  }

  undo() {
    if (this.current) {
      this.current.data.command.undo();
      this.current = this.current.prev;
      return true;
    }
    return false;
  }

  redo() {
    const nextNode = this.current ? this.current.next : this.history.head;
    if (nextNode) {
      nextNode.data.command.execute();
      this.current = nextNode;
      return true;
    }
    return false;
  }

  canUndo() {
    return this.current !== null;
  }

  canRedo() {
    const nextNode = this.current ? this.current.next : this.history.head;
    return nextNode !== null;
  }

  getHistorySize() {
    return this.history.size;
  }
}

// 3. MUSIC PLAYLIST
class MusicPlaylist {
  constructor(name) {
    this.name = name;
    this.tracks = new DoublyLinkedList();
    this.currentTrack = null;
    this.isShuffled = false;
    this.repeatMode = 'none'; // 'none', 'one', 'all'
  }

  addTrack(track) {
    const node = this.tracks.insertAtTail(track);
    if (!this.currentTrack) {
      this.currentTrack = node;
    }
    return node;
  }

  removeTrack(trackId) {
    const result = this.tracks.search(track => track.id === trackId);
    if (result) {
      if (result.node === this.currentTrack) {
        this.currentTrack = result.node.next || result.node.prev;
      }
      return this.tracks.removeNode(result.node);
    }
    return false;
  }

  nextTrack() {
    if (!this.currentTrack) return null;

    if (this.repeatMode === 'one') {
      return this.currentTrack.data;
    }

    let next = this.currentTrack.next;
    if (!next && this.repeatMode === 'all') {
      next = this.tracks.head; // Loop to beginning
    }

    if (next) {
      this.currentTrack = next;
      return this.currentTrack.data;
    }

    return null;
  }

  previousTrack() {
    if (!this.currentTrack) return null;

    if (this.repeatMode === 'one') {
      return this.currentTrack.data;
    }

    let prev = this.currentTrack.prev;
    if (!prev && this.repeatMode === 'all') {
      prev = this.tracks.tail; // Loop to end
    }

    if (prev) {
      this.currentTrack = prev;
      return this.currentTrack.data;
    }

    return null;
  }

  getCurrentTrack() {
    return this.currentTrack ? this.currentTrack.data : null;
  }

  jumpToTrack(trackId) {
    const result = this.tracks.search(track => track.id === trackId);
    if (result) {
      this.currentTrack = result.node;
      return this.currentTrack.data;
    }
    return null;
  }

  setRepeatMode(mode) {
    this.repeatMode = mode;
  }

  getAllTracks() {
    return this.tracks.toArray();
  }

  getPlaylistInfo() {
    return {
      name: this.name,
      totalTracks: this.tracks.size,
      currentTrack: this.getCurrentTrack(),
      repeatMode: this.repeatMode
    };
  }
}

// 4. TEXT EDITOR BUFFER
class TextEditorBuffer {
  constructor() {
    this.lines = new DoublyLinkedList();
    this.currentLine = null;
    this.cursorPosition = 0;
    this.undoManager = new UndoRedoManager();
  }

  insertLine(text, position = null) {
    const command = {
      execute: () => {
        const node = position !== null 
          ? this.lines.insertAtTail(text) 
          : this.lines.insertAtTail(text);
        
        if (!this.currentLine) {
          this.currentLine = node;
        }
      },
      undo: () => {
        // Implementation for undo
        this.lines.removeByValue(text);
      }
    };
    
    this.undoManager.executeCommand(command);
  }

  deleteLine() {
    if (!this.currentLine) return;
    
    const lineToDelete = this.currentLine.data;
    const command = {
      execute: () => {
        const next = this.currentLine.next || this.currentLine.prev;
        this.lines.removeNode(this.currentLine);
        this.currentLine = next;
      },
      undo: () => {
        this.insertLine(lineToDelete);
      }
    };
    
    this.undoManager.executeCommand(command);
  }

  moveUp() {
    if (this.currentLine && this.currentLine.prev) {
      this.currentLine = this.currentLine.prev;
      return true;
    }
    return false;
  }

  moveDown() {
    if (this.currentLine && this.currentLine.next) {
      this.currentLine = this.currentLine.next;
      return true;
    }
    return false;
  }

  getCurrentLine() {
    return this.currentLine ? this.currentLine.data : '';
  }

  getAllLines() {
    return this.lines.toArray();
  }

  undo() {
    return this.undoManager.undo();
  }

  redo() {
    return this.undoManager.redo();
  }
}

// 5. TASK SCHEDULER
class TaskScheduler {
  constructor() {
    this.tasks = new DoublyLinkedList();
    this.currentTask = null;
  }

  addTask(task) {
    const node = this.tasks.insertAtTail({
      ...task,
      id: Date.now() + Math.random(),
      createdAt: new Date(),
      status: 'pending'
    });
    return node.data;
  }

  addHighPriorityTask(task) {
    const node = this.tasks.insertAtHead({
      ...task,
      id: Date.now() + Math.random(),
      createdAt: new Date(),
      status: 'pending',
      priority: 'high'
    });
    return node.data;
  }

  getNextTask() {
    let current = this.tasks.head;
    while (current) {
      if (current.data.status === 'pending') {
        this.currentTask = current;
        current.data.status = 'running';
        return current.data;
      }
      current = current.next;
    }
    return null;
  }

  completeCurrentTask() {
    if (this.currentTask) {
      this.currentTask.data.status = 'completed';
      this.currentTask.data.completedAt = new Date();
      this.currentTask = null;
      return true;
    }
    return false;
  }

  moveTaskToPosition(taskId, newPosition) {
    const result = this.tasks.search(task => task.id === taskId);
    if (result) {
      const taskData = result.node.data;
      this.tasks.removeNode(result.node);
      
      // Re-insert at new position
      if (newPosition === 0) {
        this.tasks.insertAtHead(taskData);
      } else {
        // Find position and insert
        let current = this.tasks.head;
        for (let i = 0; i < newPosition - 1 && current; i++) {
          current = current.next;
        }
        if (current) {
          const newNode = new DoublyListNode(taskData);
          newNode.next = current.next;
          newNode.prev = current;
          if (current.next) {
            current.next.prev = newNode;
          }
          current.next = newNode;
          if (newNode.next === null) {
            this.tasks.tail = newNode;
          }
          this.tasks.size++;
        }
      }
    }
  }

  getAllTasks() {
    return this.tasks.toArray();
  }

  getPendingTasks() {
    return this.tasks.toArray().filter(task => task.status === 'pending');
  }
}

// 6. NAVIGATION SYSTEMS
class NavigationSystem {
  constructor() {
    this.routes = new DoublyLinkedList();
    this.currentLocation = null;
    this.waypoints = new Map(); // location -> node mapping
  }

  addWaypoint(location) {
    const node = this.routes.insertAtTail({
      id: Date.now() + Math.random(),
      location: location,
      coordinates: location.coordinates || { lat: 0, lng: 0 },
      timestamp: new Date(),
      visited: false,
      estimatedTime: location.estimatedTime || 0,
      distance: location.distance || 0
    });
    
    this.waypoints.set(location.name, node);
    
    if (!this.currentLocation) {
      this.currentLocation = node;
      node.data.visited = true;
    }
    
    return node.data;
  }

  removeWaypoint(locationName) {
    const node = this.waypoints.get(locationName);
    if (node) {
      if (node === this.currentLocation) {
        this.currentLocation = node.next || node.prev;
      }
      this.routes.removeNode(node);
      this.waypoints.delete(locationName);
      return true;
    }
    return false;
  }

  moveToNext() {
    if (this.currentLocation && this.currentLocation.next) {
      this.currentLocation = this.currentLocation.next;
      this.currentLocation.data.visited = true;
      this.currentLocation.data.arrivedAt = new Date();
      return {
        current: this.currentLocation.data,
        hasNext: this.currentLocation.next !== null,
        hasPrevious: this.currentLocation.prev !== null
      };
    }
    return null;
  }

  moveToPrevious() {
    if (this.currentLocation && this.currentLocation.prev) {
      this.currentLocation = this.currentLocation.prev;
      return {
        current: this.currentLocation.data,
        hasNext: this.currentLocation.next !== null,
        hasPrevious: this.currentLocation.prev !== null
      };
    }
    return null;
  }

  jumpToLocation(locationName) {
    const node = this.waypoints.get(locationName);
    if (node) {
      this.currentLocation = node;
      node.data.visited = true;
      node.data.arrivedAt = new Date();
      return node.data;
    }
    return null;
  }

  insertWaypointAfterCurrent(location) {
    if (!this.currentLocation) {
      return this.addWaypoint(location);
    }

    const newNode = new DoublyListNode({
      id: Date.now() + Math.random(),
      location: location,
      coordinates: location.coordinates || { lat: 0, lng: 0 },
      timestamp: new Date(),
      visited: false,
      estimatedTime: location.estimatedTime || 0,
      distance: location.distance || 0
    });

    // Insert after current location
    newNode.next = this.currentLocation.next;
    newNode.prev = this.currentLocation;
    
    if (this.currentLocation.next) {
      this.currentLocation.next.prev = newNode;
    } else {
      this.routes.tail = newNode;
    }
    
    this.currentLocation.next = newNode;
    this.routes.size++;
    
    this.waypoints.set(location.name, newNode);
    return newNode.data;
  }

  reroute(newWaypoints) {
    // Keep current location and add new route from there
    if (this.currentLocation) {
      // Remove all waypoints after current
      let nodeToRemove = this.currentLocation.next;
      while (nodeToRemove) {
        const next = nodeToRemove.next;
        this.waypoints.delete(nodeToRemove.data.location.name);
        this.routes.removeNode(nodeToRemove);
        nodeToRemove = next;
      }
    }

    // Add new waypoints
    newWaypoints.forEach(waypoint => {
      this.addWaypoint(waypoint);
    });
  }

  getCurrentLocation() {
    return this.currentLocation ? this.currentLocation.data : null;
  }

  getNextLocation() {
    return this.currentLocation && this.currentLocation.next 
      ? this.currentLocation.next.data 
      : null;
  }

  getPreviousLocation() {
    return this.currentLocation && this.currentLocation.prev 
      ? this.currentLocation.prev.data 
      : null;
  }

  getFullRoute() {
    return this.routes.toArray();
  }

  getRemainingRoute() {
    if (!this.currentLocation) return [];
    
    const remaining = [];
    let current = this.currentLocation.next;
    
    while (current) {
      remaining.push(current.data);
      current = current.next;
    }
    
    return remaining;
  }

  getTotalDistance() {
    return this.routes.toArray().reduce((total, waypoint) => total + waypoint.distance, 0);
  }

  getTotalEstimatedTime() {
    return this.routes.toArray().reduce((total, waypoint) => total + waypoint.estimatedTime, 0);
  }

  getRouteProgress() {
    const total = this.routes.size;
    const visited = this.routes.toArray().filter(w => w.visited).length;
    
    return {
      total,
      visited,
      remaining: total - visited,
      percentage: total > 0 ? (visited / total) * 100 : 0
    };
  }
}

// 7. ADVANCED DEQUE IMPLEMENTATIONS
// Priority Deque - maintains order while allowing both-end operations
class PriorityDeque {
  constructor(compareFn = (a, b) => a - b) {
    this.list = new DoublyLinkedList();
    this.compare = compareFn;
  }

  // Add item maintaining priority order
  addWithPriority(item) {
    if (this.list.isEmpty()) {
      return this.list.insertAtHead(item);
    }

    let current = this.list.head;
    
    // Find correct position
    while (current && this.compare(item, current.data) > 0) {
      current = current.next;
    }

    if (!current) {
      // Insert at tail
      return this.list.insertAtTail(item);
    } else if (current === this.list.head) {
      // Insert at head
      return this.list.insertAtHead(item);
    } else {
      // Insert before current
      const newNode = new DoublyListNode(item);
      newNode.next = current;
      newNode.prev = current.prev;
      current.prev.next = newNode;
      current.prev = newNode;
      this.list.size++;
      return newNode;
    }
  }

  // Standard deque operations
  addFront(item) {
    return this.list.insertAtHead(item);
  }

  addRear(item) {
    return this.list.insertAtTail(item);
  }

  removeFront() {
    return this.list.removeFromHead();
  }

  removeRear() {
    return this.list.removeFromTail();
  }

  peekFront() {
    return this.list.head ? this.list.head.data : null;
  }

  peekRear() {
    return this.list.tail ? this.list.tail.data : null;
  }

  isEmpty() {
    return this.list.isEmpty();
  }

  size() {
    return this.list.getSize();
  }

  toArray() {
    return this.list.toArray();
  }
}

// Sliding Window Deque - for algorithms requiring sliding window operations
class SlidingWindowDeque {
  constructor(windowSize) {
    this.deque = new Deque();
    this.windowSize = windowSize;
    this.currentSum = 0; // for numeric operations
  }

  addElement(element) {
    // Add to rear
    this.deque.addRear(element);
    
    if (typeof element === 'number') {
      this.currentSum += element;
    }

    // Remove from front if window size exceeded
    if (this.deque.size() > this.windowSize) {
      const removed = this.deque.removeFront();
      if (typeof removed === 'number') {
        this.currentSum -= removed;
      }
      return removed;
    }
    
    return null;
  }

  getCurrentWindow() {
    return this.deque.toArray();
  }

  getWindowSum() {
    return this.currentSum;
  }

  getWindowAverage() {
    return this.deque.size() > 0 ? this.currentSum / this.deque.size() : 0;
  }

  getWindowMax() {
    const window = this.getCurrentWindow();
    return window.length > 0 ? Math.max(...window.filter(x => typeof x === 'number')) : null;
  }

  getWindowMin() {
    const window = this.getCurrentWindow();
    return window.length > 0 ? Math.min(...window.filter(x => typeof x === 'number')) : null;
  }

  isFull() {
    return this.deque.size() === this.windowSize;
  }

  reset() {
    this.deque = new Deque();
    this.currentSum = 0;
  }
}

// Work Stealing Deque - for parallel processing
class WorkStealingDeque {
  constructor(workerId) {
    this.workerId = workerId;
    this.deque = new Deque();
    this.isLocked = false;
  }

  // Add work to own queue (at rear)
  pushWork(work) {
    if (this.isLocked) return false;
    
    this.deque.addRear({
      id: Date.now() + Math.random(),
      work: work,
      ownerId: this.workerId,
      createdAt: new Date(),
      priority: work.priority || 0
    });
    return true;
  }

  // Take work from own queue (from rear - LIFO for better cache locality)
  popWork() {
    if (this.isLocked || this.deque.isEmpty()) return null;
    
    const work = this.deque.removeRear();
    return work;
  }

  // Steal work from this queue (from front - FIFO to avoid conflicts)
  stealWork(stealerId) {
    if (this.isLocked || this.deque.isEmpty()) return null;

    this.isLocked = true;
    const work = this.deque.removeFront();
    
    if (work) {
      work.stolenBy = stealerId;
      work.stolenAt = new Date();
    }
    
    this.isLocked = false;
    return work;
  }

  // Check if there's work available for stealing
  hasWorkToSteal() {
    return !this.isLocked && !this.deque.isEmpty();
  }

  getWorkCount() {
    return this.deque.size();
  }

  getPendingWork() {
    return this.deque.toArray();
  }

  lock() {
    this.isLocked = true;
  }

  unlock() {
    this.isLocked = false;
  }
}

// Circular Deque - with wrap-around functionality
class CircularDeque {
  constructor(capacity) {
    this.capacity = capacity;
    this.deque = new Deque();
  }

  addFront(item) {
    if (this.deque.size() >= this.capacity) {
      this.deque.removeRear(); // Remove from rear when full
    }
    this.deque.addFront(item);
  }

  addRear(item) {
    if (this.deque.size() >= this.capacity) {
      this.deque.removeFront(); // Remove from front when full
    }
    this.deque.addRear(item);
  }

  removeFront() {
    return this.deque.removeFront();
  }

  removeRear() {
    return this.deque.removeRear();
  }

  peekFront() {
    return this.deque.peekFront();
  }

  peekRear() {
    return this.deque.peekRear();
  }

  isFull() {
    return this.deque.size() >= this.capacity;
  }

  isEmpty() {
    return this.deque.isEmpty();
  }

  size() {
    return this.deque.size();
  }

  getCapacity() {
    return this.capacity;
  }

  toArray() {
    return this.deque.toArray();
  }
}

// ==============================================
// USAGE EXAMPLES
// ==============================================

console.log('=== DOUBLY LINKED LIST EXAMPLES ===');

// 1. Basic operations
const dll = new DoublyLinkedList();
dll.insertAtHead(1);
dll.insertAtTail(2);
dll.insertAtTail(3);
console.log('List:', dll.toString());
console.log('Reverse list:', dll.toArrayReverse());

// 2. Reverse operation
dll.reverse();
console.log('After reverse:', dll.toString());

// 3. Split operation
const dll2 = new DoublyLinkedList();
[1, 2, 3, 4, 5].forEach(x => dll2.insertAtTail(x));
const splitList = dll2.splitAt(2);
console.log('Original after split:', dll2.toString());
console.log('Split list:', splitList.toString());

// 4. Deque usage
const deque = new Deque();
deque.addFront('A');
deque.addRear('B');
deque.addFront('C');
console.log('Deque:', deque.toArray());
console.log('Remove front:', deque.removeFront());
console.log('Remove rear:', deque.removeRear());

// 5. LRU Cache usage
const lru = new LRUCache(3);
lru.put('a', 1);
lru.put('b', 2);
lru.put('c', 3);
console.log('LRU get a:', lru.get('a'));
lru.put('d', 4); // Should evict 'b'
console.log('LRU keys:', lru.keys());

// 6. Browser History usage
const browser = new BrowserHistory();
browser.visit('google.com');
browser.visit('stackoverflow.com');
browser.visit('github.com');
console.log('Current:', browser.getCurrentUrl());
console.log('Back:', browser.back());
console.log('Back:', browser.back());
console.log('Forward:', browser.forward());

// 7. Music Playlist usage
const playlist = new MusicPlaylist('My Favorites');
playlist.addTrack({ id: 1, title: 'Song 1', artist: 'Artist 1' });
playlist.addTrack({ id: 2, title: 'Song 2', artist: 'Artist 2' });
playlist.addTrack({ id: 3, title: 'Song 3', artist: 'Artist 3' });
console.log('Current track:', playlist.getCurrentTrack());
console.log('Next track:', playlist.nextTrack());
console.log('Previous track:', playlist.previousTrack());

// 8. Navigation System usage
console.log('\n=== NAVIGATION SYSTEM EXAMPLES ===');
const nav = new NavigationSystem();
nav.addWaypoint({ 
  name: 'Home', 
  coordinates: { lat: 40.7128, lng: -74.0060 },
  estimatedTime: 0,
  distance: 0
});
nav.addWaypoint({ 
  name: 'Office', 
  coordinates: { lat: 40.7580, lng: -73.9855 },
  estimatedTime: 30,
  distance: 5.2
});
nav.addWaypoint({ 
  name: 'Store', 
  coordinates: { lat: 40.7505, lng: -73.9934 },
  estimatedTime: 15,
  distance: 2.1
});

console.log('Current location:', nav.getCurrentLocation()?.location.name);
console.log('Next location:', nav.getNextLocation()?.location.name);
console.log('Move to next:', nav.moveToNext()?.current.location.name);
console.log('Route progress:', nav.getRouteProgress());
console.log('Total distance:', nav.getTotalDistance(), 'miles');

// Insert new waypoint after current
nav.insertWaypointAfterCurrent({
  name: 'Gas Station',
  coordinates: { lat: 40.7589, lng: -73.9851 },
  estimatedTime: 10,
  distance: 1.5
});
console.log('Full route after insertion:', nav.getFullRoute().map(w => w.location.name));

// 9. Advanced Deque implementations
console.log('\n=== ADVANCED DEQUE EXAMPLES ===');

// Priority Deque
const priorityDeque = new PriorityDeque();
priorityDeque.addWithPriority(5);
priorityDeque.addWithPriority(2);
priorityDeque.addWithPriority(8);
priorityDeque.addWithPriority(1);
console.log('Priority deque (sorted):', priorityDeque.toArray());
console.log('Remove front (lowest):', priorityDeque.removeFront());
console.log('Remove rear (highest):', priorityDeque.removeRear());

// Sliding Window Deque
const slidingWindow = new SlidingWindowDeque(3);
[1, 2, 3, 4, 5, 6].forEach(num => {
  const removed = slidingWindow.addElement(num);
  console.log(`Added ${num}, Window: [${slidingWindow.getCurrentWindow()}], Sum: ${slidingWindow.getWindowSum()}, Avg: ${slidingWindow.getWindowAverage().toFixed(2)}`);
});

// Work Stealing Deque
const worker1 = new WorkStealingDeque('worker-1');
const worker2 = new WorkStealingDeque('worker-2');

worker1.pushWork({ task: 'process-data-1', priority: 1 });
worker1.pushWork({ task: 'process-data-2', priority: 2 });
worker1.pushWork({ task: 'process-data-3', priority: 1 });

console.log('Worker 1 has work to steal:', worker1.hasWorkToSteal());
console.log('Worker 1 work count:', worker1.getWorkCount());

// Worker 2 steals work from worker 1
const stolenWork = worker1.stealWork('worker-2');
console.log('Stolen work:', stolenWork?.work.task);
console.log('Worker 1 work count after steal:', worker1.getWorkCount());

// Circular Deque
const circularDeque = new CircularDeque(3);
['A', 'B', 'C', 'D', 'E'].forEach(item => {
  circularDeque.addRear(item);
  console.log(`Added ${item}, Circular deque: [${circularDeque.toArray()}]`);
});

export {
  DoublyListNode,
  DoublyLinkedList,
  Deque,
  LRUCache,
  BrowserHistory,
  UndoRedoManager,
  MusicPlaylist,
  TextEditorBuffer,
  TaskScheduler,
  NavigationSystem,
  PriorityDeque,
  SlidingWindowDeque,
  WorkStealingDeque,
  CircularDeque
};