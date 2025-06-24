// Basic Queue Implementation using JavaScript Classes
class Queue {
    // Constructor - initializes the queue
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
    }

    // Add element to the rear of the queue
    enqueue(element) {
        this.items[this.rear] = element;
        this.rear++;
        return this.size();
    }

    // Remove and return element from the front of the queue
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const item = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return item;
    }

    // Return front element without removing it
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.front];
    }

    // Check if queue is empty
    isEmpty() {
        return this.rear === this.front;
    }

    // Get the size of the queue
    size() {
        return this.rear - this.front;
    }

    // Clear the queue
    clear() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
    }

    // Display queue contents
    display() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        let result = "Front -> ";
        for (let i = this.front; i < this.rear; i++) {
            result += `${this.items[i]} `;
        }
        result += "<- Rear";
        return result;
    }
}

// Priority Queue Implementation (extends Queue)
class PriorityQueue extends Queue {
    constructor() {
        super();
    }

    // Enqueue with priority (lower number = higher priority)
    enqueue(element, priority = 0) {
        const queueElement = { element, priority };
        
        if (this.isEmpty()) {
            this.items[this.rear] = queueElement;
            this.rear++;
            return;
        }

        let added = false;
        for (let i = this.front; i < this.rear; i++) {
            if (queueElement.priority < this.items[i].priority) {
                // Shift elements to make room
                for (let j = this.rear; j > i; j--) {
                    this.items[j] = this.items[j - 1];
                }
                this.items[i] = queueElement;
                this.rear++;
                added = true;
                break;
            }
        }

        if (!added) {
            this.items[this.rear] = queueElement;
            this.rear++;
        }
    }

    // Override dequeue to return just the element
    dequeue() {
        const item = super.dequeue();
        return item ? item.element : null;
    }

    // Override peek to return just the element
    peek() {
        const item = super.peek();
        return item ? item.element : null;
    }

    // Override display for priority queue
    display() {
        if (this.isEmpty()) {
            return "Priority Queue is empty";
        }
        let result = "Front -> ";
        for (let i = this.front; i < this.rear; i++) {
            result += `${this.items[i].element}(P:${this.items[i].priority}) `;
        }
        result += "<- Rear";
        return result;
    }
}

// Real-world example: Print Spooler System
class PrintSpooler {
    constructor() {
        this.printQueue = new PriorityQueue();
        this.currentJob = null;
        this.isProcessing = false;
    }

    // Add print job to queue
    addPrintJob(document, priority = 5) {
        const job = {
            id: Date.now(),
            document: document,
            timestamp: new Date().toLocaleTimeString(),
            status: 'queued'
        };
        
        this.printQueue.enqueue(job, priority);
        console.log(`Print job added: ${job.document} (Priority: ${priority})`);
        
        if (!this.isProcessing) {
            this.processNext();
        }
    }

    // Process next job in queue
    async processNext() {
        if (this.printQueue.isEmpty()) {
            this.isProcessing = false;
            console.log("Print queue is empty. Spooler idle.");
            return;
        }

        this.isProcessing = true;
        this.currentJob = this.printQueue.dequeue();
        this.currentJob.status = 'printing';
        
        console.log(`Now printing: ${this.currentJob.document}`);
        
        // Simulate printing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log(`Completed: ${this.currentJob.document}`);
        this.currentJob.status = 'completed';
        this.currentJob = null;
        
        // Process next job
        this.processNext();
    }

    // Get queue status
    getStatus() {
        return {
            currentJob: this.currentJob,
            queueSize: this.printQueue.size(),
            queueContents: this.printQueue.display()
        };
    }
}

// Example Usage and Testing
console.log("=== Basic Queue Operations ===");
const queue = new Queue();

// Enqueue operations
queue.enqueue("Customer 1");
queue.enqueue("Customer 2");
queue.enqueue("Customer 3");
console.log("After enqueueing:", queue.display());
console.log("Queue size:", queue.size());

// Dequeue operations
console.log("Dequeued:", queue.dequeue());
console.log("After dequeue:", queue.display());
console.log("Peek front:", queue.peek());

console.log("\n=== Priority Queue Operations ===");
const pQueue = new PriorityQueue();

// Add items with different priorities
pQueue.enqueue("Low priority task", 5);
pQueue.enqueue("High priority task", 1);
pQueue.enqueue("Medium priority task", 3);
pQueue.enqueue("Urgent task", 0);

console.log("Priority queue:", pQueue.display());
console.log("Processing in priority order:");
while (!pQueue.isEmpty()) {
    console.log("Processing:", pQueue.dequeue());
}

console.log("\n=== Print Spooler Example ===");
const printer = new PrintSpooler();

// Add various print jobs with different priorities
printer.addPrintJob("Regular Document.pdf", 5);
printer.addPrintJob("URGENT Report.pdf", 1);
printer.addPrintJob("Meeting Notes.docx", 3);
printer.addPrintJob("CRITICAL Presentation.pptx", 0);

// Check status after a delay
setTimeout(() => {
    console.log("\nPrinter Status:", printer.getStatus());
}, 1000);

// Task Scheduler example
class TaskScheduler {
    constructor() {
        this.taskQueue = new Queue();
        this.running = false;
    }

    scheduleTask(taskName, callback) {
        this.taskQueue.enqueue({ name: taskName, callback });
        console.log(`Task scheduled: ${taskName}`);
        if (!this.running) {
            this.start();
        }
    }

    async start() {
        this.running = true;
        console.log("Task scheduler started...");
        
        while (!this.taskQueue.isEmpty()) {
            const task = this.taskQueue.dequeue();
            console.log(`Executing task: ${task.name}`);
            await task.callback();
            console.log(`Task completed: ${task.name}`);
        }
        
        this.running = false;
        console.log("All tasks completed. Scheduler stopped.");
    }
}

// Example task scheduler usage
console.log("\n=== Task Scheduler Example ===");
const scheduler = new TaskScheduler();

scheduler.scheduleTask("Database Backup", async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
});

scheduler.scheduleTask("Send Email Reports", async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
});

scheduler.scheduleTask("Clean Temp Files", async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
});

// 3. Customer Service System - Call Center
class CallCenter {
    constructor(agents = 3) {
        this.waitingQueue = new Queue();
        this.priorityQueue = new PriorityQueue();
        this.agents = [];
        this.totalAgents = agents;
        this.callIdCounter = 1;
        
        // Initialize agents
        for (let i = 0; i < agents; i++) {
            this.agents.push({
                id: i + 1,
                available: true,
                currentCall: null
            });
        }
    }

    // Add customer to queue
    addCustomer(customerName, issue, priority = 3) {
        const call = {
            id: this.callIdCounter++,
            customer: customerName,
            issue: issue,
            waitTime: Date.now(),
            priority: priority
        };

        if (priority <= 2) {
            this.priorityQueue.enqueue(call, priority);
            console.log(`HIGH PRIORITY call added: ${customerName} - ${issue}`);
        } else {
            this.waitingQueue.enqueue(call);
            console.log(`Call added to queue: ${customerName} - ${issue}`);
        }

        this.assignNextCall();
    }

    // Assign calls to available agents
    assignNextCall() {
        const availableAgent = this.agents.find(agent => agent.available);
        if (!availableAgent) return;

        // Check priority queue first
        let nextCall = this.priorityQueue.dequeue();
        if (!nextCall) {
            nextCall = this.waitingQueue.dequeue();
        }

        if (nextCall) {
            availableAgent.available = false;
            availableAgent.currentCall = nextCall;
            const waitTime = (Date.now() - nextCall.waitTime) / 1000;
            console.log(`Agent ${availableAgent.id} handling: ${nextCall.customer} (waited ${waitTime.toFixed(1)}s)`);
            
            // Simulate call duration
            setTimeout(() => {
                this.endCall(availableAgent.id);
            }, Math.random() * 3000 + 2000);
        }
    }

    // End call and make agent available
    endCall(agentId) {
        const agent = this.agents.find(a => a.id === agentId);
        if (agent && agent.currentCall) {
            console.log(`Agent ${agentId} completed call with ${agent.currentCall.customer}`);
            agent.available = true;
            agent.currentCall = null;
            this.assignNextCall();
        }
    }

    // Get system status
    getStatus() {
        return {
            waitingInQueue: this.waitingQueue.size(),
            priorityQueue: this.priorityQueue.size(),
            busyAgents: this.agents.filter(a => !a.available).length,
            availableAgents: this.agents.filter(a => a.available).length
        };
    }
}

// 4. Network Packet Management - Router Buffer
class NetworkRouter {
    constructor(bufferSize = 100) {
        this.incomingBuffer = new Queue();
        this.outgoingBuffer = new PriorityQueue();
        this.maxBufferSize = bufferSize;
        this.packetsProcessed = 0;
        this.packetsDropped = 0;
        this.processing = false;
    }

    // Receive packet
    receivePacket(packet) {
        if (this.incomingBuffer.size() >= this.maxBufferSize) {
            this.packetsDropped++;
            console.log(`DROPPED packet from ${packet.source} - Buffer full`);
            return false;
        }

        this.incomingBuffer.enqueue({
            ...packet,
            timestamp: Date.now()
        });
        
        if (!this.processing) {
            this.processPackets();
        }
        return true;
    }

    // Process packets from buffer
    async processPackets() {
        this.processing = true;
        
        while (!this.incomingBuffer.isEmpty()) {
            const packet = this.incomingBuffer.dequeue();
            
            // Classify packet priority (QoS)
            let priority = 3; // Default
            if (packet.type === 'voice') priority = 1;
            else if (packet.type === 'video') priority = 2;
            else if (packet.type === 'data') priority = 3;
            
            this.outgoingBuffer.enqueue(packet, priority);
            
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        
        this.forwardPackets();
    }

    // Forward packets based on priority
    async forwardPackets() {
        while (!this.outgoingBuffer.isEmpty()) {
            const packet = this.outgoingBuffer.dequeue();
            const delay = Date.now() - packet.timestamp;
            
            console.log(`Forwarded ${packet.type} packet from ${packet.source} to ${packet.destination} (${delay}ms delay)`);
            this.packetsProcessed++;
            
            // Simulate forwarding time
            await new Promise(resolve => setTimeout(resolve, 5));
        }
        
        this.processing = false;
    }

    getStats() {
        return {
            processed: this.packetsProcessed,
            dropped: this.packetsDropped,
            bufferUsage: `${this.incomingBuffer.size()}/${this.maxBufferSize}`,
            efficiency: ((this.packetsProcessed / (this.packetsProcessed + this.packetsDropped)) * 100).toFixed(2) + '%'
        };
    }
}

// 5. Event Handling / Message Queue - Microservices
class MessageQueue {
    constructor() {
        this.queues = new Map();
        this.subscribers = new Map();
        this.messageId = 1;
    }

    // Create a queue for a topic
    createQueue(topic) {
        if (!this.queues.has(topic)) {
            this.queues.set(topic, new Queue());
            this.subscribers.set(topic, []);
        }
    }

    // Publish message to a topic
    publish(topic, message, priority = 3) {
        this.createQueue(topic);
        
        const msg = {
            id: this.messageId++,
            topic: topic,
            payload: message,
            timestamp: new Date().toISOString(),
            priority: priority
        };

        this.queues.get(topic).enqueue(msg);
        console.log(`Published to ${topic}: ${JSON.stringify(message)}`);
        
        // Notify subscribers
        this.notifySubscribers(topic);
    }

    // Subscribe to a topic
    subscribe(topic, callback) {
        this.createQueue(topic);
        this.subscribers.get(topic).push(callback);
        console.log(`Subscribed to topic: ${topic}`);
    }

    // Notify all subscribers of a topic
    notifySubscribers(topic) {
        const queue = this.queues.get(topic);
        const subscribers = this.subscribers.get(topic);
        
        while (!queue.isEmpty() && subscribers.length > 0) {
            const message = queue.dequeue();
            subscribers.forEach(callback => {
                try {
                    callback(message);
                } catch (error) {
                    console.error(`Error in subscriber: ${error.message}`);
                }
            });
        }
    }
}

// 6. Order Processing in E-commerce
class EcommerceOrderProcessor {
    constructor() {
        this.orderQueue = new PriorityQueue();
        this.processingQueue = new Queue();
        this.completedOrders = [];
        this.orderId = 1;
        this.processing = false;
    }

    // Place new order
    placeOrder(customerName, items, customerType = 'regular') {
        const order = {
            id: this.orderId++,
            customer: customerName,
            items: items,
            total: items.reduce((sum, item) => sum + item.price, 0),
            status: 'pending',
            timestamp: new Date(),
            customerType: customerType
        };

        // Priority based on customer type and order value
        let priority = 3;
        if (customerType === 'premium') priority = 1;
        else if (customerType === 'gold') priority = 2;
        else if (order.total > 1000) priority = 2;

        this.orderQueue.enqueue(order, priority);
        console.log(`Order #${order.id} placed by ${customerName} (${customerType}) - ${order.total.toFixed(2)}`);
        
        if (!this.processing) {
            this.processOrders();
        }
    }

    // Process orders from queue
    async processOrders() {
        this.processing = true;
        
        while (!this.orderQueue.isEmpty()) {
            const order = this.orderQueue.dequeue();
            order.status = 'processing';
            this.processingQueue.enqueue(order);
            
            console.log(`Processing order #${order.id} for ${order.customer}`);
            
            // Simulate processing steps
            await this.fulfillOrder(order);
        }
        
        this.processing = false;
    }

    async fulfillOrder(order) {
        // Simulate fulfillment steps
        const steps = ['inventory_check', 'payment_processing', 'picking', 'packing', 'shipping'];
        
        for (const step of steps) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.log(`Order #${order.id}: ${step.replace('_', ' ')}`);
        }
        
        order.status = 'completed';
        order.completedAt = new Date();
        this.completedOrders.push(this.processingQueue.dequeue());
        
        console.log(`Order #${order.id} completed and shipped!`);
    }

    getOrderStats() {
        return {
            pending: this.orderQueue.size(),
            processing: this.processingQueue.size(),
            completed: this.completedOrders.length,
            totalRevenue: this.completedOrders.reduce((sum, order) => sum + order.total, 0)
        };
    }
}

// 7. Simulation Systems - Traffic Light Control
class TrafficSimulation {
    constructor() {
        this.intersections = new Map();
        this.vehicleQueue = new Queue();
        this.vehicleId = 1;
        this.simulationRunning = false;
    }

    // Add intersection
    addIntersection(name, directions = ['North', 'South', 'East', 'West']) {
        const intersection = {
            name: name,
            directions: {},
            currentGreen: 0,
            cycleTime: 30000, // 30 seconds
            lastChange: Date.now()
        };

        directions.forEach(direction => {
            intersection.directions[direction] = new Queue();
        });

        this.intersections.set(name, intersection);
        console.log(`Intersection created: ${name}`);
    }

    // Add vehicle to intersection
    addVehicle(intersectionName, direction, vehicleType = 'car') {
        const intersection = this.intersections.get(intersectionName);
        if (!intersection || !intersection.directions[direction]) {
            console.log(`Invalid intersection or direction: ${intersectionName}/${direction}`);
            return;
        }

        const vehicle = {
            id: this.vehicleId++,
            type: vehicleType,
            direction: direction,
            arrivalTime: Date.now()
        };

        intersection.directions[direction].enqueue(vehicle);
        console.log(`Vehicle #${vehicle.id} (${vehicleType}) arrived at ${intersectionName} from ${direction}`);
    }

    // Simulate traffic flow
    async startSimulation(intersectionName, duration = 60000) {
        const intersection = this.intersections.get(intersectionName);
        if (!intersection) return;

        this.simulationRunning = true;
        const startTime = Date.now();
        const directions = Object.keys(intersection.directions);
        
        console.log(`Starting traffic simulation at ${intersectionName} for ${duration/1000} seconds`);

        while (this.simulationRunning && (Date.now() - startTime) < duration) {
            // Change lights every cycle
            const currentDirection = directions[intersection.currentGreen];
            console.log(`\n🟢 GREEN LIGHT: ${currentDirection} direction`);
            
            // Process vehicles in current green direction
            const queue = intersection.directions[currentDirection];
            let processed = 0;
            const maxProcess = Math.min(3, queue.size()); // Max 3 cars per cycle
            
            while (processed < maxProcess && !queue.isEmpty()) {
                const vehicle = queue.dequeue();
                const waitTime = (Date.now() - vehicle.arrivalTime) / 1000;
                console.log(`Vehicle #${vehicle.id} passed through (waited ${waitTime.toFixed(1)}s)`);
                processed++;
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second per vehicle
            }

            // Show queue status for all directions
            directions.forEach(dir => {
                const count = intersection.directions[dir].size();
                if (count > 0) {
                    console.log(`${dir}: ${count} vehicles waiting`);
                }
            });

            // Switch to next direction
            intersection.currentGreen = (intersection.currentGreen + 1) % directions.length;
            await new Promise(resolve => setTimeout(resolve, intersection.cycleTime));
        }

        this.simulationRunning = false;
        console.log(`Simulation ended at ${intersectionName}`);
    }

    stopSimulation() {
        this.simulationRunning = false;
    }

    getIntersectionStatus(name) {
        const intersection = this.intersections.get(name);
        if (!intersection) return null;

        const status = { name: name, queues: {} };
        Object.keys(intersection.directions).forEach(direction => {
            status.queues[direction] = intersection.directions[direction].size();
        });
        return status;
    }
}

// Example Usage for all remaining implementations
console.log("\n=== Customer Service Call Center ===");
const callCenter = new CallCenter(2);

callCenter.addCustomer("John Doe", "Billing inquiry", 3);
callCenter.addCustomer("Jane Smith", "Technical support", 1); // High priority
callCenter.addCustomer("Bob Wilson", "General question", 3);
callCenter.addCustomer("Alice Brown", "Account locked", 2); // Priority

setTimeout(() => {
    console.log("Call Center Status:", callCenter.getStatus());
}, 5000);

console.log("\n=== Network Router Packet Management ===");
const router = new NetworkRouter(10);

// Simulate network traffic
router.receivePacket({ source: '192.168.1.1', destination: '10.0.0.1', type: 'voice', size: 64 });
router.receivePacket({ source: '192.168.1.2', destination: '10.0.0.2', type: 'data', size: 1500 });
router.receivePacket({ source: '192.168.1.3', destination: '10.0.0.3', type: 'video', size: 1200 });

setTimeout(() => {
    console.log("Router Stats:", router.getStats());
}, 2000);

console.log("\n=== Message Queue System ===");
const messageQueue = new MessageQueue();

// Subscribe to topics
messageQueue.subscribe('user.created', (msg) => {
    console.log(`Email service: Sending welcome email to user ${msg.payload.email}`);
});

messageQueue.subscribe('order.placed', (msg) => {
    console.log(`Inventory service: Reserving items for order ${msg.payload.orderId}`);
});

// Publish messages
messageQueue.publish('user.created', { userId: 123, email: 'user@example.com' });
messageQueue.publish('order.placed', { orderId: 456, items: ['laptop', 'mouse'] });

console.log("\n=== E-commerce Order Processing ===");
const orderProcessor = new EcommerceOrderProcessor();

orderProcessor.placeOrder("Regular Customer", [
    { name: "T-shirt", price: 25.99 },
    { name: "Jeans", price: 59.99 }
], 'regular');

orderProcessor.placeOrder("VIP Customer", [
    { name: "Laptop", price: 1299.99 },
    { name: "Mouse", price: 49.99 }
], 'premium');

setTimeout(() => {
    console.log("Order Stats:", orderProcessor.getOrderStats());
}, 3000);

console.log("\n=== Traffic Light Simulation ===");
const trafficSim = new TrafficSimulation();

trafficSim.addIntersection("Main & First", ['North', 'South', 'East', 'West']);

// Add some vehicles
trafficSim.addVehicle("Main & First", "North", "car");
trafficSim.addVehicle("Main & First", "North", "truck");
trafficSim.addVehicle("Main & First", "East", "car");
trafficSim.addVehicle("Main & First", "South", "motorcycle");

// Start simulation for 15 seconds
trafficSim.startSimulation("Main & First", 15000);