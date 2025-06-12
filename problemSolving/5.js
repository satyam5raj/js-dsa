// Given two strings s and t, return the minimum window in s which contains all the
// characters in t.
// Input:
// s = "ADOBECODEBANC",
// t = "ABC"
// Output: "BANC"



// function minWindowBruteForce(s, t) {
//     console.time("Brute Force Time");
//     let minLen = Infinity;
//     let minWindow = "";

//     function containsAll(subStr, targetMap) {
//         const subMap = {};
//         for (const ch of subStr) {
//             subMap[ch] = (subMap[ch] || 0) + 1;
//         }

//         for (const ch in targetMap) {
//             if (!subMap[ch] || subMap[ch] < targetMap[ch]) {
//                 return false;
//             }
//         }
//         return true;
//     }

//     const tMap = {};
//     for (const ch of t) {
//         tMap[ch] = (tMap[ch] || 0) + 1;
//     }

//     for (let start = 0; start < s.length; start++) {
//         for (let end = start + 1; end <= s.length; end++) {
//             const subStr = s.substring(start, end);
//             console.log(`Checking substring: "${subStr}"`);
//             if (containsAll(subStr, tMap)) {
//                 if (subStr.length < minLen) {
//                     minLen = subStr.length;
//                     minWindow = subStr;
//                     console.log(`New min window: "${minWindow}"`);
//                 }
//             }
//         }
//     }

//     console.timeEnd("Brute Force Time");
//     return minWindow;
// }





// function minWindowOptimized(s, t) {
//     console.time("Optimized Time");

//     if (t.length > s.length) return "";

//     const tMap = {};
//     for (const ch of t) {
//         tMap[ch] = (tMap[ch] || 0) + 1;
//     }

//     let left = 0, right = 0;
//     let minLen = Infinity;
//     let minWindow = "";

//     const windowMap = {};
//     let have = 0, need = Object.keys(tMap).length;

//     while (right < s.length) {
//         const ch = s[right];
//         windowMap[ch] = (windowMap[ch] || 0) + 1;

//         if (tMap[ch] && windowMap[ch] === tMap[ch]) {
//             have++;
//         }

//         console.log(`Window [${left}, ${right}] => ${s.slice(left, right + 1)} | Have: ${have}, Need: ${need}`);

//         while (have === need) {
//             if (right - left + 1 < minLen) {
//                 minLen = right - left + 1;
//                 minWindow = s.slice(left, right + 1);
//                 console.log(`Updated minWindow: "${minWindow}"`);
//             }

//             const leftChar = s[left];
//             windowMap[leftChar]--;
//             if (tMap[leftChar] && windowMap[leftChar] < tMap[leftChar]) {
//                 have--;
//             }
//             left++;
//         }

//         right++;
//     }

//     console.timeEnd("Optimized Time");
//     return minWindow;
// }



const s = "ADOBECODEBANC";
const t = "ABC";

// console.log("\n--- Brute Force Result ---");
// const resultBrute = minWindowBruteForce(s, t);
// console.log("Brute Force Output:", resultBrute);

// console.log("\n--- Optimized Result ---");
// const resultOptimized = minWindowOptimized(s, t);
// console.log("Optimized Output:", resultOptimized);


var minWindow = function(s, t) {

    const tCount = getCountMap(t);
    console.log("tcount.......",tCount)

    let minLen = Infinity;
    let result = "";

    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j <= s.length; j++) {
            const window = s.substring(i, j);
            const windowCount = getCountMap(window);

            if (containsAll(windowCount, tCount)) {
                if (window.length < minLen) {
                    minLen = window.length;
                    result = window;
                }
            }
        }
    }
    return result;
};

function getCountMap(str) {
    const map = {};
    for (const char of str) {
        map[char] = (map[char] || 0) + 1;
    }
    return map;
}

function containsAll(winMap, targetMap) {
    for (const char in targetMap) {
        if (!winMap[char] || winMap[char] < targetMap[char]) return false;
    }
    return true;
}
