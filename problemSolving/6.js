// Longest substring without reapeting characters 

// function lengthOfLongestSubstring(s) {
//     let maxLength = 0;

//     for (let i = 0; i < s.length; i++) {
//         let seen = new Set();
//         console.log("Seen-", seen);
//         for (let j = i; j < s.length; j++) {
//             if (seen.has(s[j])) {
//                 console.log(`Duplicate ${s[j]} found in substring: "${s.slice(i, j)}"`);
//                 break;
//             }
//             seen.add(s[j]);
//             console.log(`Adding ${s[j]} to set:`, [...seen]);
//             maxLength = Math.max(maxLength, j - i + 1);
//             console.log("Maxlength-", maxLength)
//         }
//     }

//     console.log("Final maxLength:", maxLength);
//     return maxLength;
// }


// function lengthOfLongestSubstring(s) {
//     let left = 0;
//     let maxLen = 0;
//     const seen = new Set();

//     for (let right = 0; right < s.length; right++) {
//         while (seen.has(s[right])) {
//             console.log(`Removing ${s[left]} from set`);
//             seen.delete(s[left]);
//             left++;
//         }

//         seen.add(s[right]);
//         console.log(`Window: ${s.slice(left, right + 1)}, Set:`, [...seen]);
//         maxLen = Math.max(maxLen, right - left + 1);
//     }

//     console.log("Final maxLen:", maxLen);
//     return maxLen;
// }


function lengthOfLongestSubstring(s) {
    let left = 0;
    let maxLen = 0;
    const seen = new Set();

    console.log(`Input string: "${s}"`);
    console.log("--------------------------------");

    for (let right = 0; right < s.length; right++) {
        console.log(`Right pointer at index ${right}, character: "${s[right]}"`);

        // If duplicate found, shrink window from the left
        while (seen.has(s[right])) {
            console.log(`  Duplicate "${s[right]}" found! Removing "${s[left]}" at index ${left} from set`);
            seen.delete(s[left]);
            left++;
            console.log(`  Moved left pointer to index ${left}`);
        }

        seen.add(s[right]);
        console.log(`  Added "${s[right]}" to set:`, [...seen]);

        const currentWindowLength = right - left + 1;
        maxLen = Math.max(maxLen, currentWindowLength);

        console.log(`  Current window: "${s.slice(left, right + 1)}"`);
        console.log(`  Current window length: ${currentWindowLength}`);
        console.log(`  Max length so far: ${maxLen}`);
        console.log("--------------------------------");
    }

    console.log(`Final result (length of longest substring without repeating characters): ${maxLen}`);
    return maxLen;
}


lengthOfLongestSubstring("abcabcbb");
// Output: 3 ("abc")
