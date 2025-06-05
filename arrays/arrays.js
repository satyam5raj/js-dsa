class CustomArray {
    constructor(size = 10){
        this.data = new Array(size);
        this.maxSize = size;
        this.length = 0;
    }

    // Insert at index
    insertAt(index, element){
        if(index < 0 || index > this.length){
            throw new Error('Index out of bonds')
        }
        if(this.length >= this.maxSize){
            throw new Error('Array is full')
        }

        for(let i = this.length; i>index; i--){
            this.data[i] = this.data[i-1];
        }
        this.data[index] = element;
        this.length++;
        return this.length
    }

    insertAtBeginning(element){
        return this.insertAt(0, element);
    }

    insertAtEnd(element){
        return this.insertAt(this.length, element)
    }

    // Remove at index
    removeAt(index){
        if(index < 0 || index > this.length){
            throw new Error('Index out of bonds')
        }

        const removedElement = this.data[index];

        for(let i = index; i < this.length; i++){
            this.data[i] = this.data[i+1];
        }

        this.length--;
        this.data[this.length] = undefined;
        return removedElement;
    }

    removeFromBeginning(){
        if(this.length == 0){
            throw new Error('Array is Empty')
        }
        return this.removeAt(0);
    }

    removeFromEnd(){
        if(this.length == 0){
            throw new Error('Array is Empty')
        }
        return this.removeAt(this.length-1)
    }

    // Reverse an array
    reverse(){
        let start = 0;
        let end = this.length - 1;

        while (start < end){
            let temp = this.data[start];
            this.data[start] = this.data[end];
            this.data[end] = temp;

            start++;
            end--;
        }
        return this;
    }

    // Find eement and return index
    indexOf(element){
        for(let i = 0; i < this.length; i++){
            if(this.data[i] === element){
                return i;
            }
        }
        return -1;
    }

    // Check if element exists
    contains(element) {
        return this.indexOf(element) !== -1;
    }

    // Get element at index
    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index out of bounds');
        }
        return this.data[index];
    }

    // Set element at index
    set(index, element) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index out of bounds');
        }
        this.data[index] = element;
    }

    // Clear all elements
    clear() {
        this.data = new Array(this.maxSize);
        this.length = 0;
    }

    // Check if array is empty
    isEmpty() {
        return this.length === 0;
    }

    // Check if array is full
    isFull() {
        return this.length === this.maxSize;
    }

    // Get current size
    size() {
        return this.length;
    }

    // Get maximum capacity
    capacity() {
        return this.maxSize;
    }

    // Convert to regular JavaScript array
    toArray() {
        return this.data.slice(0, this.length);
    }

    // String representation
    toString() {
        return '[' + this.toArray().join(', ') + ']';
    }

    // For each method
    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this.data[i], i, this);
        }
    }

    // Map method
    map(callback) {
        const result = new CustomArray(this.maxSize);
        for (let i = 0; i < this.length; i++) {
            result.insertAtEnd(callback(this.data[i], i, this));
        }
        return result;
    }

    // Filter method
    filter(callback) {
        const result = new CustomArray(this.maxSize);
        for (let i = 0; i < this.length; i++) {
            if (callback(this.data[i], i, this)) {
                result.insertAtEnd(this.data[i]);
            }
        }
        return result;
    }

    // Find method
    find(callback) {
        for (let i = 0; i < this.length; i++) {
            if (callback(this.data[i], i, this)) {
                return this.data[i];
            }
        }
        return undefined;
    }

    // Sort method (bubble sort implementation)
    sort(compareFunction) {
        if (!compareFunction) {
            compareFunction = (a, b) => {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            };
        }

        for (let i = 0; i < this.length - 1; i++) {
            for (let j = 0; j < this.length - i - 1; j++) {
                if (compareFunction(this.data[j], this.data[j + 1]) > 0) {
                    // Swap elements
                    let temp = this.data[j];
                    this.data[j] = this.data[j + 1];
                    this.data[j + 1] = temp;
                }
            }
        }
        return this;
    }

    // Resize array (increase capacity)
    resize(newSize) {
        if (newSize < this.length) {
            throw new Error('New size cannot be smaller than current length');
        }
        
        const newData = new Array(newSize);
        for (let i = 0; i < this.length; i++) {
            newData[i] = this.data[i];
        }
        
        this.data = newData;
        this.maxSize = newSize;
    }

    reduce(callback, initialValue) {
    let accumulator;
    let startIndex;

    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        if (this.length === 0) {
            throw new Error("Reduce of empty array with no initial value");
        }
        accumulator = this.data[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this.data[i], i, this);
    }

    return accumulator;
    }

    slice(start = 0, end = this.length) {
        const result = new CustomArray(end - start);
        
        // Normalize negative indices
        if (start < 0) start = this.length + start;
        if (end < 0) end = this.length + end;

        // Bound the range
        start = Math.max(0, start);
        end = Math.min(this.length, end);

        for (let i = start; i < end; i++) {
            result.insertAtEnd(this.data[i]);
        }
        return result;
    }

    splice(start, deleteCount, ...items) {
        // Normalize start
        if (start < 0) {
            start = this.length + start;
            if (start < 0) start = 0;
        }
        if (start > this.length) {
            start = this.length;
        }

        // If deleteCount is omitted or too big, delete till end
        if (deleteCount === undefined || deleteCount > (this.length - start)) {
            deleteCount = this.length - start;
        }
        if (deleteCount < 0) deleteCount = 0;

        // Store removed elements
        const removed = new CustomArray(deleteCount);

        for (let i = 0; i < deleteCount; i++) {
            removed.insertAtEnd(this.data[start + i]);
        }

        // Calculate new length after deletion and insertion
        const itemsCount = items.length;
        const newLength = this.length - deleteCount + itemsCount;

        if (newLength > this.maxSize) {
            throw new Error('Array will exceed max size after splice');
        }

        // Shift elements after the deleted segment to their new position
        if (itemsCount !== deleteCount) {
            if (itemsCount > deleteCount) {
                // Need to shift right to make space
                for (let i = this.length - 1; i >= start + deleteCount; i--) {
                    this.data[i + itemsCount - deleteCount] = this.data[i];
                }
            } else {
                // Shift left to fill gap
                for (let i = start + deleteCount; i < this.length; i++) {
                    this.data[i - (deleteCount - itemsCount)] = this.data[i];
                }
                // Clear leftover elements at the end
                for (let i = newLength; i < this.length; i++) {
                    this.data[i] = undefined;
                }
            }
        }

        // Insert new items
        for (let i = 0; i < itemsCount; i++) {
            this.data[start + i] = items[i];
        }

        this.length = newLength;

        return removed;
    }
}

const arr = new CustomArray(5)
arr.insertAtEnd(10);
arr.insertAtEnd(15);
arr.insertAtEnd(20);
arr.insertAtBeginning(5);
arr.insertAt(2, 25);
console.log(arr);
// arr.removeAt(2);
// console.log(arr);
// arr.removeFromBeginning();
// console.log(arr);
// arr.removeFromEnd();
// console.log(arr);
arr.reverse();
console.log(arr);
console.log(arr.indexOf(10));

const sum = arr.reduce((acc, curr) => acc + curr, 0);
console.log("Sum:", sum);

arr.sort();
console.log(arr.data);

const sliced = arr.slice(1, 4);
console.log(sliced.data);

console.log('Before splice:', arr.data.slice(0, arr.length)); 

const removed = arr.splice(1, 2, 15, 25);

console.log('Removed:', removed.data.slice(0, removed.length)); 

console.log('After splice:', arr.data.slice(0, arr.length)); 