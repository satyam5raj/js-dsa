// Node class for the linked list
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Random pointer node for complex copying
class RandomNode {
    constructor(val = 0, next = null, random = null) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

// Multi-level node for flattening
class MultiLevelNode {
    constructor(val = 0, next = null, child = null) {
        this.val = val;
        this.next = next;
        this.child = child;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Basic operations
    append(val) {
        const newNode = new ListNode(val);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    prepend(val) {
        const newNode = new ListNode(val);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    insert(index, val) {
        if (index < 0 || index > this.size) throw new Error('Index out of bounds');
        if (index === 0) return this.prepend(val);
        
        const newNode = new ListNode(val);
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
    }

    delete(val) {
        if (!this.head) return false;
        
        if (this.head.val === val) {
            this.head = this.head.next;
            this.size--;
            return true;
        }
        
        let current = this.head;
        while (current.next && current.next.val !== val) {
            current = current.next;
        }
        
        if (current.next) {
            current.next = current.next.next;
            this.size--;
            return true;
        }
        return false;
    }

    // 1. REVERSAL OF LINKED LIST
    reverse() {
        let prev = null;
        let current = this.head;
        let next = null;
        
        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        this.head = prev;
        return this.head;
    }

    // Reverse sublist from position left to right
    reverseBetween(left, right) {
        if (!this.head || left === right) return this.head;
        
        const dummy = new ListNode(0);
        dummy.next = this.head;
        let prev = dummy;
        
        // Move to position before left
        for (let i = 0; i < left - 1; i++) {
            prev = prev.next;
        }
        
        let current = prev.next;
        
        // Reverse the sublist
        for (let i = 0; i < right - left; i++) {
            let nextNode = current.next;
            current.next = nextNode.next;
            nextNode.next = prev.next;
            prev.next = nextNode;
        }
        
        this.head = dummy.next;
        return this.head;
    }

    // 2. DETECTING AND REMOVING CYCLES
    hasCycle() {
        if (!this.head) return false;
        
        let slow = this.head;
        let fast = this.head;
        
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow === fast) return true;
        }
        
        return false;
    }

    detectCycle() {
        if (!this.head) return null;
        
        let slow = this.head;
        let fast = this.head;
        
        // Phase 1: Detect if cycle exists
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow === fast) break;
        }
        
        if (!fast || !fast.next) return null;
        
        // Phase 2: Find cycle start
        slow = this.head;
        while (slow !== fast) {
            slow = slow.next;
            fast = fast.next;
        }
        
        return slow;
    }

    removeCycle() {
        const cycleStart = this.detectCycle();
        if (!cycleStart) return;
        
        let current = cycleStart;
        while (current.next !== cycleStart) {
            current = current.next;
        }
        current.next = null;
    }

    // 3. FINDING THE MIDDLE NODE
    findMiddle() {
        if (!this.head) return null;
        
        let slow = this.head;
        let fast = this.head;
        
        while (fast.next && fast.next.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return slow;
    }

    // 4. MERGING TWO SORTED LINKED LISTS
    static mergeTwoSortedLists(list1, list2) {
        const dummy = new ListNode(0);
        let current = dummy;
        
        let l1 = list1;
        let l2 = list2;
        
        while (l1 && l2) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        current.next = l1 || l2;
        return dummy.next;
    }

    // 5. REMOVING NTH NODE FROM END
    removeNthFromEnd(n) {
        const dummy = new ListNode(0);
        dummy.next = this.head;
        
        let first = dummy;
        let second = dummy;
        
        // Move first pointer n+1 steps ahead
        for (let i = 0; i <= n; i++) {
            first = first.next;
        }
        
        // Move both pointers until first reaches end
        while (first) {
            first = first.next;
            second = second.next;
        }
        
        // Remove the nth node from end
        second.next = second.next.next;
        this.head = dummy.next;
        this.size--;
    }

    // 6. INTERSECTION POINT OF TWO LINKED LISTS
    static findIntersection(headA, headB) {
        if (!headA || !headB) return null;
        
        let pA = headA;
        let pB = headB;
        
        while (pA !== pB) {
            pA = pA ? pA.next : headB;
            pB = pB ? pB.next : headA;
        }
        
        return pA;
    }

    // 7. COPY LIST WITH RANDOM POINTER
    static copyRandomList(head) {
        if (!head) return null;
        
        const map = new Map();
        
        // First pass: create all nodes
        let current = head;
        while (current) {
            map.set(current, new RandomNode(current.val));
            current = current.next;
        }
        
        // Second pass: set next and random pointers
        current = head;
        while (current) {
            if (current.next) {
                map.get(current).next = map.get(current.next);
            }
            if (current.random) {
                map.get(current).random = map.get(current.random);
            }
            current = current.next;
        }
        
        return map.get(head);
    }

    // 8. FLATTENING MULTILEVEL LINKED LIST
    static flatten(head) {
        if (!head) return head;
        
        const stack = [];
        let current = head;
        
        while (current) {
            if (current.child) {
                if (current.next) {
                    stack.push(current.next);
                }
                current.next = current.child;
                current.child = null;
            }
            
            if (!current.next && stack.length > 0) {
                current.next = stack.pop();
            }
            
            current = current.next;
        }
        
        return head;
    }

    // 9. PALINDROME CHECK
    isPalindrome() {
        if (!this.head || !this.head.next) return true;
        
        // Find middle
        let slow = this.head;
        let fast = this.head;
        
        while (fast.next && fast.next.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Reverse second half
        let secondHalf = this.reverseList(slow.next);
        
        // Compare both halves
        let firstHalf = this.head;
        while (secondHalf) {
            if (firstHalf.val !== secondHalf.val) return false;
            firstHalf = firstHalf.next;
            secondHalf = secondHalf.next;
        }
        
        return true;
    }

    reverseList(head) {
        let prev = null;
        let current = head;
        
        while (current) {
            let next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        return prev;
    }

    // 10. ROTATE LINKED LIST
    rotateRight(k) {
        if (!this.head || !this.head.next || k === 0) return this.head;
        
        // Find length and make it circular
        let length = 1;
        let tail = this.head;
        while (tail.next) {
            tail = tail.next;
            length++;
        }
        tail.next = this.head;
        
        // Find new tail
        k = k % length;
        let stepsToNewTail = length - k;
        let newTail = this.head;
        
        for (let i = 1; i < stepsToNewTail; i++) {
            newTail = newTail.next;
        }
        
        this.head = newTail.next;
        newTail.next = null;
        
        return this.head;
    }

    // REAL-WORLD USE CASES IMPLEMENTATIONS

    // Browser History Navigation
    static createBrowserHistory() {
        return new BrowserHistory();
    }

    // Undo Mechanism
    static createUndoManager() {
        return new UndoManager();
    }

    // Text Editor Buffer
    static createTextBuffer() {
        return new TextBuffer();
    }

    // Memory allocator free list
    static createFreeList() {
        return new FreeList();
    }

    // Utility methods
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        return result;
    }

    display() {
        return this.toArray().join(' -> ') + ' -> null';
    }

    clear() {
        this.head = null;
        this.size = 0;
    }

    get length() {
        return this.size;
    }
}

// Real-world use case implementations

// 1. MEMORY MANAGEMENT - Free List Management
class FreeBlock {
    constructor(address, size) {
        this.address = address;
        this.size = size;
        this.next = null;
    }
}

class MemoryAllocator {
    constructor(totalMemory = 1024) {
        this.totalMemory = totalMemory;
        this.freeList = new FreeBlock(0, totalMemory);
        this.allocatedBlocks = new Map();
    }

    allocate(size) {
        if (size <= 0) return null;
        
        let prev = null;
        let current = this.freeList;
        
        // Find first fit
        while (current) {
            if (current.size >= size) {
                const address = current.address;
                
                if (current.size === size) {
                    // Remove entire block
                    if (prev) {
                        prev.next = current.next;
                    } else {
                        this.freeList = current.next;
                    }
                } else {
                    // Split block
                    current.address += size;
                    current.size -= size;
                }
                
                this.allocatedBlocks.set(address, size);
                return address;
            }
            prev = current;
            current = current.next;
        }
        
        return null; // Out of memory
    }

    free(address) {
        if (!this.allocatedBlocks.has(address)) return false;
        
        const size = this.allocatedBlocks.get(address);
        this.allocatedBlocks.delete(address);
        
        // Insert back into free list (sorted by address)
        const newBlock = new FreeBlock(address, size);
        
        if (!this.freeList || address < this.freeList.address) {
            newBlock.next = this.freeList;
            this.freeList = newBlock;
        } else {
            let current = this.freeList;
            while (current.next && current.next.address < address) {
                current = current.next;
            }
            newBlock.next = current.next;
            current.next = newBlock;
        }
        
        this.coalesce();
        return true;
    }

    coalesce() {
        let current = this.freeList;
        
        while (current && current.next) {
            if (current.address + current.size === current.next.address) {
                current.size += current.next.size;
                current.next = current.next.next;
            } else {
                current = current.next;
            }
        }
    }

    getMemoryStatus() {
        const freeBlocks = [];
        let current = this.freeList;
        let totalFree = 0;
        
        while (current) {
            freeBlocks.push({ address: current.address, size: current.size });
            totalFree += current.size;
            current = current.next;
        }
        
        return {
            totalMemory: this.totalMemory,
            freeMemory: totalFree,
            allocatedMemory: this.totalMemory - totalFree,
            freeBlocks,
            allocatedBlocks: Array.from(this.allocatedBlocks.entries())
        };
    }
}

// 2. IMPLEMENTING STACKS AND QUEUES
class LinkedStack {
    constructor() {
        this.top = null;
        this.size = 0;
    }

    push(val) {
        const newNode = new ListNode(val);
        newNode.next = this.top;
        this.top = newNode;
        this.size++;
    }

    pop() {
        if (!this.top) return null;
        
        const val = this.top.val;
        this.top = this.top.next;
        this.size--;
        return val;
    }

    peek() {
        return this.top ? this.top.val : null;
    }

    isEmpty() {
        return this.size === 0;
    }

    getSize() {
        return this.size;
    }

    display() {
        const items = [];
        let current = this.top;
        while (current) {
            items.push(current.val);
            current = current.next;
        }
        return `Stack: [${items.join(', ')}] <- top`;
    }
}

class LinkedQueue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    enqueue(val) {
        const newNode = new ListNode(val);
        
        if (!this.rear) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.size++;
    }

    dequeue() {
        if (!this.front) return null;
        
        const val = this.front.val;
        this.front = this.front.next;
        
        if (!this.front) {
            this.rear = null;
        }
        
        this.size--;
        return val;
    }

    peek() {
        return this.front ? this.front.val : null;
    }

    isEmpty() {
        return this.size === 0;
    }

    getSize() {
        return this.size;
    }

    display() {
        const items = [];
        let current = this.front;
        while (current) {
            items.push(current.val);
            current = current.next;
        }
        return `Queue: front -> [${items.join(', ')}] <- rear`;
    }
}

// 3. UNDO MECHANISMS
class Command {
    constructor(execute, undo, description = '') {
        this.execute = execute;
        this.undo = undo;
        this.description = description;
    }
}

class UndoManager {
    constructor(maxHistory = 50) {
        this.undoStack = new LinkedStack();
        this.redoStack = new LinkedStack();
        this.maxHistory = maxHistory;
    }

    executeCommand(command) {
        // Execute the command
        command.execute();
        
        // Add to undo stack
        this.undoStack.push(command);
        
        // Clear redo stack when new command is executed
        this.redoStack = new LinkedStack();
        
        // Limit history size
        if (this.undoStack.getSize() > this.maxHistory) {
            // Remove oldest command (would need to implement stack bottom removal)
            // For simplicity, we'll just track the limit
        }
    }

    undo() {
        if (this.undoStack.isEmpty()) return false;
        
        const command = this.undoStack.pop();
        command.undo();
        this.redoStack.push(command);
        return true;
    }

    redo() {
        if (this.redoStack.isEmpty()) return false;
        
        const command = this.redoStack.pop();
        command.execute();
        this.undoStack.push(command);
        return true;
    }

    canUndo() {
        return !this.undoStack.isEmpty();
    }

    canRedo() {
        return !this.redoStack.isEmpty();
    }

    getUndoDescription() {
        return this.undoStack.peek()?.description || '';
    }

    getRedoDescription() {
        return this.redoStack.peek()?.description || '';
    }

    clear() {
        this.undoStack = new LinkedStack();
        this.redoStack = new LinkedStack();
    }
}

// 4. ADJACENCY LISTS IN GRAPHS
class GraphNode {
    constructor(val) {
        this.val = val;
        this.neighbors = new SinglyLinkedList();
    }

    addNeighbor(node, weight = 1) {
        this.neighbors.append({ node, weight });
    }

    removeNeighbor(node) {
        const neighbors = this.neighbors.toArray();
        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i].node === node) {
                this.neighbors.delete(neighbors[i]);
                return true;
            }
        }
        return false;
    }

    getNeighbors() {
        return this.neighbors.toArray();
    }
}

class Graph {
    constructor(directed = false) {
        this.nodes = new Map();
        this.directed = directed;
    }

    addNode(val) {
        if (!this.nodes.has(val)) {
            this.nodes.set(val, new GraphNode(val));
        }
        return this.nodes.get(val);
    }

    addEdge(from, to, weight = 1) {
        const fromNode = this.addNode(from);
        const toNode = this.addNode(to);
        
        fromNode.addNeighbor(toNode, weight);
        
        if (!this.directed) {
            toNode.addNeighbor(fromNode, weight);
        }
    }

    removeEdge(from, to) {
        const fromNode = this.nodes.get(from);
        const toNode = this.nodes.get(to);
        
        if (fromNode && toNode) {
            fromNode.removeNeighbor(toNode);
            if (!this.directed) {
                toNode.removeNeighbor(fromNode);
            }
            return true;
        }
        return false;
    }

    getNeighbors(val) {
        const node = this.nodes.get(val);
        return node ? node.getNeighbors() : [];
    }

    // Graph traversal algorithms
    bfs(startVal) {
        const visited = new Set();
        const queue = new LinkedQueue();
        const result = [];
        
        queue.enqueue(startVal);
        visited.add(startVal);
        
        while (!queue.isEmpty()) {
            const current = queue.dequeue();
            result.push(current);
            
            const neighbors = this.getNeighbors(current);
            for (const { node } of neighbors) {
                if (!visited.has(node.val)) {
                    visited.add(node.val);
                    queue.enqueue(node.val);
                }
            }
        }
        
        return result;
    }

    dfs(startVal) {
        const visited = new Set();
        const stack = new LinkedStack();
        const result = [];
        
        stack.push(startVal);
        
        while (!stack.isEmpty()) {
            const current = stack.pop();
            
            if (!visited.has(current)) {
                visited.add(current);
                result.push(current);
                
                const neighbors = this.getNeighbors(current);
                for (const { node } of neighbors) {
                    if (!visited.has(node.val)) {
                        stack.push(node.val);
                    }
                }
            }
        }
        
        return result;
    }

    display() {
        const result = [];
        for (const [val, node] of this.nodes) {
            const neighbors = node.getNeighbors().map(({ node, weight }) => 
                `${node.val}(${weight})`
            ).join(', ');
            result.push(`${val} -> [${neighbors}]`);
        }
        return result.join('\n');
    }
}

// 5. NAVIGATING BROWSER HISTORY
class BrowserHistory {
    constructor(homepage = 'about:blank') {
        this.history = new SinglyLinkedList();
        this.currentIndex = -1;
        this.visit(homepage);
    }

    visit(url) {
        // Remove all forward history when visiting new page
        const currentHistory = this.history.toArray();
        this.history.clear();
        
        // Add back only the history up to current position
        for (let i = 0; i <= this.currentIndex; i++) {
            if (currentHistory[i]) {
                this.history.append(currentHistory[i]);
            }
        }
        
        // Add new URL
        this.history.append(url);
        this.currentIndex++;
    }

    back() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return this.getCurrentUrl();
        }
        return null;
    }

    forward() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return this.getCurrentUrl();
        }
        return null;
    }

    getCurrentUrl() {
        const historyArray = this.history.toArray();
        return historyArray[this.currentIndex] || null;
    }

    canGoBack() {
        return this.currentIndex > 0;
    }

    canGoForward() {
        return this.currentIndex < this.history.length - 1;
    }

    getHistory() {
        return this.history.toArray();
    }

    clear() {
        this.history.clear();
        this.currentIndex = -1;
    }
}

// 6. FILE SYSTEM DIRECTORY TRAVERSAL
class DirectoryNode {
    constructor(name, isDirectory = true) {
        this.name = name;
        this.isDirectory = isDirectory;
        this.children = new SinglyLinkedList();
        this.parent = null;
        this.size = isDirectory ? 0 : Math.floor(Math.random() * 10000); // Random file size
    }

    addChild(childNode) {
        childNode.parent = this;
        this.children.append(childNode);
    }

    removeChild(name) {
        const children = this.children.toArray();
        for (const child of children) {
            if (child.name === name) {
                child.parent = null;
                this.children.delete(child);
                return true;
            }
        }
        return false;
    }

    findChild(name) {
        const children = this.children.toArray();
        return children.find(child => child.name === name) || null;
    }

    getChildren() {
        return this.children.toArray();
    }

    getPath() {
        const path = [];
        let current = this;
        
        while (current.parent) {
            path.unshift(current.name);
            current = current.parent;
        }
        
        return '/' + path.join('/');
    }
}

class FileSystem {
    constructor() {
        this.root = new DirectoryNode('root');
        this.currentDirectory = this.root;
    }

    mkdir(name) {
        const newDir = new DirectoryNode(name, true);
        this.currentDirectory.addChild(newDir);
        return newDir;
    }

    touch(name, size = Math.floor(Math.random() * 1000)) {
        const newFile = new DirectoryNode(name, false);
        newFile.size = size;
        this.currentDirectory.addChild(newFile);
        return newFile;
    }

    cd(path) {
        if (path === '/') {
            this.currentDirectory = this.root;
            return true;
        }
        
        if (path === '..') {
            if (this.currentDirectory.parent) {
                this.currentDirectory = this.currentDirectory.parent;
            }
            return true;
        }
        
        const child = this.currentDirectory.findChild(path);
        if (child && child.isDirectory) {
            this.currentDirectory = child;
            return true;
        }
        
        return false;
    }

    ls() {
        return this.currentDirectory.getChildren().map(child => ({
            name: child.name,
            type: child.isDirectory ? 'directory' : 'file',
            size: child.isDirectory ? null : child.size
        }));
    }

    pwd() {
        return this.currentDirectory.getPath();
    }

    find(name, startDir = this.root) {
        const results = [];
        const stack = new LinkedStack();
        stack.push(startDir);
        
        while (!stack.isEmpty()) {
            const current = stack.pop();
            
            if (current.name === name) {
                results.push(current.getPath());
            }
            
            if (current.isDirectory) {
                const children = current.getChildren();
                for (const child of children) {
                    stack.push(child);
                }
            }
        }
        
        return results;
    }

    tree(node = this.currentDirectory, prefix = '', isLast = true) {
        let result = prefix + (isLast ? '└── ' : '├── ') + node.name;
        
        if (!node.isDirectory) {
            result += ` (${node.size} bytes)`;
        }
        
        result += '\n';
        
        const children = node.getChildren();
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            result += this.tree(child, newPrefix, i === children.length - 1);
        }
        
        return result;
    }
}

// 7. TEXT EDITORS - Advanced Text Buffer
class TextLine {
    constructor(content = '') {
        this.content = content;
        this.next = null;
    }
}

class TextEditor {
    constructor() {
        this.lines = null;
        this.lineCount = 0;
        this.cursor = { line: 0, column: 0 };
        this.undoManager = new UndoManager();
    }

    insertLine(lineNumber, content = '') {
        const newLine = new TextLine(content);
        
        if (lineNumber === 0 || !this.lines) {
            newLine.next = this.lines;
            this.lines = newLine;
        } else {
            let current = this.lines;
            for (let i = 0; i < lineNumber - 1 && current.next; i++) {
                current = current.next;
            }
            newLine.next = current.next;
            current.next = newLine;
        }
        
        this.lineCount++;
    }

    deleteLine(lineNumber) {
        if (lineNumber < 0 || lineNumber >= this.lineCount) return false;
        
        if (lineNumber === 0) {
            this.lines = this.lines.next;
        } else {
            let current = this.lines;
            for (let i = 0; i < lineNumber - 1; i++) {
                current = current.next;
            }
            if (current.next) {
                current.next = current.next.next;
            }
        }
        
        this.lineCount--;
        return true;
    }

    getLine(lineNumber) {
        if (lineNumber < 0 || lineNumber >= this.lineCount) return null;
        
        let current = this.lines;
        for (let i = 0; i < lineNumber; i++) {
            current = current.next;
        }
        return current.content;
    }

    setLine(lineNumber, content) {
        if (lineNumber < 0 || lineNumber >= this.lineCount) return false;
        
        let current = this.lines;
        for (let i = 0; i < lineNumber; i++) {
            current = current.next;
        }
        
        const oldContent = current.content;
        current.content = content;
        
        // Add to undo manager
        this.undoManager.executeCommand(new Command(
            () => current.content = content,
            () => current.content = oldContent,
            `Edit line ${lineNumber}`
        ));
        
        return true;
    }

    insertText(lineNumber, column, text) {
        const line = this.getLine(lineNumber);
        if (line === null) return false;
        
        const newContent = line.slice(0, column) + text + line.slice(column);
        return this.setLine(lineNumber, newContent);
    }

    deleteText(lineNumber, startColumn, endColumn) {
        const line = this.getLine(lineNumber);
        if (line === null) return false;
        
        const newContent = line.slice(0, startColumn) + line.slice(endColumn);
        return this.setLine(lineNumber, newContent);
    }

    getAllLines() {
        const result = [];
        let current = this.lines;
        while (current) {
            result.push(current.content);
            current = current.next;
        }
        return result;
    }

    search(pattern) {
        const results = [];
        let current = this.lines;
        let lineNumber = 0;
        
        while (current) {
            const matches = [...current.content.matchAll(new RegExp(pattern, 'g'))];
            for (const match of matches) {
                results.push({
                    line: lineNumber,
                    column: match.index,
                    text: match[0]
                });
            }
            current = current.next;
            lineNumber++;
        }
        
        return results;
    }

    replace(pattern, replacement) {
        let replacements = 0;
        let current = this.lines;
        let lineNumber = 0;
        
        while (current) {
            const newContent = current.content.replace(new RegExp(pattern, 'g'), replacement);
            if (newContent !== current.content) {
                current.content = newContent;
                replacements++;
            }
            current = current.next;
            lineNumber++;
        }
        
        return replacements;
    }

    undo() {
        return this.undoManager.undo();
    }

    redo() {
        return this.undoManager.redo();
    }

    display() {
        const lines = this.getAllLines();
        return lines.map((line, index) => `${index + 1}: ${line}`).join('\n');
    }
}

// Example usage and demonstrations
function demonstrateRealWorldUseCases() {
    console.log("=== REAL-WORLD USE CASES DEMONSTRATION ===\n");

    // 1. Memory Management
    console.log("1. MEMORY MANAGEMENT:");
    const allocator = new MemoryAllocator(1024);
    const ptr1 = allocator.allocate(100);
    const ptr2 = allocator.allocate(200);
    console.log(`Allocated 100 bytes at address ${ptr1}`);
    console.log(`Allocated 200 bytes at address ${ptr2}`);
    console.log("Memory status:", allocator.getMemoryStatus());
    allocator.free(ptr1);
    console.log("After freeing first block:", allocator.getMemoryStatus());
    console.log("");

    // 2. Stack and Queue Implementation
    console.log("2. STACK AND QUEUE:");
    const stack = new LinkedStack();
    stack.push(1); stack.push(2); stack.push(3);
    console.log(stack.display());
    console.log(`Popped: ${stack.pop()}`);
    console.log(stack.display());
    
    const queue = new LinkedQueue();
    queue.enqueue('A'); queue.enqueue('B'); queue.enqueue('C');
    console.log(queue.display());
    console.log(`Dequeued: ${queue.dequeue()}`);
    console.log(queue.display());
    console.log("");

    // 3. Undo Mechanism
    console.log("3. UNDO MECHANISM:");
    let value = 0;
    const undoMgr = new UndoManager();
    
    const addCommand = new Command(
        () => { value += 5; console.log(`Value: ${value}`); },
        () => { value -= 5; console.log(`Undone, Value: ${value}`); },
        'Add 5'
    );
    
    undoMgr.executeCommand(addCommand);
    undoMgr.executeCommand(addCommand);
    console.log("Undoing...");
    undoMgr.undo();
    console.log("Redoing...");
    undoMgr.redo();
    console.log("");

    // 4. Graph with Adjacency Lists
    console.log("4. GRAPH ADJACENCY LISTS:");
    const graph = new Graph();
    graph.addEdge('A', 'B', 1);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'D', 3);
    graph.addEdge('C', 'D', 1);
    console.log("Graph structure:");
    console.log(graph.display());
    console.log("BFS from A:", graph.bfs('A'));
    console.log("DFS from A:", graph.dfs('A'));
    console.log("");

    // 5. Browser History
    console.log("5. BROWSER HISTORY:");
    const browser = new BrowserHistory();
    browser.visit('google.com');
    browser.visit('github.com');
    browser.visit('stackoverflow.com');
    console.log("Current URL:", browser.getCurrentUrl());
    console.log("Go back:", browser.back());
    console.log("Go back:", browser.back());
    console.log("Go forward:", browser.forward());
    console.log("History:", browser.getHistory());
    console.log("");

    // 6. File System
    console.log("6. FILE SYSTEM:");
    const fs = new FileSystem();
    fs.mkdir('documents');
    fs.mkdir('pictures');
    fs.cd('documents');
    fs.touch('readme.txt');
    fs.touch('notes.md');
    fs.mkdir('projects');
    console.log("Current directory:", fs.pwd());
    console.log("Directory contents:", fs.ls());
    console.log("Directory tree:");
    console.log(fs.tree());
    console.log("");

    // 7. Text Editor
    console.log("7. TEXT EDITOR:");
    const editor = new TextEditor();
    editor.insertLine(0, 'Hello World');
    editor.insertLine(1, 'This is line 2');
    editor.insertLine(2, 'This is line 3');
    console.log("Editor content:");
    console.log(editor.display());
    
    editor.setLine(1, 'This is the modified line 2');
    console.log("\nAfter editing line 2:");
    console.log(editor.display());
    
    console.log("\nSearch results for 'line':");
    console.log(editor.search('line'));
    
    console.log("\nUndo last change:");
    editor.undo();
    console.log(editor.display());
}

// Advanced algorithms and utilities
class AdvancedLinkedListAlgorithms {
    // Merge K sorted lists
    static mergeKLists(lists) {
        if (!lists || lists.length === 0) return null;
        
        while (lists.length > 1) {
            const mergedLists = [];
            
            for (let i = 0; i < lists.length; i += 2) {
                const l1 = lists[i];
                const l2 = i + 1 < lists.length ? lists[i + 1] : null;
                mergedLists.push(SinglyLinkedList.mergeTwoSortedLists(l1, l2));
            }
            
            lists = mergedLists;
        }
        
        return lists[0];
    }

    // Sort linked list using merge sort
    static mergeSort(head) {
        if (!head || !head.next) return head;
        
        // Find middle
        let slow = head;
        let fast = head;
        let prev = null;
        
        while (fast && fast.next) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Split the list
        prev.next = null;
        
        // Recursively sort both halves
        const left = this.mergeSort(head);
        const right = this.mergeSort(slow);
        
        // Merge sorted halves
        return SinglyLinkedList.mergeTwoSortedLists(left, right);
    }

    // Add two numbers represented as linked lists
    static addTwoNumbers(l1, l2) {
        const dummy = new ListNode(0);
        let current = dummy;
        let carry = 0;
        
        while (l1 || l2 || carry) {
            const val1 = l1 ? l1.val : 0;
            const val2 = l2 ? l2.val : 0;
            const sum = val1 + val2 + carry;
            
            carry = Math.floor(sum / 10);
            current.next = new ListNode(sum % 10);
            current = current.next;
            
            if (l1) l1 = l1.next;
            if (l2) l2 = l2.next;
        }
        
        return dummy.next;
    }

    // Partition list around a value
    static partition(head, x) {
        const beforeDummy = new ListNode(0);
        const afterDummy = new ListNode(0);
        
        let before = beforeDummy;
        let after = afterDummy;
        
        while (head) {
            if (head.val < x) {
                before.next = head;
                before = before.next;
            } else {
                after.next = head;
                after = after.next;
            }
            head = head.next;
        }
        
        after.next = null;
        before.next = afterDummy.next;
        
        return beforeDummy.next;
    }

    // Remove duplicates from sorted list
    static removeDuplicates(head) {
        let current = head;
        
        while (current && current.next) {
            if (current.val === current.next.val) {
                current.next = current.next.next;
            } else {
                current = current.next;
            }
        }
        
        return head;
    }

    // Remove all duplicates from sorted list
    static removeDuplicatesII(head) {
        const dummy = new ListNode(0);
        dummy.next = head;
        let prev = dummy;
        
        while (head) {
            if (head.next && head.val === head.next.val) {
                // Skip all nodes with the same value
                while (head.next && head.val === head.next.val) {
                    head = head.next;
                }
                prev.next = head.next;
            } else {
                prev = prev.next;
            }
            head = head.next;
        }
        
        return dummy.next;
    }

    // Swap nodes in pairs
    static swapPairs(head) {
        const dummy = new ListNode(0);
        dummy.next = head;
        let prev = dummy;
        
        while (prev.next && prev.next.next) {
            const first = prev.next;
            const second = prev.next.next;
            
            prev.next = second;
            first.next = second.next;
            second.next = first;
            
            prev = first;
        }
        
        return dummy.next;
    }

    // Reverse nodes in k-group
    static reverseKGroup(head, k) {
        let count = 0;
        let current = head;
        
        // Count nodes in current group
        while (current && count < k) {
            current = current.next;
            count++;
        }
        
        // If we have k nodes, reverse them
        if (count === k) {
            current = this.reverseKGroup(current, k);
            
            // Reverse current group
            while (count > 0) {
                const next = head.next;
                head.next = current;
                current = head;
                head = next;
                count--;
            }
            
            head = current;
        }
        
        return head;
    }
}

// Performance testing utilities
class LinkedListPerformance {
    static timeOperation(operation, description) {
        const start = performance.now();
        operation();
        const end = performance.now();
        console.log(`${description}: ${(end - start).toFixed(4)}ms`);
    }

    static compareWithArray(size = 10000) {
        console.log(`\n=== PERFORMANCE COMPARISON (${size} elements) ===`);
        
        // Linked List operations
        const list = new SinglyLinkedList();
        this.timeOperation(() => {
            for (let i = 0; i < size; i++) {
                list.append(i);
            }
        }, "Linked List: Append operations");
        
        this.timeOperation(() => {
            for (let i = 0; i < 1000; i++) {
                list.prepend(i);
            }
        }, "Linked List: Prepend operations");
        
        // Array operations
        const arr = [];
        this.timeOperation(() => {
            for (let i = 0; i < size; i++) {
                arr.push(i);
            }
        }, "Array: Push operations");
        
        this.timeOperation(() => {
            for (let i = 0; i < 1000; i++) {
                arr.unshift(i);
            }
        }, "Array: Unshift operations");
        
        // Search operations
        this.timeOperation(() => {
            let current = list.head;
            let count = 0;
            while (current && count < size / 2) {
                current = current.next;
                count++;
            }
        }, "Linked List: Sequential search");
        
        this.timeOperation(() => {
            arr.indexOf(size / 2);
        }, "Array: indexOf search");
    }
}

// Export all classes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Core classes
        SinglyLinkedList,
        ListNode,
        RandomNode,
        MultiLevelNode,
        
        // Memory Management
        MemoryAllocator,
        
        // Stack and Queue
        LinkedStack,
        LinkedQueue,
        
        // Undo System
        UndoManager,
        Command,
        
        // Graph
        Graph,
        GraphNode,
        
        // Browser History
        BrowserHistory,
        
        // File System
        FileSystem,
        DirectoryNode,
        
        // Text Editor
        TextEditor,
        TextLine,
        
        // Advanced Algorithms
        AdvancedLinkedListAlgorithms,
        
        // Performance Testing
        LinkedListPerformance,
        
        // Demo function
        demonstrateRealWorldUseCases
    };
}

// Run demonstration if in browser environment
if (typeof window !== 'undefined') {
    // Uncomment the line below to run the demonstration
    // demonstrateRealWorldUseCases();
}