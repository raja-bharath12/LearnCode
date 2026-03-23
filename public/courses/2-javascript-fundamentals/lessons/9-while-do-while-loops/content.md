# Lesson 9: while & do...while Loops

🧠 **1. What is a while Loop?**
A while loop runs as long as a condition is true.

🔑 **2. Syntax of while**
```javascript
while (condition) {
    // code
}
```

⚙️ **3. Example**
```javascript
let i = 1;
while (i <= 5) {
    console.log(i);
    i++;
}
```
👉 **Output:** 1 2 3 4 5

⚠️ **4. Important Rule**
👉 **Always update the variable inside loop!** Otherwise, you get an **Infinite Loop** ❌.

🔄 **5. do...while Loop**
👉 **Runs at least once**, even if condition is false.

🔑 **Syntax**
```javascript
do {
    // code
} while (condition);
```

⚙️ **Example**
```javascript
let i = 1;
do {
    console.log(i);
    i++;
} while (i <= 5);
```

🔍 **Key Difference**
| Feature | while | do...while |
| :--- | :--- | :--- |
| **Check condition first?** | Yes | No |
| **Runs at least once?** | No | Yes |

🌐 **6. Real Website Example**
```html
<input id="num" type="text">
<button onclick="check()">Submit</button>

<script>
function check() {
    let num = Number(document.getElementById("num").value);
    while (num <= 0) {
        alert("Enter positive number");
        break;
    }
    if (num > 0) {
        alert("Valid number");
    }
}
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Print numbers from 1 to 5 using `while`.
✅ **Solution:**
```javascript
let i = 1;
while (i <= 5) { console.log(i); i++; }
```

**Problem 2:** Print numbers from 5 to 1.
✅ **Solution:**
```javascript
let i = 5;
while (i >= 1) { console.log(i); i--; }
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Find sum of numbers from 1 to 10.
✅ **Solution:**
```javascript
let i = 1, sum = 0;
while (i <= 10) { sum += i; i++; }
console.log(sum);
```

**Problem 4:** Print even numbers using `do...while`.
✅ **Solution:**
```javascript
let i = 1;
do {
    if (i % 2 === 0) console.log(i);
    i++;
} while (i <= 10);
```

🔴 **HARD LEVEL**
**Problem 5:** Keep asking user input until they enter a number > 10 (Simulated).
✅ **Solution:**
```javascript
let num = 5;
while (num <= 10) {
    console.log("Number too small");
    num++; // simulate user input
}
console.log("Valid number:", num);
```

**Problem 6 (Real Website Logic 🚀):** Simple retry system.
```html
<input id="password" type="text">
<button onclick="check()">Login</button>
<script>
function check() {
    let correct = "1234";
    let input = document.getElementById("password").value;
    let attempts = 1;
    while (input !== correct && attempts < 3) {
        alert("Wrong password");
        attempts++;
        break;
    }
    if (input === correct) alert("Login Success");
    else alert("Access Denied");
}
</script>
```

💡 **Pro Tips**
- Use `while` for condition-based loops and unknown iterations.
- Use `do...while` when code must run at least once.
- Always avoid infinite loops ❌.
