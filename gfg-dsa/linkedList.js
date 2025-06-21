// LinkedList Node Class
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// DoublyLinkedList Node Class
class DoublyListNode {
    constructor(val = 0, prev = null, next = null) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

// Helper function to create linked list from array
function createLinkedList(arr) {
    if (!arr.length) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to print linked list
function printLinkedList(head) {
    let result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

// 1. Reverse a Linked List (Both Iterative and Recursive)
/**
 * Problem: Reverse a singly linked list
 * Approach: Use three pointers (prev, current, next) to reverse links
 * Time Complexity: O(n)
 * Space Complexity: O(1) for iterative, O(n) for recursive
 */

// Iterative Solution
function reverseListIterative(head) {
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

// Recursive Solution
function reverseListRecursive(head) {
    if (!head || !head.next) return head;
    
    let reversedHead = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    
    return reversedHead;
}

// Test Case
console.log("1. Reverse Linked List:");
let list1 = createLinkedList([1, 2, 3, 4, 5]);
console.log("Original:", printLinkedList(list1));
console.log("Reversed (Iterative):", printLinkedList(reverseListIterative(list1)));

list1 = createLinkedList([1, 2, 3, 4, 5]);
console.log("Reversed (Recursive):", printLinkedList(reverseListRecursive(list1)));

// 2. Reverse a Linked List in group of Given Size
/**
 * Problem: Reverse nodes in groups of k
 * Approach: Use recursion to reverse k nodes at a time
 * Time Complexity: O(n)
 * Space Complexity: O(n/k) for recursion stack
 */
function reverseKGroup(head, k) {
    let current = head;
    let count = 0;
    
    // Check if we have k nodes to reverse
    while (current && count < k) {
        current = current.next;
        count++;
    }
    
    if (count === k) {
        current = reverseKGroup(current, k);
        
        // Reverse first k nodes
        while (count > 0) {
            let temp = head.next;
            head.next = current;
            current = head;
            head = temp;
            count--;
        }
        head = current;
    }
    
    return head;
}

// Test Case
console.log("\n2. Reverse in Groups of K:");
let list2 = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8]);
console.log("Original:", printLinkedList(list2));
console.log("Reversed in groups of 3:", printLinkedList(reverseKGroup(list2, 3)));

// 3. Detect Loop in a Linked List
/**
 * Problem: Check if linked list has a cycle
 * Approach: Floyd's Cycle Detection (Tortoise and Hare)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function hasCycle(head) {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) return true;
    }
    
    return false;
}

// Test Case
console.log("\n3. Detect Loop:");
let list3 = createLinkedList([1, 2, 3, 4, 5]);
list3.next.next.next.next.next = list3.next; // Create cycle
console.log("Has cycle:", hasCycle(list3));

// 4. Delete Loop in a Linked List
/**
 * Problem: Remove cycle from linked list
 * Approach: First detect cycle, then find start and remove
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function removeLoop(head) {
    if (!head || !head.next) return head;
    
    let slow = head;
    let fast = head;
    
    // Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    
    if (slow !== fast) return head; // No cycle
    
    // Find start of cycle
    slow = head;
    while (slow.next !== fast.next) {
        slow = slow.next;
        fast = fast.next;
    }
    
    // Remove cycle
    fast.next = null;
    return head;
}

// 5. Find Starting Point of Loop
/**
 * Problem: Find the node where cycle begins
 * Approach: Floyd's algorithm + finding intersection
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function detectCycle(head) {
    if (!head || !head.next) return null;
    
    let slow = head;
    let fast = head;
    
    // Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    
    if (slow !== fast) return null;
    
    // Find start of cycle
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    return slow;
}

// 6. Remove Duplicates in Sorted Linked List
/**
 * Problem: Remove duplicate values from sorted list
 * Approach: Single pass comparison
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function deleteDuplicatesSorted(head) {
    if (!head) return head;
    
    let current = head;
    while (current.next) {
        if (current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return head;
}

// Test Case
console.log("\n6. Remove Duplicates (Sorted):");
let list6 = createLinkedList([1, 1, 2, 3, 3, 4, 5, 5]);
console.log("Original:", printLinkedList(list6));
console.log("After removing duplicates:", printLinkedList(deleteDuplicatesSorted(list6)));

// 7. Remove Duplicates in Unsorted Linked List
/**
 * Problem: Remove duplicates from unsorted list
 * Approach: Use Set to track seen values
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function deleteDuplicatesUnsorted(head) {
    if (!head) return head;
    
    let seen = new Set();
    let current = head;
    let prev = null;
    
    while (current) {
        if (seen.has(current.val)) {
            prev.next = current.next;
        } else {
            seen.add(current.val);
            prev = current;
        }
        current = current.next;
    }
    
    return head;
}

// Test Case
console.log("\n7. Remove Duplicates (Unsorted):");
let list7 = createLinkedList([1, 3, 2, 1, 4, 3, 5]);
console.log("Original:", printLinkedList(list7));
console.log("After removing duplicates:", printLinkedList(deleteDuplicatesUnsorted(list7)));

// 8. Move Last Element to Front
/**
 * Problem: Move the last node to the beginning
 * Approach: Find second last node and rearrange pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function moveLastToFront(head) {
    if (!head || !head.next) return head;
    
    let prev = null;
    let current = head;
    
    // Find last and second last
    while (current.next) {
        prev = current;
        current = current.next;
    }
    
    // Move last to front
    prev.next = null;
    current.next = head;
    
    return current;
}

// Test Case
console.log("\n8. Move Last to Front:");
let list8 = createLinkedList([1, 2, 3, 4, 5]);
console.log("Original:", printLinkedList(list8));
console.log("After moving last to front:", printLinkedList(moveLastToFront(list8)));

// 9. Add "1" to Number Represented as Linked List
/**
 * Problem: Add 1 to number stored as linked list (most significant digit first)
 * Approach: Reverse, add 1, handle carry, reverse back
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function addOne(head) {
    // Reverse the list
    head = reverseListIterative(head);
    
    let current = head;
    let carry = 1;
    
    while (current && carry) {
        let sum = current.val + carry;
        current.val = sum % 10;
        carry = Math.floor(sum / 10);
        
        if (!current.next && carry) {
            current.next = new ListNode(carry);
            carry = 0;
        }
        current = current.next;
    }
    
    // Reverse back
    return reverseListIterative(head);
}

// Test Case
console.log("\n9. Add 1 to Number:");
let list9 = createLinkedList([9, 9, 9]);
console.log("Original number:", printLinkedList(list9));
console.log("After adding 1:", printLinkedList(addOne(list9)));

// 10. Add Two Numbers Represented by Linked Lists
/**
 * Problem: Add two numbers stored as linked lists
 * Approach: Traverse both lists simultaneously, handle carry
 * Time Complexity: O(max(m,n))
 * Space Complexity: O(max(m,n))
 */
function addTwoNumbers(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        let sum = carry;
        if (l1) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2) {
            sum += l2.val;
            l2 = l2.next;
        }
        
        current.next = new ListNode(sum % 10);
        carry = Math.floor(sum / 10);
        current = current.next;
    }
    
    return dummy.next;
}

// Test Case
console.log("\n10. Add Two Numbers:");
let num1 = createLinkedList([2, 4, 3]); // 342
let num2 = createLinkedList([5, 6, 4]); // 465
console.log("Number 1:", printLinkedList(num1));
console.log("Number 2:", printLinkedList(num2));
console.log("Sum:", printLinkedList(addTwoNumbers(num1, num2))); // 807

// 11. Intersection of Two Sorted Linked Lists
/**
 * Problem: Find common elements in two sorted lists
 * Approach: Two pointers technique
 * Time Complexity: O(m + n)
 * Space Complexity: O(min(m,n))
 */
function getIntersection(head1, head2) {
    let dummy = new ListNode(0);
    let current = dummy;
    
    while (head1 && head2) {
        if (head1.val === head2.val) {
            current.next = new ListNode(head1.val);
            current = current.next;
            head1 = head1.next;
            head2 = head2.next;
        } else if (head1.val < head2.val) {
            head1 = head1.next;
        } else {
            head2 = head2.next;
        }
    }
    
    return dummy.next;
}

// Test Case
console.log("\n11. Intersection of Two Sorted Lists:");
let sortedList1 = createLinkedList([1, 2, 3, 4, 6]);
let sortedList2 = createLinkedList([2, 4, 6, 8]);
console.log("List 1:", printLinkedList(sortedList1));
console.log("List 2:", printLinkedList(sortedList2));
console.log("Intersection:", printLinkedList(getIntersection(sortedList1, sortedList2)));

// 12. Intersection Point of Two Linked Lists
/**
 * Problem: Find the node where two lists intersect
 * Approach: Two pointers with length difference
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;
    
    let pA = headA;
    let pB = headB;
    
    while (pA !== pB) {
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
    }
    
    return pA;
}

// 13. Merge Sort for Linked Lists
/**
 * Problem: Sort linked list using merge sort
 * Approach: Divide and conquer with merge
 * Time Complexity: O(n log n)
 * Space Complexity: O(log n)
 */
function mergeSort(head) {
    if (!head || !head.next) return head;
    
    // Split the list into two halves
    let mid = getMiddle(head);
    let left = head;
    let right = mid.next;
    mid.next = null;
    
    // Recursively sort both halves
    left = mergeSort(left);
    right = mergeSort(right);
    
    // Merge sorted halves
    return merge(left, right);
}

function getMiddle(head) {
    let slow = head;
    let fast = head;
    let prev = null;
    
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return prev;
}

function merge(left, right) {
    let dummy = new ListNode(0);
    let current = dummy;
    
    while (left && right) {
        if (left.val <= right.val) {
            current.next = left;
            left = left.next;
        } else {
            current.next = right;
            right = right.next;
        }
        current = current.next;
    }
    
    current.next = left || right;
    return dummy.next;
}

// Test Case
console.log("\n13. Merge Sort:");
let unsortedList = createLinkedList([4, 2, 1, 3, 5]);
console.log("Original:", printLinkedList(unsortedList));
console.log("Sorted:", printLinkedList(mergeSort(unsortedList)));

// 14. QuickSort for Linked Lists
/**
 * Problem: Sort linked list using quicksort
 * Approach: Partition around pivot
 * Time Complexity: O(n²) worst case, O(n log n) average
 * Space Complexity: O(log n)
 */
function quickSort(head) {
    if (!head || !head.next) return head;
    
    let pivot = partition(head);
    let left = head;
    let right = pivot.next;
    
    pivot.next = null;
    
    left = quickSort(left);
    right = quickSort(right);
    
    // Connect left part with pivot and right part
    if (left) {
        let temp = left;
        while (temp.next) temp = temp.next;
        temp.next = pivot;
    } else {
        left = pivot;
    }
    
    pivot.next = right;
    return left;
}

function partition(head) {
    let pivot = head;
    let current = head.next;
    let prev = head;
    
    while (current) {
        if (current.val < pivot.val) {
            prev.next = current.next;
            current.next = head;
            head = current;
            current = prev.next;
        } else {
            prev = current;
            current = current.next;
        }
    }
    
    return pivot;
}

// 15. Find Middle Element
/**
 * Problem: Find middle node of linked list
 * Approach: Fast and slow pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findMiddle(head) {
    if (!head) return null;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}

// Test Case
console.log("\n15. Find Middle Element:");
let list15 = createLinkedList([1, 2, 3, 4, 5]);
console.log("List:", printLinkedList(list15));
console.log("Middle element:", findMiddle(list15).val);

// 16. Check if Circular Linked List
/**
 * Problem: Check if linked list is circular
 * Approach: Floyd's cycle detection
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function isCircular(head) {
    if (!head) return false;
    
    let current = head.next;
    while (current && current !== head) {
        current = current.next;
    }
    
    return current === head;
}

// 17. Split Circular Linked List
/**
 * Problem: Split circular list into two halves
 * Approach: Find middle and split
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function splitCircularList(head) {
    if (!head || head.next === head) return [head, null];
    
    let slow = head;
    let fast = head;
    
    // Find middle
    while (fast.next !== head && fast.next.next !== head) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Split the list
    let head2 = slow.next;
    slow.next = head;
    
    // Make second half circular
    let current = head2;
    while (current.next !== head) {
        current = current.next;
    }
    current.next = head2;
    
    return [head, head2];
}

// 18. Check if Palindrome
/**
 * Problem: Check if linked list is palindrome
 * Approach: Find middle, reverse second half, compare
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function isPalindrome(head) {
    if (!head || !head.next) return true;
    
    // Find middle
    let slow = head;
    let fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    slow.next = reverseListIterative(slow.next);
    
    // Compare
    let p1 = head;
    let p2 = slow.next;
    
    while (p2) {
        if (p1.val !== p2.val) return false;
        p1 = p1.next;
        p2 = p2.next;
    }
    
    return true;
}

// Test Case
console.log("\n18. Check Palindrome:");
let palindromeList = createLinkedList([1, 2, 3, 2, 1]);
console.log("List:", printLinkedList(palindromeList));
console.log("Is palindrome:", isPalindrome(palindromeList));

// 19. Deletion from Circular Linked List
/**
 * Problem: Delete a node from circular linked list
 * Approach: Find node and adjust pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function deleteFromCircular(head, key) {
    if (!head) return null;
    
    if (head.val === key && head.next === head) return null;
    
    let current = head;
    let prev = null;
    
    // Find the node to delete
    do {
        if (current.val === key) break;
        prev = current;
        current = current.next;
    } while (current !== head);
    
    // If node found
    if (current.val === key) {
        if (current === head) {
            // Find last node
            while (prev.next !== head) {
                prev = prev.next;
            }
            head = head.next;
            prev.next = head;
        } else {
            prev.next = current.next;
        }
    }
    
    return head;
}

// 20. Reverse Doubly Linked List
/**
 * Problem: Reverse a doubly linked list
 * Approach: Swap prev and next pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function reverseDoublyLinkedList(head) {
    if (!head) return null;
    
    let current = head;
    let temp = null;
    
    while (current) {
        temp = current.prev;
        current.prev = current.next;
        current.next = temp;
        current = current.prev;
    }
    
    if (temp) head = temp.prev;
    return head;
}

// 21. Find Pairs with Given Sum in DLL
/**
 * Problem: Find pairs in sorted DLL with given sum
 * Approach: Two pointers from both ends
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findPairsWithSum(head, sum) {
    if (!head) return [];
    
    let left = head;
    let right = head;
    
    // Find the last node
    while (right.next) {
        right = right.next;
    }
    
    let pairs = [];
    
    while (left !== right && left.prev !== right) {
        let currentSum = left.val + right.val;
        
        if (currentSum === sum) {
            pairs.push([left.val, right.val]);
            left = left.next;
            right = right.prev;
        } else if (currentSum < sum) {
            left = left.next;
        } else {
            right = right.prev;
        }
    }
    
    return pairs;
}

// 22. Count Triplets with Given Sum in DLL
/**
 * Problem: Count triplets in sorted DLL with sum X
 * Approach: Fix one element, use two pointers for rest
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
function countTripletsWithSum(head, sum) {
    if (!head) return 0;
    
    let count = 0;
    let current = head;
    
    while (current) {
        let left = current.next;
        let right = head;
        
        // Find the last node
        while (right.next) {
            right = right.next;
        }
        
        while (left && right && left !== right && left.prev !== right) {
            let currentSum = current.val + left.val + right.val;
            
            if (currentSum === sum) {
                count++;
                left = left.next;
                right = right.prev;
            } else if (currentSum < sum) {
                left = left.next;
            } else {
                right = right.prev;
            }
        }
        
        current = current.next;
    }
    
    return count;
}

// 23. Sort K-Sorted Doubly Linked List
/**
 * Problem: Sort a DLL where each element is at most k positions away
 * Approach: Use min heap of size k+1
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 */
function sortKSortedDLL(head, k) {
    if (!head) return head;
    
    // Simple implementation using array (in practice, use priority queue)
    let arr = [];
    let current = head;
    let index = 0;
    
    // Fill initial window
    while (current && index <= k) {
        arr.push(current.val);
        current = current.next;
        index++;
    }
    arr.sort((a, b) => a - b);
    
    let result = head;
    index = 0;
    
    while (result) {
        result.val = arr[index % arr.length];
        if (current) {
            arr[index % arr.length] = current.val;
            arr.sort((a, b) => a - b);
            current = current.next;
        }
        result = result.next;
        index++;
    }
    
    return head;
}

// 24. Rotate DLL by N nodes
/**
 * Problem: Rotate doubly linked list by n positions
 * Approach: Find nth node and rearrange pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function rotateDLL(head, n) {
    if (!head || n === 0) return head;
    
    let current = head;
    let count = 1;
    
    // Find nth node
    while (count < n && current) {
        current = current.next;
        count++;
    }
    
    if (!current) return head;
    
    let nthNode = current;
    
    // Find last node
    while (current.next) {
        current = current.next;
    }
    
    // Rotate
    current.next = head;
    head.prev = current;
    head = nthNode.next;
    head.prev = null;
    nthNode.next = null;
    
    return head;
}

// 25. Can we reverse a linked list in less than O(n)?
/**
 * Answer: No, we cannot reverse a linked list in less than O(n) time
 * because we need to visit each node at least once to change its pointer.
 * This is a fundamental limitation as we need to process each element.
 */
console.log("\n25. Can we reverse in less than O(n)?");
console.log("No, we need to visit each node at least once - O(n) is optimal");

// 26. Why QuickSort for Arrays and MergeSort for LinkedLists?
/**
 * Answer: 
 * - QuickSort for Arrays: Better cache locality, in-place sorting
 * - MergeSort for LinkedLists: No random access penalty, stable, guaranteed O(n log n)
 */
console.log("\n26. Why QuickSort for Arrays and MergeSort for LinkedLists?");
console.log("Arrays: QuickSort has better cache locality and is in-place");
console.log("LinkedLists: MergeSort doesn't suffer from random access penalty");

// 27. Flatten a Linked List
/**
 * Problem: Flatten a multilevel linked list
 * Approach: DFS traversal
 * Time Complexity: O(n)
 * Space Complexity: O(d) where d is maximum depth
 */
function flatten(head) {
    if (!head) return head;
    
    let stack = [];
    let current = head;
    
    while (current) {
        if (current.child) {
            if (current.next) {
                stack.push(current.next);
            }
            current.next = current.child;
            current.child.prev = current;
            current.child = null;
        }
        
        if (!current.next && stack.length > 0) {
            let next = stack.pop();
            current.next = next;
            next.prev = current;
        }
        
        current = current.next;
    }
    
    return head;
}

// 28. Sort LL of 0's, 1's and 2's
/**
 * Problem: Sort linked list containing only 0, 1, 2
 * Approach: Count occurrences or three pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function sortColors(head) {
    let count = [0, 0, 0];
    let current = head;
    
    // Count occurrences
    while (current) {
        count[current.val]++;
        current = current.next;
    }
    
    // Reconstruct list
    current = head;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < count[i]; j++) {
            current.val = i;
            current = current.next;
        }
    }
    
    return head;
}

// Test Case
console.log("\n28. Sort 0's, 1's, 2's:");
let colorList = createLinkedList([0, 1, 2, 0, 1, 2, 1, 0]);
console.log("Original:", printLinkedList(colorList));
console.log("Sorted:", printLinkedList(sortColors(colorList)));

// 29. Clone LL with Next and Random Pointer
/**
 * Problem: Deep copy linked list with random pointers
 * Approach: Three pass algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
class RandomListNode {
    constructor(val = 0, next = null, random = null) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

function copyRandomList(head) {
    if (!head) return null;
    
    // First pass: create cloned nodes
    let current = head;
    while (current) {
        let cloned = new RandomListNode(current.val);
        cloned.next = current.next;
        current.next = cloned;
        current = cloned.next;
    }
    
    // Second pass: set random pointers
    current = head;
    while (current) {
        if (current.random) {
            current.next.random = current.random.next;
        }
        current = current.next.next;
    }
    
    // Third pass: separate the lists
    let dummy = new RandomListNode(0);
    let clonedCurrent = dummy;
    current = head;
    
    while (current) {
        clonedCurrent.next = current.next;
        current.next = current.next.next;
        current = current.next;
        clonedCurrent = clonedCurrent.next;
    }
    
    return dummy.next;
}

// 30. Merge K Sorted Linked Lists
/**
 * Problem: Merge k sorted linked lists
 * Approach: Divide and conquer or priority queue
 * Time Complexity: O(n log k) where n is total nodes
 * Space Complexity: O(log k)
 */
function mergeKLists(lists) {
    if (!lists || lists.length === 0) return null;
    
    while (lists.length > 1) {
        let mergedLists = [];
        
        for (let i = 0; i < lists.length; i += 2) {
            let l1 = lists[i];
            let l2 = i + 1 < lists.length ? lists[i + 1] : null;
            mergedLists.push(merge(l1, l2));
        }
        
        lists = mergedLists;
    }
    
    return lists[0];
}

// Test Case
console.log("\n30. Merge K Sorted Lists:");
let list1_k = createLinkedList([1, 4, 5]);
let list2_k = createLinkedList([1, 3, 4]);
let list3_k = createLinkedList([2, 6]);
console.log("List 1:", printLinkedList(list1_k));
console.log("List 2:", printLinkedList(list2_k));
console.log("List 3:", printLinkedList(list3_k));
console.log("Merged:", printLinkedList(mergeKLists([list1_k, list2_k, list3_k])));

// 31. Multiply 2 Numbers Represented by LL
/**
 * Problem: Multiply two numbers represented as linked lists
 * Approach: Convert to numbers, multiply, convert back
 * Time Complexity: O(m + n)
 * Space Complexity: O(m + n)
 */
function multiplyTwoLists(l1, l2) {
    let num1 = 0, num2 = 0;
    let MOD = 1000000007;
    
    // Convert first number
    while (l1) {
        num1 = (num1 * 10 + l1.val) % MOD;
        l1 = l1.next;
    }
    
    // Convert second number
    while (l2) {
        num2 = (num2 * 10 + l2.val) % MOD;
        l2 = l2.next;
    }
    
    return (num1 * num2) % MOD;
}

// Test Case
console.log("\n31. Multiply Two Numbers:");
let mult1 = createLinkedList([1, 2, 3]); // 123
let mult2 = createLinkedList([4, 5, 6]); // 456
console.log("Number 1:", printLinkedList(mult1));
console.log("Number 2:", printLinkedList(mult2));
console.log("Product:", multiplyTwoLists(mult1, mult2)); // Should be 123 × 456 = 56088

// 32. Delete Nodes with Greater Value on Right
/**
 * Problem: Delete nodes that have a greater value on the right side
 * Approach: Reverse, keep track of max, reverse back
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function deleteNodesWithGreaterOnRight(head) {
    if (!head) return null;
    
    // Reverse the list
    head = reverseListIterative(head);
    
    let current = head;
    let maxSoFar = head.val;
    
    while (current.next) {
        if (current.next.val < maxSoFar) {
            current.next = current.next.next;
        } else {
            current = current.next;
            maxSoFar = current.val;
        }
    }
    
    // Reverse back
    return reverseListIterative(head);
}

// Test Case
console.log("\n32. Delete Nodes with Greater Value on Right:");
let deleteList = createLinkedList([12, 15, 10, 11, 5, 6, 2, 3]);
console.log("Original:", printLinkedList(deleteList));
console.log("After deletion:", printLinkedList(deleteNodesWithGreaterOnRight(deleteList)));

// 33. Segregate Even and Odd Nodes
/**
 * Problem: Segregate even and odd nodes in linked list
 * Approach: Maintain two separate lists for even and odd
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function segregateEvenOdd(head) {
    if (!head) return head;
    
    let evenHead = null, evenTail = null;
    let oddHead = null, oddTail = null;
    let current = head;
    
    while (current) {
        if (current.val % 2 === 0) {
            if (!evenHead) {
                evenHead = evenTail = current;
            } else {
                evenTail.next = current;
                evenTail = current;
            }
        } else {
            if (!oddHead) {
                oddHead = oddTail = current;
            } else {
                oddTail.next = current;
                oddTail = current;
            }
        }
        current = current.next;
    }
    
    // Connect even and odd lists
    if (evenTail) evenTail.next = oddHead;
    if (oddTail) oddTail.next = null;
    
    return evenHead ? evenHead : oddHead;
}

// Test Case
console.log("\n33. Segregate Even and Odd:");
let segregateList = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8]);
console.log("Original:", printLinkedList(segregateList));
console.log("Segregated:", printLinkedList(segregateEvenOdd(segregateList)));

// 34. Nth Node from End
/**
 * Problem: Find nth node from the end of linked list
 * Approach: Two pointers with n gap
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function nthFromEnd(head, n) {
    if (!head || n <= 0) return null;
    
    let first = head;
    let second = head;
    
    // Move first pointer n steps ahead
    for (let i = 0; i < n; i++) {
        if (!first) return null; // n is greater than length
        first = first.next;
    }
    
    // Move both pointers until first reaches end
    while (first) {
        first = first.next;
        second = second.next;
    }
    
    return second;
}

// Test Case
console.log("\n34. Nth Node from End:");
let nthList = createLinkedList([1, 2, 3, 4, 5, 6, 7]);
console.log("List:", printLinkedList(nthList));
console.log("3rd from end:", nthFromEnd(nthList, 3)?.val);

// Additional Helper Functions and Test Cases

// Helper function to create doubly linked list
function createDoublyLinkedList(arr) {
    if (!arr.length) return null;
    
    let head = new DoublyListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        let newNode = new DoublyListNode(arr[i]);
        current.next = newNode;
        newNode.prev = current;
        current = newNode;
    }
    
    return head;
}

// Helper function to print doubly linked list
function printDoublyLinkedList(head) {
    let result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

// Test Case for Doubly Linked List operations
console.log("\n20. Reverse Doubly Linked List:");
let dllList = createDoublyLinkedList([1, 2, 3, 4, 5]);
console.log("Original DLL:", printDoublyLinkedList(dllList));
console.log("Reversed DLL:", printDoublyLinkedList(reverseDoublyLinkedList(dllList)));

// Summary of Time and Space Complexities
console.log("\n=== SUMMARY OF COMPLEXITIES ===");
console.log("1. Reverse LL: O(n) time, O(1) space (iterative), O(n) space (recursive)");
console.log("2. Reverse in K groups: O(n) time, O(n/k) space");
console.log("3. Detect Cycle: O(n) time, O(1) space");
console.log("4. Remove Cycle: O(n) time, O(1) space");
console.log("5. Find Cycle Start: O(n) time, O(1) space");
console.log("6. Remove Duplicates (Sorted): O(n) time, O(1) space");
console.log("7. Remove Duplicates (Unsorted): O(n) time, O(n) space");
console.log("8. Move Last to Front: O(n) time, O(1) space");
console.log("9. Add One: O(n) time, O(1) space");
console.log("10. Add Two Numbers: O(max(m,n)) time, O(max(m,n)) space");
console.log("11. Intersection of Sorted Lists: O(m+n) time, O(min(m,n)) space");
console.log("12. Intersection Point: O(m+n) time, O(1) space");
console.log("13. Merge Sort: O(n log n) time, O(log n) space");
console.log("14. Quick Sort: O(n²) worst, O(n log n) average time, O(log n) space");
console.log("15. Find Middle: O(n) time, O(1) space");
console.log("16-34. Various other operations with their respective complexities");

console.log("\n=== KEY INSIGHTS ===");
console.log("• Two-pointer technique is very effective for many LL problems");
console.log("• Floyd's cycle detection is crucial for cycle-related problems");
console.log("• Reversing parts of LL is a common technique");
console.log("• Merge sort is preferred over quick sort for linked lists");
console.log("• Space complexity can often be optimized to O(1) with careful pointer manipulation");
console.log("• Many problems can be solved by combining basic operations like reverse, merge, etc.");