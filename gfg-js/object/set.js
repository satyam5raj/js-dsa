// A Set in JavaScript is used to store a unique collection of items, meaning no duplicates are allowed.

// Sets internally use a hash table which makes search, insert and delete operations faster than arrays. Please note that a hash table data structure allows these operations to be performed on average in constant time.
// Set maintains the insertion of items. When we access items, we get them in the same order as inserted.
// Only Unique Keys are allowed, if we insert the same key with a different value, it overwrites the previous one.
// A set can be created either empty or by providing an iterable like array or string.

// Key Characteristics of Sets
// Unique Values: Sets only contain unique elements, automatically removing duplicates.
// Ordered: Sets maintain the order of elements as they are inserted.
// Iterable: You can iterate through Sets using loops like for...of or forEach.
// No Indexing: Sets don’t support indexing; you must iterate to access elements.


// Set.add() : adds the new element with a specified value at the end of the Set object.
// Set.delete() : deletes an element with the specified value from the Set object. 
// Set.clear(): removes all the element from the set. 
// Set.entries() : returns an iterator object which contains an array having the entries of the set, in the insertion order. 
// Set.has() : returns true if the specified value is present in the Set object. 
// Set.values() : returns all the values from the Set in the same insertion order.
// Set.keys(): also returns all the values from the Set in the insertion order. 
// Set.forEach() : executes the given function once for every element in the Set, in the insertion order.
// Set.prototype[@@iterator]() : returns a Set iterator function which is values() function by default.
// has(value) : Checks if a value exists in the Set.


// using string
// let s = new Set("fooooooood");
// console.log(s);

// let mySet = new Set();
// mySet.add(2);
// mySet.add("A");
// mySet.add(2);
// mySet.add(3);
// mySet.add("B")

// console.log(mySet);
// mySet.delete(2);
// console.log(mySet);
// console.log(mySet.has(3));
// console.log(mySet.keys());

// const myArray = Array.from(mySet);
// console.log(myArray);

// let arr = [1, 2, 2, 3, 4, 3, 5];
// let uniqueSet = new Set(arr);
// console.log(uniqueSet); // Set(5) { 1, 2, 3, 4, 5 }


// console.log(mySet.entries());
// for (let [key, value] of mySet.entries()) {
//   console.log(key, value);
// }


// let set = new Set();
// set.add(2);
// set.add(4);
// set.add(5);
// set.add(3);
// function add(num){
//     return num+1;
// }
// let newSet = new Set()
// set.forEach(num => newSet.add(add(num)))
// console.log(newSet);

// newSet.clear();
// console.log(newSet);



// Looping in Set -----------------------------------------------------------------------------------------------------------------------------

// const mySet = new Set();
// mySet.add("Virat");
// mySet.add("Rohit");
// mySet.add("Rahul");
// for (const value of mySet) {
//     console.log(value);
// }


// const Data = new Set();
// Data.add("Delhi");
// Data.add("Noida");
// Data.add("Gurgaon");

// Data.forEach(function (value) {
//     console.log(value);
// });



// let myset = new Set()
// myset.add(3);
// myset.add(2);
// myset.add(9);
// myset.add(6);
// console.log(myset);
// const myArray = Array.from(myset);
// for (let i = 0; i < myArray.length; i++) {
//     console.log(myArray[i]);
// }


// function iterateSet() {
//     const mySet = new Set();
//     mySet.add("London");
//     mySet.add("Paris");
//     mySet.add("New York");

//     [...mySet].forEach(value => {
//         console.log(value);
//     });
// }
// iterateSet();


// const mySet = new Set();
// mySet.add("Blue");
// mySet.add("Green");
// mySet.add("Red");

// for (let value of mySet.values()) {
//     console.log(value);
// }


// Sort a Set ---------------------------------------------------------------------------------------------------------------------------

// let myset = new Set()
// myset.add(3);
// myset.add(2);
// myset.add(9);
// myset.add(6);
// console.log(myset);
// let myarr = [];
// for (let element of myset) {
//     myarr.push(element);
// }
// console.log(myarr);
// myarr.sort()
// myset.clear()
// for (let element of myarr) {
//     myset.add(element);
// }
// console.log(myset);


// let myset = new Set()
// myset.add(3);
// myset.add(2);
// myset.add(9);
// myset.add(6);
// console.log(myset);
// let myarr = [];
// myArray = Array.from(myset)
// myArray.sort()
// console.log(myArray)
// myset.clear()
// myset = new Set(myArray);
// console.log(myset)



// let myset = new Set()
// myset.add(3);
// myset.add(2);
// myset.add(9);
// myset.add(6);
// console.log(myset);
// const sortedArray = [...myset].sort();
// const newSet = new Set(sortedArray);
// console.log(newSet);


// Set Reference --------------------------------------------------------------------------------------------------------------

// const mySet = new Set();
// mySet.add("California");
// mySet.add("India");
// mySet.add("California");
// mySet.add(10);
// mySet.add(10);
// const myObj = {a:1, a:5, b:5}
// mySet.add(myObj)
// console.log(mySet)

// Removing duplicates
// const numbers = [1, 2, 2, 3, 4, 4, 5];
// const uniqueNumbers = [...new Set(numbers)];
// console.log(uniqueNumbers);