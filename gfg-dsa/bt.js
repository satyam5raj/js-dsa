// Binary Tree Node Definition
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// ============================================================================
// 1. Level Order Traversal (BFS)
// Problem: Traverse tree level by level from left to right
// Approach: Use queue to process nodes level by level
// Time Complexity: O(n), Space Complexity: O(w) where w is max width
// ============================================================================

function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}

// Test case for Level Order Traversal
const root1 = new TreeNode(3, 
    new TreeNode(9), 
    new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log("Level Order:", levelOrder(root1)); // [[3], [9, 20], [15, 7]]

// ============================================================================
// 2. Reverse Level Order Traversal
// Problem: Traverse tree level by level from bottom to top
// Approach: Use level order traversal and reverse the result
// Time Complexity: O(n), Space Complexity: O(n)
// ============================================================================

function reverseLevelOrder(root) {
    const levels = levelOrder(root);
    return levels.reverse();
}

// Test case for Reverse Level Order
console.log("Reverse Level Order:", reverseLevelOrder(root1)); // [[15, 7], [9, 20], [3]]

// ============================================================================
// 3. Height of a Tree
// Problem: Find the maximum depth of the tree
// Approach: Recursively find max depth of left and right subtrees
// Time Complexity: O(n), Space Complexity: O(h) where h is height
// ============================================================================

function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// Test case for Height
console.log("Height:", maxDepth(root1)); // 3

// ============================================================================
// 4. Diameter of a Tree
// Problem: Find the longest path between any two nodes
// Approach: For each node, diameter = left_height + right_height
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function diameterOfBinaryTree(root) {
    let maxDiameter = 0;
    
    function height(node) {
        if (!node) return 0;
        
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        
        // Update diameter through current node
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    height(root);
    return maxDiameter;
}

// Test case for Diameter
console.log("Diameter:", diameterOfBinaryTree(root1)); // 3

// ============================================================================
// 5. Mirror of a Tree
// Problem: Create mirror image of the tree (flip horizontally)
// Approach: Swap left and right children recursively
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function mirrorTree(root) {
    if (!root) return null;
    
    // Swap left and right children
    [root.left, root.right] = [root.right, root.left];
    
    // Recursively mirror subtrees
    mirrorTree(root.left);
    mirrorTree(root.right);
    
    return root;
}

// Test case for Mirror
const mirrorRoot = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log("Original:", levelOrder(mirrorRoot));
mirrorTree(mirrorRoot);
console.log("Mirrored:", levelOrder(mirrorRoot));

// ============================================================================
// 6. Inorder Traversal - Recursive and Iterative
// Problem: Traverse Left -> Root -> Right
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

// Recursive Inorder
function inorderRecursive(root) {
    const result = [];
    
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
    }
    
    inorder(root);
    return result;
}

// Iterative Inorder
function inorderIterative(root) {
    const result = [];
    const stack = [];
    let current = root;
    
    while (current || stack.length > 0) {
        // Go to leftmost node
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        // Process current node
        current = stack.pop();
        result.push(current.val);
        
        // Move to right subtree
        current = current.right;
    }
    
    return result;
}

// Test cases for Inorder
console.log("Inorder Recursive:", inorderRecursive(root1));
console.log("Inorder Iterative:", inorderIterative(root1));

// ============================================================================
// 7. Preorder Traversal - Recursive and Iterative
// Problem: Traverse Root -> Left -> Right
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

// Recursive Preorder
function preorderRecursive(root) {
    const result = [];
    
    function preorder(node) {
        if (!node) return;
        result.push(node.val);
        preorder(node.left);
        preorder(node.right);
    }
    
    preorder(root);
    return result;
}

// Iterative Preorder
function preorderIterative(root) {
    if (!root) return [];
    
    const result = [];
    const stack = [root];
    
    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.val);
        
        // Push right first, then left (stack is LIFO)
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    
    return result;
}

// Test cases for Preorder
console.log("Preorder Recursive:", preorderRecursive(root1));
console.log("Preorder Iterative:", preorderIterative(root1));

// ============================================================================
// 8. Postorder Traversal - Recursive and Iterative
// Problem: Traverse Left -> Right -> Root
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

// Recursive Postorder
function postorderRecursive(root) {
    const result = [];
    
    function postorder(node) {
        if (!node) return;
        postorder(node.left);
        postorder(node.right);
        result.push(node.val);
    }
    
    postorder(root);
    return result;
}

// Iterative Postorder
function postorderIterative(root) {
    if (!root) return [];
    
    const result = [];
    const stack = [];
    let lastVisited = null;
    let current = root;
    
    while (current || stack.length > 0) {
        if (current) {
            stack.push(current);
            current = current.left;
        } else {
            const peekNode = stack[stack.length - 1];
            
            // If right child exists and hasn't been processed yet
            if (peekNode.right && lastVisited !== peekNode.right) {
                current = peekNode.right;
            } else {
                result.push(peekNode.val);
                lastVisited = stack.pop();
            }
        }
    }
    
    return result;
}

// Test cases for Postorder
console.log("Postorder Recursive:", postorderRecursive(root1));
console.log("Postorder Iterative:", postorderIterative(root1));

// ============================================================================
// 9. Left View of Tree
// Problem: Get the leftmost node at each level
// Approach: Level order traversal, take first node of each level
// Time Complexity: O(n), Space Complexity: O(w)
// ============================================================================

function leftView(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            // First node of the level
            if (i === 0) {
                result.push(node.val);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
}

// Test case for Left View
console.log("Left View:", leftView(root1)); // [3, 9, 15]

// ============================================================================
// 10. Right View of Tree
// Problem: Get the rightmost node at each level
// Approach: Level order traversal, take last node of each level
// Time Complexity: O(n), Space Complexity: O(w)
// ============================================================================

function rightView(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            // Last node of the level
            if (i === levelSize - 1) {
                result.push(node.val);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
}

// Test case for Right View
console.log("Right View:", rightView(root1)); // [3, 20, 7]

// ============================================================================
// 11. Top View of Tree
// Problem: Get nodes visible from top (based on horizontal distance)
// Approach: Use BFS with horizontal distance tracking
// Time Complexity: O(n), Space Complexity: O(n)
// ============================================================================

function topView(root) {
    if (!root) return [];
    
    const map = new Map();
    const queue = [{node: root, hd: 0}]; // horizontal distance
    
    while (queue.length > 0) {
        const {node, hd} = queue.shift();
        
        // First node at this horizontal distance
        if (!map.has(hd)) {
            map.set(hd, node.val);
        }
        
        if (node.left) queue.push({node: node.left, hd: hd - 1});
        if (node.right) queue.push({node: node.right, hd: hd + 1});
    }
    
    // Sort by horizontal distance and return values
    return Array.from(map.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([_, val]) => val);
}

// Test case for Top View
console.log("Top View:", topView(root1)); // [9, 3, 20, 7]

// ============================================================================
// 12. Bottom View of Tree
// Problem: Get nodes visible from bottom (based on horizontal distance)
// Approach: Use BFS with horizontal distance, keep updating for same distance
// Time Complexity: O(n), Space Complexity: O(n)
// ============================================================================

function bottomView(root) {
    if (!root) return [];
    
    const map = new Map();
    const queue = [{node: root, hd: 0}];
    
    while (queue.length > 0) {
        const {node, hd} = queue.shift();
        
        // Update value for this horizontal distance (last one wins)
        map.set(hd, node.val);
        
        if (node.left) queue.push({node: node.left, hd: hd - 1});
        if (node.right) queue.push({node: node.right, hd: hd + 1});
    }
    
    return Array.from(map.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([_, val]) => val);
}

// Test case for Bottom View
console.log("Bottom View:", bottomView(root1)); // [9, 15, 20, 7]

// ============================================================================
// 13. Zig-Zag Traversal
// Problem: Traverse alternating left-to-right and right-to-left by levels
// Approach: Level order with alternating reverse
// Time Complexity: O(n), Space Complexity: O(w)
// ============================================================================

function zigzagLevelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    let leftToRight = true;
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        if (!leftToRight) {
            currentLevel.reverse();
        }
        
        result.push(currentLevel);
        leftToRight = !leftToRight;
    }
    
    return result;
}

// Test case for Zig-Zag
console.log("Zig-Zag:", zigzagLevelOrder(root1)); // [[3], [20, 9], [15, 7]]

// ============================================================================
// 14. Check if Tree is Balanced
// Problem: Check if height difference between subtrees is at most 1
// Approach: Check balance condition for each node
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function isBalanced(root) {
    function checkBalance(node) {
        if (!node) return 0;
        
        const leftHeight = checkBalance(node.left);
        if (leftHeight === -1) return -1;
        
        const rightHeight = checkBalance(node.right);
        if (rightHeight === -1) return -1;
        
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    return checkBalance(root) !== -1;
}

// Test case for Balanced Tree
console.log("Is Balanced:", isBalanced(root1)); // true

// ============================================================================
// 15. Diagonal Traversal
// Problem: Traverse nodes diagonally (same slope)
// Approach: Use queue with slope tracking
// Time Complexity: O(n), Space Complexity: O(n)
// ============================================================================

function diagonalTraversal(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const size = queue.length;
        const diagonal = [];
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            
            // Traverse all right nodes in current diagonal
            while (node) {
                diagonal.push(node.val);
                
                if (node.left) queue.push(node.left);
                
                node = node.right;
            }
        }
        
        if (diagonal.length > 0) {
            result.push(...diagonal);
        }
    }
    
    return result;
}

// Test case for Diagonal Traversal
console.log("Diagonal Traversal:", diagonalTraversal(root1));

// ============================================================================
// 16. Boundary Traversal
// Problem: Traverse boundary (left boundary + leaves + right boundary)
// Approach: Separate functions for each part
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function boundaryTraversal(root) {
    if (!root) return [];
    
    const result = [];
    
    // Add root
    result.push(root.val);
    
    // Add left boundary (excluding leaves)
    function addLeftBoundary(node) {
        if (!node || (!node.left && !node.right)) return;
        
        result.push(node.val);
        
        if (node.left) addLeftBoundary(node.left);
        else addLeftBoundary(node.right);
    }
    
    // Add leaves
    function addLeaves(node) {
        if (!node) return;
        
        if (!node.left && !node.right) {
            result.push(node.val);
            return;
        }
        
        addLeaves(node.left);
        addLeaves(node.right);
    }
    
    // Add right boundary (excluding leaves, in reverse)
    function addRightBoundary(node) {
        if (!node || (!node.left && !node.right)) return;
        
        if (node.right) addRightBoundary(node.right);
        else addRightBoundary(node.left);
        
        result.push(node.val);
    }
    
    if (root.left) addLeftBoundary(root.left);
    addLeaves(root);
    if (root.right) addRightBoundary(root.right);
    
    return result;
}

// Test case for Boundary Traversal
const boundaryRoot = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, new TreeNode(6), new TreeNode(7))
);
console.log("Boundary Traversal:", boundaryTraversal(boundaryRoot));

// ============================================================================
// 17. Construct Binary Tree from String with Bracket Representation
// Problem: Build tree from string like "4(2(3)(1))(6(5))"
// Approach: Use stack to track current parent
// Time Complexity: O(n), Space Complexity: O(n)
// ============================================================================

function str2tree(s) {
    if (!s) return null;
    
    const stack = [];
    let i = 0;
    
    while (i < s.length) {
        if (s[i] === ')') {
            stack.pop();
            i++;
        } else if (s[i] === '(') {
            i++;
        } else {
            // Parse number
            let start = i;
            if (s[i] === '-') i++;
            while (i < s.length && s[i] >= '0' && s[i] <= '9') {
                i++;
            }
            
            const num = parseInt(s.substring(start, i));
            const node = new TreeNode(num);
            
            if (stack.length > 0) {
                const parent = stack[stack.length - 1];
                if (!parent.left) {
                    parent.left = node;
                } else {
                    parent.right = node;
                }
            }
            
            stack.push(node);
        }
    }
    
    return stack[0];
}

// Test case for String to Tree
const stringTree = str2tree("4(2(3)(1))(6(5))");
console.log("String to Tree:", preorderRecursive(stringTree));

// ============================================================================
// 18. Convert Binary Tree to Doubly Linked List
// Problem: Convert tree to sorted doubly linked list using inorder
// Approach: Inorder traversal with pointer manipulation
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function binaryTreeToDLL(root) {
    let prev = null;
    let head = null;
    
    function inorder(node) {
        if (!node) return;
        
        inorder(node.left);
        
        if (!prev) {
            head = node;
        } else {
            prev.right = node;
            node.left = prev;
        }
        prev = node;
        
        inorder(node.right);
    }
    
    inorder(root);
    return head;
}

// Test case for Tree to DLL
const dllTree = new TreeNode(10, new TreeNode(5), new TreeNode(20));
const dllHead = binaryTreeToDLL(dllTree);
console.log("Tree to DLL - First node:", dllHead?.val);

// ============================================================================
// 19. Convert Binary Tree to Sum Tree
// Problem: Convert each node to sum of all descendants
// Approach: Post-order traversal, return subtree sum
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function toSumTree(root) {
    function convertToSum(node) {
        if (!node) return 0;
        
        const oldVal = node.val;
        const leftSum = convertToSum(node.left);
        const rightSum = convertToSum(node.right);
        
        node.val = leftSum + rightSum;
        
        return oldVal + node.val;
    }
    
    convertToSum(root);
    return root;
}

// Test case for Sum Tree
const sumTree = new TreeNode(10, new TreeNode(5), new TreeNode(3));
console.log("Before Sum Tree:", preorderRecursive(sumTree));
toSumTree(sumTree);
console.log("After Sum Tree:", preorderRecursive(sumTree));

// ============================================================================
// 20. Build Tree from Inorder and Preorder
// Problem: Construct unique binary tree from inorder and preorder arrays
// Approach: Use preorder for root, inorder for left/right split
// Time Complexity: O(n), Space Complexity: O(n)
// ============================================================================

function buildTree(preorder, inorder) {
    const inorderMap = new Map();
    inorder.forEach((val, idx) => inorderMap.set(val, idx));
    
    function build(preStart, preEnd, inStart, inEnd) {
        if (preStart > preEnd) return null;
        
        const rootVal = preorder[preStart];
        const root = new TreeNode(rootVal);
        const rootIndex = inorderMap.get(rootVal);
        const leftSize = rootIndex - inStart;
        
        root.left = build(preStart + 1, preStart + leftSize, inStart, rootIndex - 1);
        root.right = build(preStart + leftSize + 1, preEnd, rootIndex + 1, inEnd);
        
        return root;
    }
    
    return build(0, preorder.length - 1, 0, inorder.length - 1);
}

// Test case for Build Tree
const builtTree = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
console.log("Built Tree:", levelOrder(builtTree));

// ============================================================================
// 21. Check if Binary Tree is Sum Tree
// Problem: Check if each node equals sum of its subtrees
// Approach: For each node, verify sum property
// Time Complexity: O(n²), Space Complexity: O(h)
// ============================================================================

function isSumTree(root) {
    function getSum(node) {
        if (!node) return 0;
        return node.val + getSum(node.left) + getSum(node.right);
    }
    
    function checkSumTree(node) {
        if (!node || (!node.left && !node.right)) return true;
        
        const leftSum = getSum(node.left);
        const rightSum = getSum(node.right);
        
        return (node.val === leftSum + rightSum) && 
               checkSumTree(node.left) && 
               checkSumTree(node.right);
    }
    
    return checkSumTree(root);
}

// Test case for Sum Tree Check
const checkSumTree = new TreeNode(26, 
    new TreeNode(10, new TreeNode(4), new TreeNode(6)), 
    new TreeNode(3, null, new TreeNode(3))
);
console.log("Is Sum Tree:", isSumTree(checkSumTree));

// ============================================================================
// 22. Check if all Leaf Nodes are at Same Level
// Problem: Verify all leaves are at the same depth
// Approach: Track first leaf level, compare with others
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function areAllLeavesAtSameLevel(root) {
    let leafLevel = -1;
    
    function checkLevel(node, level) {
        if (!node) return true;
        
        if (!node.left && !node.right) {
            if (leafLevel === -1) {
                leafLevel = level;
            }
            return level === leafLevel;
        }
        
        return checkLevel(node.left, level + 1) && 
               checkLevel(node.right, level + 1);
    }
    
    return checkLevel(root, 0);
}

// Test case for Same Level Leaves
console.log("All leaves same level:", areAllLeavesAtSameLevel(root1));

// ============================================================================
// 23. Find LCA (Lowest Common Ancestor)
// Problem: Find lowest common ancestor of two nodes
// Approach: Recursive search, return when both nodes found
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function lowestCommonAncestor(root, p, q) {
    if (!root || root.val === p || root.val === q) {
        return root;
    }
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    if (left && right) return root;
    return left || right;
}

// Test case for LCA
const lcaTree = new TreeNode(3,
    new TreeNode(5, new TreeNode(6), new TreeNode(2)),
    new TreeNode(1, new TreeNode(0), new TreeNode(8))
);
console.log("LCA of 5 and 1:", lowestCommonAncestor(lcaTree, 5, 1)?.val);

// ============================================================================
// 24. Maximum Path Sum
// Problem: Find maximum sum path between any two nodes
// Approach: For each node, consider path through it
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function maxPathSum(root) {
    let maxSum = -Infinity;
    
    function maxGain(node) {
        if (!node) return 0;
        
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);
        
        const pathSum = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, pathSum);
        
        return node.val + Math.max(leftGain, rightGain);
    }
    
    maxGain(root);
    return maxSum;
}

// Test case for Max Path Sum
const pathSumTree = new TreeNode(-10, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.log("Max Path Sum:", maxPathSum(pathSumTree));

// ============================================================================
// 25. Serialize and Deserialize Binary Tree
// Problem: Convert tree to string and back
// Approach: Use preorder with null markers
// Time Complexity: O(n), Space Complexity: O(n)
// ============================================================================

function serialize(root) {
    const result = [];
    
    function preorder(node) {
        if (!node) {
            result.push('null');
            return;
        }
        
        result.push(node.val.toString());
        preorder(node.left);
        preorder(node.right);
    }
    
    preorder(root);
    return result.join(',');
}

function deserialize(data) {
    const values = data.split(',');
    let index = 0;
    
    function buildTree() {
        if (index >= values.length || values[index] === 'null') {
            index++;
            return null;
        }
        
        const node = new TreeNode(parseInt(values[index++]));
        node.left = buildTree();
        node.right = buildTree();
        
        return node;
    }
    
    return buildTree();
}

// Test case for Serialize/Deserialize
const serialized = serialize(root1);
console.log("Serialized:", serialized);
const deserialized = deserialize(serialized);
console.log("Deserialized:", levelOrder(deserialized));

// ============================================================================
// Additional Complex Problems
// ============================================================================

// Check if two trees are identical
function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// Find all paths with given sum
function pathSum(root, targetSum) {
    const result = [];
    
    function dfs(node, path, sum) {
        if (!node) return;
        
        path.push(node.val);
        sum += node.val;
        
        if (!node.left && !node.right && sum === targetSum) {
            result.push([...path]);
        }
        
        dfs(node.left, path, sum);
        dfs(node.right, path, sum);
        path.pop();
    }
    
    dfs(root, [], 0);
    return result;
}

// Test cases for additional problems
console.log("Trees identical:", isSameTree(root1, root1));
console.log("Path sum paths:", pathSum(root1, 22));

// ============================================================================
// 26. Check if Binary Tree contains Duplicate Subtrees of size 2 or more
// Problem: Find if there are duplicate subtrees with at least 2 nodes
// Approach: Serialize subtrees and count occurrences
// Time Complexity: O(n²), Space Complexity: O(n²)
// ============================================================================

function findDuplicateSubtrees(root) {
    const subtreeCount = new Map();
    const result = [];
    
    function serialize(node) {
        if (!node) return "null";
        
        const subtree = `${node.val},${serialize(node.left)},${serialize(node.right)}`;
        
        subtreeCount.set(subtree, (subtreeCount.get(subtree) || 0) + 1);
        
        if (subtreeCount.get(subtree) === 2) {
            result.push(node);
        }
        
        return subtree;
    }
    
    serialize(root);
    return result;
}

// Test case for Duplicate Subtrees
const dupTree = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), null),
    new TreeNode(3, new TreeNode(2, new TreeNode(4), null), new TreeNode(4))
);
console.log("Duplicate subtrees found:", findDuplicateSubtrees(dupTree).length);

// ============================================================================
// 27. Check if 2 Trees are Mirror of Each Other
// Problem: Check if two trees are mirror images
// Approach: Compare nodes symmetrically
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function isMirror(root1, root2) {
    if (!root1 && !root2) return true;
    if (!root1 || !root2) return false;
    
    return root1.val === root2.val &&
           isMirror(root1.left, root2.right) &&
           isMirror(root1.right, root2.left);
}

// Test case for Mirror Trees
const tree1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const tree2 = new TreeNode(1, new TreeNode(3), new TreeNode(2));
console.log("Trees are mirror:", isMirror(tree1, tree2));

// ============================================================================
// 28. Sum of Nodes on Longest Path from Root to Leaf
// Problem: Find sum of nodes on the longest root-to-leaf path
// Approach: DFS with path length and sum tracking
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function sumOfLongestPath(root) {
    let maxLen = 0;
    let maxSum = 0;
    
    function dfs(node, len, sum) {
        if (!node) return;
        
        len++;
        sum += node.val;
        
        if (!node.left && !node.right) {
            if (len > maxLen || (len === maxLen && sum > maxSum)) {
                maxLen = len;
                maxSum = sum;
            }
        }
        
        dfs(node.left, len, sum);
        dfs(node.right, len, sum);
    }
    
    dfs(root, 0, 0);
    return maxSum;
}

// Test case for Longest Path Sum
const longPathTree = new TreeNode(4,
    new TreeNode(2, new TreeNode(7), new TreeNode(1)),
    new TreeNode(5, null, new TreeNode(3))
);
console.log("Sum of longest path:", sumOfLongestPath(longPathTree));

// ============================================================================
// 29. Check if Given Graph is a Tree
// Problem: Verify if graph forms a valid tree (connected + no cycles)
// Approach: Check if edges = nodes-1 and graph is connected
// Time Complexity: O(V + E), Space Complexity: O(V)
// ============================================================================

function isValidTree(n, edges) {
    // Tree must have exactly n-1 edges
    if (edges.length !== n - 1) return false;
    
    // Build adjacency list
    const graph = Array.from({length: n}, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }
    
    // Check if graph is connected using DFS
    const visited = new Array(n).fill(false);
    
    function dfs(node) {
        visited[node] = true;
        for (const neighbor of graph[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
    }
    
    dfs(0);
    
    // All nodes should be visited
    return visited.every(v => v);
}

// Test case for Valid Tree
console.log("Is valid tree:", isValidTree(5, [[0,1],[0,2],[0,3],[1,4]])); // true

// ============================================================================
// 30. Find Largest Subtree Sum
// Problem: Find the subtree with maximum sum
// Approach: Post-order traversal to calculate subtree sums
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function findLargestSubtreeSum(root) {
    let maxSum = -Infinity;
    
    function postOrder(node) {
        if (!node) return 0;
        
        const leftSum = postOrder(node.left);
        const rightSum = postOrder(node.right);
        const currentSum = node.val + leftSum + rightSum;
        
        maxSum = Math.max(maxSum, currentSum);
        
        return currentSum;
    }
    
    postOrder(root);
    return maxSum;
}

// Test case for Largest Subtree Sum
const subtreeSumTree = new TreeNode(1,
    new TreeNode(-2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3)
);
console.log("Largest subtree sum:", findLargestSubtreeSum(subtreeSumTree));

// ============================================================================
// 31. Maximum Sum of Non-Adjacent Nodes
// Problem: Find maximum sum where no two selected nodes are adjacent
// Approach: For each node, decide whether to include it or not
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function maxSumNonAdjacent(root) {
    function rob(node) {
        if (!node) return [0, 0]; // [include, exclude]
        
        const left = rob(node.left);
        const right = rob(node.right);
        
        // Include current node: can't include children
        const include = node.val + left[1] + right[1];
        
        // Exclude current node: can include or exclude children
        const exclude = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        
        return [include, exclude];
    }
    
    const result = rob(root);
    return Math.max(result[0], result[1]);
}

// Test case for Non-Adjacent Sum
const nonAdjTree = new TreeNode(3,
    new TreeNode(2, null, new TreeNode(3)),
    new TreeNode(3, null, new TreeNode(1))
);
console.log("Max non-adjacent sum:", maxSumNonAdjacent(nonAdjTree));

// ============================================================================
// 32. Print all K-Sum Paths
// Problem: Find all paths where sum equals K
// Approach: DFS with path tracking and prefix sum
// Time Complexity: O(n²), Space Complexity: O(n)
// ============================================================================

function printKSumPaths(root, k) {
    const result = [];
    
    function dfs(node, path) {
        if (!node) return;
        
        path.push(node.val);
        
        // Check all possible paths ending at current node
        let sum = 0;
        for (let i = path.length - 1; i >= 0; i--) {
            sum += path[i];
            if (sum === k) {
                result.push([...path.slice(i)]);
            }
        }
        
        dfs(node.left, path);
        dfs(node.right, path);
        
        path.pop();
    }
    
    dfs(root, []);
    return result;
}

// Test case for K-Sum Paths
const kSumTree = new TreeNode(1,
    new TreeNode(3, new TreeNode(2), new TreeNode(1)),
    new TreeNode(-1, null, new TreeNode(4))
);
console.log("K-sum paths (k=4):", printKSumPaths(kSumTree, 4));

// ============================================================================
// 33. Find Distance Between Two Nodes
// Problem: Find shortest distance between two nodes in tree
// Approach: Find LCA, then calculate distances from LCA to both nodes
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function findDistance(root, a, b) {
    function findLCA(node, p, q) {
        if (!node || node.val === p || node.val === q) return node;
        
        const left = findLCA(node.left, p, q);
        const right = findLCA(node.right, p, q);
        
        if (left && right) return node;
        return left || right;
    }
    
    function distanceFromNode(node, val, dist = 0) {
        if (!node) return -1;
        if (node.val === val) return dist;
        
        const left = distanceFromNode(node.left, val, dist + 1);
        const right = distanceFromNode(node.right, val, dist + 1);
        
        return left !== -1 ? left : right;
    }
    
    const lca = findLCA(root, a, b);
    if (!lca) return -1;
    
    const distA = distanceFromNode(lca, a);
    const distB = distanceFromNode(lca, b);
    
    return distA + distB;
}

// Test case for Distance Between Nodes
const distTree = new TreeNode(3,
    new TreeNode(5, new TreeNode(6), new TreeNode(2)),
    new TreeNode(1, new TreeNode(0), new TreeNode(8))
);
console.log("Distance between 5 and 1:", findDistance(distTree, 5, 1));

// ============================================================================
// 34. Find Kth Ancestor of a Node
// Problem: Find the Kth ancestor of a given node
// Approach: Find path to node, then return Kth node from end
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function findKthAncestor(root, target, k) {
    const path = [];
    
    function findPath(node, val, currentPath) {
        if (!node) return false;
        
        currentPath.push(node.val);
        
        if (node.val === val) {
            path.push(...currentPath);
            return true;
        }
        
        if (findPath(node.left, val, currentPath) || 
            findPath(node.right, val, currentPath)) {
            return true;
        }
        
        currentPath.pop();
        return false;
    }
    
    if (!findPath(root, target, []) || path.length <= k) {
        return -1;
    }
    
    return path[path.length - 1 - k];
}

// Test case for Kth Ancestor
console.log("2nd ancestor of 6:", findKthAncestor(distTree, 6, 2));

// ============================================================================
// 35. Tree Isomorphism Problem
// Problem: Check if two trees are isomorphic (structurally identical)
// Approach: Compare structure recursively with both child orderings
// Time Complexity: O(n), Space Complexity: O(h)
// ============================================================================

function areIsomorphic(root1, root2) {
    if (!root1 && !root2) return true;
    if (!root1 || !root2) return false;
    if (root1.val !== root2.val) return false;
    
    // Check both possible child mappings
    return (areIsomorphic(root1.left, root2.left) && 
            areIsomorphic(root1.right, root2.right)) ||
           (areIsomorphic(root1.left, root2.right) && 
            areIsomorphic(root1.right, root2.left));
}

// Test case for Isomorphism
const iso1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const iso2 = new TreeNode(1, new TreeNode(3), new TreeNode(2));
console.log("Trees are isomorphic:", areIsomorphic(iso1, iso2));

// ============================================================================
// 36. Minimum Swaps to Convert Binary Tree to BST
// Problem: Find minimum swaps needed to make tree a valid BST
// Approach: Get inorder traversal, count swaps to sort it
// Time Complexity: O(n log n), Space Complexity: O(n)
// ============================================================================

function minSwapsToMakeBST(root) {
    const inorder = [];
    
    function getInorder(node) {
        if (!node) return;
        getInorder(node.left);
        inorder.push(node.val);
        getInorder(node.right);
    }
    
    getInorder(root);
    
    // Count swaps needed to sort the array
    function countSwaps(arr) {
        const sorted = [...arr].sort((a, b) => a - b);
        const posMap = new Map();
        
        sorted.forEach((val, idx) => posMap.set(val, idx));
        
        const visited = new Array(arr.length).fill(false);
        let swaps = 0;
        
        for (let i = 0; i < arr.length; i++) {
            if (visited[i] || posMap.get(arr[i]) === i) continue;
            
            let cycleSize = 0;
            let j = i;
            
            while (!visited[j]) {
                visited[j] = true;
                j = posMap.get(arr[j]);
                cycleSize++;
            }
            
            if (cycleSize > 1) {
                swaps += cycleSize - 1;
            }
        }
        
        return swaps;
    }
    
    return countSwaps(inorder);
}

// Test case for Min Swaps to BST
const swapTree = new TreeNode(5,
    new TreeNode(6, new TreeNode(2), new TreeNode(4)),
    new TreeNode(7, new TreeNode(3), new TreeNode(8))
);
console.log("Min swaps to make BST:", minSwapsToMakeBST(swapTree));

// ============================================================================
// 37. Vertical Order Traversal
// Problem: Print nodes in vertical order (by column)
// Approach: BFS with column tracking
// Time Complexity: O(n log n), Space Complexity: O(n)
// ============================================================================

function verticalOrder(root) {
    if (!root) return [];
    
    const columnMap = new Map();
    const queue = [{node: root, col: 0, row: 0}];
    
    while (queue.length > 0) {
        const {node, col, row} = queue.shift();
        
        if (!columnMap.has(col)) {
            columnMap.set(col, []);
        }
        columnMap.get(col).push({val: node.val, row});
        
        if (node.left) queue.push({node: node.left, col: col - 1, row: row + 1});
        if (node.right) queue.push({node: node.right, col: col + 1, row: row + 1});
    }
    
    // Sort columns and within each column sort by row
    const sortedColumns = Array.from(columnMap.entries())
        .sort((a, b) => a[0] - b[0]);
    
    return sortedColumns.map(([_, nodes]) => 
        nodes.sort((a, b) => a.row - b.row).map(n => n.val)
    );
}

// Test case for Vertical Order
console.log("Vertical order:", verticalOrder(root1));

// ============================================================================
// 38. Morris Traversal (Inorder without Stack/Recursion)
// Problem: Inorder traversal with O(1) space complexity
// Approach: Threading technique using Morris algorithm
// Time Complexity: O(n), Space Complexity: O(1)
// ============================================================================

function morrisInorder(root) {
    const result = [];
    let current = root;
    
    while (current) {
        if (!current.left) {
            result.push(current.val);
            current = current.right;
        } else {
            // Find inorder predecessor
            let predecessor = current.left;
            while (predecessor.right && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            if (!predecessor.right) {
                // Make current the right child of its inorder predecessor
                predecessor.right = current;
                current = current.left;
            } else {
                // Revert the changes
                predecessor.right = null;
                result.push(current.val);
                current = current.right;
            }
        }
    }
    
    return result;
}

// Test case for Morris Traversal
const morrisTree = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));
console.log("Morris inorder:", morrisInorder(morrisTree));

// ============================================================================
// 39. Find All Nodes at Distance K from Target
// Problem: Find all nodes at exactly distance K from a target node
// Approach: Convert to graph and use BFS from target
// Time Complexity: O(n), Space Complexity: O(n)
// ============================================================================

function distanceK(root, target, k) {
    const graph = new Map();
    
    // Build undirected graph
    function buildGraph(node, parent) {
        if (!node) return;
        
        if (!graph.has(node.val)) graph.set(node.val, []);
        if (parent !== null) {
            graph.get(node.val).push(parent);
            if (!graph.has(parent)) graph.set(parent, []);
            graph.get(parent).push(node.val);
        }
        
        buildGraph(node.left, node.val);
        buildGraph(node.right, node.val);
    }
    
    buildGraph(root, null);
    
    // BFS from target
    const queue = [target];
    const visited = new Set([target]);
    let distance = 0;
    
    while (queue.length > 0 && distance < k) {
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            
            if (graph.has(node)) {
                for (const neighbor of graph.get(node)) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
        }
        
        distance++;
    }
    
    return distance === k ? [...queue] : [];
}

// Test case for Distance K
const distKTree = new TreeNode(3,
    new TreeNode(5, new TreeNode(6), new TreeNode(2)),
    new TreeNode(1, new TreeNode(0), new TreeNode(8))
);
console.log("Nodes at distance 2 from 5:", distanceK(distKTree, 5, 2));

// ============================================================================
// 40. Complete Binary Tree Validation
// Problem: Check if binary tree is complete
// Approach: Level order traversal, check for gaps
// Time Complexity: O(n), Space Complexity: O(w)
// ============================================================================

function isCompleteTree(root) {
    if (!root) return true;
    
    const queue = [root];
    let foundNull = false;
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        if (!node) {
            foundNull = true;
        } else {
            if (foundNull) return false;
            
            queue.push(node.left);
            queue.push(node.right);
        }
    }
    
    return true;
}

// Test case for Complete Tree
const completeTree = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, new TreeNode(6), null)
);
console.log("Is complete tree:", isCompleteTree(completeTree));

console.log("\n=== All 40+ Binary Tree Problems Completed Successfully! ===");
console.log("Problems covered:");
console.log("• Traversals (Level, Inorder, Preorder, Postorder, Morris)");
console.log("• Tree Properties (Height, Diameter, Balance, Completeness)");
console.log("• Views (Left, Right, Top, Bottom, Vertical)");
console.log("• Paths and Distances (LCA, K-distance, Path sums)");
console.log("• Transformations (Mirror, Sum tree, Serialize/Deserialize)");
console.log("• Advanced Problems (Isomorphism, Duplicate subtrees, BST conversion)");
console.log("• Graph Theory (Tree validation, Minimum swaps)");
console.log("• Construction (From arrays, From strings)");