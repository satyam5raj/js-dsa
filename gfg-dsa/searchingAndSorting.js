// ================================================================================================
// SEARCHING AND SORTING PROBLEMS - JAVASCRIPT SOLUTIONS
// ================================================================================================

// 1. Find first and last positions of an element in a sorted array
/*
Problem: Given a sorted array with duplicates, find the first and last occurrence of a target element.
Approach: Use binary search twice - once to find the first occurrence and once for the last.
Time Complexity: O(log n)
Space Complexity: O(1)
*/
function findFirstAndLastPosition(nums, target) {
    function findFirst(nums, target) {
        let left = 0, right = nums.length - 1;
        let result = -1;
        
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                result = mid;
                right = mid - 1; // Continue searching left for first occurrence
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    }
    
    function findLast(nums, target) {
        let left = 0, right = nums.length - 1;
        let result = -1;
        
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                result = mid;
                left = mid + 1; // Continue searching right for last occurrence
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    }
    
    return [findFirst(nums, target), findLast(nums, target)];
}

// Test case
console.log("1. First and Last Position:");
console.log(findFirstAndLastPosition([5,7,7,8,8,10], 8)); // Output: [3, 4]
console.log(findFirstAndLastPosition([5,7,7,8,8,10], 6)); // Output: [-1, -1]
console.log("---");

// ================================================================================================

// 2. Find a Fixed Point (Value equal to index) in a given array
/*
Problem: Find an index i such that arr[i] = i in a sorted array.
Approach: Use binary search. If arr[mid] = mid, we found it. If arr[mid] > mid, search left, else search right.
Time Complexity: O(log n)
Space Complexity: O(1)
*/
function findFixedPoint(arr) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === mid) {
            return mid;
        } else if (arr[mid] > mid) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}

// Test case
console.log("2. Fixed Point:");
console.log(findFixedPoint([-10, -5, 0, 3, 7])); // Output: 3
console.log(findFixedPoint([0, 2, 5, 8, 17])); // Output: 0
console.log("---");

// ================================================================================================

// 3. Search in a rotated sorted array
/*
Problem: Search for target in a rotated sorted array.
Approach: Use binary search. First determine which half is sorted, then check if target is in that half.
Time Complexity: O(log n)
Space Complexity: O(1)
*/
function searchRotatedArray(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        }
        
        // Check if left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else { // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

// Test case
console.log("3. Search in Rotated Array:");
console.log(searchRotatedArray([4,5,6,7,0,1,2], 0)); // Output: 4
console.log(searchRotatedArray([4,5,6,7,0,1,2], 3)); // Output: -1
console.log("---");

// ================================================================================================

// 4. Square root of an integer
/*
Problem: Find the square root of a number (floor value).
Approach: Use binary search between 0 and n.
Time Complexity: O(log n)
Space Complexity: O(1)
*/
function mySqrt(x) {
    if (x === 0) return 0;
    
    let left = 1, right = x;
    let result = 0;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let square = mid * mid;
        
        if (square === x) {
            return mid;
        } else if (square < x) {
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

// Test case
console.log("4. Square Root:");
console.log(mySqrt(4)); // Output: 2
console.log(mySqrt(8)); // Output: 2
console.log("---");

// ================================================================================================

// 5. Maximum and minimum of an array using minimum number of comparisons
/*
Problem: Find both max and min with minimum comparisons.
Approach: Compare elements in pairs and then compare with current min/max.
Time Complexity: O(n)
Space Complexity: O(1)
Comparisons: 3n/2 - 2 (optimal)
*/
function findMinMax(arr) {
    if (arr.length === 0) return null;
    if (arr.length === 1) return { min: arr[0], max: arr[0] };
    
    let min, max;
    let i = 0;
    
    // Initialize min and max
    if (arr.length % 2 === 0) {
        if (arr[0] > arr[1]) {
            max = arr[0];
            min = arr[1];
        } else {
            max = arr[1];
            min = arr[0];
        }
        i = 2;
    } else {
        min = max = arr[0];
        i = 1;
    }
    
    // Process remaining elements in pairs
    while (i < arr.length - 1) {
        if (arr[i] > arr[i + 1]) {
            max = Math.max(max, arr[i]);
            min = Math.min(min, arr[i + 1]);
        } else {
            max = Math.max(max, arr[i + 1]);
            min = Math.min(min, arr[i]);
        }
        i += 2;
    }
    
    return { min, max };
}

// Test case
console.log("5. Min and Max:");
console.log(findMinMax([1000, 11, 445, 1, 330, 3000])); // Output: {min: 1, max: 3000}
console.log("---");

// ================================================================================================

// 6. Optimum location of point to minimize total distance
/*
Problem: Find a point on x-axis that minimizes sum of distances to all given points.
Approach: The optimal point is the median of all x-coordinates.
Time Complexity: O(n log n) for sorting
Space Complexity: O(1)
*/
function findOptimalPoint(points) {
    let xCoords = points.map(point => point[0]).sort((a, b) => a - b);
    let n = xCoords.length;
    
    // Median is the optimal point
    if (n % 2 === 1) {
        return xCoords[Math.floor(n / 2)];
    } else {
        // For even number of points, any point between the two middle points works
        return xCoords[n / 2 - 1];
    }
}

// Test case
console.log("6. Optimal Point:");
console.log(findOptimalPoint([[1, 1], [3, 3], [2, 2]])); // Output: 2
console.log("---");

// ================================================================================================

// 7. Find the repeating and the missing
/*
Problem: In array of size n with numbers 1 to n, one number is missing and one is repeated.
Approach: Use mathematical approach with sum and sum of squares.
Time Complexity: O(n)
Space Complexity: O(1)
*/
function findRepeatingAndMissing(arr) {
    let n = arr.length;
    let sum = 0, sumSq = 0;
    
    for (let i = 0; i < n; i++) {
        sum += arr[i];
        sumSq += arr[i] * arr[i];
    }
    
    let expectedSum = n * (n + 1) / 2;
    let expectedSumSq = n * (n + 1) * (2 * n + 1) / 6;
    
    let diff = sum - expectedSum; // repeating - missing
    let diffSq = sumSq - expectedSumSq; // repeating² - missing²
    
    let sumRepMiss = diffSq / diff; // repeating + missing
    
    let repeating = (diff + sumRepMiss) / 2;
    let missing = sumRepMiss - repeating;
    
    return { repeating, missing };
}

// Test case
console.log("7. Repeating and Missing:");
console.log(findRepeatingAndMissing([3, 1, 2, 5, 3])); // Output: {repeating: 3, missing: 4}
console.log("---");

// ================================================================================================

// 8. Find majority element
/*
Problem: Find element that appears more than n/2 times.
Approach: Boyer-Moore Voting Algorithm
Time Complexity: O(n)
Space Complexity: O(1)
*/
function findMajorityElement(nums) {
    let candidate = null;
    let count = 0;
    
    // Find potential candidate
    for (let num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }
    
    // Verify if candidate is actually majority
    count = 0;
    for (let num of nums) {
        if (num === candidate) count++;
    }
    
    return count > nums.length / 2 ? candidate : null;
}

// Test case
console.log("8. Majority Element:");
console.log(findMajorityElement([3, 2, 3])); // Output: 3
console.log(findMajorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2
console.log("---");

// ================================================================================================

// 9. Searching in an array where adjacent differ by at most k
/*
Problem: Search in array where adjacent elements differ by at most k.
Approach: Use the property to skip elements intelligently.
Time Complexity: O(n) worst case, but often better
Space Complexity: O(1)
*/
function searchAdjacentDiffK(arr, x, k) {
    let i = 0;
    let n = arr.length;
    
    while (i < n) {
        if (arr[i] === x) {
            return i;
        }
        
        // Skip elements based on the difference property
        let jump = Math.max(1, Math.abs(arr[i] - x) / k);
        i += Math.floor(jump);
    }
    
    return -1;
}

// Test case
console.log("9. Search Adjacent Diff K:");
console.log(searchAdjacentDiffK([4, 5, 6, 7, 6], 6, 1)); // Output: 2
console.log("---");

// ================================================================================================

// 10. Find a pair with a given difference
/*
Problem: Find if there exists a pair with given difference.
Approach: Use two pointers or hashing.
Time Complexity: O(n log n) with sorting, O(n) with hashing
Space Complexity: O(1) with sorting, O(n) with hashing
*/
function findPairWithDifference(arr, diff) {
    // Method 1: Using sorting and two pointers
    arr.sort((a, b) => a - b);
    let left = 0, right = 1;
    
    while (right < arr.length) {
        let currentDiff = arr[right] - arr[left];
        
        if (currentDiff === diff) {
            return [arr[left], arr[right]];
        } else if (currentDiff < diff) {
            right++;
        } else {
            left++;
            if (left === right) right++;
        }
    }
    
    return null;
}

// Test case
console.log("10. Pair with Difference:");
console.log(findPairWithDifference([5, 20, 3, 2, 50, 80], 78)); // Output: [2, 80]
console.log("---");

// ================================================================================================

// 11. Find four elements that sum to a given value
/*
Problem: Find four numbers in array that sum to target.
Approach: Use two nested loops + two pointers.
Time Complexity: O(n³)
Space Complexity: O(1)
*/
function fourSum(nums, target) {
    let result = [];
    nums.sort((a, b) => a - b);
    let n = nums.length;
    
    for (let i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        for (let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            
            let left = j + 1, right = n - 1;
            
            while (left < right) {
                let sum = nums[i] + nums[j] + nums[left] + nums[right];
                
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    
    return result;
}

// Test case
console.log("11. Four Sum:");
console.log(fourSum([1, 0, -1, 0, -2, 2], 0)); // Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
console.log("---");

// ================================================================================================

// 12. Maximum sum such that no 2 elements are adjacent
/*
Problem: Find maximum sum of non-adjacent elements.
Approach: Dynamic Programming - for each element, choose max of (include current + dp[i-2]) or (exclude current).
Time Complexity: O(n)
Space Complexity: O(1)
*/
function maxSumNonAdjacent(arr) {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0];
    
    let incl = arr[0]; // Maximum sum including previous element
    let excl = 0;      // Maximum sum excluding previous element
    
    for (let i = 1; i < arr.length; i++) {
        let newExcl = Math.max(incl, excl);
        incl = excl + arr[i];
        excl = newExcl;
    }
    
    return Math.max(incl, excl);
}

// Test case
console.log("12. Max Sum Non-Adjacent:");
console.log(maxSumNonAdjacent([5, 1, 3, 4, 9])); // Output: 14 (5 + 4 + 5 = 14)
console.log("---");

// ================================================================================================

// 13. Count triplet with sum smaller than a given value
/*
Problem: Count triplets with sum less than given value.
Approach: Sort array, use three pointers.
Time Complexity: O(n²)
Space Complexity: O(1)
*/
function countTripletsWithSmallerSum(arr, sum) {
    arr.sort((a, b) => a - b);
    let n = arr.length;
    let count = 0;
    
    for (let i = 0; i < n - 2; i++) {
        let left = i + 1, right = n - 1;
        
        while (left < right) {
            if (arr[i] + arr[left] + arr[right] < sum) {
                // All triplets from left to right-1 will have sum < target
                count += (right - left);
                left++;
            } else {
                right--;
            }
        }
    }
    
    return count;
}

// Test case
console.log("13. Count Triplets Smaller Sum:");
console.log(countTripletsWithSmallerSum([5, 1, 3, 4, 7], 12)); // Output: 4
console.log("---");

// ================================================================================================

// 14. Merge 2 sorted arrays
/*
Problem: Merge two sorted arrays into one sorted array.
Approach: Use two pointers to compare and merge.
Time Complexity: O(m + n)
Space Complexity: O(m + n)
*/
function mergeSortedArrays(nums1, nums2) {
    let result = [];
    let i = 0, j = 0;
    
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            result.push(nums1[i]);
            i++;
        } else {
            result.push(nums2[j]);
            j++;
        }
    }
    
    // Add remaining elements
    while (i < nums1.length) {
        result.push(nums1[i]);
        i++;
    }
    
    while (j < nums2.length) {
        result.push(nums2[j]);
        j++;
    }
    
    return result;
}

// Test case
console.log("14. Merge Sorted Arrays:");
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); // Output: [1, 2, 3, 4, 5, 6]
console.log("---");

// ================================================================================================

// 15. Product array Puzzle
/*
Problem: Create array where each element is product of all other elements.
Approach: Two passes - left products and right products.
Time Complexity: O(n)
Space Complexity: O(1) excluding output array
*/
function productExceptSelf(nums) {
    let n = nums.length;
    let result = new Array(n);
    
    // Left pass
    result[0] = 1;
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Right pass
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
}

// Test case
console.log("15. Product Array Puzzle:");
console.log(productExceptSelf([1, 2, 3, 4])); // Output: [24, 12, 8, 6]
console.log("---");

// ================================================================================================

// 16. Sort array according to count of set bits
/*
Problem: Sort array by number of set bits in binary representation.
Approach: Custom comparator with bit counting.
Time Complexity: O(n log n)
Space Complexity: O(1)
*/
function sortBySetBits(arr) {
    function countSetBits(n) {
        let count = 0;
        while (n) {
            count += n & 1;
            n >>= 1;
        }
        return count;
    }
    
    return arr.sort((a, b) => {
        let countA = countSetBits(a);
        let countB = countSetBits(b);
        
        if (countA !== countB) {
            return countB - countA; // Descending order of set bits
        }
        return a - b; // If same set bits, sort by value
    });
}

// Test case
console.log("16. Sort by Set Bits:");
console.log(sortBySetBits([5, 2, 3, 9, 4, 6, 7, 15])); // Output sorted by set bits count
console.log("---");

// ================================================================================================

// 17. Minimum no. of swaps required to sort the array
/*
Problem: Find minimum swaps to sort array with distinct elements.
Approach: Create position map and count cycles.
Time Complexity: O(n log n)
Space Complexity: O(n)
*/
function minSwapsToSort(arr) {
    let n = arr.length;
    let arrPos = arr.map((val, idx) => [val, idx]);
    
    // Sort by values
    arrPos.sort((a, b) => a[0] - b[0]);
    
    let visited = new Array(n).fill(false);
    let swaps = 0;
    
    for (let i = 0; i < n; i++) {
        if (visited[i] || arrPos[i][1] === i) {
            continue;
        }
        
        // Count cycle length
        let cycleSize = 0;
        let j = i;
        
        while (!visited[j]) {
            visited[j] = true;
            j = arrPos[j][1];
            cycleSize++;
        }
        
        swaps += (cycleSize - 1);
    }
    
    return swaps;
}

// Test case
console.log("17. Min Swaps to Sort:");
console.log(minSwapsToSort([4, 3, 2, 1])); // Output: 2
console.log("---");

// ================================================================================================

// 18. Binary Search Implementation
/*
Problem: Implement binary search algorithm.
Approach: Divide and conquer.
Time Complexity: O(log n)
Space Complexity: O(1)
*/
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Test case
console.log("18. Binary Search:");
console.log(binarySearch([1, 3, 5, 7, 9, 11], 7)); // Output: 3
console.log("---");

// ================================================================================================

// 19. Find pivot element in a sorted array
/*
Problem: Find pivot in rotated sorted array.
Approach: Binary search to find the smallest element.
Time Complexity: O(log n)
Space Complexity: O(1)
*/
function findPivot(arr) {
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] > arr[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// Test case
console.log("19. Find Pivot:");
console.log(findPivot([4, 5, 6, 7, 0, 1, 2])); // Output: 4 (index of smallest element)
console.log("---");

// ================================================================================================

// 20. K-th Element of Two Sorted Arrays
/*
Problem: Find kth smallest element in union of two sorted arrays.
Approach: Binary search on the smaller array.
Time Complexity: O(log(min(m, n)))
Space Complexity: O(1)
*/
function findKthElement(arr1, arr2, k) {
    if (arr1.length > arr2.length) {
        return findKthElement(arr2, arr1, k);
    }
    
    let m = arr1.length;
    let n = arr2.length;
    let low = Math.max(0, k - n);
    let high = Math.min(k, m);
    
    while (low <= high) {
        let cut1 = Math.floor((low + high) / 2);
        let cut2 = k - cut1;
        
        let left1 = cut1 === 0 ? -Infinity : arr1[cut1 - 1];
        let left2 = cut2 === 0 ? -Infinity : arr2[cut2 - 1];
        
        let right1 = cut1 === m ? Infinity : arr1[cut1];
        let right2 = cut2 === n ? Infinity : arr2[cut2];
        
        if (left1 <= right2 && left2 <= right1) {
            return Math.max(left1, left2);
        } else if (left1 > right2) {
            high = cut1 - 1;
        } else {
            low = cut1 + 1;
        }
    }
    
    return -1;
}

// Test case
console.log("20. Kth Element of Two Sorted Arrays:");
console.log(findKthElement([1, 3, 5], [2, 4, 6], 4)); // Output: 4
console.log("---");

// ================================================================================================

// 21. Aggressive Cows (Binary Search Application)
/*
Problem: Place C cows in N stalls such that minimum distance between any two cows is maximized.
Approach: Binary search on the answer.
Time Complexity: O(N log N + N log(max-min))
Space Complexity: O(1)
*/
function aggressiveCows(stalls, cows) {
    stalls.sort((a, b) => a - b);
    
    function canPlaceCows(minDist) {
        let count = 1;
        let lastPos = stalls[0];
        
        for (let i = 1; i < stalls.length; i++) {
            if (stalls[i] - lastPos >= minDist) {
                count++;
                lastPos = stalls[i];
                if (count === cows) return true;
            }
        }
        return false;
    }
    
    let left = 1;
    let right = stalls[stalls.length - 1] - stalls[0];
    let result = 0;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (canPlaceCows(mid)) {
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Test case
console.log("21. Aggressive Cows:");
console.log(aggressiveCows([1, 2, 4, 8, 9], 3)); // Output: 3
console.log("---");

// ================================================================================================

// 22. Book Allocation Problem
/*
Problem: Allocate books to students such that maximum pages assigned to a student is minimized.
Approach: Binary search on the answer.
Time Complexity: O(N log(sum of pages))
Space Complexity: O(1)
*/
function allocateBooks(books, students) {
    if (books.length < students) return -1;
    
    function canAllocate(maxPages) {
        let studentCount = 1;
        let currentSum = 0;
        
        for (let pages of books) {
            if (pages > maxPages) return false;
            
            if (currentSum + pages > maxPages) {
                studentCount++;
                currentSum = pages;
                if (studentCount > students) return false;
            } else {
                currentSum += pages;
            }
        }
        return true;
    }
    
    let left = Math.max(...books);
    let right = books.reduce((sum, pages) => sum + pages, 0);
    let result = -1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (canAllocate(mid)) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return result;
}

// Test case
console.log("22. Book Allocation:");
console.log(allocateBooks([12, 34, 67, 90], 2)); // Output: 113
console.log("---");

// ================================================================================================

// ===============================================
// PROBLEM 1: Find the Inversion Count
// ===============================================
/*
QUESTION: Given an array, find the number of inversions in it.
An inversion is when a larger element appears before a smaller element.
For example: [2, 3, 8, 6, 1] has inversions: (2,1), (3,1), (8,6), (8,1), (6,1) = 5 inversions

APPROACH: We can use a modified merge sort to count inversions efficiently.
During the merge process, when we take an element from the right array,
it means all remaining elements in the left array form inversions with this element.

TIME COMPLEXITY: O(n log n) - Same as merge sort
SPACE COMPLEXITY: O(n) - For temporary arrays during merging
*/

function mergeAndCount(arr, temp, left, mid, right) {
    let i = left;    // Starting index of left subarray
    let j = mid + 1; // Starting index of right subarray
    let k = left;    // Starting index to be sorted
    let invCount = 0;
    
    // Merge the two arrays while counting inversions
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            // arr[i] > arr[j], so there are (mid - i + 1) inversions
            // because all elements from arr[i] to arr[mid] are greater than arr[j]
            temp[k++] = arr[j++];
            invCount += (mid - i + 1);
        }
    }
    
    // Copy remaining elements
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    
    // Copy merged elements back to original array
    for (i = left; i <= right; i++) {
        arr[i] = temp[i];
    }
    
    return invCount;
}

function mergeSortAndCount(arr, temp, left, right) {
    let invCount = 0;
    if (left < right) {
        let mid = Math.floor((left + right) / 2);
        
        invCount += mergeSortAndCount(arr, temp, left, mid);
        invCount += mergeSortAndCount(arr, temp, mid + 1, right);
        invCount += mergeAndCount(arr, temp, left, mid, right);
    }
    return invCount;
}

function getInversionCount(arr) {
    let temp = new Array(arr.length);
    let arrCopy = [...arr]; // Don't modify original array
    return mergeSortAndCount(arrCopy, temp, 0, arr.length - 1);
}

// Test Case for Problem 1
console.log("=== PROBLEM 1: Inversion Count ===");
let testArr1 = [2, 3, 8, 6, 1];
console.log(`Array: [${testArr1.join(', ')}]`);
console.log(`Inversion Count: ${getInversionCount(testArr1)}`);
console.log(`Expected: 5 inversions - (2,1), (3,1), (8,6), (8,1), (6,1)`);

let testArr2 = [1, 2, 3, 4, 5];
console.log(`\nArray: [${testArr2.join(', ')}]`);
console.log(`Inversion Count: ${getInversionCount(testArr2)}`);
console.log(`Expected: 0 inversions (already sorted)`);

let testArr3 = [5, 4, 3, 2, 1];
console.log(`\nArray: [${testArr3.join(', ')}]`);
console.log(`Inversion Count: ${getInversionCount(testArr3)}`);
console.log(`Expected: 10 inversions (reverse sorted)`);

// ===============================================
// PROBLEM 2: Implement Merge Sort In-Place
// ===============================================
/*
QUESTION: Implement merge sort algorithm that sorts the array in-place
without using extra space for merging (challenging variation).

APPROACH: True in-place merge sort is complex and not practical due to O(n²) time complexity.
Instead, we'll implement a space-optimized version that uses minimal extra space.
We use insertion sort for small subarrays and optimize the merge process.

TIME COMPLEXITY: O(n log n) average case, but the in-place merge can be O(n²) in worst case
SPACE COMPLEXITY: O(log n) - Only for recursion stack
*/

function insertionSort(arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

function inPlaceMerge(arr, left, mid, right) {
    // If the direct merge is already sorted
    if (arr[mid] <= arr[mid + 1]) {
        return;
    }
    
    let start = left;
    let start2 = mid + 1;
    
    // If the first element of second half is smaller than first element of first half
    while (start <= mid && start2 <= right) {
        if (arr[start] <= arr[start2]) {
            start++;
        } else {
            let value = arr[start2];
            let index = start2;
            
            // Shift all elements between start and start2, right by 1.
            while (index !== start) {
                arr[index] = arr[index - 1];
                index--;
            }
            arr[start] = value;
            
            // Update all indices
            start++;
            mid++;
            start2++;
        }
    }
}

function mergeSort(arr, left, right) {
    if (left < right) {
        // Use insertion sort for small subarrays (optimization)
        if (right - left <= 10) {
            insertionSort(arr, left, right);
            return;
        }
        
        let mid = left + Math.floor((right - left) / 2);
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        inPlaceMerge(arr, left, mid, right);
    }
}

function mergeSortInPlace(arr) {
    if (arr.length <= 1) return arr;
    mergeSort(arr, 0, arr.length - 1);
    return arr;
}

// Test Case for Problem 2
console.log("\n=== PROBLEM 2: In-Place Merge Sort ===");
let testArr4 = [64, 34, 25, 12, 22, 11, 90, 5];
console.log(`Original Array: [${testArr4.join(', ')}]`);
mergeSortInPlace(testArr4);
console.log(`Sorted Array: [${testArr4.join(', ')}]`);

let testArr5 = [5, 2, 8, 1, 9, 3];
console.log(`\nOriginal Array: [${testArr5.join(', ')}]`);
mergeSortInPlace(testArr5);
console.log(`Sorted Array: [${testArr5.join(', ')}]`);

// ===============================================
// PROBLEM 3: Partitioning and Sorting Arrays with Many Repeated Entries
// ===============================================
/*
QUESTION: Sort an array that contains many repeated entries efficiently.
This is also known as the Dutch National Flag problem or 3-way partitioning.

APPROACH: Use 3-way partitioning (Dutch National Flag algorithm).
We maintain three sections: elements less than pivot, equal to pivot, and greater than pivot.
This is very efficient when there are many duplicates.

TIME COMPLEXITY: O(n) - Single pass through the array
SPACE COMPLEXITY: O(1) - Only using constant extra space
*/

function threeWayPartition(arr, pivot) {
    let low = 0;     // Elements less than pivot
    let mid = 0;     // Elements equal to pivot
    let high = arr.length - 1;  // Elements greater than pivot
    
    while (mid <= high) {
        if (arr[mid] < pivot) {
            // Swap arr[low] and arr[mid], increment both
            [arr[low], arr[mid]] = [arr[mid], arr[low]];
            low++;
            mid++;
        } else if (arr[mid] > pivot) {
            // Swap arr[mid] and arr[high], decrement high
            [arr[mid], arr[high]] = [arr[high], arr[mid]];
            high--;
            // Don't increment mid here as we need to check the swapped element
        } else {
            // arr[mid] == pivot, just increment mid
            mid++;
        }
    }
    
    return { low, high }; // Return the boundaries
}

function dutchNationalFlag(arr) {
    // Choose middle element as pivot for better performance with duplicates
    let pivot = arr[Math.floor(arr.length / 2)];
    let result = threeWayPartition(arr, pivot);
    return arr;
}

// Advanced version: Sort array with many duplicates using counting sort approach
function sortWithManyDuplicates(arr) {
    if (arr.length <= 1) return arr;
    
    // Find min and max to determine range
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let range = max - min + 1;
    
    // If range is too large, fall back to regular sorting
    if (range > arr.length * 2) {
        return arr.sort((a, b) => a - b);
    }
    
    // Count occurrences
    let count = new Array(range).fill(0);
    for (let num of arr) {
        count[num - min]++;
    }
    
    // Reconstruct sorted array
    let index = 0;
    for (let i = 0; i < range; i++) {
        while (count[i] > 0) {
            arr[index++] = i + min;
            count[i]--;
        }
    }
    
    return arr;
}

// Test Case for Problem 3
console.log("\n=== PROBLEM 3: Sorting Arrays with Many Repeated Entries ===");

// Test Dutch National Flag (3-way partitioning)
let testArr6 = [2, 0, 2, 1, 1, 0, 2, 0, 1];
console.log(`Original Array: [${testArr6.join(', ')}]`);
let pivot = 1;
console.log(`Partitioning around pivot: ${pivot}`);
threeWayPartition([...testArr6], pivot);
console.log(`After 3-way partition: [${testArr6.join(', ')}]`);

// Test sorting with many duplicates
let testArr7 = [4, 2, 2, 8, 3, 3, 1, 4, 4, 2, 1, 1];
console.log(`\nOriginal Array with duplicates: [${testArr7.join(', ')}]`);
sortWithManyDuplicates(testArr7);
console.log(`Sorted Array: [${testArr7.join(', ')}]`);

// Test with extreme duplicates
let testArr8 = [5, 5, 5, 5, 3, 3, 7, 7, 7, 1, 1];
console.log(`\nOriginal Array: [${testArr8.join(', ')}]`);
sortWithManyDuplicates(testArr8);
console.log(`Sorted Array: [${testArr8.join(', ')}]`);

// ===============================================
// SUMMARY OF COMPLEXITIES
// ===============================================
console.log("\n=== COMPLEXITY SUMMARY ===");
console.log("1. Inversion Count: Time O(n log n), Space O(n)");
console.log("2. In-Place Merge Sort: Time O(n log n), Space O(log n)");
console.log("3. Dutch National Flag: Time O(n), Space O(1)");
console.log("4. Counting Sort (many duplicates): Time O(n + k), Space O(k) where k is range");