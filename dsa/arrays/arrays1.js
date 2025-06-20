class AdvancedArray {
    constructor(size = 10) {
        this.data = new Array(size);
        this.maxSize = size;
        this.length = 0;
    }

    // Basic operations (from previous implementation)
    insertAt(index, element) {
        if (index < 0 || index > this.length) throw new Error('Index out of bounds');
        if (this.length >= this.maxSize) throw new Error('Array is full');
        
        for (let i = this.length; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[index] = element;
        this.length++;
        return this.length;
    }

    insertAtEnd(element) { return this.insertAt(this.length, element); }
    insertAtBeginning(element) { return this.insertAt(0, element); }

    removeAt(index) {
        if (index < 0 || index >= this.length) throw new Error('Index out of bounds');
        const removed = this.data[index];
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        this.length--;
        return removed;
    }

    get(index) {
        if (index < 0 || index >= this.length) throw new Error('Index out of bounds');
        return this.data[index];
    }

    // SEARCHING ALGORITHMS

    // Binary Search (requires sorted array)
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

    // Linear Search with multiple occurrences
    findAllOccurrences(target) {
        const indices = [];
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === target) {
                indices.push(i);
            }
        }
        return indices;
    }

    // SORTING ALGORITHMS

    // Quick Sort
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

    // Merge Sort
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

    // MATHEMATICAL ALGORITHMS

    // Find maximum and minimum
    findMinMax() {
        if (this.length === 0) return { min: null, max: null };
        
        let min = this.data[0], max = this.data[0];
        for (let i = 1; i < this.length; i++) {
            if (this.data[i] < min) min = this.data[i];
            if (this.data[i] > max) max = this.data[i];
        }
        return { min, max };
    }

    // Calculate sum and average
    getStatistics() {
        if (this.length === 0) return { sum: 0, average: 0, count: 0 };
        
        const sum = this.data.slice(0, this.length).reduce((acc, val) => acc + val, 0);
        return {
            sum,
            average: sum / this.length,
            count: this.length,
            ...this.findMinMax()
        };
    }

    // Find second largest element
    findSecondLargest() {
        if (this.length < 2) return null;
        
        let largest = -Infinity, secondLargest = -Infinity;
        
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] > largest) {
                secondLargest = largest;
                largest = this.data[i];
            } else if (this.data[i] > secondLargest && this.data[i] !== largest) {
                secondLargest = this.data[i];
            }
        }
        
        return secondLargest === -Infinity ? null : secondLargest;
    }

    // ARRAY MANIPULATION ALGORITHMS

    // Remove duplicates (keep first occurrence)
    removeDuplicates() {
        const seen = new Set();
        let writeIndex = 0;
        
        for (let readIndex = 0; readIndex < this.length; readIndex++) {
            if (!seen.has(this.data[readIndex])) {
                seen.add(this.data[readIndex]);
                this.data[writeIndex++] = this.data[readIndex];
            }
        }
        
        this.length = writeIndex;
        return this;
    }

    // Rotate array left by k positions
    rotateLeft(k) {
        if (this.length === 0) return this;
        k = k % this.length;
        
        this.reverse(0, k - 1);
        this.reverse(k, this.length - 1);
        this.reverse(0, this.length - 1);
        return this;
    }

    // Rotate array right by k positions
    rotateRight(k) {
        if (this.length === 0) return this;
        k = k % this.length;
        
        this.reverse(0, this.length - 1);
        this.reverse(0, k - 1);
        this.reverse(k, this.length - 1);
        return this;
    }

    reverse(start = 0, end = this.length - 1) {
        while (start < end) {
            [this.data[start], this.data[end]] = [this.data[end], this.data[start]];
            start++;
            end--;
        }
        return this;
    }

    // REAL-WORLD USE CASES

    // 1. LRU Cache Implementation
    static createLRUCache(capacity) {
        return new LRUCache(capacity);
    }

    // 2. Sliding Window Maximum
    slidingWindowMaximum(windowSize) {
        if (windowSize > this.length) return [];
        
        const result = [];
        const deque = []; // Store indices
        
        for (let i = 0; i < this.length; i++) {
            // Remove elements outside current window
            while (deque.length > 0 && deque[0] <= i - windowSize) {
                deque.shift();
            }
            
            // Remove smaller elements from rear
            while (deque.length > 0 && this.data[deque[deque.length - 1]] <= this.data[i]) {
                deque.pop();
            }
            
            deque.push(i);
            
            // Add to result when window is complete
            if (i >= windowSize - 1) {
                result.push(this.data[deque[0]]);
            }
        }
        
        return result;
    }

    // 3. Stock Price Analysis
    stockAnalysis() {
        if (this.length < 2) return { maxProfit: 0, buyDay: -1, sellDay: -1 };
        
        let minPrice = this.data[0];
        let maxProfit = 0;
        let buyDay = 0, sellDay = 0;
        let currentBuyDay = 0;
        
        for (let i = 1; i < this.length; i++) {
            if (this.data[i] < minPrice) {
                minPrice = this.data[i];
                currentBuyDay = i;
            } else if (this.data[i] - minPrice > maxProfit) {
                maxProfit = this.data[i] - minPrice;
                buyDay = currentBuyDay;
                sellDay = i;
            }
        }
        
        return { maxProfit, buyDay, sellDay };
    }

    // 4. Moving Average Calculator
    movingAverage(windowSize) {
        if (windowSize > this.length) return [];
        
        const result = [];
        let windowSum = 0;
        
        // Calculate first window
        for (let i = 0; i < windowSize; i++) {
            windowSum += this.data[i];
        }
        result.push(windowSum / windowSize);
        
        // Slide the window
        for (let i = windowSize; i < this.length; i++) {
            windowSum = windowSum - this.data[i - windowSize] + this.data[i];
            result.push(windowSum / windowSize);
        }
        
        return result;
    }

    // 5. Peak Detection (local maxima)
    findPeaks() {
        if (this.length < 3) return [];
        
        const peaks = [];
        for (let i = 1; i < this.length - 1; i++) {
            if (this.data[i] > this.data[i - 1] && this.data[i] > this.data[i + 1]) {
                peaks.push({ index: i, value: this.data[i] });
            }
        }
        return peaks;
    }

    // Utility methods
    toString() {
        return '[' + this.data.slice(0, this.length).join(', ') + ']';
    }

    toArray() {
        return this.data.slice(0, this.length);
    }
}

// LRU Cache Implementation
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (this.cache.has(key)) {
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return -1;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}

// DEMONSTRATION OF REAL-WORLD USE CASES

console.log('=== ADVANCED ARRAY ALGORITHMS DEMO ===\n');

// 1. Stock Price Analysis
const stockPrices = new AdvancedArray(10);
[100, 80, 60, 70, 60, 75, 85, 90, 65, 95].forEach(price => stockPrices.insertAtEnd(price));

console.log('📈 Stock Price Analysis:');
console.log('Prices:', stockPrices.toString());
const analysis = stockPrices.stockAnalysis();
console.log(`Max Profit: $${analysis.maxProfit} (Buy day ${analysis.buyDay}, Sell day ${analysis.sellDay})\n`);

// 2. Sensor Data Processing
const sensorData = new AdvancedArray(15);
[23, 25, 24, 26, 28, 30, 29, 27, 26, 28, 31, 33, 32, 30, 29].forEach(temp => sensorData.insertAtEnd(temp));

console.log('🌡️ Temperature Sensor Analysis:');
console.log('Readings:', sensorData.toString());
console.log('Statistics:', sensorData.getStatistics());
console.log('Moving Average (window=3):', sensorData.movingAverage(3));
console.log('Peaks detected:', sensorData.findPeaks());
console.log();

// 3. Search Algorithm Comparison
const searchArray = new AdvancedArray(10);
[1, 3, 5, 7, 9, 11, 13, 15, 17, 19].forEach(num => searchArray.insertAtEnd(num));

console.log('🔍 Search Algorithms:');
console.log('Sorted Array:', searchArray.toString());
console.log('Binary Search for 7:', searchArray.binarySearch(7));
console.log('Binary Search for 8:', searchArray.binarySearch(8));

// Add duplicates for demonstration
searchArray.insertAtEnd(7);
searchArray.insertAtEnd(7);
console.log('With duplicates:', searchArray.toString());
console.log('All occurrences of 7:', searchArray.findAllOccurrences(7));
console.log();

// 4. Sorting Algorithm Demo
const unsortedArray = new AdvancedArray(8);
[64, 34, 25, 12, 22, 11, 90, 88].forEach(num => unsortedArray.insertAtEnd(num));

console.log('🔄 Sorting Algorithms:');
console.log('Original:', unsortedArray.toString());

const quickSortArray = new AdvancedArray(8);
[64, 34, 25, 12, 22, 11, 90, 88].forEach(num => quickSortArray.insertAtEnd(num));
quickSortArray.quickSort();
console.log('Quick Sort:', quickSortArray.toString());

const mergeSortArray = new AdvancedArray(8);
[64, 34, 25, 12, 22, 11, 90, 88].forEach(num => mergeSortArray.insertAtEnd(num));
mergeSortArray.mergeSort();
console.log('Merge Sort:', mergeSortArray.toString());
console.log();

// 5. Data Stream Processing
const dataStream = new AdvancedArray(10);
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(num => dataStream.insertAtEnd(num));

console.log('📊 Data Stream Processing:');
console.log('Original:', dataStream.toString());
console.log('Sliding Window Max (window=3):', dataStream.slidingWindowMaximum(3));

dataStream.rotateRight(3);
console.log('After rotating right by 3:', dataStream.toString());

// Remove duplicates demo
const duplicateArray = new AdvancedArray(10);
[1, 2, 2, 3, 4, 4, 5, 5, 5, 6].forEach(num => duplicateArray.insertAtEnd(num));
console.log('With duplicates:', duplicateArray.toString());
duplicateArray.removeDuplicates();
console.log('After removing duplicates:', duplicateArray.toString());
console.log();

// 6. LRU Cache Demo
console.log('💾 LRU Cache Demo:');
const lruCache = AdvancedArray.createLRUCache(3);
lruCache.put(1, 'Page1');
lruCache.put(2, 'Page2');
lruCache.put(3, 'Page3');
console.log('Get Page2:', lruCache.get(2));
lruCache.put(4, 'Page4'); // This should evict Page1
console.log('Get Page1 (should be -1):', lruCache.get(1));
console.log('Get Page3:', lruCache.get(3));