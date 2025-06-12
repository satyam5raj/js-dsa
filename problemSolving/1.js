// Group Anagram 
// You are given an array of strings. Your task is to group the strings that are anagrams of each
// other into separate lists. Two strings are considered anagrams if they contain the same
// characters in the same frequencies, regardless of their order.
// Write an algorithm to group the strings into their respective anagram groups.
// Input:
// An array of strings, e.g., ["eat", "tea", "tan", "ate", "nat", "bat"].
// Output:
// A list of groups where each group contains strings that are anagrams of each other.
// For example, Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]].
// Example:
// Input: ["eat", "tea", "tan", "ate", "nat", "bat"]
// Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]


// function groupAnagrams(strs) {
//   const groupMap = new Map();
//   console.log("Initial groupMap:", groupMap);

//   for (let str of strs) {
//     console.log(`\nProcessing string: "${str}"`);

//     const charCount = {};
//     for (let char of str) {
//       charCount[char] = (charCount[char] || 0) + 1;
//     }
//     console.log("Character count:", charCount);

//     const sortedEntries = Object.entries(charCount).sort(([a], [b]) => a.localeCompare(b));
//     console.log("Sorted entries:", sortedEntries);

//     const mappedEntries = sortedEntries.map(([char, count]) => `${char}:${count}`);
//     console.log("Mapped entries to string format:", mappedEntries);

//     const key = mappedEntries.join(',');
//     console.log("Generated key:", key);

//     if (!groupMap.has(key)) {
//       console.log(`Key "${key}" not found in groupMap. Initializing new group.`);
//       groupMap.set(key, []);
//     }

//     groupMap.get(key).push(str);
//     console.log(`Updated group for key "${key}":`, groupMap.get(key));
//   }

//   const result = Array.from(groupMap.values());
//   console.log("\nFinal grouped anagrams:", result);
//   return result;
// }


// Alternate way 

function groupAnagrams(strs) {
  const map = new Map();
  console.log("Initial empty map:", map);

  for (let str of strs) {
    console.log(`\nProcessing string: "${str}"`);

    // Step 1: Split the string into characters
    const chars = str.split('');
    console.log("Split characters:", chars);

    // Step 2: Sort the characters alphabetically
    const sortedChars = chars.sort();
    console.log("Sorted characters:", sortedChars);

    // Step 3: Join back to form the key
    const key = sortedChars.join('');
    console.log("Generated key:", key);

    // Step 4: Add to map
    if (!map.has(key)) {
      console.log(`Key "${key}" not found in map. Initializing new group.`);
      map.set(key, []);
    }

    console.log(`Adding "${str}" to group with key "${key}"`);
    map.get(key).push(str);
    console.log(`Current group for key "${key}":`, map.get(key));
  }

  const result = Array.from(map.values());
  console.log("\nFinal grouped anagrams:", result);
  return result;
}



console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
