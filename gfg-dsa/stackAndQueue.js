// ==================== STACKS AND QUEUES PROBLEMS ====================

// 1. Implement Stack from Scratch
/**
 * Problem: Implement a stack data structure with basic operations
 * Approach: Use array to store elements with push/pop operations
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is number of elements
 */
class Stack {
    constructor() {
        this.items = [];
        this.count = 0;
    }
    
    push(element) {
        this.items[this.count] = element;
        this.count++;
        return this.count - 1;
    }
    
    pop() {
        if (this.count === 0) return undefined;
        const deleteItem = this.items[this.count - 1];
        this.count--;
        return deleteItem;
    }
    
    peek() {
        return this.items[this.count - 1];
    }
    
    isEmpty() {
        return this.count === 0;
    }
    
    size() {
        return this.count;
    }
}

// Test Case for Stack
console.log("=== Stack Implementation Test ===");
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log("Stack after pushes:", stack.items.slice(0, stack.count)); // [10, 20, 30]
console.log("Pop:", stack.pop()); // 30
console.log("Peek:", stack.peek()); // 20
console.log("Size:", stack.size()); // 2

// 2. Implement Queue from Scratch
/**
 * Problem: Implement a queue data structure with basic operations
 * Approach: Use array with front and rear pointers
 * Time Complexity: O(1) for enqueue/dequeue
 * Space Complexity: O(n) where n is number of elements
 */
class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
    }
    
    enqueue(element) {
        this.items[this.rear] = element;
        this.rear++;
    }
    
    dequeue() {
        if (this.isEmpty()) return undefined;
        const item = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return item;
    }
    
    isEmpty() {
        return this.rear === this.front;
    }
    
    size() {
        return this.rear - this.front;
    }
    
    peek() {
        return this.items[this.front];
    }
}

// Test Case for Queue
console.log("\n=== Queue Implementation Test ===");
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log("Dequeue:", queue.dequeue()); // 10
console.log("Peek:", queue.peek()); // 20
console.log("Size:", queue.size()); // 2

// 3. Implement 2 stacks in an array
/**
 * Problem: Implement two stacks using a single array
 * Approach: Use two pointers from both ends of array
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is array size
 */
class TwoStacks {
    constructor(size) {
        this.size = size;
        this.arr = new Array(size);
        this.top1 = -1;
        this.top2 = size;
    }
    
    push1(x) {
        if (this.top1 < this.top2 - 1) {
            this.top1++;
            this.arr[this.top1] = x;
        } else {
            throw new Error("Stack Overflow");
        }
    }
    
    push2(x) {
        if (this.top1 < this.top2 - 1) {
            this.top2--;
            this.arr[this.top2] = x;
        } else {
            throw new Error("Stack Overflow");
        }
    }
    
    pop1() {
        if (this.top1 >= 0) {
            const x = this.arr[this.top1];
            this.top1--;
            return x;
        } else {
            throw new Error("Stack Underflow");
        }
    }
    
    pop2() {
        if (this.top2 < this.size) {
            const x = this.arr[this.top2];
            this.top2++;
            return x;
        } else {
            throw new Error("Stack Underflow");
        }
    }
}

// Test Case for Two Stacks
console.log("\n=== Two Stacks in Array Test ===");
const twoStacks = new TwoStacks(10);
twoStacks.push1(5);
twoStacks.push2(10);
twoStacks.push2(15);
twoStacks.push1(11);
console.log("Pop from stack1:", twoStacks.pop1()); // 11
console.log("Pop from stack2:", twoStacks.pop2()); // 15

// 4. Find the middle element of a stack
/**
 * Problem: Find middle element of stack without using extra space
 * Approach: Use auxiliary stack and count to track middle
 * Time Complexity: O(n)
 * Space Complexity: O(n) for auxiliary stack
 */
class StackWithMiddle {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(x) {
        this.stack.push(x);
    }
    
    pop() {
        return this.stack.pop();
    }
    
    findMiddle() {
        const len = this.stack.length;
        if (len === 0) return null;
        return this.stack[Math.floor(len / 2)];
    }
    
    deleteMiddle() {
        const len = this.stack.length;
        if (len === 0) return null;
        const midIndex = Math.floor(len / 2);
        return this.stack.splice(midIndex, 1)[0];
    }
}

// Test Case for Middle Element
console.log("\n=== Stack Middle Element Test ===");
const stackMid = new StackWithMiddle();
stackMid.push(1);
stackMid.push(2);
stackMid.push(3);
stackMid.push(4);
stackMid.push(5);
console.log("Middle element:", stackMid.findMiddle()); // 3
console.log("Delete middle:", stackMid.deleteMiddle()); // 3
console.log("New middle:", stackMid.findMiddle()); // 2

// 5. Implement "N" stacks in an Array
/**
 * Problem: Implement N stacks using a single array
 * Approach: Divide array into N parts and use separate top pointers
 * Time Complexity: O(1) for push/pop operations
 * Space Complexity: O(n) where n is array size
 */
class NStacks {
    constructor(numberOfStacks, arraySize) {
        this.numberOfStacks = numberOfStacks;
        this.arraySize = arraySize;
        this.arr = new Array(arraySize);
        this.top = new Array(numberOfStacks).fill(-1);
        this.stackSize = Math.floor(arraySize / numberOfStacks);
    }
    
    push(stackNumber, value) {
        const stackNum = stackNumber - 1; // 0-indexed
        if (this.top[stackNum] < (stackNum + 1) * this.stackSize - 1) {
            this.top[stackNum]++;
            this.arr[stackNum * this.stackSize + this.top[stackNum]] = value;
        } else {
            throw new Error(`Stack ${stackNumber} is full`);
        }
    }
    
    pop(stackNumber) {
        const stackNum = stackNumber - 1; // 0-indexed
        if (this.top[stackNum] >= 0) {
            const value = this.arr[stackNum * this.stackSize + this.top[stackNum]];
            this.top[stackNum]--;
            return value;
        } else {
            throw new Error(`Stack ${stackNumber} is empty`);
        }
    }
    
    isEmpty(stackNumber) {
        return this.top[stackNumber - 1] === -1;
    }
}

// Test Case for N Stacks
console.log("\n=== N Stacks in Array Test ===");
const nStacks = new NStacks(3, 9);
nStacks.push(1, 10);
nStacks.push(1, 20);
nStacks.push(2, 30);
nStacks.push(3, 40);
console.log("Pop from stack 1:", nStacks.pop(1)); // 20
console.log("Pop from stack 2:", nStacks.pop(2)); // 30

// 6. Check the expression has valid or Balanced parenthesis
/**
 * Problem: Check if parentheses are balanced in an expression
 * Approach: Use stack to match opening and closing brackets
 * Time Complexity: O(n) where n is string length
 * Space Complexity: O(n) in worst case
 */
function isBalanced(expression) {
    const stack = [];
    const pairs = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    
    for (let char of expression) {
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        } else if (char === ')' || char === ']' || char === '}') {
            if (stack.length === 0) return false;
            const last = stack.pop();
            if (pairs[last] !== char) return false;
        }
    }
    
    return stack.length === 0;
}

// Test Case for Balanced Parentheses
console.log("\n=== Balanced Parentheses Test ===");
console.log("({[]}) is balanced:", isBalanced("({[]})")); // true
console.log("({[}) is balanced:", isBalanced("({[})")); // false
console.log("((( is balanced:", isBalanced("(((")); // false

// 7. Reverse a String using Stack
/**
 * Problem: Reverse a string using stack data structure
 * Approach: Push all characters to stack, then pop them
 * Time Complexity: O(n) where n is string length
 * Space Complexity: O(n) for stack storage
 */
function reverseString(str) {
    const stack = [];
    
    // Push all characters to stack
    for (let char of str) {
        stack.push(char);
    }
    
    // Pop all characters to form reversed string
    let reversed = '';
    while (stack.length > 0) {
        reversed += stack.pop();
    }
    
    return reversed;
}

// Test Case for String Reverse
console.log("\n=== String Reverse using Stack Test ===");
console.log("Reverse of 'hello':", reverseString("hello")); // "olleh"
console.log("Reverse of 'world':", reverseString("world")); // "dlrow"

// 8. Design a Stack that supports getMin() in O(1) time and O(1) extra space
/**
 * Problem: Design stack with O(1) getMin operation
 * Approach: Use auxiliary stack to keep track of minimum elements
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) for auxiliary stack
 */
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(x) {
        this.stack.push(x);
        if (this.minStack.length === 0 || x <= this.getMin()) {
            this.minStack.push(x);
        }
    }
    
    pop() {
        if (this.stack.length === 0) return null;
        const popped = this.stack.pop();
        if (popped === this.getMin()) {
            this.minStack.pop();
        }
        return popped;
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

// Test Case for MinStack
console.log("\n=== MinStack Test ===");
const minStack = new MinStack();
minStack.push(3);
minStack.push(5);
console.log("Min:", minStack.getMin()); // 3
minStack.push(2);
minStack.push(1);
console.log("Min:", minStack.getMin()); // 1
minStack.pop();
console.log("Min after pop:", minStack.getMin()); // 2

// 9. Find the next Greater element
/**
 * Problem: Find next greater element for each element in array
 * Approach: Use stack to keep track of elements waiting for next greater
 * Time Complexity: O(n) where n is array length
 * Space Complexity: O(n) for stack
 */
function nextGreaterElement(arr) {
    const result = new Array(arr.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < arr.length; i++) {
        while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
            const index = stack.pop();
            result[index] = arr[i];
        }
        stack.push(i);
    }
    
    return result;
}

// Test Case for Next Greater Element
console.log("\n=== Next Greater Element Test ===");
console.log("Next greater for [4,5,2,25]:", nextGreaterElement([4, 5, 2, 25])); // [5, 25, 25, -1]
console.log("Next greater for [13,7,6,12]:", nextGreaterElement([13, 7, 6, 12])); // [-1, 12, 12, -1]

// 10. The Celebrity Problem
/**
 * Problem: Find the celebrity in a party (knows everyone, no one knows them)
 * Approach: Use stack to eliminate non-celebrities
 * Time Complexity: O(n) where n is number of people
 * Space Complexity: O(n) for stack
 */
function findCelebrity(knows) {
    const n = knows.length;
    const stack = [];
    
    // Push all people to stack
    for (let i = 0; i < n; i++) {
        stack.push(i);
    }
    
    // Eliminate non-celebrities
    while (stack.length > 1) {
        const a = stack.pop();
        const b = stack.pop();
        
        if (knows[a][b]) {
            // a knows b, so a is not celebrity
            stack.push(b);
        } else {
            // a doesn't know b, so b is not celebrity
            stack.push(a);
        }
    }
    
    const candidate = stack.pop();
    
    // Verify the candidate
    for (let i = 0; i < n; i++) {
        if (i !== candidate) {
            if (knows[candidate][i] || !knows[i][candidate]) {
                return -1; // No celebrity
            }
        }
    }
    
    return candidate;
}

// Test Case for Celebrity Problem
console.log("\n=== Celebrity Problem Test ===");
const knowsMatrix = [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0]
];
console.log("Celebrity is person:", findCelebrity(knowsMatrix)); // 2

// 11. Arithmetic Expression Evaluation
/**
 * Problem: Evaluate arithmetic expression with +, -, *, /
 * Approach: Use two stacks for operands and operators
 * Time Complexity: O(n) where n is expression length
 * Space Complexity: O(n) for stacks
 */
function evaluateExpression(expression) {
    const values = [];
    const operators = [];
    
    const precedence = {'+': 1, '-': 1, '*': 2, '/': 2};
    
    const applyOperator = (op, b, a) => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return Math.floor(a / b);
        }
    };
    
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        
        if (char === ' ') continue;
        
        if (!isNaN(char)) {
            let num = 0;
            while (i < expression.length && !isNaN(expression[i])) {
                num = num * 10 + parseInt(expression[i]);
                i++;
            }
            i--; // Adjust for loop increment
            values.push(num);
        } else if (char === '(') {
            operators.push(char);
        } else if (char === ')') {
            while (operators[operators.length - 1] !== '(') {
                values.push(applyOperator(operators.pop(), values.pop(), values.pop()));
            }
            operators.pop(); // Remove '('
        } else if (['+', '-', '*', '/'].includes(char)) {
            while (operators.length > 0 && 
                   operators[operators.length - 1] !== '(' &&
                   precedence[operators[operators.length - 1]] >= precedence[char]) {
                values.push(applyOperator(operators.pop(), values.pop(), values.pop()));
            }
            operators.push(char);
        }
    }
    
    while (operators.length > 0) {
        values.push(applyOperator(operators.pop(), values.pop(), values.pop()));
    }
    
    return values[0];
}

// Test Case for Expression Evaluation
console.log("\n=== Arithmetic Expression Evaluation Test ===");
console.log("10 + 2 * 6 =", evaluateExpression("10 + 2 * 6")); // 22
console.log("100 * 2 + 12 =", evaluateExpression("100 * 2 + 12")); // 212

// 12. Evaluation of Postfix Expression
/**
 * Problem: Evaluate postfix expression
 * Approach: Use stack to process operands and operators
 * Time Complexity: O(n) where n is expression length
 * Space Complexity: O(n) for stack
 */
function evaluatePostfix(expression) {
    const stack = [];
    const tokens = expression.split(' ');
    
    for (let token of tokens) {
        if (!isNaN(token)) {
            stack.push(parseInt(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(Math.floor(a / b));
                    break;
            }
        }
    }
    
    return stack[0];
}

// Test Case for Postfix Evaluation
console.log("\n=== Postfix Expression Evaluation Test ===");
console.log("2 3 1 * + 9 - =", evaluatePostfix("2 3 1 * + 9 -")); // -4
console.log("15 7 1 1 + - / 3 * 2 1 1 + + - =", evaluatePostfix("15 7 1 1 + - / 3 * 2 1 1 + + -")); // 5

// 13. Insert element at bottom of stack without using other data structure
/**
 * Problem: Insert element at bottom of stack using recursion
 * Approach: Use recursion to reach bottom and insert
 * Time Complexity: O(n) where n is number of elements
 * Space Complexity: O(n) for recursion stack
 */
function insertAtBottom(stack, item) {
    if (stack.length === 0) {
        stack.push(item);
        return;
    }
    
    const temp = stack.pop();
    insertAtBottom(stack, item);
    stack.push(temp);
}

// Test Case for Insert at Bottom
console.log("\n=== Insert at Bottom Test ===");
const testStack = [1, 2, 3, 4];
insertAtBottom(testStack, 0);
console.log("Stack after inserting 0 at bottom:", testStack); // [0, 1, 2, 3, 4]

// 14. Reverse a stack using recursion
/**
 * Problem: Reverse stack using only recursion
 * Approach: Use recursion and insertAtBottom function
 * Time Complexity: O(n²) where n is number of elements
 * Space Complexity: O(n) for recursion stack
 */
function reverseStack(stack) {
    if (stack.length <= 1) return;
    
    const temp = stack.pop();
    reverseStack(stack);
    insertAtBottom(stack, temp);
}

// Test Case for Reverse Stack
console.log("\n=== Reverse Stack Test ===");
const reverseTestStack = [1, 2, 3, 4, 5];
console.log("Original stack:", [...reverseTestStack]);
reverseStack(reverseTestStack);
console.log("Reversed stack:", reverseTestStack); // [5, 4, 3, 2, 1]

// 15. Sort a Stack using recursion
/**
 * Problem: Sort stack using recursion
 * Approach: Use recursion and insert in sorted order
 * Time Complexity: O(n²) where n is number of elements
 * Space Complexity: O(n) for recursion stack
 */
function sortedInsert(stack, item) {
    if (stack.length === 0 || stack[stack.length - 1] <= item) {
        stack.push(item);
        return;
    }
    
    const temp = stack.pop();
    sortedInsert(stack, item);
    stack.push(temp);
}

function sortStack(stack) {
    if (stack.length <= 1) return;
    
    const temp = stack.pop();
    sortStack(stack);
    sortedInsert(stack, temp);
}

// Test Case for Sort Stack
console.log("\n=== Sort Stack Test ===");
const sortTestStack = [34, 3, 31, 98, 92, 23];
console.log("Original stack:", [...sortTestStack]);
sortStack(sortTestStack);
console.log("Sorted stack:", sortTestStack); // [3, 23, 31, 34, 92, 98]

// 16. Merge Overlapping Intervals
/**
 * Problem: Merge overlapping intervals
 * Approach: Sort intervals and use stack to merge
 * Time Complexity: O(n log n) for sorting
 * Space Complexity: O(n) for result
 */
function mergeIntervals(intervals) {
    if (intervals.length <= 1) return intervals;
    
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = merged[merged.length - 1];
        
        if (current[0] <= lastMerged[1]) {
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            merged.push(current);
        }
    }
    
    return merged;
}

// Test Case for Merge Intervals
console.log("\n=== Merge Overlapping Intervals Test ===");
const intervals = [[1,3], [2,6], [8,10], [15,18]];
console.log("Merged intervals:", mergeIntervals(intervals)); // [[1,6], [8,10], [15,18]]

// 17. Largest Rectangular Area in Histogram
/**
 * Problem: Find largest rectangular area in histogram
 * Approach: Use stack to find previous and next smaller elements
 * Time Complexity: O(n) where n is number of bars
 * Space Complexity: O(n) for stack
 */
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    let index = 0;
    
    while (index < heights.length) {
        if (stack.length === 0 || heights[index] >= heights[stack[stack.length - 1]]) {
            stack.push(index++);
        } else {
            const topIndex = stack.pop();
            const area = heights[topIndex] * (stack.length === 0 ? index : index - stack[stack.length - 1] - 1);
            maxArea = Math.max(maxArea, area);
        }
    }
    
    while (stack.length > 0) {
        const topIndex = stack.pop();
        const area = heights[topIndex] * (stack.length === 0 ? index : index - stack[stack.length - 1] - 1);
        maxArea = Math.max(maxArea, area);
    }
    
    return maxArea;
}

// Test Case for Largest Rectangle in Histogram
console.log("\n=== Largest Rectangle in Histogram Test ===");
const heights = [6, 2, 5, 4, 5, 1, 6];
console.log("Largest rectangle area:", largestRectangleArea(heights)); // 12

// 18. Length of the Longest Valid Substring
/**
 * Problem: Find length of longest valid parentheses substring
 * Approach: Use stack to track indices
 * Time Complexity: O(n) where n is string length
 * Space Complexity: O(n) for stack
 */
function longestValidParentheses(s) {
    const stack = [-1];
    let maxLen = 0;
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i);
            } else {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
            }
        }
    }
    
    return maxLen;
}

// Test Case for Longest Valid Parentheses
console.log("\n=== Longest Valid Parentheses Test ===");
console.log("Longest valid in '(()':", longestValidParentheses("(()")); // 2
console.log("Longest valid in ')()())':", longestValidParentheses(")()())")); // 4

// 19. Expression contains redundant bracket or not
/**
 * Problem: Check if expression has redundant brackets
 * Approach: Use stack to check for redundant brackets
 * Time Complexity: O(n) where n is expression length
 * Space Complexity: O(n) for stack
 */
function hasRedundantBrackets(expression) {
    const stack = [];
    
    for (let char of expression) {
        if (char === ')') {
            let hasOperator = false;
            
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                const top = stack.pop();
                if (['+', '-', '*', '/'].includes(top)) {
                    hasOperator = true;
                }
            }
            
            if (stack.length > 0) stack.pop(); // Remove '('
            
            if (!hasOperator) return true; // Redundant brackets found
        } else {
            stack.push(char);
        }
    }
    
    return false;
}

// Test Case for Redundant Brackets
console.log("\n=== Redundant Brackets Test ===");
console.log("'((a+b))' has redundant brackets:", hasRedundantBrackets("((a+b))")); // true
console.log("'(a+b)' has redundant brackets:", hasRedundantBrackets("(a+b)")); // false

// 20. Implement Stack using Queue
/**
 * Problem: Implement stack using queue operations
 * Approach: Use two queues or make push operation costly
 * Time Complexity: O(n) for push, O(1) for pop
 * Space Complexity: O(n) for queue storage
 */
class StackUsingQueue {
    constructor() {
        this.queue1 = [];
        this.queue2 = [];
    }
    
    push(x) {
        this.queue2.push(x);
        while (this.queue1.length > 0) {
            this.queue2.push(this.queue1.shift());
        }
        [this.queue1, this.queue2] = [this.queue2, this.queue1];
    }
    
    pop() {
        return this.queue1.shift();
    }
    
    top() {
        return this.queue1[0];
    }
    
    empty() {
        return this.queue1.length === 0;
    }
}

// Test Case for Stack using Queue
console.log("\n=== Stack using Queue Test ===");
const stackFromQueue = new StackUsingQueue();
stackFromQueue.push(1);
stackFromQueue.push(2);
stackFromQueue.push(3);
console.log("Top:", stackFromQueue.top()); // 3
console.log("Pop:", stackFromQueue.pop()); // 3
console.log("Top after pop:", stackFromQueue.top()); // 2

// 21. Implement Queue using Stack
/**
 * Problem: Implement queue using stack operations
 * Approach: Use two stacks - one for enqueue, one for dequeue
 * Time Complexity: O(1) amortized for both operations
 * Space Complexity: O(n) for stack storage
 */
class QueueUsingStack {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }
    
    enqueue(x) {
        this.stack1.push(x);
    }
    
    dequeue() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2.pop();
    }
    
    peek() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2[this.stack2.length - 1];
    }
    
    empty() {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}

// Test Case for Queue using Stack
console.log("\n=== Queue using Stack Test ===");
const queueFromStack = new QueueUsingStack();
queueFromStack.enqueue(1);
queueFromStack.enqueue(2);
queueFromStack.enqueue(3);
console.log("Peek:", queueFromStack.peek()); // 1
console.log("Dequeue:", queueFromStack.dequeue()); // 1
console.log("Peek after dequeue:", queueFromStack.peek()); // 2

// 22. Implement "n" queue in an array
/**
 * Problem: Implement multiple queues in a single array
 * Approach: Divide array into segments for each queue
 * Time Complexity: O(1) for enqueue/dequeue operations
 * Space Complexity: O(n) where n is array size
 */
class NQueues {
    constructor(numberOfQueues, arraySize) {
        this.numberOfQueues = numberOfQueues;
        this.arraySize = arraySize;
        this.arr = new Array(arraySize);
        this.queueSize = Math.floor(arraySize / numberOfQueues);
        this.front = new Array(numberOfQueues);
        this.rear = new Array(numberOfQueues);
        
        for (let i = 0; i < numberOfQueues; i++) {
            this.front[i] = -1;
            this.rear[i] = -1;
        }
    }
    
    enqueue(queueNumber, value) {
        const queueNum = queueNumber - 1; // 0-indexed
        const startIndex = queueNum * this.queueSize;
        const endIndex = startIndex + this.queueSize - 1;
        
        if (this.rear[queueNum] === endIndex) {
            throw new Error(`Queue ${queueNumber} is full`);
        }
        
        if (this.front[queueNum] === -1) {
            this.front[queueNum] = startIndex;
            this.rear[queueNum] = startIndex;
        } else {
            this.rear[queueNum]++;
        }
        
        this.arr[this.rear[queueNum]] = value;
    }
    
    dequeue(queueNumber) {
        const queueNum = queueNumber - 1; // 0-indexed
        
        if (this.front[queueNum] === -1) {
            throw new Error(`Queue ${queueNumber} is empty`);
        }
        
        const value = this.arr[this.front[queueNum]];
        
        if (this.front[queueNum] === this.rear[queueNum]) {
            this.front[queueNum] = -1;
            this.rear[queueNum] = -1;
        } else {
            this.front[queueNum]++;
        }
        
        return value;
    }
    
    isEmpty(queueNumber) {
        return this.front[queueNumber - 1] === -1;
    }
}

// Test Case for N Queues
console.log("\n=== N Queues in Array Test ===");
const nQueues = new NQueues(3, 12);
nQueues.enqueue(1, 10);
nQueues.enqueue(1, 20);
nQueues.enqueue(2, 30);
nQueues.enqueue(3, 40);
console.log("Dequeue from queue 1:", nQueues.dequeue(1)); // 10
console.log("Dequeue from queue 2:", nQueues.dequeue(2)); // 30

// 23. Implement a Circular Queue
/**
 * Problem: Implement circular queue with fixed size
 * Approach: Use modular arithmetic for circular indexing
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is queue size
 */
class CircularQueue {
    constructor(size) {
        this.size = size;
        this.queue = new Array(size);
        this.front = -1;
        this.rear = -1;
        this.count = 0;
    }
    
    enqueue(value) {
        if (this.isFull()) {
            throw new Error("Queue is full");
        }
        
        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
        } else {
            this.rear = (this.rear + 1) % this.size;
        }
        
        this.queue[this.rear] = value;
        this.count++;
    }
    
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        
        const value = this.queue[this.front];
        
        if (this.count === 1) {
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.size;
        }
        
        this.count--;
        return value;
    }
    
    peek() {
        if (this.isEmpty()) return null;
        return this.queue[this.front];
    }
    
    isEmpty() {
        return this.count === 0;
    }
    
    isFull() {
        return this.count === this.size;
    }
    
    getSize() {
        return this.count;
    }
}

// Test Case for Circular Queue
console.log("\n=== Circular Queue Test ===");
const circularQueue = new CircularQueue(5);
circularQueue.enqueue(1);
circularQueue.enqueue(2);
circularQueue.enqueue(3);
console.log("Dequeue:", circularQueue.dequeue()); // 1
console.log("Peek:", circularQueue.peek()); // 2
console.log("Size:", circularQueue.getSize()); // 2

// 24. LRU Cache Implementation
/**
 * Problem: Implement LRU (Least Recently Used) cache
 * Approach: Use doubly linked list + hash map
 * Time Complexity: O(1) for get and put operations
 * Space Complexity: O(capacity)
 */
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    
    get(key) {
        if (this.cache.has(key)) {
            const value = this.cache.get(key);
            // Move to end (most recently used)
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return -1;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Remove least recently used (first item)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}

// Test Case for LRU Cache
console.log("\n=== LRU Cache Test ===");
const lruCache = new LRUCache(2);
lruCache.put(1, 1);
lruCache.put(2, 2);
console.log("Get 1:", lruCache.get(1)); // 1
lruCache.put(3, 3); // Evicts key 2
console.log("Get 2:", lruCache.get(2)); // -1 (not found)
console.log("Get 3:", lruCache.get(3)); // 3

// 25. Reverse a Queue using recursion
/**
 * Problem: Reverse queue using recursion
 * Approach: Use recursion to reverse queue elements
 * Time Complexity: O(n) where n is queue size
 * Space Complexity: O(n) for recursion stack
 */
function reverseQueue(queue) {
    if (queue.length === 0) return;
    
    const front = queue.shift();
    reverseQueue(queue);
    queue.push(front);
}

// Test Case for Reverse Queue
console.log("\n=== Reverse Queue Test ===");
const testQueue = [1, 2, 3, 4, 5];
console.log("Original queue:", [...testQueue]);
reverseQueue(testQueue);
console.log("Reversed queue:", testQueue); // [5, 4, 3, 2, 1]

// 26. Reverse the first "K" elements of a queue
/**
 * Problem: Reverse first K elements of queue
 * Approach: Use stack to reverse first K elements
 * Time Complexity: O(n) where n is queue size
 * Space Complexity: O(k) for stack
 */
function reverseFirstK(queue, k) {
    if (k <= 0 || k > queue.length) return queue;
    
    const stack = [];
    
    // Push first k elements to stack
    for (let i = 0; i < k; i++) {
        stack.push(queue.shift());
    }
    
    // Pop from stack and add to queue
    while (stack.length > 0) {
        queue.push(stack.pop());
    }
    
    // Move remaining elements to back
    for (let i = 0; i < queue.length - k; i++) {
        queue.push(queue.shift());
    }
    
    return queue;
}

// Test Case for Reverse First K
console.log("\n=== Reverse First K Elements Test ===");
const kQueue = [1, 2, 3, 4, 5, 6, 7, 8];
console.log("Original queue:", [...kQueue]);
reverseFirstK(kQueue, 3);
console.log("After reversing first 3:", kQueue); // [3, 2, 1, 4, 5, 6, 7, 8]

// 27. Interleave the first half of the queue with second half
/**
 * Problem: Interleave first and second half of queue
 * Approach: Use auxiliary queue to separate halves
 * Time Complexity: O(n) where n is queue size
 * Space Complexity: O(n/2) for auxiliary queue
 */
function interleaveQueue(queue) {
    if (queue.length % 2 !== 0) return queue;
    
    const n = queue.length;
    const halfSize = n / 2;
    const auxQueue = [];
    
    // Move first half to auxiliary queue
    for (let i = 0; i < halfSize; i++) {
        auxQueue.push(queue.shift());
    }
    
    // Interleave elements
    const result = [];
    while (auxQueue.length > 0 && queue.length > 0) {
        result.push(auxQueue.shift());
        result.push(queue.shift());
    }
    
    return result;
}

// Test Case for Interleave Queue
console.log("\n=== Interleave Queue Test ===");
const interleaveTestQueue = [1, 2, 3, 4, 5, 6, 7, 8];
console.log("Original queue:", [...interleaveTestQueue]);
const interleaved = interleaveQueue([...interleaveTestQueue]);
console.log("Interleaved queue:", interleaved); // [1, 5, 2, 6, 3, 7, 4, 8]

// 28. Find the first circular tour that visits all Petrol Pumps
/**
 * Problem: Find starting petrol pump for circular tour
 * Approach: Use queue-like approach with running sum
 * Time Complexity: O(n) where n is number of pumps
 * Space Complexity: O(1)
 */
function firstCircularTour(petrolPumps) {
    let totalPetrol = 0;
    let totalDistance = 0;
    let currentPetrol = 0;
    let start = 0;
    
    for (let i = 0; i < petrolPumps.length; i++) {
        const [petrol, distance] = petrolPumps[i];
        
        totalPetrol += petrol;
        totalDistance += distance;
        currentPetrol += petrol - distance;
        
        if (currentPetrol < 0) {
            start = i + 1;
            currentPetrol = 0;
        }
    }
    
    return totalPetrol >= totalDistance ? start : -1;
}

// Test Case for Circular Tour
console.log("\n=== Circular Tour Test ===");
const petrolPumps = [[6, 4], [3, 6], [7, 3]];
console.log("Starting pump index:", firstCircularTour(petrolPumps)); // 2

// 29. Minimum time required to rot all oranges
/**
 * Problem: Find minimum time to rot all oranges using BFS
 * Approach: Use queue for BFS traversal
 * Time Complexity: O(m*n) where m,n are grid dimensions
 * Space Complexity: O(m*n) for queue
 */
function orangesRotting(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let freshOranges = 0;
    
    // Find all rotten oranges and count fresh ones
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j, 0]); // row, col, time
            } else if (grid[i][j] === 1) {
                freshOranges++;
            }
        }
    }
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let maxTime = 0;
    
    while (queue.length > 0) {
        const [row, col, time] = queue.shift();
        maxTime = Math.max(maxTime, time);
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= 0 && newRow < rows && 
                newCol >= 0 && newCol < cols && 
                grid[newRow][newCol] === 1) {
                
                grid[newRow][newCol] = 2;
                freshOranges--;
                queue.push([newRow, newCol, time + 1]);
            }
        }
    }
    
    return freshOranges === 0 ? maxTime : -1;
}

// Test Case for Rotting Oranges
console.log("\n=== Rotting Oranges Test ===");
const orangeGrid = [
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1]
];
console.log("Time to rot all oranges:", orangesRotting(orangeGrid)); // 4

// 30. Distance of nearest cell having 1 in a binary matrix
/**
 * Problem: Find distance to nearest 1 for each cell
 * Approach: Use BFS with queue
 * Time Complexity: O(m*n) where m,n are matrix dimensions
 * Space Complexity: O(m*n) for queue and result
 */
function nearestDistance(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = Array(rows).fill().map(() => Array(cols).fill(Infinity));
    const queue = [];
    
    // Add all 1s to queue with distance 0
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 1) {
                result[i][j] = 0;
                queue.push([i, j]);
            }
        }
    }
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    while (queue.length > 0) {
        const [row, col] = queue.shift();
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= 0 && newRow < rows && 
                newCol >= 0 && newCol < cols && 
                result[newRow][newCol] > result[row][col] + 1) {
                
                result[newRow][newCol] = result[row][col] + 1;
                queue.push([newRow, newCol]);
            }
        }
    }
    
    return result;
}

// Test Case for Nearest Distance
console.log("\n=== Nearest Distance Test ===");
const binaryMatrix = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
];
console.log("Distance matrix:", nearestDistance(binaryMatrix));

// 31. First negative integer in every window of size "k"
/**
 * Problem: Find first negative number in each sliding window
 * Approach: Use deque to maintain negative numbers
 * Time Complexity: O(n) where n is array length
 * Space Complexity: O(k) for deque
 */
function firstNegativeInWindow(arr, k) {
    const result = [];
    const deque = [];
    
    // Process first window
    for (let i = 0; i < k; i++) {
        if (arr[i] < 0) {
            deque.push(i);
        }
    }
    
    // First window result
    result.push(deque.length > 0 ? arr[deque[0]] : 0);
    
    // Process remaining windows
    for (let i = k; i < arr.length; i++) {
        // Remove elements outside current window
        while (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }
        
        // Add current element if negative
        if (arr[i] < 0) {
            deque.push(i);
        }
        
        // Add result for current window
        result.push(deque.length > 0 ? arr[deque[0]] : 0);
    }
    
    return result;
}

// Test Case for First Negative in Window
console.log("\n=== First Negative in Window Test ===");
const negativeArray = [12, -1, -7, 8, -15, 30, 16, 28];
console.log("First negative in windows of size 3:", firstNegativeInWindow(negativeArray, 3));
// [-1, -1, -7, -15, -15, 0]

// 32. Sum of minimum and maximum elements of all subarrays of size "k"
/**
 * Problem: Find sum of min and max elements in all subarrays of size k
 * Approach: Use deque to maintain min and max elements
 * Time Complexity: O(n) where n is array length
 * Space Complexity: O(k) for deques
 */
function sumOfMinMax(arr, k) {
    const minDeque = [];
    const maxDeque = [];
    let sum = 0;
    
    // Process first window
    for (let i = 0; i < k; i++) {
        // Remove elements greater than current (for min deque)
        while (minDeque.length > 0 && arr[minDeque[minDeque.length - 1]] >= arr[i]) {
            minDeque.pop();
        }
        
        // Remove elements smaller than current (for max deque)
        while (maxDeque.length > 0 && arr[maxDeque[maxDeque.length - 1]] <= arr[i]) {
            maxDeque.pop();
        }
        
        minDeque.push(i);
        maxDeque.push(i);
    }
    
    // Add sum for first window
    sum += arr[minDeque[0]] + arr[maxDeque[0]];
    
    // Process remaining windows
    for (let i = k; i < arr.length; i++) {
        // Remove elements outside current window
        while (minDeque.length > 0 && minDeque[0] <= i - k) {
            minDeque.shift();
        }
        while (maxDeque.length > 0 && maxDeque[0] <= i - k) {
            maxDeque.shift();
        }
        
        // Remove elements greater than current (for min deque)
        while (minDeque.length > 0 && arr[minDeque[minDeque.length - 1]] >= arr[i]) {
            minDeque.pop();
        }
        
        // Remove elements smaller than current (for max deque)
        while (maxDeque.length > 0 && arr[maxDeque[maxDeque.length - 1]] <= arr[i]) {
            maxDeque.pop();
        }
        
        minDeque.push(i);
        maxDeque.push(i);
        
        // Add sum for current window
        sum += arr[minDeque[0]] + arr[maxDeque[0]];
    }
    
    return sum;
}

// Test Case for Sum of Min Max
console.log("\n=== Sum of Min Max Test ===");
const minMaxArray = [2, 5, -1, 7, -3, -1, -2];
console.log("Sum of min and max in windows of size 3:", sumOfMinMax(minMaxArray, 3)); // 18

// 33. Next Smaller Element
/**
 * Problem: Find next smaller element for each element in array
 * Approach: Use stack to find next smaller elements
 * Time Complexity: O(n) where n is array length
 * Space Complexity: O(n) for stack
 */
function nextSmallerElement(arr) {
    const result = new Array(arr.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < arr.length; i++) {
        while (stack.length > 0 && arr[i] < arr[stack[stack.length - 1]]) {
            const index = stack.pop();
            result[index] = arr[i];
        }
        stack.push(i);
    }
    
    return result;
}

// Test Case for Next Smaller Element
console.log("\n=== Next Smaller Element Test ===");
const smallerArray = [4, 5, 2, 25, 7, 8];
console.log("Next smaller elements:", nextSmallerElement(smallerArray)); // [2, 2, -1, 7, -1, -1]

console.log("\n=== ALL TESTS COMPLETED ===");



// ===================================================================================================
// Problem 1: Implement Stack using Deque
// ===================================================================================================

/*
Question: Implement a stack using deque (double-ended queue) operations.
A deque supports insertion and deletion at both ends.

Approach:
- Use deque operations to simulate stack behavior (LIFO - Last In First Out)
- For stack operations:
  * push() -> add element to rear of deque
  * pop() -> remove element from rear of deque
  * top() -> get element from rear of deque
  * isEmpty() -> check if deque is empty

Time Complexity: O(1) for all operations
Space Complexity: O(n) where n is number of elements
*/

class StackUsingDeque {
    constructor() {
        this.deque = [];
    }
    
    // Push element to stack (add to rear of deque)
    push(element) {
        this.deque.push(element);
    }
    
    // Pop element from stack (remove from rear of deque)
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.deque.pop();
    }
    
    // Get top element (peek at rear of deque)
    top() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.deque[this.deque.length - 1];
    }
    
    // Check if stack is empty
    isEmpty() {
        return this.deque.length === 0;
    }
    
    // Get size of stack
    size() {
        return this.deque.length;
    }
}

// Test Case for Problem 1
console.log("=== Problem 1 Test Cases ===");
const stack1 = new StackUsingDeque();
stack.push(10);
stack.push(20);
stack.push(30);
console.log("Top element:", stack1.top()); // 30
console.log("Popped:", stack1.pop()); // 30
console.log("Top after pop:", stack1.top()); // 20
console.log("Stack size:", stack1.size()); // 2
console.log("Is empty:", stack1.isEmpty()); // false

// ===================================================================================================
// Problem 2: Stack Permutations (Check if an array is stack permutation of other)
// ===================================================================================================

/*
Question: Given two arrays, check if one array is a stack permutation of another.
A stack permutation means we can obtain the second array from the first by using
push and pop operations on a stack.

Approach:
- Use a stack to simulate the process
- For each element in the target array:
  * If stack is not empty and top equals current target element, pop from stack
  * Otherwise, push elements from input array until we find the target element
  * If we can't find the target element, return false

Time Complexity: O(n) where n is length of arrays
Space Complexity: O(n) for the stack
*/

function isStackPermutation(input, output) {
    if (input.length !== output.length) return false;
    
    const stack = [];
    let inputIndex = 0;
    let outputIndex = 0;
    
    while (outputIndex < output.length) {
        // If stack top matches current output element, pop it
        if (stack.length > 0 && stack[stack.length - 1] === output[outputIndex]) {
            stack.pop();
            outputIndex++;
        }
        // Push elements from input until we find the required element
        else if (inputIndex < input.length) {
            stack.push(input[inputIndex]);
            inputIndex++;
        }
        // If we can't proceed further, it's not a valid permutation
        else {
            return false;
        }
    }
    
    return true;
}

// Test Cases for Problem 2
console.log("\n=== Problem 2 Test Cases ===");
console.log("Test 1:", isStackPermutation([1, 2, 3], [2, 1, 3])); // true
console.log("Test 2:", isStackPermutation([1, 2, 3], [3, 1, 2])); // false
console.log("Test 3:", isStackPermutation([1, 2, 3, 4], [4, 3, 2, 1])); // true
console.log("Test 4:", isStackPermutation([1, 2, 3], [3, 2, 1])); // true

// ===================================================================================================
// Problem 3: Check if all levels of two trees are anagrams or not
// ===================================================================================================

/*
Question: Given two binary trees, check if all corresponding levels are anagrams.
Two levels are anagrams if they contain the same elements with same frequency.

Approach:
- Use level-order traversal (BFS) for both trees simultaneously
- For each level, collect all node values
- Check if the values at each level form anagrams
- Continue until both trees are completely traversed

Time Complexity: O(n) where n is total number of nodes
Space Complexity: O(w) where w is maximum width of tree
*/

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function areAnagrams(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    
    const freq1 = {};
    const freq2 = {};
    
    // Count frequency in first array
    for (let val of arr1) {
        freq1[val] = (freq1[val] || 0) + 1;
    }
    
    // Count frequency in second array
    for (let val of arr2) {
        freq2[val] = (freq2[val] || 0) + 1;
    }
    
    // Compare frequencies
    for (let key in freq1) {
        if (freq1[key] !== freq2[key]) return false;
    }
    
    return Object.keys(freq1).length === Object.keys(freq2).length;
}

function areTreeLevelsAnagrams(root1, root2) {
    if (!root1 && !root2) return true;
    if (!root1 || !root2) return false;
    
    const queue1 = [root1];
    const queue2 = [root2];
    
    while (queue1.length > 0 || queue2.length > 0) {
        const level1 = [];
        const level2 = [];
        const size1 = queue1.length;
        const size2 = queue2.length;
        
        // Process current level of tree1
        for (let i = 0; i < size1; i++) {
            const node = queue1.shift();
            level1.push(node.val);
            if (node.left) queue1.push(node.left);
            if (node.right) queue1.push(node.right);
        }
        
        // Process current level of tree2
        for (let i = 0; i < size2; i++) {
            const node = queue2.shift();
            level2.push(node.val);
            if (node.left) queue2.push(node.left);
            if (node.right) queue2.push(node.right);
        }
        
        // Check if current levels are anagrams
        if (!areAnagrams(level1, level2)) {
            return false;
        }
    }
    
    return true;
}

// Test Cases for Problem 3
console.log("\n=== Problem 3 Test Cases ===");
// Tree 1:     1        Tree 2:     1
//           /   \                /   \
//          2     3              3     2
//         / \   /              / \   /
//        4   5 6              6   4 5

const tree1 = new TreeNode(1);
tree1.left = new TreeNode(2);
tree1.right = new TreeNode(3);
tree1.left.left = new TreeNode(4);
tree1.left.right = new TreeNode(5);
tree1.right.left = new TreeNode(6);

const tree2 = new TreeNode(1);
tree2.left = new TreeNode(3);
tree2.right = new TreeNode(2);
tree2.left.left = new TreeNode(6);
tree2.left.right = new TreeNode(4);
tree2.right.left = new TreeNode(5);

console.log("Trees have anagram levels:", areTreeLevelsAnagrams(tree1, tree2)); // true

// ===================================================================================================
// Problem 4: Minimum sum of squares of character counts after removing "k" characters
// ===================================================================================================

/*
Question: Given a string, remove k characters such that the sum of squares of 
character frequencies is minimized.

Approach:
- Count frequency of each character
- Use a max heap (priority queue) to always remove from the character with highest frequency
- Remove k characters one by one from the character with maximum frequency
- Calculate sum of squares of remaining frequencies

Time Complexity: O(n + k*log(unique_chars)) where n is string length
Space Complexity: O(unique_chars) for frequency map and heap
*/

class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }
    
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
    
    heapifyUp(index) {
        if (index === 0) return;
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[parentIndex] < this.heap[index]) {
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            this.heapifyUp(parentIndex);
        }
    }
    
    heapifyDown(index) {
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        let largest = index;
        
        if (leftChild < this.heap.length && this.heap[leftChild] > this.heap[largest]) {
            largest = leftChild;
        }
        
        if (rightChild < this.heap.length && this.heap[rightChild] > this.heap[largest]) {
            largest = rightChild;
        }
        
        if (largest !== index) {
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            this.heapifyDown(largest);
        }
    }
    
    size() {
        return this.heap.length;
    }
}

function minSumSquares(str, k) {
    // Count character frequencies
    const freq = {};
    for (let char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    
    // Create max heap with frequencies
    const maxHeap = new MaxHeap();
    for (let count of Object.values(freq)) {
        maxHeap.push(count);
    }
    
    // Remove k characters by reducing max frequency each time
    for (let i = 0; i < k; i++) {
        const maxFreq = maxHeap.pop();
        if (maxFreq > 1) {
            maxHeap.push(maxFreq - 1);
        }
    }
    
    // Calculate sum of squares
    let sumSquares = 0;
    while (maxHeap.size() > 0) {
        const freq = maxHeap.pop();
        sumSquares += freq * freq;
    }
    
    return sumSquares;
}

// Test Cases for Problem 4
console.log("\n=== Problem 4 Test Cases ===");
console.log("Test 1:", minSumSquares("abccc", 1)); // 6 (remove one 'c': a=1, b=1, c=2; 1²+1²+2²=6)
console.log("Test 2:", minSumSquares("aaab", 2)); // 2 (remove two 'a': a=1, b=1; 1²+1²=2)
console.log("Test 3:", minSumSquares("aabcbc", 2)); // 6

// ===================================================================================================
// Problem 5: Queue based approach for first non-repeating character in a stream
// ===================================================================================================

/*
Question: Find the first non-repeating character in a stream of characters.
For each character addition, return the first non-repeating character.

Approach:
- Use a queue to maintain order of characters
- Use a frequency map to track character counts
- For each new character:
  * Add to frequency map
  * Add to queue if frequency is 1
  * Remove from front of queue all characters with frequency > 1
  * Return front of queue (first non-repeating character)

Time Complexity: O(1) amortized for each character addition
Space Complexity: O(n) for queue and frequency map
*/

class FirstNonRepeating {
    constructor() {
        this.queue = [];
        this.freq = {};
    }
    
    addCharacter(char) {
        // Update frequency
        this.freq[char] = (this.freq[char] || 0) + 1;
        
        // Add to queue if it's the first occurrence
        if (this.freq[char] === 1) {
            this.queue.push(char);
        }
        
        // Remove characters from front that have frequency > 1
        while (this.queue.length > 0 && this.freq[this.queue[0]] > 1) {
            this.queue.shift();
        }
        
        // Return first non-repeating character or null
        return this.queue.length > 0 ? this.queue[0] : null;
    }
    
    getFirstNonRepeating() {
        return this.queue.length > 0 ? this.queue[0] : null;
    }
}

// Alternative implementation that processes entire stream at once
function firstNonRepeatingInStream(stream) {
    const result = [];
    const fnr = new FirstNonRepeating();
    
    for (let char of stream) {
        const firstNonRep = fnr.addCharacter(char);
        result.push(firstNonRep || -1);
    }
    
    return result;
}

// Test Cases for Problem 5
console.log("\n=== Problem 5 Test Cases ===");
const fnr = new FirstNonRepeating();
console.log("Stream processing:");
console.log("Add 'a':", fnr.addCharacter('a')); // 'a'
console.log("Add 'b':", fnr.addCharacter('b')); // 'a'
console.log("Add 'a':", fnr.addCharacter('a')); // 'b'
console.log("Add 'c':", fnr.addCharacter('c')); // 'b'
console.log("Add 'b':", fnr.addCharacter('b')); // 'c'

console.log("\nStream result for 'aabacbcb':", firstNonRepeatingInStream('aabacbcb'));
// Expected: ['a', 'a', 'b', 'b', 'c', 'c', 'c', null]

console.log("\n=== All Problems Completed Successfully! ===");