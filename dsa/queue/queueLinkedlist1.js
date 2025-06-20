class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;

        // For async iteration
        this.waitingResolvers = [];
    }

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

        // Resolve any async iterators waiting for a value
        if (this.waitingResolvers.length > 0) {
            const resolver = this.waitingResolvers.shift();
            resolver({ value, done: false });
        }
    }

    dequeue() {
        if (!this.head) {
            return null;
        }
        const value = this.head.value;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = null;
        }
        this.length--;
        return value;
    }

    peek() {
        return this.head ? this.head.value : null;
    }

    isEmpty() {
        return this.length === 0;
    }

    size() {
        return this.length;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.waitingResolvers = [];
    }

    print() {
        let current = this.head;
        const values = [];
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        console.log(values.join(" <- "));
    }

    // 👇 Iterable support (for...of)
    [Symbol.iterator]() {
        let current = this.head;
        return {
            next() {
                if (current) {
                    const value = current.value;
                    current = current.next;
                    return { value, done: false };
                }
                return { done: true };
            }
        };
    }

    // 👇 Async Iterable support (for await...of)
    [Symbol.asyncIterator]() {
        return {
            next: () => {
                if (this.head) {
                    const value = this.dequeue();
                    return Promise.resolve({ value, done: false });
                }
                // Wait for future enqueue
                return new Promise(resolve => {
                    this.waitingResolvers.push(resolve);
                });
            }
        };
    }
}


// Sync Iteration
const q = new Queue();
q.enqueue("X");
q.enqueue("Y");
q.enqueue("Z");

for (const item of q) {
    console.log("Item:", item);
}
// Output: X Y Z


// Async Iteration
const queue = new Queue();

// Simulate async producer
setTimeout(() => queue.enqueue("First"), 1000);
setTimeout(() => queue.enqueue("Second"), 2000);
setTimeout(() => queue.enqueue("Third"), 3000);

// Async consumer
(async () => {
    for await (const item of queue) {
        console.log("Received:", item);
        if (item === "Third") break; // stop after third
    }
})();
