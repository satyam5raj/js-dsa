// You are given a partially filled 9x9 Sudoku board. Your task is to determine if the board is valid.
// A Sudoku board is valid if:
// 1. Each row contains the digits 1-9 without repetition.
// 2. Each column contains the digits 1-9 without repetition.
// 3. Each of the 9 subgrids (3x3) contains the digits 1-9 without repetition.
// Only the filled cells (non-"." cells) need to be validated. Empty cells (".") can be ignored.
// Input:
// A 9x9 grid, where each cell contains:
// • A digit from '1' to '9'
// • A dot (".") representing an empty cell.
// Output:
// • Return true if the board is valid according to the rules.
// • Return false if the board violates any of the rules.
// Example:
// Input:
const board = [
 ["5", "3", ".", ".", "7", ".", ".", ".", "."],
 ["6", ".", ".", "1", "9", "5", ".", ".", "."],
 [".", "9", "8", ".", ".", ".", ".", "6", "."],
 ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
 ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
 ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
 [".", "6", ".", ".", ".", ".", "2", "8", "."],
 [".", ".", ".", "4", "1", "9", ".", ".", "5"],
 [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]
// Output: true

// Solve this in all the possible way and at last give me the optimized way
// Also add the console statement for better understanding the code


// function isValidSudoku(board) {
//   console.log("=== Validating Rows ===");
//   // Validate rows
//   for (let i = 0; i < 9; i++) {
//     const rowSet = new Set();
//     console.log(`\nChecking row ${i}:`, board[i]);
//     for (let j = 0; j < 9; j++) {
//       const val = board[i][j];
//       if (val !== '.') {
//         console.log(`Checking value "${val}" at row ${i}, column ${j}`);
//         if (rowSet.has(val)) {
//           console.log(`❌ Duplicate "${val}" found in row ${i}`);
//           return false;
//         }
//         rowSet.add(val);
//         console.log(`✅ Added "${val}" to row ${i} set`);
//       }
//     }
//     console.log(`Row ${i} is valid. Row set:`, rowSet);
//   }

//   console.log("\n=== Validating Columns ===");
//   // Validate columns
//   for (let j = 0; j < 9; j++) {
//     const colSet = new Set();
//     console.log(`\nChecking column ${j}`);
//     for (let i = 0; i < 9; i++) {
//       const val = board[i][j];
//       if (val !== '.') {
//         console.log(`Checking value "${val}" at row ${i}, column ${j}`);
//         if (colSet.has(val)) {
//           console.log(`❌ Duplicate "${val}" found in column ${j}`);
//           return false;
//         }
//         colSet.add(val);
//         console.log(`✅ Added "${val}" to column ${j} set`);
//       }
//     }
//     console.log(`Column ${j} is valid. Column set:`, colSet);
//   }

//   console.log("\n=== Validating 3x3 Boxes ===");
//   // Validate 3x3 boxes
//   for (let boxRow = 0; boxRow < 3; boxRow++) {
//     for (let boxCol = 0; boxCol < 3; boxCol++) {
//       const boxSet = new Set();
//       const startRow = boxRow * 3;
//       const startCol = boxCol * 3;
//       console.log(`\nChecking 3x3 box starting at (${startRow}, ${startCol})`);
//       for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//           const row = startRow + i;
//           const col = startCol + j;
//           const val = board[row][col];
//           if (val !== '.') {
//             console.log(`Checking value "${val}" at row ${row}, column ${col}`);
//             if (boxSet.has(val)) {
//               console.log(`❌ Duplicate "${val}" found in 3x3 box starting at (${startRow}, ${startCol})`);
//               return false;
//             }
//             boxSet.add(val);
//             console.log(`✅ Added "${val}" to 3x3 box set`);
//           }
//         }
//       }
//       console.log(`3x3 box starting at (${startRow}, ${startCol}) is valid. Box set:`, boxSet);
//     }
//   }

//   console.log("\n✅ Sudoku board is valid.");
//   return true;
// }


// function isValidSudoku(board) {
//   // Initialize row, column, and box sets
//   const rows = Array.from({ length: 9 }, () => new Set());
//   const cols = Array.from({ length: 9 }, () => new Set());
//   const boxes = Array.from({ length: 9 }, () => new Set());

//   console.log("Initial empty Sets for rows, columns, and boxes created.\n");

//   for (let r = 0; r < 9; r++) {
//     console.log(`\n--- Checking row ${r} ---`);
//     for (let c = 0; c < 9; c++) {
//       const val = board[r][c];
//       console.log(`\nProcessing cell [${r}][${c}] = "${val}"`);

//       if (val === '.') {
//         console.log("Skipped empty cell.");
//         continue;
//       }

//       const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
//       console.log(`Calculated box index: ${boxIndex}`);

//       // Check if value already exists
//       if (rows[r].has(val)) {
//         console.log(`❌ Duplicate "${val}" found in row ${r}`);
//         return false;
//       }
//       if (cols[c].has(val)) {
//         console.log(`❌ Duplicate "${val}" found in column ${c}`);
//         return false;
//       }
//       if (boxes[boxIndex].has(val)) {
//         console.log(`❌ Duplicate "${val}" found in box ${boxIndex}`);
//         return false;
//       }

//       // Add value to sets
//       rows[r].add(val);
//       cols[c].add(val);
//       boxes[boxIndex].add(val);
//       console.log(`✅ "${val}" added to:`);
//       console.log(`   - Row ${r}:`, Array.from(rows[r]));
//       console.log(`   - Column ${c}:`, Array.from(cols[c]));
//       console.log(`   - Box ${boxIndex}:`, Array.from(boxes[boxIndex]));
//     }
//   }

//   console.log("\n✅ All cells validated. Sudoku board is valid.");
//   return true;
// }

var isValidSudoku = function(board) {
    const mySet = new Set();

    for(let i =0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            if(board[i][j]!='.')
            {
                if(
                    mySet.has(board[i][j]+ " found in row " + i) ||
                    mySet.has(board[i][j]+ " found in column " + j) ||
                    mySet.has(board[i][j]+ " found in box " + Math.floor(i/3) + "-" +Math.floor(j/3))
                )
                {
                    return false;
                }
                mySet.add(board[i][j]+ " found in row " + i)
                mySet.add(board[i][j]+ " found in column " + j)
                mySet.add(board[i][j]+ " found in box " + Math.floor(i/3) + "-" +Math.floor(j/3))
            }
        }
    }
    return true;
};

console.log(isValidSudoku(board));