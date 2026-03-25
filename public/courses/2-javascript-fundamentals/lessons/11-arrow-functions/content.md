🧠 **1. What are Arrow Functions?**
Arrow functions are a shorter and cleaner way to write functions.

👉 Introduced in ES6 (modern JavaScript).

🔑 **2. Basic Syntax**
**Normal Function:**
```javascript
function greet() {
    console.log("Hello");
}
```
**Arrow Function:**
```javascript
const greet = () => {
    console.log("Hello");
};
```

⚡ **3. Arrow Function with Parameters**
```javascript
const greet = (name) => {
    console.log(`Hello ${name}`);
};
greet("Raja");
```

✨ **4. Short Form (Single Line)**
```javascript
const add = (a, b) => a + b;
console.log(add(5, 3));
```
👉 No `{}` and no `return` keyword needed for single-line returns.

🔍 **5. Single Parameter Shortcut**
```javascript
const square = x => x * x;
console.log(square(4));
```

⚠️ **6. Important Difference: this**
Arrow functions do **NOT** have their own `this`. They inherit from the parent scope.

❌ **Problem with Arrow in Object Methods:**
```javascript
const person = {
    name: "Raja",
    greet: () => {
        console.log(this.name); // ❌ undefined
    }
};
```
✅ **Correct use in Object Methods:**
```javascript
const person = {
    name: "Raja",
    greet: function() {
        console.log(this.name); // ✅ Raja
    }
};
```

📦 **7. When to Use Arrow Functions**
✅ **Use for:**
- Short, one-line functions
- Callbacks
- Array methods (map, filter, etc.)
❌ **Avoid for:**
- Object methods
- When you specifically need a new `this` context

🌐 **8. Real Website Example**
```html
<button onclick="show()">Click</button>
<script>
const show = () => {
    alert("Button Clicked!");
};
</script>
```

🔥 **9. Arrow Functions with Arrays**
```javascript
let numbers = [1, 2, 3];
let squares = numbers.map(n => n * n);
console.log(squares); // [1, 4, 9]
```
👉 Crucial for modern data transformation and UI rendering.

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Convert this function to arrow function: `function add(a, b) { return a + b; }`
✅ **Solution:** `const add = (a, b) => a + b;`

**Problem 2:** Create arrow function to print your name.
✅ **Solution:** `const printName = () => console.log("Raja");`

🟡 **MEDIUM LEVEL**
**Problem 3:** Create arrow function to calculate square of a number.
✅ **Solution:** `const square = x => x * x;`

**Problem 4:** Use arrow function with array `.map()` to double each number.
✅ **Solution:**
```javascript
let nums = [1, 2, 3];
let doubled = nums.map(n => n * 2);
console.log(doubled);
```

🔴 **HARD LEVEL**
**Problem 5:** Create arrow function that takes an array and returns its sum.
✅ **Solution:**
```javascript
const sumArray = arr => {
    let sum = 0;
    for (let num of arr) { sum += num; }
    return sum;
};
console.log(sumArray([1,2,3,4]));
```

**Problem 6 (Real Website Logic 🚀):** Dynamic list rendering using arrow functions.
```html
<ul id="list"></ul>
<script>
const items = ["HTML", "CSS", "JS"];
const render = () => {
    let output = "";
    items.forEach(item => {
        output += `<li>${item}</li>`;
    });
    document.getElementById("list").innerHTML = output;
};
render();
</script>
```

💡 **Pro Tips**
- Use arrow functions for clean code and short logic.
- Use normal functions when working with `this` in object methods.
- Very important in React, Node.js, and modern APIs.
