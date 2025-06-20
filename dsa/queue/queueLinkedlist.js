// Node class for linked list
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// Queue class using linked list
class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Add item to the end of the queue
    enqueue(value) {
        const newNode = new Node(value);
        if (this.tail) {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        if (!this.head) {
            this.head = newNode;
        }
        this.length++;
    }

    // Remove item from the front of the queue
    dequeue() {
        if (!this.head) {
            console.log("Queue is empty");
            return null;
        }
        const removedValue = this.head.value;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = null; // If queue becomes empty
        }
        this.length--;
        return removedValue;
    }

    // Peek at the front of the queue
    peek() {
        return this.head ? this.head.value : null;
    }

    // Check if queue is empty
    isEmpty() {
        return this.length === 0;
    }

    // Return the number of items
    size() {
        return this.length;
    }

    // Clear the queue
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Print the queue
    print() {
        let curr = this.head;
        const items = [];
        while (curr) {
            items.push(curr.value);
            curr = curr.next;
        }
        console.log(items.join(" <- "));
    }
}




const q = new Queue();

q.enqueue("A");
q.enqueue("B");
q.enqueue("C");

q.print(); // A <- B <- C

console.log("Dequeued:", q.dequeue()); // A
console.log("Peek:", q.peek());        // B
console.log("Size:", q.size());        // 2
console.log("Is empty?", q.isEmpty()); // false

q.clear();
console.log("After clear:");
q.print(); // (no output)
