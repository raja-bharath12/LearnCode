🧠 **1. What is a Loop?**
A loop is used to repeat a block of code multiple times.

👉 **Example:**
- Display list of products
- Loop through users
- Generate tables

🔑 **2. for Loop Syntax**
```javascript
for (initialization; condition; update) {
    // code to run
}
```

⚙️ **3. How It Works**
```javascript
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```
Step-by-step: `let i = 1` starts it, `i <= 5` checks condition, `i++` increases it.
👉 **Output:** 1 2 3 4 5

🔄 **4. Reverse Loop**
```javascript
for (let i = 5; i >= 1; i--) {
    console.log(i);
}
```

➕ **5. Loop with Calculations**
```javascript
let sum = 0;
for (let i = 1; i <= 5; i++) {
    sum += i;
}
console.log(sum); // 15
```

📚 **6. Loop Through Arrays**
```javascript
let fruits = ["Apple", "Banana", "Mango"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
```

⛔ **7. Break & Continue**
- 🔴 `break` → stops loop: `if (i === 3) break;` (Output: 1 2)
- 🟡 `continue` → skip one iteration: `if (i === 3) continue;` (Output: 1 2 4 5)

🌐 **8. Real Website Example**
```html
<ul id="list"></ul>
<script>
let items = ["HTML", "CSS", "JavaScript"];
let output = "";
for (let i = 0; i < items.length; i++) {
    output += `<li>${items[i]}</li>`;
}
document.getElementById("list").innerHTML = output;
</script>
```
👉 Used for product listings, dashboards, and data rendering.

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Print numbers from 1 to 10.
✅ **Solution:**
```javascript
for (let i = 1; i <= 10; i++) { console.log(i); }
```

**Problem 2:** Print even numbers from 1 to 10.
✅ **Solution:**
```javascript
for (let i = 1; i <= 10; i++) { if (i % 2 === 0) console.log(i); }
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Find sum of first 10 numbers.
✅ **Solution:**
```javascript
let sum = 0;
for (let i = 1; i <= 10; i++) { sum += i; }
console.log(sum);
```

**Problem 4:** Print multiplication table of 5.
✅ **Solution:**
```javascript
for (let i = 1; i <= 10; i++) { console.log(`5 x ${i} = ${5 * i}`); }
```

🔴 **HARD LEVEL**
**Problem 5:** Print pattern:
```text
*
**
***
****
```
✅ **Solution:**
```javascript
for (let i = 1; i <= 4; i++) {
    let pattern = "";
    for (let j = 1; j <= i; j++) { pattern += "*"; }
    console.log(pattern);
}
```

**Problem 6 (Real Website Logic 🚀):** Display numbers in HTML list dynamically.
✅ **Solution:**
```html
<ul id="numbers"></ul>
<script>
let output = "";
for (let i = 1; i <= 5; i++) { output += `<li>Number ${i}</li>`; }
document.getElementById("numbers").innerHTML = output;
</script>
```

💡 **Pro Tips**
- Use `for` when you know start and end points.
- Use arrays + loops for dynamic UI.
- Combine with template literals for cleaner code.
