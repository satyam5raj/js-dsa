// Base Heap class
class Heap {
  constructor(compareFunction) {
    this.heap = [];
    this.compare = compareFunction || ((a, b) => a - b); // Default: min heap
  }

  // Helper methods for array navigation
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  parent(index) {
    return this.heap[this.getParentIndex(index)];
  }

  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }

  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }

  // Swap two elements in the heap
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  // Get the root element without removing it
  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  // Remove and return the root element
  poll() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }

  // Add a new element to the heap
  add(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  // Restore heap property by moving element up
  heapifyUp() {
    let index = this.heap.length - 1;
    while (this.hasParent(index) && this.compare(this.heap[index], this.parent(index)) < 0) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  // Restore heap property by moving element down
  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      
      if (this.hasRightChild(index) && 
          this.compare(this.rightChild(index), this.leftChild(index)) < 0) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.compare(this.heap[index], this.heap[smallerChildIndex]) < 0) {
        break;
      }

      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  // Get the size of the heap
  size() {
    return this.heap.length;
  }

  // Check if heap is empty
  isEmpty() {
    return this.heap.length === 0;
  }

  // Convert heap to array (for display purposes)
  toArray() {
    return [...this.heap];
  }
}

// Min Heap implementation
class MinHeap extends Heap {
  constructor() {
    super((a, b) => a - b);
  }
}

// Max Heap implementation
class MaxHeap extends Heap {
  constructor() {
    super((a, b) => b - a);
  }
}

// Priority Queue implementation using heap
class PriorityQueue {
  constructor(compareFunction) {
    // Default: higher priority number = higher priority (max heap behavior)
    this.heap = new Heap(compareFunction || ((a, b) => b.priority - a.priority));
  }

  enqueue(item, priority) {
    this.heap.add({ item, priority });
  }

  dequeue() {
    const node = this.heap.poll();
    return node ? node.item : null;
  }

  peek() {
    const node = this.heap.peek();
    return node ? node.item : null;
  }

  size() {
    return this.heap.size();
  }

  isEmpty() {
    return this.heap.isEmpty();
  }
}

// Heap Sort implementation
class HeapSort {
  static sort(arr, ascending = true) {
    const sorted = [...arr];
    const n = sorted.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(sorted, n, i, ascending);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      [sorted[0], sorted[i]] = [sorted[i], sorted[0]];
      
      // Heapify reduced heap
      this.heapify(sorted, i, 0, ascending);
    }

    return sorted;
  }

  static heapify(arr, n, i, ascending) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // For ascending sort, we build max heap
    // For descending sort, we build min heap
    const compare = ascending ? 
      (a, b) => a > b : 
      (a, b) => a < b;

    if (left < n && compare(arr[left], arr[largest])) {
      largest = left;
    }

    if (right < n && compare(arr[right], arr[largest])) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      this.heapify(arr, n, largest, ascending);
    }
  }
}

// Example usage and testing
console.log("=== Min Heap Example ===");
const minHeap = new MinHeap();
[4, 7, 1, 9, 3, 5].forEach(num => minHeap.add(num));
console.log("Min heap:", minHeap.toArray());
console.log("Min element:", minHeap.peek());
console.log("Extracted:", minHeap.poll());
console.log("After extraction:", minHeap.toArray());

console.log("\n=== Max Heap Example ===");
const maxHeap = new MaxHeap();
[4, 7, 1, 9, 3, 5].forEach(num => maxHeap.add(num));
console.log("Max heap:", maxHeap.toArray());
console.log("Max element:", maxHeap.peek());
console.log("Extracted:", maxHeap.poll());
console.log("After extraction:", maxHeap.toArray());

console.log("\n=== Priority Queue Example ===");
const pq = new PriorityQueue();
pq.enqueue("Low priority task", 1);
pq.enqueue("High priority task", 5);
pq.enqueue("Medium priority task", 3);
pq.enqueue("Critical task", 10);

console.log("Processing tasks by priority:");
while (!pq.isEmpty()) {
  console.log("Processing:", pq.dequeue());
}

console.log("\n=== Heap Sort Example ===");
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", unsortedArray);
console.log("Sorted (ascending):", HeapSort.sort(unsortedArray, true));
console.log("Sorted (descending):", HeapSort.sort(unsortedArray, false));

console.log("\n=== Custom Object Heap Example ===");
const customHeap = new Heap((a, b) => a.age - b.age); // Sort by age
const people = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
  { name: "Diana", age: 28 }
];

people.forEach(person => customHeap.add(person));
console.log("Youngest person:", customHeap.peek());
console.log("All people by age:", customHeap.toArray());