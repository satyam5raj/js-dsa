// Write a program to print all 6-digit palindromes. A palindrome is a number that
// reads the same forward and backward. 

// function isPalindrome(num) {
//     const str = num.toString();
//     return str === str.split('').reverse().join('');
// }

// function printAll6DigitPalindromesBruteForce() {
//     console.log("Brute Force: Start checking from 100000 to 999999...");
//     for (let i = 100000; i <= 999999; i++) {
//         if (isPalindrome(i)) {
//             console.log(`Found palindrome: ${i}`);
//         }
//         // Debug logging every 100000 iterations to monitor progress
//         if (i % 100000 === 0) {
//             console.log(`Checked till: ${i}`);
//         }
//     }
//     console.log("Brute Force: Completed.");
// }

// printAll6DigitPalindromesBruteForce();


// function printAll6DigitPalindromesOptimized() {
//     console.log("Optimized: Generating 6-digit palindromes by mirroring...");

//     for (let firstHalf = 100; firstHalf <= 999; firstHalf++) {
//         const strHalf = firstHalf.toString();
//         const reversed = strHalf.split('').reverse().join('');
//         const palindromeStr = strHalf + reversed;
//         const palindromeNum = parseInt(palindromeStr, 10);

//         console.log(`Constructed palindrome: ${palindromeNum}`);
//     }

//     console.log("Optimized: Completed.");
// }

// printAll6DigitPalindromesOptimized();


// function printAll6DigitPalindromesPatternWay() {
//     console.log("Pattern-based: Generating palindromes in the form xyzzyx...");

//     for (let x = 1; x <= 9; x++) {
//         for (let y = 0; y <= 9; y++) {
//             for (let z = 0; z <= 9; z++) {
//                 // Construct the number: xyzzyx
//                 const palindrome = x * 100000 + y * 10000 + z * 1000 + z * 100 + y * 10 + x;
//                 console.log(`Constructed palindrome: ${palindrome}`);
//             }
//         }
//     }

//     console.log("Pattern-based: Completed.");
// }

// printAll6DigitPalindromesPatternWay();


function printAll6DigitPalindromesPatternWay() {
    console.log("Pattern-based: Generating palindromes in the form xyzzyx (string-based)...");
    let result = []
    for (let x = 1; x <= 9; x++) {
        for (let y = 0; y <= 9; y++) {
            for (let z = 0; z <= 9; z++) {
                // Use string concatenation: `${x}${y}${z}${z}${y}${x}`
                const palindromeStr = `${x}${y}${z}${z}${y}${x}`;
                const palindromeNum = parseInt(palindromeStr, 10);
                result.push(palindromeNum);
                // console.log(`Constructed palindrome: ${palindromeNum}`);
            }
        }
    }
    console.log("Pattern-based: Completed.");
    return result;
}

// printAll6DigitPalindromesPatternWay();
console.log(printAll6DigitPalindromesPatternWay());