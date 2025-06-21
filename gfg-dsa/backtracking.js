// ========================================
// BACKTRACKING PROBLEMS SOLUTIONS
// ========================================

// Problem 1: Rat in a Maze
/*
Question: A rat starts from (0,0) and needs to reach (n-1,n-1) in a maze.
The rat can only move right or down. Find if a path exists.
1 represents open path, 0 represents blocked path.

Approach: Use backtracking to explore all possible paths.
- Try moving right and down from each position
- Mark visited cells to avoid cycles
- Backtrack if no solution found

Time Complexity: O(2^(n²)) - In worst case, we explore all possible paths
Space Complexity: O(n²) - For recursion stack and solution matrix
*/

function ratInMaze(maze) {
    const n = maze.length;
    const solution = Array(n).fill(null).map(() => Array(n).fill(0));
    
    function isSafe(x, y) {
        return x >= 0 && y >= 0 && x < n && y < n && maze[x][y] === 1;
    }
    
    function solveMaze(x, y) {
        // Base case: reached destination
        if (x === n - 1 && y === n - 1 && maze[x][y] === 1) {
            solution[x][y] = 1;
            return true;
        }
        
        // Check if current position is valid
        if (isSafe(x, y)) {
            // Mark current cell as part of solution
            solution[x][y] = 1;
            
            // Move right
            if (solveMaze(x, y + 1)) return true;
            
            // Move down
            if (solveMaze(x + 1, y)) return true;
            
            // Backtrack: unmark current cell
            solution[x][y] = 0;
            return false;
        }
        
        return false;
    }
    
    if (solveMaze(0, 0)) {
        return solution;
    }
    return null;
}

// Test case for Rat in Maze
console.log("=== Rat in Maze ===");
const maze1 = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1]
];
console.log("Result:", ratInMaze(maze1));

// ========================================

// Problem 2: N-Queens Problem
/*
Question: Place N queens on NxN chessboard such that no two queens attack each other.
Print all possible solutions.

Approach: Use backtracking to place queens column by column.
- For each column, try placing queen in each row
- Check if placement is safe (no conflicts with previously placed queens)
- Recursively place remaining queens

Time Complexity: O(N!) - We have N choices for first queen, N-2 for second, etc.
Space Complexity: O(N²) - For storing the board
*/

function nQueens(n) {
    const solutions = [];
    const board = Array(n).fill(null).map(() => Array(n).fill(0));
    
    function isSafe(row, col) {
        // Check this row on left side
        for (let i = 0; i < col; i++) {
            if (board[row][i] === 1) return false;
        }
        
        // Check upper diagonal on left side
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 1) return false;
        }
        
        // Check lower diagonal on left side
        for (let i = row, j = col; j >= 0 && i < n; i++, j--) {
            if (board[i][j] === 1) return false;
        }
        
        return true;
    }
    
    function solve(col) {
        // Base case: all queens placed
        if (col >= n) {
            solutions.push(board.map(row => [...row]));
            return;
        }
        
        // Try placing queen in each row of current column
        for (let i = 0; i < n; i++) {
            if (isSafe(i, col)) {
                board[i][col] = 1;
                solve(col + 1);
                board[i][col] = 0; // Backtrack
            }
        }
    }
    
    solve(0);
    return solutions;
}

// Test case for N-Queens
console.log("\n=== N-Queens (N=4) ===");
const queenSolutions = nQueens(4);
console.log(`Found ${queenSolutions.length} solutions:`);
queenSolutions.forEach((solution, index) => {
    console.log(`Solution ${index + 1}:`);
    solution.forEach(row => console.log(row.join(' ')));
    console.log();
});

// ========================================

// Problem 3: Word Break Problem
/*
Question: Given a string and a dictionary, determine if the string can be 
segmented into space-separated sequence of dictionary words.

Approach: Use backtracking to try all possible word combinations.
- At each position, try all dictionary words that match
- Recursively check remaining string
- Backtrack if no valid segmentation found

Time Complexity: O(2^n * m) where n is string length, m is dictionary size
Space Complexity: O(n) - For recursion stack
*/

function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const result = [];
    
    function backtrack(start, path) {
        if (start === s.length) {
            result.push([...path]);
            return;
        }
        
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            if (wordSet.has(word)) {
                path.push(word);
                backtrack(end, path);
                path.pop(); // Backtrack
            }
        }
    }
    
    backtrack(0, []);
    return result;
}

// Test case for Word Break
console.log("\n=== Word Break ===");
const s1 = "catsanddog";
const dict1 = ["cat", "cats", "and", "sand", "dog"];
const wordBreakResults = wordBreak(s1, dict1);
console.log("String:", s1);
console.log("Dictionary:", dict1);
console.log("All possible breaks:");
wordBreakResults.forEach(result => console.log(result.join(" ")));

// ========================================

// Problem 4: Remove Invalid Parentheses
/*
Question: Remove minimum number of invalid parentheses to make the input string valid.
Return all possible results.

Approach: Use BFS with backtracking to find minimum removals.
- Calculate minimum removals needed for '(' and ')'
- Use backtracking to try removing different combinations
- Validate each result

Time Complexity: O(2^n) where n is string length
Space Complexity: O(n) - For recursion stack
*/

function removeInvalidParentheses(s) {
    const result = [];
    
    function getMinRemovals(str) {
        let left = 0, right = 0;
        for (let char of str) {
            if (char === '(') left++;
            else if (char === ')') {
                if (left > 0) left--;
                else right++;
            }
        }
        return { left, right };
    }
    
    function isValid(str) {
        let count = 0;
        for (let char of str) {
            if (char === '(') count++;
            else if (char === ')') {
                count--;
                if (count < 0) return false;
            }
        }
        return count === 0;
    }
    
    function backtrack(str, index, leftRem, rightRem, leftCount, rightCount, current) {
        if (index === str.length) {
            if (leftRem === 0 && rightRem === 0 && isValid(current)) {
                result.push(current);
            }
            return;
        }
        
        const char = str[index];
        
        // Option 1: Remove current character
        if ((char === '(' && leftRem > 0) || (char === ')' && rightRem > 0)) {
            backtrack(str, index + 1, 
                     leftRem - (char === '(' ? 1 : 0), 
                     rightRem - (char === ')' ? 1 : 0), 
                     leftCount, rightCount, current);
        }
        
        // Option 2: Keep current character
        backtrack(str, index + 1, leftRem, rightRem,
                 leftCount + (char === '(' ? 1 : 0),
                 rightCount + (char === ')' ? 1 : 0),
                 current + char);
    }
    
    const { left, right } = getMinRemovals(s);
    backtrack(s, 0, left, right, 0, 0, "");
    
    return [...new Set(result)]; // Remove duplicates
}

// Test case for Remove Invalid Parentheses
console.log("\n=== Remove Invalid Parentheses ===");
const invalidParens = "()())()";
const validParens = removeInvalidParentheses(invalidParens);
console.log("Input:", invalidParens);
console.log("Valid parentheses:", validParens);

// ========================================

// Problem 5: Sudoku Solver
/*
Question: Solve a 9x9 Sudoku puzzle using backtracking.

Approach: Try placing numbers 1-9 in empty cells.
- Find empty cell
- Try numbers 1-9 that don't violate Sudoku rules
- Recursively solve remaining puzzle
- Backtrack if no solution found

Time Complexity: O(9^(n*n)) where n=9, in worst case
Space Complexity: O(n*n) - For recursion stack
*/

function solveSudoku(board) {
    function isValid(board, row, col, num) {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num) return false;
        }
        
        // Check column
        for (let x = 0; x < 9; x++) {
            if (board[x][col] === num) return false;
        }
        
        // Check 3x3 box
        const startRow = row - row % 3;
        const startCol = col - col % 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i + startRow][j + startCol] === num) return false;
            }
        }
        
        return true;
    }
    
    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            
                            if (solve()) return true;
                            
                            board[row][col] = 0; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    return solve();
}

// Test case for Sudoku Solver
console.log("\n=== Sudoku Solver ===");
const sudokuBoard = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
];
console.log("Initial board:");
sudokuBoard.forEach(row => console.log(row.join(' ')));
if (solveSudoku(sudokuBoard)) {
    console.log("\nSolved board:");
    sudokuBoard.forEach(row => console.log(row.join(' ')));
}

// ========================================

// Problem 6: M Coloring Problem
/*
Question: Given an undirected graph and M colors, determine if the graph can be 
colored using at most M colors such that no two adjacent vertices have same color.

Approach: Use backtracking to assign colors to vertices.
- Try assigning each color to current vertex
- Check if assignment is safe (no adjacent vertex has same color)
- Recursively color remaining vertices

Time Complexity: O(M^V) where V is number of vertices
Space Complexity: O(V) - For recursion stack and color array
*/

function graphColoring(graph, m) {
    const V = graph.length;
    const color = Array(V).fill(0);
    
    function isSafe(v, c) {
        for (let i = 0; i < V; i++) {
            if (graph[v][i] && color[i] === c) {
                return false;
            }
        }
        return true;
    }
    
    function solve(v) {
        if (v === V) return true;
        
        for (let c = 1; c <= m; c++) {
            if (isSafe(v, c)) {
                color[v] = c;
                if (solve(v + 1)) return true;
                color[v] = 0; // Backtrack
            }
        }
        return false;
    }
    
    if (solve(0)) {
        return color;
    }
    return null;
}

// Test case for M Coloring
console.log("\n=== M Coloring Problem ===");
const colorGraph = [
    [0, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 0]
];
const colors = graphColoring(colorGraph, 3);
console.log("Graph coloring with 3 colors:", colors);

// ========================================

// Problem 7: Palindromic Partitions
/*
Question: Find all possible palindromic partitions of a given string.

Approach: Use backtracking to generate all partitions.
- At each position, try all possible palindromic substrings
- Recursively partition remaining string
- Backtrack to try other combinations

Time Complexity: O(2^n * n) where n is string length
Space Complexity: O(n) - For recursion stack
*/

function palindromicPartitions(s) {
    const result = [];
    
    function isPalindrome(str, start, end) {
        while (start < end) {
            if (str[start] !== str[end]) return false;
            start++;
            end--;
        }
        return true;
    }
    
    function backtrack(start, path) {
        if (start === s.length) {
            result.push([...path]);
            return;
        }
        
        for (let end = start; end < s.length; end++) {
            if (isPalindrome(s, start, end)) {
                path.push(s.substring(start, end + 1));
                backtrack(end + 1, path);
                path.pop(); // Backtrack
            }
        }
    }
    
    backtrack(0, []);
    return result;
}

// Test case for Palindromic Partitions
console.log("\n=== Palindromic Partitions ===");
const palindromeString = "aab";
const partitions = palindromicPartitions(palindromeString);
console.log("String:", palindromeString);
console.log("All palindromic partitions:");
partitions.forEach(partition => console.log(partition));

// ========================================

// Problem 8: Subset Sum Problem
/*
Question: Find all subsets of given set with sum equal to given sum.

Approach: Use backtracking to generate all possible subsets.
- Include/exclude each element
- Track current sum
- Add to result when target sum is reached

Time Complexity: O(2^n) where n is number of elements
Space Complexity: O(n) - For recursion stack
*/

function subsetSum(nums, target) {
    const result = [];
    
    function backtrack(start, currentSum, path) {
        if (currentSum === target) {
            result.push([...path]);
            return;
        }
        
        if (currentSum > target || start >= nums.length) {
            return;
        }
        
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, currentSum + nums[i], path);
            path.pop(); // Backtrack
        }
    }
    
    backtrack(0, 0, []);
    return result;
}

// Test case for Subset Sum
console.log("\n=== Subset Sum Problem ===");
const subsetNums = [2, 3, 6, 7];
const targetSum = 7;
const subsets = subsetSum(subsetNums, targetSum);
console.log(`Numbers: [${subsetNums.join(', ')}], Target: ${targetSum}`);
console.log("Subsets with target sum:");
subsets.forEach(subset => console.log(subset));

// ========================================

// Problem 9: Knight's Tour Problem
/*
Question: Find a sequence of moves for a knight on a chessboard such that 
the knight visits every square exactly once.

Approach: Use backtracking with Warnsdorff's heuristic.
- Try all possible knight moves from current position
- Use heuristic to choose move with fewest onward moves first
- Backtrack if no solution found

Time Complexity: O(8^(n²)) in worst case
Space Complexity: O(n²) - For board and recursion stack
*/

function knightsTour(n) {
    const board = Array(n).fill(null).map(() => Array(n).fill(-1));
    const moves = [
        [2, 1], [1, 2], [-1, 2], [-2, 1],
        [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
    
    function isValid(x, y) {
        return x >= 0 && y >= 0 && x < n && y < n && board[x][y] === -1;
    }
    
    function getDegree(x, y) {
        let count = 0;
        for (let [dx, dy] of moves) {
            if (isValid(x + dx, y + dy)) count++;
        }
        return count;
    }
    
    function solve(x, y, moveCount) {
        board[x][y] = moveCount;
        
        if (moveCount === n * n - 1) return true;
        
        // Get all possible moves and sort by Warnsdorff's heuristic
        const nextMoves = [];
        for (let [dx, dy] of moves) {
            const nextX = x + dx;
            const nextY = y + dy;
            if (isValid(nextX, nextY)) {
                nextMoves.push({
                    x: nextX,
                    y: nextY,
                    degree: getDegree(nextX, nextY)
                });
            }
        }
        
        nextMoves.sort((a, b) => a.degree - b.degree);
        
        for (let move of nextMoves) {
            if (solve(move.x, move.y, moveCount + 1)) {
                return true;
            }
        }
        
        board[x][y] = -1; // Backtrack
        return false;
    }
    
    if (solve(0, 0, 0)) {
        return board;
    }
    return null;
}

// Test case for Knight's Tour (smaller board for demo)
console.log("\n=== Knight's Tour (5x5) ===");
const knightBoard = knightsTour(5);
if (knightBoard) {
    console.log("Knight's tour solution:");
    knightBoard.forEach(row => 
        console.log(row.map(x => x.toString().padStart(2, ' ')).join(' '))
    );
} else {
    console.log("No solution found");
}

// ========================================

// Problem 10: Tug of War
/*
Question: Divide a set of integers into two subsets such that the difference 
between their sums is minimized.

Approach: Use backtracking to try all possible divisions.
- Include each element in either subset
- Track sums of both subsets
- Find minimum difference

Time Complexity: O(2^n) where n is number of elements
Space Complexity: O(n) - For recursion stack
*/

function tugOfWar(nums) {
    const n = nums.length;
    let minDiff = Infinity;
    let bestSet1 = [];
    let bestSet2 = [];
    
    function backtrack(index, set1, set2, sum1, sum2) {
        if (index === n) {
            const diff = Math.abs(sum1 - sum2);
            if (diff < minDiff) {
                minDiff = diff;
                bestSet1 = [...set1];
                bestSet2 = [...set2];
            }
            return;
        }
        
        // Add to first set
        if (set1.length < Math.ceil(n / 2)) {
            set1.push(nums[index]);
            backtrack(index + 1, set1, set2, sum1 + nums[index], sum2);
            set1.pop();
        }
        
        // Add to second set
        if (set2.length < Math.ceil(n / 2)) {
            set2.push(nums[index]);
            backtrack(index + 1, set1, set2, sum1, sum2 + nums[index]);
            set2.pop();
        }
    }
    
    backtrack(0, [], [], 0, 0);
    return { set1: bestSet1, set2: bestSet2, difference: minDiff };
}

// Test case for Tug of War
console.log("\n=== Tug of War ===");
const tugNums = [3, 4, 5, -3, 100, 1, 89, 54, 23, 20];
const tugResult = tugOfWar(tugNums);
console.log("Numbers:", tugNums);
console.log("Set 1:", tugResult.set1, "Sum:", tugResult.set1.reduce((a, b) => a + b, 0));
console.log("Set 2:", tugResult.set2, "Sum:", tugResult.set2.reduce((a, b) => a + b, 0));
console.log("Minimum difference:", tugResult.difference);

// ========================================

// Problem 11: Shortest Safe Route with Landmines
/*
Question: Find shortest safe route in a path with landmines.
Landmines affect adjacent cells making them unsafe.

Approach: Mark unsafe cells, then use BFS to find shortest path.
- First mark all cells adjacent to landmines as unsafe
- Use BFS from source to find shortest safe path
- Only move through safe cells

Time Complexity: O(m*n) where m,n are matrix dimensions
Space Complexity: O(m*n) - For visited array and queue
*/

function shortestSafeRoute(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    // Mark unsafe cells
    const safe = matrix.map(row => [...row]);
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 0) { // Landmine
                // Mark adjacent cells as unsafe
                for (let [dx, dy] of directions) {
                    const ni = i + dx, nj = j + dy;
                    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
                        safe[ni][nj] = 0;
                    }
                }
            }
        }
    }
    
    // Find shortest path using BFS
    const queue = [];
    const visited = Array(rows).fill(null).map(() => Array(cols).fill(false));
    
    // Start from first column safe cells
    for (let i = 0; i < rows; i++) {
        if (safe[i][0] === 1) {
            queue.push([i, 0, 0]); // row, col, distance
            visited[i][0] = true;
        }
    }
    
    while (queue.length > 0) {
        const [row, col, dist] = queue.shift();
        
        // Reached last column
        if (col === cols - 1) {
            return dist;
        }
        
        for (let [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;
            
            if (newRow >= 0 && newRow < rows && 
                newCol >= 0 && newCol < cols &&
                safe[newRow][newCol] === 1 && 
                !visited[newRow][newCol]) {
                
                visited[newRow][newCol] = true;
                queue.push([newRow, newCol, dist + 1]);
            }
        }
    }
    
    return -1; // No safe route found
}

// Test case for Shortest Safe Route
console.log("\n=== Shortest Safe Route with Landmines ===");
const landmineMatrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
const safeRoute = shortestSafeRoute(landmineMatrix);
console.log("Shortest safe route length:", safeRoute);

// ========================================

// Problem 12: Combination Sum
/*
Question: Find all unique combinations where candidate numbers sum to target.
Each number can be used multiple times.

Approach: Use backtracking to build combinations.
- Try adding each candidate to current combination
- Allow reuse of same candidate
- Backtrack when sum exceeds target

Time Complexity: O(2^target) in worst case
Space Complexity: O(target/min(candidates)) - For recursion depth
*/

function combinationSum(candidates, target) {
    const result = [];
    candidates.sort((a, b) => a - b);
    
    function backtrack(start, currentSum, path) {
        if (currentSum === target) {
            result.push([...path]);
            return;
        }
        
        if (currentSum > target) return;
        
        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            backtrack(i, currentSum + candidates[i], path); // i, not i+1 for reuse
            path.pop(); // Backtrack
        }
    }
    
    backtrack(0, 0, []);
    return result;
}

// Test case for Combination Sum
console.log("\n=== Combination Sum ===");
const candidates = [2, 3, 6, 7];
const combTarget = 7;
const combinations = combinationSum(candidates, combTarget);
console.log(`Candidates: [${candidates.join(', ')}], Target: ${combTarget}`);
console.log("All combinations:");
combinations.forEach(combo => console.log(combo));

// ========================================

// Problem 13: Maximum Number with K Swaps
/*
Question: Find the maximum number possible by doing at most K swaps.

Approach: Use backtracking to try all possible swaps.
- At each step, try swapping current digit with all larger digits to its right
- Keep track of remaining swaps
- Choose the swap that gives maximum result

Time Complexity: O(n! * k) where n is number of digits
Space Complexity: O(n) - For recursion stack
*/

function maximizeNumber(num, k) {
    const digits = num.split('');
    let maxNum = num;
    
    function backtrack(arr, swapsLeft, index) {
        const current = arr.join('');
        if (current > maxNum) {
            maxNum = current;
        }
        
        if (swapsLeft === 0 || index >= arr.length) return;
        
        // Find maximum digit from current position onwards
        let maxDigit = arr[index];
        for (let i = index + 1; i < arr.length; i++) {
            if (arr[i] > maxDigit) {
                maxDigit = arr[i];
            }
        }
        
        // If current digit is already maximum, move to next
        if (arr[index] === maxDigit) {
            backtrack(arr, swapsLeft, index + 1);
            return;
        }
        
        // Try swapping with all occurrences of maximum digit
        for (let i = arr.length - 1; i > index; i--) {
            if (arr[i] === maxDigit) {
                // Swap
                [arr[index], arr[i]] = [arr[i], arr[index]];
                backtrack(arr, swapsLeft - 1, index + 1);
                // Backtrack
                [arr[index], arr[i]] = [arr[i], arr[index]];
            }
        }
        
        // Also try without swapping
        backtrack(arr, swapsLeft, index + 1);
    }
    
    backtrack(digits, k, 0);
    return maxNum;
}

// Test case for Maximum Number with K Swaps
console.log("\n=== Maximum Number with K Swaps ===");
const originalNum = "1234567";
const maxSwaps = 4;
const maxResult = maximizeNumber(originalNum, maxSwaps);
console.log(`Original: ${originalNum}, Max swaps: ${maxSwaps}`);
console.log(`Maximum possible: ${maxResult}`);

// ========================================

// Problem 14: All Permutations of String
/*
Question: Print all permutations of a given string.

Approach: Use backtracking to generate permutations.
- Fix each character at first position
- Generate permutations of remaining characters
- Swap characters to generate different arrangements

Time Complexity: O(n! * n) where n is string length
Space Complexity: O(n) - For recursion stack
*/

function stringPermutations(str) {
    const result = [];
    const chars = str.split('');
    
    function backtrack(start) {
        if (start === chars.length) {
            result.push(chars.join(''));
            return;
        }
        
        for (let i = start; i < chars.length; i++) {
            // Swap characters
            [chars[start], chars[i]] = [chars[i], chars[start]];
            
            // Generate permutations for remaining characters
            backtrack(start + 1);
            
            // Backtrack - restore original order
            [chars[start], chars[i]] = [chars[i], chars[start]];
        }
    }
    
    backtrack(0);
    return result;
}

// Test case for String Permutations
console.log("\n=== All Permutations of String ===");
const permString = "ABC";
const permutations = stringPermutations(permString);
console.log(`String: ${permString}`);
console.log("All permutations:");
permutations.forEach((perm, index) => console.log(`${index + 1}: ${perm}`));

// ========================================

// Problem 15: Path of More Than K Length
/*
Question: Find if there is a simple path of more than k length from a source vertex.
A simple path doesn't have any repeated vertices.

Approach: Use DFS with backtracking to explore all paths.
- Start from source vertex
- Explore all adjacent unvisited vertices
- Keep track of current path length
- Backtrack when path length exceeds k or no more vertices

Time Complexity: O(V!) in worst case where V is number of vertices
Space Complexity: O(V) - For recursion stack and visited array
*/

function pathMoreThanK(graph, src, k) {
    const V = graph.length;
    const visited = Array(V).fill(false);
    
    function dfs(u, currentLength) {
        // If we found a path longer than k, return true
        if (currentLength > k) return true;
        
        visited[u] = true;
        
        // Explore all adjacent vertices
        for (let v = 0; v < V; v++) {
            if (graph[u][v] !== 0 && !visited[v]) {
                if (dfs(v, currentLength + graph[u][v])) {
                    return true;
                }
            }
        }
        
        // Backtrack
        visited[u] = false;
        return false;
    }
    
    return dfs(src, 0);
}

// Test case for Path More Than K Length
console.log("\n=== Path of More Than K Length ===");
const pathGraph = [
    [0, 4, 0, 0, 0, 0, 0, 8, 0],
    [4, 0, 8, 0, 0, 0, 0, 11, 0],
    [0, 8, 0, 7, 0, 4, 0, 0, 2],
    [0, 0, 7, 0, 9, 14, 0, 0, 0],
    [0, 0, 0, 9, 0, 10, 0, 0, 0],
    [0, 0, 4, 14, 10, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 1, 6],
    [8, 11, 0, 0, 0, 0, 1, 0, 7],
    [0, 0, 2, 0, 0, 0, 6, 7, 0]
];
const hasLongPath = pathMoreThanK(pathGraph, 0, 60);
console.log("Graph has path longer than 60:", hasLongPath);

// ========================================

// Problem 16: Longest Possible Route in Matrix with Hurdles
/*
Question: Find the longest possible route in a matrix with hurdles.
Start from top-left, reach bottom-right, visiting maximum cells.

Approach: Use backtracking to explore all possible paths.
- Move in all 4 directions from current cell
- Mark visited cells to avoid cycles
- Keep track of maximum path length
- Backtrack to try other paths

Time Complexity: O(4^(m*n)) where m,n are matrix dimensions
Space Complexity: O(m*n) - For recursion stack and visited array
*/

function longestRoute(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let maxLength = -1;
    
    function isValid(x, y) {
        return x >= 0 && y >= 0 && x < rows && y < cols && matrix[x][y] === 1;
    }
    
    function dfs(x, y, destX, destY, visited, length) {
        // If reached destination
        if (x === destX && y === destY) {
            maxLength = Math.max(maxLength, length);
            return;
        }
        
        // Explore all 4 directions
        for (let [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            
            if (isValid(newX, newY) && !visited[newX][newY]) {
                visited[newX][newY] = true;
                dfs(newX, newY, destX, destY, visited, length + 1);
                visited[newX][newY] = false; // Backtrack
            }
        }
    }
    
    if (matrix[0][0] === 1 && matrix[rows-1][cols-1] === 1) {
        const visited = Array(rows).fill(null).map(() => Array(cols).fill(false));
        visited[0][0] = true;
        dfs(0, 0, rows-1, cols-1, visited, 0);
    }
    
    return maxLength;
}

// Test case for Longest Route
console.log("\n=== Longest Possible Route in Matrix ===");
const routeMatrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
const longestPath = longestRoute(routeMatrix);
console.log("Longest route length:", longestPath);

// ========================================

// Problem 17: All Paths from Top-Left to Bottom-Right
/*
Question: Print all possible paths from top left to bottom right of a mXn matrix.
You can only move right or down.

Approach: Use backtracking to generate all paths.
- From each cell, try moving right and down
- Keep track of current path
- Add path to result when destination is reached

Time Complexity: O(2^(m+n)) where m,n are matrix dimensions
Space Complexity: O(m+n) - For recursion stack and path storage
*/

function allPaths(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
    
    function findPaths(x, y, path) {
        // Add current cell to path
        path.push(matrix[x][y]);
        
        // If reached destination
        if (x === rows - 1 && y === cols - 1) {
            result.push([...path]);
        } else {
            // Move right
            if (y + 1 < cols) {
                findPaths(x, y + 1, path);
            }
            
            // Move down
            if (x + 1 < rows) {
                findPaths(x + 1, y, path);
            }
        }
        
        // Backtrack
        path.pop();
    }
    
    findPaths(0, 0, []);
    return result;
}

// Test case for All Paths
console.log("\n=== All Paths from Top-Left to Bottom-Right ===");
const pathMatrix = [
    [1, 2, 3],
    [4, 5, 6]
];
const allPathsResult = allPaths(pathMatrix);
console.log("Matrix:");
pathMatrix.forEach(row => console.log(row));
console.log("All paths:");
allPathsResult.forEach((path, index) => 
    console.log(`Path ${index + 1}: [${path.join(' -> ')}]`)
);

// ========================================

// Problem 18: Partition into K Subsets with Equal Sum
/*
Question: Partition a set into K subsets with equal sum.

Approach: Use backtracking to assign elements to subsets.
- Calculate target sum for each subset
- Try assigning each element to each subset
- Ensure no subset exceeds target sum
- Backtrack if assignment doesn't work

Time Complexity: O(k^n) where n is number of elements
Space Complexity: O(k + n) - For subset arrays and recursion stack
*/

function partitionKSubsets(nums, k) {
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % k !== 0) return false;
    
    const target = sum / k;
    const subsets = Array(k).fill(0);
    nums.sort((a, b) => b - a); // Sort in descending order for optimization
    
    function backtrack(index) {
        if (index === nums.length) {
            // Check if all subsets have target sum
            return subsets.every(sum => sum === target);
        }
        
        const num = nums[index];
        
        // Try putting current number in each subset
        for (let i = 0; i < k; i++) {
            if (subsets[i] + num <= target) {
                subsets[i] += num;
                if (backtrack(index + 1)) return true;
                subsets[i] -= num; // Backtrack
            }
            
            // Optimization: if subset is empty, no need to try other empty subsets
            if (subsets[i] === 0) break;
        }
        
        return false;
    }
    
    return backtrack(0);
}

// Test case for Partition K Subsets
console.log("\n=== Partition into K Subsets with Equal Sum ===");
const partitionNums = [4, 3, 2, 3, 5, 2, 1];
const kSubsets = 4;
const canPartition = partitionKSubsets(partitionNums, kSubsets);
console.log(`Numbers: [${partitionNums.join(', ')}], K: ${kSubsets}`);
console.log("Can partition into", kSubsets, "equal sum subsets:", canPartition);
console.log("Target sum per subset:", partitionNums.reduce((a, b) => a + b, 0) / kSubsets);

// ========================================

// Problem 19: K-th Permutation Sequence
/*
Question: Find the K-th permutation sequence of first N natural numbers.

Approach: Use mathematical approach with backtracking concept.
- Calculate factorial to determine position
- For each position, determine which number should be placed
- Reduce the problem size recursively
- This avoids generating all permutations

Time Complexity: O(n²) where n is the number
Space Complexity: O(n) - For storing available numbers
*/

function kthPermutation(n, k) {
    const factorial = [1];
    const numbers = [];
    
    // Calculate factorials and prepare numbers array
    for (let i = 1; i < n; i++) {
        factorial[i] = factorial[i - 1] * i;
    }
    
    for (let i = 1; i <= n; i++) {
        numbers.push(i);
    }
    
    k--; // Convert to 0-based indexing
    let result = '';
    
    for (let i = n; i >= 1; i--) {
        const index = Math.floor(k / factorial[i - 1]);
        result += numbers[index];
        numbers.splice(index, 1);
        k %= factorial[i - 1];
    }
    
    return result;
}

// Alternative backtracking approach for K-th permutation
function kthPermutationBacktrack(n, k) {
    const nums = Array.from({length: n}, (_, i) => i + 1);
    const result = [];
    let count = 0;
    
    function backtrack(current, remaining) {
        if (remaining.length === 0) {
            count++;
            if (count === k) {
                result.push([...current]);
                return true;
            }
            return false;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);
            const newRemaining = remaining.filter((_, index) => index !== i);
            
            if (backtrack(current, newRemaining)) {
                return true;
            }
            
            current.pop(); // Backtrack
        }
        
        return false;
    }
    
    backtrack([], nums);
    return result.length > 0 ? result[0].join('') : '';
}

// Test case for K-th Permutation
console.log("\n=== K-th Permutation Sequence ===");
const nNum = 4;
const kPerm = 9;
const kthPerm = kthPermutation(nNum, kPerm);
const kthPermBack = kthPermutationBacktrack(nNum, kPerm);
console.log(`N: ${nNum}, K: ${kPerm}`);
console.log("K-th permutation (mathematical):", kthPerm);
console.log("K-th permutation (backtracking):", kthPermBack);

// ========================================
// SUMMARY OF TIME COMPLEXITIES
// ========================================

console.log("\n" + "=".repeat(50));
console.log("SUMMARY OF TIME COMPLEXITIES");
console.log("=".repeat(50));

const complexitySummary = [
    ["Rat in Maze", "O(2^(n²))", "Explores all possible paths"],
    ["N-Queens", "O(N!)", "N choices for first queen, N-2 for second, etc."],
    ["Word Break", "O(2^n * m)", "n = string length, m = dictionary size"],
    ["Remove Invalid Parentheses", "O(2^n)", "Try removing each character"],
    ["Sudoku Solver", "O(9^(n²))", "Try 1-9 in each empty cell"],
    ["M Coloring", "O(M^V)", "M colors for V vertices"],
    ["Palindromic Partitions", "O(2^n * n)", "All partitions with palindrome check"],
    ["Subset Sum", "O(2^n)", "Include/exclude each element"],
    ["Knight's Tour", "O(8^(n²))", "8 moves at each position"],
    ["Tug of War", "O(2^n)", "Each element in either subset"],
    ["Shortest Safe Route", "O(m*n)", "BFS traversal"],
    ["Combination Sum", "O(2^target)", "Exponential combinations"],
    ["Maximum K Swaps", "O(n! * k)", "All swaps at each level"],
    ["String Permutations", "O(n! * n)", "Generate all permutations"],
    ["Path More Than K", "O(V!)", "Explore all simple paths"],
    ["Longest Route", "O(4^(m*n))", "4 directions at each cell"],
    ["All Paths", "O(2^(m+n))", "Right/down choices"],
    ["Partition K Subsets", "O(k^n)", "k choices for each element"],
    ["K-th Permutation", "O(n²)", "Mathematical approach"]
];

complexitySummary.forEach(([problem, complexity, note]) => {
    console.log(`${problem.padEnd(25)} | ${complexity.padEnd(15)} | ${note}`);
});

console.log("\n" + "=".repeat(50));
console.log("KEY BACKTRACKING PRINCIPLES:");
console.log("=".repeat(50));
console.log("1. Choose: Make a choice from available options");
console.log("2. Explore: Recursively explore the consequences");
console.log("3. Unchoose: Backtrack if the choice doesn't lead to solution");
console.log("4. Base Case: Define when to stop recursion");
console.log("5. Pruning: Skip invalid choices early to optimize");

console.log("\nAll backtracking problems solved with test cases!");
console.log("Each solution includes detailed approach and complexity analysis.");