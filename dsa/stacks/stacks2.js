// Enhanced Stack class for real-world applications
class Stack {
    constructor() {
        this.items = [];
        this.count = 0;
    }

    push(element) {
        this.items[this.count] = element;
        this.count++;
        return this.count;
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

    clear() {
        this.items = [];
        this.count = 0;
    }

    toArray() {
        return this.items.slice(0, this.count);
    }
}

// ====================================
// 1. UNDO MECHANISM IN EDITORS
// ====================================

class TextEditor {
    constructor() {
        this.content = '';
        this.undoStack = new Stack();
        this.redoStack = new Stack();
        this.maxUndoHistory = 50;
    }

    // Execute a command and save it for undo
    executeCommand(command) {
        // Save current state before executing command
        const prevState = {
            content: this.content,
            timestamp: Date.now(),
            commandType: command.type
        };

        // Execute the command
        this.content = command.execute(this.content);

        // Push to undo stack
        this.undoStack.push(prevState);

        // Limit undo history
        if (this.undoStack.size() > this.maxUndoHistory) {
            // Remove oldest entry (this would require a more complex implementation)
        }

        // Clear redo stack when new command is executed
        this.redoStack.clear();

        return this.content;
    }

    undo() {
        if (this.undoStack.isEmpty()) {
            return { success: false, message: 'Nothing to undo' };
        }

        // Save current state to redo stack
        this.redoStack.push({
            content: this.content,
            timestamp: Date.now(),
            commandType: 'undo'
        });

        // Restore previous state
        const prevState = this.undoStack.pop();
        this.content = prevState.content;

        return {
            success: true,
            content: this.content,
            undoCommand: prevState.commandType
        };
    }

    redo() {
        if (this.redoStack.isEmpty()) {
            return { success: false, message: 'Nothing to redo' };
        }

        // Save current state to undo stack
        this.undoStack.push({
            content: this.content,
            timestamp: Date.now(),
            commandType: 'redo'
        });

        // Restore redo state
        const redoState = this.redoStack.pop();
        this.content = redoState.content;

        return {
            success: true,
            content: this.content
        };
    }

    getUndoHistory() {
        return this.undoStack.toArray().map(state => ({
            commandType: state.commandType,
            timestamp: new Date(state.timestamp).toLocaleTimeString()
        }));
    }
}

// Command classes for different editor operations
class InsertTextCommand {
    constructor(text, position = -1) {
        this.text = text;
        this.position = position;
        this.type = 'insert';
    }

    execute(content) {
        if (this.position === -1) {
            return content + this.text;
        }
        return content.slice(0, this.position) + this.text + content.slice(this.position);
    }
}

class DeleteTextCommand {
    constructor(startPos, length) {
        this.startPos = startPos;
        this.length = length;
        this.type = 'delete';
    }

    execute(content) {
        return content.slice(0, this.startPos) + content.slice(this.startPos + this.length);
    }
}

class ReplaceTextCommand {
    constructor(startPos, length, newText) {
        this.startPos = startPos;
        this.length = length;
        this.newText = newText;
        this.type = 'replace';
    }

    execute(content) {
        return content.slice(0, this.startPos) + this.newText + content.slice(this.startPos + this.length);
    }
}

// ====================================
// 2. BROWSER HISTORY NAVIGATION
// ====================================

class BrowserHistory {
    constructor() {
        this.backStack = new Stack();
        this.forwardStack = new Stack();
        this.currentPage = null;
        this.maxHistorySize = 100;
    }

    visit(url) {
        // If we have a current page, push it to back stack
        if (this.currentPage) {
            this.backStack.push({
                url: this.currentPage.url,
                title: this.currentPage.title,
                timestamp: this.currentPage.timestamp,
                scrollPosition: this.currentPage.scrollPosition
            });
        }

        // Set new current page
        this.currentPage = {
            url: url,
            title: this.extractTitle(url),
            timestamp: Date.now(),
            scrollPosition: 0
        };

        // Clear forward stack when visiting new page
        this.forwardStack.clear();

        // Limit history size
        if (this.backStack.size() > this.maxHistorySize) {
            // Would need to implement removal from bottom of stack
        }

        return this.currentPage;
    }

    goBack() {
        if (this.backStack.isEmpty()) {
            return { success: false, message: 'No pages in back history' };
        }

        // Push current page to forward stack
        if (this.currentPage) {
            this.forwardStack.push({
                url: this.currentPage.url,
                title: this.currentPage.title,
                timestamp: this.currentPage.timestamp,
                scrollPosition: this.currentPage.scrollPosition
            });
        }

        // Get previous page
        this.currentPage = this.backStack.pop();

        return {
            success: true,
            page: this.currentPage
        };
    }

    goForward() {
        if (this.forwardStack.isEmpty()) {
            return { success: false, message: 'No pages in forward history' };
        }

        // Push current page to back stack
        if (this.currentPage) {
            this.backStack.push({
                url: this.currentPage.url,
                title: this.currentPage.title,
                timestamp: this.currentPage.timestamp,
                scrollPosition: this.currentPage.scrollPosition
            });
        }

        // Get forward page
        this.currentPage = this.forwardStack.pop();

        return {
            success: true,
            page: this.currentPage
        };
    }

    getCurrentPage() {
        return this.currentPage;
    }

    getBackHistory() {
        return this.backStack.toArray().map(page => ({
            url: page.url,
            title: page.title,
            timestamp: new Date(page.timestamp).toLocaleString()
        }));
    }

    getForwardHistory() {
        return this.forwardStack.toArray().map(page => ({
            url: page.url,
            title: page.title,
            timestamp: new Date(page.timestamp).toLocaleString()
        }));
    }

    extractTitle(url) {
        // Simple title extraction from URL
        const parts = url.split('/').filter(part => part.length > 0);
        if (parts.length > 1) {
            return parts[parts.length - 1].replace(/[-_]/g, ' ').toUpperCase();
        }
        return url;
    }
}

// ====================================
// 3. EXPRESSION PARSING AND EVALUATION
// ====================================

class ExpressionParser {
    constructor() {
        this.operatorStack = new Stack();
        this.operandStack = new Stack();
        this.precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
    }

    // Tokenize expression into numbers and operators
    tokenize(expression) {
        const tokens = [];
        let currentNumber = '';

        for (let char of expression.replace(/\s/g, '')) {
            if (/\d|\./.test(char)) {
                currentNumber += char;
            } else {
                if (currentNumber) {
                    tokens.push(parseFloat(currentNumber));
                    currentNumber = '';
                }
                tokens.push(char);
            }
        }

        if (currentNumber) {
            tokens.push(parseFloat(currentNumber));
        }

        return tokens;
    }

    // Evaluate mathematical expression
    evaluate(expression) {
        const tokens = this.tokenize(expression);
        this.operatorStack.clear();
        this.operandStack.clear();

        for (let token of tokens) {
            if (typeof token === 'number') {
                this.operandStack.push(token);
            } else if (token === '(') {
                this.operatorStack.push(token);
            } else if (token === ')') {
                while (!this.operatorStack.isEmpty() && this.operatorStack.peek() !== '(') {
                    this.performOperation();
                }
                this.operatorStack.pop(); // Remove '('
            } else if (this.precedence[token]) {
                while (!this.operatorStack.isEmpty() &&
                    this.operatorStack.peek() !== '(' &&
                    this.precedence[this.operatorStack.peek()] >= this.precedence[token]) {
                    this.performOperation();
                }
                this.operatorStack.push(token);
            }
        }

        while (!this.operatorStack.isEmpty()) {
            this.performOperation();
        }

        return this.operandStack.isEmpty() ? 0 : this.operandStack.pop();
    }

    performOperation() {
        if (this.operandStack.size() < 2) return;

        const b = this.operandStack.pop();
        const a = this.operandStack.pop();
        const operator = this.operatorStack.pop();

        let result;
        switch (operator) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '/': result = b !== 0 ? a / b : Infinity; break;
            case '^': result = Math.pow(a, b); break;
            default: result = 0;
        }

        this.operandStack.push(result);
    }

    // Parse and validate syntax
    validateSyntax(expression) {
        const tokens = this.tokenize(expression);
        const parenStack = new Stack();
        let lastTokenType = null; // 'number', 'operator', 'openParen', 'closeParen'

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            if (typeof token === 'number') {
                if (lastTokenType === 'number' || lastTokenType === 'closeParen') {
                    return { valid: false, error: `Unexpected number at position ${i}` };
                }
                lastTokenType = 'number';
            } else if (token === '(') {
                if (lastTokenType === 'number' || lastTokenType === 'closeParen') {
                    return { valid: false, error: `Unexpected '(' at position ${i}` };
                }
                parenStack.push(i);
                lastTokenType = 'openParen';
            } else if (token === ')') {
                if (parenStack.isEmpty()) {
                    return { valid: false, error: `Unmatched ')' at position ${i}` };
                }
                if (lastTokenType === 'operator' || lastTokenType === 'openParen') {
                    return { valid: false, error: `Unexpected ')' at position ${i}` };
                }
                parenStack.pop();
                lastTokenType = 'closeParen';
            } else if (this.precedence[token]) {
                if (lastTokenType === 'operator' || lastTokenType === 'openParen' || lastTokenType === null) {
                    return { valid: false, error: `Unexpected operator '${token}' at position ${i}` };
                }
                lastTokenType = 'operator';
            }
        }

        if (!parenStack.isEmpty()) {
            return { valid: false, error: 'Unmatched opening parenthesis' };
        }

        if (lastTokenType === 'operator') {
            return { valid: false, error: 'Expression cannot end with operator' };
        }

        return { valid: true };
    }
}

// ====================================
// 4. MEMORY MANAGEMENT (CALL STACK SIMULATION)
// ====================================

class CallStack {
    constructor() {
        this.stack = new Stack();
        this.maxStackSize = 1000;
    }

    // Push function call onto stack
    pushCall(functionName, params = {}, localVars = {}) {
        if (this.stack.size() >= this.maxStackSize) {
            throw new Error('Stack overflow: Maximum call stack size exceeded');
        }

        const activationRecord = {
            functionName: functionName,
            parameters: { ...params },
            localVariables: { ...localVars },
            returnAddress: this.stack.size(),
            timestamp: Date.now()
        };

        this.stack.push(activationRecord);
        return activationRecord;
    }

    // Pop function call from stack
    popCall() {
        if (this.stack.isEmpty()) {
            throw new Error('Stack underflow: No function calls to pop');
        }

        return this.stack.pop();
    }

    // Get current function context
    getCurrentContext() {
        if (this.stack.isEmpty()) {
            return null;
        }

        return this.stack.peek();
    }

    // Get call stack trace
    getStackTrace() {
        return this.stack.toArray().reverse().map((record, index) => ({
            level: index,
            function: record.functionName,
            parameters: record.parameters,
            duration: Date.now() - record.timestamp
        }));
    }

    // Simulate recursive function execution
    simulateRecursiveExecution(functionName, baseCase, recursiveLogic, initialParams) {
        const results = [];
        this.pushCall(functionName, initialParams);

        while (!this.stack.isEmpty()) {
            const current = this.getCurrentContext();

            if (baseCase(current.parameters)) {
                const result = recursiveLogic.base(current.parameters);
                results.push({
                    function: current.functionName,
                    params: current.parameters,
                    result: result,
                    type: 'base_case'
                });
                this.popCall();
            } else {
                const subProblems = recursiveLogic.recursive(current.parameters);
                this.popCall();

                subProblems.forEach(subProblem => {
                    this.pushCall(functionName, subProblem);
                });
            }
        }

        return results;
    }
}

// ====================================
// 5. BACKTRACKING ALGORITHMS
// ====================================

class MazeSolver {
    constructor(maze) {
        this.maze = maze;
        this.rows = maze.length;
        this.cols = maze[0].length;
        this.pathStack = new Stack();
        this.visited = [];
        this.solution = [];
    }

    // Initialize visited array
    initializeVisited() {
        this.visited = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    }

    // Check if position is valid
    isValidMove(row, col) {
        return row >= 0 && row < this.rows &&
            col >= 0 && col < this.cols &&
            this.maze[row][col] === 0 &&
            !this.visited[row][col];
    }

    // Solve maze using stack-based backtracking
    solveMaze(startRow = 0, startCol = 0, endRow = -1, endCol = -1) {
        this.initializeVisited();
        this.pathStack.clear();
        this.solution = [];

        // Default end position
        if (endRow === -1) endRow = this.rows - 1;
        if (endCol === -1) endCol = this.cols - 1;

        // Start position
        this.pathStack.push({ row: startRow, col: startCol, step: 0 });
        this.visited[startRow][startCol] = true;

        // Directions: up, right, down, left
        const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

        while (!this.pathStack.isEmpty()) {
            const current = this.pathStack.peek();

            // Check if we reached the end
            if (current.row === endRow && current.col === endCol) {
                this.solution = this.pathStack.toArray();
                return {
                    solved: true,
                    path: this.solution,
                    steps: this.solution.length
                };
            }

            let moved = false;

            // Try all four directions
            for (let [dRow, dCol] of directions) {
                const newRow = current.row + dRow;
                const newCol = current.col + dCol;

                if (this.isValidMove(newRow, newCol)) {
                    this.pathStack.push({
                        row: newRow,
                        col: newCol,
                        step: current.step + 1
                    });
                    this.visited[newRow][newCol] = true;
                    moved = true;
                    break;
                }
            }

            // If no valid move found, backtrack
            if (!moved) {
                const backtrack = this.pathStack.pop();
                if (backtrack) {
                    this.visited[backtrack.row][backtrack.col] = false;
                }
            }
        }

        return { solved: false, message: 'No solution found' };
    }

    // Generate visual representation of solution
    visualizeSolution() {
        if (this.solution.length === 0) {
            return 'No solution to visualize';
        }

        const visual = this.maze.map(row => [...row]);

        this.solution.forEach((pos, index) => {
            if (index === 0) {
                visual[pos.row][pos.col] = 'S'; // Start
            } else if (index === this.solution.length - 1) {
                visual[pos.row][pos.col] = 'E'; // End
            } else {
                visual[pos.row][pos.col] = '.'; // Path
            }
        });

        return visual.map(row =>
            row.map(cell => {
                if (cell === 1) return '█';
                if (cell === 0) return ' ';
                return cell;
            }).join('')
        ).join('\n');
    }
}

// N-Queens solver using backtracking
class NQueensSolver {
    constructor(n) {
        this.n = n;
        this.solutions = [];
        this.currentSolution = new Stack();
    }

    // Check if queen placement is safe
    isSafe(row, col, board) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i] === col) return false;
        }

        // Check diagonal (top-left to bottom-right)
        for (let i = 0; i < row; i++) {
            if (Math.abs(board[i] - col) === Math.abs(i - row)) return false;
        }

        return true;
    }

    // Solve N-Queens using stack-based backtracking
    solve() {
        this.solutions = [];
        const board = new Array(this.n).fill(-1);
        const stack = new Stack();

        // Start with first row
        stack.push({ row: 0, col: 0, board: [...board] });

        while (!stack.isEmpty()) {
            const current = stack.pop();
            const { row, col, board } = current;

            if (row === this.n) {
                // Found a solution
                this.solutions.push([...board]);
                continue;
            }

            // Try placing queens in current row
            for (let c = col; c < this.n; c++) {
                if (this.isSafe(row, c, board)) {
                    const newBoard = [...board];
                    newBoard[row] = c;

                    stack.push({ row: row + 1, col: 0, board: newBoard });
                }
            }
        }

        return this.solutions;
    }

    // Visualize solution
    visualizeSolution(solutionIndex = 0) {
        if (solutionIndex >= this.solutions.length) {
            return 'Invalid solution index';
        }

        const solution = this.solutions[solutionIndex];
        const board = Array(this.n).fill().map(() => Array(this.n).fill('.'));

        solution.forEach((col, row) => {
            board[row][col] = 'Q';
        });

        return board.map(row => row.join(' ')).join('\n');
    }
}

// ====================================
// 6. SYNTAX CHECKING
// ====================================

class SyntaxChecker {
    constructor() {
        this.stack = new Stack();
        this.errors = [];
    }

    // Check code syntax for various languages
    checkSyntax(code, language = 'javascript') {
        this.stack.clear();
        this.errors = [];

        switch (language.toLowerCase()) {
            case 'javascript':
                return this.checkJavaScript(code);
            case 'html':
                return this.checkHTML(code);
            case 'css':
                return this.checkCSS(code);
            default:
                return this.checkGeneric(code);
        }
    }

    checkJavaScript(code) {
        const brackets = { '(': ')', '[': ']', '{': '}' };
        const openBrackets = Object.keys(brackets);
        const closeBrackets = Object.values(brackets);

        let inString = false;
        let stringChar = null;
        let lineNumber = 1;
        let columnNumber = 1;

        for (let i = 0; i < code.length; i++) {
            const char = code[i];

            if (char === '\n') {
                lineNumber++;
                columnNumber = 1;
                continue;
            }

            // Handle strings
            if ((char === '"' || char === "'" || char === '`') && !inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar && inString && code[i - 1] !== '\\') {
                inString = false;
                stringChar = null;
            }

            if (!inString) {
                if (openBrackets.includes(char)) {
                    this.stack.push({
                        bracket: char,
                        line: lineNumber,
                        column: columnNumber,
                        expected: brackets[char]
                    });
                } else if (closeBrackets.includes(char)) {
                    if (this.stack.isEmpty()) {
                        this.errors.push({
                            type: 'unmatched_closing',
                            bracket: char,
                            line: lineNumber,
                            column: columnNumber,
                            message: `Unexpected closing bracket '${char}'`
                        });
                    } else {
                        const last = this.stack.pop();
                        if (last.expected !== char) {
                            this.errors.push({
                                type: 'mismatched',
                                expected: last.expected,
                                actual: char,
                                line: lineNumber,
                                column: columnNumber,
                                openedAt: { line: last.line, column: last.column },
                                message: `Expected '${last.expected}' but found '${char}'`
                            });
                        }
                    }
                }
            }

            columnNumber++;
        }

        // Check for unclosed brackets
        while (!this.stack.isEmpty()) {
            const unclosed = this.stack.pop();
            this.errors.push({
                type: 'unclosed',
                bracket: unclosed.bracket,
                expected: unclosed.expected,
                line: unclosed.line,
                column: unclosed.column,
                message: `Unclosed '${unclosed.bracket}' opened at line ${unclosed.line}`
            });
        }

        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            errorCount: this.errors.length
        };
    }

    checkHTML(html) {
        const tagStack = new Stack();
        const selfClosingTags = ['img', 'br', 'hr', 'input', 'meta', 'link'];
        const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
        let match;

        while ((match = tagRegex.exec(html)) !== null) {
            const fullTag = match[0];
            const tagName = match[1].toLowerCase();
            const isClosing = fullTag.startsWith('</');
            const isSelfClosing = selfClosingTags.includes(tagName) || fullTag.endsWith('/>');

            if (isClosing) {
                if (tagStack.isEmpty()) {
                    this.errors.push({
                        type: 'unmatched_closing_tag',
                        tag: tagName,
                        position: match.index,
                        message: `Unexpected closing tag </${tagName}>`
                    });
                } else {
                    const lastTag = tagStack.pop();
                    if (lastTag.name !== tagName) {
                        this.errors.push({
                            type: 'mismatched_tag',
                            expected: lastTag.name,
                            actual: tagName,
                            position: match.index,
                            openedAt: lastTag.position,
                            message: `Expected </${lastTag.name}> but found </${tagName}>`
                        });
                    }
                }
            } else if (!isSelfClosing) {
                tagStack.push({
                    name: tagName,
                    position: match.index
                });
            }
        }

        // Check for unclosed tags
        while (!tagStack.isEmpty()) {
            const unclosed = tagStack.pop();
            this.errors.push({
                type: 'unclosed_tag',
                tag: unclosed.name,
                position: unclosed.position,
                message: `Unclosed tag <${unclosed.name}>`
            });
        }

        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            errorCount: this.errors.length
        };
    }

    checkCSS(css) {
        const braceStack = new Stack();
        let inRule = false;
        let lineNumber = 1;
        let columnNumber = 1;

        for (let i = 0; i < css.length; i++) {
            const char = css[i];

            if (char === '\n') {
                lineNumber++;
                columnNumber = 1;
                continue;
            }

            if (char === '{') {
                braceStack.push({
                    line: lineNumber,
                    column: columnNumber
                });
                inRule = true;
            } else if (char === '}') {
                if (braceStack.isEmpty()) {
                    this.errors.push({
                        type: 'unmatched_closing_brace',
                        line: lineNumber,
                        column: columnNumber,
                        message: 'Unexpected closing brace'
                    });
                } else {
                    braceStack.pop();
                    inRule = !braceStack.isEmpty();
                }
            }

            columnNumber++;
        }

        // Check for unclosed braces
        while (!braceStack.isEmpty()) {
            const unclosed = braceStack.pop();
            this.errors.push({
                type: 'unclosed_brace',
                line: unclosed.line,
                column: unclosed.column,
                message: `Unclosed brace at line ${unclosed.line}`
            });
        }

        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            errorCount: this.errors.length
        };
    }

    checkGeneric(code) {
        return this.checkJavaScript(code); // Default to JavaScript syntax
    }
}

// ====================================
// 7. WEB PAGE DOM TRAVERSAL
// ====================================

class DOMTraverser {
    constructor() {
        this.traversalStack = new Stack();
        this.visitedNodes = [];
    }

    // Simulate DOM node structure
    createDOMNode(tag, attributes = {}, children = [], textContent = '') {
        return {
            tagName: tag.toUpperCase(),
            attributes: attributes,
            children: children,
            textContent: textContent,
            id: attributes.id || null,
            className: attributes.class || '',
            parent: null
        };
    }

    // Build sample DOM tree
    buildSampleDOM() {
        const html = this.createDOMNode('html');
        const head = this.createDOMNode('head');
        const title = this.createDOMNode('title', {}, [], 'Sample Page');
        const body = this.createDOMNode('body');
        const header = this.createDOMNode('header', { id: 'main-header' });
        const nav = this.createDOMNode('nav', { class: 'navigation' });
        const main = this.createDOMNode('main');
        const section1 = this.createDOMNode('section', { class: 'content' });
        const section2 = this.createDOMNode('section', { class: 'sidebar' });
        const footer = this.createDOMNode('footer');

        // Build relationships
        head.children = [title];
        nav.children = [
            this.createDOMNode('a', { href: '#' }, [], 'Home'),
            this.createDOMNode('a', { href: '#' }, [], 'About'),
            this.createDOMNode('a', { href: '#' }, [], 'Contact')
        ];
        header.children = [nav];
        section1.children = [
            this.createDOMNode('h1', {}, [], 'Main Content'),
            this.createDOMNode('p', {}, [], 'This is the main content area.')
        ];
        section2.children = [
            this.createDOMNode('h2', {}, [], 'Sidebar'),
            this.createDOMNode('ul', {}, [
                this.createDOMNode('li', {}, [], 'Item 1'),
                this.createDOMNode('li', {}, [], 'Item 2')
            ])
        ];
        main.children = [section1, section2];
        body.children = [header, main, footer];
        html.children = [head, body];

        // Set parent relationships
        this.setParentRelationships(html);

        return html;
    }

    // Set parent relationships recursively
    setParentRelationships(node, parent = null) {
        node.parent = parent;
        node.children.forEach(child => {
            this.setParentRelationships(child, node);
        });
    }

    // Depth-first traversal using stack
    depthFirstTraversal(rootNode, callback) {
        this.traversalStack.clear();
        this.visitedNodes = [];
        const result = [];

        this.traversalStack.push({
            node: rootNode,
            depth: 0,
            path: [rootNode.tagName]
        });

        while (!this.traversalStack.isEmpty()) {
            const current = this.traversalStack.pop();
            const { node, depth, path } = current;

            // Process current node
            const nodeInfo = {
                tagName: node.tagName,
                depth: depth,
                path: path.join(' > '),
                attributes: node.attributes,
                textContent: node.textContent,
                hasChildren: node.children.length > 0
            };

            result.push(nodeInfo);
            this.visitedNodes.push(nodeInfo);

            // Call callback if provided
            if (callback) {
                callback(nodeInfo);
            }

            // Add children to stack in reverse order (for correct DFS order)
            for (let i = node.children.length - 1; i >= 0; i--) {
                const child = node.children[i];
                this.traversalStack.push({
                    node: child,
                    depth: depth + 1,
                    path: [...path, child.tagName]
                });
            }
        }

        return result;
    }

    // Breadth-first traversal (using stack to simulate queue)
    breadthFirstTraversal(rootNode, callback) {
        const queue = [{ node: rootNode, depth: 0, path: [rootNode.tagName] }];
        const result = [];
        this.visitedNodes = [];

        while (queue.length > 0) {
            const current = queue.shift(); // Remove from front (queue behavior)
            const { node, depth, path } = current;

            // Process current node
            const nodeInfo = {
                tagName: node.tagName,
                depth: depth,
                path: path.join(' > '),
                attributes: node.attributes,
                textContent: node.textContent,
                hasChildren: node.children.length > 0
            };

            result.push(nodeInfo);
            this.visitedNodes.push(nodeInfo);

            // Call callback if provided
            if (callback) {
                callback(nodeInfo);
            }

            // Add children to queue
            node.children.forEach(child => {
                queue.push({
                    node: child,
                    depth: depth + 1,
                    path: [...path, child.tagName]
                });
            });
        }

        return result;
    }

    // Find elements by tag name
    findByTagName(rootNode, tagName) {
        const results = [];

        this.depthFirstTraversal(rootNode, (nodeInfo) => {
            if (nodeInfo.tagName.toLowerCase() === tagName.toLowerCase()) {
                results.push(nodeInfo);
            }
        });

        return results;
    }

    // Find element by ID
    findById(rootNode, id) {
        let found = null;

        this.depthFirstTraversal(rootNode, (nodeInfo) => {
            if (nodeInfo.attributes.id === id) {
                found = nodeInfo;
            }
        });

        return found;
    }

    // Find elements by class name
    findByClassName(rootNode, className) {
        const results = [];

        this.depthFirstTraversal(rootNode, (nodeInfo) => {
            if (nodeInfo.attributes.class &&
                nodeInfo.attributes.class.includes(className)) {
                results.push(nodeInfo);
            }
        });

        return results;
    }

    // Find elements by CSS selector (simplified)
    querySelector(rootNode, selector) {
        const results = [];

        this.depthFirstTraversal(rootNode, (nodeInfo) => {
            if (this.matchesSelector(nodeInfo, selector)) {
                results.push(nodeInfo);
            }
        });

        return results;
    }

    // Simple selector matching
    matchesSelector(nodeInfo, selector) {
        // Handle ID selector
        if (selector.startsWith('#')) {
            return nodeInfo.attributes.id === selector.substring(1);
        }

        // Handle class selector
        if (selector.startsWith('.')) {
            const className = selector.substring(1);
            return nodeInfo.attributes.class &&
                nodeInfo.attributes.class.includes(className);
        }

        // Handle tag selector
        return nodeInfo.tagName.toLowerCase() === selector.toLowerCase();
    }

    // Get element ancestors (path to root)
    getAncestors(rootNode, targetId) {
        const ancestors = [];
        const ancestorStack = new Stack();

        // Find the target node and build ancestor path
        const findTarget = (node, path = []) => {
            const currentPath = [...path, {
                tagName: node.tagName,
                id: node.attributes.id,
                class: node.attributes.class
            }];

            if (node.attributes.id === targetId) {
                return currentPath;
            }

            for (let child of node.children) {
                const result = findTarget(child, currentPath);
                if (result) return result;
            }

            return null;
        };

        const ancestorPath = findTarget(rootNode);
        if (ancestorPath) {
            // Remove the target element itself, keep only ancestors
            return ancestorPath.slice(0, -1);
        }

        return [];
    }

    // Get element siblings
    getSiblings(rootNode, targetId) {
        let targetParent = null;

        // Find parent of target element
        this.depthFirstTraversal(rootNode, (nodeInfo) => {
            // This is simplified - in real implementation, we'd track parent nodes
        });

        // For demonstration, we'll simulate finding siblings
        return [];
    }

    // Validate DOM structure
    validateDOMStructure(rootNode) {
        const issues = [];
        const tagStack = new Stack();

        this.depthFirstTraversal(rootNode, (nodeInfo) => {
            // Check for duplicate IDs
            if (nodeInfo.attributes.id) {
                const duplicates = this.findById(rootNode, nodeInfo.attributes.id);
                if (duplicates && this.countOccurrences(rootNode, nodeInfo.attributes.id) > 1) {
                    issues.push({
                        type: 'duplicate_id',
                        id: nodeInfo.attributes.id,
                        path: nodeInfo.path,
                        message: `Duplicate ID '${nodeInfo.attributes.id}' found`
                    });
                }
            }

            // Check for proper nesting
            if (nodeInfo.tagName === 'P' && nodeInfo.depth > 0) {
                // P tags shouldn't contain block elements (simplified check)
                if (nodeInfo.hasChildren) {
                    issues.push({
                        type: 'invalid_nesting',
                        element: nodeInfo.tagName,
                        path: nodeInfo.path,
                        message: 'P element contains block-level children'
                    });
                }
            }
        });

        return {
            valid: issues.length === 0,
            issues: issues,
            totalNodes: this.visitedNodes.length
        };
    }

    // Count occurrences of ID in DOM
    countOccurrences(rootNode, id) {
        let count = 0;
        this.depthFirstTraversal(rootNode, (nodeInfo) => {
            if (nodeInfo.attributes.id === id) {
                count++;
            }
        });
        return count;
    }

    // Generate DOM tree visualization
    visualizeDOM(rootNode) {
        const lines = [];

        this.depthFirstTraversal(rootNode, (nodeInfo) => {
            const indent = '  '.repeat(nodeInfo.depth);
            const attributes = Object.entries(nodeInfo.attributes)
                .map(([key, value]) => `${key}="${value}"`)
                .join(' ');

            const attributeStr = attributes ? ` ${attributes}` : '';
            const textStr = nodeInfo.textContent ? ` "${nodeInfo.textContent}"` : '';

            lines.push(`${indent}<${nodeInfo.tagName}${attributeStr}>${textStr}`);
        });

        return lines.join('\n');
    }

    // Performance analysis
    analyzeTraversalPerformance(rootNode) {
        const startTime = performance.now();

        // Perform depth-first traversal
        const dfsStart = performance.now();
        const dfsResult = this.depthFirstTraversal(rootNode);
        const dfsTime = performance.now() - dfsStart;

        // Perform breadth-first traversal
        const bfsStart = performance.now();
        const bfsResult = this.breadthFirstTraversal(rootNode);
        const bfsTime = performance.now() - bfsStart;

        const totalTime = performance.now() - startTime;

        return {
            totalNodes: dfsResult.length,
            maxDepth: Math.max(...dfsResult.map(node => node.depth)),
            dfsTime: dfsTime,
            bfsTime: bfsTime,
            totalTime: totalTime,
            performance: {
                dfsNodesPerMs: dfsResult.length / dfsTime,
                bfsNodesPerMs: bfsResult.length / bfsTime
            }
        };
    }
}

// ====================================
// DEMO AND TESTING FUNCTIONS
// ====================================

// Test all stack implementations
function runAllTests() {
    console.log('='.repeat(50));
    console.log('STACK DATA STRUCTURE - REAL-WORLD APPLICATIONS');
    console.log('='.repeat(50));

    // Test 1: Text Editor Undo/Redo
    console.log('\n1. TEXT EDITOR UNDO/REDO SYSTEM');
    console.log('-'.repeat(30));

    const editor = new TextEditor();
    editor.executeCommand(new InsertTextCommand('Hello '));
    editor.executeCommand(new InsertTextCommand('World!'));
    editor.executeCommand(new ReplaceTextCommand(6, 6, 'JavaScript'));

    console.log('Current content:', editor.content);
    console.log('Undo history:', editor.getUndoHistory());

    const undoResult = editor.undo();
    console.log('After undo:', undoResult);

    const redoResult = editor.redo();
    console.log('After redo:', redoResult);

    // Test 2: Browser History
    console.log('\n2. BROWSER HISTORY NAVIGATION');
    console.log('-'.repeat(30));

    const browser = new BrowserHistory();
    browser.visit('https://google.com');
    browser.visit('https://stackoverflow.com');
    browser.visit('https://github.com');

    console.log('Current page:', browser.getCurrentPage());
    console.log('Back history:', browser.getBackHistory());

    const backResult = browser.goBack();
    console.log('After going back:', backResult);

    // Test 3: Expression Parser
    console.log('\n3. MATHEMATICAL EXPRESSION PARSING');
    console.log('-'.repeat(30));

    const parser = new ExpressionParser();
    const expressions = ['2 + 3 * 4', '(2 + 3) * 4', '2 ^ 3 + 1', '((2 + 3))'];

    expressions.forEach(expr => {
        const validation = parser.validateSyntax(expr);
        const result = validation.valid ? parser.evaluate(expr) : 'Invalid';
        console.log(`${expr} = ${result}`);
    });

    // Test 4: Call Stack Simulation
    console.log('\n4. CALL STACK SIMULATION');
    console.log('-'.repeat(30));

    const callStack = new CallStack();

    // Simulate factorial calculation
    const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
    const factorialTrace = callStack.simulateRecursiveExecution(
        'factorial',
        (params) => params.n <= 1,
        {
            base: (params) => 1,
            recursive: (params) => [{ n: params.n - 1 }]
        },
        { n: 4 }
    );

    console.log('Factorial calculation trace:', factorialTrace);

    // Test 5: Maze Solver
    console.log('\n5. MAZE SOLVING WITH BACKTRACKING');
    console.log('-'.repeat(30));

    const maze = [
        [0, 1, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 0, 1, 0]
    ];

    const mazeSolver = new MazeSolver(maze);
    const mazeResult = mazeSolver.solveMaze();
    console.log('Maze solved:', mazeResult.solved);
    console.log('Solution path length:', mazeResult.steps || 0);
    console.log('Visual solution:');
    console.log(mazeSolver.visualizeSolution());

    // Test 6: N-Queens Solver
    console.log('\n6. N-QUEENS PROBLEM SOLVER');
    console.log('-'.repeat(30));

    const nQueens = new NQueensSolver(4);
    const solutions = nQueens.solve();
    console.log(`Found ${solutions.length} solutions for 4-Queens:`);
    if (solutions.length > 0) {
        console.log('First solution:');
        console.log(nQueens.visualizeSolution(0));
    }

    // Test 7: Syntax Checker
    console.log('\n7. CODE SYNTAX VALIDATION');
    console.log('-'.repeat(30));

    const syntaxChecker = new SyntaxChecker();
    const codeSnippets = [
        { code: 'function test() { return [1, 2, 3]; }', lang: 'javascript' },
        { code: 'function test() { return [1, 2, 3; }', lang: 'javascript' },
        { code: '<div><p>Hello</p></div>', lang: 'html' },
        { code: '<div><p>Hello</div></p>', lang: 'html' }
    ];

    codeSnippets.forEach(snippet => {
        const result = syntaxChecker.checkSyntax(snippet.code, snippet.lang);
        console.log(`${snippet.lang.toUpperCase()}: ${result.valid ? 'Valid' : 'Invalid'}`);
        if (!result.valid) {
            console.log('Errors:', result.errors.slice(0, 2)); // Show first 2 errors
        }
    });

    // Test 8: DOM Traversal
    console.log('\n8. DOM TREE TRAVERSAL');
    console.log('-'.repeat(30));

    const domTraverser = new DOMTraverser();
    const sampleDOM = domTraverser.buildSampleDOM();

    console.log('DOM Structure:');
    console.log(domTraverser.visualizeDOM(sampleDOM));

    console.log('\nDepth-first traversal:');
    const dfsResult = domTraverser.depthFirstTraversal(sampleDOM);
    dfsResult.slice(0, 5).forEach(node => {
        console.log(`${node.path} (depth: ${node.depth})`);
    });

    console.log('\nElements with class "content":');
    const contentElements = domTraverser.findByClassName(sampleDOM, 'content');
    contentElements.forEach(elem => {
        console.log(`Found: ${elem.path}`);
    });

    console.log('\nPerformance analysis:');
    const perfAnalysis = domTraverser.analyzeTraversalPerformance(sampleDOM);
    console.log(`Total nodes: ${perfAnalysis.totalNodes}`);
    console.log(`Max depth: ${perfAnalysis.maxDepth}`);
    console.log(`DFS time: ${perfAnalysis.dfsTime.toFixed(2)}ms`);
    console.log(`BFS time: ${perfAnalysis.bfsTime.toFixed(2)}ms`);

    console.log('\n' + '='.repeat(50));
    console.log('ALL TESTS COMPLETED');
    console.log('='.repeat(50));
}

// Run all tests
runAllTests();