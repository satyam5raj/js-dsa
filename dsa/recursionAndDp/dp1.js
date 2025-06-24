// Dynamic Programming Real-World Applications in JavaScript

// ==================== TEXT PROCESSING ====================

/**
 * Edit Distance (Levenshtein Distance) - Used in spell checkers
 * Time: O(m*n), Space: O(m*n)
 */
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
                    dp[i-1][j],    // deletion
                    dp[i][j-1],    // insertion
                    dp[i-1][j-1]   // substitution
                );
            }
        }
    }
    return dp[m][n];
}

/**
 * Spell Checker using Edit Distance
 */
function spellChecker(word, dictionary, threshold = 2) {
    const suggestions = [];
    for (const dictWord of dictionary) {
        const distance = editDistance(word, dictWord);
        if (distance <= threshold) {
            suggestions.push({ word: dictWord, distance });
        }
    }
    return suggestions.sort((a, b) => a.distance - b.distance);
}

/**
 * Longest Common Subsequence - Used in diff tools, plagiarism detection
 * Time: O(m*n), Space: O(m*n)
 */
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i-1] === text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    // Reconstruct the LCS
    let lcs = '';
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (text1[i-1] === text2[j-1]) {
            lcs = text1[i-1] + lcs;
            i--; j--;
        } else if (dp[i-1][j] > dp[i][j-1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return { length: dp[m][n], sequence: lcs };
}

/**
 * Plagiarism Detection using LCS
 */
function plagiarismDetection(text1, text2) {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const lcs = longestCommonSubsequence(words1, words2);
    const similarity = (2 * lcs.length) / (words1.length + words2.length);
    
    return {
        similarity: Math.round(similarity * 100),
        commonWords: lcs.length,
        suspiciousLevel: similarity > 0.3 ? 'High' : similarity > 0.15 ? 'Medium' : 'Low'
    };
}

// ==================== BIOINFORMATICS ====================

/**
 * DNA Sequence Alignment using LCS
 */
function dnaSequenceAlignment(seq1, seq2) {
    const lcs = longestCommonSubsequence(seq1, seq2);
    const alignmentScore = lcs.length;
    const similarity = (alignmentScore / Math.max(seq1.length, seq2.length)) * 100;
    
    return {
        alignmentScore,
        similarity: Math.round(similarity),
        commonSequence: lcs.sequence
    };
}

/**
 * Protein Sequence Similarity with Scoring Matrix
 */
function proteinAlignment(seq1, seq2, matchScore = 2, mismatchPenalty = -1, gapPenalty = -1) {
    const m = seq1.length;
    const n = seq2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Initialize with gap penalties
    for (let i = 0; i <= m; i++) dp[i][0] = i * gapPenalty;
    for (let j = 0; j <= n; j++) dp[0][j] = j * gapPenalty;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const match = dp[i-1][j-1] + (seq1[i-1] === seq2[j-1] ? matchScore : mismatchPenalty);
            const deleteGap = dp[i-1][j] + gapPenalty;
            const insertGap = dp[i][j-1] + gapPenalty;
            
            dp[i][j] = Math.max(match, deleteGap, insertGap);
        }
    }
    
    return dp[m][n];
}

// ==================== FINANCIAL MODELING ====================

/**
 * 0/1 Knapsack for Portfolio Optimization
 * Each investment has a cost and expected return
 */
function portfolioOptimization(investments, budget) {
    const n = investments.length;
    const dp = Array(n + 1).fill().map(() => Array(budget + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        const { cost, return: expectedReturn, name } = investments[i-1];
        for (let w = 0; w <= budget; w++) {
            if (cost <= w) {
                dp[i][w] = Math.max(
                    dp[i-1][w], 
                    dp[i-1][w - cost] + expectedReturn
                );
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    
    // Reconstruct selected investments
    const selected = [];
    let w = budget;
    for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] !== dp[i-1][w]) {
            selected.push(investments[i-1]);
            w -= investments[i-1].cost;
        }
    }
    
    return {
        maxReturn: dp[n][budget],
        selectedInvestments: selected.reverse(),
        totalCost: selected.reduce((sum, inv) => sum + inv.cost, 0)
    };
}

/**
 * Stock Trading with Cooldown (Dynamic Programming)
 */
function stockTradingWithCooldown(prices) {
    if (prices.length <= 1) return 0;
    
    const n = prices.length;
    const hold = Array(n).fill(0);    // Maximum profit when holding stock
    const sold = Array(n).fill(0);    // Maximum profit when just sold
    const rest = Array(n).fill(0);    // Maximum profit when resting
    
    hold[0] = -prices[0];
    
    for (let i = 1; i < n; i++) {
        hold[i] = Math.max(hold[i-1], rest[i-1] - prices[i]);
        sold[i] = hold[i-1] + prices[i];
        rest[i] = Math.max(rest[i-1], sold[i-1]);
    }
    
    return Math.max(sold[n-1], rest[n-1]);
}

// ==================== OPERATIONS RESEARCH ====================

/**
 * Minimum Cost Path - Resource Allocation
 */
function minCostPath(costMatrix) {
    const m = costMatrix.length;
    const n = costMatrix[0].length;
    const dp = Array(m).fill().map(() => Array(n).fill(Infinity));
    
    dp[0][0] = costMatrix[0][0];
    
    // Fill first row
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j-1] + costMatrix[0][j];
    }
    
    // Fill first column
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i-1][0] + costMatrix[i][0];
    }
    
    // Fill rest of the matrix
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = costMatrix[i][j] + Math.min(dp[i-1][j], dp[i][j-1]);
        }
    }
    
    return dp[m-1][n-1];
}

/**
 * Job Scheduling with Deadlines (Weighted Job Scheduling)
 */
function weightedJobScheduling(jobs) {
    // Sort jobs by finish time
    jobs.sort((a, b) => a.finish - b.finish);
    const n = jobs.length;
    const dp = Array(n).fill(0);
    
    dp[0] = jobs[0].profit;
    
    for (let i = 1; i < n; i++) {
        // Include current job
        let includeProfit = jobs[i].profit;
        let latestNonConflict = -1;
        
        // Find the latest job that doesn't conflict
        for (let j = i - 1; j >= 0; j--) {
            if (jobs[j].finish <= jobs[i].start) {
                latestNonConflict = j;
                break;
            }
        }
        
        if (latestNonConflict !== -1) {
            includeProfit += dp[latestNonConflict];
        }
        
        // Take maximum of including or excluding current job
        dp[i] = Math.max(includeProfit, dp[i-1]);
    }
    
    return dp[n-1];
}

// ==================== GAME DEVELOPMENT ====================

/**
 * Grid-based Pathfinding with DP (for simple cases)
 */
function uniquePaths(m, n, obstacles = []) {
    const dp = Array(m).fill().map(() => Array(n).fill(0));
    const obstacleSet = new Set(obstacles.map(([r, c]) => `${r},${c}`));
    
    // Base case
    if (!obstacleSet.has('0,0')) dp[0][0] = 1;
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleSet.has(`${i},${j}`)) continue;
            
            if (i > 0) dp[i][j] += dp[i-1][j];
            if (j > 0) dp[i][j] += dp[i][j-1];
        }
    }
    
    return dp[m-1][n-1];
}

// ==================== MACHINE LEARNING ====================

/**
 * Viterbi Algorithm for Hidden Markov Models (Simplified)
 */
function viterbiAlgorithm(observations, states, startProb, transProb, emitProb) {
    const n = observations.length;
    const numStates = states.length;
    
    // Initialize DP table
    const dp = Array(n).fill().map(() => Array(numStates).fill(0));
    const path = Array(n).fill().map(() => Array(numStates).fill(0));
    
    // Initialize first observation
    for (let s = 0; s < numStates; s++) {
        dp[0][s] = startProb[s] * emitProb[s][observations[0]];
    }
    
    // Fill DP table
    for (let t = 1; t < n; t++) {
        for (let s = 0; s < numStates; s++) {
            let maxProb = 0;
            let maxState = 0;
            
            for (let prevS = 0; prevS < numStates; prevS++) {
                const prob = dp[t-1][prevS] * transProb[prevS][s] * emitProb[s][observations[t]];
                if (prob > maxProb) {
                    maxProb = prob;
                    maxState = prevS;
                }
            }
            
            dp[t][s] = maxProb;
            path[t][s] = maxState;
        }
    }
    
    // Find best final state
    let maxProb = 0;
    let bestState = 0;
    for (let s = 0; s < numStates; s++) {
        if (dp[n-1][s] > maxProb) {
            maxProb = dp[n-1][s];
            bestState = s;
        }
    }
    
    // Backtrack to find best path
    const bestPath = Array(n);
    bestPath[n-1] = bestState;
    for (let t = n-2; t >= 0; t--) {
        bestPath[t] = path[t+1][bestPath[t+1]];
    }
    
    return { probability: maxProb, path: bestPath };
}

// ==================== COMPRESSION ALGORITHMS ====================

/**
 * Optimal Binary Search Tree (Huffman-like optimal encoding)
 */
function optimalBST(keys, freq) {
    const n = keys.length;
    const dp = Array(n).fill().map(() => Array(n).fill(0));
    
    // Cost for single keys
    for (let i = 0; i < n; i++) {
        dp[i][i] = freq[i];
    }
    
    // Build table for chains of increasing length
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            dp[i][j] = Infinity;
            
            // Sum of frequencies
            const sum = freq.slice(i, j + 1).reduce((a, b) => a + b, 0);
            
            // Try making each key the root
            for (let r = i; r <= j; r++) {
                const cost = sum + 
                    (r > i ? dp[i][r-1] : 0) + 
                    (r < j ? dp[r+1][j] : 0);
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    
    return dp[0][n-1];
}

// ==================== EXAMPLE USAGE AND TESTS ====================

// Test Text Processing
console.log("=== TEXT PROCESSING ===");
console.log("Edit Distance 'kitten' vs 'sitting':", editDistance("kitten", "sitting"));

const dictionary = ["hello", "world", "javascript", "programming", "algorithm"];
console.log("Spell check for 'javascrpt':", spellChecker("javascrpt", dictionary));

const text1 = "the quick brown fox jumps over the lazy dog";
const text2 = "a quick brown fox leaps over a lazy dog";
console.log("Plagiarism detection:", plagiarismDetection(text1, text2));

// Test Bioinformatics
console.log("\n=== BIOINFORMATICS ===");
console.log("DNA alignment ATCG vs AGTC:", dnaSequenceAlignment("ATCG", "AGTC"));

// Test Financial Modeling
console.log("\n=== FINANCIAL MODELING ===");
const investments = [
    { name: "Stock A", cost: 10, return: 15 },
    { name: "Stock B", cost: 20, return: 25 },
    { name: "Bond C", cost: 15, return: 18 },
    { name: "ETF D", cost: 25, return: 30 }
];
console.log("Portfolio optimization (budget 35):", portfolioOptimization(investments, 35));

const stockPrices = [1, 2, 3, 0, 2];
console.log("Stock trading with cooldown:", stockTradingWithCooldown(stockPrices));

// Test Operations Research
console.log("\n=== OPERATIONS RESEARCH ===");
const costMatrix = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
];
console.log("Min cost path:", minCostPath(costMatrix));

const jobs = [
    { start: 1, finish: 3, profit: 20 },
    { start: 2, finish: 5, profit: 20 },
    { start: 3, finish: 10, profit: 100 },
    { start: 4, finish: 6, profit: 70 }
];
console.log("Weighted job scheduling:", weightedJobScheduling(jobs));

// Test Game Development
console.log("\n=== GAME DEVELOPMENT ===");
console.log("Unique paths in 3x3 grid:", uniquePaths(3, 3));

// Test Compression
console.log("\n=== COMPRESSION ===");
const keys = ['A', 'B', 'C'];
const frequencies = [0.5, 0.3, 0.2];
console.log("Optimal BST cost:", optimalBST(keys, frequencies));

console.log("\nAll Dynamic Programming examples completed!");