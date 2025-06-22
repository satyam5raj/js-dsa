// ===================================================================
// PROBLEM 1: Construct a Trie from Scratch
// ===================================================================
/*
Question: Implement a Trie (Prefix Tree) data structure with insert, search, and startsWith operations.

Approach:
- Create TrieNode class with children array (26 for lowercase letters) and isEndOfWord flag
- Insert: Traverse character by character, create nodes if needed, mark end
- Search: Traverse and check if word ends at a valid end node
- StartsWith: Traverse prefix and return true if path exists

Time Complexity:
- Insert: O(m) where m is length of word
- Search: O(m) where m is length of word  
- StartsWith: O(m) where m is length of prefix
Space Complexity: O(ALPHABET_SIZE * N * M) where N is number of words, M is average length
*/

class TrieNode {
    constructor() {
        this.children = new Array(26).fill(null); // for a-z
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    // Insert a word into the trie
    insert(word) {
        let current = this.root;
        
        for (let char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            
            if (!current.children[index]) {
                current.children[index] = new TrieNode();
            }
            
            current = current.children[index];
        }
        
        current.isEndOfWord = true;
    }
    
    // Search if word exists in trie
    search(word) {
        let current = this.root;
        
        for (let char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            
            if (!current.children[index]) {
                return false;
            }
            
            current = current.children[index];
        }
        
        return current.isEndOfWord;
    }
    
    // Check if any word starts with given prefix
    startsWith(prefix) {
        let current = this.root;
        
        for (let char of prefix) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            
            if (!current.children[index]) {
                return false;
            }
            
            current = current.children[index];
        }
        
        return true;
    }
}

// Test Case for Problem 1
console.log("=== PROBLEM 1 TEST ===");
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.insert("application");

console.log(trie.search("app"));     // true
console.log(trie.search("apple"));   // true
console.log(trie.search("appl"));    // false
console.log(trie.startsWith("app")); // true
console.log(trie.startsWith("xyz")); // false

// ===================================================================
// PROBLEM 2: Find Shortest Unique Prefix for Every Word
// ===================================================================
/*
Question: Given an array of words, find the shortest unique prefix for each word.

Approach:
- Build a trie and store frequency count at each node
- For each word, traverse until we find a node with frequency = 1
- That gives us the shortest unique prefix

Time Complexity: O(N*M) where N is number of words, M is average length
Space Complexity: O(N*M)
*/

class TrieNodeWithCount {
    constructor() {
        this.children = new Array(26).fill(null);
        this.frequency = 0; // count of words passing through this node
    }
}

function findShortestUniquePrefix(words) {
    const root = new TrieNodeWithCount();
    
    // Build trie with frequency count
    for (let word of words) {
        let current = root;
        
        for (let char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            
            if (!current.children[index]) {
                current.children[index] = new TrieNodeWithCount();
            }
            
            current = current.children[index];
            current.frequency++;
        }
    }
    
    // Find shortest unique prefix for each word
    const result = [];
    
    for (let word of words) {
        let current = root;
        let prefix = "";
        
        for (let char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            current = current.children[index];
            prefix += char;
            
            // If frequency is 1, this is the shortest unique prefix
            if (current.frequency === 1) {
                break;
            }
        }
        
        result.push(prefix);
    }
    
    return result;
}

// Test Case for Problem 2
console.log("\n=== PROBLEM 2 TEST ===");
const words1 = ["zebra", "dog", "duck", "dove"];
console.log("Words:", words1);
console.log("Shortest unique prefixes:", findShortestUniquePrefix(words1));
// Expected: ["z", "dog", "du", "dov"]

const words2 = ["geeksgeeks", "geeksquiz", "geeksforgeeks"];
console.log("Words:", words2);
console.log("Shortest unique prefixes:", findShortestUniquePrefix(words2));
// Expected: ["geeksg", "geeksq", "geeksf"]

// ===================================================================
// PROBLEM 3: Word Break Problem (Trie Solution)
// ===================================================================
/*
Question: Given a string and a dictionary of words, determine if the string can be 
segmented into space-separated sequence of dictionary words.

Approach:
- Build a trie from dictionary words
- Use dynamic programming with trie traversal
- For each position, try to match words starting from that position using trie

Time Complexity: O(N^2) where N is length of string
Space Complexity: O(M*K) where M is number of words, K is average word length
*/

function wordBreakTrie(s, wordDict) {
    // Build trie from dictionary
    const trie = new Trie();
    for (let word of wordDict) {
        trie.insert(word);
    }
    
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true; // empty string can always be segmented
    
    for (let i = 0; i < n; i++) {
        if (!dp[i]) continue;
        
        let current = trie.root;
        
        // Try to match words starting from position i
        for (let j = i; j < n; j++) {
            const charIndex = s.charCodeAt(j) - 'a'.charCodeAt(0);
            
            if (!current.children[charIndex]) {
                break; // no word in trie starts with this prefix
            }
            
            current = current.children[charIndex];
            
            // If we found a complete word, mark dp[j+1] as true
            if (current.isEndOfWord) {
                dp[j + 1] = true;
            }
        }
    }
    
    return dp[n];
}

// Test Case for Problem 3
console.log("\n=== PROBLEM 3 TEST ===");
console.log(wordBreakTrie("leetcode", ["leet", "code"])); // true
console.log(wordBreakTrie("applepenapple", ["apple", "pen"])); // true
console.log(wordBreakTrie("catsandog", ["cats", "dog", "sand", "and", "cat"])); // false

// ===================================================================
// PROBLEM 4: Given a sequence of words, print all anagrams together
// ===================================================================
/*
Question: Group anagrams together from a list of words.

Approach:
- Sort each word to get its canonical form
- Use the sorted word as key in a map to group anagrams
- Alternative: Use character frequency as key

Time Complexity: O(N*M*log(M)) where N is number of words, M is average word length
Space Complexity: O(N*M)
*/

function groupAnagrams(words) {
    const anagramMap = new Map();
    
    for (let word of words) {
        // Sort characters to create key for anagrams
        const sortedWord = word.split('').sort().join('');
        
        if (!anagramMap.has(sortedWord)) {
            anagramMap.set(sortedWord, []);
        }
        
        anagramMap.get(sortedWord).push(word);
    }
    
    return Array.from(anagramMap.values());
}

// Alternative approach using character frequency
function groupAnagramsFreq(words) {
    const anagramMap = new Map();
    
    for (let word of words) {
        // Create frequency key
        const freq = new Array(26).fill(0);
        for (let char of word) {
            freq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        const key = freq.join(',');
        
        if (!anagramMap.has(key)) {
            anagramMap.set(key, []);
        }
        
        anagramMap.get(key).push(word);
    }
    
    return Array.from(anagramMap.values());
}

// Test Case for Problem 4
console.log("\n=== PROBLEM 4 TEST ===");
const words3 = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log("Original words:", words3);
console.log("Grouped anagrams:", groupAnagrams(words3));
console.log("Grouped anagrams (freq method):", groupAnagramsFreq(words3));

// ===================================================================
// PROBLEM 5: Implement a Phone Directory
// ===================================================================
/*
Question: Implement a phone directory that supports:
- get(): Provide a number which is not assigned to anyone
- check(number): Check if a number is available
- release(number): Recycle or release a number

Approach:
- Use a set to track available numbers
- Use another set to track assigned numbers
- get() returns and removes from available set
- release() adds back to available set

Time Complexity: O(1) for all operations
Space Complexity: O(N) where N is maxNumbers
*/

class PhoneDirectory {
    constructor(maxNumbers) {
        this.maxNumbers = maxNumbers;
        this.available = new Set();
        
        // Initially all numbers are available
        for (let i = 0; i < maxNumbers; i++) {
            this.available.add(i);
        }
    }
    
    // Provide a number which is not assigned to anyone
    get() {
        if (this.available.size === 0) {
            return -1; // no number available
        }
        
        // Get any available number
        const number = this.available.values().next().value;
        this.available.delete(number);
        return number;
    }
    
    // Check if a number is available
    check(number) {
        return this.available.has(number);
    }
    
    // Recycle or release a number
    release(number) {
        if (number >= 0 && number < this.maxNumbers) {
            this.available.add(number);
            return true;
        }
        return false;
    }
}

// Test Case for Problem 5
console.log("\n=== PROBLEM 5 TEST ===");
const phoneDir = new PhoneDirectory(3);
console.log("Get number:", phoneDir.get()); // 0 or 1 or 2
console.log("Get number:", phoneDir.get()); // another available number
console.log("Check 2:", phoneDir.check(2)); // depends on what was assigned
console.log("Get number:", phoneDir.get()); // last available number
console.log("Get number:", phoneDir.get()); // -1 (no more available)
console.log("Release 2:", phoneDir.release(2)); // true
console.log("Check 2:", phoneDir.check(2)); // true
console.log("Get number:", phoneDir.get()); // 2

// ===================================================================
// PROBLEM 6: Print unique rows in a given boolean matrix
// ===================================================================
/*
Question: Given a boolean matrix, print all unique rows.

Approach:
- Build a trie where each path represents a row
- Each level represents a column (0 or 1)
- If we reach end of row and it's first time, it's unique
- Mark end of unique rows to avoid duplicates

Time Complexity: O(ROW * COL) 
Space Complexity: O(ROW * COL) in worst case
*/

class BooleanTrieNode {
    constructor() {
        this.children = [null, null]; // for 0 and 1
        this.isEndOfRow = false;
    }
}

function printUniqueRows(matrix) {
    if (!matrix || matrix.length === 0) return [];
    
    const root = new BooleanTrieNode();
    const uniqueRows = [];
    
    for (let row of matrix) {
        let current = root;
        let isNewRow = false;
        
        // Traverse the row in trie
        for (let bit of row) {
            if (!current.children[bit]) {
                current.children[bit] = new BooleanTrieNode();
                isNewRow = true;
            }
            current = current.children[bit];
        }
        
        // If this path is new or we haven't marked it as end before
        if (isNewRow || !current.isEndOfRow) {
            current.isEndOfRow = true;
            uniqueRows.push([...row]); // add copy of row
        }
    }
    
    return uniqueRows;
}

// Alternative approach using Set with string representation
function printUniqueRowsSet(matrix) {
    const seen = new Set();
    const uniqueRows = [];
    
    for (let row of matrix) {
        const rowStr = row.join('');
        if (!seen.has(rowStr)) {
            seen.add(rowStr);
            uniqueRows.push([...row]);
        }
    }
    
    return uniqueRows;
}

// Test Case for Problem 6
console.log("\n=== PROBLEM 6 TEST ===");
const boolMatrix = [
    [0, 1, 0, 0, 1],
    [1, 0, 1, 1, 0],
    [0, 1, 0, 0, 1], // duplicate
    [1, 1, 1, 0, 0],
    [1, 0, 1, 1, 0], // duplicate
    [0, 0, 0, 0, 0]
];

console.log("Original matrix:");
boolMatrix.forEach(row => console.log(row.join(' ')));

console.log("\nUnique rows (Trie method):");
const uniqueRowsTrie = printUniqueRows(boolMatrix);
uniqueRowsTrie.forEach(row => console.log(row.join(' ')));

console.log("\nUnique rows (Set method):");
const uniqueRowsSet = printUniqueRowsSet(boolMatrix);
uniqueRowsSet.forEach(row => console.log(row.join(' ')));

// ===================================================================
// SUMMARY OF ALL PROBLEMS
// ===================================================================
/*
1. Trie Construction: Basic trie with insert, search, startsWith - O(m) operations
2. Shortest Unique Prefix: Use frequency count in trie nodes - O(N*M)
3. Word Break: DP with trie traversal - O(N^2) 
4. Group Anagrams: Sort characters or use frequency - O(N*M*log(M))
5. Phone Directory: Set-based number management - O(1) operations
6. Unique Boolean Rows: Trie for binary patterns - O(ROW*COL)

Key Trie Concepts:
- Prefix matching and storage
- Space-time tradeoffs
- Character frequency tracking
- Path-based uniqueness
*/