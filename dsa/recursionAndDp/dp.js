// ==========================================
// DYNAMIC PROGRAMMING ALGORITHMS IN JAVASCRIPT
// ==========================================

// 1. FIBONACCI WITH MEMOIZATION
// ==========================================
function fibonacciMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

// Iterative version for better space complexity
function fibonacciDP(n) {
    if (n <= 2) return 1;
    
    const dp = [0, 1, 1];
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// 2. KNAPSACK PROBLEM
// ==========================================

// 0/1 Knapsack - each item can be taken at most once
function knapsack01(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]], // include item
                    dp[i - 1][w] // exclude item
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity];
}

// Unbounded Knapsack - unlimited quantity of each item
function unboundedKnapsack(weights, values, capacity) {
    const dp = Array(capacity + 1).fill(0);
    
    for (let w = 1; w <= capacity; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }
    return dp[capacity];
}

// 3. LONGEST COMMON SUBSEQUENCE (LCS)
// ==========================================
function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}

// Get the actual LCS string
function getLCS(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Reconstruct LCS
    let lcs = '';
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            lcs = text1[i - 1] + lcs;
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    return lcs;
}

// 4. LONGEST INCREASING SUBSEQUENCE (LIS)
// ==========================================
function longestIncreasingSubsequence(nums) {
    if (nums.length === 0) return 0;
    
    const dp = Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

// Optimized O(n log n) version using binary search
function longestIncreasingSubsequenceOptimal(nums) {
    const tails = [];
    
    for (const num of nums) {
        let left = 0, right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.length;
}

// 5. COIN CHANGE PROBLEM
// ==========================================

// Minimum number of coins to make amount
function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Number of ways to make change
function coinChangeWays(coins, amount) {
    const dp = Array(amount + 1).fill(0);
    dp[0] = 1;
    
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    
    return dp[amount];
}

// 6. EDIT DISTANCE (LEVENSHTEIN DISTANCE)
// ==========================================
function editDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // delete
                    dp[i][j - 1],     // insert
                    dp[i - 1][j - 1]  // substitute
                );
            }
        }
    }
    
    return dp[m][n];
}

// 7. MATRIX CHAIN MULTIPLICATION
// ==========================================
function matrixChainMultiplication(dimensions) {
    const n = dimensions.length - 1; // number of matrices
    const dp = Array(n).fill().map(() => Array(n).fill(0));
    
    // l is chain length
    for (let l = 2; l <= n; l++) {
        for (let i = 0; i <= n - l; i++) {
            const j = i + l - 1;
            dp[i][j] = Infinity;
            
            for (let k = i; k < j; k++) {
                const cost = dp[i][k] + dp[k + 1][j] + 
                           dimensions[i] * dimensions[k + 1] * dimensions[j + 1];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    
    return dp[0][n - 1];
}

// 8. SUBSET SUM PROBLEM
// ==========================================
function subsetSum(nums, target) {
    const dp = Array(target + 1).fill(false);
    dp[0] = true;
    
    for (const num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    
    return dp[target];
}

// Return one valid subset if exists
function findSubsetSum(nums, target) {
    const dp = Array(nums.length + 1).fill().map(() => Array(target + 1).fill(false));
    
    // Base case
    for (let i = 0; i <= nums.length; i++) {
        dp[i][0] = true;
    }
    
    for (let i = 1; i <= nums.length; i++) {
        for (let j = 1; j <= target; j++) {
            if (nums[i - 1] <= j) {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    
    if (!dp[nums.length][target]) return null;
    
    // Reconstruct subset
    const subset = [];
    let i = nums.length, j = target;
    while (i > 0 && j > 0) {
        if (dp[i][j] && !dp[i - 1][j]) {
            subset.push(nums[i - 1]);
            j -= nums[i - 1];
        }
        i--;
    }
    
    return subset;
}

// 9. PARTITION PROBLEM
// ==========================================
function canPartition(nums) {
    const sum = nums.reduce((acc, num) => acc + num, 0);
    
    // If sum is odd, can't partition into equal subsets
    if (sum % 2 !== 0) return false;
    
    const target = sum / 2;
    return subsetSum(nums, target);
}

// 10. ROD CUTTING PROBLEM
// ==========================================
function rodCutting(prices, length) {
    const dp = Array(length + 1).fill(0);
    
    for (let i = 1; i <= length; i++) {
        for (let j = 1; j <= i && j <= prices.length; j++) {
            dp[i] = Math.max(dp[i], prices[j - 1] + dp[i - j]);
        }
    }
    
    return dp[length];
}

// Rod cutting with cuts tracking
function rodCuttingWithCuts(prices, length) {
    const dp = Array(length + 1).fill(0);
    const cuts = Array(length + 1).fill(0);
    
    for (let i = 1; i <= length; i++) {
        for (let j = 1; j <= i && j <= prices.length; j++) {
            if (prices[j - 1] + dp[i - j] > dp[i]) {
                dp[i] = prices[j - 1] + dp[i - j];
                cuts[i] = j;
            }
        }
    }
    
    // Reconstruct cuts
    const result = [];
    let remaining = length;
    while (remaining > 0) {
        result.push(cuts[remaining]);
        remaining -= cuts[remaining];
    }
    
    return { maxProfit: dp[length], cuts: result };
}

// ==========================================
// EXAMPLE USAGE AND TESTS
// ==========================================

// Test functions
function runTests() {
    console.log('=== DYNAMIC PROGRAMMING ALGORITHM TESTS ===\n');
    
    // 1. Fibonacci
    console.log('1. Fibonacci:');
    console.log(`fib(10) = ${fibonacciMemo(10)}`);
    console.log(`fib(10) DP = ${fibonacciDP(10)}`);
    
    // 2. Knapsack
    console.log('\n2. Knapsack:');
    const weights = [1, 3, 4, 5];
    const values = [1, 4, 5, 7];
    console.log(`0/1 Knapsack: ${knapsack01(weights, values, 7)}`);
    console.log(`Unbounded Knapsack: ${unboundedKnapsack(weights, values, 7)}`);
    
    // 3. LCS
    console.log('\n3. Longest Common Subsequence:');
    console.log(`LCS("ABCDGH", "AEDFHR") = ${longestCommonSubsequence("ABCDGH", "AEDFHR")}`);
    console.log(`LCS string: "${getLCS("ABCDGH", "AEDFHR")}"`);
    
    // 4. LIS
    console.log('\n4. Longest Increasing Subsequence:');
    console.log(`LIS([10,9,2,5,3,7,101,18]) = ${longestIncreasingSubsequence([10,9,2,5,3,7,101,18])}`);
    
    // 5. Coin Change
    console.log('\n5. Coin Change:');
    console.log(`Min coins for 11 with [1,2,5]: ${coinChange([1,2,5], 11)}`);
    console.log(`Ways to make 4 with [1,2,3]: ${coinChangeWays([1,2,3], 4)}`);
    
    // 6. Edit Distance
    console.log('\n6. Edit Distance:');
    console.log(`Edit distance("horse", "ros") = ${editDistance("horse", "ros")}`);
    
    // 7. Matrix Chain Multiplication
    console.log('\n7. Matrix Chain Multiplication:');
    console.log(`Min multiplications [1,2,3,4]: ${matrixChainMultiplication([1,2,3,4])}`);
    
    // 8. Subset Sum
    console.log('\n8. Subset Sum:');
    console.log(`Can make 9 from [3,34,4,12,5,2]: ${subsetSum([3,34,4,12,5,2], 9)}`);
    console.log(`Subset for 9: [${findSubsetSum([3,34,4,12,5,2], 9)}]`);
    
    // 9. Partition Problem
    console.log('\n9. Partition Problem:');
    console.log(`Can partition [1,5,11,5]: ${canPartition([1,5,11,5])}`);
    
    // 10. Rod Cutting
    console.log('\n10. Rod Cutting:');
    const rodPrices = [1, 5, 8, 9, 10, 17, 17, 20];
    console.log(`Max profit for rod length 8: ${rodCutting(rodPrices, 8)}`);
    const rodResult = rodCuttingWithCuts(rodPrices, 8);
    console.log(`Cuts: [${rodResult.cuts}], Profit: ${rodResult.maxProfit}`);
}

// Run tests
runTests();