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

// 1. Browser History
class BrowserHistory {
    constructor() {
        this.history = new SinglyLinkedList();
        this.currentIndex = -1;
    }

    visit(url) {
        // Remove forward history when visiting new page
        if (this.currentIndex < this.history.length - 1) {
            // Truncate list at current position
            let current = this.history.head;
            for (let i = 0; i < this.currentIndex; i++) {
                current = current.next;
            }
            if (current) current.next = null;
            this.history.size = this.currentIndex + 1;
        }
        
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
        if (this.currentIndex >= 0) {
            let current = this.history.head;
            for (let i = 0; i < this.currentIndex; i++) {
                current = current.next;
            }
            return current.val;
        }
        return null;
    }
}

// 2. Undo Manager
class UndoManager {
    constructor() {
        this.actions = new SinglyLinkedList();
        this.redoStack = new SinglyLinkedList();
    }

    execute(action, undoAction) {
        action();
        this.actions.append(undoAction);
        this.redoStack.clear();
    }

    undo() {
        if (this.actions.length > 0) {
            const undoAction = this.actions.toArray().pop();
            this.actions.removeNthFromEnd(1);
            undoAction();
            this.redoStack.prepend(undoAction);
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            const redoAction = this.redoStack.toArray()[0];
            this.redoStack.delete(redoAction);
            redoAction();
            this.actions.append(redoAction);
        }
    }
}

// 3. Text Buffer for Text Editor
class TextBuffer {
    constructor() {
        this.lines = new SinglyLinkedList();
    }

    insertLine(lineNumber, text) {
        this.lines.insert(lineNumber, text);
    }

    deleteLine(lineNumber) {
        const lines = this.lines.toArray();
        if (lineNumber < lines.length) {
            this.lines.delete(lines[lineNumber]);
        }
    }

    getLine(lineNumber) {
        const lines = this.lines.toArray();
        return lines[lineNumber] || null;
    }

    getAllLines() {
        return this.lines.toArray();
    }
}

// 4. Memory Free List
class FreeBlock {
    constructor(address, size) {
        this.address = address;
        this.size = size;
        this.next = null;
    }
}

class FreeList {
    constructor() {
        this.head = null;
    }

    addFreeBlock(address, size) {
        const newBlock = new FreeBlock(address, size);
        
        if (!this.head || address < this.head.address) {
            newBlock.next = this.head;
            this.head = newBlock;
            return;
        }
        
        let current = this.head;
        while (current.next && current.next.address < address) {
            current = current.next;
        }
        
        newBlock.next = current.next;
        current.next = newBlock;
        
        this.coalesce();
    }

    allocate(size) {
        let prev = null;
        let current = this.head;
        
        while (current) {
            if (current.size >= size) {
                const address = current.address;
                
                if (current.size === size) {
                    // Remove entire block
                    if (prev) {
                        prev.next = current.next;
                    } else {
                        this.head = current.next;
                    }
                } else {
                    // Split block
                    current.address += size;
                    current.size -= size;
                }
                
                return address;
            }
            prev = current;
            current = current.next;
        }
        
        return null; // No suitable block found
    }

    coalesce() {
        let current = this.head;
        
        while (current && current.next) {
            if (current.address + current.size === current.next.address) {
                current.size += current.next.size;
                current.next = current.next.next;
            } else {
                current = current.next;
            }
        }
    }

    display() {
        const blocks = [];
        let current = this.head;
        while (current) {
            blocks.push(`[${current.address}, ${current.size}]`);
            current = current.next;
        }
        return blocks.join(' -> ');
    }
}

// Export classes for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SinglyLinkedList,
        ListNode,
        RandomNode,
        MultiLevelNode,
        BrowserHistory,
        UndoManager,
        TextBuffer,
        FreeList
    };
}


// Create and use the list
const list = new SinglyLinkedList();
list.append(1);
list.append(2);
list.append(3);

// Use algorithms
list.reverse();
console.log(list.display()); // "3 -> 2 -> 1 -> null"

// Real-world usage
const browser = SinglyLinkedList.createBrowserHistory();
browser.visit("google.com");
browser.visit("github.com");
browser.back(); // Returns to google.com