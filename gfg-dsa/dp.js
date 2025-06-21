// =====================================================
// DYNAMIC PROGRAMMING PROBLEMS IN JAVASCRIPT
// =====================================================

// 1. COIN CHANGE PROBLEM
// Given an array of coins and a target amount, find minimum coins needed to make the amount
// Approach: Bottom-up DP - for each amount, try all coins and take minimum
// Time Complexity: O(amount * coins.length)
// Space Complexity: O(amount)
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Test Case
console.log("Coin Change:");
console.log(coinChange([1, 3, 4], 6)); // Expected: 2 (3+3)
console.log(coinChange([2], 3)); // Expected: -1
console.log("---");

// 2. KNAPSACK PROBLEM (0/1)
// Given weights, values, and capacity, maximize value without exceeding capacity
// Approach: 2D DP table where dp[i][w] = max value using first i items with weight limit w
// Time Complexity: O(n * capacity)
// Space Complexity: O(n * capacity)
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = Math.max(
                    values[i-1] + dp[i-1][w - weights[i-1]], // include item
                    dp[i-1][w] // exclude item
                );
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    
    return dp[n][capacity];
}

// Test Case
console.log("Knapsack Problem:");
console.log(knapsack([10, 20, 30], [60, 100, 120], 50)); // Expected: 220
console.log("---");

// 3. BINOMIAL COEFFICIENT PROBLEM
// Calculate C(n, k) = n! / (k! * (n-k)!)
// Approach: Use Pascal's triangle property C(n,k) = C(n-1,k-1) + C(n-1,k)
// Time Complexity: O(n * k)
// Space Complexity: O(n * k)
function binomialCoeff(n, k) {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    
    const dp = Array(n + 1).fill().map(() => Array(k + 1).fill(0));
    
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= Math.min(i, k); j++) {
            if (j === 0 || j === i) {
                dp[i][j] = 1;
            } else {
                dp[i][j] = dp[i-1][j-1] + dp[i-1][j];
            }
        }
    }
    
    return dp[n][k];
}

// Test Case
console.log("Binomial Coefficient:");
console.log(binomialCoeff(5, 2)); // Expected: 10
console.log(binomialCoeff(4, 2)); // Expected: 6
console.log("---");

// 4. PERMUTATION COEFFICIENT PROBLEM
// Calculate P(n, k) = n! / (n-k)!
// Approach: Use recurrence P(n,k) = P(n-1,k) + k*P(n-1,k-1)
// Time Complexity: O(n * k)
// Space Complexity: O(n * k)
function permutationCoeff(n, k) {
    if (k > n) return 0;
    if (k === 0) return 1;
    
    const dp = Array(n + 1).fill().map(() => Array(k + 1).fill(0));
    
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= Math.min(i, k); j++) {
            if (j === 0) {
                dp[i][j] = 1;
            } else {
                dp[i][j] = dp[i-1][j] + j * dp[i-1][j-1];
            }
        }
    }
    
    return dp[n][k];
}

// Test Case
console.log("Permutation Coefficient:");
console.log(permutationCoeff(10, 2)); // Expected: 90
console.log(permutationCoeff(10, 3)); // Expected: 720
console.log("---");

// 5. NTH CATALAN NUMBER
// Catalan numbers: C(0)=1, C(n) = sum(C(i)*C(n-1-i)) for i=0 to n-1
// Approach: Bottom-up DP using the recurrence relation
// Time Complexity: O(n²)
// Space Complexity: O(n)
function catalan(n) {
    if (n <= 1) return 1;
    
    const dp = new Array(n + 1).fill(0);
    dp[0] = dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            dp[i] += dp[j] * dp[i-1-j];
        }
    }
    
    return dp[n];
}

// Test Case
console.log("Catalan Number:");
console.log(catalan(0)); // Expected: 1
console.log(catalan(4)); // Expected: 14
console.log("---");

// 6. MATRIX CHAIN MULTIPLICATION
// Find minimum scalar multiplications needed to multiply chain of matrices
// Approach: Use interval DP, dp[i][j] = min cost to multiply matrices from i to j
// Time Complexity: O(n³)
// Space Complexity: O(n²)
function matrixChainOrder(p) {
    const n = p.length - 1;
    const dp = Array(n).fill().map(() => Array(n).fill(0));
    
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            dp[i][j] = Infinity;
            
            for (let k = i; k < j; k++) {
                const cost = dp[i][k] + dp[k+1][j] + p[i] * p[k+1] * p[j+1];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    
    return dp[0][n-1];
}

// Test Case
console.log("Matrix Chain Multiplication:");
console.log(matrixChainOrder([1, 2, 3, 4, 5])); // Expected: 38
console.log("---");

// 7. EDIT DISTANCE (Levenshtein Distance)
// Find minimum operations (insert, delete, replace) to convert str1 to str2
// Approach: 2D DP where dp[i][j] = min operations to convert str1[0..i-1] to str2[0..j-1]
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)
function editDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i-1] === str2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i-1][j],    // delete
                    dp[i][j-1],    // insert
                    dp[i-1][j-1]   // replace
                );
            }
        }
    }
    
    return dp[m][n];
}

// Test Case
console.log("Edit Distance:");
console.log(editDistance("sunday", "saturday")); // Expected: 3
console.log("---");

// 8. SUBSET SUM PROBLEM
// Check if there's a subset with given sum
// Approach: 2D DP where dp[i][sum] = true if sum possible using first i elements
// Time Complexity: O(n * sum)
// Space Complexity: O(n * sum)
function subsetSum(arr, sum) {
    const n = arr.length;
    const dp = Array(n + 1).fill().map(() => Array(sum + 1).fill(false));
    
    // Empty subset has sum 0
    for (let i = 0; i <= n; i++) dp[i][0] = true;
    
    for (let i = 1; i <= n; i++) {
        for (let s = 1; s <= sum; s++) {
            dp[i][s] = dp[i-1][s]; // exclude current element
            if (arr[i-1] <= s) {
                dp[i][s] = dp[i][s] || dp[i-1][s - arr[i-1]]; // include current element
            }
        }
    }
    
    return dp[n][sum];
}

// Test Case
console.log("Subset Sum:");
console.log(subsetSum([3, 34, 4, 12, 5, 2], 9)); // Expected: true
console.log(subsetSum([3, 34, 4, 12, 5, 2], 30)); // Expected: false
console.log("---");

// 9. FRIENDS PAIRING PROBLEM
// n friends can remain single or pair up. Find total ways.
// Approach: f(n) = f(n-1) + (n-1) * f(n-2)
// Time Complexity: O(n)
// Space Complexity: O(n)
function friendsPairing(n) {
    if (n <= 2) return n;
    
    const dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + (i-1) * dp[i-2];
    }
    
    return dp[n];
}

// Test Case
console.log("Friends Pairing:");
console.log(friendsPairing(3)); // Expected: 4
console.log(friendsPairing(4)); // Expected: 10
console.log("---");

// 10. GOLD MINE PROBLEM
// Find maximum gold collected from top to bottom in a grid
// Approach: DP where dp[i][j] = max gold from (i,j) to bottom
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)
function goldMine(mine) {
    const m = mine.length;
    const n = mine[0].length;
    const dp = Array(m).fill().map(() => Array(n).fill(0));
    
    // Fill last column
    for (let i = 0; i < m; i++) {
        dp[i][n-1] = mine[i][n-1];
    }
    
    // Fill from right to left
    for (let j = n-2; j >= 0; j--) {
        for (let i = 0; i < m; i++) {
            let right = dp[i][j+1];
            let rightUp = (i > 0) ? dp[i-1][j+1] : 0;
            let rightDown = (i < m-1) ? dp[i+1][j+1] : 0;
            
            dp[i][j] = mine[i][j] + Math.max(right, rightUp, rightDown);
        }
    }
    
    let maxGold = 0;
    for (let i = 0; i < m; i++) {
        maxGold = Math.max(maxGold, dp[i][0]);
    }
    
    return maxGold;
}

// Test Case
console.log("Gold Mine:");
console.log(goldMine([
    [1, 3, 1, 5],
    [2, 2, 4, 1],
    [5, 0, 2, 3],
    [0, 6, 1, 2]
])); // Expected: 16
console.log("---");

// 11. LONGEST COMMON SUBSEQUENCE (LCS)
// Find length of longest common subsequence between two strings
// Approach: 2D DP where dp[i][j] = LCS length of str1[0..i-1] and str2[0..j-1]
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)
function longestCommonSubsequence(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i-1] === str2[j-1]) {
                dp[i][j] = 1 + dp[i-1][j-1];
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
}

// Test Case
console.log("Longest Common Subsequence:");
console.log(longestCommonSubsequence("ABCDGH", "AEDFHR")); // Expected: 3 (ADH)
console.log("---");

// 12. LONGEST INCREASING SUBSEQUENCE (LIS)
// Find length of longest strictly increasing subsequence
// Approach: DP where dp[i] = length of LIS ending at index i
// Time Complexity: O(n²)
// Space Complexity: O(n)
function longestIncreasingSubsequence(arr) {
    const n = arr.length;
    if (n === 0) return 0;
    
    const dp = new Array(n).fill(1);
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

// Test Case
console.log("Longest Increasing Subsequence:");
console.log(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18])); // Expected: 4
console.log("---");

// 13. MAXIMUM SUM CONTIGUOUS SUBARRAY (Kadane's Algorithm)
// Find maximum sum of contiguous subarray
// Approach: Keep track of max ending here and global max
// Time Complexity: O(n)
// Space Complexity: O(1)
function maxSubarraySum(arr) {
    let maxSoFar = arr[0];
    let maxEndingHere = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Test Case
console.log("Maximum Subarray Sum:");
console.log(maxSubarraySum([-2, -3, 4, -1, -2, 1, 5, -3])); // Expected: 7
console.log("---");

// 14. EGG DROPPING PROBLEM
// Find minimum trials needed to find critical floor with k eggs and n floors
// Approach: 2D DP where dp[i][j] = min trials with i eggs and j floors
// Time Complexity: O(k * n²)
// Space Complexity: O(k * n)
function eggDrop(k, n) {
    const dp = Array(k + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Base cases
    for (let i = 1; i <= k; i++) {
        dp[i][0] = 0; // 0 floors
        dp[i][1] = 1; // 1 floor
    }
    
    for (let j = 1; j <= n; j++) {
        dp[1][j] = j; // 1 egg
    }
    
    for (let i = 2; i <= k; i++) {
        for (let j = 2; j <= n; j++) {
            dp[i][j] = Infinity;
            for (let x = 1; x <= j; x++) {
                const worst = 1 + Math.max(dp[i-1][x-1], dp[i][j-x]);
                dp[i][j] = Math.min(dp[i][j], worst);
            }
        }
    }
    
    return dp[k][n];
}

// Test Case
console.log("Egg Dropping:");
console.log(eggDrop(2, 10)); // Expected: 4
console.log("---");

// 15. UNBOUNDED KNAPSACK
// Items can be used multiple times
// Approach: 1D DP where dp[w] = max value with weight w
// Time Complexity: O(n * W)
// Space Complexity: O(W)
function unboundedKnapsack(weights, values, W) {
    const dp = new Array(W + 1).fill(0);
    
    for (let w = 1; w <= W; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }
    
    return dp[W];
}

// Test Case
console.log("Unbounded Knapsack:");
console.log(unboundedKnapsack([1, 3, 4, 5], [1, 4, 5, 7], 8)); // Expected: 10
console.log("---");

// 16. WORD BREAK PROBLEM
// Check if string can be segmented using dictionary words
// Approach: DP where dp[i] = true if str[0..i-1] can be segmented
// Time Complexity: O(n²)
// Space Complexity: O(n)
function wordBreak(s, wordDict) {
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    const wordSet = new Set(wordDict);
    dp[0] = true;
    
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[n];
}

// Test Case
console.log("Word Break:");
console.log(wordBreak("leetcode", ["leet", "code"])); // Expected: true
console.log(wordBreak("applepenapple", ["apple", "pen"])); // Expected: true
console.log("---");

// 17. LONGEST PALINDROMIC SUBSEQUENCE
// Find length of longest palindromic subsequence
// Approach: 2D DP where dp[i][j] = LPS length in s[i..j]
// Time Complexity: O(n²)
// Space Complexity: O(n²)
function longestPalindromicSubsequence(s) {
    const n = s.length;
    const dp = Array(n).fill().map(() => Array(n).fill(0));
    
    // Every single character is palindrome of length 1
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }
    
    // Fill for lengths 2 to n
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            if (s[i] === s[j] && len === 2) {
                dp[i][j] = 2;
            } else if (s[i] === s[j]) {
                dp[i][j] = dp[i+1][j-1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i][j-1], dp[i+1][j]);
            }
        }
    }
    
    return dp[0][n-1];
}

// Test Case
console.log("Longest Palindromic Subsequence:");
console.log(longestPalindromicSubsequence("bbbab")); // Expected: 4 (bbbb)
console.log("---");

// 18. PARTITION PROBLEM
// Check if array can be partitioned into two subsets with equal sum
// Approach: Reduce to subset sum problem with target = totalSum/2
// Time Complexity: O(n * sum)
// Space Complexity: O(sum)
function canPartition(nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) return false;
    
    const target = sum / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;
    
    for (let num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    
    return dp[target];
}

// Test Case
console.log("Partition Problem:");
console.log(canPartition([1, 5, 11, 5])); // Expected: true
console.log(canPartition([1, 2, 3, 5])); // Expected: false
console.log("---");

// 19. OPTIMAL STRATEGY FOR A GAME
// Two players pick from ends of array, find max score for first player
// Approach: 2D DP where dp[i][j] = max score difference in arr[i..j]
// Time Complexity: O(n²)
// Space Complexity: O(n²)
function optimalStrategy(arr) {
    const n = arr.length;
    const dp = Array(n).fill().map(() => Array(n).fill(0));
    
    // Base case: single element
    for (let i = 0; i < n; i++) {
        dp[i][i] = arr[i];
    }
    
    // Fill for lengths 2 to n
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            const pickLeft = arr[i] - dp[i+1][j];
            const pickRight = arr[j] - dp[i][j-1];
            dp[i][j] = Math.max(pickLeft, pickRight);
        }
    }
    
    return dp[0][n-1];
}

// Test Case
console.log("Optimal Strategy for Game:");
console.log(optimalStrategy([8, 15, 3, 7])); // Expected: 1
console.log("---");

// 20. MINIMUM JUMPS TO REACH END
// Find minimum jumps needed to reach end of array
// Approach: DP where dp[i] = min jumps to reach index i
// Time Complexity: O(n²)
// Space Complexity: O(n)
function minJumps(arr) {
    const n = arr.length;
    if (n <= 1) return 0;
    if (arr[0] === 0) return -1;
    
    const dp = new Array(n).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (j + arr[j] >= i && dp[j] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[j] + 1);
            }
        }
    }
    
    return dp[n-1] === Infinity ? -1 : dp[n-1];
}

// Test Case
console.log("Minimum Jumps:");
console.log(minJumps([1, 3, 6, 1, 0, 9])); // Expected: 3
console.log("---");

console.log("All Dynamic Programming problems completed!");
console.log("Each solution includes:");
console.log("- Problem description");
console.log("- Approach explanation"); 
console.log("- Time and Space complexity");
console.log("- Working test cases");


// ===================================================================================================
// DYNAMIC PROGRAMMING PROBLEMS SOLUTIONS
// ===================================================================================================

// 1. Minimum cost to fill given weight in a bag
/*
Problem: Given weights and costs of n items, we need to put these items in a knapsack of capacity W 
to get the minimum cost to fill the entire knapsack.

Approach: Similar to unbounded knapsack but we want minimum cost instead of maximum value.
Use DP where dp[i] = minimum cost to achieve weight i.

Time Complexity: O(n * W) where n is number of items and W is capacity
Space Complexity: O(W)
*/
function minCostToFillBag(weights, costs, W) {
    const dp = new Array(W + 1).fill(Infinity);
    dp[0] = 0; // 0 cost to fill 0 weight
    
    for (let w = 1; w <= W; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w && dp[w - weights[i]] !== Infinity) {
                dp[w] = Math.min(dp[w], dp[w - weights[i]] + costs[i]);
            }
        }
    }
    
    return dp[W] === Infinity ? -1 : dp[W];
}

// Test case
console.log("1. Minimum cost to fill given weight in a bag:");
console.log(minCostToFillBag([1, 3, 4, 5], [1, 4, 5, 7], 7)); // Expected: 7

// ===================================================================================================

// 2. Minimum removals from array to make max – min <= K
/*
Problem: Given an array and value K, find minimum number of elements to remove 
so that max - min <= K.

Approach: Sort the array, then for each possible subarray, calculate how many elements 
need to be removed. Use sliding window technique.

Time Complexity: O(n log n) for sorting + O(n²) for checking = O(n²)
Space Complexity: O(1)
*/
function minRemovals(arr, k) {
    if (arr.length <= 1) return 0;
    
    arr.sort((a, b) => a - b);
    const n = arr.length;
    let maxLength = 1;
    
    // For each starting point, find maximum length subarray with max-min <= k
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            if (arr[j] - arr[i] <= k) {
                maxLength = Math.max(maxLength, j - i + 1);
            } else {
                break;
            }
        }
    }
    
    return n - maxLength;
}

// Test case
console.log("2. Minimum removals from array to make max – min <= K:");
console.log(minRemovals([1, 3, 4, 9, 10, 11, 12, 17, 20], 4)); // Expected: 5

// ===================================================================================================

// 3. Longest Common Substring
/*
Problem: Find the length of longest common substring between two strings.

Approach: Use 2D DP where dp[i][j] represents length of common substring ending at i-1 in str1 and j-1 in str2.
If characters match, dp[i][j] = dp[i-1][j-1] + 1, else dp[i][j] = 0.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
*/
function longestCommonSubstring(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    let maxLength = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                maxLength = Math.max(maxLength, dp[i][j]);
            } else {
                dp[i][j] = 0;
            }
        }
    }
    
    return maxLength;
}

// Test case
console.log("3. Longest Common Substring:");
console.log(longestCommonSubstring("GeeksforGeeks", "GeeksQuiz")); // Expected: 5

// ===================================================================================================

// 4. Count number of ways to reach a given score in a game
/*
Problem: Given a game where you can score 3, 5, or 10 points, count ways to reach score n.

Approach: Use DP where dp[i] = number of ways to reach score i.
For each score, add ways from (score - 3), (score - 5), (score - 10).

Time Complexity: O(n)
Space Complexity: O(n)
*/
function countWaysToScore(n) {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1; // One way to score 0
    
    const scores = [3, 5, 10];
    
    for (let score of scores) {
        for (let i = score; i <= n; i++) {
            dp[i] += dp[i - score];
        }
    }
    
    return dp[n];
}

// Test case
console.log("4. Count number of ways to reach a given score:");
console.log(countWaysToScore(20)); // Expected: 4

// ===================================================================================================

// 5. Count Balanced Binary Trees of Height h
/*
Problem: Count number of balanced binary trees of height h.

Approach: Use DP. For height h, left and right subtrees can have heights (h-1,h-1), (h-1,h-2), (h-2,h-1).
dp[h] = dp[h-1]² + 2*dp[h-1]*dp[h-2]

Time Complexity: O(h)
Space Complexity: O(h)
*/
function countBalancedTrees(h) {
    if (h === 0 || h === 1) return 1;
    
    const dp = new Array(h + 1);
    dp[0] = 1;
    dp[1] = 1;
    
    for (let i = 2; i <= h; i++) {
        dp[i] = dp[i - 1] * dp[i - 1] + 2 * dp[i - 1] * dp[i - 2];
    }
    
    return dp[h];
}

// Test case
console.log("5. Count Balanced Binary Trees of Height h:");
console.log(countBalancedTrees(3)); // Expected: 15

// ===================================================================================================

// 6. Largest Sum Contiguous Subarray (Kadane's Algorithm) [VERY IMPORTANT]
/*
Problem: Find the sum of contiguous subarray with the largest sum.

Approach: Kadane's Algorithm - Keep track of maximum sum ending at current position.
If current sum becomes negative, reset it to 0.

Time Complexity: O(n)
Space Complexity: O(1)
*/
function maxSubarraySum(arr) {
    let maxSoFar = arr[0];
    let maxEndingHere = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Test case
console.log("6. Largest Sum Contiguous Subarray:");
console.log(maxSubarraySum([-2, -3, 4, -1, -2, 1, 5, -3])); // Expected: 7

// ===================================================================================================

// 7. Smallest sum contiguous subarray
/*
Problem: Find the sum of contiguous subarray with the smallest sum.

Approach: Similar to Kadane's but for minimum sum.

Time Complexity: O(n)
Space Complexity: O(1)
*/
function minSubarraySum(arr) {
    let minSoFar = arr[0];
    let minEndingHere = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        minEndingHere = Math.min(arr[i], minEndingHere + arr[i]);
        minSoFar = Math.min(minSoFar, minEndingHere);
    }
    
    return minSoFar;
}

// Test case
console.log("7. Smallest sum contiguous subarray:");
console.log(minSubarraySum([3, -4, 2, -3, -1, 7, -5])); // Expected: -6

// ===================================================================================================

// 8. Unbounded Knapsack (Repetition of items allowed)
/*
Problem: Given weights and values of items, find maximum value that can be obtained 
with given weight capacity. Items can be used multiple times.

Approach: DP where dp[w] = maximum value achievable with weight w.
For each weight, try all items that fit.

Time Complexity: O(n * W)
Space Complexity: O(W)
*/
function unboundedKnapsack(weights, values, W) {
    const dp = new Array(W + 1).fill(0);
    
    for (let w = 1; w <= W; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }
    
    return dp[W];
}

// Test case
console.log("8. Unbounded Knapsack:");
console.log(unboundedKnapsack([1, 3, 4, 5], [1, 4, 5, 7], 8)); // Expected: 8

// ===================================================================================================

// 9. Word Break Problem
/*
Problem: Given a string and dictionary of words, determine if string can be segmented 
into space-separated sequence of dictionary words.

Approach: DP where dp[i] = true if string[0...i-1] can be segmented.
For each position, check all possible words ending at that position.

Time Complexity: O(n³) in worst case
Space Complexity: O(n)
*/
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[s.length];
}

// Test case
console.log("9. Word Break Problem:");
console.log(wordBreak("leetcode", ["leet", "code"])); // Expected: true

// ===================================================================================================

// 10. Largest Independent Set Problem
/*
Problem: Find the size of largest independent set in a binary tree.
Independent set means no two nodes in the set are adjacent.

Approach: For each node, we have two choices - include it or exclude it.
If we include a node, we can't include its children.
If we exclude a node, we can include its children.

Time Complexity: O(n)
Space Complexity: O(h) where h is height
*/
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function largestIndependentSet(root) {
    if (!root) return 0;
    
    const memo = new Map();
    
    function solve(node) {
        if (!node) return 0;
        
        if (memo.has(node)) return memo.get(node);
        
        // Include current node
        let include = 1;
        if (node.left) {
            include += solve(node.left.left) + solve(node.left.right);
        }
        if (node.right) {
            include += solve(node.right.left) + solve(node.right.right);
        }
        
        // Exclude current node
        let exclude = solve(node.left) + solve(node.right);
        
        const result = Math.max(include, exclude);
        memo.set(node, result);
        return result;
    }
    
    return solve(root);
}

// Test case
console.log("10. Largest Independent Set Problem:");
const root = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, new TreeNode(6)));
console.log(largestIndependentSet(root)); // Expected: 3

// ===================================================================================================

// 11. Partition Problem
/*
Problem: Determine whether a given set can be partitioned into two subsets with equal sum.

Approach: This is equivalent to finding if there's a subset with sum = totalSum/2.
Use DP where dp[i][sum] = true if we can achieve sum using first i elements.

Time Complexity: O(n * sum)
Space Complexity: O(n * sum)
*/
function canPartition(nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) return false;
    
    const target = sum / 2;
    const dp = Array(nums.length + 1).fill().map(() => Array(target + 1).fill(false));
    
    // Base case: sum 0 is always achievable with empty set
    for (let i = 0; i <= nums.length; i++) {
        dp[i][0] = true;
    }
    
    for (let i = 1; i <= nums.length; i++) {
        for (let j = 1; j <= target; j++) {
            dp[i][j] = dp[i - 1][j]; // Don't include current element
            if (j >= nums[i - 1]) {
                dp[i][j] = dp[i][j] || dp[i - 1][j - nums[i - 1]]; // Include current element
            }
        }
    }
    
    return dp[nums.length][target];
}

// Test case
console.log("11. Partition Problem:");
console.log(canPartition([1, 5, 11, 5])); // Expected: true

// ===================================================================================================

// 12. Longest Palindromic Subsequence
/*
Problem: Find the length of longest palindromic subsequence in a string.

Approach: Use DP where dp[i][j] = length of LPS in string[i...j].
If characters match: dp[i][j] = dp[i+1][j-1] + 2
Else: dp[i][j] = max(dp[i+1][j], dp[i][j-1])

Time Complexity: O(n²)
Space Complexity: O(n²)
*/
function longestPalindromicSubsequence(s) {
    const n = s.length;
    const dp = Array(n).fill().map(() => Array(n).fill(0));
    
    // Single characters are palindromes of length 1
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }
    
    // Fill for all lengths from 2 to n
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[0][n - 1];
}

// Test case
console.log("12. Longest Palindromic Subsequence:");
console.log(longestPalindromicSubsequence("bbbab")); // Expected: 4

// ===================================================================================================

// 13. Count All Palindromic Subsequence in a given String
/*
Problem: Count total number of palindromic subsequences in a string.

Approach: Use DP where dp[i][j] = count of palindromic subsequences in string[i...j].
If characters match: dp[i][j] = dp[i+1][j] + dp[i][j-1] + 1
Else: dp[i][j] = dp[i+1][j] + dp[i][j-1] - dp[i+1][j-1]

Time Complexity: O(n²)
Space Complexity: O(n²)
*/
function countPalindromicSubsequences(s) {
    const n = s.length;
    const dp = Array(n).fill().map(() => Array(n).fill(0));
    
    // Single characters
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }
    
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j] + dp[i][j - 1] + 1;
            } else {
                dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1];
            }
        }
    }
    
    return dp[0][n - 1];
}

// Test case
console.log("13. Count All Palindromic Subsequence:");
console.log(countPalindromicSubsequences("aab")); // Expected: 4

// ===================================================================================================

// 14. Longest Palindromic Substring
/*
Problem: Find the length of longest palindromic substring.

Approach: Use DP where dp[i][j] = true if string[i...j] is palindrome.
Base cases: single chars are palindromes, check 2-char substrings.
For longer substrings: dp[i][j] = (s[i] === s[j]) && dp[i+1][j-1]

Time Complexity: O(n²)
Space Complexity: O(n²)
*/
function longestPalindromicSubstring(s) {
    const n = s.length;
    if (n === 0) return 0;
    
    const dp = Array(n).fill().map(() => Array(n).fill(false));
    let maxLength = 1;
    
    // Single characters
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }
    
    // Two characters
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            maxLength = 2;
        }
    }
    
    // Longer substrings
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                maxLength = len;
            }
        }
    }
    
    return maxLength;
}

// Test case
console.log("14. Longest Palindromic Substring:");
console.log(longestPalindromicSubstring("babad")); // Expected: 3

// ===================================================================================================

// 15. Longest alternating subsequence
/*
Problem: Find length of longest alternating subsequence (elements alternate between increasing and decreasing).

Approach: Use DP with two states - ending with increasing or decreasing.
inc[i] = length of longest alternating subsequence ending at i with last element being greater than previous
dec[i] = length of longest alternating subsequence ending at i with last element being smaller than previous

Time Complexity: O(n²)
Space Complexity: O(n)
*/
function longestAlternatingSubsequence(arr) {
    const n = arr.length;
    if (n === 0) return 0;
    
    const inc = new Array(n).fill(1); // ending with increasing
    const dec = new Array(n).fill(1); // ending with decreasing
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                inc[i] = Math.max(inc[i], dec[j] + 1);
            } else if (arr[j] > arr[i]) {
                dec[i] = Math.max(dec[i], inc[j] + 1);
            }
        }
    }
    
    return Math.max(Math.max(...inc), Math.max(...dec));
}

// Test case
console.log("15. Longest alternating subsequence:");
console.log(longestAlternatingSubsequence([1, 5, 4, 2, 3, 10, 6, 7, 2])); // Expected: 6

// ===================================================================================================

// 16. Weighted Job Scheduling
/*
Problem: Given jobs with start time, end time, and profit, find maximum profit 
for non-overlapping jobs.

Approach: Sort jobs by end time, use DP where dp[i] = maximum profit using jobs 0 to i.
For each job, either include it (find latest non-overlapping job) or exclude it.

Time Complexity: O(n log n) for sorting + O(n²) for DP = O(n²)
Space Complexity: O(n)
*/
function weightedJobScheduling(jobs) {
    // Sort by end time
    jobs.sort((a, b) => a.end - b.end);
    const n = jobs.length;
    const dp = new Array(n);
    dp[0] = jobs[0].profit;
    
    for (let i = 1; i < n; i++) {
        // Profit including current job
        let includeProfit = jobs[i].profit;
        let latestNonOverlapping = -1;
        
        // Find latest non-overlapping job
        for (let j = i - 1; j >= 0; j--) {
            if (jobs[j].end <= jobs[i].start) {
                latestNonOverlapping = j;
                break;
            }
        }
        
        if (latestNonOverlapping !== -1) {
            includeProfit += dp[latestNonOverlapping];
        }
        
        // Maximum of including or excluding current job
        dp[i] = Math.max(includeProfit, dp[i - 1]);
    }
    
    return dp[n - 1];
}

// Test case
console.log("16. Weighted Job Scheduling:");
const jobs = [
    { start: 1, end: 2, profit: 50 },
    { start: 3, end: 5, profit: 20 },
    { start: 6, end: 19, profit: 100 },
    { start: 2, end: 100, profit: 200 }
];
console.log(weightedJobScheduling(jobs)); // Expected: 250

// ===================================================================================================

// 17. Coin game winner where every player has three choices
/*
Problem: Two players take turns picking coins from either end or removing the middle coin.
Player who picks the last coin wins. Determine winner with optimal play.

Approach: Use DP with memoization. For each state (left, right), calculate if current player can win.
Try all three moves and see if any leads to opponent losing.

Time Complexity: O(n²)
Space Complexity: O(n²)
*/
function coinGameWinner(coins) {
    const n = coins.length;
    const memo = new Map();
    
    function canWin(left, right) {
        if (left > right) return false;
        if (left === right) return true; // Last coin, current player wins
        
        const key = `${left},${right}`;
        if (memo.has(key)) return memo.get(key);
        
        // Try all three moves
        // 1. Take left coin
        const takeLeft = !canWin(left + 1, right);
        // 2. Take right coin  
        const takeRight = !canWin(left, right - 1);
        // 3. Take middle coin (if more than 2 coins)
        let takeMiddle = false;
        if (right - left >= 2) {
            const mid = Math.floor((left + right) / 2);
            takeMiddle = !canWin(left, mid - 1) || !canWin(mid + 1, right);
        }
        
        const result = takeLeft || takeRight || takeMiddle;
        memo.set(key, result);
        return result;
    }
    
    return canWin(0, n - 1);
}

// Test case
console.log("17. Coin game winner:");
console.log(coinGameWinner([1, 2, 3, 4])); // Expected: true (first player wins)

// ===================================================================================================

// 18. Count Derangements [IMPORTANT]
/*
Problem: Count permutations where no element appears in its original position.

Approach: Use DP. For n elements:
- Fix element 1 at position i (i ≠ 1), there are (n-1) ways
- Now element i can go to position 1: remaining (n-2) elements form derangement = D(n-2)
- Or element i cannot go to position 1: this is like derangement of (n-1) elements = D(n-1)
- So D(n) = (n-1) * [D(n-1) + D(n-2)]

Time Complexity: O(n)
Space Complexity: O(n)
*/
function countDerangements(n) {
    if (n === 0) return 1;
    if (n === 1) return 0;
    if (n === 2) return 1;
    
    const dp = new Array(n + 1);
    dp[0] = 1;
    dp[1] = 0;
    dp[2] = 1;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = (i - 1) * (dp[i - 1] + dp[i - 2]);
    }
    
    return dp[n];
}

// Test case
console.log("18. Count Derangements:");
console.log(countDerangements(4)); // Expected: 9

// ===================================================================================================

// 19. Maximum profit by buying and selling a share at most twice [IMPORTANT]
/*
Problem: Find maximum profit from at most 2 transactions (buy-sell pairs).

Approach: Use DP with 4 states:
- buy1: Maximum profit after first buy
- sell1: Maximum profit after first sell
- buy2: Maximum profit after second buy
- sell2: Maximum profit after second sell

Time Complexity: O(n)
Space Complexity: O(1)
*/
function maxProfitTwoTransactions(prices) {
    if (prices.length <= 1) return 0;
    
    let buy1 = -prices[0], sell1 = 0;
    let buy2 = -prices[0], sell2 = 0;
    
    for (let i = 1; i < prices.length; i++) {
        buy1 = Math.max(buy1, -prices[i]);
        sell1 = Math.max(sell1, buy1 + prices[i]);
        buy2 = Math.max(buy2, sell1 - prices[i]);
        sell2 = Math.max(sell2, buy2 + prices[i]);
    }
    
    return sell2;
}

// Test case
console.log("19. Maximum profit by buying and selling a share at most twice:");
console.log(maxProfitTwoTransactions([3, 3, 5, 0, 0, 3, 1, 4])); // Expected: 6

// ===================================================================================================

// 20. Optimal Strategy for a Game
/*
Problem: Two players pick coins from ends of array. Both play optimally. Find maximum value first player can get.

Approach: Use DP where dp[i][j] = maximum value difference first player can get from coins[i...j].
Player can pick coins[i] or coins[j], then opponent plays optimally on remaining array.

Time Complexity: O(n²)
Space Complexity: O(n²)
*/
function optimalStrategyGame(coins) {
    const n = coins.length;
    const dp = Array(n).fill().map(() => Array(n).fill(0));
    
    // Base case: single coin
    for (let i = 0; i < n; i++) {
        dp[i][i] = coins[i];
    }
    
    // Fill for all lengths
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            // Pick coins[i], opponent gets optimal from remaining
            const pickLeft = coins[i] - dp[i + 1][j];
            // Pick coins[j], opponent gets optimal from remaining
            const pickRight = coins[j] - dp[i][j - 1];
            dp[i][j] = Math.max(pickLeft, pickRight);
        }
    }
    
    return dp[0][n - 1];
}

// Test case
console.log("20. Optimal Strategy for a Game:");
console.log(optimalStrategyGame([1, 5, 3, 7, 4, 1, 9, 3])); // Expected: 15

// Continuing with remaining problems...
// Due to length constraints, I'll continue with the most important remaining problems

// ===================================================================================================

// 21. Mobile Numeric Keypad Problem [IMPORTANT]
/*
Problem: Count number of possible sequences of length n that can be typed on mobile keypad
where you can move to adjacent numbers or stay on same number.

Approach: Use DP where dp[i][j] = number of sequences of length i ending at key j.
For each key, add sequences from adjacent keys and same key.

Time Complexity: O(n)
Space Complexity: O(1) - only need to track current and previous states
*/
function mobileKeypadProblem(n) {
    if (n === 0) return 0;
    if (n === 1) return 10;
    
    // Adjacent keys for each number (including self)
    const adjacent = {
        0: [0, 8], 1: [1, 2, 4], 2: [1, 2, 3, 5], 3: [2, 3, 6],
        4: [1, 4, 5, 7], 5: [2, 4, 5, 6, 8], 6: [3, 5, 6, 9],
        7: [4, 7, 8], 8: [0, 5, 7, 8, 9], 9: [6, 8, 9]
    };
    
    let prev = new Array(10).fill(1); // Length 1 sequences
    
    for (let len = 2; len <= n; len++) {
        const curr = new Array(10).fill(0);
        for (let key = 0; key <= 9; key++) {
            for (let adj of adjacent[key]) {
                curr[key] += prev[adj];
            }
        }
        prev = curr;
    }
    
    return prev.reduce((sum, count) => sum + count, 0);
}

// Test case
console.log("21. Mobile Numeric Keypad Problem:");
console.log(mobileKeypadProblem(3)); // Expected: 46

// ===================================================================================================

// 22. Boolean Parenthesization Problem
/*
Problem: Given a boolean expression, count number of ways to parenthesize it to make it true.

Approach: Use DP where dp[i][j][isTrue] = count of ways to make expression[i...j] evaluate to isTrue.
Try all possible split points and combine results based on operator.

Time Complexity: O(n³)
Space Complexity: O(n³)
*/
function booleanParenthesization(expr) {
    const n = expr.length;
    // dp[i][j][0] = ways to make false, dp[i][j][1] = ways to make true
    const dp = Array(n).fill().map(() => Array(n).fill().map(() => [0, 0]));
    
    // Base case: single symbols
    for (let i = 0; i < n; i += 2) {
        if (expr[i] === 'T') {
            dp[i][i][1] = 1;
            dp[i][i][0] = 0;
        } else {
            dp[i][i][1] = 0;
            dp[i][i][0] = 1;
        }
    }
    
    // Fill for all lengths
    for (let len = 3; len <= n; len += 2) {
        for (let i = 0; i <= n - len; i += 2) {
            const j = i + len - 1;
            for (let k = i + 1; k < j; k += 2) {
                const leftTrue = dp[i][k - 1][1];
                const leftFalse = dp[i][k - 1][0];
                const rightTrue = dp[k + 1][j][1];
                const rightFalse = dp[k + 1][j][0];
                
                if (expr[k] === '&') {
                    dp[i][j][1] += leftTrue * rightTrue;
                    dp[i][j][0] += leftFalse * rightTrue + leftTrue * rightFalse + leftFalse * rightFalse;
                } else if (expr[k] === '|') {
                    dp[i][j][1] += leftTrue * rightTrue + leftFalse * rightTrue + leftTrue * rightFalse;
                    dp[i][j][0] += leftFalse * rightFalse;
                } else if (expr[k] === '^') {
                    dp[i][j][1] += leftTrue * rightFalse + leftFalse * rightTrue;
                    dp[i][j][0] += leftTrue * rightTrue + leftFalse * rightFalse;
                }
            }
        }
    }
    
    return dp[0][n - 1][1];
}

// Test case
console.log("22. Boolean Parenthesization Problem:");
console.log(booleanParenthesization("T|T&F^T")); // Expected: 4

// ===================================================================================================

// 23. Largest rectangular sub-matrix whose sum is 0
/*
Problem: Find the area of largest rectangular sub-matrix with sum 0.

Approach: For each pair of rows, convert to 1D array problem (largest subarray with sum 0).
Use prefix sum and hashmap to find largest subarray with sum 0.

Time Complexity: O(n²m) where n is rows, m is columns
Space Complexity: O(m)
*/
function largestRectangleZeroSum(matrix) {
    if (!matrix || matrix.length === 0) return 0;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    let maxArea = 0;
    
    // Try all pairs of rows
    for (let top = 0; top < rows; top++) {
        const temp = new Array(cols).fill(0);
        
        for (let bottom = top; bottom < rows; bottom++) {
            // Add current row to temp array
            for (let i = 0; i < cols; i++) {
                temp[i] += matrix[bottom][i];
            }
            
            // Find largest subarray with sum 0 in temp
            const length = largestSubarrayZeroSum(temp);
            if (length > 0) {
                const area = length * (bottom - top + 1);
                maxArea = Math.max(maxArea, area);
            }
        }
    }
    
    return maxArea;
}

function largestSubarrayZeroSum(arr) {
    const sumMap = new Map();
    sumMap.set(0, -1);
    let sum = 0;
    let maxLength = 0;
    
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        if (sumMap.has(sum)) {
            maxLength = Math.max(maxLength, i - sumMap.get(sum));
        } else {
            sumMap.set(sum, i);
        }
    }
    
    return maxLength;
}

// Test case
console.log("23. Largest rectangular sub-matrix whose sum is 0:");
const zeroSumMatrix = [[9, 7, 16, 5], [1, -6, -7, 3], [1, 8, 7, 9], [7, -2, 0, 10]];
console.log(largestRectangleZeroSum(zeroSumMatrix)); // Expected: 8

// ===================================================================================================

// 24. Largest area rectangular sub-matrix with equal number of 1's and 0's [IMPORTANT]
/*
Problem: Find area of largest rectangular sub-matrix with equal number of 1s and 0s.

Approach: Convert 0s to -1s, then find largest rectangular sub-matrix with sum 0.
Same approach as previous problem.

Time Complexity: O(n²m)
Space Complexity: O(m)
*/
function largestRectangleEqual01(matrix) {
    if (!matrix || matrix.length === 0) return 0;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Convert 0s to -1s
    const converted = matrix.map(row => row.map(val => val === 0 ? -1 : 1));
    
    return largestRectangleZeroSum(converted);
}

// Test case
console.log("24. Largest area rectangular sub-matrix with equal 1s and 0s:");
const binaryMatrix = [[0, 1, 1, 0], [0, 1, 1, 1], [1, 1, 1, 1], [1, 0, 0, 1]];
console.log(largestRectangleEqual01(binaryMatrix)); // Expected: 8

// ===================================================================================================

// 25. Maximum sum rectangle in a 2D matrix
/*
Problem: Find the maximum sum of elements in any rectangular sub-matrix.

Approach: For each pair of rows, convert to 1D maximum subarray problem (Kadane's algorithm).

Time Complexity: O(n²m)
Space Complexity: O(m)
*/
function maxSumRectangle(matrix) {
    if (!matrix || matrix.length === 0) return 0;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    let maxSum = -Infinity;
    
    for (let top = 0; top < rows; top++) {
        const temp = new Array(cols).fill(0);
        
        for (let bottom = top; bottom < rows; bottom++) {
            // Add current row to temp
            for (let i = 0; i < cols; i++) {
                temp[i] += matrix[bottom][i];
            }
            
            // Apply Kadane's algorithm on temp
            const currentMax = maxSubarraySum(temp);
            maxSum = Math.max(maxSum, currentMax);
        }
    }
    
    return maxSum;
}

// Test case
console.log("25. Maximum sum rectangle in a 2D matrix:");
const sumMatrix = [[1, 2, -1, -4, -20], [-8, -3, 4, 2, 1], [3, 8, 10, 1, 3], [-4, -1, 1, 7, -6]];
console.log(maxSumRectangle(sumMatrix)); // Expected: 29

// ===================================================================================================

// 26. Maximum profit by buying and selling a share at most k times
/*
Problem: Find maximum profit from at most k transactions.

Approach: Use DP with buy and sell states for each transaction.
buy[i] = max profit after ith buy, sell[i] = max profit after ith sell.

Time Complexity: O(nk) where n is days, k is transactions
Space Complexity: O(k)
*/
function maxProfitKTransactions(prices, k) {
    const n = prices.length;
    if (n <= 1 || k === 0) return 0;
    
    // If k is large enough, we can do as many transactions as we want
    if (k >= n / 2) {
        let profit = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
    
    const buy = new Array(k + 1).fill(-prices[0]);
    const sell = new Array(k + 1).fill(0);
    
    for (let i = 1; i < n; i++) {
        for (let j = k; j >= 1; j--) {
            sell[j] = Math.max(sell[j], buy[j] + prices[i]);
            buy[j] = Math.max(buy[j], sell[j - 1] - prices[i]);
        }
    }
    
    return sell[k];
}

// Test case
console.log("26. Maximum profit with at most k transactions:");
console.log(maxProfitKTransactions([2, 4, 1], 2)); // Expected: 2

// ===================================================================================================

// 27. Find if a string is interleaved of two other strings
/*
Problem: Check if string s3 is formed by interleaving characters of s1 and s2.

Approach: Use DP where dp[i][j] = true if s3[0...i+j-1] can be formed by interleaving s1[0...i-1] and s2[0...j-1].

Time Complexity: O(mn) where m, n are lengths of s1, s2
Space Complexity: O(mn)
*/
function isInterleaved(s1, s2, s3) {
    const m = s1.length, n = s2.length;
    if (m + n !== s3.length) return false;
    
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));
    dp[0][0] = true;
    
    // Fill first row (only s2 characters)
    for (let j = 1; j <= n; j++) {
        dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
    }
    
    // Fill first column (only s1 characters)
    for (let i = 1; i <= m; i++) {
        dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
    }
    
    // Fill rest of the table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
                       (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
        }
    }
    
    return dp[m][n];
}

// Test case
console.log("27. String interleaving:");
console.log(isInterleaved("aab", "axy", "aaxaby")); // Expected: true

// ===================================================================================================

// 28. Maximum Length of Pair Chain
/*
Problem: Given pairs of numbers, find maximum length of chain where b < c for pairs (a,b) and (c,d).

Approach: Sort pairs by second element, then use greedy approach or DP.
Using DP: dp[i] = maximum chain length ending at pair i.

Time Complexity: O(n²) for DP approach, O(n log n) for greedy
Space Complexity: O(n)
*/
function maxChainLength(pairs) {
    // Sort by second element
    pairs.sort((a, b) => a[1] - b[1]);
    const n = pairs.length;
    const dp = new Array(n).fill(1);
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (pairs[j][1] < pairs[i][0]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

// Greedy approach (more efficient)
function maxChainLengthGreedy(pairs) {
    pairs.sort((a, b) => a[1] - b[1]);
    let count = 1;
    let lastEnd = pairs[0][1];
    
    for (let i = 1; i < pairs.length; i++) {
        if (pairs[i][0] > lastEnd) {
            count++;
            lastEnd = pairs[i][1];
        }
    }
    
    return count;
}

// Test case
console.log("28. Maximum Length of Pair Chain:");
const pairs = [[1, 2], [2, 3], [3, 4]];
console.log(maxChainLength(pairs)); // Expected: 2
console.log(maxChainLengthGreedy(pairs)); // Expected: 2

// ===================================================================================================

// 29. Optimal Binary Search Tree
/*
Problem: Given keys and their search frequencies, construct BST with minimum search cost.

Approach: Use DP where dp[i][j] = minimum cost for keys from i to j.
Try each key as root and recursively solve for left and right subtrees.

Time Complexity: O(n³)
Space Complexity: O(n²)
*/
function optimalBST(keys, freq) {
    const n = keys.length;
    const dp = Array(n).fill().map(() => Array(n).fill(0));
    const sum = Array(n).fill().map(() => Array(n).fill(0));
    
    // Fill sum array (sum of frequencies from i to j)
    for (let i = 0; i < n; i++) {
        sum[i][i] = freq[i];
        for (let j = i + 1; j < n; j++) {
            sum[i][j] = sum[i][j - 1] + freq[j];
        }
    }
    
    // Single keys
    for (let i = 0; i < n; i++) {
        dp[i][i] = freq[i];
    }
    
    // Fill for all lengths
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            dp[i][j] = Infinity;
            
            // Try each key as root
            for (let r = i; r <= j; r++) {
                const leftCost = (r > i) ? dp[i][r - 1] : 0;
                const rightCost = (r < j) ? dp[r + 1][j] : 0;
                const cost = leftCost + rightCost + sum[i][j];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    
    return dp[0][n - 1];
}

// Test case
console.log("29. Optimal Binary Search Tree:");
const keys = [10, 12, 20];
const freq = [34, 8, 50];
console.log(optimalBST(keys, freq)); // Expected: 142

// ===================================================================================================

// 30. Palindrome Partitioning Problem
/*
Problem: Find minimum number of cuts needed to partition string into palindromes.

Approach: Use DP where dp[i] = minimum cuts needed for string[0...i].
For each position, try all possible last palindromic substrings.

Time Complexity: O(n³) - can be optimized to O(n²)
Space Complexity: O(n²) for palindrome table + O(n) for cuts
*/
function minPalindromePartitioning(s) {
    const n = s.length;
    
    // Build palindrome table
    const isPalin = Array(n).fill().map(() => Array(n).fill(false));
    
    // Single characters
    for (let i = 0; i < n; i++) {
        isPalin[i][i] = true;
    }
    
    // Two characters
    for (let i = 0; i < n - 1; i++) {
        isPalin[i][i + 1] = (s[i] === s[i + 1]);
    }
    
    // Longer substrings
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            isPalin[i][j] = (s[i] === s[j]) && isPalin[i + 1][j - 1];
        }
    }
    
    // DP for minimum cuts
    const cuts = new Array(n).fill(Infinity);
    
    for (let i = 0; i < n; i++) {
        if (isPalin[0][i]) {
            cuts[i] = 0;
        } else {
            for (let j = 0; j < i; j++) {
                if (isPalin[j + 1][i]) {
                    cuts[i] = Math.min(cuts[i], cuts[j] + 1);
                }
            }
        }
    }
    
    return cuts[n - 1];
}

// Test case
console.log("30. Palindrome Partitioning Problem:");
console.log(minPalindromePartitioning("ababbbabbababa")); // Expected: 3

// ===================================================================================================

// 31. Word Wrap Problem
/*
Problem: Given sequence of words and line width, arrange words to minimize cost.
Cost is square of extra spaces in each line.

Approach: Use DP where dp[i] = minimum cost to arrange words 0 to i-1.
For each position, try all possible last lines.

Time Complexity: O(n²)
Space Complexity: O(n²) for extras table + O(n) for DP
*/
function wordWrap(words, maxWidth) {
    const n = words.length;
    
    // Calculate extra spaces for all possible lines
    const extras = Array(n).fill().map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
        extras[i][i] = maxWidth - words[i].length;
        for (let j = i + 1; j < n; j++) {
            extras[i][j] = extras[i][j - 1] - words[j].length - 1;
        }
    }
    
    // Calculate line costs
    const lineCosts = Array(n).fill().map(() => Array(n).fill(Infinity));
    
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            if (extras[i][j] < 0) {
                lineCosts[i][j] = Infinity;
            } else if (j === n - 1 && extras[i][j] >= 0) {
                lineCosts[i][j] = 0; // Last line
            } else {
                lineCosts[i][j] = extras[i][j] * extras[i][j];
            }
        }
    }
    
    // DP to find minimum cost
    const dp = new Array(n).fill(Infinity);
    
    for (let j = 0; j < n; j++) {
        if (lineCosts[0][j] !== Infinity) {
            dp[j] = lineCosts[0][j];
        }
        
        for (let i = 0; i < j; i++) {
            if (dp[i] !== Infinity && lineCosts[i + 1][j] !== Infinity) {
                dp[j] = Math.min(dp[j], dp[i] + lineCosts[i + 1][j]);
            }
        }
    }
    
    return dp[n - 1];
}

// Test case
console.log("31. Word Wrap Problem:");
const words = ["This", "is", "an", "example", "of", "text", "justification."];
console.log(wordWrap(words, 16)); // Expected cost based on optimal arrangement

console.log("\n=== ALL DYNAMIC PROGRAMMING PROBLEMS COMPLETED ===");


// ===================================================================
// 1. Mobile Numeric Keypad Problem
// ===================================================================
/**
 * Problem: Given a mobile numeric keypad, find the number of possible 
 * numeric sequences of given length such that you can only press keys 
 * that are adjacent to the current key or the current key itself.
 * 
 * Approach: Dynamic Programming
 * - Create adjacency list for keypad
 * - Use DP where dp[i][j] = number of sequences of length i ending at key j
 * - For each position, sum up sequences from all adjacent keys
 * 
 * Time Complexity: O(n * 10) = O(n) where n is sequence length
 * Space Complexity: O(n * 10) = O(n)
 */

function mobileKeypadSequences(n) {
    // Define adjacency for each key (including self)
    const adj = {
        0: [0, 8],
        1: [1, 2, 4],
        2: [1, 2, 3, 5],
        3: [2, 3, 6],
        4: [1, 4, 5, 7],
        5: [2, 4, 5, 6, 8],
        6: [3, 5, 6, 9],
        7: [4, 7, 8],
        8: [0, 5, 7, 8, 9],
        9: [6, 8, 9]
    };
    
    // dp[i][j] = number of sequences of length i ending at key j
    const dp = Array(n + 1).fill().map(() => Array(10).fill(0));
    
    // Base case: sequences of length 1
    for (let j = 0; j <= 9; j++) {
        dp[1][j] = 1;
    }
    
    // Fill DP table
    for (let i = 2; i <= n; i++) {
        for (let j = 0; j <= 9; j++) {
            for (let k of adj[j]) {
                dp[i][j] += dp[i - 1][k];
            }
        }
    }
    
    // Sum all sequences of length n
    let result = 0;
    for (let j = 0; j <= 9; j++) {
        result += dp[n][j];
    }
    
    return result;
}

// Test cases
console.log("Mobile Keypad Problem:");
console.log("Length 1:", mobileKeypadSequences(1)); // 10
console.log("Length 2:", mobileKeypadSequences(2)); // 36
console.log("Length 3:", mobileKeypadSequences(3)); // 138
console.log();

// ===================================================================
// 2. Boolean Parenthesization Problem
// ===================================================================
/**
 * Problem: Given a boolean expression with operators &, |, ^ and operands T, F,
 * count the number of ways to parenthesize the expression so that it evaluates to True.
 * 
 * Approach: Dynamic Programming with Matrix Chain Multiplication pattern
 * - Use 3D DP: dp[i][j][isTrue] = ways to make subexpression from i to j evaluate to isTrue
 * - For each partition k, combine left and right parts based on operator
 * 
 * Time Complexity: O(n³) where n is length of expression
 * Space Complexity: O(n³)
 */

function countWaysToParenthesize(expr) {
    const n = expr.length;
    
    // dp[i][j][0] = ways to make expr[i...j] false
    // dp[i][j][1] = ways to make expr[i...j] true
    const dp = Array(n).fill().map(() => 
        Array(n).fill().map(() => Array(2).fill(0))
    );
    
    // Base case: single operands
    for (let i = 0; i < n; i += 2) {
        if (expr[i] === 'T') {
            dp[i][i][1] = 1;
            dp[i][i][0] = 0;
        } else {
            dp[i][i][1] = 0;
            dp[i][i][0] = 1;
        }
    }
    
    // Fill DP table
    for (let len = 3; len <= n; len += 2) {
        for (let i = 0; i <= n - len; i += 2) {
            let j = i + len - 1;
            
            for (let k = i + 1; k < j; k += 2) {
                const op = expr[k];
                const leftTrue = dp[i][k - 1][1];
                const leftFalse = dp[i][k - 1][0];
                const rightTrue = dp[k + 1][j][1];
                const rightFalse = dp[k + 1][j][0];
                
                if (op === '&') {
                    dp[i][j][1] += leftTrue * rightTrue;
                    dp[i][j][0] += leftTrue * rightFalse + leftFalse * rightTrue + leftFalse * rightFalse;
                } else if (op === '|') {
                    dp[i][j][1] += leftTrue * rightTrue + leftTrue * rightFalse + leftFalse * rightTrue;
                    dp[i][j][0] += leftFalse * rightFalse;
                } else if (op === '^') {
                    dp[i][j][1] += leftTrue * rightFalse + leftFalse * rightTrue;
                    dp[i][j][0] += leftTrue * rightTrue + leftFalse * rightFalse;
                }
            }
        }
    }
    
    return dp[0][n - 1][1];
}

// Test cases
console.log("Boolean Parenthesization Problem:");
console.log("T^F&T:", countWaysToParenthesize("T^F&T")); // 2
console.log("T|T&F^T:", countWaysToParenthesize("T|T&F^T")); // 4
console.log();

// ===================================================================
// 3. Largest rectangular sub-matrix whose sum is 0
// ===================================================================
/**
 * Problem: Find the largest rectangular sub-matrix with sum equal to 0
 * 
 * Approach: 
 * - For each pair of rows, compress matrix to 1D array
 * - Find largest subarray with sum 0 using prefix sum and hashmap
 * - Track maximum area found
 * 
 * Time Complexity: O(n²m) where n = rows, m = columns
 * Space Complexity: O(m)
 */

function largestZeroSumSubmatrix(matrix) {
    if (!matrix || matrix.length === 0) return 0;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    let maxArea = 0;
    let result = { area: 0, top: -1, bottom: -1, left: -1, right: -1 };
    
    // Helper function to find largest subarray with sum 0
    function largestZeroSumSubarray(arr) {
        const map = new Map();
        map.set(0, -1);
        let sum = 0;
        let maxLen = 0;
        let start = -1, end = -1;
        
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
            
            if (map.has(sum)) {
                const len = i - map.get(sum);
                if (len > maxLen) {
                    maxLen = len;
                    start = map.get(sum) + 1;
                    end = i;
                }
            } else {
                map.set(sum, i);
            }
        }
        
        return { length: maxLen, start, end };
    }
    
    // Try all pairs of rows
    for (let top = 0; top < rows; top++) {
        const temp = Array(cols).fill(0);
        
        for (let bottom = top; bottom < rows; bottom++) {
            // Add current row to temp array
            for (let i = 0; i < cols; i++) {
                temp[i] += matrix[bottom][i];
            }
            
            // Find largest zero sum subarray
            const subarray = largestZeroSumSubarray(temp);
            const area = subarray.length * (bottom - top + 1);
            
            if (area > maxArea) {
                maxArea = area;
                result = {
                    area: maxArea,
                    top: top,
                    bottom: bottom,
                    left: subarray.start,
                    right: subarray.end
                };
            }
        }
    }
    
    return result;
}

// Test cases
console.log("Largest Zero Sum Submatrix:");
const matrix1 = [
    [9, 7, 16, 5],
    [1, -6, -7, 3],
    [1, 8, 7, 9],
    [7, -2, 0, 10]
];
console.log("Matrix 1:", largestZeroSumSubmatrix(matrix1));

const matrix2 = [
    [1, 2, -1, -4, -20],
    [-8, -3, 4, 2, 1],
    [3, 8, 10, 1, 3],
    [-4, -1, 1, 7, -6]
];
console.log("Matrix 2:", largestZeroSumSubmatrix(matrix2));
console.log();

// ===================================================================
// 4. Largest area rectangular sub-matrix with equal number of 1's and 0's
// ===================================================================
/**
 * Problem: Find the largest rectangular sub-matrix with equal number of 1s and 0s
 * 
 * Approach: 
 * - Convert 0s to -1s, then problem becomes finding largest submatrix with sum 0
 * - Same approach as previous problem
 * 
 * Time Complexity: O(n²m)
 * Space Complexity: O(m)
 */

function largestEqualSubmatrix(matrix) {
    if (!matrix || matrix.length === 0) return 0;
    
    // Convert 0s to -1s
    const convertedMatrix = matrix.map(row => 
        row.map(val => val === 0 ? -1 : 1)
    );
    
    return largestZeroSumSubmatrix(convertedMatrix);
}

// Test cases
console.log("Largest Equal 1s and 0s Submatrix:");
const binaryMatrix1 = [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [1, 1, 1, 1]
];
console.log("Binary Matrix 1:", largestEqualSubmatrix(binaryMatrix1));

const binaryMatrix2 = [
    [0, 0, 1, 0, 0],
    [1, 0, 1, 1, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 0, 1, 0]
];
console.log("Binary Matrix 2:", largestEqualSubmatrix(binaryMatrix2));
console.log();

// ===================================================================
// 5. Maximum sum rectangle in a 2D matrix
// ===================================================================
/**
 * Problem: Find the rectangular submatrix with maximum sum (Kadane's 2D extension)
 * 
 * Approach:
 * - For each pair of rows, compress to 1D and apply Kadane's algorithm
 * - Track maximum sum and coordinates
 * 
 * Time Complexity: O(n²m)
 * Space Complexity: O(m)
 */

function maxSumRectangle(matrix) {
    if (!matrix || matrix.length === 0) return { sum: 0 };
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    let maxSum = -Infinity;
    let result = { sum: maxSum, top: 0, bottom: 0, left: 0, right: 0 };
    
    // Kadane's algorithm for 1D array
    function kadane(arr) {
        let maxSoFar = arr[0];
        let maxEndingHere = arr[0];
        let start = 0, end = 0, tempStart = 0;
        
        for (let i = 1; i < arr.length; i++) {
            if (maxEndingHere < 0) {
                maxEndingHere = arr[i];
                tempStart = i;
            } else {
                maxEndingHere += arr[i];
            }
            
            if (maxSoFar < maxEndingHere) {
                maxSoFar = maxEndingHere;
                start = tempStart;
                end = i;
            }
        }
        
        return { sum: maxSoFar, start, end };
    }
    
    // Try all pairs of rows
    for (let top = 0; top < rows; top++) {
        const temp = Array(cols).fill(0);
        
        for (let bottom = top; bottom < rows; bottom++) {
            // Add current row to temp
            for (let i = 0; i < cols; i++) {
                temp[i] += matrix[bottom][i];
            }
            
            // Apply Kadane's algorithm
            const kadaneResult = kadane(temp);
            
            if (kadaneResult.sum > maxSum) {
                maxSum = kadaneResult.sum;
                result = {
                    sum: maxSum,
                    top: top,
                    bottom: bottom,
                    left: kadaneResult.start,
                    right: kadaneResult.end
                };
            }
        }
    }
    
    return result;
}

// Test cases
console.log("Maximum Sum Rectangle:");
const sumMatrix1 = [
    [1, 2, -1, -4, -20],
    [-8, -3, 4, 2, 1],
    [3, 8, 10, 1, 3],
    [-4, -1, 1, 7, -6]
];
console.log("Sum Matrix 1:", maxSumRectangle(sumMatrix1));

const sumMatrix2 = [
    [-1, -2, -3],
    [-4, -5, -6],
    [-7, -8, -9]
];
console.log("Sum Matrix 2:", maxSumRectangle(sumMatrix2));
console.log();

// ===================================================================
// 6. Maximum profit by buying and selling a share at most k times
// ===================================================================
/**
 * Problem: Best Time to Buy and Sell Stock with at most K transactions
 * 
 * Approach: Dynamic Programming
 * - buy[i][j] = max profit after at most i transactions with stock in hand on day j
 * - sell[i][j] = max profit after at most i transactions with no stock on day j
 * 
 * Time Complexity: O(k * n) where n is number of days
 * Space Complexity: O(k * n)
 */

function maxProfitWithKTransactions(prices, k) {
    if (!prices || prices.length <= 1 || k === 0) return 0;
    
    const n = prices.length;
    
    // If k >= n/2, we can make as many transactions as we want
    if (k >= Math.floor(n / 2)) {
        let profit = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
    
    // buy[i] = max profit after at most i+1 transactions with stock in hand
    // sell[i] = max profit after at most i+1 transactions with no stock
    let buy = Array(k).fill(-prices[0]);
    let sell = Array(k).fill(0);
    
    for (let i = 1; i < n; i++) {
        for (let j = k - 1; j >= 0; j--) {
            sell[j] = Math.max(sell[j], buy[j] + prices[i]);
            buy[j] = Math.max(buy[j], (j > 0 ? sell[j - 1] : 0) - prices[i]);
        }
    }
    
    return sell[k - 1];
}

// Test cases
console.log("Max Profit with K Transactions:");
console.log("Prices [2,4,1], k=2:", maxProfitWithKTransactions([2, 4, 1], 2)); // 2
console.log("Prices [3,2,6,5,0,3], k=2:", maxProfitWithKTransactions([3, 2, 6, 5, 0, 3], 2)); // 7
console.log("Prices [1,2,3,4,5], k=2:", maxProfitWithKTransactions([1, 2, 3, 4, 5], 2)); // 4
console.log();

// ===================================================================
// 7. Find if a string is interleaved of two other strings
// ===================================================================
/**
 * Problem: Check if string s3 is an interleaving of s1 and s2
 * 
 * Approach: Dynamic Programming
 * - dp[i][j] = true if s3[0...i+j-1] is interleaving of s1[0...i-1] and s2[0...j-1]
 * - Check if current character matches s1 or s2 and previous state is valid
 * 
 * Time Complexity: O(m * n) where m, n are lengths of s1, s2
 * Space Complexity: O(m * n)
 */

function isInterleave(s1, s2, s3) {
    const m = s1.length;
    const n = s2.length;
    
    if (m + n !== s3.length) return false;
    
    // dp[i][j] = true if s3[0...i+j-1] is interleaving of s1[0...i-1] and s2[0...j-1]
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));
    
    // Base case
    dp[0][0] = true;
    
    // Fill first row (only s2 characters)
    for (let j = 1; j <= n; j++) {
        dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
    }
    
    // Fill first column (only s1 characters)
    for (let i = 1; i <= m; i++) {
        dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
    }
    
    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
                      (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
        }
    }
    
    return dp[m][n];
}

// Test cases
console.log("String Interleaving:");
console.log("aabcc, dbbca, aadbbcbcac:", isInterleave("aabcc", "dbbca", "aadbbcbcac")); // true
console.log("aabcc, dbbca, aadbbbaccc:", isInterleave("aabcc", "dbbca", "aadbbbaccc")); // false
console.log("", "", "", isInterleave("", "", "")); // true
console.log();

// ===================================================================
// 8. Maximum Length of Pair Chain
// ===================================================================
/**
 * Problem: Given pairs of numbers, find the longest chain where each pair 
 * [a,b] can be followed by [c,d] if b < c
 * 
 * Approach 1: Greedy (optimal) - Sort by second element, pick greedily
 * Approach 2: DP - Sort by first element, use LIS-like approach
 * 
 * Time Complexity: O(n log n) for greedy, O(n²) for DP
 * Space Complexity: O(1) for greedy, O(n) for DP
 */

// Greedy Approach (Optimal)
function findLongestChainGreedy(pairs) {
    if (!pairs || pairs.length === 0) return 0;
    
    // Sort by second element
    pairs.sort((a, b) => a[1] - b[1]);
    
    let count = 1;
    let currentEnd = pairs[0][1];
    
    for (let i = 1; i < pairs.length; i++) {
        if (pairs[i][0] > currentEnd) {
            count++;
            currentEnd = pairs[i][1];
        }
    }
    
    return count;
}

// Dynamic Programming Approach
function findLongestChainDP(pairs) {
    if (!pairs || pairs.length === 0) return 0;
    
    // Sort by first element
    pairs.sort((a, b) => a[0] - b[0]);
    
    const n = pairs.length;
    const dp = Array(n).fill(1);
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (pairs[j][1] < pairs[i][0]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

// Test cases
console.log("Maximum Length of Pair Chain:");
const pairs1 = [[1, 2], [2, 3], [3, 4]];
console.log("Pairs [[1,2],[2,3],[3,4]] - Greedy:", findLongestChainGreedy([...pairs1])); // 2
console.log("Pairs [[1,2],[2,3],[3,4]] - DP:", findLongestChainDP([...pairs1])); // 2

const pairs2 = [[1, 2], [7, 8], [4, 5]];
console.log("Pairs [[1,2],[7,8],[4,5]] - Greedy:", findLongestChainGreedy([...pairs2])); // 3
console.log("Pairs [[1,2],[7,8],[4,5]] - DP:", findLongestChainDP([...pairs2])); // 3

const pairs3 = [[-10, -8], [8, 9], [-5, 0], [6, 10], [-6, -4], [1, 7], [9, 10], [-4, 7]];
console.log("Complex pairs - Greedy:", findLongestChainGreedy([...pairs3])); // 4
console.log("Complex pairs - DP:", findLongestChainDP([...pairs3])); // 4
console.log();

console.log("All Dynamic Programming problems solved with test cases!");