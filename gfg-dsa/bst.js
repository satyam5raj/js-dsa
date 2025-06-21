// Binary Search Tree Node Definition
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// =============================================================================
// Problem 1: Find a value in a BST
// =============================================================================
// Question: Given a BST and a target value, return true if the value exists in the BST
// Approach: Use BST property - go left if target < current, right if target > current
// Time Complexity: O(log n) average, O(n) worst case
// Space Complexity: O(log n) for recursion stack

function searchBST(root, val) {
    if (!root) return false;
    
    if (root.val === val) return true;
    
    if (val < root.val) {
        return searchBST(root.left, val);
    } else {
        return searchBST(root.right, val);
    }
}

// Iterative approach
function searchBSTIterative(root, val) {
    while (root) {
        if (root.val === val) return true;
        if (val < root.val) {
            root = root.left;
        } else {
            root = root.right;
        }
    }
    return false;
}

// Test Case 1
const testTree1 = new TreeNode(4,
    new TreeNode(2, new TreeNode(1), new TreeNode(3)),
    new TreeNode(7)
);
console.log("Test 1 - Search for 2:", searchBST(testTree1, 2)); // true
console.log("Test 1 - Search for 5:", searchBST(testTree1, 5)); // false

// =============================================================================
// Problem 2: Deletion of a node in a BST
// =============================================================================
// Question: Delete a node with given value from BST
// Approach: Three cases - no child, one child, two children (replace with inorder successor)
// Time Complexity: O(log n) average, O(n) worst case
// Space Complexity: O(log n) for recursion

function deleteNode(root, key) {
    if (!root) return null;
    
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // Node to be deleted found
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        
        // Node has two children - find inorder successor
        let successor = root.right;
        while (successor.left) {
            successor = successor.left;
        }
        
        root.val = successor.val;
        root.right = deleteNode(root.right, successor.val);
    }
    
    return root;
}

// Test Case 2
const testTree2 = new TreeNode(5,
    new TreeNode(3, new TreeNode(2), new TreeNode(4)),
    new TreeNode(6, null, new TreeNode(7))
);
const deletedTree = deleteNode(testTree2, 3);
console.log("Test 2 - After deleting 3, inorder:", inorderTraversal(deletedTree));

// =============================================================================
// Problem 3: Find min and max value in a BST
// =============================================================================
// Question: Find minimum and maximum values in a BST
// Approach: Min is leftmost node, Max is rightmost node
// Time Complexity: O(log n) average, O(n) worst case
// Space Complexity: O(1) iterative, O(log n) recursive

function findMin(root) {
    if (!root) return null;
    while (root.left) {
        root = root.left;
    }
    return root.val;
}

function findMax(root) {
    if (!root) return null;
    while (root.right) {
        root = root.right;
    }
    return root.val;
}

// Test Case 3
const testTree3 = new TreeNode(4,
    new TreeNode(2, new TreeNode(1), new TreeNode(3)),
    new TreeNode(6, new TreeNode(5), new TreeNode(7))
);
console.log("Test 3 - Min value:", findMin(testTree3)); // 1
console.log("Test 3 - Max value:", findMax(testTree3)); // 7

// =============================================================================
// Problem 4: Find inorder successor and predecessor in a BST
// =============================================================================
// Question: Find inorder successor and predecessor of a given node
// Approach: Successor is smallest in right subtree or ancestor. Predecessor is largest in left subtree or ancestor
// Time Complexity: O(log n) average, O(n) worst case
// Space Complexity: O(1)

function findSuccessor(root, val) {
    let successor = null;
    
    while (root) {
        if (val < root.val) {
            successor = root;
            root = root.left;
        } else {
            root = root.right;
        }
    }
    
    return successor ? successor.val : null;
}

function findPredecessor(root, val) {
    let predecessor = null;
    
    while (root) {
        if (val > root.val) {
            predecessor = root;
            root = root.right;
        } else {
            root = root.left;
        }
    }
    
    return predecessor ? predecessor.val : null;
}

// Test Case 4
console.log("Test 4 - Successor of 2:", findSuccessor(testTree3, 2)); // 3
console.log("Test 4 - Predecessor of 5:", findPredecessor(testTree3, 5)); // 4

// =============================================================================
// Problem 5: Check if a tree is a BST or not
// =============================================================================
// Question: Validate if a binary tree is a valid BST
// Approach: Use bounds checking - ensure each node is within valid range
// Time Complexity: O(n)
// Space Complexity: O(log n) for recursion

function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    
    if (root.val <= min || root.val >= max) {
        return false;
    }
    
    return isValidBST(root.left, min, root.val) && 
           isValidBST(root.right, root.val, max);
}

// Test Case 5
const validBST = new TreeNode(5,
    new TreeNode(3, new TreeNode(2), new TreeNode(4)),
    new TreeNode(7, new TreeNode(6), new TreeNode(8))
);
const invalidBST = new TreeNode(5,
    new TreeNode(3, new TreeNode(2), new TreeNode(6)),
    new TreeNode(7)
);
console.log("Test 5 - Valid BST:", isValidBST(validBST)); // true
console.log("Test 5 - Invalid BST:", isValidBST(invalidBST)); // false

// =============================================================================
// Problem 6: Populate Inorder successor of all nodes
// =============================================================================
// Question: For each node, populate the inorder successor
// Approach: Use reverse inorder traversal to keep track of next node
// Time Complexity: O(n)
// Space Complexity: O(log n) for recursion

class TreeNodeWithNext extends TreeNode {
    constructor(val, left = null, right = null, next = null) {
        super(val, left, right);
        this.next = next;
    }
}

function populateInorderSuccessor(root) {
    let next = null;
    
    function reverseInorder(node) {
        if (!node) return;
        
        reverseInorder(node.right);
        node.next = next;
        next = node;
        reverseInorder(node.left);
    }
    
    reverseInorder(root);
    return root;
}

// Test Case 6
const testTree6 = new TreeNodeWithNext(4,
    new TreeNodeWithNext(2, new TreeNodeWithNext(1), new TreeNodeWithNext(3)),
    new TreeNodeWithNext(6, new TreeNodeWithNext(5), new TreeNodeWithNext(7))
);
populateInorderSuccessor(testTree6);
console.log("Test 6 - Node 2's successor:", testTree6.left.next ? testTree6.left.next.val : null); // 3

// =============================================================================
// Problem 7: Find LCA of 2 nodes in a BST
// =============================================================================
// Question: Find Lowest Common Ancestor of two nodes in BST
// Approach: Use BST property - if both nodes are on same side, go that direction
// Time Complexity: O(log n) average, O(n) worst case
// Space Complexity: O(1) iterative

function lowestCommonAncestor(root, p, q) {
    while (root) {
        if (p < root.val && q < root.val) {
            root = root.left;
        } else if (p > root.val && q > root.val) {
            root = root.right;
        } else {
            return root.val;
        }
    }
    return null;
}

// Test Case 7
console.log("Test 7 - LCA of 2 and 6:", lowestCommonAncestor(testTree3, 2, 6)); // 4

// =============================================================================
// Problem 8: Construct BST from preorder traversal
// =============================================================================
// Question: Construct BST from given preorder traversal
// Approach: Use bounds to validate and construct recursively
// Time Complexity: O(n)
// Space Complexity: O(n)

function bstFromPreorder(preorder) {
    let index = 0;
    
    function build(min, max) {
        if (index >= preorder.length) return null;
        
        let val = preorder[index];
        if (val < min || val > max) return null;
        
        index++;
        let root = new TreeNode(val);
        root.left = build(min, val);
        root.right = build(val, max);
        
        return root;
    }
    
    return build(-Infinity, Infinity);
}

// Test Case 8
const preorderArray = [8, 5, 1, 7, 10, 12];
const constructedBST = bstFromPreorder(preorderArray);
console.log("Test 8 - Constructed BST inorder:", inorderTraversal(constructedBST));

// =============================================================================
// Problem 9: Convert Binary tree into BST
// =============================================================================
// Question: Convert a binary tree to BST while maintaining structure
// Approach: Get inorder traversal, sort it, then fill back using inorder
// Time Complexity: O(n log n)
// Space Complexity: O(n)

function binaryTreeToBST(root) {
    const values = [];
    
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        values.push(node.val);
        inorder(node.right);
    }
    
    inorder(root);
    values.sort((a, b) => a - b);
    
    let index = 0;
    function fillInorder(node) {
        if (!node) return;
        fillInorder(node.left);
        node.val = values[index++];
        fillInorder(node.right);
    }
    
    fillInorder(root);
    return root;
}

// Test Case 9
const binaryTree = new TreeNode(10,
    new TreeNode(30, new TreeNode(20), null),
    new TreeNode(15, new TreeNode(5), null)
);
const convertedBST = binaryTreeToBST(binaryTree);
console.log("Test 9 - Converted to BST:", inorderTraversal(convertedBST));

// =============================================================================
// Problem 10: Convert a normal BST into a Balanced BST
// =============================================================================
// Question: Convert BST to balanced BST
// Approach: Get sorted array from inorder, then build balanced BST
// Time Complexity: O(n)
// Space Complexity: O(n)

function balanceBST(root) {
    const values = [];
    
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        values.push(node.val);
        inorder(node.right);
    }
    
    inorder(root);
    
    function buildBalanced(start, end) {
        if (start > end) return null;
        
        let mid = Math.floor((start + end) / 2);
        let root = new TreeNode(values[mid]);
        
        root.left = buildBalanced(start, mid - 1);
        root.right = buildBalanced(mid + 1, end);
        
        return root;
    }
    
    return buildBalanced(0, values.length - 1);
}

// Test Case 10
const unbalancedBST = new TreeNode(1,
    null,
    new TreeNode(2, null, new TreeNode(3, null, new TreeNode(4)))
);
const balancedBST = balanceBST(unbalancedBST);
console.log("Test 10 - Balanced BST inorder:", inorderTraversal(balancedBST));

// =============================================================================
// Problem 11: Merge two BST [V.V.V>IMP]
// =============================================================================
// Question: Merge two BSTs into one balanced BST
// Approach: Get inorder of both BSTs, merge sorted arrays, build balanced BST
// Time Complexity: O(m + n)
// Space Complexity: O(m + n)

function mergeTwoBSTs(root1, root2) {
    function getInorder(root) {
        const values = [];
        
        function inorder(node) {
            if (!node) return;
            inorder(node.left);
            values.push(node.val);
            inorder(node.right);
        }
        
        inorder(root);
        return values;
    }
    
    function mergeSortedArrays(arr1, arr2) {
        const merged = [];
        let i = 0, j = 0;
        
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] <= arr2[j]) {
                merged.push(arr1[i++]);
            } else {
                merged.push(arr2[j++]);
            }
        }
        
        while (i < arr1.length) merged.push(arr1[i++]);
        while (j < arr2.length) merged.push(arr2[j++]);
        
        return merged;
    }
    
    function buildBST(values, start, end) {
        if (start > end) return null;
        
        let mid = Math.floor((start + end) / 2);
        let root = new TreeNode(values[mid]);
        
        root.left = buildBST(values, start, mid - 1);
        root.right = buildBST(values, mid + 1, end);
        
        return root;
    }
    
    const values1 = getInorder(root1);
    const values2 = getInorder(root2);
    const merged = mergeSortedArrays(values1, values2);
    
    return buildBST(merged, 0, merged.length - 1);
}

// Test Case 11
const bst1 = new TreeNode(3, new TreeNode(1), new TreeNode(5));
const bst2 = new TreeNode(4, new TreeNode(2), new TreeNode(6));
const mergedBST = mergeTwoBSTs(bst1, bst2);
console.log("Test 11 - Merged BST inorder:", inorderTraversal(mergedBST));

// =============================================================================
// Problem 12: Find Kth largest element in a BST
// =============================================================================
// Question: Find the Kth largest element in BST
// Approach: Reverse inorder traversal (right, root, left)
// Time Complexity: O(k) best case, O(n) worst case
// Space Complexity: O(log n)

function kthLargest(root, k) {
    let count = 0;
    let result = null;
    
    function reverseInorder(node) {
        if (!node || result !== null) return;
        
        reverseInorder(node.right);
        count++;
        
        if (count === k) {
            result = node.val;
            return;
        }
        
        reverseInorder(node.left);
    }
    
    reverseInorder(root);
    return result;
}

// Test Case 12
console.log("Test 12 - 3rd largest in testTree3:", kthLargest(testTree3, 3)); // 5

// =============================================================================
// Problem 13: Find Kth smallest element in a BST
// =============================================================================
// Question: Find the Kth smallest element in BST
// Approach: Inorder traversal (left, root, right)
// Time Complexity: O(k) best case, O(n) worst case
// Space Complexity: O(log n)

function kthSmallest(root, k) {
    let count = 0;
    let result = null;
    
    function inorder(node) {
        if (!node || result !== null) return;
        
        inorder(node.left);
        count++;
        
        if (count === k) {
            result = node.val;
            return;
        }
        
        inorder(node.right);
    }
    
    inorder(root);
    return result;
}

// Test Case 13
console.log("Test 13 - 3rd smallest in testTree3:", kthSmallest(testTree3, 3)); // 3

// =============================================================================
// Problem 14: Count pairs from 2 BST whose sum is equal to given value "X"
// =============================================================================
// Question: Count pairs (one from each BST) that sum to X
// Approach: Get inorder of both BSTs, use two pointers
// Time Complexity: O(m + n)
// Space Complexity: O(m + n)

function countPairs(root1, root2, x) {
    function getInorder(root) {
        const values = [];
        
        function inorder(node) {
            if (!node) return;
            inorder(node.left);
            values.push(node.val);
            inorder(node.right);
        }
        
        inorder(root);
        return values;
    }
    
    const arr1 = getInorder(root1);
    const arr2 = getInorder(root2);
    
    let count = 0;
    let left = 0, right = arr2.length - 1;
    
    while (left < arr1.length && right >= 0) {
        const sum = arr1[left] + arr2[right];
        
        if (sum === x) {
            count++;
            left++;
            right--;
        } else if (sum < x) {
            left++;
        } else {
            right--;
        }
    }
    
    return count;
}

// Test Case 14
console.log("Test 14 - Pairs with sum 7:", countPairs(bst1, bst2, 7)); // Count pairs

// =============================================================================
// Problem 15: Find the median of BST in O(n) time and O(1) space
// =============================================================================
// Question: Find median of BST with O(1) space
// Approach: Morris inorder traversal to find median without extra space
// Time Complexity: O(n)
// Space Complexity: O(1)

function findMedian(root) {
    function countNodes(node) {
        if (!node) return 0;
        return 1 + countNodes(node.left) + countNodes(node.right);
    }
    
    const totalNodes = countNodes(root);
    const targetIndex = Math.floor(totalNodes / 2);
    let currentIndex = 0;
    let median = null;
    
    function inorderMorris(root) {
        let current = root;
        
        while (current) {
            if (!current.left) {
                if (currentIndex === targetIndex) {
                    median = current.val;
                    return;
                }
                currentIndex++;
                current = current.right;
            } else {
                let predecessor = current.left;
                while (predecessor.right && predecessor.right !== current) {
                    predecessor = predecessor.right;
                }
                
                if (!predecessor.right) {
                    predecessor.right = current;
                    current = current.left;
                } else {
                    predecessor.right = null;
                    if (currentIndex === targetIndex) {
                        median = current.val;
                        return;
                    }
                    currentIndex++;
                    current = current.right;
                }
            }
        }
    }
    
    inorderMorris(root);
    return median;
}

// Test Case 15
console.log("Test 15 - Median of testTree3:", findMedian(testTree3)); // Median value

// =============================================================================
// Problem 16: Count BST nodes that lie in a given range
// =============================================================================
// Question: Count nodes in BST that lie in range [low, high]
// Approach: Use BST property to prune search space
// Time Complexity: O(k) where k is nodes in range
// Space Complexity: O(log n)

function countNodesInRange(root, low, high) {
    if (!root) return 0;
    
    if (root.val < low) {
        return countNodesInRange(root.right, low, high);
    } else if (root.val > high) {
        return countNodesInRange(root.left, low, high);
    } else {
        return 1 + countNodesInRange(root.left, low, high) + 
                   countNodesInRange(root.right, low, high);
    }
}

// Test Case 16
console.log("Test 16 - Nodes in range [2, 6]:", countNodesInRange(testTree3, 2, 6)); // Count

// =============================================================================
// Problem 17: Replace every element with the least greater element on its right
// =============================================================================
// Question: Replace each element with the smallest element greater than it on the right
// Approach: Build BST from right to left, for each element find successor
// Time Complexity: O(n log n)
// Space Complexity: O(n)

function replaceWithLeastGreater(arr) {
    const result = new Array(arr.length).fill(-1);
    let root = null;
    
    function insert(root, val, successor) {
        if (!root) return new TreeNode(val);
        
        if (val < root.val) {
            successor.value = root.val;
            root.left = insert(root.left, val, successor);
        } else {
            root.right = insert(root.right, val, successor);
        }
        
        return root;
    }
    
    for (let i = arr.length - 1; i >= 0; i--) {
        const successor = { value: -1 };
        root = insert(root, arr[i], successor);
        result[i] = successor.value;
    }
    
    return result;
}

// Test Case 17
const testArray = [8, 58, 71, 18, 31, 32, 63, 92, 43, 3, 91, 93, 25, 80, 28];
console.log("Test 17 - Replace with least greater:", replaceWithLeastGreater(testArray));

// =============================================================================
// Problem 18: Given "n" appointments, find the conflicting appointments
// =============================================================================
// Question: Find conflicting appointment intervals
// Approach: Sort by start time, check for overlaps
// Time Complexity: O(n log n)
// Space Complexity: O(1)

function findConflictingAppointments(appointments) {
    appointments.sort((a, b) => a[0] - b[0]);
    const conflicts = [];
    
    for (let i = 1; i < appointments.length; i++) {
        if (appointments[i][0] < appointments[i-1][1]) {
            conflicts.push([appointments[i-1], appointments[i]]);
        }
    }
    
    return conflicts;
}

// Test Case 18
const appointments = [[1, 3], [2, 4], [5, 7], [6, 8]];
console.log("Test 18 - Conflicting appointments:", findConflictingAppointments(appointments));

// =============================================================================
// Problem 19: Check preorder is valid or not
// =============================================================================
// Question: Check if given preorder traversal represents a valid BST
// Approach: Use stack to maintain valid range for each node
// Time Complexity: O(n)
// Space Complexity: O(n)

function canRepresentBST(preorder) {
    const stack = [];
    let root = -Infinity;
    
    for (let val of preorder) {
        if (val < root) return false;
        
        while (stack.length > 0 && stack[stack.length - 1] < val) {
            root = stack.pop();
        }
        
        stack.push(val);
    }
    
    return true;
}

// Test Case 19
const validPreorder = [40, 30, 35, 80, 100];
const invalidPreorder = [40, 30, 35, 20, 80, 100];
console.log("Test 19 - Valid preorder:", canRepresentBST(validPreorder)); // true
console.log("Test 19 - Invalid preorder:", canRepresentBST(invalidPreorder)); // false

// =============================================================================
// Problem 20: Check whether BST contains Dead end
// =============================================================================
// Question: Check if BST has a dead end (leaf node where no insertion possible)
// Approach: For each leaf, check if min and max possible values differ by 1
// Time Complexity: O(n)
// Space Complexity: O(log n)

function isDeadEnd(root) {
    function hasDeadEnd(node, min, max) {
        if (!node) return false;
        
        if (!node.left && !node.right) {
            return (min === max);
        }
        
        return hasDeadEnd(node.left, min, node.val - 1) ||
               hasDeadEnd(node.right, node.val + 1, max);
    }
    
    return hasDeadEnd(root, 1, Infinity);
}

// Test Case 20
const deadEndBST = new TreeNode(8,
    new TreeNode(5, new TreeNode(2, new TreeNode(1)), new TreeNode(7)),
    new TreeNode(11, new TreeNode(10), null)
);
console.log("Test 20 - Has dead end:", isDeadEnd(deadEndBST));

// =============================================================================
// Problem 21: Largest BST in a Binary Tree [V.V.V.V.V IMP]
// =============================================================================
// Question: Find size of largest BST in a binary tree
// Approach: Post-order traversal with validation info
// Time Complexity: O(n)
// Space Complexity: O(log n)

function largestBST(root) {
    let maxSize = 0;
    
    function helper(node) {
        if (!node) return { isBST: true, size: 0, min: Infinity, max: -Infinity };
        
        const left = helper(node.left);
        const right = helper(node.right);
        
        if (left.isBST && right.isBST && 
            node.val > left.max && node.val < right.min) {
            
            const size = left.size + right.size + 1;
            maxSize = Math.max(maxSize, size);
            
            return {
                isBST: true,
                size: size,
                min: left.size === 0 ? node.val : left.min,
                max: right.size === 0 ? node.val : right.max
            };
        }
        
        return { isBST: false, size: 0, min: 0, max: 0 };
    }
    
    helper(root);
    return maxSize;
}

// Test Case 21
const mixedTree = new TreeNode(10,
    new TreeNode(5, new TreeNode(1), new TreeNode(8)),
    new TreeNode(15, new TreeNode(7), new TreeNode(20))
);
console.log("Test 21 - Largest BST size:", largestBST(mixedTree));

// =============================================================================
// Problem 22: Flatten BST to sorted list
// =============================================================================
// Question: Flatten BST to a sorted linked list (right pointers only)
// Approach: Inorder traversal and modify pointers
// Time Complexity: O(n)
// Space Complexity: O(log n)

function flattenBST(root) {
    let prev = null;
    
    function inorder(node) {
        if (!node) return;
        
        inorder(node.left);
        
        if (prev) {
            prev.right = node;
            prev.left = null;
        }
        prev = node;
        
        inorder(node.right);
    }
    
    inorder(root);
    
    // Find the new root (leftmost node)
    while (root && root.left) {
        root = root.left;
    }
    
    return root;
}

// Test Case 22
const testTree22 = new TreeNode(5,
    new TreeNode(3, new TreeNode(2), new TreeNode(4)),
    new TreeNode(6, null, new TreeNode(8))
);
const flattened = flattenBST(testTree22);
console.log("Test 22 - Flattened BST (first 3 values):", 
    flattened.val, flattened.right.val, flattened.right.right.val);

// Helper function for inorder traversal (used in tests)
function inorderTraversal(root) {
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

console.log("\n=== ALL BST PROBLEMS COMPLETED ===");
console.log("Each problem includes:");
console.log("1. Problem statement and question");
console.log("2. Approach explanation");
console.log("3. Time and Space complexity analysis");
console.log("4. Complete working solution");
console.log("5. Test cases with expected outputs");