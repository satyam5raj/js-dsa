class ComprehensiveString {
    constructor(str = '') {
        this.data = str;
        this.length = str.length;
    }

    // ==================================================
    // 1. STRING SEARCHING ALGORITHMS
    // ==================================================

    // Naive String Search - O(nm)
    naiveSearch(pattern) {
        const matches = [];
        const n = this.length;
        const m = pattern.length;
        
        for (let i = 0; i <= n - m; i++) {
            let j = 0;
            while (j < m && this.data[i + j] === pattern[j]) {
                j++;
            }
            if (j === m) {
                matches.push(i);
            }
        }
        return matches;
    }

    // KMP (Knuth-Morris-Pratt) Algorithm - O(n+m)
    kmpSearch(pattern) {
        const matches = [];
        const lps = this.computeLPS(pattern);
        let i = 0, j = 0;
        
        while (i < this.length) {
            if (this.data[i] === pattern[j]) {
                i++;
                j++;
            }
            
            if (j === pattern.length) {
                matches.push(i - j);
                j = lps[j - 1];
            } else if (i < this.length && this.data[i] !== pattern[j]) {
                if (j !== 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        return matches;
    }

    // Compute Longest Prefix Suffix array for KMP
    computeLPS(pattern) {
        const lps = new Array(pattern.length).fill(0);
        let len = 0;
        let i = 1;
        
        while (i < pattern.length) {
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

    // Rabin-Karp Algorithm - O(nm) worst case, O(n+m) average
    rabinKarpSearch(pattern) {
        const matches = [];
        const d = 256; // Number of characters in alphabet
        const q = 101; // A prime number
        const m = pattern.length;
        const n = this.length;
        
        let p = 0; // Hash value for pattern
        let t = 0; // Hash value for text
        let h = 1;
        
        // Calculate h = pow(d, m-1) % q
        for (let i = 0; i < m - 1; i++) {
            h = (h * d) % q;
        }
        
        // Calculate hash for pattern and first window
        for (let i = 0; i < m; i++) {
            p = (d * p + pattern.charCodeAt(i)) % q;
            t = (d * t + this.data.charCodeAt(i)) % q;
        }
        
        // Slide pattern over text
        for (let i = 0; i <= n - m; i++) {
            if (p === t) {
                // Check characters one by one
                let match = true;
                for (let j = 0; j < m; j++) {
                    if (this.data[i + j] !== pattern[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) matches.push(i);
            }
            
            // Calculate hash for next window
            if (i < n - m) {
                t = (d * (t - this.data.charCodeAt(i) * h) + this.data.charCodeAt(i + m)) % q;
                if (t < 0) t += q;
            }
        }
        return matches;
    }

    // ==================================================
    // 2. STRING MATCHING & COMPARISON
    // ==================================================

    // Longest Common Subsequence - O(nm)
    longestCommonSubsequence(str2) {
        const m = this.length;
        const n = str2.length;
        const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
        
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (this.data[i - 1] === str2[j - 1]) {
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
            if (this.data[i - 1] === str2[j - 1]) {
                lcs = this.data[i - 1] + lcs;
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        
        return { length: dp[m][n], sequence: lcs };
    }

    // Edit Distance (Levenshtein Distance) - O(nm)
    editDistance(str2) {
        const m = this.length;
        const n = str2.length;
        const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
        
        // Initialize base cases
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (this.data[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j],     // Delete
                        dp[i][j - 1],     // Insert
                        dp[i - 1][j - 1]  // Replace
                    );
                }
            }
        }
        
        return dp[m][n];
    }

    // ==================================================
    // 3. PALINDROME ALGORITHMS
    // ==================================================

    // Check if string is palindrome - O(n)
    isPalindrome() {
        let left = 0;
        let right = this.length - 1;
        
        while (left < right) {
            if (this.data[left] !== this.data[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    // Longest Palindromic Substring - O(n²)
    longestPalindromicSubstring() {
        let maxLen = 0;
        let start = 0;
        
        for (let i = 0; i < this.length; i++) {
            // Check for odd length palindromes
            let len1 = this.expandAroundCenter(i, i);
            // Check for even length palindromes
            let len2 = this.expandAroundCenter(i, i + 1);
            
            let len = Math.max(len1, len2);
            if (len > maxLen) {
                maxLen = len;
                start = i - Math.floor((len - 1) / 2);
            }
        }
        
        return {
            substring: this.data.substring(start, start + maxLen),
            length: maxLen,
            startIndex: start
        };
    }

    expandAroundCenter(left, right) {
        while (left >= 0 && right < this.length && this.data[left] === this.data[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }

    // Manacher's Algorithm for all palindromes - O(n)
    manacherAlgorithm() {
        // Transform string: "abc" -> "^#a#b#c#$"
        let transformed = '^#' + this.data.split('').join('#') + '#$';
        let n = transformed.length;
        let P = new Array(n).fill(0);
        let center = 0, right = 0;
        
        for (let i = 1; i < n - 1; i++) {
            let mirror = 2 * center - i;
            
            if (i < right) {
                P[i] = Math.min(right - i, P[mirror]);
            }
            
            // Try to expand palindrome centered at i
            while (transformed[i + (1 + P[i])] === transformed[i - (1 + P[i])]) {
                P[i]++;
            }
            
            // If palindrome centered at i extends past right, adjust center and right
            if (i + P[i] > right) {
                center = i;
                right = i + P[i];
            }
        }
        
        // Find longest palindrome
        let maxLen = 0;
        let centerIndex = 0;
        for (let i = 1; i < n - 1; i++) {
            if (P[i] > maxLen) {
                maxLen = P[i];
                centerIndex = i;
            }
        }
        
        let start = Math.floor((centerIndex - maxLen) / 2);
        return {
            substring: this.data.substring(start, start + maxLen),
            length: maxLen,
            allPalindromes: P
        };
    }

    // ==================================================
    // 4. ANAGRAM & PERMUTATION ALGORITHMS
    // ==================================================

    // Check if two strings are anagrams - O(n)
    isAnagram(str2) {
        if (this.length !== str2.length) return false;
        
        const charCount = {};
        
        // Count characters in first string
        for (let char of this.data) {
            charCount[char] = (charCount[char] || 0) + 1;
        }
        
        // Subtract characters from second string
        for (let char of str2) {
            if (!charCount[char]) return false;
            charCount[char]--;
        }
        
        return true;
    }

    // Find all anagrams in a string array - O(n*m) where n is array length, m is average string length
    static findAnagrams(stringArray) {
        const anagramGroups = {};
        
        for (let str of stringArray) {
            const sorted = str.split('').sort().join('');
            if (!anagramGroups[sorted]) {
                anagramGroups[sorted] = [];
            }
            anagramGroups[sorted].push(str);
        }
        
        return Object.values(anagramGroups).filter(group => group.length > 1);
    }

    // Generate all permutations - O(n!)
    generatePermutations() {
        const result = [];
        const chars = this.data.split('');
        
        function backtrack(current, remaining) {
            if (remaining.length === 0) {
                result.push(current.join(''));
                return;
            }
            
            for (let i = 0; i < remaining.length; i++) {
                const char = remaining[i];
                const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
                backtrack([...current, char], newRemaining);
            }
        }
        
        backtrack([], chars);
        return result;
    }

    // ==================================================
    // 5. SUBSTRING ALGORITHMS
    // ==================================================

    // All unique substrings - O(n²)
    getAllSubstrings() {
        const substrings = new Set();
        
        for (let i = 0; i < this.length; i++) {
            for (let j = i + 1; j <= this.length; j++) {
                substrings.add(this.data.substring(i, j));
            }
        }
        
        return Array.from(substrings);
    }

    // Longest substring without repeating characters - O(n)
    longestSubstringWithoutRepeating() {
        const charSet = new Set();
        let maxLength = 0;
        let start = 0;
        let maxStart = 0;
        
        for (let end = 0; end < this.length; end++) {
            while (charSet.has(this.data[end])) {
                charSet.delete(this.data[start]);
                start++;
            }
            
            charSet.add(this.data[end]);
            
            if (end - start + 1 > maxLength) {
                maxLength = end - start + 1;
                maxStart = start;
            }
        }
        
        return {
            substring: this.data.substring(maxStart, maxStart + maxLength),
            length: maxLength,
            startIndex: maxStart
        };
    }

    // ==================================================
    // 6. PATTERN MATCHING ALGORITHMS
    // ==================================================

    // Find all occurrences of multiple patterns - Aho-Corasick Algorithm
    ahoCorasickSearch(patterns) {
        const trie = this.buildAhoCorasickTrie(patterns);
        const matches = [];
        let currentState = 0;
        
        for (let i = 0; i < this.length; i++) {
            const char = this.data[i];
            
            // Follow failure links until we find a transition or reach root
            while (currentState !== 0 && !trie.goto[currentState][char]) {
                currentState = trie.failure[currentState];
            }
            
            // Make transition if possible
            if (trie.goto[currentState][char]) {
                currentState = trie.goto[currentState][char];
            }
            
            // Check for pattern matches at current state
            let temp = currentState;
            while (temp !== 0) {
                if (trie.output[temp].length > 0) {
                    for (let pattern of trie.output[temp]) {
                        matches.push({
                            pattern: pattern,
                            position: i - pattern.length + 1,
                            endPosition: i
                        });
                    }
                }
                temp = trie.failure[temp];
            }
        }
        
        return matches;
    }

    buildAhoCorasickTrie(patterns) {
        const trie = {
            goto: [{}],
            failure: [0],
            output: [[]]
        };
        let stateCount = 1;
        
        // Build goto function
        for (let pattern of patterns) {
            let currentState = 0;
            for (let char of pattern) {
                if (!trie.goto[currentState][char]) {
                    trie.goto[currentState][char] = stateCount;
                    trie.goto[stateCount] = {};
                    trie.failure[stateCount] = 0;
                    trie.output[stateCount] = [];
                    stateCount++;
                }
                currentState = trie.goto[currentState][char];
            }
            trie.output[currentState].push(pattern);
        }
        
        // Build failure function using BFS
        const queue = [];
        for (let char in trie.goto[0]) {
            const state = trie.goto[0][char];
            trie.failure[state] = 0;
            queue.push(state);
        }
        
        while (queue.length > 0) {
            const currentState = queue.shift();
            
            for (let char in trie.goto[currentState]) {
                const nextState = trie.goto[currentState][char];
                queue.push(nextState);
                
                let failure = trie.failure[currentState];
                while (failure !== 0 && !trie.goto[failure][char]) {
                    failure = trie.failure[failure];
                }
                
                if (trie.goto[failure] && trie.goto[failure][char]) {
                    trie.failure[nextState] = trie.goto[failure][char];
                } else {
                    trie.failure[nextState] = 0;
                }
                
                // Merge output
                trie.output[nextState] = trie.output[nextState].concat(trie.output[trie.failure[nextState]]);
            }
        }
        
        return trie;
    }

    // ==================================================
    // 7. STRING TRANSFORMATION ALGORITHMS
    // ==================================================

    // Run Length Encoding - O(n)
    runLengthEncode() {
        if (this.length === 0) return '';
        
        let encoded = '';
        let count = 1;
        let currentChar = this.data[0];
        
        for (let i = 1; i < this.length; i++) {
            if (this.data[i] === currentChar) {
                count++;
            } else {
                encoded += count + currentChar;
                currentChar = this.data[i];
                count = 1;
            }
        }
        
        encoded += count + currentChar;
        return encoded;
    }

    // Run Length Decode - O(n)
    static runLengthDecode(encoded) {
        let decoded = '';
        let i = 0;
        
        while (i < encoded.length) {
            let count = '';
            while (i < encoded.length && !isNaN(encoded[i])) {
                count += encoded[i];
                i++;
            }
            
            if (i < encoded.length) {
                const char = encoded[i];
                decoded += char.repeat(parseInt(count));
                i++;
            }
        }
        
        return new ComprehensiveString(decoded);
    }

    // ==================================================
    // 8. REAL-WORLD STRING APPLICATIONS
    // ==================================================

    // 1. URL/Email Validation
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validateURL(url) {
        const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
        return urlRegex.test(url);
    }

    // 2. Text Processing - Word frequency
    wordFrequency() {
        const words = this.data.toLowerCase().match(/\b\w+\b/g) || [];
        const frequency = {};
        
        for (let word of words) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
        
        return Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .map(([word, count]) => ({ word, count }));
    }

    // 3. DNA Sequence Analysis
    dnaAnalysis() {
        const bases = { A: 0, T: 0, G: 0, C: 0 };
        let gcCount = 0;
        
        for (let base of this.data.toUpperCase()) {
            if (bases.hasOwnProperty(base)) {
                bases[base]++;
                if (base === 'G' || base === 'C') {
                    gcCount++;
                }
            }
        }
        
        return {
            composition: bases,
            gcContent: (gcCount / this.length * 100).toFixed(2) + '%',
            length: this.length,
            complement: this.data.toUpperCase()
                .replace(/A/g, 't')
                .replace(/T/g, 'a')
                .replace(/G/g, 'c')
                .replace(/C/g, 'g')
                .toUpperCase()
        };
    }

    // 4. Log File Analysis
    static analyzeLogFile(logData) {
        const lines = logData.split('\n');
        const analysis = {
            totalLines: lines.length,
            errorCount: 0,
            warningCount: 0,
            infoCount: 0,
            ipAddresses: new Set(),
            timestamps: []
        };
        
        const ipRegex = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g;
        const timestampRegex = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/g;
        
        for (let line of lines) {
            const lowerLine = line.toLowerCase();
            
            if (lowerLine.includes('error')) analysis.errorCount++;
            if (lowerLine.includes('warning')) analysis.warningCount++;
            if (lowerLine.includes('info')) analysis.infoCount++;
            
            const ips = line.match(ipRegex);
            if (ips) ips.forEach(ip => analysis.ipAddresses.add(ip));
            
            const timestamps = line.match(timestampRegex);
            if (timestamps) analysis.timestamps.push(...timestamps);
        }
        
        analysis.uniqueIPs = analysis.ipAddresses.size;
        analysis.ipAddresses = Array.from(analysis.ipAddresses);
        
        return analysis;
    }

    // 5. Code Analysis - Find function definitions
    findFunctionDefinitions() {
        const functionRegex = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)/g;
        const arrowFunctionRegex = /const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\([^)]*\)\s*=>/g;
        const methodRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*\{/g;
        
        const functions = [];
        let match;
        
        // Regular functions
        while ((match = functionRegex.exec(this.data)) !== null) {
            functions.push({
                name: match[1],
                type: 'function',
                position: match.index,
                declaration: match[0]
            });
        }
        
        // Arrow functions
        while ((match = arrowFunctionRegex.exec(this.data)) !== null) {
            functions.push({
                name: match[1],
                type: 'arrow',
                position: match.index,
                declaration: match[0]
            });
        }
        
        // Methods
        while ((match = methodRegex.exec(this.data)) !== null) {
            functions.push({
                name: match[1],
                type: 'method',
                position: match.index,
                declaration: match[0]
            });
        }
        
        return functions.sort((a, b) => a.position - b.position);
    }

    // 6. Plagiarism Detection using Shingling
    static plagiarismDetection(text1, text2, k = 3) {
        function getShingles(text, k) {
            const shingles = new Set();
            const cleanText = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ');
            
            for (let i = 0; i <= cleanText.length - k; i++) {
                shingles.add(cleanText.substring(i, i + k));
            }
            return shingles;
        }
        
        const shingles1 = getShingles(text1, k);
        const shingles2 = getShingles(text2, k);
        
        const intersection = new Set([...shingles1].filter(x => shingles2.has(x)));
        const union = new Set([...shingles1, ...shingles2]);
        
        const jaccardSimilarity = intersection.size / union.size;
        
        return {
            similarity: (jaccardSimilarity * 100).toFixed(2) + '%',
            commonShingles: intersection.size,
            totalShingles: union.size,
            shingleSize: k
        };
    }

    // Utility methods
    toString() { return this.data; }
    charAt(index) { return this.data[index]; }
    substring(start, end) { return new ComprehensiveString(this.data.substring(start, end)); }
}

// ==================================================
// COMPREHENSIVE DEMONSTRATION
// ==================================================

console.log('🚀 COMPREHENSIVE STRING ALGORITHMS DEMONSTRATION\n');

// 1. STRING SEARCHING ALGORITHMS
console.log('🔍 STRING SEARCHING ALGORITHMS:');
const text = new ComprehensiveString('AABAACAADAABAABA');
const pattern = 'AABA';
console.log('Text:', text.toString());
console.log('Pattern:', pattern);
console.log('Naive Search:', text.naiveSearch(pattern));
console.log('KMP Search:', text.kmpSearch(pattern));
console.log('Rabin-Karp Search:', text.rabinKarpSearch(pattern));
console.log();

// 2. STRING MATCHING & COMPARISON
console.log('🔗 STRING MATCHING & COMPARISON:');
const str1 = new ComprehensiveString('ABCDGH');
const str2 = 'AEDFHR';
console.log('String 1:', str1.toString());
console.log('String 2:', str2);
console.log('LCS:', str1.longestCommonSubsequence(str2));
console.log('Edit Distance:', str1.editDistance(str2));
console.log();

// 3. PALINDROME ALGORITHMS
console.log('🪞 PALINDROME ALGORITHMS:');
const palindromeStr = new ComprehensiveString('babad');
console.log('String:', palindromeStr.toString());
console.log('Is Palindrome:', palindromeStr.isPalindrome());
console.log('Longest Palindromic Substring:', palindromeStr.longestPalindromicSubstring());
console.log('Manacher Algorithm:', palindromeStr.manacherAlgorithm());
console.log();

// 4. ANAGRAM & PERMUTATION ALGORITHMS
console.log('🔄 ANAGRAM & PERMUTATION ALGORITHMS:');
const anagram1 = new ComprehensiveString('listen');
const anagram2 = 'silent';
console.log('String 1:', anagram1.toString());
console.log('String 2:', anagram2);
console.log('Are Anagrams:', anagram1.isAnagram(anagram2));

const anagramGroups = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
console.log('Anagram Groups:', ComprehensiveString.findAnagrams(anagramGroups));

const permStr = new ComprehensiveString('abc');
console.log('Permutations of "abc":', permStr.generatePermutations());
console.log();

// 5. SUBSTRING ALGORITHMS
console.log('📝 SUBSTRING ALGORITHMS:');
const subStr = new ComprehensiveString('abcabcbb');
console.log('String:', subStr.toString());
console.log('Longest Substring Without Repeating:', subStr.longestSubstringWithoutRepeating());
console.log('All Unique Substrings:', subStr.getAllSubstrings().slice(0, 10), '...(truncated)');
console.log();

// 6. PATTERN MATCHING - AHO-CORASICK
console.log('🎯 MULTI-PATTERN MATCHING:');
const ahoText = new ComprehensiveString('ushers');
const patterns = ['he', 'she', 'his', 'hers'];
console.log('Text:', ahoText.toString());
console.log('Patterns:', patterns);
console.log('Aho-Corasick Matches:', ahoText.ahoCorasickSearch(patterns));
console.log();

// 7. STRING TRANSFORMATION
console.log('🔄 STRING TRANSFORMATION:');
const rleStr = new ComprehensiveString('aaabbcccc');
console.log('Original:', rleStr.toString());
const encoded = rleStr.runLengthEncode();
console.log('Run Length Encoded:', encoded);
console.log('Decoded:', ComprehensiveString.runLengthDecode(encoded).toString());
console.log();

// 8. REAL-WORLD APPLICATIONS
console.log('🌍 REAL-WORLD APPLICATIONS:\n');

// Email/URL Validation
console.log('📧 EMAIL/URL VALIDATION:');
console.log('Valid Email:', ComprehensiveString.validateEmail('user@example.com'));
console.log('Invalid Email:', ComprehensiveString.validateEmail('invalid-email'));
console.log('Valid URL:', ComprehensiveString.validateURL('https://www.example.com'));
console.log();

// Text Analysis
console.log('📊 TEXT ANALYSIS:');
const textAnalysis = new ComprehensiveString('The quick brown fox jumps over the lazy dog. The dog was lazy.');
console.log('Text:', textAnalysis.toString());
console.log('Word Frequency:', textAnalysis.wordFrequency());
console.log();

// DNA Analysis
console.log('🧬 DNA SEQUENCE ANALYSIS:');
const dnaSequence = new ComprehensiveString('ATCGATCGATCG');
console.log('DNA Sequence:', dnaSequence.toString());
console.log('Analysis:', dnaSequence.dnaAnalysis());
console.log();

// Log File Analysis
console.log('📋 LOG FILE ANALYSIS:');
const logData = `2024-01-01 10:00:00 INFO User 192.168.1.1 logged in
2024-01-01 10:05:00 WARNING High memory usage detected
2024-01-01 10:10:00 ERROR Database connection failed from 192.168.1.2
2024-01-01 10:15:00 INFO System backup completed`;

console.log('Log Analysis:', ComprehensiveString.analyzeLogFile(logData));
console.log();

// Code Analysis
console.log('💻 CODE ANALYSIS:');
const codeStr = new ComprehensiveString(`
function getData() { return data; }
const processData = (data) => { return processed; }
class MyClass {
    method1() { console.log('method1'); }
    method2(param) { return param * 2; }
}
`);
console.log('Function Definitions Found:', codeStr.findFunctionDefinitions());
console.log();

// Plagiarism Detection
console.log('🕵️ PLAGIARISM DETECTION:');
const text1 = 'The quick brown fox jumps over the lazy dog';
const text2 = 'A quick brown fox jumped over a lazy dog';