// Base Heap class for all implementations
class Heap {
  constructor(compareFunction) {
    this.heap = [];
    this.compare = compareFunction || ((a, b) => a - b);
  }

  getParentIndex(i) { return Math.floor((i - 1) / 2); }
  getLeftIndex(i) { return 2 * i + 1; }
  getRightIndex(i) { return 2 * i + 2; }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  add(item) {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  }

  poll() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return root;
  }

  peek() { return this.heap.length > 0 ? this.heap[0] : null; }
  size() { return this.heap.length; }
  isEmpty() { return this.heap.length === 0; }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  heapifyDown(index) {
    while (this.getLeftIndex(index) < this.heap.length) {
      let minIndex = this.getLeftIndex(index);
      const rightIndex = this.getRightIndex(index);
      
      if (rightIndex < this.heap.length && 
          this.compare(this.heap[rightIndex], this.heap[minIndex]) < 0) {
        minIndex = rightIndex;
      }
      
      if (this.compare(this.heap[index], this.heap[minIndex]) <= 0) break;
      this.swap(index, minIndex);
      index = minIndex;
    }
  }
}

// =============================================================================
// HEAP ALGORITHMS
// =============================================================================

// 1. K-Way Merge Algorithm
class KWayMerge {
  static merge(arrays) {
    const heap = new Heap((a, b) => a.value - b.value);
    const result = [];

    // Initialize heap with first element from each array
    arrays.forEach((arr, arrayIndex) => {
      if (arr.length > 0) {
        heap.add({
          value: arr[0],
          arrayIndex,
          elementIndex: 0
        });
      }
    });

    while (!heap.isEmpty()) {
      const { value, arrayIndex, elementIndex } = heap.poll();
      result.push(value);

      // Add next element from the same array
      if (elementIndex + 1 < arrays[arrayIndex].length) {
        heap.add({
          value: arrays[arrayIndex][elementIndex + 1],
          arrayIndex,
          elementIndex: elementIndex + 1
        });
      }
    }

    return result;
  }
}

// 2. Top K Elements Algorithm
class TopKElements {
  static findTopK(arr, k, largest = true) {
    const heap = new Heap(largest ? (a, b) => a - b : (a, b) => b - a);
    
    // For top K largest: use min heap of size K
    // For top K smallest: use max heap of size K
    for (const num of arr) {
      if (heap.size() < k) {
        heap.add(num);
      } else if ((largest && num > heap.peek()) || (!largest && num < heap.peek())) {
        heap.poll();
        heap.add(num);
      }
    }
    
    return heap.heap.sort(largest ? (a, b) => b - a : (a, b) => a - b);
  }
}

// 3. Kth Largest/Smallest Element
class KthElement {
  static findKthLargest(arr, k) {
    const heap = new Heap((a, b) => a - b); // Min heap
    
    for (const num of arr) {
      heap.add(num);
      if (heap.size() > k) {
        heap.poll();
      }
    }
    
    return heap.peek();
  }

  static findKthSmallest(arr, k) {
    const heap = new Heap((a, b) => b - a); // Max heap
    
    for (const num of arr) {
      heap.add(num);
      if (heap.size() > k) {
        heap.poll();
      }
    }
    
    return heap.peek();
  }
}

// 4. Median Finder (Two Heaps Approach)
class MedianFinder {
  constructor() {
    this.maxHeap = new Heap((a, b) => b - a); // Left half
    this.minHeap = new Heap((a, b) => a - b); // Right half
  }

  addNumber(num) {
    // Add to max heap first
    if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
      this.maxHeap.add(num);
    } else {
      this.minHeap.add(num);
    }

    // Balance heaps
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.add(this.maxHeap.poll());
    } else if (this.minHeap.size() > this.maxHeap.size() + 1) {
      this.maxHeap.add(this.minHeap.poll());
    }
  }

  findMedian() {
    if (this.maxHeap.size() === this.minHeap.size()) {
      return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    }
    return this.maxHeap.size() > this.minHeap.size() ? 
           this.maxHeap.peek() : this.minHeap.peek();
  }
}

// =============================================================================
// REAL-WORLD USE CASES
// =============================================================================

// 1. Task Scheduler with Priority and Deadlines
class TaskScheduler {
  constructor() {
    this.taskQueue = new Heap((a, b) => {
      // Higher priority first, then earlier deadline
      if (a.priority !== b.priority) return b.priority - a.priority;
      return a.deadline - b.deadline;
    });
    this.currentTime = 0;
  }

  addTask(id, priority, deadline, duration) {
    this.taskQueue.add({ id, priority, deadline, duration });
  }

  executeNext() {
    if (this.taskQueue.isEmpty()) return null;
    
    const task = this.taskQueue.poll();
    const executionTime = this.currentTime;
    this.currentTime += task.duration;
    
    return {
      ...task,
      executionTime,
      completionTime: this.currentTime,
      isLate: this.currentTime > task.deadline
    };
  }

  getSchedule() {
    const schedule = [];
    while (!this.taskQueue.isEmpty()) {
      schedule.push(this.executeNext());
    }
    return schedule;
  }
}

// 2. Network Packet Router
class PacketRouter {
  constructor(bandwidth) {
    this.packetQueue = new Heap((a, b) => {
      // QoS priority first, then arrival time
      if (a.qos !== b.qos) return a.qos - b.qos; // Lower QoS number = higher priority
      return a.arrivalTime - b.arrivalTime;
    });
    this.bandwidth = bandwidth;
    this.currentTime = 0;
  }

  receivePacket(id, size, qos, arrivalTime = this.currentTime) {
    this.packetQueue.add({ id, size, qos, arrivalTime });
  }

  processPackets() {
    const processed = [];
    
    while (!this.packetQueue.isEmpty()) {
      const packet = this.packetQueue.poll();
      const transmissionTime = packet.size / this.bandwidth;
      
      processed.push({
        ...packet,
        startTime: this.currentTime,
        endTime: this.currentTime + transmissionTime,
        waitTime: this.currentTime - packet.arrivalTime
      });
      
      this.currentTime += transmissionTime;
    }
    
    return processed;
  }
}

// 3. Hospital Emergency Room Triage System
class EmergencyTriage {
  constructor() {
    this.patientQueue = new Heap((a, b) => {
      // Severity first (1 = critical, 5 = minor), then arrival time
      if (a.severity !== b.severity) return a.severity - b.severity;
      return a.arrivalTime - b.arrivalTime;
    });
  }

  admitPatient(id, name, severity, arrivalTime = Date.now()) {
    this.patientQueue.add({ id, name, severity, arrivalTime });
  }

  getNextPatient() {
    return this.patientQueue.poll();
  }

  getWaitingList() {
    return [...this.patientQueue.heap].sort((a, b) => {
      if (a.severity !== b.severity) return a.severity - b.severity;
      return a.arrivalTime - b.arrivalTime;
    });
  }
}

// 4. Memory Management System
class MemoryManager {
  constructor() {
    this.freeBlocks = new Heap((a, b) => a.size - b.size); // Min heap by size
    this.allocatedBlocks = new Map();
  }

  addFreeBlock(address, size) {
    this.freeBlocks.add({ address, size });
  }

  allocate(size, processId) {
    // Find smallest block that fits (best fit algorithm)
    const tempBlocks = [];
    let allocated = null;

    while (!this.freeBlocks.isEmpty()) {
      const block = this.freeBlocks.poll();
      if (block.size >= size) {
        allocated = { address: block.address, size, processId };
        
        // Split block if necessary
        if (block.size > size) {
          this.freeBlocks.add({
            address: block.address + size,
            size: block.size - size
          });
        }
        break;
      }
      tempBlocks.push(block);
    }

    // Restore unused blocks
    tempBlocks.forEach(block => this.freeBlocks.add(block));

    if (allocated) {
      this.allocatedBlocks.set(processId, allocated);
    }

    return allocated;
  }

  deallocate(processId) {
    const block = this.allocatedBlocks.get(processId);
    if (block) {
      this.freeBlocks.add({ address: block.address, size: block.size });
      this.allocatedBlocks.delete(processId);
      return true;
    }
    return false;
  }
}

// 5. Stock Trading System
class TradingSystem {
  constructor() {
    this.buyOrders = new Heap((a, b) => b.price - a.price); // Max heap (highest price first)
    this.sellOrders = new Heap((a, b) => a.price - b.price); // Min heap (lowest price first)
    this.trades = [];
  }

  placeBuyOrder(id, price, quantity) {
    this.buyOrders.add({ id, price, quantity, type: 'BUY', timestamp: Date.now() });
    this.matchOrders();
  }

  placeSellOrder(id, price, quantity) {
    this.sellOrders.add({ id, price, quantity, type: 'SELL', timestamp: Date.now() });
    this.matchOrders();
  }

  matchOrders() {
    while (!this.buyOrders.isEmpty() && !this.sellOrders.isEmpty()) {
      const buyOrder = this.buyOrders.peek();
      const sellOrder = this.sellOrders.peek();

      if (buyOrder.price >= sellOrder.price) {
        const matchedQuantity = Math.min(buyOrder.quantity, sellOrder.quantity);
        const tradePrice = sellOrder.price; // Price improvement for buyer

        this.trades.push({
          buyOrderId: buyOrder.id,
          sellOrderId: sellOrder.id,
          price: tradePrice,
          quantity: matchedQuantity,
          timestamp: Date.now()
        });

        // Update quantities
        buyOrder.quantity -= matchedQuantity;
        sellOrder.quantity -= matchedQuantity;

        // Remove filled orders
        if (buyOrder.quantity === 0) this.buyOrders.poll();
        if (sellOrder.quantity === 0) this.sellOrders.poll();
      } else {
        break; // No more matches possible
      }
    }
  }

  getOrderBook() {
    return {
      buyOrders: [...this.buyOrders.heap].sort((a, b) => b.price - a.price),
      sellOrders: [...this.sellOrders.heap].sort((a, b) => a.price - b.price),
      recentTrades: this.trades.slice(-10)
    };
  }
}

// 6. Event-Driven Simulation
class EventSimulator {
  constructor() {
    this.eventQueue = new Heap((a, b) => a.time - b.time);
    this.currentTime = 0;
  }

  scheduleEvent(time, type, data) {
    this.eventQueue.add({ time, type, data });
  }

  runSimulation(endTime) {
    const results = [];

    while (!this.eventQueue.isEmpty() && this.currentTime < endTime) {
      const event = this.eventQueue.poll();
      this.currentTime = event.time;
      
      results.push({
        ...event,
        processed: true
      });

      // Process event and potentially schedule new events
      this.processEvent(event);
    }

    return results;
  }

  processEvent(event) {
    // Override in specific implementations
    console.log(`Processing event: ${event.type} at time ${event.time}`);
  }
}

// =============================================================================
// DEMONSTRATION AND TESTING
// =============================================================================

console.log("=== HEAP ALGORITHMS DEMO ===\n");

// K-Way Merge
console.log("1. K-Way Merge:");
const arrays = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
console.log("Input arrays:", arrays);
console.log("Merged result:", KWayMerge.merge(arrays));

// Top K Elements
console.log("\n2. Top K Elements:");
const nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
console.log("Array:", nums);
console.log("Top 3 largest:", TopKElements.findTopK(nums, 3, true));
console.log("Top 3 smallest:", TopKElements.findTopK(nums, 3, false));

// Kth Element
console.log("\n3. Kth Element:");
console.log("3rd largest:", KthElement.findKthLargest(nums, 3));
console.log("3rd smallest:", KthElement.findKthSmallest(nums, 3));

// Median Finder
console.log("\n4. Running Median:");
const medianFinder = new MedianFinder();
[1, 2, 3, 4, 5].forEach(num => {
  medianFinder.addNumber(num);
  console.log(`Added ${num}, median: ${medianFinder.findMedian()}`);
});

console.log("\n=== REAL-WORLD USE CASES DEMO ===\n");

// Task Scheduler
console.log("1. Task Scheduler:");
const scheduler = new TaskScheduler();
scheduler.addTask("T1", 3, 10, 2);
scheduler.addTask("T2", 1, 5, 3);
scheduler.addTask("T3", 2, 8, 1);
console.log("Schedule:", scheduler.getSchedule());

// Emergency Triage
console.log("\n2. Hospital Triage:");
const triage = new EmergencyTriage();
triage.admitPatient("P1", "John", 3, 100);
triage.admitPatient("P2", "Jane", 1, 101);
triage.admitPatient("P3", "Bob", 2, 102);
console.log("Next patient:", triage.getNextPatient());
console.log("Waiting list:", triage.getWaitingList());

// Trading System
console.log("\n3. Trading System:");
const trading = new TradingSystem();
trading.placeBuyOrder("B1", 100, 10);
trading.placeSellOrder("S1", 99, 5);
trading.placeBuyOrder("B2", 101, 3);
console.log("Order book:", trading.getOrderBook());

// Memory Manager
console.log("\n4. Memory Manager:");
const memory = new MemoryManager();
memory.addFreeBlock(0, 100);
memory.addFreeBlock(200, 50);
console.log("Allocated 30 bytes:", memory.allocate(30, "P1"));
console.log("Allocated 70 bytes:", memory.allocate(70, "P2"));
console.log("Deallocated P1:", memory.deallocate("P1"));

console.log("\n=== Performance Analysis ===");
console.log("Time Complexities:");
console.log("- Heap Insert: O(log n)");
console.log("- Heap Delete: O(log n)");
console.log("- K-Way Merge: O(n log k)");
console.log("- Top K Elements: O(n log k)");
console.log("- Median Finding: O(log n) per insertion");
console.log("\nSpace Complexities:");
console.log("- All heap implementations: O(n)");
console.log("- Median Finder: O(n)");
console.log("- Real-world applications: O(n) where n is queue size");