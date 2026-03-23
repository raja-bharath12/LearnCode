# Lesson 4: JavaScript Operators

🧠 **1. What are Operators?**
Operators are symbols used to perform operations on values (operands).

👉 **Example:**
```javascript
let sum = 5 + 3;
```
- `+` → operator
- `5, 3` → operands

🔑 **2. Types of Operators**
JavaScript operators are mainly:
- Arithmetic
- Assignment
- Comparison
- Logical
- Unary
- Ternary

➕ **3. Arithmetic Operators**
Used for mathematical operations.
```javascript
let a = 10;
let b = 5;

console.log(a + b); // 15
console.log(a - b); // 5
console.log(a * b); // 50
console.log(a / b); // 2
console.log(a % b); // 0 (remainder)
```
🔥 **Increment / Decrement**
```javascript
let x = 5;
x++; // 6
x--; // 5
```

📝 **4. Assignment Operators**
```javascript
let x = 10;
x += 5; // 15
x -= 2; // 13
x *= 2; // 26
x /= 2; // 13
```

⚖️ **5. Comparison Operators**
Used to compare values → returns true/false.
```javascript
console.log(10 == "10");  // true (loose equality)
console.log(10 === "10"); // false (strict equality) ✅ (recommended)
console.log(10 != 5);     // true
console.log(10 > 5);      // true
```

🔗 **6. Logical Operators**
Used for conditions.
```javascript
let a = true;
let b = false;

console.log(a && b); // false (AND)
console.log(a || b); // true  (OR)
console.log(!a);     // false (NOT)
```

⚡ **7. Unary Operators**
Works on one value.
```javascript
let x = 5;
console.log(typeof x); // number
console.log(-x);       // -5
```

❓ **8. Ternary Operator (Shortcut for if-else)**
```javascript
let age = 18;
let result = (age >= 18) ? "Adult" : "Minor";
console.log(result);
```

🌐 **9. Real Website Example**
```html
<input id="age" type="text">
<button onclick="checkAge()">Check</button>

<script>
function checkAge() {
    let age = Number(document.getElementById("age").value);
    if (age >= 18) {
        alert("You can vote");
    } else {
        alert("Too young");
    }
}
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Add two numbers and print result.
✅ **Solution:**
```javascript
let a = 5;
let b = 3;
console.log(a + b);
```

**Problem 2:** Check if number is greater than 10.
✅ **Solution:**
```javascript
let num = 15;
console.log(num > 10);
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Check if number is even using `%`.
✅ **Solution:**
```javascript
let num = 8;
if (num % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}
```

**Problem 4:** Use logical operators to check: Age > 18 AND has ID.
✅ **Solution:**
```javascript
let age = 20;
let hasID = true;
if (age > 18 && hasID) {
    console.log("Allowed");
}
```

🔴 **HARD LEVEL**
**Problem 5:** Use ternary operator: If marks ≥ 50 → Pass, Else → Fail.
✅ **Solution:**
```javascript
let marks = 60;
let result = (marks >= 50) ? "Pass" : "Fail";
console.log(result);
```

**Problem 6 (Real Website Logic 🚀):** Create a form where you enter two numbers and show their sum and the greater number.
✅ **Solution:**
```html
<input id="num1" type="text">
<input id="num2" type="text">
<button onclick="calculate()">Submit</button>

<script>
function calculate() {
    let a = Number(document.getElementById("num1").value);
    let b = Number(document.getElementById("num2").value);
    let sum = a + b;
    let greater = (a > b) ? a : b;
    alert("Sum: " + sum + " | Greater: " + greater);
}
</script>
```

💡 **Pro Tips**
- Always use `===` instead of `==`
- Use `%` for Even/Odd checks or cycles
- Use ternary for clean, single-line conditions
