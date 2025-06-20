// Complete Array Problems Solutions with Explanations - JavaScript Version

// 1. Reverse an Array/String
/**
 * Problem: Reverse elements of an array or string
 * Approach: Use two pointers - one at start, one at end, swap and move towards center
 * Time: O(n), Space: O(1)
 */
function reverseArray(arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr;
}

// Test
console.log("1. Reverse Array:", reverseArray([1, 2, 3, 4, 5]));

// 2. Find Maximum and Minimum Element
/**
 * Problem: Find max and min in single traversal
 * Approach: Track max and min while iterating once
 * Time: O(n), Space: O(1)
 */
function findMaxMin(arr) {
    if (!arr.length) return [null, null];
    
    let maxVal = arr[0], minVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        maxVal = Math.max(maxVal, arr[i]);
        minVal = Math.min(minVal, arr[i]);
    }
    
    return [maxVal, minVal];
}

// Test
console.log("2. Max/Min:", findMaxMin([3, 5, 1, 8, 2]));

// 3. Find Kth Max and Min Element
/**
 * Problem: Find kth largest and smallest elements
 * Approach: Use sorting or heap for better performance
 * Time: O(n log n) with sorting, O(n) average with quickselect
 */
function kthMaxMin(arr, k) {
    if (k <= 0 || k > arr.length) return [null, null];
    
    const sorted = [...arr].sort((a, b) => a - b);
    const kthMax = sorted[arr.length - k];
    const kthMin = sorted[k - 1];
    
    return [kthMax, kthMin];
}

// Test
console.log("3. 2nd Max/Min:", kthMaxMin([7, 10, 4, 3, 20, 15], 2));

// 4. Sort Array of 0s, 1s, 2s (Dutch National Flag)
/**
 * Problem: Sort array containing only 0, 1, 2 without sorting algorithm
 * Approach: Three pointers - low, mid, high. Partition in single pass
 * Time: O(n), Space: O(1)
 */
function sort012(arr) {
    let low = 0, mid = 0, high = arr.length - 1;
    
    while (mid <= high) {
        if (arr[mid] === 0) {
            [arr[low], arr[mid]] = [arr[mid], arr[low]];
            low++;
            mid++;
        } else if (arr[mid] === 1) {
            mid++;
        } else { // arr[mid] === 2
            [arr[mid], arr[high]] = [arr[high], arr[mid]];
            high--;
            // Don't increment mid as we need to check swapped element
        }
    }
    
    return arr;
}

// Test
console.log("4. Sort 0,1,2:", sort012([0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1]));

// 5. Move Negative Elements to One Side
/**
 * Problem: Segregate negative and positive numbers
 * Approach: Two pointers - partition like quicksort
 * Time: O(n), Space: O(1)
 */
function moveNegatives(arr) {
    let left = 0;
    for (let right = 0; right < arr.length; right++) {
        if (arr[right] < 0) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
        }
    }
    return arr;
}

// Test
console.log("5. Move Negatives:", moveNegatives([-1, 2, -3, 4, 5, 6, -7, 8, 9]));

// 6. Union and Intersection of Two Sorted Arrays
/**
 * Problem: Find union and intersection of two sorted arrays
 * Approach: Two pointers technique
 * Time: O(m + n), Space: O(1) extra
 */
function unionIntersection(arr1, arr2) {
    const union = [];
    const intersection = [];
    let i = 0, j = 0;
    
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            union.push(arr1[i]);
            i++;
        } else if (arr1[i] > arr2[j]) {
            union.push(arr2[j]);
            j++;
        } else { // arr1[i] === arr2[j]
            union.push(arr1[i]);
            intersection.push(arr1[i]);
            i++;
            j++;
        }
    }
    
    // Add remaining elements
    while (i < arr1.length) {
        union.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        union.push(arr2[j]);
        j++;
    }
    
    return [union, intersection];
}

// Test
console.log("6. Union/Intersection:", unionIntersection([1, 2, 3, 4, 5], [1, 2, 3]));

// 7. Cyclically Rotate Array by One
/**
 * Problem: Rotate array elements to right by one position
 * Approach: Store last element, shift all elements right, place last at start
 * Time: O(n), Space: O(1)
 */
function rotateByOne(arr) {
    if (arr.length <= 1) return arr;
    
    const last = arr[arr.length - 1];
    for (let i = arr.length - 1; i > 0; i--) {
        arr[i] = arr[i - 1];
    }
    arr[0] = last;
    
    return arr;
}

// Test
console.log("7. Rotate by One:", rotateByOne([1, 2, 3, 4, 5]));

// 8. Largest Sum Contiguous Subarray (Kadane's Algorithm)
/**
 * Problem: Find maximum sum of contiguous subarray
 * Approach: Kadane's algorithm - track current sum and global max
 * Time: O(n), Space: O(1)
 * This is the most important algorithm for subarray problems!
 */
function maxSubarraySum(arr) {
    if (!arr.length) return [0, []];
    
    let maxSum = arr[0];
    let currentSum = arr[0];
    let start = 0, end = 0, tempStart = 0;
    
    for (let i = 1; i < arr.length; i++) {
        if (currentSum < 0) {
            currentSum = arr[i];
            tempStart = i;
        } else {
            currentSum += arr[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return [maxSum, arr.slice(start, end + 1)];
}

// Test
console.log("8. Max Subarray Sum:", maxSubarraySum([-2, -3, 4, -1, -2, 1, 5, -3]));

// 9. Minimize Maximum Height Difference
/**
 * Problem: Given heights and k, minimize max difference after adding/subtracting k
 * Approach: Sort array, try to bring all elements closer to median range
 * Time: O(n log n), Space: O(1)
 */
function minimizeHeights(arr, k) {
    if (arr.length <= 1) return 0;
    
    arr.sort((a, b) => a - b);
    const n = arr.length;
    let result = arr[n - 1] - arr[0]; // Initial difference
    
    let small = arr[0] + k;
    let big = arr[n - 1] - k;
    
    if (small > big) [small, big] = [big, small];
    
    for (let i = 1; i < n - 1; i++) {
        const subtract = arr[i] - k;
        const add = arr[i] + k;
        
        // Skip if both operations don't help
        if (subtract >= small || add <= big) continue;
        
        // Choose operation that minimizes the range
        if (big - subtract <= add - small) {
            small = subtract;
        } else {
            big = add;
        }
    }
    
    return Math.min(result, big - small);
}

// Test
console.log("9. Min Height Diff:", minimizeHeights([1, 5, 8, 10], 2));

// 10. Minimum Jumps to Reach End
/**
 * Problem: Find minimum jumps needed to reach end of array
 * Approach: Greedy - track farthest reachable position
 * Time: O(n), Space: O(1)
 */
function minJumps(arr) {
    if (arr.length <= 1) return 0;
    if (arr[0] === 0) return -1;
    
    let jumps = 1;
    let maxReach = arr[0];
    let steps = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        if (i === arr.length - 1) return jumps;
        
        maxReach = Math.max(maxReach, i + arr[i]);
        steps--;
        
        if (steps === 0) {
            jumps++;
            if (i >= maxReach) return -1;
            steps = maxReach - i;
        }
    }
    
    return -1;
}

// Test
console.log("10. Min Jumps:", minJumps([1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9]));

// 11. Find Duplicate in Array of N+1 Integers
/**
 * Problem: Array has n+1 integers in range [1,n], find the duplicate
 * Approach: Floyd's Cycle Detection (Tortoise and Hare)
 * Time: O(n), Space: O(1)
 */
function findDuplicate(arr) {
    // Phase 1: Find intersection point in cycle
    let slow = arr[0];
    let fast = arr[0];
    
    do {
        slow = arr[slow];
        fast = arr[arr[fast]];
    } while (slow !== fast);
    
    // Phase 2: Find entrance of cycle
    slow = arr[0];
    while (slow !== fast) {
        slow = arr[slow];
        fast = arr[fast];
    }
    
    return slow;
}

// Test
console.log("11. Find Duplicate:", findDuplicate([1, 3, 4, 2, 2]));

// 12. Merge Two Sorted Arrays Without Extra Space
/**
 * Problem: Merge two sorted arrays in-place
 * Approach: Start from end of both arrays, use gap method
 * Time: O((m+n)log(m+n)), Space: O(1)
 */
function mergeSortedArrays(arr1, arr2) {
    const m = arr1.length, n = arr2.length;
    let gap = Math.ceil((m + n) / 2);
    
    while (gap > 0) {
        let i = 0;
        while (i + gap < m + n) {
            // Both in first array
            if (i < m && i + gap < m) {
                if (arr1[i] > arr1[i + gap]) {
                    [arr1[i], arr1[i + gap]] = [arr1[i + gap], arr1[i]];
                }
            }
            // One in first, one in second
            else if (i < m && i + gap >= m) {
                if (arr1[i] > arr2[i + gap - m]) {
                    [arr1[i], arr2[i + gap - m]] = [arr2[i + gap - m], arr1[i]];
                }
            }
            // Both in second array
            else {
                if (arr2[i - m] > arr2[i + gap - m]) {
                    [arr2[i - m], arr2[i + gap - m]] = [arr2[i + gap - m], arr2[i - m]];
                }
            }
            i++;
        }
        
        gap = gap > 1 ? Math.ceil(gap / 2) : 0;
    }
    
    return [arr1, arr2];
}

// Test
const [arr1Copy, arr2Copy] = [[1, 5, 9, 10, 15, 20], [2, 3, 8, 13]];
console.log("12. Merge Arrays:", mergeSortedArrays([...arr1Copy], [...arr2Copy]));

// 13. Kadane's Algorithm (Detailed Implementation)
/**
 * Problem: Maximum sum contiguous subarray - THE MOST IMPORTANT ALGORITHM
 * Approach: Dynamic programming approach tracking local and global maximum
 * Time: O(n), Space: O(1)
 * Key Insight: At each position, decide whether to extend existing subarray or start new
 */
function kadanesAlgorithm(arr) {
    if (!arr.length) return [0, []];
    
    let maxEndingHere = arr[0];
    let maxSoFar = arr[0];
    let start = 0, end = 0, tempStart = 0;
    
    for (let i = 1; i < arr.length; i++) {
        // Key decision: extend current subarray or start new one
        if (maxEndingHere < 0) {
            maxEndingHere = arr[i];
            tempStart = i;
        } else {
            maxEndingHere += arr[i];
        }
        
        // Update global maximum
        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            start = tempStart;
            end = i;
        }
    }
    
    return [maxSoFar, arr.slice(start, end + 1)];
}

// Test
console.log("13. Kadane's Algorithm:", kadanesAlgorithm([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

// 14. Merge Intervals
/**
 * Problem: Merge overlapping intervals
 * Approach: Sort by start time, then merge overlapping ones
 * Time: O(n log n), Space: O(1)
 */
function mergeIntervals(intervals) {
    if (!intervals.length) return [];
    
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = merged[merged.length - 1];
        
        if (current[0] <= last[1]) { // Overlapping
            merged[merged.length - 1] = [last[0], Math.max(last[1], current[1])];
        } else {
            merged.push(current);
        }
    }
    
    return merged;
}

// Test
console.log("14. Merge Intervals:", mergeIntervals([[1,3],[2,6],[8,10],[15,18]]));

// 15. Next Permutation
/**
 * Problem: Find lexicographically next greater permutation
 * Approach: 1) Find rightmost ascending pair 2) Find next larger 3) Swap 4) Reverse suffix
 * Time: O(n), Space: O(1)
 */
function nextPermutation(arr) {
    // Find rightmost ascending pair
    let i = arr.length - 2;
    while (i >= 0 && arr[i] >= arr[i + 1]) {
        i--;
    }
    
    if (i === -1) { // Last permutation
        arr.reverse();
        return arr;
    }
    
    // Find next larger element
    let j = arr.length - 1;
    while (arr[j] <= arr[i]) {
        j--;
    }
    
    // Swap
    [arr[i], arr[j]] = [arr[j], arr[i]];
    
    // Reverse suffix
    let left = i + 1, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr;
}

// Test
console.log("15. Next Permutation:", nextPermutation([1, 2, 3]));

// 16. Count Inversions
/**
 * Problem: Count pairs (i,j) where i < j but arr[i] > arr[j]
 * Approach: Modified merge sort to count inversions
 * Time: O(n log n), Space: O(n)
 */
function countInversions(arr) {
    function mergeAndCount(arr, temp, left, mid, right) {
        let i = left, j = mid + 1, k = left;
        let invCount = 0;
        
        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k] = arr[i];
                i++;
            } else {
                temp[k] = arr[j];
                invCount += (mid - i + 1); // All elements from i to mid are inversions
                j++;
            }
            k++;
        }
        
        // Copy remaining elements
        while (i <= mid) {
            temp[k] = arr[i];
            i++;
            k++;
        }
        while (j <= right) {
            temp[k] = arr[j];
            j++;
            k++;
        }
        
        // Copy back to original array
        for (let i = left; i <= right; i++) {
            arr[i] = temp[i];
        }
        
        return invCount;
    }
    
    function mergeSortAndCount(arr, temp, left, right) {
        let invCount = 0;
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            invCount += mergeSortAndCount(arr, temp, left, mid);
            invCount += mergeSortAndCount(arr, temp, mid + 1, right);
            invCount += mergeAndCount(arr, temp, left, mid, right);
        }
        return invCount;
    }
    
    const temp = new Array(arr.length);
    const arrCopy = [...arr];
    return mergeSortAndCount(arrCopy, temp, 0, arr.length - 1);
}

// Test
console.log("16. Count Inversions:", countInversions([8, 4, 2, 1]));

// 17. Best Time to Buy and Sell Stock
/**
 * Problem: Find maximum profit from buying and selling stock once
 * Approach: Track minimum price seen so far and maximum profit
 * Time: O(n), Space: O(1)
 */
function maxProfitStock(prices) {
    if (prices.length < 2) return 0;
    
    let minPrice = prices[0];
    let maxProfit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        minPrice = Math.min(minPrice, prices[i]);
    }
    
    return maxProfit;
}

// Test
console.log("17. Max Stock Profit:", maxProfitStock([7, 1, 5, 3, 6, 4]));

// 18. Find All Pairs with Given Sum
/**
 * Problem: Find all pairs in array that sum to target
 * Approach: Use hash set for O(n) solution
 * Time: O(n), Space: O(n)
 */
function findPairsWithSum(arr, target) {
    const seen = new Set();
    const pairs = [];
    
    for (const num of arr) {
        const complement = target - num;
        if (seen.has(complement)) {
            pairs.push([Math.min(num, complement), Math.max(num, complement)]);
        }
        seen.add(num);
    }
    
    // Remove duplicates
    const uniquePairs = [];
    const pairStrings = new Set();
    for (const pair of pairs) {
        const pairStr = pair.join(',');
        if (!pairStrings.has(pairStr)) {
            pairStrings.add(pairStr);
            uniquePairs.push(pair);
        }
    }
    
    return uniquePairs;
}

// Test
console.log("18. Pairs with Sum:", findPairsWithSum([1, 4, 45, 6, 10, -8], 16));

// 19. Common Elements in 3 Sorted Arrays
/**
 * Problem: Find common elements in three sorted arrays
 * Approach: Three pointers technique
 * Time: O(n1 + n2 + n3), Space: O(1)
 */
function commonElements3Arrays(arr1, arr2, arr3) {
    let i = 0, j = 0, k = 0;
    const common = [];
    
    while (i < arr1.length && j < arr2.length && k < arr3.length) {
        if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
            common.push(arr1[i]);
            i++;
            j++;
            k++;
        } else if (arr1[i] < arr2[j]) {
            i++;
        } else if (arr2[j] < arr3[k]) {
            j++;
        } else {
            k++;
        }
    }
    
    return common;
}

// Test
console.log("19. Common in 3 Arrays:", commonElements3Arrays(
    [1, 5, 10, 20, 40, 80],
    [6, 7, 20, 80, 100],
    [3, 4, 15, 20, 30, 70, 80, 120]
));

// 20. Rearrange Array in Alternating Positive-Negative
/**
 * Problem: Rearrange array to alternate positive and negative numbers
 * Approach: Separate positive/negative, then merge alternately
 * Time: O(n), Space: O(n)
 */
function rearrangeAlternate(arr) {
    const pos = arr.filter(x => x >= 0);
    const neg = arr.filter(x => x < 0);
    
    const result = [];
    let i = 0, j = 0;
    
    // Start with positive (or negative, depending on requirement)
    while (i < pos.length && j < neg.length) {
        result.push(pos[i]);
        result.push(neg[j]);
        i++;
        j++;
    }
    
    // Add remaining elements
    while (i < pos.length) {
        result.push(pos[i]);
        i++;
    }
    while (j < neg.length) {
        result.push(neg[j]);
        j++;
    }
    
    return result;
}

// Test
console.log("20. Alternate +/-:", rearrangeAlternate([1, 2, 3, -4, -1, 4]));

// 21. Subarray with Sum Zero
/**
 * Problem: Check if there exists a subarray with sum 0
 * Approach: Use prefix sum and hash set
 * Time: O(n), Space: O(n)
 */
function subarraySumZero(arr) {
    let prefixSum = 0;
    const sumSet = new Set([0]); // Include 0 for subarrays starting from index 0
    
    for (const num of arr) {
        prefixSum += num;
        if (sumSet.has(prefixSum)) {
            return true;
        }
        sumSet.add(prefixSum);
    }
    
    return false;
}

// Test
console.log("21. Subarray Sum Zero:", subarraySumZero([4, 2, -3, 1, 6]));

// 22. Factorial of Large Number
/**
 * Problem: Calculate factorial of large number (can't fit in int)
 * Approach: Use array to store digits
 * Time: O(n^2), Space: O(n)
 */
function factorialLarge(n) {
    const result = [1];
    
    for (let i = 2; i <= n; i++) {
        let carry = 0;
        for (let j = 0; j < result.length; j++) {
            const prod = result[j] * i + carry;
            result[j] = prod % 10;
            carry = Math.floor(prod / 10);
        }
        
        while (carry) {
            result.push(carry % 10);
            carry = Math.floor(carry / 10);
        }
    }
    
    return result.reverse().join('');
}

// Test
console.log("22. Large Factorial:", factorialLarge(100).slice(0, 50) + "..."); // Show first 50 digits

// 23. Maximum Product Subarray
/**
 * Problem: Find maximum product of contiguous subarray
 * Approach: Track both max and min (negative * negative = positive)
 * Time: O(n), Space: O(1)
 */
function maxProductSubarray(arr) {
    if (!arr.length) return 0;
    
    let maxProd = arr[0];
    let minProd = arr[0];
    let result = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < 0) {
            [maxProd, minProd] = [minProd, maxProd];
        }
        
        maxProd = Math.max(arr[i], maxProd * arr[i]);
        minProd = Math.min(arr[i], minProd * arr[i]);
        
        result = Math.max(result, maxProd);
    }
    
    return result;
}

// Test
console.log("23. Max Product Subarray:", maxProductSubarray([2, 3, -2, 4]));

// 24. Longest Consecutive Subsequence
/**
 * Problem: Find length of longest consecutive elements sequence
 * Approach: Use hash set for O(1) lookups
 * Time: O(n), Space: O(n)
 */
function longestConsecutive(arr) {
    if (!arr.length) return 0;
    
    const numSet = new Set(arr);
    let maxLength = 0;
    
    for (const num of numSet) {
        // Only start counting if it's the beginning of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentLength = 1;
            
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }
            
            maxLength = Math.max(maxLength, currentLength);
        }
    }
    
    return maxLength;
}

// Test
console.log("24. Longest Consecutive:", longestConsecutive([100, 4, 200, 1, 3, 2]));

// 25. Elements Appearing More Than n/k Times
/**
 * Problem: Find elements that appear more than n/k times
 * Approach: Boyer-Moore majority vote algorithm extension
 * Time: O(n), Space: O(k)
 */
function moreThanNKTimes(arr, k) {
    if (k <= 1) return [];
    
    // At most k-1 elements can appear more than n/k times
    const candidates = new Map();
    
    // Phase 1: Find potential candidates
    for (const num of arr) {
        if (candidates.has(num)) {
            candidates.set(num, candidates.get(num) + 1);
        } else if (candidates.size < k - 1) {
            candidates.set(num, 1);
        } else {
            // Decrease count of all candidates
            const toRemove = [];
            for (const [cand, count] of candidates) {
                candidates.set(cand, count - 1);
                if (candidates.get(cand) === 0) {
                    toRemove.push(cand);
                }
            }
            for (const cand of toRemove) {
                candidates.delete(cand);
            }
        }
    }
    
    // Phase 2: Verify candidates
    const result = [];
    const threshold = Math.floor(arr.length / k);
    for (const candidate of candidates.keys()) {
        if (arr.filter(x => x === candidate).length > threshold) {
            result.push(candidate);
        }
    }
    
    return result;
}

// Test
console.log("25. More than n/k times:", moreThanNKTimes([3, 1, 2, 2, 1, 2, 3, 3], 4));

// 26. Maximum Profit with At Most 2 Transactions
/**
 * Problem: Best time to buy/sell stock with at most 2 transactions
 * Approach: Dynamic programming with state tracking
 * Time: O(n), Space: O(1)
 */
function maxProfit2Transactions(prices) {
    if (prices.length <= 1) return 0;
    
    // State variables
    let buy1 = -Infinity, buy2 = -Infinity;
    let sell1 = 0, sell2 = 0;
    
    for (const price of prices) {
        // First transaction
        buy1 = Math.max(buy1, -price); // Buy first stock
        sell1 = Math.max(sell1, buy1 + price); // Sell first stock
        
        // Second transaction
        buy2 = Math.max(buy2, sell1 - price); // Buy second stock
        sell2 = Math.max(sell2, buy2 + price); // Sell second stock
    }
    
    return sell2;
}

// Test
console.log("26. Max Profit 2 Transactions:", maxProfit2Transactions([3, 3, 5, 0, 0, 3, 1, 4]));


// 27. FIND WHETHER AN ARRAY IS A SUBSET OF ANOTHER ARRAY
// Problem: Check if all elements of array1 exist in array2
// Time Complexity: O(n + m), Space Complexity: O(m)
function isSubset(arr1, arr2) {
    // Create a Set from arr2 for O(1) lookup time
    const set2 = new Set(arr2);
    
    // Check if every element in arr1 exists in arr2
    return arr1.every(element => set2.has(element));
}

// Example usage:
console.log("1. Subset Problem:");
console.log(isSubset([1, 2, 3], [1, 2, 3, 4, 5])); // true
console.log(isSubset([1, 2, 6], [1, 2, 3, 4, 5])); // false
console.log("---");

// ==================== 

// 28. FIND THE TRIPLET THAT SUM TO A GIVEN VALUE
// Problem: Find three numbers in array that sum to target
// Time Complexity: O(n²), Space Complexity: O(1)
function findTripletSum(arr, target) {
    // Sort the array first
    arr.sort((a, b) => a - b);
    
    for (let i = 0; i < arr.length - 2; i++) {
        let left = i + 1;
        let right = arr.length - 1;
        
        while (left < right) {
            const currentSum = arr[i] + arr[left] + arr[right];
            
            if (currentSum === target) {
                return [arr[i], arr[left], arr[right]];
            } else if (currentSum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    return null; // No triplet found
}

// Example usage:
console.log("2. Triplet Sum Problem:");
console.log(findTripletSum([1, 4, 45, 6, 10, 8], 22)); // [4, 8, 10]
console.log(findTripletSum([1, 2, 3, 4, 5], 9)); // [1, 3, 5]
console.log("---");

// ====================

// 29. TRAPPING RAIN WATER PROBLEM
// Problem: Calculate how much water can be trapped after raining
// Time Complexity: O(n), Space Complexity: O(1)
function trapRainWater(heights) {
    if (heights.length <= 2) return 0;
    
    let left = 0, right = heights.length - 1;
    let leftMax = 0, rightMax = 0;
    let waterTrapped = 0;
    
    while (left < right) {
        if (heights[left] < heights[right]) {
            // Process left side
            if (heights[left] >= leftMax) {
                leftMax = heights[left];
            } else {
                // Water can be trapped
                waterTrapped += leftMax - heights[left];
            }
            left++;
        } else {
            // Process right side
            if (heights[right] >= rightMax) {
                rightMax = heights[right];
            } else {
                // Water can be trapped
                waterTrapped += rightMax - heights[right];
            }
            right--;
        }
    }
    
    return waterTrapped;
}

// Example usage:
console.log("3. Trapping Rain Water:");
console.log(trapRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log(trapRainWater([3, 0, 2, 0, 4])); // 7
console.log("---");

// ====================

// 30. CHOCOLATE DISTRIBUTION PROBLEM
// Problem: Distribute chocolates to minimize difference between max and min
// Time Complexity: O(n log n), Space Complexity: O(1)
function chocolateDistribution(chocolates, students) {
    if (students === 0 || chocolates.length === 0) return 0;
    if (chocolates.length < students) return -1;
    
    // Sort the array
    chocolates.sort((a, b) => a - b);
    
    let minDifference = Number.MAX_VALUE;
    
    // Find minimum difference in every window of size 'students'
    for (let i = 0; i <= chocolates.length - students; i++) {
        const difference = chocolates[i + students - 1] - chocolates[i];
        minDifference = Math.min(minDifference, difference);
    }
    
    return minDifference;
}

// Example usage:
console.log("4. Chocolate Distribution:");
console.log(chocolateDistribution([3, 4, 1, 9, 56, 7, 9, 12], 5)); // 6
console.log(chocolateDistribution([7, 3, 2, 4, 9, 12, 56], 3)); // 2
console.log("---");

// ====================

// 31. SMALLEST SUBARRAY WITH SUM GREATER THAN GIVEN VALUE
// Problem: Find length of smallest subarray with sum > given value
// Time Complexity: O(n), Space Complexity: O(1)
function smallestSubarraySum(arr, target) {
    let minLength = Number.MAX_VALUE;
    let start = 0;
    let currentSum = 0;
    
    for (let end = 0; end < arr.length; end++) {
        currentSum += arr[end];
        
        // Shrink window from left while sum is greater than target
        while (currentSum > target && start <= end) {
            minLength = Math.min(minLength, end - start + 1);
            currentSum -= arr[start];
            start++;
        }
    }
    
    return minLength === Number.MAX_VALUE ? 0 : minLength;
}

// Example usage:
console.log("5. Smallest Subarray Sum:");
console.log(smallestSubarraySum([1, 4, 4], 3)); // 1
console.log(smallestSubarraySum([1, 10, 3, 10, 4, 7, 2, 8], 15)); // 2
console.log("---");

// ====================

// 32. THREE WAY PARTITIONING AROUND A GIVEN VALUE
// Problem: Partition array into three parts: <pivot, =pivot, >pivot
// Time Complexity: O(n), Space Complexity: O(1)
function threeWayPartition(arr, pivot) {
    let low = 0, mid = 0, high = arr.length - 1;
    
    while (mid <= high) {
        if (arr[mid] < pivot) {
            [arr[low], arr[mid]] = [arr[mid], arr[low]];
            low++;
            mid++;
        } else if (arr[mid] === pivot) {
            mid++;
        } else {
            [arr[mid], arr[high]] = [arr[high], arr[mid]];
            high--;
        }
    }
    
    return arr;
}

// Example usage:
console.log("6. Three Way Partitioning:");
console.log(threeWayPartition([1, 14, 5, 20, 4, 2, 54, 20, 87, 98, 3, 1, 32], 20));
console.log("---");

// ====================

// 33. MINIMUM SWAPS TO BRING ELEMENTS ≤ K TOGETHER
// Problem: Find minimum swaps to group all elements ≤ K together
// Time Complexity: O(n), Space Complexity: O(1)
function minSwapsToGroupElements(arr, k) {
    // Count elements <= k
    let count = arr.filter(x => x <= k).length;
    
    if (count === 0 || count === 1) return 0;
    
    // Count elements > k in first window of size 'count'
    let bad = 0;
    for (let i = 0; i < count; i++) {
        if (arr[i] > k) bad++;
    }
    
    let minSwaps = bad;
    
    // Use sliding window to find minimum bad elements
    for (let i = count; i < arr.length; i++) {
        // Remove element going out of window
        if (arr[i - count] > k) bad--;
        
        // Add element coming into window
        if (arr[i] > k) bad++;
        
        minSwaps = Math.min(minSwaps, bad);
    }
    
    return minSwaps;
}

// Example usage:
console.log("7. Minimum Swaps:");
console.log(minSwapsToGroupElements([2, 1, 2, 3, 1], 3)); // 1
console.log(minSwapsToGroupElements([2, 7, 9, 5, 8, 7, 4], 6)); // 2
console.log("---");

// ====================

// 34. MINIMUM OPERATIONS TO MAKE ARRAY PALINDROME
// Problem: Find minimum merge operations to make array palindromic
// Time Complexity: O(n), Space Complexity: O(1)
function minOperationsPalindrome(arr) {
    let operations = 0;
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        if (arr[left] === arr[right]) {
            left++;
            right--;
        } else if (arr[left] < arr[right]) {
            // Merge left element with next
            arr[left + 1] += arr[left];
            left++;
            operations++;
        } else {
            // Merge right element with previous
            arr[right - 1] += arr[right];
            right--;
            operations++;
        }
    }
    
    return operations;
}

// Example usage:
console.log("8. Minimum Operations for Palindrome:");
console.log(minOperationsPalindrome([1, 4, 5, 9, 1])); // 1
console.log(minOperationsPalindrome([1, 4, 5, 1])); // 0
console.log("---");

// ====================

// 35. MEDIAN OF 2 SORTED ARRAYS OF EQUAL SIZE
// Problem: Find median of two sorted arrays of same size
// Time Complexity: O(log n), Space Complexity: O(1)
function medianEqualSize(arr1, arr2) {
    const n = arr1.length;
    
    // Binary search approach
    function findMedianUtil(a, b, startA, startB, endA, endB) {
        if (endA - startA === 1) {
            return (Math.max(a[startA], b[startB]) + Math.min(a[endA], b[endB])) / 2;
        }
        
        const midA = Math.floor((startA + endA) / 2);
        const midB = Math.floor((startB + endB) / 2);
        
        if (a[midA] === b[midB]) {
            return a[midA];
        }
        
        if (a[midA] < b[midB]) {
            return findMedianUtil(a, b, midA, startB, endA, midB);
        } else {
            return findMedianUtil(a, b, startA, midB, midA, endB);
        }
    }
    
    if (n === 1) {
        return (arr1[0] + arr2[0]) / 2;
    }
    
    return findMedianUtil(arr1, arr2, 0, 0, n - 1, n - 1);
}

// Example usage:
console.log("9. Median of Equal Size Arrays:");
console.log(medianEqualSize([1, 12, 15, 26, 38], [2, 13, 17, 30, 45])); // 16
console.log("---");

// ====================

// 36. MEDIAN OF 2 SORTED ARRAYS OF DIFFERENT SIZE
// Problem: Find median of two sorted arrays of different sizes
// Time Complexity: O(log(min(m,n))), Space Complexity: O(1)
function medianDifferentSize(arr1, arr2) {
    // Ensure arr1 is smaller array
    if (arr1.length > arr2.length) {
        [arr1, arr2] = [arr2, arr1];
    }
    
    const m = arr1.length;
    const n = arr2.length;
    let low = 0, high = m;
    
    while (low <= high) {
        const cut1 = Math.floor((low + high) / 2);
        const cut2 = Math.floor((m + n + 1) / 2) - cut1;
        
        const left1 = cut1 === 0 ? Number.NEGATIVE_INFINITY : arr1[cut1 - 1];
        const left2 = cut2 === 0 ? Number.NEGATIVE_INFINITY : arr2[cut2 - 1];
        
        const right1 = cut1 === m ? Number.POSITIVE_INFINITY : arr1[cut1];
        const right2 = cut2 === n ? Number.POSITIVE_INFINITY : arr2[cut2];
        
        if (left1 <= right2 && left2 <= right1) {
            if ((m + n) % 2 === 0) {
                return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
            } else {
                return Math.max(left1, left2);
            }
        } else if (left1 > right2) {
            high = cut1 - 1;
        } else {
            low = cut1 + 1;
        }
    }
    
    return -1;
}

// Example usage:
console.log("10. Median of Different Size Arrays:");
console.log(medianDifferentSize([1, 3], [2])); // 2
console.log(medianDifferentSize([1, 2], [3, 4])); // 2.5
console.log(medianDifferentSize([0, 0], [0, 0])); // 0
console.log("---");
