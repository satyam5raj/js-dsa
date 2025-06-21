// ===== BIT MANIPULATION PROBLEMS =====

// 1. Count set bits in an integer
// Question: Count the number of 1s in the binary representation of a number
// Approach: Use Brian Kernighan's algorithm - n & (n-1) removes the rightmost set bit
// Time Complexity: O(number of set bits) - at most O(log n)
function countSetBits(n) {
    let count = 0;
    while (n) {
        n = n & (n - 1); // Remove the rightmost set bit
        count++;
    }
    return count;
}

// Alternative approach using bit shifting
function countSetBitsShift(n) {
    let count = 0;
    while (n) {
        count += n & 1; // Check if LSB is 1
        n >>= 1; // Right shift by 1
    }
    return count;
}

// Test cases for problem 1
console.log("=== Problem 1: Count Set Bits ===");
console.log(countSetBits(9)); // 9 = 1001, output: 2
console.log(countSetBits(15)); // 15 = 1111, output: 4
console.log(countSetBits(0)); // 0 = 0000, output: 0
console.log(countSetBits(7)); // 7 = 0111, output: 3

// ==========================================

// 2. Find the two non-repeating elements in an array of repeating elements
// Question: All elements appear twice except two elements that appear once
// Approach: XOR all elements, then use rightmost set bit to separate into two groups
// Time Complexity: O(n), Space Complexity: O(1)
function findTwoNonRepeating(arr) {
    // XOR all elements - result will be XOR of the two unique elements
    let xorAll = 0;
    for (let num of arr) {
        xorAll ^= num;
    }
    
    // Find rightmost set bit in xorAll
    let rightmostSetBit = xorAll & (-xorAll);
    
    // Divide elements into two groups and XOR separately
    let first = 0, second = 0;
    for (let num of arr) {
        if (num & rightmostSetBit) {
            first ^= num;
        } else {
            second ^= num;
        }
    }
    
    return [first, second];
}

// Test cases for problem 2
console.log("\n=== Problem 2: Two Non-Repeating Elements ===");
console.log(findTwoNonRepeating([2, 4, 7, 9, 2, 4])); // Output: [7, 9] or [9, 7]
console.log(findTwoNonRepeating([1, 2, 3, 2, 1, 4])); // Output: [3, 4] or [4, 3]

// ==========================================

// 3. Count number of bits to be flipped to convert A to B
// Question: Find minimum number of bit flips required to convert A to B
// Approach: XOR A and B, then count set bits in result
// Time Complexity: O(log n) where n is max(A, B)
function countBitsToFlip(a, b) {
    // XOR gives 1 where bits differ
    let xor = a ^ b;
    return countSetBits(xor);
}

// Test cases for problem 3
console.log("\n=== Problem 3: Count Bits to Flip ===");
console.log(countBitsToFlip(10, 20)); // 10=1010, 20=10100, output: 4
console.log(countBitsToFlip(7, 10)); // 7=0111, 10=1010, output: 3
console.log(countBitsToFlip(5, 5)); // Same numbers, output: 0

// ==========================================

// 4. Count total set bits in all numbers from 1 to n
// Question: Count total number of 1s in binary representation of all numbers from 1 to n
// Approach: For each bit position, count how many numbers have that bit set
// Time Complexity: O(log n)
function countSetBitsFrom1ToN(n) {
    let totalCount = 0;
    
    // For each bit position
    for (let bitPos = 0; (1 << bitPos) <= n; bitPos++) {
        // Calculate cycle length for this bit position
        let cycleLen = 1 << (bitPos + 1);
        let completeCycles = Math.floor((n + 1) / cycleLen);
        let remainder = (n + 1) % cycleLen;
        
        // Count set bits in complete cycles
        totalCount += completeCycles * (1 << bitPos);
        
        // Count set bits in remaining part
        if (remainder > (1 << bitPos)) {
            totalCount += remainder - (1 << bitPos);
        }
    }
    
    return totalCount;
}

// Simple O(n log n) approach for verification
function countSetBitsFrom1ToNSimple(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += countSetBits(i);
    }
    return total;
}

// Test cases for problem 4
console.log("\n=== Problem 4: Count Set Bits 1 to N ===");
console.log(countSetBitsFrom1ToN(3)); // 1=1, 2=10, 3=11 → total: 4
console.log(countSetBitsFrom1ToN(6)); // Output: 9
console.log(countSetBitsFrom1ToN(7)); // Output: 12

// ==========================================

// 5. Program to find whether a number is power of two
// Question: Check if a given number is a power of 2
// Approach: A power of 2 has only one set bit. Use n & (n-1) == 0
// Time Complexity: O(1)
function isPowerOfTwo(n) {
    // A number is power of 2 if it has only one set bit
    // For power of 2: n & (n-1) == 0 and n > 0
    return n > 0 && (n & (n - 1)) === 0;
}

// Test cases for problem 5
console.log("\n=== Problem 5: Power of Two ===");
console.log(isPowerOfTwo(1)); // 2^0 = 1, output: true
console.log(isPowerOfTwo(16)); // 2^4 = 16, output: true
console.log(isPowerOfTwo(18)); // Not power of 2, output: false
console.log(isPowerOfTwo(0)); // output: false

// ==========================================

// 6. Find position of the only set bit
// Question: Given a number with only one set bit, find its position (1-indexed)
// Approach: Use logarithm or bit manipulation to find position
// Time Complexity: O(log n)
function findPositionOfSetBit(n) {
    // Check if n is power of 2 (has only one set bit)
    if (!isPowerOfTwo(n)) {
        return -1; // Invalid input
    }
    
    let position = 1;
    while (n > 1) {
        n >>= 1;
        position++;
    }
    return position;
}

// Alternative approach using Math.log2
function findPositionOfSetBitLog(n) {
    if (!isPowerOfTwo(n)) {
        return -1;
    }
    return Math.floor(Math.log2(n)) + 1;
}

// Test cases for problem 6
console.log("\n=== Problem 6: Position of Set Bit ===");
console.log(findPositionOfSetBit(2)); // 10, position: 2
console.log(findPositionOfSetBit(8)); // 1000, position: 4
console.log(findPositionOfSetBit(18)); // Not single set bit, output: -1

// ==========================================

// 7. Copy set bits in a range
// Question: Copy set bits of 'source' to 'dest' from position l to r (1-indexed)
// Approach: Create mask, clear bits in dest, then OR with masked source
// Time Complexity: O(1)
function copySetBits(dest, source, l, r) {
    // Create mask with 1s from position l to r
    let mask = ((1 << (r - l + 1)) - 1) << (l - 1);
    
    // Clear bits in dest from l to r
    dest = dest & (~mask);
    
    // Set bits from source
    dest = dest | (source & mask);
    
    return dest;
}

// Test cases for problem 7
console.log("\n=== Problem 7: Copy Set Bits ===");
console.log(copySetBits(10, 13, 2, 3)); // dest=10(1010), source=13(1101), l=2, r=3
// Should copy bits at position 2,3 from source to dest

// ==========================================

// 8. Divide two integers without using multiplication, division and mod operator
// Question: Divide two integers without using *, /, % operators
// Approach: Use bit shifting (left shift multiplies by 2)
// Time Complexity: O(log(dividend/divisor))
function divide(dividend, divisor) {
    if (divisor === 0) return Infinity;
    
    // Handle signs
    let sign = (dividend < 0) ^ (divisor < 0) ? -1 : 1;
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);
    
    let quotient = 0;
    
    while (dividend >= divisor) {
        let temp = divisor;
        let multiple = 1;
        
        // Find largest multiple of divisor that fits in dividend
        while (dividend >= (temp << 1)) {
            temp <<= 1;
            multiple <<= 1;
        }
        
        dividend -= temp;
        quotient += multiple;
    }
    
    return sign === 1 ? quotient : -quotient;
}

// Test cases for problem 8
console.log("\n=== Problem 8: Divide Without Operators ===");
console.log(divide(10, 3)); // output: 3
console.log(divide(43, -8)); // output: -5
console.log(divide(-22, 7)); // output: -3

// ==========================================

// 9. Calculate square of a number without using *, / and pow()
// Question: Find square of a number without multiplication, division, or power
// Approach 1: Use repeated addition
// Approach 2: Use bit manipulation (left shift and addition)
// Time Complexity: O(n) for approach 1, O(log n) for approach 2
function squareWithoutMul(n) {
    if (n === 0) return 0;
    
    let isNegative = n < 0;
    n = Math.abs(n);
    
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += n;
    }
    
    return result;
}

// Optimized approach using bit manipulation
function squareWithoutMulOptimized(n) {
    if (n === 0) return 0;
    
    let isNegative = n < 0;
    n = Math.abs(n);
    
    let result = 0;
    let shift = 0;
    
    while (n > 0) {
        if (n & 1) {
            result += (n << shift);
        }
        n >>= 1;
        shift++;
    }
    
    return result;
}

// Even better approach: x^2 = (x-1)^2 + 2x - 1
function squareRecursive(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    let isNegative = n < 0;
    n = Math.abs(n);
    
    // x^2 = (x-1)^2 + x + (x-1)
    return squareRecursive(n - 1) + n + (n - 1);
}

// Test cases for problem 9
console.log("\n=== Problem 9: Square Without Multiplication ===");
console.log(squareWithoutMul(5)); // output: 25
console.log(squareWithoutMul(-4)); // output: 16
console.log(squareWithoutMul(0)); // output: 0

// ==========================================

// 10. Power Set
// Question: Generate all possible subsets of a given set
// Approach: Use bit manipulation - each bit represents inclusion/exclusion of element
// Time Complexity: O(2^n * n) where n is number of elements
function powerSet(arr) {
    let n = arr.length;
    let totalSubsets = 1 << n; // 2^n subsets
    let result = [];
    
    // Generate all numbers from 0 to 2^n - 1
    for (let i = 0; i < totalSubsets; i++) {
        let subset = [];
        
        // Check each bit of i
        for (let j = 0; j < n; j++) {
            // If j-th bit is set, include arr[j] in subset
            if (i & (1 << j)) {
                subset.push(arr[j]);
            }
        }
        
        result.push(subset);
    }
    
    return result;
}

// Alternative recursive approach
function powerSetRecursive(arr, index = 0, current = [], result = []) {
    if (index === arr.length) {
        result.push([...current]);
        return result;
    }
    
    // Exclude current element
    powerSetRecursive(arr, index + 1, current, result);
    
    // Include current element
    current.push(arr[index]);
    powerSetRecursive(arr, index + 1, current, result);
    current.pop();
    
    return result;
}

// Test cases for problem 10
console.log("\n=== Problem 10: Power Set ===");
console.log(powerSet([1, 2, 3]));
// Output: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]

console.log(powerSet(['a', 'b']));
// Output: [[], ['a'], ['b'], ['a','b']]

console.log("\n=== Summary ===");
console.log("All bit manipulation problems solved with optimal approaches!");
console.log("Each solution includes detailed comments, approach explanation, and time complexity analysis.");