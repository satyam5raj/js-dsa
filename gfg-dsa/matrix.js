// ===== MATRIX PROBLEMS - COMPLETE SOLUTIONS =====

// 1. SPIRAL TRAVERSAL ON A MATRIX
/*
Problem: Traverse a matrix in spiral order (clockwise from outside to inside)
Example: [[1,2,3],[4,5,6],[7,8,9]] → [1,2,3,6,9,8,7,4,5]

Approach: 
- Use 4 boundaries: top, bottom, left, right
- Move right → down → left → up, shrinking boundaries after each direction
- Continue until all elements are visited

Time Complexity: O(m*n) - visit each element once
Space Complexity: O(1) - only boundary variables (excluding result array)
*/
function spiralTraversal(matrix) {
    if (!matrix || matrix.length === 0) return [];
    
    const result = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        // Move right across top row
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        top++;
        
        // Move down right column
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;
        
        // Move left across bottom row (if exists)
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i]);
            }
            bottom--;
        }
        
        // Move up left column (if exists)
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++;
        }
    }
    
    return result;
}

// Test
console.log("1. Spiral Traversal:", spiralTraversal([[1,2,3,4],[5,6,7,8],[9,10,11,12]]));
console.log("   Expected: [1,2,3,4,8,12,11,10,9,5,6,7]");

// 2. SEARCH AN ELEMENT IN A MATRIX
/*
Problem: Search for target element in a row-wise and column-wise sorted matrix
Example: Find 7 in [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]]

Approach: 
- Start from top-right corner (or bottom-left)
- If current > target: move left
- If current < target: move down
- If current == target: found

Time Complexity: O(m+n) - at most m+n steps
Space Complexity: O(1) - only position variables
*/
function searchMatrix(matrix, target) {
    if (!matrix || matrix.length === 0) return false;
    
    let row = 0;
    let col = matrix[0].length - 1;
    
    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] > target) {
            col--; // Move left
        } else {
            row++; // Move down
        }
    }
    
    return false;
}

// Test
const sortedMatrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]];
console.log("2. Search 5 in matrix:", searchMatrix(sortedMatrix, 5));
console.log("   Search 15 in matrix:", searchMatrix(sortedMatrix, 15));
console.log("   Expected: true, false");

// 3. FIND MEDIAN IN A ROW WISE SORTED MATRIX
/*
Problem: Find median of all elements in a matrix where each row is sorted
Example: [[1,3,5],[2,6,9],[3,6,9]] → median is 5

Approach: 
- Use binary search on the range [min_element, max_element]
- For each mid value, count elements ≤ mid using binary search on each row
- If count > total_elements/2, median is in left half, else right half

Time Complexity: O(r * log(c) * log(max-min)) - r rows, c columns
Space Complexity: O(1) - only variables
*/
function findMedianSortedMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Find min and max elements
    let min = matrix[0][0], max = matrix[0][cols - 1];
    for (let i = 1; i < rows; i++) {
        min = Math.min(min, matrix[i][0]);
        max = Math.max(max, matrix[i][cols - 1]);
    }
    
    const totalElements = rows * cols;
    const target = Math.floor(totalElements / 2);
    
    while (min < max) {
        const mid = Math.floor((min + max) / 2);
        let count = 0;
        
        // Count elements <= mid in each row
        for (let i = 0; i < rows; i++) {
            count += countSmallerEqual(matrix[i], mid);
        }
        
        if (count <= target) {
            min = mid + 1;
        } else {
            max = mid;
        }
    }
    
    return min;
}

function countSmallerEqual(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}

// Test
console.log("3. Median in matrix:", findMedianSortedMatrix([[1,3,5],[2,6,9],[3,6,9]]));
console.log("   Expected: 5");

// 4. FIND ROW WITH MAXIMUM NO. OF 1'S
/*
Problem: Find row with maximum number of 1's in binary matrix (0's followed by 1's)
Example: [[0,1,1,1],[0,0,1,1],[1,1,1,1],[0,0,0,0]] → row 2 has most 1's

Approach: 
- Since each row is sorted (0's then 1's), use binary search to find first 1
- Count 1's = total_columns - first_1_index
- Track row with maximum count

Time Complexity: O(r * log(c)) - binary search on each row
Space Complexity: O(1) - only variables
*/
function findMaxOnesRow(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let maxCount = 0;
    let maxRow = -1;
    
    for (let i = 0; i < rows; i++) {
        const firstOneIndex = findFirstOne(matrix[i]);
        const onesCount = firstOneIndex === -1 ? 0 : cols - firstOneIndex;
        
        if (onesCount > maxCount) {
            maxCount = onesCount;
            maxRow = i;
        }
    }
    
    return maxRow;
}

function findFirstOne(arr) {
    let left = 0, right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === 1) {
            result = mid;
            right = mid - 1; // Look for earlier occurrence
        } else {
            left = mid + 1;
        }
    }
    
    return result;
}

// Test
const binaryMatrix = [[0,1,1,1],[0,0,1,1],[1,1,1,1],[0,0,0,0]];
console.log("4. Row with max 1's:", findMaxOnesRow(binaryMatrix));
console.log("   Expected: 2 (0-indexed)");

// 5. PRINT ELEMENTS IN SORTED ORDER USING ROW-COLUMN WISE SORTED MATRIX
/*
Problem: Print all elements in sorted order from a matrix sorted row-wise and column-wise
Example: [[10,20,30,40],[15,25,35,45],[27,29,37,48],[32,33,39,50]]

Approach: 
- Use min-heap to store elements with their positions
- Start with first element of each row
- Extract min, add next element from same row if exists

Time Complexity: O(n * log(r)) - n elements, heap of size r
Space Complexity: O(r) - heap size equals number of rows
*/
function printSorted(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
    
    // Min heap: [value, row, col]
    const heap = [];
    
    // Add first element of each row
    for (let i = 0; i < rows; i++) {
        heap.push([matrix[i][0], i, 0]);
    }
    
    // Build heap
    heap.sort((a, b) => a[0] - b[0]);
    
    while (heap.length > 0) {
        const [val, row, col] = heap.shift();
        result.push(val);
        
        // Add next element from same row if exists
        if (col + 1 < cols) {
            insertIntoHeap(heap, [matrix[row][col + 1], row, col + 1]);
        }
    }
    
    return result;
}

function insertIntoHeap(heap, element) {
    heap.push(element);
    heap.sort((a, b) => a[0] - b[0]);
}

// Test
console.log("5. Elements in sorted order:", printSorted([[10,20,30,40],[15,25,35,45],[27,29,37,48]]));
console.log("   Expected: [10,15,20,25,27,29,30,35,37,40,45,48]");

// 6. MAXIMUM SIZE RECTANGLE
/*
Problem: Find the largest rectangle of 1's in a binary matrix
Example: [[1,0,1,0,0],[1,0,1,1,1],[1,1,1,1,1],[1,0,0,1,0]] → area = 6

Approach: 
- For each row, calculate histogram heights (consecutive 1's ending at current row)
- For each row's histogram, find largest rectangle area using stack
- Track maximum area across all rows

Time Complexity: O(r * c) - process each cell once
Space Complexity: O(c) - histogram array and stack
*/
function maxRectangle(matrix) {
    if (!matrix || matrix.length === 0) return 0;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    const heights = new Array(cols).fill(0);
    let maxArea = 0;
    
    for (let i = 0; i < rows; i++) {
        // Update heights for current row
        for (let j = 0; j < cols; j++) {
            heights[j] = matrix[i][j] === 1 ? heights[j] + 1 : 0;
        }
        
        // Find max rectangle in current histogram
        maxArea = Math.max(maxArea, largestRectangleInHistogram(heights));
    }
    
    return maxArea;
}

function largestRectangleInHistogram(heights) {
    const stack = [];
    let maxArea = 0;
    let index = 0;
    
    while (index < heights.length) {
        if (stack.length === 0 || heights[index] >= heights[stack[stack.length - 1]]) {
            stack.push(index++);
        } else {
            const top = stack.pop();
            const area = heights[top] * (stack.length === 0 ? index : index - stack[stack.length - 1] - 1);
            maxArea = Math.max(maxArea, area);
        }
    }
    
    while (stack.length > 0) {
        const top = stack.pop();
        const area = heights[top] * (stack.length === 0 ? index : index - stack[stack.length - 1] - 1);
        maxArea = Math.max(maxArea, area);
    }
    
    return maxArea;
}

// Test
const rectMatrix = [[1,0,1,0,0],[1,0,1,1,1],[1,1,1,1,1],[1,0,0,1,0]];
console.log("6. Max rectangle area:", maxRectangle(rectMatrix));
console.log("   Expected: 6");

// 7. FIND A SPECIFIC PAIR IN MATRIX
/*
Problem: Find maximum value of mat[c][d] - mat[a][b] where c > a and d > b
Example: [[1,2,-1,-4],[-8,-3,4,2],[1,8,10,1],[9,-2,-2,-4]] → max = 18

Approach: 
- For each position (i,j), track the minimum value in submatrix from (0,0) to (i,j)
- For each position, calculate difference with this minimum
- Track maximum difference

Time Complexity: O(r * c) - single pass through matrix
Space Complexity: O(r * c) - auxiliary matrix for minimums
*/
function findMaxDifference(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Create auxiliary matrix to store minimum values
    const minMatrix = Array(rows).fill().map(() => Array(cols).fill(0));
    
    // Initialize first element
    minMatrix[0][0] = matrix[0][0];
    
    // Fill first row
    for (let j = 1; j < cols; j++) {
        minMatrix[0][j] = Math.min(matrix[0][j], minMatrix[0][j - 1]);
    }
    
    // Fill first column
    for (let i = 1; i < rows; i++) {
        minMatrix[i][0] = Math.min(matrix[i][0], minMatrix[i - 1][0]);
    }
    
    // Fill rest of the matrix
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            minMatrix[i][j] = Math.min(matrix[i][j], 
                Math.min(minMatrix[i - 1][j], minMatrix[i][j - 1]));
        }
    }
    
    let maxDiff = Number.MIN_SAFE_INTEGER;
    
    // Find maximum difference
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            maxDiff = Math.max(maxDiff, matrix[i][j] - minMatrix[i - 1][j - 1]);
        }
    }
    
    return maxDiff;
}

// Test
const diffMatrix = [[1,2,-1,-4],[-8,-3,4,2],[1,8,10,1],[9,-2,-2,-4]];
console.log("7. Max difference:", findMaxDifference(diffMatrix));
console.log("   Expected: 18 (10 - (-8))");

// 8. ROTATE MATRIX BY 90 DEGREES
/*
Problem: Rotate matrix 90 degrees clockwise in-place
Example: [[1,2,3],[4,5,6],[7,8,9]] → [[7,4,1],[8,5,2],[9,6,3]]

Approach: 
- Transpose the matrix (swap matrix[i][j] with matrix[j][i])
- Reverse each row
- Alternative: Rotate layer by layer from outside to inside

Time Complexity: O(n²) - touch each element twice
Space Complexity: O(1) - in-place rotation
*/
function rotateMatrix90(matrix) {
    const n = matrix.length;
    
    // Method 1: Transpose + Reverse rows
    // Transpose
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
    
    return matrix;
}

// Alternative approach: Layer by layer rotation
function rotateMatrixLayerByLayer(matrix) {
    const n = matrix.length;
    
    for (let layer = 0; layer < Math.floor(n / 2); layer++) {
        const first = layer;
        const last = n - 1 - layer;
        
        for (let i = first; i < last; i++) {
            const offset = i - first;
            
            // Save top element
            const top = matrix[first][i];
            
            // left -> top
            matrix[first][i] = matrix[last - offset][first];
            
            // bottom -> left
            matrix[last - offset][first] = matrix[last][last - offset];
            
            // right -> bottom
            matrix[last][last - offset] = matrix[i][last];
            
            // top -> right
            matrix[i][last] = top;
        }
    }
    
    return matrix;
}

// Test
const squareMatrix = [[1,2,3],[4,5,6],[7,8,9]];
console.log("8. Matrix rotated 90°:", rotateMatrix90([...squareMatrix.map(row => [...row])]));
console.log("   Expected: [[7,4,1],[8,5,2],[9,6,3]]");

// 9. KTH SMALLEST ELEMENT IN A ROW-COLUMN WISE SORTED MATRIX
/*
Problem: Find kth smallest element in matrix sorted both row-wise and column-wise
Example: [[1,5,9],[10,11,13],[12,13,15]], k=8 → answer is 13

Approach: 
- Binary search on value range [min_element, max_element]
- For each mid value, count elements ≤ mid using efficient counting
- If count >= k, search left half, else search right half

Time Complexity: O((m+n) * log(max-min)) - counting is O(m+n)
Space Complexity: O(1) - only variables
*/
function kthSmallest(matrix, k) {
    const n = matrix.length;
    let left = matrix[0][0];
    let right = matrix[n - 1][n - 1];
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const count = countLessEqual(matrix, mid);
        
        if (count < k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

function countLessEqual(matrix, target) {
    let count = 0;
    let row = matrix.length - 1;
    let col = 0;
    
    while (row >= 0 && col < matrix[0].length) {
        if (matrix[row][col] <= target) {
            count += row + 1;
            col++;
        } else {
            row--;
        }
    }
    
    return count;
}

// Test
const kthMatrix = [[1,5,9],[10,11,13],[12,13,15]];
console.log("9. 8th smallest element:", kthSmallest(kthMatrix, 8));
console.log("   Expected: 13");

// 10. COMMON ELEMENTS IN ALL ROWS OF A GIVEN MATRIX
/*
Problem: Find elements that appear in all rows of the matrix
Example: [[1,2,1,4,8],[3,7,8,5,1],[8,7,7,3,1],[8,1,2,7,9]] → [1,8]

Approach: 
- Use first row as reference, count frequency of each element
- For each subsequent row, check if elements from first row exist
- Maintain frequency count, element is common if appears in all rows

Time Complexity: O(m * n) - scan each element
Space Complexity: O(n) - for frequency map
*/
function findCommonElements(matrix) {
    if (!matrix || matrix.length === 0) return [];
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Count frequency of elements in first row
    const firstRowMap = new Map();
    for (let j = 0; j < cols; j++) {
        firstRowMap.set(matrix[0][j], (firstRowMap.get(matrix[0][j]) || 0) + 1);
    }
    
    // For each subsequent row, check elements from first row
    for (let i = 1; i < rows; i++) {
        const currentRowSet = new Set(matrix[i]);
        
        // Decrease count for elements not in current row
        for (let [element, count] of firstRowMap) {
            if (!currentRowSet.has(element)) {
                firstRowMap.set(element, 0);
            }
        }
    }
    
    // Collect elements that appear in all rows
    const result = [];
    for (let [element, count] of firstRowMap) {
        if (count > 0) {
            result.push(element);
        }
    }
    
    return result.sort((a, b) => a - b);
}

// Test
const commonMatrix = [[1,2,1,4,8],[3,7,8,5,1],[8,7,7,3,1],[8,1,2,7,9]];
console.log("10. Common elements:", findCommonElements(commonMatrix));
console.log("    Expected: [1,8]");