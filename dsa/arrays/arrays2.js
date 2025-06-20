class ComprehensiveArray {
    constructor(size = 100) {
        this.data = new Array(size);
        this.maxSize = size;
        this.length = 0;
    }

    // Basic operations
    push(element) {
        if (this.length >= this.maxSize) throw new Error('Array is full');
        this.data[this.length++] = element;
        return this.length;
    }

    get(index) {
        if (index < 0 || index >= this.length) throw new Error('Index out of bounds');
        return this.data[index];
    }

    set(index, value) {
        if (index < 0 || index >= this.length) throw new Error('Index out of bounds');
        this.data[index] = value;
    }

    // ==================================================
    // 1. SORTING ALGORITHMS
    // ==================================================

    // Bubble Sort - O(n²)
    bubbleSort() {
        for (let i = 0; i < this.length - 1; i++) {
            let swapped = false;
            for (let j = 0; j < this.length - i - 1; j++) {
                if (this.data[j] > this.data[j + 1]) {
                    [this.data[j], this.data[j + 1]] = [this.data[j + 1], this.data[j]];
                    swapped = true;
                }
            }
            if (!swapped) break; // Optimization: stop if no swaps
        }
        return this;
    }

    // Insertion Sort - O(n²) but efficient for small arrays
    insertionSort() {
        for (let i = 1; i < this.length; i++) {
            let key = this.data[i];
            let j = i - 1;
            while (j >= 0 && this.data[j] > key) {
                this.data[j + 1] = this.data[j];
                j--;
            }
            this.data[j + 1] = key;
        }
        return this;
    }

    // Quick Sort - O(n log n) average
    quickSort(low = 0, high = this.length - 1) {
        if (low < high) {
            const pivot = this.partition(low, high);
            this.quickSort(low, pivot - 1);
            this.quickSort(pivot + 1, high);
        }
        return this;
    }

    partition(low, high) {
        const pivot = this.data[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (this.data[j] <= pivot) {
                i++;
                [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
            }
        }
        [this.data[i + 1], this.data[high]] = [this.data[high], this.data[i + 1]];
        return i + 1;
    }

    // Merge Sort - O(n log n) guaranteed
    mergeSort(left = 0, right = this.length - 1) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            this.mergeSort(left, mid);
            this.mergeSort(mid + 1, right);
            this.merge(left, mid, right);
        }
        return this;
    }

    merge(left, mid, right) {
        const leftArr = this.data.slice(left, mid + 1);
        const rightArr = this.data.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                this.data[k++] = leftArr[i++];
            } else {
                this.data[k++] = rightArr[j++];
            }
        }
        while (i < leftArr.length) this.data[k++] = leftArr[i++];
        while (j < rightArr.length) this.data[k++] = rightArr[j++];
    }

    // Heap Sort - O(n log n)
    heapSort() {
        // Build max heap
        for (let i = Math.floor(this.length / 2) - 1; i >= 0; i--) {
            this.heapify(this.length, i);
        }
        
        // Extract elements from heap one by one
        for (let i = this.length - 1; i > 0; i--) {
            [this.data[0], this.data[i]] = [this.data[i], this.data[0]];
            this.heapify(i, 0);
        }
        return this;
    }

    heapify(n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n && this.data[left] > this.data[largest]) {
            largest = left;
        }
        if (right < n && this.data[right] > this.data[largest]) {
            largest = right;
        }
        if (largest !== i) {
            [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]];
            this.heapify(n, largest);
        }
    }

    // ==================================================
    // 2. SEARCHING ALGORITHMS
    // ==================================================

    // Linear Search - O(n)
    linearSearch(target) {
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === target) return i;
        }
        return -1;
    }

    // Binary Search - O(log n) for sorted arrays
    binarySearch(target) {
        let left = 0, right = this.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (this.data[mid] === target) return mid;
            if (this.data[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    // ==================================================
    // 3. TWO POINTER / SLIDING WINDOW TECHNIQUES
    // ==================================================

    // Two Sum using two pointers (sorted array)
    twoSumSorted(target) {
        let left = 0, right = this.length - 1;
        while (left < right) {
            const sum = this.data[left] + this.data[right];
            if (sum === target) return [left, right];
            if (sum < target) left++;
            else right--;
        }
        return null;
    }

    // Maximum sum subarray of size k (Sliding Window)
    maxSumSubarray(k) {
        if (k > this.length) return null;
        
        let maxSum = 0, windowSum = 0;
        
        // Calculate first window
        for (let i = 0; i < k; i++) {
            windowSum += this.data[i];
        }
        maxSum = windowSum;
        
        // Slide the window
        for (let i = k; i < this.length; i++) {
            windowSum = windowSum - this.data[i - k] + this.data[i];
            maxSum = Math.max(maxSum, windowSum);
        }
        
        return maxSum;
    }

    // Longest subarray with sum equal to k
    longestSubarrayWithSum(k) {
        const sumMap = new Map();
        sumMap.set(0, -1);
        let maxLen = 0, sum = 0;
        
        for (let i = 0; i < this.length; i++) {
            sum += this.data[i];
            if (sumMap.has(sum - k)) {
                maxLen = Math.max(maxLen, i - sumMap.get(sum - k));
            }
            if (!sumMap.has(sum)) {
                sumMap.set(sum, i);
            }
        }
        return maxLen;
    }

    // ==================================================
    // 4. KADANE'S ALGORITHM
    // ==================================================

    // Maximum subarray sum
    kadaneMaxSubarraySum() {
        let maxSoFar = this.data[0];
        let maxEndingHere = this.data[0];
        let start = 0, end = 0, tempStart = 0;
        
        for (let i = 1; i < this.length; i++) {
            if (maxEndingHere < 0) {
                maxEndingHere = this.data[i];
                tempStart = i;
            } else {
                maxEndingHere += this.data[i];
            }
            
            if (maxSoFar < maxEndingHere) {
                maxSoFar = maxEndingHere;
                start = tempStart;
                end = i;
            }
        }
        
        return { maxSum: maxSoFar, startIndex: start, endIndex: end };
    }

    // ==================================================
    // 5. PREFIX SUM ARRAYS
    // ==================================================

    // Build prefix sum array
    buildPrefixSum() {
        const prefixSum = new Array(this.length + 1);
        prefixSum[0] = 0;
        for (let i = 0; i < this.length; i++) {
            prefixSum[i + 1] = prefixSum[i] + this.data[i];
        }
        return prefixSum;
    }

    // Range sum query using prefix sum
    rangeSumQuery(left, right, prefixSum = null) {
        if (!prefixSum) prefixSum = this.buildPrefixSum();
        return prefixSum[right + 1] - prefixSum[left];
    }

    // ==================================================
    // 6. MERGE INTERVALS
    // ==================================================

    // Merge overlapping intervals (assumes array of [start, end] pairs)
    mergeIntervals() {
        if (this.length <= 1) return this.toArray();
        
        // Sort intervals by start time
        const intervals = this.toArray().sort((a, b) => a[0] - b[0]);
        const merged = [intervals[0]];
        
        for (let i = 1; i < intervals.length; i++) {
            const current = intervals[i];
            const lastMerged = merged[merged.length - 1];
            
            if (current[0] <= lastMerged[1]) {
                // Overlapping intervals, merge them
                lastMerged[1] = Math.max(lastMerged[1], current[1]);
            } else {
                // Non-overlapping interval
                merged.push(current);
            }
        }
        
        return merged;
    }

    // ==================================================
    // 7. ROTATE ARRAY
    // ==================================================

    // Rotate array right by k positions
    rotateRight(k) {
        k = k % this.length;
        if (k === 0) return this;
        
        this.reverse(0, this.length - 1);
        this.reverse(0, k - 1);
        this.reverse(k, this.length - 1);
        return this;
    }

    // Rotate array left by k positions
    rotateLeft(k) {
        k = k % this.length;
        if (k === 0) return this;
        
        this.reverse(0, k - 1);
        this.reverse(k, this.length - 1);
        this.reverse(0, this.length - 1);
        return this;
    }

    reverse(start, end) {
        while (start < end) {
            [this.data[start], this.data[end]] = [this.data[end], this.data[start]];
            start++;
            end--;
        }
    }

    // ==================================================
    // 8. MAJORITY ELEMENT
    // ==================================================

    // Boyer-Moore Voting Algorithm
    findMajorityElement() {
        let candidate = null;
        let count = 0;
        
        // Phase 1: Find candidate
        for (let i = 0; i < this.length; i++) {
            if (count === 0) {
                candidate = this.data[i];
                count = 1;
            } else if (this.data[i] === candidate) {
                count++;
            } else {
                count--;
            }
        }
        
        // Phase 2: Verify candidate
        count = 0;
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === candidate) count++;
        }
        
        return count > this.length / 2 ? candidate : null;
    }

    // ==================================================
    // 9. RESERVOIR SAMPLING
    // ==================================================

    // Select k random elements from stream
    reservoirSampling(k) {
        if (k > this.length) return this.toArray();
        
        const reservoir = new Array(k);
        
        // Fill reservoir with first k elements
        for (let i = 0; i < k; i++) {
            reservoir[i] = this.data[i];
        }
        
        // Process remaining elements
        for (let i = k; i < this.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            if (j < k) {
                reservoir[j] = this.data[i];
            }
        }
        
        return reservoir;
    }

    // ==================================================
    // REAL-WORLD USE CASE IMPLEMENTATIONS
    // ==================================================

    // 1. Image Processing - Apply filter to 2D image
    static applyImageFilter(imageMatrix, filter) {
        const rows = imageMatrix.length;
        const cols = imageMatrix[0].length;
        const result = Array(rows).fill().map(() => Array(cols).fill(0));
        
        for (let i = 1; i < rows - 1; i++) {
            for (let j = 1; j < cols - 1; j++) {
                let sum = 0;
                for (let fi = -1; fi <= 1; fi++) {
                    for (let fj = -1; fj <= 1; fj++) {
                        sum += imageMatrix[i + fi][j + fj] * filter[fi + 1][fj + 1];
                    }
                }
                result[i][j] = Math.max(0, Math.min(255, sum));
            }
        }
        return result;
    }

    // 2. Audio Signal Processing - Moving average filter
    audioMovingAverage(windowSize) {
        const filtered = new ComprehensiveArray(this.length);
        let sum = 0;
        
        // Calculate first window
        for (let i = 0; i < Math.min(windowSize, this.length); i++) {
            sum += this.data[i];
        }
        filtered.push(sum / Math.min(windowSize, this.length));
        
        // Slide window
        for (let i = 1; i < this.length; i++) {
            if (i < windowSize) {
                sum += this.data[i];
                filtered.push(sum / (i + 1));
            } else {
                sum = sum - this.data[i - windowSize] + this.data[i];
                filtered.push(sum / windowSize);
            }
        }
        
        return filtered;
    }

    // 3. Scheduling - Merge meeting intervals
    scheduleMeetings(meetings) {
        // meetings: [[start, end], [start, end], ...]
        const arr = new ComprehensiveArray(meetings.length);
        meetings.forEach(meeting => arr.push(meeting));
        return arr.mergeIntervals();
    }

    // 4. Financial Analysis - Stock trading profit
    maxStockProfit() {
        if (this.length < 2) return 0;
        
        let minPrice = this.data[0];
        let maxProfit = 0;
        
        for (let i = 1; i < this.length; i++) {
            if (this.data[i] < minPrice) {
                minPrice = this.data[i];
            } else {
                maxProfit = Math.max(maxProfit, this.data[i] - minPrice);
            }
        }
        
        return maxProfit;
    }

    // 5. Game Board - Check winning condition (Tic-tac-toe)
    static checkTicTacToeWinner(board) {
        const n = board.length;
        
        // Check rows and columns
        for (let i = 0; i < n; i++) {
            if (board[i][0] !== null && board[i].every(cell => cell === board[i][0])) {
                return board[i][0];
            }
            if (board[0][i] !== null && board.every(row => row[i] === board[0][i])) {
                return board[0][i];
            }
        }
        
        // Check diagonals
        if (board[0][0] !== null && board.every((row, i) => row[i] === board[0][0])) {
            return board[0][0];
        }
        if (board[0][n-1] !== null && board.every((row, i) => row[n-1-i] === board[0][n-1])) {
            return board[0][n-1];
        }
        
        return null;
    }

    // Utility methods
    toArray() { return this.data.slice(0, this.length); }
    toString() { return '[' + this.data.slice(0, this.length).join(', ') + ']'; }
    clear() { this.length = 0; }
}

// ==================================================
// COMPREHENSIVE DEMONSTRATION
// ==================================================

console.log('🚀 COMPREHENSIVE ARRAY ALGORITHMS DEMONSTRATION\n');

// 1. SORTING ALGORITHMS COMPARISON
console.log('📊 SORTING ALGORITHMS:');
const sortData = [64, 34, 25, 12, 22, 11, 90, 88];

const bubbleArray = new ComprehensiveArray(10);
sortData.forEach(x => bubbleArray.push(x));
console.log('Original:', bubbleArray.toString());
bubbleArray.bubbleSort();
console.log('Bubble Sort:', bubbleArray.toString());

const quickArray = new ComprehensiveArray(10);
sortData.forEach(x => quickArray.push(x));
quickArray.quickSort();
console.log('Quick Sort:', quickArray.toString());

const heapArray = new ComprehensiveArray(10);
sortData.forEach(x => heapArray.push(x));
heapArray.heapSort();
console.log('Heap Sort:', heapArray.toString());
console.log();

// 2. SEARCHING DEMONSTRATION
console.log('🔍 SEARCHING ALGORITHMS:');
const searchArray = new ComprehensiveArray(10);
[1, 3, 5, 7, 9, 11, 13, 15, 17, 19].forEach(x => searchArray.push(x));
console.log('Sorted Array:', searchArray.toString());
console.log('Linear Search for 7:', searchArray.linearSearch(7));
console.log('Binary Search for 7:', searchArray.binarySearch(7));
console.log('Two Sum for target 12:', searchArray.twoSumSorted(12));
console.log();

// 3. SLIDING WINDOW TECHNIQUES
console.log('🪟 SLIDING WINDOW TECHNIQUES:');
const windowArray = new ComprehensiveArray(10);
[2, 1, 3, 4, 1, 2, 6, 3, 4, 5].forEach(x => windowArray.push(x));
console.log('Array:', windowArray.toString());
console.log('Max sum subarray of size 3:', windowArray.maxSumSubarray(3));
console.log('Longest subarray with sum 6:', windowArray.longestSubarrayWithSum(6));
console.log();

// 4. KADANE'S ALGORITHM
console.log('⚡ KADANE\'S ALGORITHM:');
const kadaneArray = new ComprehensiveArray(10);
[-2, -3, 4, -1, -2, 1, 5, -3].forEach(x => kadaneArray.push(x));
console.log('Array:', kadaneArray.toString());
const result = kadaneArray.kadaneMaxSubarraySum();
console.log('Max subarray sum:', result.maxSum);
console.log('Subarray indices:', result.startIndex, 'to', result.endIndex);
console.log();

// 5. PREFIX SUM QUERIES
console.log('📈 PREFIX SUM QUERIES:');
const prefixArray = new ComprehensiveArray(8);
[1, 2, 3, 4, 5, 6, 7, 8].forEach(x => prefixArray.push(x));
const prefixSum = prefixArray.buildPrefixSum();
console.log('Array:', prefixArray.toString());
console.log('Prefix sum array:', prefixSum);
console.log('Sum from index 2 to 5:', prefixArray.rangeSumQuery(2, 5, prefixSum));
console.log();

// 6. INTERVAL MERGING
console.log('📅 INTERVAL MERGING:');
const intervalArray = new ComprehensiveArray(10);
[[1,3], [2,6], [8,10], [15,18]].forEach(x => intervalArray.push(x));
console.log('Intervals:', intervalArray.toArray());
console.log('Merged intervals:', intervalArray.mergeIntervals());
console.log();

// 7. ARRAY ROTATION
console.log('🔄 ARRAY ROTATION:');
const rotateArray = new ComprehensiveArray(10);
[1, 2, 3, 4, 5, 6, 7].forEach(x => rotateArray.push(x));
console.log('Original:', rotateArray.toString());
const rotateArrayCopy = new ComprehensiveArray(10);
[1, 2, 3, 4, 5, 6, 7].forEach(x => rotateArrayCopy.push(x));
rotateArrayCopy.rotateRight(3);
console.log('Rotate right by 3:', rotateArrayCopy.toString());
console.log();

// 8. MAJORITY ELEMENT
console.log('👑 MAJORITY ELEMENT:');
const majorityArray = new ComprehensiveArray(10);
[3, 2, 3, 3, 3, 2, 3].forEach(x => majorityArray.push(x));
console.log('Array:', majorityArray.toString());
console.log('Majority element:', majorityArray.findMajorityElement());
console.log();

// 9. RESERVOIR SAMPLING
console.log('🎲 RESERVOIR SAMPLING:');
const reservoirArray = new ComprehensiveArray(10);
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(x => reservoirArray.push(x));
console.log('Stream:', reservoirArray.toString());
console.log('Random sample of 3:', reservoirArray.reservoirSampling(3));
console.log();

// 10. REAL-WORLD APPLICATIONS
console.log('🌍 REAL-WORLD APPLICATIONS:');

// Stock analysis
const stockPrices = new ComprehensiveArray(10);
[100, 80, 60, 70, 60, 75, 85, 90, 65, 95].forEach(x => stockPrices.push(x));
console.log('📈 Stock prices:', stockPrices.toString());
console.log('Max profit:', stockPrices.maxStockProfit());

// Audio processing
const audioSignal = new ComprehensiveArray(10);
[0.1, 0.5, 0.3, 0.8, 0.2, 0.6, 0.4, 0.9, 0.1, 0.7].forEach(x => audioSignal.push(x));
console.log('🎵 Audio signal:', audioSignal.toString());
const filtered = audioSignal.audioMovingAverage(3);
console.log('Filtered (moving avg):', filtered.toString());

// Meeting scheduling
const meetings = [[9, 10], [10, 12], [11, 13], [14, 16]];
const scheduler = new ComprehensiveArray(10);
console.log('📅 Meeting requests:', meetings);
console.log('Scheduled meetings:', scheduler.scheduleMeetings(meetings));

// Image filter example
const image = [
    [100, 120, 110],
    [130, 140, 125],
    [115, 135, 120]
];
const edgeFilter = [
    [-1, -1, -1],
    [-1,  8, -1],
    [-1, -1, -1]
];
console.log('🖼️ Edge detection result:', ComprehensiveArray.applyImageFilter(image, edgeFilter));

// Tic-tac-toe winner
const board = [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['O', 'X', 'X']
];
console.log('🎮 Tic-tac-toe winner:', ComprehensiveArray.checkTicTacToeWinner(board));