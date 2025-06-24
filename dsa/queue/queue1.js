// ============================================================================
// COMPLETE QUEUE ALGORITHMS & VARIANTS IN JAVASCRIPT
// ============================================================================

// 1. BASIC QUEUE IMPLEMENTATION
// ============================================================================
class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
    }
    
    enqueue(element) {
        this.items[this.rear] = element;
        this.rear++;
    }
    
    dequeue() {
        if (this.isEmpty()) return undefined;
        const item = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return item;
    }
    
    peek() {
        return this.isEmpty() ? undefined : this.items[this.front];
    }
    
    isEmpty() {
        return this.front === this.rear;
    }
    
    size() {
        return this.rear - this.front;
    }
    
    clear() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
    }
}

// 2. CIRCULAR QUEUE
// ============================================================================
class CircularQueue {
    constructor(capacity) {
        this.capacity = capacity;
        this.items = new Array(capacity);
        this.front = 0;
        this.rear = 0;
        this.count = 0;
    }
    
    enqueue(element) {
        if (this.isFull()) {
            throw new Error("Queue is full");
        }
        this.items[this.rear] = element;
        this.rear = (this.rear + 1) % this.capacity;
        this.count++;
    }
    
    dequeue() {
        if (this.isEmpty()) return undefined;
        const item = this.items[this.front];
        this.items[this.front] = undefined;
        this.front = (this.front + 1) % this.capacity;
        this.count--;
        return item;
    }
    
    peek() {
        return this.isEmpty() ? undefined : this.items[this.front];
    }
    
    isEmpty() {
        return this.count === 0;
    }
    
    isFull() {
        return this.count === this.capacity;
    }
    
    size() {
        return this.count;
    }
}

// 3. PRIORITY QUEUE (MIN-HEAP BASED)
// ============================================================================
class PriorityQueue {
    constructor(compareFn = (a, b) => a.priority - b.priority) {
        this.heap = [];
        this.compare = compareFn;
    }
    
    enqueue(element, priority) {
        const node = { element, priority };
        this.heap.push(node);
        this.heapifyUp(this.heap.length - 1);
    }
    
    dequeue() {
        if (this.isEmpty()) return undefined;
        if (this.heap.length === 1) return this.heap.pop().element;
        
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return root.element;
    }
    
    peek() {
        return this.isEmpty() ? undefined : this.heap[0].element;
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
    
    size() {
        return this.heap.length;
    }
    
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    
    heapifyDown(index) {
        while (true) {
            let minIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            if (leftChild < this.heap.length && 
                this.compare(this.heap[leftChild], this.heap[minIndex]) < 0) {
                minIndex = leftChild;
            }
            
            if (rightChild < this.heap.length && 
                this.compare(this.heap[rightChild], this.heap[minIndex]) < 0) {
                minIndex = rightChild;
            }
            
            if (minIndex === index) break;
            [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
            index = minIndex;
        }
    }
}

// 4. DOUBLE-ENDED QUEUE (DEQUE)
// ============================================================================
class Deque {
    constructor() {
        this.items = {};
        this.front = 0;
        this.rear = 0;
    }
    
    addFront(element) {
        this.front--;
        this.items[this.front] = element;
    }
    
    addRear(element) {
        this.items[this.rear] = element;
        this.rear++;
    }
    
    removeFront() {
        if (this.isEmpty()) return undefined;
        const item = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return item;
    }
    
    removeRear() {
        if (this.isEmpty()) return undefined;
        this.rear--;
        const item = this.items[this.rear];
        delete this.items[this.rear];
        return item;
    }
    
    peekFront() {
        return this.isEmpty() ? undefined : this.items[this.front];
    }
    
    peekRear() {
        return this.isEmpty() ? undefined : this.items[this.rear - 1];
    }
    
    isEmpty() {
        return this.front === this.rear;
    }
    
    size() {
        return this.rear - this.front;
    }
}

// 5. SLIDING WINDOW MAXIMUM USING DEQUE
// ============================================================================
class SlidingWindowMaximum {
    constructor() {
        this.deque = new Deque(); // stores indices
    }
    
    maxSlidingWindow(nums, k) {
        const result = [];
        
        for (let i = 0; i < nums.length; i++) {
            // Remove indices outside current window
            while (!this.deque.isEmpty() && this.deque.peekFront() < i - k + 1) {
                this.deque.removeFront();
            }
            
            // Remove indices of smaller elements
            while (!this.deque.isEmpty() && nums[this.deque.peekRear()] < nums[i]) {
                this.deque.removeRear();
            }
            
            this.deque.addRear(i);
            
            // Add maximum to result when window is complete
            if (i >= k - 1) {
                result.push(nums[this.deque.peekFront()]);
            }
        }
        
        return result;
    }
    
    minSlidingWindow(nums, k) {
        const result = [];
        this.deque = new Deque();
        
        for (let i = 0; i < nums.length; i++) {
            while (!this.deque.isEmpty() && this.deque.peekFront() < i - k + 1) {
                this.deque.removeFront();
            }
            
            while (!this.deque.isEmpty() && nums[this.deque.peekRear()] > nums[i]) {
                this.deque.removeRear();
            }
            
            this.deque.addRear(i);
            
            if (i >= k - 1) {
                result.push(nums[this.deque.peekFront()]);
            }
        }
        
        return result;
    }
}

// 6. BREADTH-FIRST SEARCH (BFS)
// ============================================================================
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    
    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }
    
    bfs(start) {
        const queue = new Queue();
        const visited = new Set();
        const result = [];
        
        queue.enqueue(start);
        visited.add(start);
        
        while (!queue.isEmpty()) {
            const vertex = queue.dequeue();
            result.push(vertex);
            
            for (const neighbor of this.adjacencyList[vertex]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.enqueue(neighbor);
                }
            }
        }
        
        return result;
    }
    
    shortestPath(start, end) {
        const queue = new Queue();
        const visited = new Set();
        const parent = {};
        
        queue.enqueue(start);
        visited.add(start);
        parent[start] = null;
        
        while (!queue.isEmpty()) {
            const vertex = queue.dequeue();
            
            if (vertex === end) {
                const path = [];
                let current = end;
                while (current !== null) {
                    path.unshift(current);
                    current = parent[current];
                }
                return path;
            }
            
            for (const neighbor of this.adjacencyList[vertex]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    parent[neighbor] = vertex;
                    queue.enqueue(neighbor);
                }
            }
        }
        
        return null; // No path found
    }
}

// 7. JOB SCHEDULING QUEUES
// ============================================================================
class JobScheduler {
    constructor() {
        this.highPriorityQueue = new Queue();
        this.mediumPriorityQueue = new Queue();
        this.lowPriorityQueue = new Queue();
        this.roundRobinQueue = new Queue();
        this.timeSlice = 10;
    }
    
    addJob(job, priority = 'medium') {
        const jobWithTime = { ...job, remainingTime: job.executionTime };
        
        switch (priority) {
            case 'high':
                this.highPriorityQueue.enqueue(jobWithTime);
                break;
            case 'medium':
                this.mediumPriorityQueue.enqueue(jobWithTime);
                break;
            case 'low':
                this.lowPriorityQueue.enqueue(jobWithTime);
                break;
        }
    }
    
    scheduleRoundRobin() {
        const executionOrder = [];
        
        // Move all jobs to round-robin queue
        while (!this.highPriorityQueue.isEmpty()) {
            this.roundRobinQueue.enqueue(this.highPriorityQueue.dequeue());
        }
        while (!this.mediumPriorityQueue.isEmpty()) {
            this.roundRobinQueue.enqueue(this.mediumPriorityQueue.dequeue());
        }
        while (!this.lowPriorityQueue.isEmpty()) {
            this.roundRobinQueue.enqueue(this.lowPriorityQueue.dequeue());
        }
        
        while (!this.roundRobinQueue.isEmpty()) {
            const job = this.roundRobinQueue.dequeue();
            const executeTime = Math.min(job.remainingTime, this.timeSlice);
            
            executionOrder.push({
                jobId: job.id,
                executeTime,
                remainingTime: job.remainingTime - executeTime
            });
            
            job.remainingTime -= executeTime;
            
            if (job.remainingTime > 0) {
                this.roundRobinQueue.enqueue(job);
            }
        }
        
        return executionOrder;
    }
    
    schedulePriority() {
        const executionOrder = [];
        
        const processQueue = (queue) => {
            while (!queue.isEmpty()) {
                executionOrder.push(queue.dequeue());
            }
        };
        
        processQueue(this.highPriorityQueue);
        processQueue(this.mediumPriorityQueue);
        processQueue(this.lowPriorityQueue);
        
        return executionOrder;
    }
}

// 8. PRODUCER-CONSUMER PATTERN
// ============================================================================
class ProducerConsumer {
    constructor(bufferSize = 10) {
        this.buffer = new CircularQueue(bufferSize);
        this.producers = [];
        this.consumers = [];
        this.isRunning = false;
    }
    
    addProducer(producerFn, interval = 1000) {
        this.producers.push({ fn: producerFn, interval });
    }
    
    addConsumer(consumerFn, interval = 1500) {
        this.consumers.push({ fn: consumerFn, interval });
    }
    
    start() {
        this.isRunning = true;
        
        // Start producers
        this.producers.forEach((producer, index) => {
            const producerInterval = setInterval(() => {
                if (!this.isRunning) {
                    clearInterval(producerInterval);
                    return;
                }
                
                try {
                    const item = producer.fn();
                    if (!this.buffer.isFull()) {
                        this.buffer.enqueue(item);
                        console.log(`Producer ${index} produced:`, item);
                    } else {
                        console.log(`Producer ${index} blocked - buffer full`);
                    }
                } catch (error) {
                    console.error(`Producer ${index} error:`, error);
                }
            }, producer.interval);
        });
        
        // Start consumers
        this.consumers.forEach((consumer, index) => {
            const consumerInterval = setInterval(() => {
                if (!this.isRunning) {
                    clearInterval(consumerInterval);
                    return;
                }
                
                try {
                    if (!this.buffer.isEmpty()) {
                        const item = this.buffer.dequeue();
                        consumer.fn(item);
                        console.log(`Consumer ${index} consumed:`, item);
                    } else {
                        console.log(`Consumer ${index} waiting - buffer empty`);
                    }
                } catch (error) {
                    console.error(`Consumer ${index} error:`, error);
                }
            }, consumer.interval);
        });
    }
    
    stop() {
        this.isRunning = false;
    }
    
    getBufferStatus() {
        return {
            size: this.buffer.size(),
            capacity: this.buffer.capacity,
            isEmpty: this.buffer.isEmpty(),
            isFull: this.buffer.isFull()
        };
    }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: Basic Queue
console.log("=== Basic Queue ===");
const queue = new Queue();
queue.enqueue("first");
queue.enqueue("second");
console.log(queue.dequeue()); // "first"
console.log(queue.peek()); // "second"

// Example 2: Circular Queue
console.log("\n=== Circular Queue ===");
const circularQueue = new CircularQueue(3);
circularQueue.enqueue("A");
circularQueue.enqueue("B");
circularQueue.enqueue("C");
console.log(circularQueue.dequeue()); // "A"
circularQueue.enqueue("D");

// Example 3: Priority Queue
console.log("\n=== Priority Queue ===");
const pq = new PriorityQueue();
pq.enqueue("Low priority task", 3);
pq.enqueue("High priority task", 1);
pq.enqueue("Medium priority task", 2);
console.log(pq.dequeue()); // "High priority task"
console.log(pq.dequeue()); // "Medium priority task"

// Example 4: Sliding Window Maximum
console.log("\n=== Sliding Window Maximum ===");
const swm = new SlidingWindowMaximum();
const nums = [1, 3, -1, -3, 5, 3, 6, 7];
console.log(swm.maxSlidingWindow(nums, 3)); // [3, 3, 5, 5, 6, 7]

// Example 5: BFS
console.log("\n=== BFS Graph Traversal ===");
const graph = new Graph();
["A", "B", "C", "D", "E"].forEach(v => graph.addVertex(v));
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
console.log(graph.bfs("A")); // ["A", "B", "C", "D", "E"]
console.log(graph.shortestPath("A", "E")); // ["A", "C", "E"]

// Example 6: Job Scheduler
console.log("\n=== Job Scheduler ===");
const scheduler = new JobScheduler();
scheduler.addJob({ id: 1, executionTime: 15 }, 'high');
scheduler.addJob({ id: 2, executionTime: 25 }, 'medium');
scheduler.addJob({ id: 3, executionTime: 5 }, 'low');
console.log("Round Robin:", scheduler.scheduleRoundRobin());

// Example 7: Producer-Consumer (commented out to avoid infinite execution)
/*
console.log("\n=== Producer-Consumer ===");
const pc = new ProducerConsumer(5);
pc.addProducer(() => Math.floor(Math.random() * 100), 800);
pc.addConsumer((item) => console.log(`Processing: ${item}`), 1200);
pc.start();
setTimeout(() => pc.stop(), 10000); // Run for 10 seconds
*/

console.log("\n=== All Queue Implementations Ready! ===");