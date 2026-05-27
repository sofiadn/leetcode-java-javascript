export const PROBLEMS = [
  {
    id: 1, title: "Two Sum", category: "Java", pattern: "Hash map", difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. Exactly one solution exists.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]`,
    starter: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // your code here
    }
}`,
    hint: "Store each number's index in a HashMap. For each number, check if (target - number) already exists in the map.",
    solution: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`
  },
  {
    id: 2, title: "Valid Anagram", category: "Java", pattern: "Frequency count", difficulty: "Easy",
    description: `Given two strings s and t, return true if t is an anagram of s.

Example:
Input: s = "anagram", t = "nagaram"
Output: true`,
    starter: `class Solution {
    public boolean isAnagram(String s, String t) {
        // your code here
    }
}`,
    hint: "Count character frequencies using int[26]. Increment for s, decrement for t. Any non-zero means not an anagram.",
    solution: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;
        for (char c : t.toCharArray()) count[c - 'a']--;
        for (int n : count) if (n != 0) return false;
        return true;
    }
}`
  },
  {
    id: 3, title: "Longest Substring Without Repeating Characters", category: "Java", pattern: "Sliding window", difficulty: "Medium",
    description: `Find the length of the longest substring without repeating characters.

Example:
Input: s = "abcabcbb"
Output: 3`,
    starter: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // your code here
    }
}`,
    hint: "Sliding window with a HashSet. Expand right, shrink left when duplicate found.",
    solution: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>();
        int l = 0, max = 0;
        for (int r = 0; r < s.length(); r++) {
            while (set.contains(s.charAt(r))) {
                set.remove(s.charAt(l++));
            }
            set.add(s.charAt(r));
            max = Math.max(max, r - l + 1);
        }
        return max;
    }
}`
  },
  {
    id: 4, title: "Group Anagrams", category: "Java", pattern: "HashMap grouping", difficulty: "Medium",
    description: `Group an array of strings by anagram.

Example:
Input: ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]`,
    starter: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // your code here
    }
}`,
    hint: "Sort each string — anagrams produce the same sorted key. Use that as the HashMap key.",
    solution: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`
  },
  {
    id: 5, title: "Maximum Subarray", category: "Java", pattern: "Kadane's algorithm", difficulty: "Medium",
    description: `Find the subarray with the largest sum.

Example:
Input: [-2,1,-3,4,-1,2,1,-5,4]
Output: 6 (subarray [4,-1,2,1])`,
    starter: `class Solution {
    public int maxSubArray(int[] nums) {
        // your code here
    }
}`,
    hint: "Track current sum and global max. At each element: extend current subarray or start fresh.",
    solution: `class Solution {
    public int maxSubArray(int[] nums) {
        int curr = nums[0], best = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curr = Math.max(nums[i], curr + nums[i]);
            best = Math.max(best, curr);
        }
        return best;
    }
}`
  },
  {
    id: 6, title: "Contains Duplicate", category: "Java", pattern: "Hash set", difficulty: "Easy",
    description: `Return true if any value appears at least twice.

Example:
Input: [1,2,3,1]
Output: true`,
    starter: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        // your code here
    }
}`,
    hint: "add() on a HashSet returns false if element already exists.",
    solution: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) return true;
        }
        return false;
    }
}`
  },
  {
    id: 7, title: "Product of Array Except Self", category: "Java", pattern: "Prefix / suffix", difficulty: "Medium",
    description: `Return array where answer[i] is product of all elements except nums[i]. O(n), no division.

Example:
Input: [1,2,3,4]
Output: [24,12,8,6]`,
    starter: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        // your code here
    }
}`,
    hint: "Left pass: fill result with left products. Right pass: multiply in right products using a running variable.",
    solution: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        result[0] = 1;
        for (int i = 1; i < n; i++) result[i] = result[i-1] * nums[i-1];
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= right;
            right *= nums[i];
        }
        return result;
    }
}`
  },
  {
    id: 8, title: "Implement Debounce", category: "JS", pattern: "Closures / timers", difficulty: "Medium",
    description: `Implement debounce(fn, t). Returns a function that delays invoking fn until t ms after the last call.

Example:
const debounced = debounce(fn, 100);
debounced(); // fn fires after 100ms if no more calls`,
    starter: `function debounce(fn, t) {
  // your code here
}`,
    hint: "Store a timer in a closure. On each call, clear previous timer and set a new one.",
    solution: `function debounce(fn, t) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), t);
  };
}`
  },
  {
    id: 9, title: "Implement Memoize", category: "JS", pattern: "Closures / caching", difficulty: "Medium",
    description: `Write a function that memoizes results. Returns cached result when called with same arguments.

Example:
const memoized = memoize(fn);
memoized(1, 2); // calls fn
memoized(1, 2); // returns cache`,
    starter: `function memoize(fn) {
  // your code here
}`,
    hint: "Use a Map as cache. Stringify args as key. Check cache before calling fn.",
    solution: `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}`
  },
  {
    id: 10, title: "Flatten Nested Array", category: "JS", pattern: "Recursion", difficulty: "Medium",
    description: `Flatten a multi-dimensional array to depth n.

Example:
Input: arr = [1,[2,[3,[4]]]], n = 2
Output: [1,2,3,[4]]`,
    starter: `function flat(arr, n) {
  // your code here
}`,
    hint: "Recursively process each element. If it's an array and depth > 0, spread its flattened contents.",
    solution: `function flat(arr, n) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item) && n > 0) {
      result.push(...flat(item, n - 1));
    } else {
      result.push(item);
    }
  }
  return result;
}`
  },
  {
    id: 11, title: "Implement Curry", category: "JS", pattern: "Closures / recursion", difficulty: "Medium",
    description: `Implement curry(fn). Returns a curried version that can be called with arguments one at a time.

Example:
const add = curry((a,b,c) => a+b+c);
add(1)(2)(3); // 6
add(1,2)(3);  // 6`,
    starter: `function curry(fn) {
  // your code here
}`,
    hint: "Check if enough args have been collected (args.length >= fn.length). If yes, call fn. If no, return a new function that collects more.",
    solution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}`
  },
  {
    id: 12, title: "Implement Throttle", category: "JS", pattern: "Closures / timers", difficulty: "Medium",
    description: `Implement throttle(fn, t). The throttled function fires at most once per t milliseconds.

Example:
const throttled = throttle(fn, 100);
throttled(); // fires immediately
throttled(); // ignored (within 100ms)`,
    starter: `function throttle(fn, t) {
  // your code here
}`,
    hint: "Track whether fn is on cooldown. If not, call fn and set a timeout to reset the cooldown after t ms.",
    solution: `function throttle(fn, t) {
  let onCooldown = false;
  return function(...args) {
    if (onCooldown) return;
    fn.apply(this, args);
    onCooldown = true;
    setTimeout(() => onCooldown = false, t);
  };
}`
  },
  {
    id: 13, title: "Promise Time Limit", category: "JS", pattern: "Promises / race", difficulty: "Medium",
    description: `Wrap an async function so it rejects if it takes longer than t milliseconds.

Example:
const limited = timeLimit(fn, 100);
await limited(); // rejects with "Time Limit Exceeded" if fn takes > 100ms`,
    starter: `function timeLimit(fn, t) {
  // your code here
}`,
    hint: "Use Promise.race() between the original function and a timeout promise that rejects after t ms.",
    solution: `function timeLimit(fn, t) {
  return async function(...args) {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject("Time Limit Exceeded"), t)
    );
    return Promise.race([fn(...args), timeout]);
  };
}`
  },
  {
    id: 14, title: "Best Time to Buy and Sell Stock", category: "Java", pattern: "Sliding window / greedy", difficulty: "Easy",
    description: `You are given an array prices where prices[i] is the price of a stock on day i. Return the maximum profit from a single buy and sell. You must buy before you sell.

Example:
Input: prices = [7,1,5,3,6,4]
Output: 5 (buy at 1, sell at 6)`,
    starter: `class Solution {
    public int maxProfit(int[] prices) {
        // your code here
    }
}`,
    hint: "Track the minimum price seen so far. At each step, the best profit is price - minSoFar. No need for nested loops.",
    solution: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`
  },
  {
    id: 15, title: "Valid Parentheses", category: "Java", pattern: "Stack", difficulty: "Easy",
    description: `Given a string s containing only '(', ')', '{', '}', '[', ']', return true if the input string is valid. An input string is valid if open brackets are closed by the same type, and in the correct order.

Example:
Input: s = "()[]{}"
Output: true

Input: s = "([)]"
Output: false`,
    starter: `class Solution {
    public boolean isValid(String s) {
        // your code here
    }
}`,
    hint: "Push open brackets onto a stack. On each closing bracket, pop the stack and check that it matches. Return true only if the stack is empty at the end.",
    solution: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == ']' && top != '[') return false;
                if (c == '}' && top != '{') return false;
            }
        }
        return stack.isEmpty();
    }
}`
  },
  {
    id: 16, title: "Merge Intervals", category: "Java", pattern: "Sort + scan", difficulty: "Medium",
    description: `Given an array of intervals, merge all overlapping intervals and return an array of the non-overlapping intervals.

Example:
Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]

Input: [[1,4],[4,5]]
Output: [[1,5]]`,
    starter: `class Solution {
    public int[][] merge(int[][] intervals) {
        // your code here
    }
}`,
    hint: "Sort by start time. Then scan: if the current interval's start ≤ the last merged interval's end, extend the end. Otherwise add a new interval.",
    solution: `class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        List<int[]> result = new ArrayList<>();
        result.add(intervals[0]);
        for (int i = 1; i < intervals.length; i++) {
            int[] last = result.get(result.size() - 1);
            if (intervals[i][0] <= last[1]) {
                last[1] = Math.max(last[1], intervals[i][1]);
            } else {
                result.add(intervals[i]);
            }
        }
        return result.toArray(new int[0][]);
    }
}`
  },
  {
    id: 17, title: "Climbing Stairs", category: "Java", pattern: "Dynamic programming", difficulty: "Easy",
    description: `You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?

Example:
Input: n = 4
Output: 5
(1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2)`,
    starter: `class Solution {
    public int climbStairs(int n) {
        // your code here
    }
}`,
    hint: "ways(n) = ways(n-1) + ways(n-2) — it's Fibonacci. Use two variables instead of an array to save space.",
    solution: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`
  },
  {
    id: 18, title: "Number of Islands", category: "Java", pattern: "DFS / BFS on grid", difficulty: "Medium",
    description: `Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent land cells horizontally or vertically.

Example:
Input:
[["1","1","0","0","0"],
 ["1","1","0","0","0"],
 ["0","0","1","0","0"],
 ["0","0","0","1","1"]]
Output: 3`,
    starter: `class Solution {
    public int numIslands(char[][] grid) {
        // your code here
    }
}`,
    hint: "Scan the grid. When you find a '1', run DFS to mark the whole island as visited (set to '0'). Increment count each time you trigger DFS from the outer loop.",
    solution: `class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    dfs(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }

    private void dfs(char[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] != '1') return;
        grid[i][j] = '0';
        dfs(grid, i + 1, j);
        dfs(grid, i - 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i, j - 1);
    }
}`
  },
  {
    id: 19, title: "3Sum", category: "Java", pattern: "Two pointers", difficulty: "Medium",
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, k are distinct and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.

Example:
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]`,
    starter: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // your code here
    }
}`,
    hint: "Sort the array. Fix one number, then use two pointers on the rest to find pairs that sum to its negative. Skip duplicates at each level.",
    solution: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    r--;
                }
            }
        }
        return result;
    }
}`
  },
  {
    id: 20, title: "Longest Common Subsequence", category: "Java", pattern: "2D dynamic programming", difficulty: "Medium",
    description: `Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence is a sequence that appears in the same relative order but not necessarily contiguous.

Example:
Input: text1 = "abcde", text2 = "ace"
Output: 3 (the LCS is "ace")`,
    starter: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        // your code here
    }
}`,
    hint: "Build a 2D dp table. If characters match: dp[i][j] = dp[i-1][j-1] + 1. Otherwise: max of skipping one character from either string.",
    solution: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`
  },
  {
    id: 21, title: "Find Minimum in Rotated Sorted Array", category: "Java", pattern: "Binary search", difficulty: "Medium",
    description: `Given a sorted array that has been rotated between 1 and n times, find the minimum element. Must run in O(log n).

Example:
Input: nums = [3,4,5,1,2]
Output: 1

Input: nums = [4,5,6,7,0,1,2]
Output: 0`,
    starter: `class Solution {
    public int findMin(int[] nums) {
        // your code here
    }
}`,
    hint: "Binary search. If nums[mid] > nums[r], the pivot (minimum) is in the right half. Otherwise it's in the left half including mid. Never exclude mid when searching left.",
    solution: `class Solution {
    public int findMin(int[] nums) {
        int l = 0, r = nums.length - 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] > nums[r]) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return nums[l];
    }
}`
  },
  {
    id: 22, title: "Implement EventEmitter", category: "JS", pattern: "Classes / event handling", difficulty: "Medium",
    description: `Implement an EventEmitter class with on(), emit(), and off() methods.

Example:
const emitter = new EventEmitter();
const fn = (x) => console.log(x);
emitter.on('click', fn);
emitter.emit('click', 42); // logs 42
emitter.off('click', fn);
emitter.emit('click', 42); // nothing`,
    starter: `class EventEmitter {
  // your code here
}`,
    hint: "Store listeners in an object keyed by event name (each value is an array). on() pushes, emit() iterates and calls each, off() filters out the specific function reference.",
    solution: `class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
    return this;
  }

  emit(event, ...args) {
    (this.events[event] || []).forEach(l => l(...args));
    return this;
  }

  off(event, listener) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter(l => l !== listener);
    return this;
  }
}`
  },
  {
    id: 23, title: "Implement Promise.all()", category: "JS", pattern: "Promises", difficulty: "Medium",
    description: `Implement promiseAll(promises) that behaves like Promise.all(). Resolves with an array of results when all promises resolve, in the same order. Rejects immediately if any promise rejects.

Example:
await promiseAll([Promise.resolve(1), Promise.resolve(2)]);
// [1, 2]

await promiseAll([Promise.resolve(1), Promise.reject("err")]);
// throws "err"`,
    starter: `function promiseAll(promises) {
  // your code here
}`,
    hint: "Return a new Promise. Keep a results array and a counter. Each promise's .then() stores its value at the right index and increments the counter — resolve when count hits promises.length. Any .catch() calls reject.",
    solution: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    const results = new Array(promises.length);
    let resolved = 0;
    promises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then(value => {
          results[i] = value;
          if (++resolved === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
}`
  },
  {
    id: 24, title: "Implement LRU Cache", category: "JS", pattern: "Classes / Map", difficulty: "Hard",
    description: `Design a data structure that follows the Least Recently Used cache eviction policy. Implement get(key) and put(key, value). Both must run in O(1). get returns -1 if key is not found. When capacity is exceeded, evict the least recently used key.

Example:
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);    // 1 (makes 1 most recent)
cache.put(3, 3); // evicts key 2
cache.get(2);    // -1 (evicted)`,
    starter: `class LRUCache {
  constructor(capacity) {
    // your code here
  }

  get(key) {
    // your code here
  }

  put(key, value) {
    // your code here
  }
}`,
    hint: "JS Map preserves insertion order and is O(1) for get/set/delete. On every get or put, delete the key and re-insert it to move it to the 'most recent' end. When over capacity, delete the first key (map.keys().next().value).",
    solution: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}`
  },
  {
    id: 25, title: "Flatten Nested Object", category: "JS", pattern: "Recursion", difficulty: "Medium",
    description: `Write a function that flattens a nested object into dot-notation key-value pairs.

Example:
Input: { a: { b: { c: 1 }, d: 2 }, e: 3 }
Output: { "a.b.c": 1, "a.d": 2, "e": 3 }

Arrays should be left as-is (not flattened).`,
    starter: `function flattenObject(obj, prefix = '') {
  // your code here
}`,
    hint: "Recurse through each key. Build the dotted path as you go using prefix. When you hit a non-object value (or an array or null), write it to the result object.",
    solution: `function flattenObject(obj, prefix = '') {
  const result = {};
  for (const key in obj) {
    const fullKey = prefix ? \`\${prefix}.\${key}\` : key;
    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      Object.assign(result, flattenObject(obj[key], fullKey));
    } else {
      result[fullKey] = obj[key];
    }
  }
  return result;
}`
  },
  {
    id: 26, title: "Group By Property", category: "JS", pattern: "Array / reduce", difficulty: "Easy",
    description: `Implement groupBy(arr, key) that groups an array of objects by a property name or a key function, similar to Lodash's _.groupBy.

Example:
groupBy([{age:20,name:'a'},{age:20,name:'b'},{age:30,name:'c'}], 'age')
// { 20: [{age:20,name:'a'},{age:20,name:'b'}], 30: [{age:30,name:'c'}] }

groupBy([1.1, 2.3, 2.9], Math.floor)
// { 1: [1.1], 2: [2.3, 2.9] }`,
    starter: `function groupBy(arr, key) {
  // your code here
}`,
    hint: "Use reduce. The accumulator is an object. For each item, compute the group key (call key(item) if it's a function, otherwise item[key]). Create the array if missing, then push.",
    solution: `function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(item);
    return groups;
  }, {});
}`
  },
  {
    id: 27, title: "Implement Pub/Sub", category: "JS", pattern: "Closures / factory", difficulty: "Medium",
    description: `Implement a createPubSub() factory that returns an object with subscribe(event, cb) and publish(event, data). subscribe() should return an unsubscribe function.

Example:
const ps = createPubSub();
const unsub = ps.subscribe('login', user => console.log(user));
ps.publish('login', { name: 'Sofia' }); // logs { name: 'Sofia' }
unsub();
ps.publish('login', { name: 'Sofia' }); // nothing`,
    starter: `function createPubSub() {
  // your code here
}`,
    hint: "Use a closure over a subscribers object (event → array of callbacks). subscribe() pushes and returns a cleanup arrow function that filters out that specific callback. publish() calls all callbacks for the event.",
    solution: `function createPubSub() {
  const subscribers = {};

  return {
    subscribe(event, callback) {
      if (!subscribers[event]) subscribers[event] = [];
      subscribers[event].push(callback);
      return () => {
        subscribers[event] = subscribers[event].filter(cb => cb !== callback);
      };
    },
    publish(event, data) {
      (subscribers[event] || []).forEach(cb => cb(data));
    },
  };
}`
  },
  {
    id: 28, title: "Deep Clone", category: "JS", pattern: "Recursion", difficulty: "Medium",
    description: `Implement deepClone(value) that creates a deep copy of a value without using JSON.stringify. It should handle nested objects, arrays, and primitives. (You don't need to handle Date, Map, Set, or circular references.)

Example:
const a = { x: { y: [1, 2, 3] } };
const b = deepClone(a);
b.x.y.push(4);
console.log(a.x.y); // [1, 2, 3] — not affected`,
    starter: `function deepClone(value) {
  // your code here
}`,
    hint: "Handle three cases: primitive/null (return as-is), array (map each element recursively), object (map each entry recursively). The null check is critical — typeof null === 'object'.",
    solution: `function deepClone(value) {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(deepClone);
  return Object.fromEntries(
    Object.entries(value).map(([k, v]) => [k, deepClone(v)])
  );
}`
  },

  // ── Trees ──────────────────────────────────────────────────────────────────

  {
    id: 29, title: "Maximum Depth of Binary Tree", category: "Java", pattern: "Tree / DFS", difficulty: "Easy",
    description: `Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from root to leaf.

Example:
    3
   / \\
  9  20
    /  \\
   15   7

Output: 3`,
    starter: `// TreeNode: int val; TreeNode left, right;
class Solution {
    public int maxDepth(TreeNode root) {
        // your code here
    }
}`,
    hint: "Base case: null → 0. Recursive case: 1 + max(depth(left), depth(right)). That's the whole solution.",
    solution: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`
  },
  {
    id: 30, title: "Invert Binary Tree", category: "Java", pattern: "Tree / DFS", difficulty: "Easy",
    description: `Given the root of a binary tree, invert the tree (mirror it), and return its root.

Example:
Input:       Output:
    4            4
   / \\          / \\
  2   7   →   7   2
 / \\ / \\     / \\ / \\
1  3 6  9   9  6 3  1`,
    starter: `// TreeNode: int val; TreeNode left, right;
class Solution {
    public TreeNode invertTree(TreeNode root) {
        // your code here
    }
}`,
    hint: "Swap left and right children, then recursively invert each subtree. Works top-down or bottom-up.",
    solution: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);
        return root;
    }
}`
  },
  {
    id: 31, title: "Binary Tree Level Order Traversal", category: "Java", pattern: "Tree / BFS", difficulty: "Medium",
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values (left to right, level by level).

Example:
    3
   / \\
  9  20
    /  \\
   15   7

Output: [[3],[9,20],[15,7]]`,
    starter: `// TreeNode: int val; TreeNode left, right;
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // your code here
    }
}`,
    hint: "BFS with a queue. At each level, snapshot queue.size() before the loop — that's exactly how many nodes belong to the current level.",
    solution: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left  != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            result.add(level);
        }
        return result;
    }
}`
  },
  {
    id: 32, title: "Validate Binary Search Tree", category: "Java", pattern: "Tree / DFS", difficulty: "Medium",
    description: `Given the root of a binary tree, determine if it is a valid binary search tree. A valid BST requires every node in the left subtree to be strictly less than the node, and every node in the right subtree to be strictly greater.

Example:
    5
   / \\
  1   4    → false (4 is in right but 4 < 5 is fine, but 4's right child 3 < 5 ✗)
     / \\
    3   6`,
    starter: `// TreeNode: int val; TreeNode left, right;
class Solution {
    public boolean isValidBST(TreeNode root) {
        // your code here
    }
}`,
    hint: "Pass a valid range [min, max] down the tree. A node is invalid if its value is outside that range. Going left tightens the max; going right tightens the min. Use Long to handle Integer.MIN_VALUE edge case.",
    solution: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left,  min,       node.val) &&
               validate(node.right, node.val,  max);
    }
}`
  },
  {
    id: 33, title: "Lowest Common Ancestor of BST", category: "Java", pattern: "Tree / BST property", difficulty: "Medium",
    description: `Given a BST and two nodes p and q, find their lowest common ancestor — the deepest node that is an ancestor of both.

Example:
       6
      / \\
     2   8
    / \\ / \\
   0  4 7  9

LCA(2, 8) = 6
LCA(2, 4) = 2`,
    starter: `// TreeNode: int val; TreeNode left, right;
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // your code here
    }
}`,
    hint: "Use the BST property. If both p and q are smaller than root, go left. If both are larger, go right. Otherwise root is the LCA.",
    solution: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val) {
                root = root.left;
            } else if (p.val > root.val && q.val > root.val) {
                root = root.right;
            } else {
                return root;
            }
        }
        return root;
    }
}`
  },

  // ── Linked Lists ───────────────────────────────────────────────────────────

  {
    id: 34, title: "Reverse Linked List", category: "Java", pattern: "Linked list / iteration", difficulty: "Easy",
    description: `Given the head of a singly linked list, reverse the list and return the new head.

Example:
Input:  1 → 2 → 3 → 4 → 5
Output: 5 → 4 → 3 → 2 → 1`,
    starter: `// ListNode: int val; ListNode next;
class Solution {
    public ListNode reverseList(ListNode head) {
        // your code here
    }
}`,
    hint: "Three pointers: prev (null), curr (head), next. At each step: save next, point curr.next to prev, advance both. Return prev when curr is null.",
    solution: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`
  },
  {
    id: 35, title: "Linked List Cycle", category: "Java", pattern: "Linked list / Floyd's", difficulty: "Easy",
    description: `Given the head of a linked list, return true if it has a cycle.

Example:
3 → 2 → 0 → -4
        ↑_________↑   → true (tail links back to node 2)`,
    starter: `// ListNode: int val; ListNode next;
class Solution {
    public boolean hasCycle(ListNode head) {
        // your code here
    }
}`,
    hint: "Floyd's tortoise and hare. slow moves 1 step, fast moves 2. If they ever meet, there's a cycle. If fast reaches null, there isn't.",
    solution: `class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`
  },
  {
    id: 36, title: "Merge Two Sorted Lists", category: "Java", pattern: "Linked list / merge", difficulty: "Easy",
    description: `Merge two sorted linked lists and return the merged list (also sorted).

Example:
Input:  1 → 2 → 4,  1 → 3 → 4
Output: 1 → 1 → 2 → 3 → 4 → 4`,
    starter: `// ListNode: int val; ListNode next;
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // your code here
    }
}`,
    hint: "Use a dummy head node to simplify edge cases. Compare the two heads, attach the smaller one, advance that pointer. Append the remaining non-null list at the end.",
    solution: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0), curr = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                curr.next = list1;
                list1 = list1.next;
            } else {
                curr.next = list2;
                list2 = list2.next;
            }
            curr = curr.next;
        }
        curr.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`
  },
  {
    id: 37, title: "Middle of the Linked List", category: "Java", pattern: "Linked list / Floyd's", difficulty: "Easy",
    description: `Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second one.

Example:
Input:  1 → 2 → 3 → 4 → 5   Output: node 3
Input:  1 → 2 → 3 → 4        Output: node 3 (second middle)`,
    starter: `// ListNode: int val; ListNode next;
class Solution {
    public ListNode middleNode(ListNode head) {
        // your code here
    }
}`,
    hint: "Slow and fast pointers both start at head. Move slow by 1, fast by 2. When fast reaches the end, slow is at the middle.",
    solution: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`
  },

  // ── Backtracking ───────────────────────────────────────────────────────────

  {
    id: 38, title: "Subsets", category: "Java", pattern: "Backtracking", difficulty: "Medium",
    description: `Given an integer array nums of unique elements, return all possible subsets (the power set). The solution must not contain duplicate subsets.

Example:
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`,
    starter: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        // your code here
    }
}`,
    hint: "Backtracking template: add the current state to results at every call (not just at base case). Then loop from 'start' to end, adding each element, recurse, then remove it.",
    solution: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, int start, List<Integer> curr, List<List<Integer>> result) {
        result.add(new ArrayList<>(curr));
        for (int i = start; i < nums.length; i++) {
            curr.add(nums[i]);
            backtrack(nums, i + 1, curr, result);
            curr.remove(curr.size() - 1);
        }
    }
}`
  },
  {
    id: 39, title: "Combination Sum", category: "Java", pattern: "Backtracking", difficulty: "Medium",
    description: `Given an array of distinct integers candidates and a target, return all unique combinations that sum to target. The same number may be used unlimited times.

Example:
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]`,
    starter: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // your code here
    }
}`,
    hint: "Backtracking from index i. At each step, either reuse the same element (recurse with i) or move forward (i+1). Stop when remaining == 0 (add to result) or remaining < 0 (prune).",
    solution: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] cands, int remaining, int start, List<Integer> curr, List<List<Integer>> result) {
        if (remaining == 0) { result.add(new ArrayList<>(curr)); return; }
        for (int i = start; i < cands.length; i++) {
            if (cands[i] <= remaining) {
                curr.add(cands[i]);
                backtrack(cands, remaining - cands[i], i, curr, result);
                curr.remove(curr.size() - 1);
            }
        }
    }
}`
  },
  {
    id: 40, title: "Permutations", category: "Java", pattern: "Backtracking", difficulty: "Medium",
    description: `Given an array nums of distinct integers, return all possible permutations.

Example:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`,
    starter: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        // your code here
    }
}`,
    hint: "Track a boolean used[] array. At each call, try every unused index. Mark it used, recurse, unmark it. When current.size() == nums.length, record the permutation.",
    solution: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, new boolean[nums.length], new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, boolean[] used, List<Integer> curr, List<List<Integer>> result) {
        if (curr.size() == nums.length) { result.add(new ArrayList<>(curr)); return; }
        for (int i = 0; i < nums.length; i++) {
            if (!used[i]) {
                used[i] = true;
                curr.add(nums[i]);
                backtrack(nums, used, curr, result);
                curr.remove(curr.size() - 1);
                used[i] = false;
            }
        }
    }
}`
  },

  // ── Dynamic Programming ────────────────────────────────────────────────────

  {
    id: 41, title: "Coin Change", category: "Java", pattern: "Dynamic programming", difficulty: "Medium",
    description: `Given an array of coin denominations and a total amount, return the fewest number of coins needed to make up that amount. Return -1 if it cannot be done.

Example:
Input: coins = [1,5,11], amount = 15
Output: 3 (5+5+5)

Input: coins = [2], amount = 3
Output: -1`,
    starter: `class Solution {
    public int coinChange(int[] coins, int amount) {
        // your code here
    }
}`,
    hint: "Bottom-up DP. dp[i] = min coins to make amount i. Initialize to amount+1 (infinity). For each amount, try every coin: dp[i] = min(dp[i], dp[i - coin] + 1).",
    solution: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
  },
  {
    id: 42, title: "Word Break", category: "Java", pattern: "Dynamic programming", difficulty: "Medium",
    description: `Given a string s and a dictionary of strings wordDict, return true if s can be segmented into space-separated dictionary words.

Example:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false`,
    starter: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        // your code here
    }
}`,
    hint: "dp[i] = can we form s[0..i]. dp[0] = true. For each i, check all j < i: if dp[j] is true and s.substring(j, i) is in the dictionary, set dp[i] = true.",
    solution: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> words = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && words.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}`
  },
  {
    id: 43, title: "House Robber", category: "Java", pattern: "Dynamic programming", difficulty: "Medium",
    description: `You are a robber planning to rob houses along a street. Adjacent houses have a security alarm — you cannot rob two adjacent houses. Given an array of amounts, return the maximum you can rob.

Example:
Input: nums = [2,7,9,3,1]
Output: 12 (rob houses 0, 2, 4 → 2+9+1=12)`,
    starter: `class Solution {
    public int rob(int[] nums) {
        // your code here
    }
}`,
    hint: "At each house: either skip it (keep prev1) or rob it (prev2 + current). You only need two variables — no full array needed. It's the same recurrence as Fibonacci.",
    solution: `class Solution {
    public int rob(int[] nums) {
        int prev2 = 0, prev1 = 0;
        for (int n : nums) {
            int curr = Math.max(prev1, prev2 + n);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`
  },

  // ── Monotonic Stack & Graphs ───────────────────────────────────────────────

  {
    id: 44, title: "Daily Temperatures", category: "Java", pattern: "Monotonic stack", difficulty: "Medium",
    description: `Given an array temperatures, return an array answer where answer[i] is the number of days until a warmer temperature. If no future day is warmer, answer[i] = 0.

Example:
Input:  [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]`,
    starter: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        // your code here
    }
}`,
    hint: "Monotonic decreasing stack of indices. For each day i, pop all indices from the stack where temperatures[i] > temperatures[stack.peek()]. The answer for each popped index is i - index.",
    solution: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int idx = stack.pop();
                result[idx] = i - idx;
            }
            stack.push(i);
        }
        return result;
    }
}`
  },
  {
    id: 45, title: "Course Schedule", category: "Java", pattern: "Graph / topological sort", difficulty: "Medium",
    description: `There are numCourses labeled 0 to n-1. prerequisites[i] = [a, b] means you must take b before a. Return true if it's possible to finish all courses (i.e. no cycle exists).

Example:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false (cycle)`,
    starter: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // your code here
    }
}`,
    hint: "Build an adjacency list. Run DFS with 3 states per node: 0=unvisited, 1=currently visiting (in path), 2=fully done. If you hit a node with state 1, you found a cycle.",
    solution: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
        for (int[] p : prerequisites) graph.get(p[1]).add(p[0]);
        int[] state = new int[numCourses]; // 0=unvisited,1=visiting,2=done
        for (int i = 0; i < numCourses; i++) {
            if (hasCycle(graph, state, i)) return false;
        }
        return true;
    }

    private boolean hasCycle(List<List<Integer>> graph, int[] state, int node) {
        if (state[node] == 1) return true;
        if (state[node] == 2) return false;
        state[node] = 1;
        for (int neighbor : graph.get(node)) {
            if (hasCycle(graph, state, neighbor)) return true;
        }
        state[node] = 2;
        return false;
    }
}`
  },

  // ── JS primitives ──────────────────────────────────────────────────────────

  {
    id: 46, title: "Implement Array.map()", category: "JS", pattern: "Array prototype", difficulty: "Easy",
    description: `Implement Array.prototype.myMap — a reimplementation of the native .map(). The callback receives (element, index, array).

Example:
[1,2,3].myMap(x => x * 2);      // [2,4,6]
[1,2,3].myMap((x,i) => x + i);  // [1,3,5]`,
    starter: `Array.prototype.myMap = function(callback) {
  // your code here
};`,
    hint: "Loop over this. Push callback(this[i], i, this) for each index into a result array. Don't use the real .map() internally.",
    solution: `Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};`
  },
  {
    id: 47, title: "Implement Array.reduce()", category: "JS", pattern: "Array prototype", difficulty: "Easy",
    description: `Implement Array.prototype.myReduce. If no initialValue is provided, use the first element as the accumulator and start iterating from index 1.

Example:
[1,2,3,4].myReduce((acc, n) => acc + n, 0);  // 10
[1,2,3,4].myReduce((acc, n) => acc + n);      // 10 (no initial value)`,
    starter: `Array.prototype.myReduce = function(callback, initialValue) {
  // your code here
};`,
    hint: "Check if initialValue was provided (use arguments.length or !== undefined). If not, seed acc with this[0] and start i at 1. Then loop, updating acc = callback(acc, this[i], i, this).",
    solution: `Array.prototype.myReduce = function(callback, initialValue) {
  let acc = arguments.length >= 2 ? initialValue : this[0];
  let start = arguments.length >= 2 ? 0 : 1;
  for (let i = start; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};`
  },
  {
    id: 48, title: "Implement Function.bind()", category: "JS", pattern: "Function prototype / closures", difficulty: "Medium",
    description: `Implement Function.prototype.myBind. It should return a new function that, when called, calls the original function with a given this context and prepended arguments (partial application).

Example:
function greet(greeting, name) { return \`\${greeting}, \${name}\`; }
const hi = greet.myBind(null, 'Hi');
hi('Sofia'); // "Hi, Sofia"`,
    starter: `Function.prototype.myBind = function(context, ...args) {
  // your code here
};`,
    hint: "Capture this (the original function) in a variable. Return a new arrow function that calls fn.apply(context, [...args, ...newArgs]) — merging the preset args with any new ones passed at call time.",
    solution: `Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};`
  },
  {
    id: 49, title: "Run Promises in Series", category: "JS", pattern: "Promises / async", difficulty: "Medium",
    description: `Given an array of async task functions (each returns a Promise), run them one after another — not in parallel — and return an array of results in order.

Example:
const tasks = [
  () => Promise.resolve(1),
  () => Promise.resolve(2),
  () => Promise.resolve(3),
];
await runInSeries(tasks); // [1, 2, 3]`,
    starter: `async function runInSeries(tasks) {
  // your code here
}`,
    hint: "Use a for...of loop with await inside — that's it. Each iteration waits for the previous task to finish before starting the next. Collect results in an array.",
    solution: `async function runInSeries(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}

// Alternative — reduce:
function runInSeries(tasks) {
  return tasks.reduce(
    (chain, task) => chain.then(results =>
      task().then(val => [...results, val])
    ),
    Promise.resolve([])
  );
}`
  }
];
