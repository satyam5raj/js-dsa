// Given a string paragraph and a string array of the banned words banned, return the most frequent word that is not banned. It is guaranteed there is at least one word that is not banned, and that the answer is unique.

// The words in the paragraph are case-insensitive and the answer should be returned in lowercase.

// Example 1:

// Input: paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]
// Output: "ball"
// Explanation:
// "hit" occurs 3 times, but it is a banned word.
// "ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph.
// Note that words in the paragraph are not case sensitive,
// that punctuation is ignored (even if adjacent to words, such as "ball,"),
// and that "hit" isn't the answer even though it occurs more because it is banned.
// Example 2:

// Input: paragraph = "a.", banned = []
// Output: "a"

// const paragraph = 'Bob hit a ball, the hit BALL flew far after it was hit.';
// const banned = ['hit'];

const paragraph = 'a.';
const banned = [];
// Output: "a"

function mostCommonWords(paragraph, banned) {
  const lowerCasePara = paragraph
    .toLowerCase()
    .replace(',', '')
    .replace('.', '');
  console.log(lowerCasePara);

  const words = lowerCasePara.split(' ');
  console.log('words: ', words);

  const mySet = new Set(banned);
  console.log(mySet);

  const myMap = {};
  for (const word of words) {
    if (!mySet.has(word)) {
      myMap[word] = (myMap[word] || 0) + 1;
    }
  }
  console.log('myMap: ', myMap);

  let count = 0;
  let highestWord = '';
  for (const word in myMap) {
    if (myMap[word] > count) {
      count = myMap[word];
      highestWord = word;
    }
  }
  return highestWord;
}

console.log(mostCommonWords(paragraph, banned));