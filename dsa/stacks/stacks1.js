// Stack class for our algorithms
class Stack {
    constructor() {
        this.items = [];
        this.count = 0;
    }

    push(element) {
        this.items[this.count] = element;
        this.count++;
    }

    pop() {
        if (this.isEmpty()) return undefined;
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }

    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[this.count - 1];
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }
}

// ====================================
// 1. BALANCED PARENTHESES / BRACKETS MATCHING
// ====================================

class BalancedParentheses {
    static isBalanced(expression) {
        const stack = new Stack();
        const pairs = {
            ')': '(',
            '}': '{',
            ']': '['
        };

        for (let char of expression) {
            // If opening bracket, push to stack
            if (char === '(' || char === '{' || char === '[') {
                stack.push(char);
            }
            // If closing bracket
            else if (char === ')' || char === '}' || char === ']') {
                // Check if stack is empty or doesn't match
                if (stack.isEmpty() || stack.pop() !== pairs[char]) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }

    static findUnbalanced(expression) {
        const stack = new Stack();
        const unbalanced = [];
        const pairs = { ')': '(', '}': '{', ']': '[' };

        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];
            
            if (char === '(' || char === '{' || char === '[') {
                stack.push({ char, index: i });
            }
            else if (char === ')' || char === '}' || char === ']') {
                if (stack.isEmpty() || stack.peek().char !== pairs[char]) {
                    unbalanced.push({ char, index: i, type: 'unmatched_closing' });
                } else {
                    stack.pop();
                }
            }
        }

        // Any remaining opening brackets are unmatched
        while (!stack.isEmpty()) {
            const item = stack.pop();
            unbalanced.push({ ...item, type: 'unmatched_opening' });
        }

        return unbalanced;
    }
}

// ====================================
// 2. INFIX, PREFIX, POSTFIX EXPRESSION EVALUATION AND CONVERSION
// ====================================

class ExpressionConverter {
    static getPrecedence(operator) {
        const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
        return precedence[operator] || 0;
    }

    static isOperator(char) {
        return ['+', '-', '*', '/', '^'].includes(char);
    }

    static isOperand(char) {
        return /[a-zA-Z0-9]/.test(char);
    }

    // Convert infix to postfix
    static infixToPostfix(infix) {
        const stack = new Stack();
        let postfix = '';

        for (let char of infix) {
            if (this.isOperand(char)) {
                postfix += char;
            }
            else if (char === '(') {
                stack.push(char);
            }
            else if (char === ')') {
                while (!stack.isEmpty() && stack.peek() !== '(') {
                    postfix += stack.pop();
                }
                stack.pop(); // Remove '('
            }
            else if (this.isOperator(char)) {
                while (!stack.isEmpty() && 
                       this.getPrecedence(stack.peek()) >= this.getPrecedence(char)) {
                    postfix += stack.pop();
                }
                stack.push(char);
            }
        }

        while (!stack.isEmpty()) {
            postfix += stack.pop();
        }

        return postfix;
    }

    // Convert infix to prefix
    static infixToPrefix(infix) {
        // Reverse the infix expression
        let reversed = infix.split('').reverse().join('');
        
        // Replace ( with ) and vice versa
        reversed = reversed.replace(/\(/g, 'temp').replace(/\)/g, '(').replace(/temp/g, ')');
        
        // Get postfix of modified expression
        let postfix = this.infixToPostfix(reversed);
        
        // Reverse the postfix to get prefix
        return postfix.split('').reverse().join('');
    }

    // Evaluate postfix expression
    static evaluatePostfix(postfix) {
        const stack = new Stack();

        for (let char of postfix) {
            if (/\d/.test(char)) {
                stack.push(parseInt(char));
            }
            else if (this.isOperator(char)) {
                const b = stack.pop();
                const a = stack.pop();
                
                switch (char) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/': stack.push(Math.floor(a / b)); break;
                    case '^': stack.push(Math.pow(a, b)); break;
                }
            }
        }

        return stack.pop();
    }

    // Evaluate prefix expression
    static evaluatePrefix(prefix) {
        const stack = new Stack();

        // Process from right to left
        for (let i = prefix.length - 1; i >= 0; i--) {
            const char = prefix[i];
            
            if (/\d/.test(char)) {
                stack.push(parseInt(char));
            }
            else if (this.isOperator(char)) {
                const a = stack.pop();
                const b = stack.pop();
                
                switch (char) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/': stack.push(Math.floor(a / b)); break;
                    case '^': stack.push(Math.pow(a, b)); break;
                }
            }
        }

        return stack.pop();
    }
}

// ====================================
// 3. NEXT GREATER/SMALLER ELEMENT
// ====================================

class NextElementFinder {
    // Find next greater element for each element
    static nextGreaterElements(arr) {
        const stack = new Stack();
        const result = new Array(arr.length).fill(-1);

        // Traverse from right to left
        for (let i = arr.length - 1; i >= 0; i--) {
            // Remove smaller elements from stack
            while (!stack.isEmpty() && stack.peek() <= arr[i]) {
                stack.pop();
            }

            // If stack not empty, top is next greater
            if (!stack.isEmpty()) {
                result[i] = stack.peek();
            }

            stack.push(arr[i]);
        }

        return result;
    }

    // Find next smaller element for each element
    static nextSmallerElements(arr) {
        const stack = new Stack();
        const result = new Array(arr.length).fill(-1);

        for (let i = arr.length - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() >= arr[i]) {
                stack.pop();
            }

            if (!stack.isEmpty()) {
                result[i] = stack.peek();
            }

            stack.push(arr[i]);
        }

        return result;
    }

    // Find previous greater element for each element
    static previousGreaterElements(arr) {
        const stack = new Stack();
        const result = new Array(arr.length).fill(-1);

        for (let i = 0; i < arr.length; i++) {
            while (!stack.isEmpty() && stack.peek() <= arr[i]) {
                stack.pop();
            }

            if (!stack.isEmpty()) {
                result[i] = stack.peek();
            }

            stack.push(arr[i]);
        }

        return result;
    }
}

// ====================================
// 4. LARGEST RECTANGLE IN HISTOGRAM
// ====================================

class HistogramRect {
    static largestRectangleArea(heights) {
        const stack = new Stack();
        let maxArea = 0;
        let index = 0;

        while (index < heights.length) {
            // If current bar is higher than stack top, push it
            if (stack.isEmpty() || heights[index] >= heights[stack.peek()]) {
                stack.push(index++);
            } else {
                // Calculate area with stack top as smallest bar
                const topIndex = stack.pop();
                const area = heights[topIndex] * 
                           (stack.isEmpty() ? index : index - stack.peek() - 1);
                maxArea = Math.max(maxArea, area);
            }
        }

        // Calculate area for remaining bars in stack
        while (!stack.isEmpty()) {
            const topIndex = stack.pop();
            const area = heights[topIndex] * 
                       (stack.isEmpty() ? index : index - stack.peek() - 1);
            maxArea = Math.max(maxArea, area);
        }

        return maxArea;
    }

    // Get the coordinates of the largest rectangle
    static largestRectangleDetails(heights) {
        const stack = new Stack();
        let maxArea = 0;
        let bestRect = { area: 0, left: 0, right: 0, height: 0 };
        let index = 0;

        while (index < heights.length) {
            if (stack.isEmpty() || heights[index] >= heights[stack.peek()]) {
                stack.push(index++);
            } else {
                const topIndex = stack.pop();
                const height = heights[topIndex];
                const width = stack.isEmpty() ? index : index - stack.peek() - 1;
                const area = height * width;
                
                if (area > maxArea) {
                    maxArea = area;
                    bestRect = {
                        area: area,
                        left: stack.isEmpty() ? 0 : stack.peek() + 1,
                        right: index - 1,
                        height: height
                    };
                }
            }
        }

        while (!stack.isEmpty()) {
            const topIndex = stack.pop();
            const height = heights[topIndex];
            const width = stack.isEmpty() ? index : index - stack.peek() - 1;
            const area = height * width;
            
            if (area > maxArea) {
                maxArea = area;
                bestRect = {
                    area: area,
                    left: stack.isEmpty() ? 0 : stack.peek() + 1,
                    right: index - 1,
                    height: height
                };
            }
        }

        return bestRect;
    }
}

// ====================================
// 5. FUNCTION CALL STACK / RECURSION SIMULATION
// ====================================

class RecursionSimulator {
    // Simulate factorial calculation iteratively using stack
    static factorial(n) {
        if (n <= 1) return 1;

        const stack = new Stack();
        stack.push({ value: n, result: null });
        let finalResult = 1;

        while (!stack.isEmpty()) {
            const current = stack.peek();
            
            if (current.value <= 1) {
                current.result = 1;
                stack.pop();
                if (!stack.isEmpty()) {
                    const parent = stack.peek();
                    if (parent.result === null) {
                        parent.result = parent.value * current.result;
                    }
                } else {
                    finalResult = current.result;
                }
            } else if (current.result === null) {
                stack.push({ value: current.value - 1, result: null });
            } else {
                stack.pop();
                if (!stack.isEmpty()) {
                    const parent = stack.peek();
                    if (parent.result === null) {
                        parent.result = parent.value * current.result;
                    }
                } else {
                    finalResult = current.result;
                }
            }
        }

        return finalResult;
    }

    // Simulate Fibonacci calculation iteratively
    static fibonacci(n) {
        if (n <= 1) return n;

        const stack = new Stack();
        const memo = {};
        stack.push({ value: n, state: 'initial' });

        while (!stack.isEmpty()) {
            const current = stack.peek();
            
            if (memo[current.value] !== undefined) {
                stack.pop();
                continue;
            }

            if (current.value <= 1) {
                memo[current.value] = current.value;
                stack.pop();
            } else if (current.state === 'initial') {
                current.state = 'waiting_first';
                stack.push({ value: current.value - 1, state: 'initial' });
            } else if (current.state === 'waiting_first') {
                current.state = 'waiting_second';
                stack.push({ value: current.value - 2, state: 'initial' });
            } else if (current.state === 'waiting_second') {
                memo[current.value] = memo[current.value - 1] + memo[current.value - 2];
                stack.pop();
            }
        }

        return memo[n];
    }
}

// ====================================
// 6. STOCK SPAN PROBLEM
// ====================================

class StockSpan {
    static calculateSpan(prices) {
        const stack = new Stack();
        const span = new Array(prices.length);

        for (let i = 0; i < prices.length; i++) {
            // Remove indices of prices smaller than current price
            while (!stack.isEmpty() && prices[stack.peek()] <= prices[i]) {
                stack.pop();
            }

            // If stack is empty, span is i+1, otherwise span is difference
            span[i] = stack.isEmpty() ? i + 1 : i - stack.peek();

            stack.push(i);
        }

        return span;
    }

    // Calculate span with detailed information
    static calculateSpanWithDetails(prices) {
        const stack = new Stack();
        const results = [];

        for (let i = 0; i < prices.length; i++) {
            let spanDays = [];
            
            // Collect all previous days with price <= current price
            let tempStack = [];
            while (!stack.isEmpty() && prices[stack.peek()] <= prices[i]) {
                tempStack.push(stack.pop());
            }

            const span = stack.isEmpty() ? i + 1 : i - stack.peek();
            
            results.push({
                day: i,
                price: prices[i],
                span: span,
                spanStart: stack.isEmpty() ? 0 : stack.peek() + 1
            });

            // Restore stack
            while (tempStack.length > 0) {
                stack.push(tempStack.pop());
            }
            
            // Remove elements again for next iteration
            while (!stack.isEmpty() && prices[stack.peek()] <= prices[i]) {
                stack.pop();
            }

            stack.push(i);
        }

        return results;
    }
}

// ====================================
// 7. SLIDING WINDOW MAXIMUM
// ====================================

class SlidingWindowMax {
    // Using deque simulation with stack-like operations
    static maxSlidingWindow(nums, k) {
        const deque = []; // Will store indices
        const result = [];

        for (let i = 0; i < nums.length; i++) {
            // Remove indices outside current window
            while (deque.length > 0 && deque[0] <= i - k) {
                deque.shift();
            }

            // Remove indices of smaller elements from rear
            while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
                deque.pop();
            }

            deque.push(i);

            // Add maximum to result if window is complete
            if (i >= k - 1) {
                result.push(nums[deque[0]]);
            }
        }

        return result;
    }

    // Alternative implementation using two stacks
    static maxSlidingWindowTwoStacks(nums, k) {
        const result = [];
        
        for (let i = 0; i <= nums.length - k; i++) {
            let max = nums[i];
            for (let j = i + 1; j < i + k; j++) {
                max = Math.max(max, nums[j]);
            }
            result.push(max);
        }

        return result;
    }

    // Get detailed sliding window information
    static slidingWindowDetails(nums, k) {
        const deque = [];
        const results = [];

        for (let i = 0; i < nums.length; i++) {
            while (deque.length > 0 && deque[0] <= i - k) {
                deque.shift();
            }

            while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
                deque.pop();
            }

            deque.push(i);

            if (i >= k - 1) {
                results.push({
                    windowStart: i - k + 1,
                    windowEnd: i,
                    window: nums.slice(i - k + 1, i + 1),
                    maximum: nums[deque[0]],
                    maxIndex: deque[0]
                });
            }
        }

        return results;
    }
}

// ====================================
// DEMONSTRATION AND TESTING
// ====================================

console.log('=== CLASSIC STACK ALGORITHMS DEMONSTRATION ===\n');

// 1. Balanced Parentheses
console.log('1. BALANCED PARENTHESES:');
console.log('"{[()]}" is balanced:', BalancedParentheses.isBalanced('{[()]}'));
console.log('"([)]" is balanced:', BalancedParentheses.isBalanced('([)]'));
console.log('Unbalanced in "([)]":', BalancedParentheses.findUnbalanced('([)]'));

// 2. Expression Conversion
console.log('\n2. EXPRESSION CONVERSION:');
const infix = 'A+B*C-D';
console.log('Infix:', infix);
console.log('Postfix:', ExpressionConverter.infixToPostfix(infix));
console.log('Prefix:', ExpressionConverter.infixToPrefix(infix));
console.log('Evaluate postfix "23*54*+": ', ExpressionConverter.evaluatePostfix('23*54*+'));

// 3. Next Greater Elements
console.log('\n3. NEXT GREATER ELEMENTS:');
const arr = [4, 5, 2, 25, 7, 8];
console.log('Array:', arr);
console.log('Next Greater:', NextElementFinder.nextGreaterElements(arr));
console.log('Next Smaller:', NextElementFinder.nextSmallerElements(arr));

// 4. Largest Rectangle in Histogram
console.log('\n4. LARGEST RECTANGLE IN HISTOGRAM:');
const heights = [6, 2, 5, 4, 5, 1, 6];
console.log('Heights:', heights);
console.log('Largest area:', HistogramRect.largestRectangleArea(heights));
console.log('Rectangle details:', HistogramRect.largestRectangleDetails(heights));

// 5. Recursion Simulation
console.log('\n5. RECURSION SIMULATION:');
console.log('Factorial of 5:', RecursionSimulator.factorial(5));
console.log('Fibonacci of 8:', RecursionSimulator.fibonacci(8));

// 6. Stock Span Problem
console.log('\n6. STOCK SPAN PROBLEM:');
const prices = [100, 80, 60, 70, 60, 75, 85];
console.log('Prices:', prices);
console.log('Spans:', StockSpan.calculateSpan(prices));
console.log('Detailed spans:', StockSpan.calculateSpanWithDetails(prices));

// 7. Sliding Window Maximum
console.log('\n7. SLIDING WINDOW MAXIMUM:');
const nums = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
console.log('Array:', nums);
console.log('Window size:', k);
console.log('Maximums:', SlidingWindowMax.maxSlidingWindow(nums, k));
console.log('Window details:', SlidingWindowMax.slidingWindowDetails(nums, k));