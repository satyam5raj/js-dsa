class Stack {
    constructor() {
        this.items = [];
        this.count = 0;
    }

    // Push element to top of stack
    push(element) {
        this.items[this.count] = element;
        this.count++;
        return this.count;
    }

    // Remove and return top element
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }

    // Return top element without removing it
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }

    // Alternative name for peek
    top() {
        return this.peek();
    }

    // Check if stack is empty
    isEmpty() {
        return this.count === 0;
    }

    // Get number of elements in stack
    size() {
        return this.count;
    }

    // Alternative name for size
    length() {
        return this.count;
    }

    // Clear all elements from stack
    clear() {
        this.items = [];
        this.count = 0;
    }

    // Check if element exists in stack
    contains(element) {
        for (let i = 0; i < this.count; i++) {
            if (this.items[i] === element) {
                return true;
            }
        }
        return false;
    }

    // Search for element and return position from top (1-based)
    search(element) {
        for (let i = this.count - 1; i >= 0; i--) {
            if (this.items[i] === element) {
                return this.count - i;
            }
        }
        return -1; // Not found
    }

    // Convert stack to array (top to bottom)
    toArray() {
        const result = [];
        for (let i = this.count - 1; i >= 0; i--) {
            result.push(this.items[i]);
        }
        return result;
    }

    // String representation of stack
    toString() {
        if (this.isEmpty()) {
            return 'Stack: []';
        }
        return 'Stack: [' + this.toArray().join(', ') + '] <- top';
    }

    // Clone the stack
    clone() {
        const newStack = new Stack();
        for (let i = 0; i < this.count; i++) {
            newStack.push(this.items[i]);
        }
        return newStack;
    }

    // Iterator support (for...of loops)
    *[Symbol.iterator]() {
        for (let i = this.count - 1; i >= 0; i--) {
            yield this.items[i];
        }
    }

    // Get element at specific position from top (0-based)
    elementAt(index) {
        if (index < 0 || index >= this.count) {
            throw new Error('Index out of bounds');
        }
        return this.items[this.count - 1 - index];
    }

    // Reverse the stack
    reverse() {
        const temp = [];
        while (!this.isEmpty()) {
            temp.push(this.pop());
        }
        for (const item of temp) {
            this.push(item);
        }
    }
}

// Example usage and testing
console.log('=== Stack Implementation Demo ===\n');

const stack = new Stack();

// Basic operations
console.log('1. Basic Operations:');
console.log('Empty stack:', stack.toString());
console.log('Is empty:', stack.isEmpty());

stack.push(10);
stack.push(20);
stack.push(30);
console.log('After pushing 10, 20, 30:', stack.toString());
console.log('Size:', stack.size());

console.log('Peek:', stack.peek());
console.log('Pop:', stack.pop());
console.log('After pop:', stack.toString());

// Search and contains
console.log('\n2. Search Operations:');
console.log('Contains 20:', stack.contains(20));
console.log('Contains 99:', stack.contains(99));
console.log('Search for 20 (position from top):', stack.search(20));
console.log('Search for 10 (position from top):', stack.search(10));

// Array operations
console.log('\n3. Array Operations:');
console.log('To array:', stack.toArray());
stack.push(40);
stack.push(50);
console.log('After adding 40, 50:', stack.toString());

// Iterator
console.log('\n4. Iterator (for...of):');
console.log('Elements from top to bottom:');
for (const element of stack) {
    console.log('-', element);
}

// Clone
console.log('\n5. Clone Operation:');
const clonedStack = stack.clone();
console.log('Original:', stack.toString());
console.log('Cloned:', clonedStack.toString());
clonedStack.push(60);
console.log('After pushing 60 to clone:');
console.log('Original:', stack.toString());
console.log('Cloned:', clonedStack.toString());

// Element access
console.log('\n6. Element Access:');
console.log('Element at index 0 (top):', stack.elementAt(0));
console.log('Element at index 1:', stack.elementAt(1));

// Clear
console.log('\n7. Clear Operation:');
stack.clear();
console.log('After clear:', stack.toString());
console.log('Is empty:', stack.isEmpty());