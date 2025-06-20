// let str = "javascript";
// console.log(str.length)

// + is used to concat strings 
// let s1 = "java"
// let s2 = "script"
// console.log(s1+s2)

// const s1 = "\'GfG\' is a learning portal";
// const s2 = "\"GfG\" is a learning portal";
// const s3 = "\\GfG\\ is a learning portal";
// console.log(s1);
// console.log(s2);
// console.log(s3);

// let s1 = 'JavaScript Tutorial';
// let s2 = s1.substring(0, 10);
// console.log(s2);

// let s = 'JavaScript';
// let uCase = s.toUpperCase();
// let lCase = s.toLowerCase();
// console.log(uCase);
// console.log(lCase);


// first index of a substring within a string using indexOf() method.
// let s1 = 'def abc abc';
// let i = s1.indexOf('abc');
// console.log(i);  // 4

// let s1 = 'Java is OOPs oriented language';
// let s2 = s1.replace('Java', 'Javascript');
// console.log(s2);

// let s1 = '    Learn JavaScript       ';
// let s2 = s1.trim();
// console.log(s2);  // Learn JavaScript


// let s1 = 'Learn JavaScript';
// let s2 = s1[6];
// console.log(s2);
// s2 = s1.charAt(6);
// console.log(s2);



// String methods ---------------------------------------------------------------------------------------------------------------
// slice() extracts a part of the string based on the given starting-index and ending-index and returns a new string.
// substring() returns the part of the given string from the start index to the end index. Please see String.slice and String.substring for details.
// substr() This method returns the specified number of characters from the specified index from the given string. It extracts a part of the original string.
// replace() replaces a part of the given string with another string or a regular expression. The original string will remain unchanged.
// replaceAll() returns a new string after replacing all the matches of a string with a specified string or a regular expression. The original string is left unchanged after this operation.
// toUpperCase() converts all the characters present in the String to upper case and returns a new String with all characters in upper case. This method accepts a single parameter stringVariable string that you want to convert in upper case.
// toLowerCase() converts all the characters present in the so lowercase and returns a new string with all the characters in lowercase.
// trim() is used to remove either white spaces from the given string. This method returns a new string with removed white spaces. This method is called on a String object. This method doesn't accept any parameter.
// trimStart() removes whitespace from the beginning of a string. The value of the string is not modified in any manner, including any whitespace present after the string.
// trimEnd() removes white space from the end of a string. The value of the string is not modified in any manner, including any white-space present before the string.
// padStart() pad a string with another string until it reaches the given length. The padding is applied from the left end of the string.
// padEnd() pad a string with another string until it reaches the given length. The padding is applied from the right end of the string.
// charAt() returns the character at the specified index.
// charCodeAt() returns a number that represents the Unicode value of the character at the specified index. This method accepts one argument.
// split() splits the string into an array of sub-strings. This method returns an array. This method accepts a single parameter character on which you want to split the string.


// let A = 'Geeks for Geeks';
// // Use the slice() method to extract a substring
// let b = A.slice(0, 5);
// // Output the value of variable
// console.log(b);   // Geeks


// let str = "Mind, Power, Soul";
// // Use the substring() method to extract a substring 
// let part = str.substring(6, 11);
// // Output the value of variable
// console.log(part);   // Power


// let str = "Mind, Power, Soul";
// // Use the substr() method to extract a substring f
// let part = str.substr(6, 4);
// // Output the value of variable
// console.log(part);


// let str = "Mind, Power, Soul";
// // Use the replace() method to replace the substring
// let part = str.replace("Power", "Space");
// // Output the resulting string after replacement
// console.log(part);


// let str = "Mind, Power, Power, Soul";
// // Use the replaceAll() method to replace all occurrences
// //of "Power" with "Space" in the string 'str'
// let part = str.replaceAll("Power", "Space");
// // Output the resulting string after replacement
// console.log(part);


// let gfg = 'GeeksforGeeks'; 
// console.log(gfg.charAt(1)); 
// console.log(gfg.charCodeAt(1));


// let str = "He is a good boy"
// console.log(str.split(' '))   // [ 'He', 'is', 'a', 'good', 'boy' ]

// let str = "javascript";
// console.log(str.at(1));
// console.log(str.includes('a'));
// console.log(str.lastIndexOf('a'))

// let arr = [ 'He', 'is', 'a', 'good', 'boy' ];
// console.log(arr.join(' '))