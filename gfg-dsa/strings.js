// ================================
// STRING PROBLEMS IN JAVASCRIPT
// ================================

// 1. Reverse a String
/**
 * Problem: Reverse the given string
 * Approach: Use two pointers or built-in reverse method
 * Time Complexity: O(n)
 * Space Complexity: O(1) for two pointer, O(n) for split method
 */
function reverseString(str) {
    // Method 1: Two pointers
    let arr = str.split('');
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr.join('');
}

// Alternative method
function reverseStringAlt(str) {
    return str.split('').reverse().join('');
}

// Test case
console.log("1. Reverse String:");
console.log(reverseString("hello")); // "olleh"
console.log(reverseString("world")); // "dlrow"
console.log("---");

// 2. Check whether a String is Palindrome or not
/**
 * Problem: Check if string reads same forwards and backwards
 * Approach: Two pointers from both ends
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function isPalindrome(str) {
    // Convert to lowercase and remove non-alphanumeric
    str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0, right = str.length - 1;
    
    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

// Test case
console.log("2. Palindrome Check:");
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log("---");

// 3. Find Duplicate characters in a string
/**
 * Problem: Find all characters that appear more than once
 * Approach: Use frequency map
 * Time Complexity: O(n)
 * Space Complexity: O(k) where k is unique characters
 */
function findDuplicates(str) {
    const freq = {};
    const duplicates = [];
    
    // Count frequency
    for (let char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    
    // Find duplicates
    for (let char in freq) {
        if (freq[char] > 1) {
            duplicates.push(char);
        }
    }
    
    return duplicates;
}

// Test case
console.log("3. Find Duplicates:");
console.log(findDuplicates("programming")); // ['r', 'g', 'm']
console.log(findDuplicates("hello")); // ['l']
console.log("---");

// 4. Why strings are immutable in Java?
/**
 * Answer: In JavaScript, strings are also immutable primitives.
 * Reasons:
 * 1. Security - String literals can't be changed maliciously
 * 2. Thread Safety - Multiple threads can access without synchronization
 * 3. Memory optimization - String interning saves memory
 * 4. Hash code caching - Hash remains constant
 * 5. Performance - No need for defensive copying
 */
console.log("4. String Immutability:");
console.log("Strings are immutable for security, thread safety, and performance reasons");
console.log("---");

// 5. Check whether one string is a rotation of another
/**
 * Problem: Check if s2 is rotation of s1
 * Approach: If s2 is rotation of s1, then s2 will be substring of s1+s1
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function isRotation(s1, s2) {
    if (s1.length !== s2.length) return false;
    return (s1 + s1).includes(s2);
}

// Test case
console.log("5. String Rotation:");
console.log(isRotation("abcdef", "defabc")); // true
console.log(isRotation("abcdef", "abcdfe")); // false
console.log("---");

// 6. Check whether a string is a valid shuffle of two strings
/**
 * Problem: Check if str3 is valid shuffle of str1 and str2
 * Approach: Use three pointers
 * Time Complexity: O(n + m)
 * Space Complexity: O(1)
 */
function isValidShuffle(str1, str2, str3) {
    if (str1.length + str2.length !== str3.length) return false;
    
    let i = 0, j = 0, k = 0;
    
    while (k < str3.length) {
        if (i < str1.length && str1[i] === str3[k]) {
            i++;
        } else if (j < str2.length && str2[j] === str3[k]) {
            j++;
        } else {
            return false;
        }
        k++;
    }
    
    return i === str1.length && j === str2.length;
}

// Test case
console.log("6. Valid Shuffle:");
console.log(isValidShuffle("abc", "def", "adbecf")); // true
console.log(isValidShuffle("abc", "def", "abcdef")); // true
console.log("---");

// 7. Count and Say problem
/**
 * Problem: Generate nth term in count-and-say sequence
 * Approach: Iteratively build each term by counting consecutive characters
 * Time Complexity: O(n * m) where m is length of current term
 * Space Complexity: O(m)
 */
function countAndSay(n) {
    if (n === 1) return "1";
    
    let result = "1";
    
    for (let i = 2; i <= n; i++) {
        let next = "";
        let count = 1;
        let current = result[0];
        
        for (let j = 1; j < result.length; j++) {
            if (result[j] === current) {
                count++;
            } else {
                next += count + current;
                current = result[j];
                count = 1;
            }
        }
        next += count + current;
        result = next;
    }
    
    return result;
}

// Test case
console.log("7. Count and Say:");
console.log(countAndSay(1)); // "1"
console.log(countAndSay(4)); // "1211"
console.log("---");

// 8. Longest Palindromic Substring
/**
 * Problem: Find the longest palindromic substring
 * Approach: Expand around centers
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
function longestPalindrome(s) {
    if (!s || s.length < 2) return s;
    
    let start = 0, maxLen = 1;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const currentLen = right - left + 1;
            if (currentLen > maxLen) {
                start = left;
                maxLen = currentLen;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i); // odd length palindromes
        expandAroundCenter(i, i + 1); // even length palindromes
    }
    
    return s.substring(start, start + maxLen);
}

// Test case
console.log("8. Longest Palindromic Substring:");
console.log(longestPalindrome("babad")); // "bab" or "aba"
console.log(longestPalindrome("cbbd")); // "bb"
console.log("---");

// 9. Longest Recurring Subsequence
/**
 * Problem: Find length of longest subsequence that appears twice
 * Approach: Dynamic Programming with condition i != j
 * Time Complexity: O(n²)
 * Space Complexity: O(n²)
 */
function longestRecurringSubsequence(str) {
    const n = str.length;
    const dp = Array(n + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (str[i - 1] === str[j - 1] && i !== j) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[n][n];
}

// Test case
console.log("9. Longest Recurring Subsequence:");
console.log(longestRecurringSubsequence("aabaaaba")); // 4
console.log(longestRecurringSubsequence("abc")); // 0
console.log("---");

// 10. Print all Subsequences of a string
/**
 * Problem: Generate all possible subsequences
 * Approach: Recursive inclusion/exclusion
 * Time Complexity: O(2^n)
 * Space Complexity: O(2^n)
 */
function allSubsequences(str) {
    const result = [];
    
    function generate(index, current) {
        if (index === str.length) {
            result.push(current);
            return;
        }
        
        // Exclude current character
        generate(index + 1, current);
        // Include current character
        generate(index + 1, current + str[index]);
    }
    
    generate(0, "");
    return result;
}

// Test case
console.log("10. All Subsequences:");
console.log(allSubsequences("abc")); // ["", "c", "b", "bc", "a", "ac", "ab", "abc"]
console.log("---");

// 11. Print all permutations of the given string
/**
 * Problem: Generate all permutations of string
 * Approach: Backtracking
 * Time Complexity: O(n! * n)
 * Space Complexity: O(n)
 */
function allPermutations(str) {
    const result = [];
    const chars = str.split('');
    
    function backtrack(start) {
        if (start === chars.length) {
            result.push(chars.join(''));
            return;
        }
        
        for (let i = start; i < chars.length; i++) {
            [chars[start], chars[i]] = [chars[i], chars[start]];
            backtrack(start + 1);
            [chars[start], chars[i]] = [chars[i], chars[start]]; // backtrack
        }
    }
    
    backtrack(0);
    return result;
}

// Test case
console.log("11. All Permutations:");
console.log(allPermutations("abc")); // ["abc", "acb", "bac", "bca", "cba", "cab"]
console.log("---");

// 12. Split Binary string into two substrings with equal 0's and 1's
/**
 * Problem: Find if we can split binary string into two parts with equal 0s and 1s in each
 * Approach: Check all possible split points
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
function canSplitBinary(str) {
    const n = str.length;
    
    for (let i = 1; i < n; i++) {
        const left = str.substring(0, i);
        const right = str.substring(i);
        
        if (countZerosOnes(left).zeros === countZerosOnes(left).ones &&
            countZerosOnes(right).zeros === countZerosOnes(right).ones) {
            return [left, right];
        }
    }
    
    return null;
}

function countZerosOnes(str) {
    let zeros = 0, ones = 0;
    for (let char of str) {
        if (char === '0') zeros++;
        else ones++;
    }
    return { zeros, ones };
}

// Test case
console.log("12. Split Binary String:");
console.log(canSplitBinary("0011")); // ["01", "01"] or similar valid split
console.log(canSplitBinary("1100")); // ["10", "01"] or similar valid split
console.log("---");

// 13. Word Wrap Problem
/**
 * Problem: Given words and line width, wrap text optimally
 * Approach: Dynamic Programming to minimize cost
 * Time Complexity: O(n²)
 * Space Complexity: O(n)
 */
function wordWrap(words, maxWidth) {
    const n = words.length;
    const dp = Array(n).fill(Infinity);
    const splits = Array(n).fill(-1);
    
    dp[0] = 0;
    
    for (let i = 1; i < n; i++) {
        let lineLength = 0;
        
        for (let j = i; j >= 0; j--) {
            lineLength += words[j].length;
            if (j < i) lineLength += 1; // space
            
            if (lineLength <= maxWidth) {
                const cost = j === 0 ? 0 : dp[j - 1];
                if (cost + Math.pow(maxWidth - lineLength, 2) < dp[i]) {
                    dp[i] = cost + Math.pow(maxWidth - lineLength, 2);
                    splits[i] = j;
                }
            } else {
                break;
            }
        }
    }
    
    // Reconstruct solution
    const result = [];
    let i = n - 1;
    
    while (i >= 0) {
        const start = splits[i];
        const line = words.slice(start, i + 1).join(' ');
        result.unshift(line);
        i = start - 1;
    }
    
    return result;
}

// Test case
console.log("13. Word Wrap:");
console.log(wordWrap(["This", "is", "an", "example"], 12));
console.log("---");

// 14. Edit Distance (Levenshtein Distance)
/**
 * Problem: Minimum operations to convert str1 to str2
 * Approach: Dynamic Programming
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
function editDistance(str1, str2) {
    const m = str1.length, n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // deletion
                    dp[i][j - 1],     // insertion
                    dp[i - 1][j - 1]  // substitution
                );
            }
        }
    }
    
    return dp[m][n];
}

// Test case
console.log("14. Edit Distance:");
console.log(editDistance("kitten", "sitting")); // 3
console.log(editDistance("sunday", "saturday")); // 3
console.log("---");

// 15. Find next greater number with same set of digits
/**
 * Problem: Find the next lexicographically greater permutation
 * Approach: Find rightmost character smaller than its next, then rearrange
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function nextGreaterElement(num) {
    const digits = num.toString().split('');
    const n = digits.length;
    
    // Find the rightmost character that is smaller than its next character
    let i = n - 2;
    while (i >= 0 && digits[i] >= digits[i + 1]) {
        i--;
    }
    
    if (i < 0) return -1; // No greater permutation exists
    
    // Find the smallest character on right side of above character that is greater than digits[i]
    let j = n - 1;
    while (digits[j] <= digits[i]) {
        j--;
    }
    
    // Swap
    [digits[i], digits[j]] = [digits[j], digits[i]];
    
    // Reverse the suffix
    const left = digits.slice(0, i + 1);
    const right = digits.slice(i + 1).reverse();
    
    const result = parseInt(left.concat(right).join(''));
    return result > 2147483647 ? -1 : result;
}

// Test case
console.log("15. Next Greater Element:");
console.log(nextGreaterElement(123)); // 132
console.log(nextGreaterElement(321)); // -1
console.log("---");

// 16. Balanced Parenthesis Problem
/**
 * Problem: Check if parentheses are balanced
 * Approach: Use stack
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function isBalanced(str) {
    const stack = [];
    const pairs = { '(': ')', '[': ']', '{': '}' };
    
    for (let char of str) {
        if (pairs[char]) {
            stack.push(char);
        } else if (Object.values(pairs).includes(char)) {
            if (!stack.length || pairs[stack.pop()] !== char) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

// Test case
console.log("16. Balanced Parenthesis:");
console.log(isBalanced("()[]{}")); // true
console.log(isBalanced("([)]")); // false
console.log("---");

// 17. Word Break Problem
/**
 * Problem: Check if string can be segmented into dictionary words
 * Approach: Dynamic Programming
 * Time Complexity: O(n²)
 * Space Complexity: O(n)
 */
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = Array(s.length + 1).fill(false);
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
console.log("17. Word Break:");
console.log(wordBreak("leetcode", ["leet", "code"])); // true
console.log(wordBreak("applepenapple", ["apple", "pen"])); // true
console.log("---");

// 18. Rabin Karp Algorithm
/**
 * Problem: Pattern matching using rolling hash
 * Approach: Hash-based string matching
 * Time Complexity: O(n + m) average, O(nm) worst case
 * Space Complexity: O(1)
 */
function rabinKarp(text, pattern) {
    const base = 256;
    const prime = 101;
    const m = pattern.length;
    const n = text.length;
    const results = [];
    
    let patternHash = 0;
    let textHash = 0;
    let h = 1;
    
    // Calculate h = base^(m-1) % prime
    for (let i = 0; i < m - 1; i++) {
        h = (h * base) % prime;
    }
    
    // Calculate hash for pattern and first window of text
    for (let i = 0; i < m; i++) {
        patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;
        textHash = (base * textHash + text.charCodeAt(i)) % prime;
    }
    
    // Slide pattern over text
    for (let i = 0; i <= n - m; i++) {
        if (patternHash === textHash) {
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) results.push(i);
        }
        
        // Calculate hash for next window
        if (i < n - m) {
            textHash = (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
            if (textHash < 0) textHash += prime;
        }
    }
    
    return results;
}

// Test case
console.log("18. Rabin Karp:");
console.log(rabinKarp("ABABDABACDABABCABCABCABCABC", "ABABCAB")); // [15]
console.log("---");

// 19. KMP Algorithm
/**
 * Problem: Pattern matching using failure function
 * Approach: Preprocess pattern to avoid unnecessary comparisons
 * Time Complexity: O(n + m)
 * Space Complexity: O(m)
 */
function kmpSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const lps = computeLPS(pattern);
    const results = [];
    
    let i = 0; // index for text
    let j = 0; // index for pattern
    
    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }
        
        if (j === m) {
            results.push(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return results;
}

function computeLPS(pattern) {
    const m = pattern.length;
    const lps = Array(m).fill(0);
    let len = 0;
    let i = 1;
    
    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    return lps;
}

// Test case
console.log("19. KMP Algorithm:");
console.log(kmpSearch("ABABDABACDABABCABCABCABCABC", "ABABCAB")); // [15]
console.log("---");

// 20. Mobile Keypad Sequence
/**
 * Problem: Convert sentence to mobile keypad sequence
 * Approach: Map each character to its keypad sequence
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function mobileKeypad(sentence) {
    const keypad = {
        'a': '2', 'b': '22', 'c': '222',
        'd': '3', 'e': '33', 'f': '333',
        'g': '4', 'h': '44', 'i': '444',
        'j': '5', 'k': '55', 'l': '555',
        'm': '6', 'n': '66', 'o': '666',
        'p': '7', 'q': '77', 'r': '777', 's': '7777',
        't': '8', 'u': '88', 'v': '888',
        'w': '9', 'x': '99', 'y': '999', 'z': '9999',
        ' ': '0'
    };
    
    let result = '';
    for (let char of sentence.toLowerCase()) {
        if (keypad[char]) {
            result += keypad[char];
        }
    }
    
    return result;
}

// Test case
console.log("20. Mobile Keypad:");
console.log(mobileKeypad("HELLO WORLD")); // "4433555555666096667775553"
console.log("---");

// 21. Minimum bracket reversals for balanced expression
/**
 * Problem: Find minimum reversals needed to balance brackets
 * Approach: Count unmatched opening and closing brackets
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function minReversals(expr) {
    const n = expr.length;
    if (n % 2 === 1) return -1; // Odd length can't be balanced
    
    let open = 0, close = 0;
    
    for (let char of expr) {
        if (char === '{') {
            open++;
        } else {
            if (open > 0) {
                open--;
            } else {
                close++;
            }
        }
    }
    
    return Math.ceil(open / 2) + Math.ceil(close / 2);
}

// Test case
console.log("21. Minimum Bracket Reversals:");
console.log(minReversals("}{")); // 2
console.log(minReversals("{{{")); // -1
console.log("---");

// 22. Count All Palindromic Subsequences
/**
 * Problem: Count all palindromic subsequences in string
 * Approach: Dynamic Programming
 * Time Complexity: O(n²)
 * Space Complexity: O(n²)
 */
function countPalindromicSubsequences(s) {
    const n = s.length;
    const dp = Array(n).fill().map(() => Array(n).fill(0));
    
    // Every single character is palindrome
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }
    
    // Check for palindromes of length 2 to n
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
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
console.log("22. Count Palindromic Subsequences:");
console.log(countPalindromicSubsequences("aab")); // 4 ("a", "a", "b", "aa")
console.log("---");

// 23. Count occurrences of string in 2D character array
/**
 * Problem: Count how many times a string appears in 2D grid
 * Approach: Try all 8 directions from each cell
 * Time Complexity: O(n * m * 8 * len)
 * Space Complexity: O(1)
 */
function countInGrid(grid, word) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
    let count = 0;
    
    function search(row, col, dir, index) {
        if (index === word.length) return true;
        if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
        if (grid[row][col] !== word[index]) return false;
        
        const newRow = row + directions[dir][0];
        const newCol = col + directions[dir][1];
        
        return search(newRow, newCol, dir, index + 1);
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            for (let dir = 0; dir < 8; dir++) {
                if (search(i, j, dir, 0)) {
                    count++;
                }
            }
        }
    }
    
    return count;
}

// Test case
console.log("23. Count in 2D Grid:");
const grid = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F'],
    ['G', 'H', 'I']
];
console.log(countInGrid(grid, "ABC")); // Count of "ABC" in grid
console.log("---");


// 1. Search a Word in a 2D Grid of characters
// Problem: Find if a given word exists in a 2D grid of characters (can move in 8 directions)
// Approach: Use DFS to explore all 8 directions from each cell
// Time Complexity: O(N*M*8^L) where N*M is grid size and L is word length
function searchWordInGrid(grid, word) {
    if (!grid || !grid.length || !word) return false;
    
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
    
    function dfs(row, col, index) {
        if (index === word.length) return true;
        if (row < 0 || row >= rows || col < 0 || col >= cols || 
            grid[row][col] !== word[index]) return false;
        
        const temp = grid[row][col];
        grid[row][col] = '#'; // Mark as visited
        
        for (let [dr, dc] of directions) {
            if (dfs(row + dr, col + dc, index + 1)) {
                grid[row][col] = temp; // Restore
                return true;
            }
        }
        
        grid[row][col] = temp; // Restore
        return false;
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === word[0] && dfs(i, j, 0)) {
                return true;
            }
        }
    }
    return false;
}

// Test case for problem 1
console.log("=== Problem 1: Search Word in 2D Grid ===");
const grid1 = [
    ['G','E','E','K'],
    ['S','F','C','S'],
    ['A','D','E','E']
];
console.log(searchWordInGrid(grid1, "GEEKS")); // true
console.log(searchWordInGrid(grid1, "EEK")); // true
console.log(searchWordInGrid(grid1, "SEEK")); // false

// 2. Boyer Moore Algorithm for Pattern Searching
// Problem: Find all occurrences of pattern in text using Boyer-Moore algorithm
// Approach: Use bad character heuristic to skip characters
// Time Complexity: O(n*m) worst case, O(n/m) best case
function boyerMooreSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const result = [];
    
    // Build bad character table
    const badChar = {};
    for (let i = 0; i < m; i++) {
        badChar[pattern[i]] = i;
    }
    
    let shift = 0;
    while (shift <= n - m) {
        let j = m - 1;
        
        // Match pattern from right to left
        while (j >= 0 && pattern[j] === text[shift + j]) {
            j--;
        }
        
        if (j < 0) {
            result.push(shift);
            shift += (shift + m < n) ? m - (badChar[text[shift + m]] || -1) : 1;
        } else {
            shift += Math.max(1, j - (badChar[text[shift + j]] || -1));
        }
    }
    
    return result;
}

// Test case for problem 2
console.log("\n=== Problem 2: Boyer Moore Pattern Search ===");
console.log(boyerMooreSearch("ABAAABCDABABCABCABCDAB", "ABCAB")); // [10, 15]
console.log(boyerMooreSearch("AABAACAADAABAABA", "AABA")); // [0, 9, 12]

// 3. Converting Roman Numerals to Decimal
// Problem: Convert Roman numeral string to decimal number
// Approach: Process from right to left, subtract if current < previous, else add
// Time Complexity: O(n) where n is length of roman string
function romanToDecimal(roman) {
    const romanMap = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    };
    
    let result = 0;
    let prevValue = 0;
    
    for (let i = roman.length - 1; i >= 0; i--) {
        const currentValue = romanMap[roman[i]];
        if (currentValue < prevValue) {
            result -= currentValue;
        } else {
            result += currentValue;
        }
        prevValue = currentValue;
    }
    
    return result;
}

// Test case for problem 3
console.log("\n=== Problem 3: Roman to Decimal ===");
console.log(romanToDecimal("IX")); // 9
console.log(romanToDecimal("MCMXC")); // 1990
console.log(romanToDecimal("MMVIII")); // 2008

// 4. Longest Common Prefix
// Problem: Find longest common prefix among array of strings
// Approach: Compare characters at each position across all strings
// Time Complexity: O(S) where S is sum of all characters in all strings
function longestCommonPrefix(strs) {
    if (!strs || strs.length === 0) return "";
    
    let prefix = "";
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== char) {
                return prefix;
            }
        }
        prefix += char;
    }
    
    return prefix;
}

// Test case for problem 4
console.log("\n=== Problem 4: Longest Common Prefix ===");
console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefix(["dog","racecar","car"])); // ""
console.log(longestCommonPrefix(["interspecies","interstellar","interstate"])); // "inters"

// 5. Number of flips to make binary string alternate
// Problem: Find minimum flips to make binary string alternating (0101... or 1010...)
// Approach: Count flips needed for both patterns and return minimum
// Time Complexity: O(n)
function minFlipsToAlternate(s) {
    let flips1 = 0; // For pattern starting with '0'
    let flips2 = 0; // For pattern starting with '1'
    
    for (let i = 0; i < s.length; i++) {
        // Pattern 1: 0101...
        if (i % 2 === 0 && s[i] === '1') flips1++;
        if (i % 2 === 1 && s[i] === '0') flips1++;
        
        // Pattern 2: 1010...
        if (i % 2 === 0 && s[i] === '0') flips2++;
        if (i % 2 === 1 && s[i] === '1') flips2++;
    }
    
    return Math.min(flips1, flips2);
}

// Test case for problem 5
console.log("\n=== Problem 5: Min Flips for Alternating String ===");
console.log(minFlipsToAlternate("0001010111")); // 5
console.log(minFlipsToAlternate("111000")); // 2
console.log(minFlipsToAlternate("010")); // 0

// 6. Find the first repeated word in string
// Problem: Find first word that appears more than once in a string
// Approach: Use Set to track seen words
// Time Complexity: O(n) where n is number of words
function firstRepeatedWord(str) {
    const words = str.toLowerCase().split(/\s+/);
    const seen = new Set();
    
    for (let word of words) {
        // Remove punctuation
        word = word.replace(/[^\w]/g, '');
        if (word && seen.has(word)) {
            return word;
        }
        seen.add(word);
    }
    
    return null;
}

// Test case for problem 6
console.log("\n=== Problem 6: First Repeated Word ===");
console.log(firstRepeatedWord("He is a good programmer. He is a writer.")); // "he"
console.log(firstRepeatedWord("I love programming. Programming is fun.")); // "programming"

// 7. Minimum number of swaps for bracket balancing
// Problem: Find minimum swaps to balance brackets (assuming equal [ and ])
// Approach: Track unmatched opening brackets and calculate swaps needed
// Time Complexity: O(n)
function minSwapsToBalance(s) {
    let open = 0;
    let unmatched = 0;
    
    for (let char of s) {
        if (char === '[') {
            open++;
        } else if (char === ']') {
            if (open > 0) {
                open--;
            } else {
                unmatched++;
            }
        }
    }
    
    return Math.ceil(unmatched / 2);
}

// Test case for problem 7
console.log("\n=== Problem 7: Min Swaps for Bracket Balance ===");
console.log(minSwapsToBalance("][][")); // 1
console.log(minSwapsToBalance("]]][[[")); // 2
console.log(minSwapsToBalance("[]][][")); // 1

// 8. Find the longest common subsequence between two strings
// Problem: Find length of longest common subsequence using dynamic programming
// Approach: Use 2D DP table
// Time Complexity: O(m*n) where m,n are string lengths
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
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

// Test case for problem 8
console.log("\n=== Problem 8: Longest Common Subsequence ===");
console.log(longestCommonSubsequence("abcde", "ace")); // 3
console.log(longestCommonSubsequence("abc", "abc")); // 3
console.log(longestCommonSubsequence("abc", "def")); // 0

// 9. Generate all possible valid IP addresses from given string
// Problem: Generate all valid IP addresses from a string of digits
// Approach: Use backtracking to try all possible combinations
// Time Complexity: O(3^4) = O(81) constant time
function generateIPAddresses(s) {
    const result = [];
    if (s.length < 4 || s.length > 12) return result;
    
    function isValid(str) {
        if (str.length > 3 || str.length === 0) return false;
        if (str.length > 1 && str[0] === '0') return false;
        const num = parseInt(str);
        return num >= 0 && num <= 255;
    }
    
    function backtrack(start, path) {
        if (path.length === 4) {
            if (start === s.length) {
                result.push(path.join('.'));
            }
            return;
        }
        
        for (let len = 1; len <= 3 && start + len <= s.length; len++) {
            const segment = s.substring(start, start + len);
            if (isValid(segment)) {
                path.push(segment);
                backtrack(start + len, path);
                path.pop();
            }
        }
    }
    
    backtrack(0, []);
    return result;
}

// Test case for problem 9
console.log("\n=== Problem 9: Generate Valid IP Addresses ===");
console.log(generateIPAddresses("25525511135")); // ["255.255.11.135","255.255.111.35"]
console.log(generateIPAddresses("1111")); // ["1.1.1.1"]

// 10. Find the smallest window that contains all characters of string itself
// Problem: Find smallest substring that contains all unique characters of the string
// Approach: Use sliding window with character frequency map
// Time Complexity: O(n)
function smallestWindowAllChars(s) {
    const charCount = {};
    let uniqueChars = 0;
    
    // Count unique characters
    for (let char of s) {
        if (!charCount[char]) {
            charCount[char] = 0;
            uniqueChars++;
        }
        charCount[char]++;
    }
    
    let left = 0, minLen = s.length, minStart = 0;
    let formed = 0;
    const windowCounts = {};
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        windowCounts[char] = (windowCounts[char] || 0) + 1;
        
        if (windowCounts[char] === charCount[char]) {
            formed++;
        }
        
        while (formed === uniqueChars) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            
            const leftChar = s[left];
            windowCounts[leftChar]--;
            if (windowCounts[leftChar] < charCount[leftChar]) {
                formed--;
            }
            left++;
        }
    }
    
    return s.substring(minStart, minStart + minLen);
}

// Test case for problem 10
console.log("\n=== Problem 10: Smallest Window All Characters ===");
console.log(smallestWindowAllChars("aabbccd")); // "abcd"
console.log(smallestWindowAllChars("geeksforgeeks")); // "eksforg"

// 11. Rearrange characters so no two adjacent are same
// Problem: Rearrange string so no two adjacent characters are same
// Approach: Use priority queue (max heap) to always pick most frequent character
// Time Complexity: O(n log k) where k is number of unique characters
function rearrangeString(s) {
    const charCount = {};
    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Convert to array and sort by frequency
    const heap = Object.entries(charCount).sort((a, b) => b[1] - a[1]);
    
    let result = '';
    let prev = null;
    
    while (heap.length > 0 || prev) {
        if (prev && heap.length === 0) {
            return ""; // Not possible to rearrange
        }
        
        // Get most frequent character
        const current = heap.shift();
        result += current[0];
        current[1]--;
        
        // Add previous character back if it has remaining count
        if (prev && prev[1] > 0) {
            heap.push(prev);
            heap.sort((a, b) => b[1] - a[1]);
        }
        
        // Set current as previous for next iteration
        prev = current[1] > 0 ? current : null;
    }
    
    return result;
}

// Test case for problem 11
console.log("\n=== Problem 11: Rearrange Characters ===");
console.log(rearrangeString("aaab")); // "abaa" or similar valid arrangement
console.log(rearrangeString("aab")); // "aba"
console.log(rearrangeString("aaaa")); // "" (not possible)

// 12. Minimum characters to be added at front to make string palindrome
// Problem: Find minimum characters to add at beginning to make palindrome
// Approach: Use KMP failure function or check suffixes
// Time Complexity: O(n)
function minCharsToAddFront(s) {
    // Create string s + '#' + reverse(s)
    const rev = s.split('').reverse().join('');
    const combined = s + '#' + rev;
    
    // Compute LPS (Longest Proper Prefix which is also Suffix) array
    const lps = new Array(combined.length).fill(0);
    let len = 0, i = 1;
    
    while (i < combined.length) {
        if (combined[i] === combined[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    return s.length - lps[combined.length - 1];
}

// Test case for problem 12
console.log("\n=== Problem 12: Min Chars to Add Front for Palindrome ===");
console.log(minCharsToAddFront("ABC")); // 2 (CBABC)
console.log(minCharsToAddFront("AACECAAAA")); // 2 (AAAACECAAAA)

// 13. Given a sequence of words, print all anagrams together
// Problem: Group anagrams together
// Approach: Use sorted string as key to group anagrams
// Time Complexity: O(n * k log k) where n is number of words, k is average word length
function groupAnagrams(words) {
    const anagramMap = {};
    
    for (let word of words) {
        const sortedWord = word.split('').sort().join('');
        if (!anagramMap[sortedWord]) {
            anagramMap[sortedWord] = [];
        }
        anagramMap[sortedWord].push(word);
    }
    
    return Object.values(anagramMap);
}

// Test case for problem 13
console.log("\n=== Problem 13: Group Anagrams ===");
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat","tea","ate"],["tan","nat"],["bat"]]

// 14. Find smallest window in string containing all characters of another string
// Problem: Find minimum window substring containing all characters of pattern
// Approach: Use sliding window with character frequency
// Time Complexity: O(|s| + |t|)
function minWindowSubstring(s, t) {
    if (s.length < t.length) return "";
    
    const tCount = {};
    for (let char of t) {
        tCount[char] = (tCount[char] || 0) + 1;
    }
    
    let required = Object.keys(tCount).length;
    let formed = 0;
    let windowCounts = {};
    
    let left = 0, right = 0;
    let minLen = Infinity, minLeft = 0;
    
    while (right < s.length) {
        let char = s[right];
        windowCounts[char] = (windowCounts[char] || 0) + 1;
        
        if (tCount[char] && windowCounts[char] === tCount[char]) {
            formed++;
        }
        
        while (left <= right && formed === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
            }
            
            let leftChar = s[left];
            windowCounts[leftChar]--;
            if (tCount[leftChar] && windowCounts[leftChar] < tCount[leftChar]) {
                formed--;
            }
            left++;
        }
        right++;
    }
    
    return minLen === Infinity ? "" : s.substring(minLeft, minLeft + minLen);
}

// Test case for problem 14
console.log("\n=== Problem 14: Minimum Window Substring ===");
console.log(minWindowSubstring("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindowSubstring("a", "a")); // "a"

// 15. Recursively remove all adjacent duplicates
// Problem: Remove all adjacent duplicate characters recursively
// Approach: Use stack or recursion to remove duplicates
// Time Complexity: O(n)
function removeAdjacentDuplicates(s) {
    const stack = [];
    
    for (let char of s) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
            stack.pop();
        } else {
            stack.push(char);
        }
    }
    
    return stack.join('');
}

// Test case for problem 15
console.log("\n=== Problem 15: Remove Adjacent Duplicates ===");
console.log(removeAdjacentDuplicates("abbaca")); // "ca"
console.log(removeAdjacentDuplicates("azxxzy")); // "ay"

// 16. String matching with wildcard characters
// Problem: Match string with pattern containing '*' and '?'
// Approach: Use dynamic programming
// Time Complexity: O(m*n) where m,n are lengths of string and pattern
function wildcardMatch(s, p) {
    const m = s.length, n = p.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));
    
    dp[0][0] = true;
    
    // Handle patterns like a* or *a* which should match empty string
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
            } else if (p[j - 1] === '?' || s[i - 1] === p[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }
    
    return dp[m][n];
}

// Test case for problem 16
console.log("\n=== Problem 16: Wildcard String Matching ===");
console.log(wildcardMatch("aa", "a")); // false
console.log(wildcardMatch("aa", "*")); // true
console.log(wildcardMatch("cb", "?a")); // false
console.log(wildcardMatch("adceb", "*a*b*")); // true

// 17. Number of customers who could not get a computer
// Problem: Given arrival/departure times and computers, find customers who couldn't get computer
// Approach: Process events chronologically
// Time Complexity: O(n) where n is number of customers
function customersWithoutComputer(s, n) {
    const occupied = new Set();
    let waitingCustomers = 0;
    let unableToGet = 0;
    
    for (let char of s) {
        if (!occupied.has(char)) {
            // Customer arrives
            if (occupied.size < n) {
                occupied.add(char);
            } else {
                unableToGet++;
            }
        } else {
            // Customer leaves
            occupied.delete(char);
        }
    }
    
    return unableToGet;
}

// Test case for problem 17
console.log("\n=== Problem 17: Customers Without Computer ===");
console.log(customersWithoutComputer("ABBAJJKZKZ", 2)); // 0
console.log(customersWithoutComputer("GACCBDDBAGEE", 3)); // 1

// 18. Transform one string to another using minimum operations
// Problem: Find minimum operations to transform string A to string B
// Approach: Use edit distance (dynamic programming)
// Time Complexity: O(m*n)
function minTransformOperations(str1, str2) {
    const m = str1.length, n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // deletion
                    dp[i][j - 1],     // insertion
                    dp[i - 1][j - 1]  // substitution
                );
            }
        }
    }
    
    return dp[m][n];
}

// Test case for problem 18
console.log("\n=== Problem 18: Min Transform Operations ===");
console.log(minTransformOperations("horse", "ros")); // 3
console.log(minTransformOperations("intention", "execution")); // 5

// 19. Check if two strings are isomorphic
// Problem: Check if two strings are isomorphic (one-to-one character mapping)
// Approach: Use two maps to ensure bijection
// Time Complexity: O(n)
function areIsomorphic(s, t) {
    if (s.length !== t.length) return false;
    
    const mapST = {}, mapTS = {};
    
    for (let i = 0; i < s.length; i++) {
        const charS = s[i], charT = t[i];
        
        if (mapST[charS] && mapST[charS] !== charT) return false;
        if (mapTS[charT] && mapTS[charT] !== charS) return false;
        
        mapST[charS] = charT;
        mapTS[charT] = charS;
    }
    
    return true;
}

// Test case for problem 19
console.log("\n=== Problem 19: Check Isomorphic Strings ===");
console.log(areIsomorphic("egg", "add")); // true
console.log(areIsomorphic("foo", "bar")); // false
console.log(areIsomorphic("paper", "title")); // true

// 20. Recursively print all sentences from list of word lists
// Problem: Generate all possible sentences from word lists using backtracking
// Approach: Use recursion/backtracking to generate all combinations
// Time Complexity: O(N^M) where N is average words per list, M is number of lists
function generateSentences(wordLists) {
    const result = [];
    
    function backtrack(index, currentSentence) {
        if (index === wordLists.length) {
            result.push(currentSentence.join(' '));
            return;
        }
        
        for (let word of wordLists[index]) {
            currentSentence.push(word);
            backtrack(index + 1, currentSentence);
            currentSentence.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}

// Test case for problem 20
console.log("\n=== Problem 20: Generate All Sentences ===");
const wordLists = [["you", "we"], ["have", "are"], ["sleep", "eat", "drink"]];
console.log(generateSentences(wordLists));
// ["you have sleep", "you have eat", "you have drink", "you are sleep", "you are eat", "you are drink", "we have sleep", "we have eat", "we have drink", "we are sleep", "we are eat", "we are drink"]