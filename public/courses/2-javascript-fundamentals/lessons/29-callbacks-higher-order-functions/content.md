# Lesson 29: Callbacks & Higher-Order Functions

🧠 **1. What is a Callback?**
A callback is a function passed as an argument to another function.

👉 **Concept:** "Call me back later when you're done."

🔑 **2. Basic Example**
```javascript
function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

greet("Raja", () => {
    console.log("I am a callback!");
});
```

⚙️ **3. What are Higher-Order Functions?**
A function that:
1. Takes a function as an argument OR
2. Returns a function as a result

🚀 **4. Built-in Higher-Order Functions**
- `map()`, `filter()`, `reduce()`
- `setTimeout()`, `setInterval()`
- `addEventListener()`

```javascript
setTimeout(() => {
    console.log("2 seconds later...");
}, 2000);
```

🔥 **5. Array Methods (The Real Heroes 🔥)**
```javascript
let nums = [1, 2, 3];
// .map takes a callback function!
let doubled = nums.map(n => n * 2);
```

⚠️ **6. Callback Hell ❌**
When you nest too many callbacks.
```javascript
step1(() => {
    step2(() => {
        step3(() => {
            // Hard to read!
        });
    });
});
```
✅ **Solution:** Use Promises or `async/await`.

🌐 **7. Real Website Example**
- Handling Button clicks (`addEventListener`)
- Waiting for API data
- Changing state in React

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Pass a simple `alert` function as a callback to another function.
✅ **Solution:** `function run(cb) { cb(); } run(() => alert("Hi"));`

**Problem 2:** Use `setTimeout` as a higher-order function to print a message after 1 second.
✅ **Solution:** `setTimeout(() => console.log("Done"), 1000);`

🟡 **MEDIUM LEVEL**
**Problem 3:** Write a function `math(a, b, op)` where `op` is a callback for `add` or `multiply`.
✅ **Solution:**
```javascript
function math(a, b, op) { return op(a, b); }
console.log(math(2, 3, (x, y) => x + y));
```

**Problem 4:** Use `.filter()` to find numbers > 10.
✅ **Solution:** `[5, 12, 8, 20].filter(n => n > 10);`

🔴 **HARD LEVEL**
**Problem 5:** Create your own custom `forEach` function.
✅ **Solution:**
```javascript
function myForEach(arr, cb) {
    for (let i = 0; i < arr.length; i++) cb(arr[i]);
}
```

**Problem 6 (Real Website Logic 🚀):** Build a manual "Wait for Loading" function using a callback.
```javascript
function loadData(callback) {
    console.log("Loading...");
    setTimeout(() => {
        console.log("Data loaded!");
        callback();
    }, 2000);
}
loadData(() => console.log("Updating UI..."));
```

💡 **Pro Tips**
- Callbacks are fundamental to asynchronous programming.
- Higher-order functions help you write very clean and reusable code.
- Mastering this is key to using modern libraries like React and Redux.
