🧠 **1. What is a Function?**
A function is a block of reusable code designed to perform a task.

👉 Instead of repeating code, you write once and reuse.

🔑 **2. Basic Function Declaration**
```javascript
function greet() {
    console.log("Hello!");
}
```
👉 **Calling the function:** `greet();`

⚙️ **3. Function with Parameters**
```javascript
function greet(name) {
    console.log("Hello " + name);
}
greet("Raja");
```

🔄 **4. Function with Return Value**
```javascript
function add(a, b) {
    return a + b;
}
let result = add(5, 3);
console.log(result);
```

🧩 **5. Function Expression**
```javascript
const greet = function() {
    console.log("Hello!");
};
```
👉 Stored inside a variable.

⚡ **6. Arrow Functions (Modern 🔥)**
```javascript
const greet = () => {
    console.log("Hello!");
};
```
**Short Form:** `const add = (a, b) => a + b;`

🔍 **7. Types of Functions**
- Named Functions
- Anonymous Functions
- Arrow Functions
- Callback Functions (later topic)

📦 **8. Why Functions Matter**
In your website:
- Handle button clicks
- Process form data
- Call APIs
- Organize code

🌐 **9. Real Website Example**
```html
<input id="num1" type="text">
<input id="num2" type="text">
<button onclick="calculate()">Add</button>

<script>
function calculate() {
    let a = Number(document.getElementById("num1").value);
    let b = Number(document.getElementById("num2").value);
    alert(add(a, b));
}
function add(x, y) {
    return x + y;
}
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create a function that prints "Hello World".
✅ **Solution:**
```javascript
function hello() { console.log("Hello World"); }
hello();
```

**Problem 2:** Create a function that takes a name and prints it.
✅ **Solution:**
```javascript
function printName(name) { console.log(name); }
printName("Raja");
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Create function to find square of number.
✅ **Solution:**
```javascript
function square(n) { return n * n; }
console.log(square(5));
```

**Problem 4:** Convert function to arrow function.
✅ **Solution:**
```javascript
const square = (n) => n * n;
console.log(square(5));
```

🔴 **HARD LEVEL**
**Problem 5:** Create function that takes two numbers and returns the greater number.
✅ **Solution:**
```javascript
function max(a, b) { return (a > b) ? a : b; }
console.log(max(10, 20));
```

**Problem 6 (Real Website Logic 🚀):** Form calculator using functions.
```html
<input id="num1" type="text">
<input id="num2" type="text">
<button onclick="calculate()">Multiply</button>
<script>
function calculate() {
    let a = Number(document.getElementById("num1").value);
    let b = Number(document.getElementById("num2").value);
    alert(multiply(a, b));
}
function multiply(x, y) { return x * y; }
</script>
```

⚠️ **Important Concepts: Hoisting**
```javascript
greet();
function greet() { console.log("Hello"); }
```
👉 Works because function declarations are hoisted.
❌ **Not for Arrow Functions:** `greet(); // Error`

💡 **Pro Tips**
- Use functions to avoid repetition and improve readability.
- Prefer arrow functions for short logic.
- Use meaningful names (e.g., `calculateTotal`, `validateForm`).
