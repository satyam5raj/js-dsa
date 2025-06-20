// A Map is a data structure that stores key-value pairs, where each key is unique. It is similar to an object but has some advantages:

// Inserts keys in the order they were added.
// Allows keys of any type, not just strings and symbols.
// Provides better performance when dealing with large datasets.( faster than objects )

// let myMap = new Map();
// let anotherMap = new Map([
//     ['name', 'GFG'],
//     ['age', 30],
//     ['city', 'Noida']
// ]);
// console.log(anotherMap);

// Properties of JavaScript Map
// set(key, val) : Adds or updates an element with a specified key and value.
// get(key) : Returns the value associated with the specified key.
// has(key) : Returns a boolean indicating whether an element with the specified key exists.
// delete(key) : Removes the element with the specified key.
// clear(): Removes all elements from the Map.
// size: Returns the number of key-value pairs in the Map.

// let myMap = new Map();
// myMap.set('name', 'GFG');
// myMap.set('age', 25);
// myMap.set(1, 'One'); 

// console.log(myMap)
// console.log(myMap.get("age"))
// console.log(myMap.has("age"))
// console.log(myMap.delete("age"))
// console.log(myMap)
// console.log(myMap.size)
// myMap.clear();
// console.log(myMap);

// const company = new Map([
//     ["name", "GFG"],
//     ["no_of_employee", 200],
//     ["category", "education"]
// ]);
// function print(key, values) {
//     console.log(values + "=>" + key);
// }
// company.forEach(print);


// Loop in map
// let myMap = new Map();
// myMap.set('name', 'GFG');
// myMap.set('age', 25);
// myMap.set(1, 'One'); 
// console.log(myMap);
// for(let [key, value] of myMap.entries()){
//     console.log(key, " --> ", value)
// }