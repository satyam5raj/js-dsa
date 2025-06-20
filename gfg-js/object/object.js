// An object in JavaScript is a data structure used to store related data collections. It stores data as key-value pairs, where each key is a unique identifier for the associated value. Objects are dynamic, which means the properties can be added, modified, or deleted at runtime.

// 1. Object Literal 
// let obj = {
//     name: "Sourav",
//     age: 23,
//     job: "Developer"
// };
// console.log(obj);

// 2. Object Constructor
// let obj = new Object();
// obj.name= "Sourav",
// obj.age= 23,
// obj.job= "Developer"
// console.log(obj);


// let obj = { name: "Sourav", age: 22 };
// console.log(obj);
// obj.age = 23;
// console.log(obj);
// obj.color = "Red";
// console.log(obj)
// delete obj.color;
// console.log(obj);
// console.log(obj.hasOwnProperty("age"))
// for(let key in obj){
//     console.log(key + ": " + obj[key])
// }
// for(let [key, value] of Object.entries(obj)){
//     console.log(key + ": " + value)
// }


// let obj1 = {name: "Sourav"};
// let obj2 = {age: 23};
// let obj3 = {...obj1, ...obj2}
// console.log(obj3);
// console.log(Object.keys(obj3))
// console.log(Object.keys(obj3).length)


// let obj = { name: "Sourav" };
// console.log(typeof obj === "object" && obj !== null);


// -------------------------------------------------------------------------------------------------------------------------------

// Create string primitive.
// let strPrimitive = "GeeksforGeeks";
// typeof strPrimitive; // "string"
// strPrimitive instanceof String; // false

// // Use the Built-in String Function as Constructor.
// let strObject = new String( "GeeksforGeeks" );
// typeof strObject; // "object"
// console.log(strObject);     // [String: 'GeeksforGeeks']
// strObject instanceof String; // true

// // inspect the object sub-type
// Object.prototype.toString.call( strObject ); // [object String]


// Define Function Explicitly.
// function toGreet() {
//     console.log("Hello There!");
// }
// let myObj = {

//     // Mention Function-Name as Value.
//     greet: toGreet,

//     // Define Function implicitly.
//     byWhom: function() {
//         console.log(" - GeeksforGeeks.org");
//     }
// }
// myObj.greet();
// myObj.byWhom();



// Looping in Object 
// let myOrder = {
//     "name_of_product": "earbuds",
//     "cost": "799",
//     "warranty": "1 year"
// };
// for (let key in myOrder) {
//     console.log(myOrder[key]);
// }


// To convert a JSON text to a JavaScript object, you can use the JSON.parse() method.
// const jsonString = '{"name": "GFG", "age": 30}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name); 
// console.log(jsonObject.age);


// Convert array of key-value pairs to object
// const entries = [
//   ['name', 'Sourav'],
//   ['age', 22],
//   ['city', 'Delhi']
// ];
// const obj = Object.fromEntries(entries);
// console.log(obj);
// Output: { name: 'Sourav', age: 22, city: 'Delhi' }


// Convert Map to object
// const myMap = new Map();
// myMap.set('fruit', 'apple');
// myMap.set('color', 'red');
// const obj = Object.fromEntries(myMap);
// console.log(obj);
// Output: { fruit: 'apple', color: 'red' }


// Swap key and value from object
// const original = {
//   a: 1,
//   b: 2
// };
// const swapped = Object.fromEntries(
//   Object.entries(original).map(([key, value]) => [value, key])
// );
// console.log(swapped); 
// Output: { '1': 'a', '2': 'b' }


// | Method                 | What It Does                              |
// | ---------------------- | ----------------------------------------- |
// | `Object.entries(obj)`  | Converts object → array of `[key, value]` |
// | `Object.fromEntries()` | Converts array of `[key, value]` → object |
