export const CHEATSHEETS = [
  {
    id: "java-syntax",
    title: "Java syntax",
    category: "Java",
    content: [
      {
        heading: "HashMap",
        code: `HashMap<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.get("a");
map.getOrDefault("a", 0);   // safe — no null
map.containsKey("a");
map.remove("a");
map.size();

// iterate
for (Map.Entry<String, Integer> e : map.entrySet()) {
    e.getKey(); e.getValue();
}
for (String k : map.keySet()) { }
for (int v : map.values()) { }`
      },
      {
        heading: "HashMap with List value (grouping)",
        code: `Map<String, List<Integer>> map = new HashMap<>();

// cleanest way — creates list if absent
map.computeIfAbsent("a", k -> new ArrayList<>()).add(1);

// or manually
map.putIfAbsent("a", new ArrayList<>());
map.get("a").add(1);`
      },
      {
        heading: "ArrayList",
        code: `List<Integer> list = new ArrayList<>();
list.add(1);
list.get(0);
list.set(0, 99);
list.remove(0);                    // by index
list.remove(Integer.valueOf(5));   // by value
list.size();
list.contains(1);
list.isEmpty();
Collections.sort(list);
Collections.reverse(list);`
      },
      {
        heading: "HashSet",
        code: `Set<Integer> set = new HashSet<>();
set.add(1);
set.contains(1);
set.remove(1);
set.size();

// trick: add() returns false if already exists
if (!seen.add(n)) return true; // contains duplicate`
      },
      {
        heading: "Stack / Queue / Deque",
        code: `// Stack (LIFO)
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);   // add to front
stack.pop();     // remove from front
stack.peek();    // read front

// Queue (FIFO) — use for BFS
Queue<Integer> q = new ArrayDeque<>();
q.offer(1);    // add to back
q.poll();      // remove from front
q.peek();      // read front

// Min heap
PriorityQueue<Integer> pq = new PriorityQueue<>();
// Max heap
PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
pq.offer(1);
pq.poll();    // always removes smallest
pq.peek();`
      },
      {
        heading: "Arrays",
        code: `int[] arr = new int[5];          // zeros
int[] arr = {1, 2, 3};
arr.length;                      // no parens!
Arrays.sort(arr);
Arrays.fill(arr, 0);
Arrays.toString(arr);            // for debug printing

// 2D
int[][] grid = new int[rows][cols];
grid[i][j];

// sort with comparator (e.g. intervals by start)
Arrays.sort(intervals, (a, b) -> a[0] - b[0]);`
      },
      {
        heading: "String",
        code: `s.length();           // HAS parens (unlike arrays)
s.charAt(0);
s.substring(1, 3);   // [1,3) — j is exclusive
s.equals("abc");     // NEVER use ==
s.toLowerCase();
s.contains("ab");
s.indexOf("a");      // -1 if not found
s.split(",");        // returns String[]
s.replace("a","b");
s.toCharArray();     // → char[]
new String(chars);   // char[] → String

// char tricks
char c = s.charAt(0);
int i = c - 'a';    // 'a'→0, 'b'→1 (frequency arrays)

// building strings in a loop
StringBuilder sb = new StringBuilder();
sb.append("hi");
sb.append(42);
sb.reverse();
sb.toString();

// conversions
Integer.parseInt("3");   // String → int
String.valueOf(42);      // int → String`
      },
      {
        heading: "Gotchas vs TypeScript",
        code: `// Integer vs int — watch boxing
int a = map.getOrDefault("x", 0);  // safe
Integer a = map.get("x");           // can be null → NPE

// String comparison — never ==
s1.equals(s2);   // correct
s1 == s2;        // WRONG (reference equality)

// Array length — no parens
arr.length       // correct
s.length()       // String DOES have parens

// Integer overflow
long x = (long) a * b;

// computeIfAbsent lambda
map.computeIfAbsent(key, k -> new ArrayList<>()).add(val);`
      },
      {
        heading: "For loop variants",
        code: `// for-each — 90% of cases
for (int n : nums) { }

// standard — when you need index
for (int i = 0; i < nums.length; i++) { }

// reverse
for (int i = nums.length - 1; i >= 0; i--) { }

// two pointers
int l = 0, r = nums.length - 1;
while (l < r) { l++; r--; }

// chars in string
for (char c : s.toCharArray()) { }

// map entries
for (Map.Entry<String, Integer> e : map.entrySet()) { }`
      }
    ]
  },
  {
    id: "java-patterns",
    title: "Java patterns",
    category: "Java",
    content: [
      {
        heading: "Two pointers — opposite ends",
        code: `// sorted array, palindrome, pair sum
int l = 0, r = arr.length - 1;
while (l < r) {
    if (arr[l] + arr[r] == target) return true;
    else if (arr[l] + arr[r] < target) l++;
    else r--;
}`
      },
      {
        heading: "Sliding window — variable size",
        code: `// longest substring, minimum window
int l = 0, max = 0;
Map<Character, Integer> freq = new HashMap<>();
for (int r = 0; r < s.length(); r++) {
    freq.merge(s.charAt(r), 1, Integer::sum);
    while (/* window invalid */) {
        freq.merge(s.charAt(l), -1, Integer::sum);
        if (freq.get(s.charAt(l)) == 0) freq.remove(s.charAt(l));
        l++;
    }
    max = Math.max(max, r - l + 1);
}`
      },
      {
        heading: "HashMap — frequency count",
        code: `// count occurrences of each element
Map<Integer, Integer> freq = new HashMap<>();
for (int n : nums) {
    freq.put(n, freq.getOrDefault(n, 0) + 1);
}
// use: anagrams, top K frequent, first unique char`
      },
      {
        heading: "HashMap — Two Sum style",
        code: `// store value→index, look up complement
Map<Integer, Integer> map = new HashMap<>();
for (int i = 0; i < nums.length; i++) {
    int complement = target - nums[i];
    if (map.containsKey(complement)) {
        return new int[]{map.get(complement), i};
    }
    map.put(nums[i], i);
}`
      },
      {
        heading: "HashMap — prefix sum",
        code: `// subarray sum equals k
Map<Integer, Integer> map = new HashMap<>();
map.put(0, 1);
int sum = 0, count = 0;
for (int n : nums) {
    sum += n;
    count += map.getOrDefault(sum - k, 0);
    map.put(sum, map.getOrDefault(sum, 0) + 1);
}`
      },
      {
        heading: "Stack — matching pairs",
        code: `// valid parentheses
Deque<Character> stack = new ArrayDeque<>();
for (char c : s.toCharArray()) {
    if (c == '(') stack.push(c);
    else if (!stack.isEmpty() && stack.peek() == '(') stack.pop();
    else return false;
}
return stack.isEmpty();`
      },
      {
        heading: "BFS — level order",
        code: `// shortest path, tree level order
Queue<Integer> q = new ArrayDeque<>();
Set<Integer> visited = new HashSet<>();
q.offer(start);
visited.add(start);
int steps = 0;
while (!q.isEmpty()) {
    int size = q.size();
    for (int i = 0; i < size; i++) {
        int node = q.poll();
        if (node == target) return steps;
        for (int neighbor : graph.get(node)) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                q.offer(neighbor);
            }
        }
    }
    steps++;
}`
      },
      {
        heading: "Kadane's — maximum subarray",
        code: `int curr = nums[0], best = nums[0];
for (int i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    best = Math.max(best, curr);
}
return best;`
      },
      {
        heading: "Top K — PriorityQueue",
        code: `// keep a min-heap of size k
PriorityQueue<Integer> pq = new PriorityQueue<>();
for (int n : nums) {
    pq.offer(n);
    if (pq.size() > k) pq.poll(); // evict smallest
}
// pq now contains top k largest elements`
      },
      {
        heading: "Sort then scan — intervals",
        code: `// merge intervals
Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
List<int[]> result = new ArrayList<>();
result.add(intervals[0]);
for (int[] curr : intervals) {
    int[] last = result.get(result.size() - 1);
    if (curr[0] <= last[1]) last[1] = Math.max(last[1], curr[1]);
    else result.add(curr);
}`
      }
    ]
  },
  {
    id: "js-patterns",
    title: "JS patterns",
    category: "JS",
    content: [
      {
        heading: "Closures",
        code: `// a closure is a function that remembers its outer scope
function makeCounter() {
  let count = 0;           // lives in closure
  return function() {
    return ++count;        // accesses outer count
  };
}
const counter = makeCounter();
counter(); // 1
counter(); // 2

// classic gotcha — var in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // prints 3,3,3
}
// fix: use let, or wrap in IIFE`
      },
      {
        heading: "this binding",
        code: `// 'this' depends on HOW a function is called
const obj = {
  name: "Sofia",
  greet() { return this.name; }     // this = obj
};

const fn = obj.greet;
fn();                               // this = undefined (strict) / window

// fix with bind
const bound = obj.greet.bind(obj);
bound();                            // "Sofia"

// arrow functions don't have own this
const obj2 = {
  name: "Sofia",
  greet: () => this.name           // this = outer scope, NOT obj2
};`
      },
      {
        heading: "Promises",
        code: `// create
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 100);
});

// consume
p.then(val => console.log(val))
 .catch(err => console.error(err))
 .finally(() => console.log("always"));

// async/await — same thing, cleaner
async function fetchData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// race and all
Promise.race([p1, p2]);            // first to settle wins
Promise.all([p1, p2]);             // waits for all, fails fast
Promise.allSettled([p1, p2]);      // waits for all, never rejects`
      },
      {
        heading: "Array methods",
        code: `const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2);              // [2,4,6,8,10]
nums.filter(n => n % 2 === 0);    // [2,4]
nums.reduce((acc, n) => acc + n, 0); // 15
nums.find(n => n > 3);             // 4
nums.findIndex(n => n > 3);        // 3
nums.some(n => n > 4);             // true
nums.every(n => n > 0);            // true
nums.flat();                       // flattens one level
nums.flatMap(n => [n, n * 2]);     // map + flat

// sort — always provide comparator for numbers
[3,1,2].sort((a, b) => a - b);    // ascending
[3,1,2].sort((a, b) => b - a);    // descending

// spread and destructuring
const copy = [...nums];
const [first, ...rest] = nums;
const merged = [...arr1, ...arr2];`
      },
      {
        heading: "Debounce pattern",
        code: `function debounce(fn, t) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), t);
  };
}
// use: search input, resize handler
// fires fn only after t ms of silence`
      },
      {
        heading: "Throttle pattern",
        code: `function throttle(fn, t) {
  let onCooldown = false;
  return function(...args) {
    if (onCooldown) return;
    fn.apply(this, args);
    onCooldown = true;
    setTimeout(() => onCooldown = false, t);
  };
}
// use: scroll handler, button click rate limiting
// fires fn at most once per t ms`
      },
      {
        heading: "Memoize pattern",
        code: `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
// use: expensive pure functions, recursive DP`
      },
      {
        heading: "Event emitter",
        code: `class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(l => l(...args));
  }
  off(event, listener) {
    this.events[event] = (this.events[event] || [])
      .filter(l => l !== listener);
  }
}`
      },
      {
        heading: "Prototype / class",
        code: `// modern class syntax
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return \`\${this.name} speaks\`;
  }
}

class Dog extends Animal {
  speak() {
    return \`\${this.name} barks\`;
  }
}

// prototype equivalent (older)
function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return this.name; };`
      }
    ]
  },
  {
    id: "react-patterns",
    title: "React patterns",
    category: "React",
    content: [
      {
        heading: "useState",
        code: `const [value, setValue] = useState(initialValue);

// examples
const [count, setCount]   = useState(0);
const [open, setOpen]     = useState(false);
const [name, setName]     = useState("");
const [form, setForm]     = useState({ name: "", email: "" });

// updating
setCount(5);                              // set directly
setCount(prev => prev + 1);              // use previous value (safer)
setForm(prev => ({ ...prev, name: "Sofia" })); // update one field`
      },
      {
        heading: "useEffect",
        code: `// runs on mount only
useEffect(() => {
  fetchData();
}, []);

// runs when dep changes
useEffect(() => {
  document.title = count;
}, [count]);

// cleanup — runs before next effect or unmount
useEffect(() => {
  const sub = subscribe();
  return () => sub.unsubscribe();
}, []);

// fetch pattern
useEffect(() => {
  let cancelled = false;
  async function load() {
    const data = await fetchSomething();
    if (!cancelled) setData(data);
  }
  load();
  return () => { cancelled = true; };
}, [id]);`
      },
      {
        heading: "useRef",
        code: `const ref = useRef(initialValue);  // read — does NOT trigger re-render

// common uses
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();  // imperative DOM access

// store previous value
const prevCount = useRef(count);
useEffect(() => {
  prevCount.current = count;
}, [count]);`
      },
      {
        heading: "useCallback",
        code: `const handleClick = useCallback(() => {
  doSomethingWith(id);
}, [id]);  // only recreates when id changes

// use: avoid triggering child re-renders
// when a child wrapped in React.memo receives a function prop,
// without useCallback the function is a new reference every render`
      },
      {
        heading: "useMemo",
        code: `const expensiveResult = useMemo(() => {
  return computeExpensiveThing(data);
}, [data]);  // only recomputes when data changes

// use: expensive derivations — filtering large lists,
// complex transformations. Don't overuse for cheap ops.`
      },
      {
        heading: "Context",
        code: `// create
const ThemeContext = createContext("light");

// provide
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// consume
const theme = useContext(ThemeContext);

// avoids prop drilling for global state: theme, auth, locale`
      },
      {
        heading: "Controlled inputs / forms",
        code: `// controlled — React owns the value
const [value, setValue] = useState("");
<input value={value} onChange={e => setValue(e.target.value)} />

// common form pattern
const [form, setForm] = useState({ name: "", email: "" });
const handleChange = e => {
  setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
};
<input name="name"  value={form.name}  onChange={handleChange} />
<input name="email" value={form.email} onChange={handleChange} />`
      },
      {
        heading: "Lists & conditional rendering",
        code: `// always provide a stable key
items.map(item => (
  <li key={item.id}>{item.name}</li>
));
// Never use index as key if list can reorder

// conditional rendering
{isLoading && <Spinner />}
{error ? <Error msg={error} /> : <Data />}
{user && <Profile user={user} />}`
      },
      {
        heading: "Async state (data fetching)",
        code: `const [data,      setData]      = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error,     setError]     = useState(null);

useEffect(() => {
  fetch("/api/data")
    .then(res => { if (!res.ok) throw new Error("Failed"); return res.json(); })
    .then(data => setData(data))
    .catch(err => setError(err.message))
    .finally(() => setIsLoading(false));
}, []);

if (isLoading) return <p>Loading...</p>;
if (error)     return <p>Error: {error}</p>;
return <div>{data.title}</div>;`
      },
      {
        heading: "Component structure",
        code: `function MyComponent({ title, onClose }) {  // props destructured
  const [open, setOpen] = useState(false);   // state

  useEffect(() => {                           // side effects
    document.title = title;
  }, [title]);

  const handleClick = () => setOpen(true);   // handlers
  const handleClose = () => { setOpen(false); onClose(); };

  return (                                   // JSX
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Open</button>
      {open && <Modal onClose={handleClose} />}
    </div>
  );
}`
      },
      {
        heading: "Common bugs",
        code: `// 1. Stale closure — state captured at render time
useEffect(() => {
  setInterval(() => console.log(count), 1000); // always logs initial count
}, []);
// fix: add count to dep array, or use a ref

// 2. State batching — setCount called twice = +1 not +2
setCount(count + 1);  // stale
setCount(count + 1);  // stale (same count)
setCount(prev => prev + 1);  // correct — uses latest

// 3. Object state — always spread
setState({ name: "Sofia" });               // loses other fields
setState(prev => ({ ...prev, name: "Sofia" }));  // correct

// 4. Direct mutation — no re-render
state.items.push(newItem);                 // wrong
setState([...items, newItem]);             // correct`
      },
    ]
  }
];
