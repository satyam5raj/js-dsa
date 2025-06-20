class Queue {
    constructor() {
        this.items = [];
    }

    // Add item to the end of the queue
    enqueue(item) {
        this.items.push(item);
    }

    // Remove item from the front of the queue
    dequeue() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return null;
        }
        return this.items.shift();
    }

    // View the item at the front without removing it
    peek() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return null;
        }
        return this.items[0];
    }

    // Check if the queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get the number of items in the queue
    size() {
        return this.items.length;
    }

    // Remove all items from the queue
    clear() {
        this.items = [];
    }

    // Print the queue
    print() {
        console.log(this.items.join(" <- "));
    }
}


const q = new Queue();

q.enqueue("A");
q.enqueue("B");
q.enqueue("C");

q.print(); // A <- B <- C

console.log("Dequeued:", q.dequeue()); // Dequeued: A
console.log("Front item:", q.peek());  // Front item: B
console.log("Size:", q.size());        // Size: 2
console.log("Is empty?", q.isEmpty()); // Is empty? false

q.clear();
console.log("Queue after clear:");
q.print();                             // (empty output)
