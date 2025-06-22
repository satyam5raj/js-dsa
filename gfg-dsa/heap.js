// ==========================================
// HEAP PROBLEMS - COMPLETE SOLUTION GUIDE
// ==========================================

// Problem 1: Implement a MaxHeap/MinHeap using arrays and recursion
/*
Question: Implement both MaxHeap and MinHeap data structures using arrays with basic operations
Approach: Use array representation where for index i:
- Parent: Math.floor((i-1)/2)
- Left child: 2*i + 1
- Right child: 2*i + 2
Time Complexity: Insert/Delete - O(log n), Peek - O(1)
*/

class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }
    
    getRightChildIndex(index) {
        return 2 * index + 2;
    }
    
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }
    
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }
    
    heapifyUp(index) {
        if (index === 0) return;
        
        const parentIndex = this.getParentIndex(index);
        if (this.heap[parentIndex] < this.heap[index]) {
            this.swap(parentIndex, index);
            this.heapifyUp(parentIndex);
        }
    }
    
    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }
    
    heapifyDown(index) {
        const leftIndex = this.getLeftChildIndex(index);
        const rightIndex = this.getRightChildIndex(index);
        let largest = index;
        
        if (leftIndex < this.heap.length && this.heap[leftIndex] > this.heap[largest]) {
            largest = leftIndex;
        }
        
        if (rightIndex < this.heap.length && this.heap[rightIndex] > this.heap[largest]) {
            largest = rightIndex;
        }
        
        if (largest !== index) {
            this.swap(index, largest);
            this.heapifyDown(largest);
        }
    }
    
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }
    
    getRightChildIndex(index) {
        return 2 * index + 2;
    }
    
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }
    
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }
    
    heapifyUp(index) {
        if (index === 0) return;
        
        const parentIndex = this.getParentIndex(index);
        if (this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index);
            this.heapifyUp(parentIndex);
        }
    }
    
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }
    
    heapifyDown(index) {
        const leftIndex = this.getLeftChildIndex(index);
        const rightIndex = this.getRightChildIndex(index);
        let smallest = index;
        
        if (leftIndex < this.heap.length && this.heap[leftIndex] < this.heap[smallest]) {
            smallest = leftIndex;
        }
        
        if (rightIndex < this.heap.length && this.heap[rightIndex] < this.heap[smallest]) {
            smallest = rightIndex;
        }
        
        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
    }
    
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
}

// Test Case 1
console.log("=== Problem 1: MaxHeap and MinHeap ===");
const maxHeap = new MaxHeap();
[10, 4, 15, 20, 0, 30].forEach(val => maxHeap.insert(val));
console.log("MaxHeap peek:", maxHeap.peek()); // 30
console.log("Extract max:", maxHeap.extractMax()); // 30
console.log("New peek:", maxHeap.peek()); // 20

const minHeap = new MinHeap();
[10, 4, 15, 20, 0, 30].forEach(val => minHeap.insert(val));
console.log("MinHeap peek:", minHeap.peek()); // 0
console.log("Extract min:", minHeap.extractMin()); // 0
console.log("New peek:", minHeap.peek()); // 4

// ==========================================

// Problem 2: Sort an Array using heap (HeapSort)
/*
Question: Sort an array using heap sort algorithm
Approach: 
1. Build a max heap from the array
2. Repeatedly extract the maximum element and place it at the end
Time Complexity: O(n log n)
Space Complexity: O(1)
*/

function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]; // Move current root to end
        heapify(arr, i, 0); // Call heapify on the reduced heap
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// Test Case 2
console.log("\n=== Problem 2: HeapSort ===");
const sortArray = [12, 11, 13, 5, 6, 7];
console.log("Original:", sortArray);
console.log("Sorted:", heapSort([...sortArray]));

// ==========================================

// Problem 3: Maximum of all subarrays of size k
/*
Question: Find maximum element in every subarray of size k
Approach: Use a deque (implemented with array) to maintain indices of useful elements
Time Complexity: O(n)
Space Complexity: O(k)
*/

function maxInSubarrays(arr, k) {
    const result = [];
    const deque = []; // Store indices
    
    for (let i = 0; i < arr.length; i++) {
        // Remove indices that are out of current window
        while (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }
        
        // Remove indices whose corresponding values are smaller than current element
        while (deque.length > 0 && arr[deque[deque.length - 1]] <= arr[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // The front of deque has index of largest element of current window
        if (i >= k - 1) {
            result.push(arr[deque[0]]);
        }
    }
    
    return result;
}

// Test Case 3
console.log("\n=== Problem 3: Maximum in Subarrays of Size K ===");
const arr3 = [1, 2, 3, 1, 4, 5, 2, 3, 6];
const k3 = 3;
console.log(`Array: [${arr3}], k: ${k3}`);
console.log("Maximum in each subarray:", maxInSubarrays(arr3, k3));

// ==========================================

// Problem 4: K largest elements in an array
/*
Question: Find K largest elements in an array
Approach: Use MinHeap of size K to keep track of K largest elements
Time Complexity: O(n log k)
Space Complexity: O(k)
*/

function kLargestElements(arr, k) {
    const minHeap = new MinHeap();
    
    for (let num of arr) {
        if (minHeap.heap.length < k) {
            minHeap.insert(num);
        } else if (num > minHeap.peek()) {
            minHeap.extractMin();
            minHeap.insert(num);
        }
    }
    
    return minHeap.heap.sort((a, b) => b - a); // Return in descending order
}

// Test Case 4
console.log("\n=== Problem 4: K Largest Elements ===");
const arr4 = [3, 2, 1, 5, 6, 4];
const k4 = 2;
console.log(`Array: [${arr4}], k: ${k4}`);
console.log("K largest elements:", kLargestElements(arr4, k4));

// ==========================================

// Problem 5: Kth smallest and largest element in unsorted array
/*
Question: Find Kth smallest and largest elements
Approach: Use MinHeap for Kth largest, MaxHeap for Kth smallest
Time Complexity: O(n log k)
Space Complexity: O(k)
*/

function kthLargest(arr, k) {
    const minHeap = new MinHeap();
    
    for (let num of arr) {
        if (minHeap.heap.length < k) {
            minHeap.insert(num);
        } else if (num > minHeap.peek()) {
            minHeap.extractMin();
            minHeap.insert(num);
        }
    }
    
    return minHeap.peek();
}

function kthSmallest(arr, k) {
    const maxHeap = new MaxHeap();
    
    for (let num of arr) {
        if (maxHeap.heap.length < k) {
            maxHeap.insert(num);
        } else if (num < maxHeap.peek()) {
            maxHeap.extractMax();
            maxHeap.insert(num);
        }
    }
    
    return maxHeap.peek();
}

// Test Case 5
console.log("\n=== Problem 5: Kth Smallest and Largest ===");
const arr5 = [7, 10, 4, 3, 20, 15];
const k5 = 3;
console.log(`Array: [${arr5}], k: ${k5}`);
console.log(`${k5}rd largest:`, kthLargest(arr5, k5));
console.log(`${k5}rd smallest:`, kthSmallest(arr5, k5));

// ==========================================

// Problem 6: Merge K sorted arrays
/*
Question: Merge K sorted arrays into one sorted array
Approach: Use MinHeap to keep track of smallest elements from each array
Time Complexity: O(N log k) where N is total elements
Space Complexity: O(k)
*/

function mergeKSortedArrays(arrays) {
    const minHeap = new MinHeap();
    const result = [];
    
    // Custom comparison for heap elements
    class HeapNode {
        constructor(value, arrayIndex, elementIndex) {
            this.value = value;
            this.arrayIndex = arrayIndex;
            this.elementIndex = elementIndex;
        }
    }
    
    // Modified MinHeap for HeapNode
    class MinHeapForMerge {
        constructor() {
            this.heap = [];
        }
        
        insert(node) {
            this.heap.push(node);
            this.heapifyUp(this.heap.length - 1);
        }
        
        extractMin() {
            if (this.heap.length === 0) return null;
            if (this.heap.length === 1) return this.heap.pop();
            
            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.heapifyDown(0);
            return min;
        }
        
        heapifyUp(index) {
            if (index === 0) return;
            
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].value > this.heap[index].value) {
                [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                this.heapifyUp(parentIndex);
            }
        }
        
        heapifyDown(index) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let smallest = index;
            
            if (leftIndex < this.heap.length && this.heap[leftIndex].value < this.heap[smallest].value) {
                smallest = leftIndex;
            }
            
            if (rightIndex < this.heap.length && this.heap[rightIndex].value < this.heap[smallest].value) {
                smallest = rightIndex;
            }
            
            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                this.heapifyDown(smallest);
            }
        }
        
        isEmpty() {
            return this.heap.length === 0;
        }
    }
    
    const heap = new MinHeapForMerge();
    
    // Insert first element of each array
    for (let i = 0; i < arrays.length; i++) {
        if (arrays[i].length > 0) {
            heap.insert(new HeapNode(arrays[i][0], i, 0));
        }
    }
    
    // Extract minimum and add next element from same array
    while (!heap.isEmpty()) {
        const node = heap.extractMin();
        result.push(node.value);
        
        // Add next element from the same array
        if (node.elementIndex + 1 < arrays[node.arrayIndex].length) {
            heap.insert(new HeapNode(
                arrays[node.arrayIndex][node.elementIndex + 1],
                node.arrayIndex,
                node.elementIndex + 1
            ));
        }
    }
    
    return result;
}

// Test Case 6
console.log("\n=== Problem 6: Merge K Sorted Arrays ===");
const arrays6 = [[1, 4, 5], [1, 3, 4], [2, 6]];
console.log("Input arrays:", arrays6);
console.log("Merged array:", mergeKSortedArrays(arrays6));

// ==========================================

// Problem 7: Merge 2 Binary Max Heaps
/*
Question: Merge two max heaps into one max heap
Approach: Combine both arrays and build heap from the combined array
Time Complexity: O(n + m)
Space Complexity: O(n + m)
*/

function mergeTwoMaxHeaps(heap1, heap2) {
    const merged = [...heap1, ...heap2];
    const n = merged.length;
    
    // Build max heap from merged array
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        maxHeapify(merged, n, i);
    }
    
    return merged;
}

function maxHeapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        maxHeapify(arr, n, largest);
    }
}

// Test Case 7
console.log("\n=== Problem 7: Merge 2 Binary Max Heaps ===");
const heap1 = [10, 5, 6, 2];
const heap2 = [12, 7, 9];
console.log("Heap 1:", heap1);
console.log("Heap 2:", heap2);
console.log("Merged Max Heap:", mergeTwoMaxHeaps(heap1, heap2));

// ==========================================

// Problem 8: Kth largest sum of continuous subarrays
/*
Question: Find Kth largest sum among all possible continuous subarrays
Approach: Generate all subarray sums and use MinHeap to find Kth largest
Time Complexity: O(n² log k)
Space Complexity: O(k)
*/

function kthLargestSubarraySum(arr, k) {
    const minHeap = new MinHeap();
    
    // Generate all subarray sums
    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        for (let j = i; j < arr.length; j++) {
            sum += arr[j];
            
            if (minHeap.heap.length < k) {
                minHeap.insert(sum);
            } else if (sum > minHeap.peek()) {
                minHeap.extractMin();
                minHeap.insert(sum);
            }
        }
    }
    
    return minHeap.peek();
}

// Test Case 8
console.log("\n=== Problem 8: Kth Largest Subarray Sum ===");
const arr8 = [10, -10, 20, -40];
const k8 = 6;
console.log(`Array: [${arr8}], k: ${k8}`);
console.log(`${k8}th largest subarray sum:`, kthLargestSubarraySum(arr8, k8));

// ==========================================

// Problem 9: Reorganize String (Leetcode)
/*
Question: Rearrange string so no two adjacent characters are the same
Approach: Use MaxHeap based on character frequency
Time Complexity: O(n log k) where k is unique characters
Space Complexity: O(k)
*/

function reorganizeString(s) {
    const freqMap = new Map();
    
    // Count frequencies
    for (let char of s) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }
    
    // Custom MaxHeap for character frequency
    class CharMaxHeap {
        constructor() {
            this.heap = [];
        }
        
        insert(char, freq) {
            this.heap.push({char, freq});
            this.heapifyUp(this.heap.length - 1);
        }
        
        extractMax() {
            if (this.heap.length === 0) return null;
            if (this.heap.length === 1) return this.heap.pop();
            
            const max = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.heapifyDown(0);
            return max;
        }
        
        heapifyUp(index) {
            if (index === 0) return;
            
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].freq < this.heap[index].freq) {
                [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                this.heapifyUp(parentIndex);
            }
        }
        
        heapifyDown(index) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let largest = index;
            
            if (leftIndex < this.heap.length && this.heap[leftIndex].freq > this.heap[largest].freq) {
                largest = leftIndex;
            }
            
            if (rightIndex < this.heap.length && this.heap[rightIndex].freq > this.heap[largest].freq) {
                largest = rightIndex;
            }
            
            if (largest !== index) {
                [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
                this.heapifyDown(largest);
            }
        }
        
        isEmpty() {
            return this.heap.length === 0;
        }
        
        peek() {
            return this.heap.length > 0 ? this.heap[0] : null;
        }
    }
    
    const maxHeap = new CharMaxHeap();
    
    // Add all characters to heap
    for (let [char, freq] of freqMap) {
        maxHeap.insert(char, freq);
    }
    
    let result = "";
    let prev = null;
    
    while (!maxHeap.isEmpty()) {
        const current = maxHeap.extractMax();
        result += current.char;
        current.freq--;
        
        if (prev && prev.freq > 0) {
            maxHeap.insert(prev.char, prev.freq);
        }
        
        prev = current.freq > 0 ? current : null;
    }
    
    return result.length === s.length ? result : "";
}

// Test Case 9
console.log("\n=== Problem 9: Reorganize String ===");
const str9 = "aab";
console.log(`Input: "${str9}"`);
console.log(`Reorganized: "${reorganizeString(str9)}"`);

// ==========================================

// Problem 10: Merge K Sorted Linked Lists
/*
Question: Merge K sorted linked lists into one sorted linked list
Approach: Use MinHeap to keep track of smallest nodes
Time Complexity: O(N log k) where N is total nodes
Space Complexity: O(k)
*/

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function mergeKLists(lists) {
    if (!lists || lists.length === 0) return null;
    
    class ListNodeMinHeap {
        constructor() {
            this.heap = [];
        }
        
        insert(node) {
            if (node) {
                this.heap.push(node);
                this.heapifyUp(this.heap.length - 1);
            }
        }
        
        extractMin() {
            if (this.heap.length === 0) return null;
            if (this.heap.length === 1) return this.heap.pop();
            
            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.heapifyDown(0);
            return min;
        }
        
        heapifyUp(index) {
            if (index === 0) return;
            
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].val > this.heap[index].val) {
                [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                this.heapifyUp(parentIndex);
            }
        }
        
        heapifyDown(index) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let smallest = index;
            
            if (leftIndex < this.heap.length && this.heap[leftIndex].val < this.heap[smallest].val) {
                smallest = leftIndex;
            }
            
            if (rightIndex < this.heap.length && this.heap[rightIndex].val < this.heap[smallest].val) {
                smallest = rightIndex;
            }
            
            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                this.heapifyDown(smallest);
            }
        }
        
        isEmpty() {
            return this.heap.length === 0;
        }
    }
    
    const minHeap = new ListNodeMinHeap();
    
    // Add first node of each list to heap
    for (let list of lists) {
        if (list) {
            minHeap.insert(list);
        }
    }
    
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (!minHeap.isEmpty()) {
        const node = minHeap.extractMin();
        current.next = node;
        current = current.next;
        
        if (node.next) {
            minHeap.insert(node.next);
        }
    }
    
    return dummy.next;
}

// Helper function to create linked list from array
function createLinkedList(arr) {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to convert linked list to array
function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

// Test Case 10
console.log("\n=== Problem 10: Merge K Sorted Linked Lists ===");
const lists10 = [
    createLinkedList([1, 4, 5]),
    createLinkedList([1, 3, 4]),
    createLinkedList([2, 6])
];
console.log("Input lists: [[1,4,5],[1,3,4],[2,6]]");
const merged10 = mergeKLists(lists10);
console.log("Merged list:", linkedListToArray(merged10));

// ==========================================

// Problem 11: Smallest range in K Lists
/*
Question: Find the smallest range that includes at least one element from each of K lists
Approach: Use MinHeap with pointers to track current elements from each list
Time Complexity: O(N log k)
Space Complexity: O(k)
*/

function smallestRange(nums) {
    class RangeNode {
        constructor(value, listIndex, elementIndex) {
            this.value = value;
            this.listIndex = listIndex;
            this.elementIndex = elementIndex;
        }
    }
    
    class RangeMinHeap {
        constructor() {
            this.heap = [];
        }
        
        insert(node) {
            this.heap.push(node);
            this.heapifyUp(this.heap.length - 1);
        }
        
        extractMin() {
            if (this.heap.length === 0) return null;
            if (this.heap.length === 1) return this.heap.pop();
            
            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.heapifyDown(0);
            return min;
        }
        
        heapifyUp(index) {
            if (index === 0) return;
            
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].value > this.heap[index].value) {
                [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                this.heapifyUp(parentIndex);
            }
        }
        
        heapifyDown(index) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let smallest = index;
            
            if (leftIndex < this.heap.length && this.heap[leftIndex].value < this.heap[smallest].value) {
                smallest = leftIndex;
            }
            
            if (rightIndex < this.heap.length && this.heap[rightIndex].value < this.heap[smallest].value) {
                smallest = rightIndex;
            }
            
            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                this.heapifyDown(smallest);
            }
        }
        
        peek() {
            return this.heap.length > 0 ? this.heap[0] : null;
        }
        
        isEmpty() {
            return this.heap.length === 0;
        }
    }
    
    const minHeap = new RangeMinHeap();
    let maxVal = -Infinity;
    let rangeStart = 0, rangeEnd = Infinity;
    
    // Insert first element of each list
    for (let i = 0; i < nums.length; i++) {
        if (nums[i].length > 0) {
            minHeap.insert(new RangeNode(nums[i][0], i, 0));
            maxVal = Math.max(maxVal, nums[i][0]);
        }
    }
    
    while (!minHeap.isEmpty()) {
        const minNode = minHeap.extractMin();
        const currentRange = maxVal - minNode.value;
        
        if (currentRange < rangeEnd - rangeStart) {
            rangeStart = minNode.value;
            rangeEnd = maxVal;
        }
        
        // Add next element from the same list
        if (minNode.elementIndex + 1 < nums[minNode.listIndex].length) {
            const nextVal = nums[minNode.listIndex][minNode.elementIndex + 1];
            minHeap.insert(new RangeNode(nextVal, minNode.listIndex, minNode.elementIndex + 1));
            maxVal = Math.max(maxVal, nextVal);
        } else {
            break; // One list is exhausted
        }
    }
    
    return [rangeStart, rangeEnd];
}

// Test Case 11
console.log("\n=== Problem 11: Smallest Range in K Lists ===");
const nums11 = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]];
console.log("Input lists:", nums11);
console.log("Smallest range:", smallestRange(nums11));

// ==========================================

// Problem 12: Median in a stream of Integers
/*
Question: Find median of integers as they are being read from a stream
Approach: Use two heaps - MaxHeap for smaller half, MinHeap for larger half
Time Complexity: Insert - O(log n), Find Median - O(1)
Space Complexity: O(n)
*/

class MedianFinder {
    constructor() {
        this.maxHeap = new MaxHeap(); // For smaller half
        this.minHeap = new MinHeap(); // For larger half
    }
    
    addNum(num) {
        // Add to maxHeap first
        if (this.maxHeap.heap.length === 0 || num <= this.maxHeap.peek()) {
            this.maxHeap.insert(num);
        } else {
            this.minHeap.insert(num);
        }
        
        // Balance the heaps
        if (this.maxHeap.heap.length > this.minHeap.heap.length + 1) {
            this.minHeap.insert(this.maxHeap.extractMax());
        } else if (this.minHeap.heap.length > this.maxHeap.heap.length + 1) {
            this.maxHeap.insert(this.minHeap.extractMin());
        }
    }
    
    findMedian() {
        if (this.maxHeap.heap.length === this.minHeap.heap.length) {
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
        } else if (this.maxHeap.heap.length > this.minHeap.heap.length) {
            return this.maxHeap.peek();
        } else {
            return this.minHeap.peek();
        }
    }
}

// Test Case 12
console.log("\n=== Problem 12: Median in Stream ===");
const medianFinder = new MedianFinder();
const stream = [5, 15, 1, 3];
for (let num of stream) {
    medianFinder.addNum(num);
    console.log(`Added ${num}, Median: ${medianFinder.findMedian()}`);
}

// ==========================================

// Problem 13: Check if a Binary Tree is Heap
/*
Question: Check if a given binary tree is a valid heap
Approach: Check if tree is complete and satisfies heap property
Time Complexity: O(n)
Space Complexity: O(h) where h is height
*/

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function isHeap(root) {
    if (!root) return true;
    
    // Count total nodes
    function countNodes(node) {
        if (!node) return 0;
        return 1 + countNodes(node.left) + countNodes(node.right);
    }
    
    const totalNodes = countNodes(root);
    
    // Check if tree is complete and satisfies max heap property
    function isCompleteAndMaxHeap(node, index) {
        if (!node) return true;
        
        // If index is greater than total nodes, tree is not complete
        if (index >= totalNodes) return false;
        
        // Check max heap property
        if (node.left && node.val < node.left.val) return false;
        if (node.right && node.val < node.right.val) return false;
        
        // Recursively check for completeness and heap property
        return isCompleteAndMaxHeap(node.left, 2 * index + 1) && 
               isCompleteAndMaxHeap(node.right, 2 * index + 2);
    }
    
    return isCompleteAndMaxHeap(root, 0);
}

// Test Case 13
console.log("\n=== Problem 13: Check if Binary Tree is Heap ===");
// Create a valid max heap tree
const heapTree = new TreeNode(10,
    new TreeNode(9,
        new TreeNode(8),
        new TreeNode(7)
    ),
    new TreeNode(8,
        new TreeNode(6),
        new TreeNode(5)
    )
);
console.log("Is valid heap:", isHeap(heapTree));

// Create an invalid heap tree
const invalidTree = new TreeNode(10,
    new TreeNode(12,
        new TreeNode(8),
        new TreeNode(7)
    ),
    new TreeNode(8)
);
console.log("Is invalid tree a heap:", isHeap(invalidTree));

// ==========================================

// Problem 14: Connect n ropes with minimum cost
/*
Question: Connect n ropes with minimum cost where cost is sum of lengths
Approach: Use MinHeap to always connect two smallest ropes
Time Complexity: O(n log n)
Space Complexity: O(n)
*/

function connectRopes(ropes) {
    if (ropes.length <= 1) return 0;
    
    const minHeap = new MinHeap();
    
    // Add all ropes to heap
    for (let rope of ropes) {
        minHeap.insert(rope);
    }
    
    let totalCost = 0;
    
    // Connect ropes until only one remains
    while (minHeap.heap.length > 1) {
        const first = minHeap.extractMin();
        const second = minHeap.extractMin();
        const cost = first + second;
        
        totalCost += cost;
        minHeap.insert(cost);
    }
    
    return totalCost;
}

// Test Case 14
console.log("\n=== Problem 14: Connect Ropes with Minimum Cost ===");
const ropes14 = [4, 3, 2, 6];
console.log(`Ropes: [${ropes14}]`);
console.log("Minimum cost:", connectRopes(ropes14));

// ==========================================

// Problem 15: Convert BST to Min Heap
/*
Question: Convert a BST to Min Heap maintaining the complete binary tree property
Approach: Do inorder traversal to get sorted array, then build heap
Time Complexity: O(n)
Space Complexity: O(n)
*/

function convertBSTToMinHeap(root) {
    if (!root) return null;
    
    // Get inorder traversal (sorted array)
    const inorder = [];
    function inorderTraversal(node) {
        if (!node) return;
        inorderTraversal(node.left);
        inorder.push(node.val);
        inorderTraversal(node.right);
    }
    
    inorderTraversal(root);
    
    // Fill the tree with sorted values using preorder traversal
    let index = 0;
    function fillMinHeap(node) {
        if (!node || index >= inorder.length) return;
        
        node.val = inorder[index++];
        fillMinHeap(node.left);
        fillMinHeap(node.right);
    }
    
    fillMinHeap(root);
    return root;
}

// Helper function to print tree (level order)
function printTree(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null);
        }
    }
    
    // Remove trailing nulls
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }
    
    return result;
}

// Test Case 15
console.log("\n=== Problem 15: Convert BST to Min Heap ===");
const bst = new TreeNode(4,
    new TreeNode(2,
        new TreeNode(1),
        new TreeNode(3)
    ),
    new TreeNode(6,
        new TreeNode(5),
        new TreeNode(7)
    )
);
console.log("Original BST:", printTree(bst));
convertBSTToMinHeap(bst);
console.log("Converted Min Heap:", printTree(bst));

// ==========================================

// Problem 16: Convert min heap to max heap
/*
Question: Convert a min heap to max heap
Approach: Apply max heapify from bottom to top
Time Complexity: O(n)
Space Complexity: O(1)
*/

function convertMinHeapToMaxHeap(arr) {
    const n = arr.length;
    
    // Start from last non-leaf node and heapify
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        maxHeapify(arr, n, i);
    }
    
    return arr;
}

// Test Case 16
console.log("\n=== Problem 16: Convert Min Heap to Max Heap ===");
const minHeapArr = [1, 2, 3, 4, 5, 6, 7];
console.log("Min Heap:", [...minHeapArr]);
console.log("Max Heap:", convertMinHeapToMaxHeap([...minHeapArr]));

// ==========================================

// Problem 17: Rearrange characters so no two adjacent are same
/*
Question: Rearrange string characters so no two adjacent characters are same
Approach: Use MaxHeap based on frequency and place characters alternately
Time Complexity: O(n log k)
Space Complexity: O(k)
*/

function rearrangeString(str) {
    const freqMap = new Map();
    
    // Count frequencies
    for (let char of str) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }
    
    // Custom MaxHeap for characters
    class CharFreqMaxHeap {
        constructor() {
            this.heap = [];
        }
        
        insert(char, freq) {
            this.heap.push({char, freq});
            this.heapifyUp(this.heap.length - 1);
        }
        
        extractMax() {
            if (this.heap.length === 0) return null;
            if (this.heap.length === 1) return this.heap.pop();
            
            const max = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.heapifyDown(0);
            return max;
        }
        
        heapifyUp(index) {
            if (index === 0) return;
            
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].freq < this.heap[index].freq) {
                [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                this.heapifyUp(parentIndex);
            }
        }
        
        heapifyDown(index) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let largest = index;
            
            if (leftIndex < this.heap.length && this.heap[leftIndex].freq > this.heap[largest].freq) {
                largest = leftIndex;
            }
            
            if (rightIndex < this.heap.length && this.heap[rightIndex].freq > this.heap[largest].freq) {
                largest = rightIndex;
            }
            
            if (largest !== index) {
                [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
                this.heapifyDown(largest);
            }
        }
        
        isEmpty() {
            return this.heap.length === 0;
        }
        
        size() {
            return this.heap.length;
        }
    }
    
    const maxHeap = new CharFreqMaxHeap();
    
    // Add all characters to heap
    for (let [char, freq] of freqMap) {
        maxHeap.insert(char, freq);
    }
    
    let result = "";
    let prev = null;
    
    while (!maxHeap.isEmpty()) {
        const current = maxHeap.extractMax();
        result += current.char;
        current.freq--;
        
        // Add previous character back if it still has frequency
        if (prev && prev.freq > 0) {
            maxHeap.insert(prev.char, prev.freq);
        }
        
        prev = current.freq > 0 ? current : null;
    }
    
    return result.length === str.length ? result : "Not possible";
}

// Test Case 17
console.log("\n=== Problem 17: Rearrange String Characters ===");
const str17 = "aabbcc";
console.log(`Input: "${str17}"`);
console.log(`Rearranged: "${rearrangeString(str17)}"`);

// ==========================================

// Problem 18: Minimum sum of two numbers formed from digits of array
/*
Question: Form two numbers from array digits such that their sum is minimum
Approach: Use MinHeap to distribute digits alternately to form minimum numbers
Time Complexity: O(n log n)
Space Complexity: O(n)
*/

function minSumTwoNumbers(arr) {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0];
    
    // Sort the array to get digits in ascending order
    arr.sort((a, b) => a - b);
    
    let num1 = "";
    let num2 = "";
    
    // Distribute digits alternately to minimize sum
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            num1 += arr[i];
        } else {
            num2 += arr[i];
        }
    }
    
    // Convert to numbers and return sum
    const n1 = parseInt(num1) || 0;
    const n2 = parseInt(num2) || 0;
    
    return n1 + n2;
}

// Alternative approach using heap
function minSumTwoNumbersHeap(arr) {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0];
    
    const minHeap = new MinHeap();
    
    // Add all digits to heap
    for (let digit of arr) {
        minHeap.insert(digit);
    }
    
    let num1 = 0;
    let num2 = 0;
    let isNum1Turn = true;
    
    // Extract digits and form numbers alternately
    while (minHeap.heap.length > 0) {
        const digit = minHeap.extractMin();
        
        if (isNum1Turn) {
            num1 = num1 * 10 + digit;
        } else {
            num2 = num2 * 10 + digit;
        }
        
        isNum1Turn = !isNum1Turn;
    }
    
    return num1 + num2;
}

// Test Case 18
console.log("\n=== Problem 18: Minimum Sum of Two Numbers ===");
const arr18 = [6, 8, 4, 5, 2, 3];
console.log(`Array: [${arr18}]`);
console.log("Minimum sum (sorting):", minSumTwoNumbers([...arr18]));
console.log("Minimum sum (heap):", minSumTwoNumbersHeap([...arr18]));

// ==========================================
// SUMMARY AND COMPLEXITY ANALYSIS
// ==========================================

console.log("\n=== COMPLEXITY SUMMARY ===");
console.log(`
1. MaxHeap/MinHeap Implementation: Insert/Delete - O(log n), Peek - O(1)
2. HeapSort: O(n log n) time, O(1) space
3. Maximum in Subarrays of Size K: O(n) time, O(k) space
4. K Largest Elements: O(n log k) time, O(k) space
5. Kth Smallest/Largest: O(n log k) time, O(k) space
6. Merge K Sorted Arrays: O(N log k) time, O(k) space
7. Merge 2 Max Heaps: O(n + m) time, O(n + m) space
8. Kth Largest Subarray Sum: O(n² log k) time, O(k) space
9. Reorganize String: O(n log k) time, O(k) space
10. Merge K Sorted Lists: O(N log k) time, O(k) space
11. Smallest Range in K Lists: O(N log k) time, O(k) space
12. Median in Stream: Insert - O(log n), Find - O(1)
13. Check Binary Tree is Heap: O(n) time, O(h) space
14. Connect Ropes: O(n log n) time, O(n) space
15. Convert BST to Min Heap: O(n) time, O(n) space
16. Convert Min to Max Heap: O(n) time, O(1) space
17. Rearrange String: O(n log k) time, O(k) space
18. Minimum Sum Two Numbers: O(n log n) time, O(1) space

Where:
- n = number of elements
- k = number of lists/unique elements
- N = total number of elements across all lists
- h = height of tree
`);

console.log("\n=== ALL PROBLEMS COMPLETED SUCCESSFULLY! ===");