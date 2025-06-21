// ================================ GREEDY ALGORITHM PROBLEMS ================================

// 1. Activity Selection Problem
/*
Problem: Given n activities with their start and finish times. Select the maximum number of activities that can be performed by a single person, assuming that a person can only work on a single activity at a time.

Approach: Sort activities by finish time and greedily select activities that don't overlap with previously selected ones.
Time Complexity: O(n log n) for sorting
Space Complexity: O(1)
*/

function activitySelection(start, finish) {
    const n = start.length;
    const activities = [];
    
    // Create array of activities with their indices
    for (let i = 0; i < n; i++) {
        activities.push({start: start[i], finish: finish[i], index: i});
    }
    
    // Sort by finish time
    activities.sort((a, b) => a.finish - b.finish);
    
    const selected = [];
    selected.push(activities[0].index);
    let lastFinish = activities[0].finish;
    
    // Greedily select non-overlapping activities
    for (let i = 1; i < n; i++) {
        if (activities[i].start >= lastFinish) {
            selected.push(activities[i].index);
            lastFinish = activities[i].finish;
        }
    }
    
    return selected;
}

// Test case for Activity Selection
console.log("1. Activity Selection Problem:");
const start1 = [1, 3, 0, 5, 8, 5];
const finish1 = [2, 4, 6, 7, 9, 9];
console.log("Selected activities:", activitySelection(start1, finish1));
console.log("Expected: [0, 1, 3, 4] or similar valid combination\n");

// 2. Job Sequencing Problem
/*
Problem: Given an array of jobs where every job has a deadline and profit if completed before deadline. Find the sequence of jobs to maximize profit.

Approach: Sort jobs by profit in descending order. Use a boolean array to track free time slots and assign jobs to latest possible slot before deadline.
Time Complexity: O(n^2)
Space Complexity: O(n)
*/

function jobSequencing(jobs) {
    // Sort jobs by profit in descending order
    jobs.sort((a, b) => b.profit - a.profit);
    
    const maxDeadline = Math.max(...jobs.map(job => job.deadline));
    const slots = new Array(maxDeadline).fill(false);
    const result = [];
    let totalProfit = 0;
    
    for (let job of jobs) {
        // Find a free slot before deadline
        for (let j = Math.min(maxDeadline, job.deadline) - 1; j >= 0; j--) {
            if (!slots[j]) {
                slots[j] = true;
                result.push(job.id);
                totalProfit += job.profit;
                break;
            }
        }
    }
    
    return {sequence: result, profit: totalProfit};
}

// Test case for Job Sequencing
console.log("2. Job Sequencing Problem:");
const jobs2 = [
    {id: 'a', deadline: 2, profit: 100},
    {id: 'b', deadline: 1, profit: 19},
    {id: 'c', deadline: 2, profit: 27},
    {id: 'd', deadline: 1, profit: 25},
    {id: 'e', deadline: 3, profit: 15}
];
console.log("Job sequence:", jobSequencing(jobs2));
console.log("Expected: {sequence: ['a', 'c', 'e'], profit: 142}\n");

// 3. Huffman Coding
/*
Problem: Build Huffman tree for given characters and their frequencies to get optimal prefix codes.

Approach: Use min-heap to repeatedly merge two nodes with minimum frequency until one node remains.
Time Complexity: O(n log n)
Space Complexity: O(n)
*/

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    insert(node) {
        this.heap.push(node);
        this.heapifyUp(this.heap.length - 1);
    }
    
    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }
    
    heapifyUp(index) {
        const parent = Math.floor((index - 1) / 2);
        if (parent >= 0 && this.heap[parent].freq > this.heap[index].freq) {
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            this.heapifyUp(parent);
        }
    }
    
    heapifyDown(index) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let smallest = index;
        
        if (left < this.heap.length && this.heap[left].freq < this.heap[smallest].freq) {
            smallest = left;
        }
        if (right < this.heap.length && this.heap[right].freq < this.heap[smallest].freq) {
            smallest = right;
        }
        
        if (smallest !== index) {
            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            this.heapifyDown(smallest);
        }
    }
    
    size() {
        return this.heap.length;
    }
}

class HuffmanNode {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

function huffmanCoding(chars, freqs) {
    const heap = new MinHeap();
    
    // Create leaf nodes and add to heap
    for (let i = 0; i < chars.length; i++) {
        heap.insert(new HuffmanNode(chars[i], freqs[i]));
    }
    
    // Build Huffman tree
    while (heap.size() > 1) {
        const left = heap.extractMin();
        const right = heap.extractMin();
        const merged = new HuffmanNode(null, left.freq + right.freq, left, right);
        heap.insert(merged);
    }
    
    const root = heap.extractMin();
    const codes = {};
    
    function generateCodes(node, code = '') {
        if (node.char !== null) {
            codes[node.char] = code || '0'; // Handle single character case
            return;
        }
        generateCodes(node.left, code + '0');
        generateCodes(node.right, code + '1');
    }
    
    generateCodes(root);
    return codes;
}

// Test case for Huffman Coding
console.log("3. Huffman Coding:");
const chars3 = ['a', 'b', 'c', 'd', 'e', 'f'];
const freqs3 = [5, 9, 12, 13, 16, 45];
console.log("Huffman codes:", huffmanCoding(chars3, freqs3));
console.log("Expected: Variable length codes based on frequency\n");

// 4. Water Connection Problem
/*
Problem: Connect houses to water tanks with minimum cost pipes.

Approach: Use Disjoint Set Union (DSU) to find connected components and calculate minimum cost.
Time Complexity: O(n log n)
Space Complexity: O(n)
*/

function waterConnection(houses, tanks, pipes) {
    // Sort pipes by cost
    pipes.sort((a, b) => a.cost - b.cost);
    
    const parent = Array.from({length: houses + tanks + 1}, (_, i) => i);
    
    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    function union(x, y) {
        const px = find(x);
        const py = find(y);
        if (px !== py) {
            parent[px] = py;
            return true;
        }
        return false;
    }
    
    let totalCost = 0;
    const selectedPipes = [];
    
    for (let pipe of pipes) {
        if (union(pipe.from, pipe.to)) {
            selectedPipes.push(pipe);
            totalCost += pipe.cost;
        }
    }
    
    return {pipes: selectedPipes, cost: totalCost};
}

// Test case for Water Connection
console.log("4. Water Connection Problem:");
const pipes4 = [
    {from: 1, to: 2, cost: 10},
    {from: 2, to: 3, cost: 15},
    {from: 1, to: 3, cost: 20}
];
console.log("Water connection:", waterConnection(3, 0, pipes4));
console.log("Expected: Minimum spanning tree with cost 25\n");

// 5. Fractional Knapsack Problem
/*
Problem: Given weights and values of items, put items in knapsack of capacity W to get maximum value. Items can be broken.

Approach: Sort items by value/weight ratio in descending order. Add complete items first, then fractional part.
Time Complexity: O(n log n)
Space Complexity: O(1)
*/

function fractionalKnapsack(weights, values, capacity) {
    const items = [];
    for (let i = 0; i < weights.length; i++) {
        items.push({
            weight: weights[i],
            value: values[i],
            ratio: values[i] / weights[i],
            index: i
        });
    }
    
    // Sort by value/weight ratio in descending order
    items.sort((a, b) => b.ratio - a.ratio);
    
    let totalValue = 0;
    let remainingCapacity = capacity;
    const selectedItems = [];
    
    for (let item of items) {
        if (remainingCapacity >= item.weight) {
            // Take complete item
            totalValue += item.value;
            remainingCapacity -= item.weight;
            selectedItems.push({index: item.index, fraction: 1});
        } else if (remainingCapacity > 0) {
            // Take fractional part
            const fraction = remainingCapacity / item.weight;
            totalValue += item.value * fraction;
            selectedItems.push({index: item.index, fraction: fraction});
            remainingCapacity = 0;
            break;
        }
    }
    
    return {maxValue: totalValue, items: selectedItems};
}

// Test case for Fractional Knapsack
console.log("5. Fractional Knapsack Problem:");
const weights5 = [10, 20, 30];
const values5 = [60, 100, 120];
const capacity5 = 50;
console.log("Fractional knapsack:", fractionalKnapsack(weights5, values5, capacity5));
console.log("Expected: {maxValue: 240, items: [...]\n");

// 6. Minimum number of Coins
/*
Problem: Find minimum number of coins needed to make a given amount.

Approach: Use greedy approach - always pick the largest denomination possible.
Time Complexity: O(n) where n is number of denominations
Space Complexity: O(1)
*/

function minCoins(coins, amount) {
    // Sort coins in descending order
    coins.sort((a, b) => b - a);
    
    const result = [];
    let remaining = amount;
    
    for (let coin of coins) {
        const count = Math.floor(remaining / coin);
        if (count > 0) {
            result.push({coin: coin, count: count});
            remaining -= coin * count;
        }
    }
    
    if (remaining > 0) {
        return {possible: false, coins: []};
    }
    
    const totalCoins = result.reduce((sum, item) => sum + item.count, 0);
    return {possible: true, coins: result, totalCoins: totalCoins};
}

// Test case for Minimum Coins
console.log("6. Minimum number of Coins:");
const coins6 = [1, 2, 5, 10, 20, 50, 100, 500, 1000];
const amount6 = 93;
console.log("Min coins:", minCoins(coins6, amount6));
console.log("Expected: Minimum number of coins to make 93\n");

// 7. Maximum trains for which stoppage can be provided
/*
Problem: Given arrival and departure times of trains, find maximum number of trains that can be accommodated.

Approach: Same as activity selection - sort by departure time and select non-overlapping trains.
Time Complexity: O(n log n)
Space Complexity: O(n)
*/

function maxTrains(arrivals, departures) {
    const trains = [];
    for (let i = 0; i < arrivals.length; i++) {
        trains.push({arrival: arrivals[i], departure: departures[i], index: i});
    }
    
    // Sort by departure time
    trains.sort((a, b) => a.departure - b.departure);
    
    const selected = [];
    selected.push(trains[0].index);
    let lastDeparture = trains[0].departure;
    
    for (let i = 1; i < trains.length; i++) {
        if (trains[i].arrival >= lastDeparture) {
            selected.push(trains[i].index);
            lastDeparture = trains[i].departure;
        }
    }
    
    return {count: selected.length, trains: selected};
}

// Test case for Maximum Trains
console.log("7. Maximum trains for which stoppage can be provided:");
const arrivals7 = [1, 3, 0, 5, 8, 5];
const departures7 = [2, 4, 6, 7, 9, 9];
console.log("Max trains:", maxTrains(arrivals7, departures7));
console.log("Expected: Maximum number of non-overlapping trains\n");

// 8. Minimum Platforms Problem
/*
Problem: Find minimum number of platforms required for a railway station.

Approach: Sort arrival and departure arrays. Use two pointers to track when platforms are needed/freed.
Time Complexity: O(n log n)
Space Complexity: O(1)
*/

function minPlatforms(arrivals, departures) {
    arrivals.sort((a, b) => a - b);
    departures.sort((a, b) => a - b);
    
    let platforms = 1;
    let maxPlatforms = 1;
    let i = 1, j = 0;
    
    while (i < arrivals.length && j < departures.length) {
        if (arrivals[i] <= departures[j]) {
            platforms++;
            i++;
        } else {
            platforms--;
            j++;
        }
        maxPlatforms = Math.max(maxPlatforms, platforms);
    }
    
    return maxPlatforms;
}

// Test case for Minimum Platforms
console.log("8. Minimum Platforms Problem:");
const arrivals8 = [900, 940, 950, 1100, 1500, 1800];
const departures8 = [910, 1200, 1120, 1130, 1900, 2000];
console.log("Min platforms:", minPlatforms(arrivals8, departures8));
console.log("Expected: 3\n");

// 9. Buy Maximum Stocks
/*
Problem: On i-th day, you can buy at most i stocks. Find maximum stocks you can buy with given money.

Approach: Sort stock prices with their day information. Buy cheapest stocks first within day limits.
Time Complexity: O(n log n)
Space Complexity: O(n)
*/

function buyMaxStocks(prices, money) {
    const stocks = [];
    for (let i = 0; i < prices.length; i++) {
        stocks.push({price: prices[i], day: i + 1});
    }
    
    // Sort by price
    stocks.sort((a, b) => a.price - b.price);
    
    let totalStocks = 0;
    let remainingMoney = money;
    
    for (let stock of stocks) {
        const maxBuyable = Math.min(stock.day, Math.floor(remainingMoney / stock.price));
        totalStocks += maxBuyable;
        remainingMoney -= maxBuyable * stock.price;
    }
    
    return totalStocks;
}

// Test case for Buy Maximum Stocks
console.log("9. Buy Maximum Stocks:");
const prices9 = [7, 10, 4];
const money9 = 100;
console.log("Max stocks:", buyMaxStocks(prices9, money9));
console.log("Expected: Maximum stocks buyable with constraint\n");

// 10. Minimum and Maximum amount to buy all N candies
/*
Problem: In a candy store, for every candy you buy, you get K other candies for free. Find min and max amount to buy all candies.

Approach: For minimum - buy expensive candies to get cheaper ones free. For maximum - buy cheap candies to get expensive ones free.
Time Complexity: O(n log n)
Space Complexity: O(1)
*/

function candyStore(prices, k) {
    prices.sort((a, b) => a - b);
    const n = prices.length;
    
    // For minimum cost - buy from expensive end
    let minCost = 0;
    let buy = 0;
    let free = n - 1;
    
    while (buy <= free) {
        minCost += prices[buy];
        buy++;
        free -= k; // k candies become free
    }
    
    // For maximum cost - buy from cheap end
    let maxCost = 0;
    buy = n - 1;
    free = 0;
    
    while (buy >= free) {
        maxCost += prices[buy];
        buy--;
        free += k; // k candies become free
    }
    
    return {minCost: minCost, maxCost: maxCost};
}

// Test case for Candy Store
console.log("10. Minimum and Maximum amount to buy all N candies:");
const prices10 = [3, 2, 1, 4];
const k10 = 2;
console.log("Candy costs:", candyStore(prices10, k10));
console.log("Expected: {minCost: 3, maxCost: 7}\n");

// 11. Minimize Cash Flow
/*
Problem: Minimize cash flow among friends who have borrowed money from each other.

Approach: Calculate net amount for each person. Match maximum creditor with maximum debtor.
Time Complexity: O(n^2)
Space Complexity: O(n)
*/

function minimizeCashFlow(transactions) {
    const n = transactions.length;
    const netAmount = new Array(n).fill(0);
    
    // Calculate net amount for each person
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            netAmount[i] += transactions[j][i] - transactions[i][j];
        }
    }
    
    const result = [];
    
    function minimizeHelper(amount) {
        const maxCredit = amount.indexOf(Math.max(...amount));
        const maxDebit = amount.indexOf(Math.min(...amount));
        
        if (amount[maxCredit] === 0 && amount[maxDebit] === 0) {
            return;
        }
        
        const minAmount = Math.min(-amount[maxDebit], amount[maxCredit]);
        amount[maxCredit] -= minAmount;
        amount[maxDebit] += minAmount;
        
        result.push({
            from: maxDebit,
            to: maxCredit,
            amount: minAmount
        });
        
        minimizeHelper(amount);
    }
    
    minimizeHelper([...netAmount]);
    return result;
}

// Test case for Minimize Cash Flow
console.log("11. Minimize Cash Flow:");
const transactions11 = [
    [0, 1000, 2000],
    [0, 0, 5000],
    [0, 0, 0]
];
console.log("Cash flow:", minimizeCashFlow(transactions11));
console.log("Expected: Optimized cash flow transactions\n");

// 12. Minimum Cost to cut a board into squares
/*
Problem: Cut a board into unit squares with minimum cost. Cost of cutting is proportional to length of cut.

Approach: Always make the most expensive cut first (greedy choice).
Time Complexity: O(m log m + n log n)
Space Complexity: O(1)
*/

function minCostToCut(X, Y) {
    // Sort in descending order
    X.sort((a, b) => b - a);
    Y.sort((a, b) => b - a);
    
    let hPieces = 1, vPieces = 1;
    let i = 0, j = 0;
    let totalCost = 0;
    
    while (i < X.length && j < Y.length) {
        if (X[i] > Y[j]) {
            totalCost += X[i] * vPieces;
            hPieces++;
            i++;
        } else {
            totalCost += Y[j] * hPieces;
            vPieces++;
            j++;
        }
    }
    
    // Add remaining cuts
    while (i < X.length) {
        totalCost += X[i] * vPieces;
        i++;
    }
    
    while (j < Y.length) {
        totalCost += Y[j] * hPieces;
        j++;
    }
    
    return totalCost;
}

// Test case for Minimum Cost to Cut Board
console.log("12. Minimum Cost to cut a board into squares:");
const X12 = [2, 1, 3, 1, 4];
const Y12 = [4, 1, 2];
console.log("Min cost:", minCostToCut(X12, Y12));
console.log("Expected: 42\n");

// 13. Check if it is possible to survive on Island
/*
Problem: Check if it's possible to survive N days on an island where you can buy food for M days but shop is closed on Sundays.

Approach: Calculate minimum food needed and check if it's possible to buy enough food.
Time Complexity: O(1)
Space Complexity: O(1)
*/

function canSurvive(N, M, S) {
    // N = days to survive, M = max food per day, S = food needed per day
    
    // If we need more food per day than we can buy, impossible
    if (S > M) return false;
    
    // Calculate total food needed
    const totalFoodNeeded = N * S;
    
    // Calculate number of Sundays in N days
    const sundays = Math.floor(N / 7);
    
    // Calculate available buying days
    const buyingDays = N - sundays;
    
    // If last day is Sunday and we need food that day, we need extra day
    if (N % 7 === 0 && N > 6) {
        return totalFoodNeeded <= (buyingDays - 1) * M;
    }
    
    // Check if we can buy enough food
    return totalFoodNeeded <= buyingDays * M;
}

// Test case for Island Survival
console.log("13. Check if it is possible to survive on Island:");
console.log("Can survive 10 days, max buy 16, need 2 per day:", canSurvive(10, 16, 2));
console.log("Expected: true\n");

// 14. Find maximum meetings in one room
/*
Problem: Same as activity selection problem - find maximum number of meetings that can be scheduled in one room.

Approach: Sort meetings by end time and select non-overlapping meetings.
Time Complexity: O(n log n)
Space Complexity: O(n)
*/

function maxMeetings(start, end) {
    const meetings = [];
    for (let i = 0; i < start.length; i++) {
        meetings.push({start: start[i], end: end[i], index: i + 1});
    }
    
    // Sort by end time
    meetings.sort((a, b) => a.end - b.end);
    
    const selected = [];
    selected.push(meetings[0].index);
    let lastEnd = meetings[0].end;
    
    for (let i = 1; i < meetings.length; i++) {
        if (meetings[i].start > lastEnd) {
            selected.push(meetings[i].index);
            lastEnd = meetings[i].end;
        }
    }
    
    return selected;
}

// Test case for Maximum Meetings
console.log("14. Find maximum meetings in one room:");
const start14 = [1, 3, 0, 5, 8, 5];
const end14 = [2, 4, 6, 7, 9, 9];
console.log("Max meetings:", maxMeetings(start14, end14));
console.log("Expected: [1, 2, 4, 5] or similar valid combination\n");

// 15. Maximum product subset of an array
/*
Problem: Find maximum product of a subset of array elements.

Approach: Handle negatives, zeros, and positives separately. Include all positives, even number of negatives.
Time Complexity: O(n)
Space Complexity: O(1)
*/

function maxProductSubset(arr) {
    if (arr.length === 0) return 0;
    
    let negatives = [];
    let positives = [];
    let zeros = 0;
    
    for (let num of arr) {
        if (num < 0) negatives.push(num);
        else if (num > 0) positives.push(num);
        else zeros++;
    }
    
    // If all elements are zero
    if (positives.length === 0 && negatives.length === 0) {
        return 0;
    }
    
    // Calculate product of all positives
    let product = 1;
    for (let pos of positives) {
        product *= pos;
    }
    
    // Sort negatives in descending order (closest to 0 first)
    negatives.sort((a, b) => b - a);
    
    // If even number of negatives, include all
    if (negatives.length % 2 === 0) {
        for (let neg of negatives) {
            product *= neg;
        }
    } else {
        // If odd number of negatives, exclude the one closest to 0
        if (negatives.length > 1) {
            for (let i = 0; i < negatives.length - 1; i++) {
                product *= negatives[i];
            }
        } else {
            // Only one negative number
            if (positives.length === 0 && zeros > 0) {
                return 0; // Better to pick zero than single negative
            }
        }
    }
    
    return product;
}

// Test case for Maximum Product Subset
console.log("15. Maximum product subset of an array:");
const arr15 = [-1, -1, -2, 4, 3];
console.log("Max product:", maxProductSubset(arr15));
console.log("Expected: 24\n");

// 16. Maximize array sum after K negations
/*
Problem: You can negate any element K times. Maximize the sum.

Approach: Always negate the smallest element. If K is odd after negating all negatives, negate the smallest absolute value.
Time Complexity: O(n log n)
Space Complexity: O(1)
*/

function maximizeSum(arr, k) {
    arr.sort((a, b) => a - b);
    
    // Negate negative numbers first
    for (let i = 0; i < arr.length && k > 0 && arr[i] < 0; i++) {
        arr[i] = -arr[i];
        k--;
    }
    
    // If k is still positive and odd, negate the smallest element
    if (k % 2 === 1) {
        arr.sort((a, b) => a - b);
        arr[0] = -arr[0];
    }
    
    return arr.reduce((sum, num) => sum + num, 0);
}

// Test case for Maximize Sum after K negations
console.log("16. Maximize array sum after K negations:");
const arr16 = [-2, 0, 5, -1, 2];
const k16 = 4;
console.log("Max sum:", maximizeSum([...arr16], k16));
console.log("Expected: 10\n");

// 17. Maximize the sum of arr[i]*i
/*
Problem: Rearrange array to maximize sum of arr[i]*i.

Approach: Sort array in ascending order to pair smallest values with smallest indices.
Time Complexity: O(n log n)
Space Complexity: O(1)
*/

function maximizeIndexSum(arr) {
    arr.sort((a, b) => a - b);
    
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i] * i;
    }
    
    return sum;
}

// Test case for Maximize arr[i]*i
console.log("17. Maximize the sum of arr[i]*i:");
const arr17 = [5, 3, 2, 4, 1];
console.log("Max sum:", maximizeIndexSum([...arr17]));
console.log("Expected: 40\n");

// 18. Maximum sum of absolute difference of an array
/*
Problem: Rearrange array to maximize sum of absolute differences of adjacent elements.

Approach: Arrange elements alternately - smallest, largest, second smallest, second largest, etc.
Time Complexity: O(n log n)
Space Complexity: O(n)
*/

function maxAbsoluteDifference(arr) {
    arr.sort((a, b) => a - b);
    const result = [];
    
    let left = 0, right = arr.length - 1;
    
    // Alternate between smallest and largest
    while (left <= right) {
        if (result.length % 2 === 0) {
            result.push(arr[left++]);
        } else {
            result.push(arr[right--]);
        }
    }
    
    // Calculate sum of absolute differences
    let sum = 0;
    for (let i = 0; i < result.length; i++) {
        sum += Math.abs(result[i] - result[(i + 1) % result.length]);
    }
    
    return {arrangement: result, maxSum: sum};
}

// Test case for Maximum Absolute Difference
console.log("18. Maximum sum of absolute difference of an array:");
const arr18 = [4, 2, 1, 8];
console.log("Max absolute diff:", maxAbsoluteDifference([...arr18]));
console.log("Expected: Alternating arrangement with maximum sum\n");

// 19. Maximize sum of consecutive differences in a circular array
/*
Problem: Arrange elements in circle to maximize sum of absolute differences.

Approach: Similar to problem 18 - alternate between largest and smallest elements.
Time Complexity: O(n log n)
Space Complexity: O(n)
*/

function maxCircularDifference(arr) {
    return maxAbsoluteDifference(arr); // Same approach as problem 18
}

// Test case for Maximize Circular Differences
console.log("19. Maximize sum of consecutive differences in a circular array:");
const arr19 = [4, 2, 1, 8];
console.log("Max circular diff:", maxCircularDifference([...arr19]));
console.log("Expected: Same as problem 18 since it's circular\n");

// 20. Minimum sum of absolute difference of pairs of two arrays
/*
Problem: Pair elements from two arrays to minimize sum of absolute differences.

Approach: Sort both arrays and pair elements at same indices.
Time Complexity: O(n log n)
Space Complexity: O(1)
*/

function minAbsoluteDifferencePairs(arr1, arr2) {
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);
    
    let sum = 0;
    const pairs = [];
    
    for (let i = 0; i < arr1.length; i++) {
        const diff = Math.abs(arr1[i] - arr2[i]);
        sum += diff;
        pairs.push({a: arr1[i], b: arr2[i], diff: diff});
    }
    
    return {minSum: sum, pairs: pairs};
}

// Test case for Minimum Absolute Difference Pairs
console.log("20. Minimum sum of absolute difference of pairs of two arrays:");
const arr20a = [1, 2, 3];
const arr20b = [2, 1, 3];
console.log("Min diff pairs:", minAbsoluteDifferencePairs([...arr20a], [...arr20b]));
console.log("Expected: {minSum: 0, pairs: [...]\n");

// 21. Shortest Job First (SJF) CPU Scheduling
/*
Problem: Schedule jobs to minimize average waiting time.

Approach: Sort jobs by burst time in ascending order.
Time Complexity: O(n log n)
Space Complexity: O(n)
*/

function shortestJobFirst(processes) {
    // Sort by burst time
    processes.sort((a, b) => a.burstTime - b.burstTime);
    
    let currentTime = 0;
    let totalWaitingTime = 0;
    const result = [];
    
    for (let process of processes) {
        const waitingTime = currentTime;
        const completionTime = currentTime + process.burstTime;
        const turnaroundTime = completionTime;
        
        result.push({
            id: process.id,
            burstTime: process.burstTime,
            waitingTime: waitingTime,
            completionTime: completionTime,
            turnaroundTime: turnaroundTime
        });
        
        totalWaitingTime += waitingTime;
        currentTime += process.burstTime;
    }
    
    const avgWaitingTime = totalWaitingTime / processes.length;
    return {schedule: result, avgWaitingTime: avgWaitingTime};
}

// Test case for SJF Scheduling
console.log("21. Shortest Job First (SJF) CPU Scheduling:");
const processes21 = [
    {id: 'P1', burstTime: 6},
    {id: 'P2', burstTime: 8},
    {id: 'P3', burstTime: 7},
    {id: 'P4', burstTime: 3}
];
console.log("SJF schedule:", shortestJobFirst([...processes21]));
console.log("Expected: Jobs scheduled by burst time\n");

// 22. Least Recently Used (LRU) Page Replacement
/*
Problem: Implement LRU page replacement algorithm.

Approach: Use a combination of hash map and doubly linked list for O(1) operations.
Time Complexity: O(1) for each operation
Space Complexity: O(capacity)
*/

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.pageFaults = 0;
    }
    
    get(page) {
        if (this.cache.has(page)) {
            // Move to end (most recently used)
            const value = this.cache.get(page);
            this.cache.delete(page);
            this.cache.set(page, value);
            return value;
        }
        return -1; // Page fault
    }
    
    put(page, value = page) {
        if (this.cache.has(page)) {
            // Update existing page
            this.cache.delete(page);
        } else if (this.cache.size >= this.capacity) {
            // Remove least recently used (first element)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
            this.pageFaults++;
        } else {
            this.pageFaults++;
        }
        
        this.cache.set(page, value);
    }
    
    getPages() {
        return Array.from(this.cache.keys());
    }
}

function lruPageReplacement(pages, capacity) {
    const lru = new LRUCache(capacity);
    const result = [];
    
    for (let page of pages) {
        lru.put(page);
        result.push({
            page: page,
            cache: [...lru.getPages()],
            pageFaults: lru.pageFaults
        });
    }
    
    return {
        steps: result,
        totalPageFaults: lru.pageFaults
    };
}

// Test case for LRU Page Replacement
console.log("22. Least Recently Used (LRU) Page Replacement:");
const pages22 = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2];
const capacity22 = 4;
console.log("LRU replacement:", lruPageReplacement(pages22, capacity22));
console.log("Expected: Page replacement with minimum faults\n");

// 23. Smallest subset with sum greater than all other elements
/*
Problem: Find the smallest subset whose sum is greater than sum of remaining elements.

Approach: Sort in descending order and keep adding elements until sum > remaining sum.
Time Complexity: O(n log n)
Space Complexity: O(1)
*/

function smallestSubsetGreaterSum(arr) {
    arr.sort((a, b) => b - a);
    
    const totalSum = arr.reduce((sum, num) => sum + num, 0);
    let subsetSum = 0;
    let count = 0;
    
    for (let i = 0; i < arr.length; i++) {
        subsetSum += arr[i];
        count++;
        
        if (subsetSum > totalSum - subsetSum) {
            break;
        }
    }
    
    return {
        minElements: count,
        subset: arr.slice(0, count),
        subsetSum: subsetSum
    };
}

// Test case for Smallest Subset
console.log("23. Smallest subset with sum greater than all other elements:");
const arr23 = [3, 1, 7, 1];
console.log("Smallest subset:", smallestSubsetGreaterSum([...arr23]));
console.log("Expected: {minElements: 1, subset: [7], subsetSum: 7}\n");

// 24. Chocolate Distribution Problem
/*
Problem: Distribute chocolates to children such that difference between max and min is minimized.

Approach: Sort the array and find subarray of size m with minimum difference.
Time Complexity: O(n log n)
Space Complexity: O(1)
*/

function chocolateDistribution(packets, children) {
    if (children > packets.length) return -1;
    
    packets.sort((a, b) => a - b);
    let minDiff = Number.MAX_SAFE_INTEGER;
    let bestStart = 0;
    
    // Find subarray of size 'children' with minimum difference
    for (let i = 0; i <= packets.length - children; i++) {
        const diff = packets[i + children - 1] - packets[i];
        if (diff < minDiff) {
            minDiff = diff;
            bestStart = i;
        }
    }
    
    return {
        minDifference: minDiff,
        distribution: packets.slice(bestStart, bestStart + children)
    };
}

// Test case for Chocolate Distribution
console.log("24. Chocolate Distribution Problem:");
const packets24 = [3, 4, 1, 9, 56, 7, 9, 12];
const children24 = 5;
console.log("Chocolate distribution:", chocolateDistribution([...packets24], children24));
console.log("Expected: Minimum difference distribution\n");

// 25. Minimum Cost of ropes
/*
Problem: Connect n ropes with minimum cost. Cost of connecting two ropes is sum of their lengths.

Approach: Use min-heap. Always connect two shortest ropes.
Time Complexity: O(n log n)
Space Complexity: O(n)
*/

function minCostOfRopes(ropes) {
    if (ropes.length <= 1) return 0;
    
    const heap = new MinHeap();
    for (let rope of ropes) {
        heap.insert({freq: rope}); // Reusing HuffmanNode structure
    }
    
    let totalCost = 0;
    
    while (heap.size() > 1) {
        const first = heap.extractMin().freq;
        const second = heap.extractMin().freq;
        const cost = first + second;
        
        totalCost += cost;
        heap.insert({freq: cost});
    }
    
    return totalCost;
}

// Test case for Minimum Cost of Ropes
console.log("25. Minimum Cost of ropes:");
const ropes25 = [4, 3, 2, 6];
console.log("Min cost:", minCostOfRopes([...ropes25]));
console.log("Expected: 29\n");

// 26. Find smallest number with given number of digits and sum of digits
/*
Problem: Find the smallest number with exactly n digits and sum of digits equal to s.

Approach: Place 9's from right to left, keeping minimum digit 1 at leftmost position.
Time Complexity: O(n)
Space Complexity: O(n)
*/

function smallestNumber(digits, sum) {
    // Edge cases
    if (sum === 0) {
        return digits === 1 ? "0" : "-1";
    }
    
    if (sum > 9 * digits) return "-1"; // Impossible case
    
    const result = new Array(digits).fill(0);
    let remainingSum = sum;
    
    // Fill from right to left with 9's
    for (let i = digits - 1; i > 0; i--) {
        if (remainingSum > 9) {
            result[i] = 9;
            remainingSum -= 9;
        } else {
            result[i] = remainingSum - 1; // Keep at least 1 for first digit
            remainingSum = 1;
            break;
        }
    }
    
    result[0] = remainingSum; // First digit gets remaining sum
    
    return result.join('');
}

// Test case for Smallest Number
console.log("26. Find smallest number with given number of digits and sum of digits:");
console.log("Smallest number (2 digits, sum 9):", smallestNumber(2, 9));
console.log("Expected: 18\n");

// 27. Rearrange characters in a string such that no two adjacent are same
/*
Problem: Rearrange string so no two adjacent characters are same.

Approach: Use max-heap based on frequency. Always pick character with highest frequency that's different from previous.
Time Complexity: O(n log k) where k is unique characters
Space Complexity: O(k)
*/

function rearrangeString(str) {
    const freq = {};
    for (let char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    
    // Create frequency array and sort by frequency
    const freqArray = Object.entries(freq).map(([char, count]) => ({char, count}));
    freqArray.sort((a, b) => b.count - a.count);
    
    const result = [];
    let prevChar = '';
    
    while (freqArray.some(item => item.count > 0)) {
        let used = false;
        
        // Find character with highest frequency that's not same as previous
        for (let i = 0; i < freqArray.length; i++) {
            if (freqArray[i].count > 0 && freqArray[i].char !== prevChar) {
                result.push(freqArray[i].char);
                prevChar = freqArray[i].char;
                freqArray[i].count--;
                used = true;
                
                // Re-sort to maintain max-heap property
                freqArray.sort((a, b) => b.count - a.count);
                break;
            }
        }
        
        if (!used) {
            return "Not possible"; // Cannot rearrange
        }
    }
    
    return result.join('');
}

// Test case for Rearrange String
console.log("27. Rearrange characters in a string such that no two adjacent are same:");
console.log("Rearranged string 'aab':", rearrangeString("aab"));
console.log("Expected: 'aba' or 'baa'\n");

// 28. Find maximum sum possible equal sum of three stacks
/*
Problem: Given three stacks, remove elements from top to make all stacks have equal sum with maximum possible sum.

Approach: Calculate prefix sums and use three pointers to find maximum equal sum.
Time Complexity: O(n1 + n2 + n3)
Space Complexity: O(n1 + n2 + n3)
*/

function maxEqualSum(stack1, stack2, stack3) {
    // Calculate prefix sums
    const sum1 = [0];
    const sum2 = [0];
    const sum3 = [0];
    
    for (let i = 0; i < stack1.length; i++) {
        sum1.push(sum1[sum1.length - 1] + stack1[i]);
    }
    
    for (let i = 0; i < stack2.length; i++) {
        sum2.push(sum2[sum2.length - 1] + stack2[i]);
    }
    
    for (let i = 0; i < stack3.length; i++) {
        sum3.push(sum3[sum3.length - 1] + stack3[i]);
    }
    
    // Get total sums
    let total1 = sum1[sum1.length - 1];
    let total2 = sum2[sum2.length - 1];
    let total3 = sum3[sum3.length - 1];
    
    let i = 0, j = 0, k = 0; // Pointers for elements to remove
    
    while (i <= stack1.length && j <= stack2.length && k <= stack3.length) {
        const current1 = total1 - sum1[i];
        const current2 = total2 - sum2[j];
        const current3 = total3 - sum3[k];
        
        if (current1 === current2 && current2 === current3) {
            return current1;
        }
        
        // Move pointer of stack with maximum current sum
        if (current1 >= current2 && current1 >= current3) {
            i++;
        } else if (current2 >= current1 && current2 >= current3) {
            j++;
        } else {
            k++;
        }
    }
    
    return 0;
}

// Test case for Maximum Equal Sum
console.log("28. Find maximum sum possible equal sum of three stacks:");
const stack1_28 = [3, 2, 1, 1, 1];
const stack2_28 = [4, 3, 2];
const stack3_28 = [1, 1, 4, 1];
console.log("Max equal sum:", maxEqualSum(stack1_28, stack2_28, stack3_28));
console.log("Expected: 5\n");

// Additional Complex Problems (SPOJ Problems)

// 29. DEFKIN - Defense of a Kingdom
/*
Problem: Place rectangular towers on a grid to maximize uncovered area.

Approach: Find maximum gaps between towers in both dimensions.
Time Complexity: O(n log n)
Space Complexity: O(n)
*/

function defenseOfKingdom(W, H, towers) {
    const xCoords = [0, W + 1];
    const yCoords = [0, H + 1];
    
    for (let tower of towers) {
        xCoords.push(tower.x);
        yCoords.push(tower.y);
    }
    
    xCoords.sort((a, b) => a - b);
    yCoords.sort((a, b) => a - b);
    
    let maxXGap = 0;
    let maxYGap = 0;
    
    for (let i = 1; i < xCoords.length; i++) {
        maxXGap = Math.max(maxXGap, xCoords[i] - xCoords[i - 1] - 1);
    }
    
    for (let i = 1; i < yCoords.length; i++) {
        maxYGap = Math.max(maxYGap, yCoords[i] - yCoords[i - 1] - 1);
    }
    
    return maxXGap * maxYGap;
}

// Test case for DEFKIN
console.log("29. DEFKIN - Defense of a Kingdom:");
const towers29 = [{x: 3, y: 8}, {x: 11, y: 2}, {x: 8, y: 6}];
console.log("Max uncovered area:", defenseOfKingdom(15, 8, towers29));
console.log("Expected: Maximum uncovered rectangular area\n");

// 30. K Centers Problem
/*
Problem: Choose k centers to minimize maximum distance from any point to nearest center.

Approach: Binary search on answer + greedy placement of centers.
Time Complexity: O(n^2 log(max_distance))
Space Complexity: O(n^2)
*/

function kCenters(points, k) {
    const n = points.length;
    
    // Calculate distance matrix
    const dist = Array(n).fill().map(() => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                dist[i][j] = Math.sqrt(
                    Math.pow(points[i].x - points[j].x, 2) + 
                    Math.pow(points[i].y - points[j].y, 2)
                );
            }
        }
    }
    
    function canPlaceKCenters(maxDist) {
        const centers = [0]; // Start with first point as center
        
        for (let i = 1; i < n; i++) {
            let canBeCovered = false;
            
            // Check if point i can be covered by existing centers
            for (let center of centers) {
                if (dist[i][center] <= maxDist) {
                    canBeCovered = true;
                    break;
                }
            }
            
            // If not covered, add it as new center
            if (!canBeCovered) {
                centers.push(i);
                if (centers.length > k) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    // Binary search on answer
    let left = 0, right = Math.max(...dist.flat());
    let answer = right;
    
    while (left <= right) {
        const mid = (left + right) / 2;
        
        if (canPlaceKCenters(mid)) {
            answer = mid;
            right = mid - 0.1;
        } else {
            left = mid + 0.1;
        }
    }
    
    return Math.round(answer * 100) / 100; // Round to 2 decimal places
}

// Test case for K Centers
console.log("30. K Centers Problem:");
const points30 = [
    {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}
];
console.log("K centers result:", kCenters(points30, 2));
console.log("Expected: Minimum maximum distance with 2 centers\n");

console.log("=".repeat(80));
console.log("ALL GREEDY ALGORITHM PROBLEMS COMPLETED!");
console.log("Each solution includes:");
console.log("- Problem description and approach");
console.log("- Time and space complexity analysis"); 
console.log("- Complete working implementation");
console.log("- Test cases with expected outputs");
console.log("=".repeat(80));