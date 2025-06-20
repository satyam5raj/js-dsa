// Input: String s and a list of words.
// Output: True if s can be assembled of words from the list (each word can appear more than once), false otherwise.
// E.g.
// Input: "vonage", ["vo", "light", "age", "n"]
// Output: true ("vo" + "n" + "age" = "vonage").
// Input: "foo", ["f", "o", "b"]
// Output: true ("f" + "o" + "o" = "foo").
// Input: "bar", ["f", "o"]
// Output: false.

function canFormWord(s, wordList) {
  const wordSet = new Set(wordList); // For O(1) lookup
  const dp = new Array(s.length + 1).fill(false); // DP[i] = can s[0..i-1] be formed
  dp[0] = true; // Empty string is always "formable"

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      const sub = s.slice(j, i); // substring from j to i-1
      if (dp[j] && wordSet.has(sub)) {
        dp[i] = true;

        console.log(`Matched '${sub}' from index ${j} to ${i}, setting dp[${i}] = true`);
        break; // Once we find a valid split, no need to continue
      }
    }

    console.log(`dp[${i}] =`, dp[i]);
  }

  return dp[s.length]; // True if full string can be formed
}

// 🔍 Test Inputs
const s1 = "vonage";
const array1 = ["vo", "n", "age", "light"];
console.log("Can form word? ", canFormWord(s1, array1)); // true

const s2 = "foo";
const array2 = ["f", "o", "b"];
console.log("Can form word? ", canFormWord(s2, array2)); // true

const s3 = "bar";
const array3 = ["f", "o"];
console.log("Can form word? ", canFormWord(s3, array3)); // false



// Recursive method ------------------------------------------------------------------------------------------------------------------------------------

function formWord(s, wordList) {
  const wordSet = new Set(wordList); // For O(1) lookup
  const memo = {}; // To memoize already solved subproblems

  // Recursive helper function
  function canBreak(startIndex) {
    // Base case: we've checked the full string
    if (startIndex === s.length) return true;

    // Memoized result
    if (memo[startIndex] !== undefined) return memo[startIndex];

    // Try all possible substrings starting at startIndex
    for (let end = startIndex + 1; end <= s.length; end++) {
      const word = s.slice(startIndex, end);
      console.log(`Trying word: '${word}' from index ${startIndex} to ${end}`);

      if (wordSet.has(word)) {
        console.log(`Found word '${word}' in dictionary`);

        if (canBreak(end)) {
          memo[startIndex] = true;
          return true;
        }
      }
    }

    // No valid segmentation found
    memo[startIndex] = false;
    return false;
  }

  return canBreak(0);
}

// 🔍 Test Inputs
const s = "vonage";
const array = ["vo", "n", "age", "light"];

console.log("Can form word?", formWord(s, array));
