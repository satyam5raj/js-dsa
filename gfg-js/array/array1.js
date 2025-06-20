// CONVERT SET TO AN ARRAY -----------------------------------------------------------------------------------------------------------

// let s = new Set(['GFG', 'JS']);

// let a = [...s]   // Using spread operator

// let a = Array.from(s)   // Using Array.from()

// let a = [];
// let fun = function(val){
//     a.push(val)
// }
// s.forEach(fun);  // Using forEach() method

// console.log(a)

// Array to Set
// let arr = [1, 2, 2, 3, 4, 3, 5];
// let uniqueSet = new Set(arr);
// console.log(uniqueSet); // Set(5) { 1, 2, 3, 4, 5 }

// SET vs ARRAY -------------------------------------------------------------------------------------------------------------------------

// let sample = new Set();
// sample.add("A");
// sample.add("A");
// sample.add(2);
// sample.add("B");

// for(let value of sample){
//     console.log("Set: ", value)
// }

// let array = [...sample];
// console.log(array);

// let sampleArray = new Array();
// sampleArray.push("A");
// sampleArray.push("A");
// sampleArray.push(2);
// sampleArray.push("B")

// console.log(sampleArray);
// console.log(sampleArray[2]);


// ARRAY METHODS ----------------------------------------------------------------------------------------------------------------------------

// let arr = ["HTML", "CSS", "JS", "React"];
// console.log(arr.length)

// let array = [10, 20, 30, 110, 60];
// console.log(array.indexOf(10))

// let array = [10, 20, 30, 110, 60];
// function finding_index(element) {
//     return element > 25;
// }
// console.log(array
//     .findIndex(finding_index)
// );

// let s = arr.toString();
// console.log(s)

// console.log(arr.join('|'))

// let emp = { 
//     firstName: "Riya", 
//     lastName: "Kaur", 
//     salary: 40000
// } 

// console.log(delete emp.salary); 
// console.log(emp);

// let a1 = [1, 2, 3];
// let a2 = [4, 5, 6];
// let a3 = [7, 8, 9];

// let newArr = a1.concat(a2);
// let newArr = a1.concat(a2, a3);
// console.log(newArr)

// const a1 = [["1", "2"], ["3", "4", "5", ["6", "7"], "8"], "9"];
// const a2 = a1.flat()
// const a2 = a1.flat(Infinity)
// console.log(a2)

// let a = [1, 2, 3, 4]
// a.push(5);
// a.push(6, 7, 8);
// console.log(a)

// let a = [10, 20, 30];
// a.unshift(5);   // [ 5, 10, 20, 30 ]
// a.unshift(10, 20);   // [ 10, 20, 5, 10, 20, 30 ]
// console.log(a)

// let a = [1, 2, 3, 4, 5];
// a.pop()
// console.log(a)

// let a = [10, 20, 30, 40, 50];
// a.shift();  // [ 20, 30, 40, 50 ]
// console.log(a)

// splice() method is used to insert and remove elements in between the array
// splice(index, 0 or 1 - 0 for adding and 1 for removing, elements)

// let a = [10, 20, 30, 40, 50];
// a.splice(1, 3)
// console.log(a)   // [ 10, 50 ]
// a.splice(1, 0, 3, 4, 5)
// console.log(a)   // [ 10, 3, 4, 5, 50 ]
// a.splice(1, 1);
// console.log(a)    // [ 10, 4, 5, 50 ]


// slice() method returns new array containing a portion of the original array
// slice(startIndex, endIndex)

// const a = [1, 2, 3, 4, 5];
// const res = a.slice(1,4);
// console.log(res)    // [ 2, 3, 4 ]
// console.log(a)      // [ 1, 2, 3, 4, 5 ]

// some() checks at least one of the elements of array satisfies the condition 
// const a = [1, 2, 3, 4, 5];
// let res = a.some((val) => val > 4);
// console.log(res);

// map() method
// let a = [2, 4, 6, 8];
// function square(num){
//     return num*num
// }
// let b = a.map(square)
// let b = a.map((n) => square(n));
// console.log(b)

// let a = [4, 9, 16, 25];
// let sub = a.map(geeks);

// function geeks() {
//     return a.map(Math.sqrt);
// }
// console.log(sub);

// filter() method
// let a1 = [1, 2, 3, 4];
// let a2 = a1.filter((num) => num > 1);
// console.log(a2);

// find() method 
// let a1 = [1, 2, 3, 4];
// let a2 = a1.find((num) => num == 1);
// console.log(a2);

// reduce() method 
// let a = [1, 2, 3, 4];
// let sum = a.reduce((acc, val) => {
//     return acc + val;
// }, 0);
// console.log(sum)

// let a = [88, 50, 25, 10];
// let sub = a.reduce(geeks);

// function geeks(tot, num) {
//     return tot - num;
// }
// console.log(sub);


// reverse() method 
// let a = [1, 2, 3, 4, 5];
// a.reverse();
// console.log(a)


// values() method 
// const a = ["Apple", "Banana", "Cherry"];
// const res = a.values();
// console.log(res)
// for(const value of res){
//     console.log(value);
// }



// let numbers = [88, 50, 25, 10];
// // Performing sort method
// let sub = numbers.sort(geeks);
// function geeks(a, b) {
//     return a - b;
// }
// console.log(sub);

// console.log(numbers.sort((a,b) => a-b))    // Aescending order
// console.log(numbers.sort((a,b) => b-a))    // Descending order



// let A = [1, 2, 3, 4, 5];
// let a = A.includes(2);
// console.log(a);


// let a = [1, 2, 3, 4, 5];
// let find = a.find(function (elem) {
//     return elem > 4
// });
// console.log(find);

// let val = a.findIndex(function (elem) {
//     return elem >= 4
// });
// console.log(val);


// let a = [1, 2, 3, 4, 5];
// let n1 = a.every(
//     function (elem) {
//         return elem > 0
//     });
// let n2 = a.some(
//     function (elem) {
//         return elem < 0
//     });
// console.log(n1);
// console.log(n2);


// Array references -------------------------------------------------------------------------------------------------------------------

// let str = "GFG";
// let arr = Array.from(str);
// console.log(arr); // ['G', 'F', 'G']


// let mySet = new Set([1, 2, 3, 2]);
// let arr = Array.from(mySet);
// console.log(arr); // [1, 2, 3]

// let obj = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
// let arr = Array.from(obj);
// console.log(arr); // ['a', 'b', 'c']


// console.log(Array.isArray([1, 2, 3]));   // true
// console.log(Array.isArray("hello"));    // false
// console.log(Array.isArray({ 0: 'a', length: 1 })); // false


// let arr1 = Array.of(1, 2, 3);
// console.log(arr1); // [1, 2, 3]

// let arr2 = Array.of(5);
// console.log(arr2); // [5]

// // Compare this with:
// let arr3 = new Array(5);
// console.log(arr3); // [ <5 empty items> ]



// Loops in array ---------------------------------------------------------------------------------------------------------------------

// let arr = [10, 20, 30];
// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }


// let arr = [10, 20, 30];
// for (let value of arr) {
//   console.log(value);
// }


// for in loop recommended in Objects
// let arr = [10, 20, 30];
// for (let index in arr) {
//   console.log(index, arr[index]);
// }


// let arr = [10, 20, 30];
// arr.forEach((value, index) => {
//   console.log(index, value);
// });


// let arr = [1, 2, 3];
// let squared = arr.map(x => x * x);
// console.log(squared); // [1, 4, 9]


// let arr = [5, 10, 15];
// let i = 0;
// while (i < arr.length) {
//   console.log(arr[i]);
//   i++;
// }


// let arr = [5, 10, 15];
// let i = 0;
// do {
//   console.log(arr[i]);
//   i++;
// } while (i < arr.length);
