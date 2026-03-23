# Lesson 6: Conditionals (if, else, switch)

🧠 **1. What are Conditionals?**
Conditionals allow your program to execute code based on conditions.

👉 **Example:**
- If user is logged in → show dashboard
- Else → show login page

🔑 **2. if Statement**
```javascript
let age = 20;
if (age >= 18) {
    console.log("Adult");
}
```
👉 Runs only if condition is true.

🔄 **3. if...else**
```javascript
let age = 16;
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
```

🔀 **4. else if (Multiple Conditions)**
```javascript
let marks = 75;

if (marks >= 90) {
    console.log("A Grade");
} else if (marks >= 50) {
    console.log("Pass");
} else {
    console.log("Fail");
}
```

⚡ **5. switch Statement**
Used when checking multiple exact values.
```javascript
let day = 2;

switch(day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    default:
        console.log("Invalid day");
}
```
⚠️ **Important:**
- Always use `break` to stop execution.
- `default` works like `else`.

⚖ **6. Comparison + Logical with Conditionals**
```javascript
let age = 20;
let hasID = true;

if (age >= 18 && hasID) {
    console.log("Allowed");
}
```

🎯 **7. Nested Conditionals**
```javascript
let age = 20;
let isMember = true;

if (age >= 18) {
    if (isMember) {
        console.log("Access granted");
    }
}
```

🌐 **8. Real Website Example**
```html
<input id="age" type="text">
<button onclick="check()">Submit</button>

<script>
function check() {
    let age = Number(document.getElementById("age").value);
    if (age >= 18) {
        alert("Eligible");
    } else {
        alert("Not Eligible");
    }
}
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Check if number is positive or negative.
✅ **Solution:**
```javascript
let num = 5;
if (num >= 0) {
    console.log("Positive");
} else {
    console.log("Negative");
}
```

**Problem 2:** Check if number is even or odd.
✅ **Solution:**
```javascript
let num = 7;
if (num % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Check grade: ≥ 90 → A, ≥ 75 → B, ≥ 50 → C, Else → Fail.
✅ **Solution:**
```javascript
let marks = 80;
if (marks >= 90) {
    console.log("A");
} else if (marks >= 75) {
    console.log("B");
} else if (marks >= 50) {
    console.log("C");
} else {
    console.log("Fail");
}
```

**Problem 4:** Use switch to display month name for number (1-2).
✅ **Solution:**
```javascript
let month = 1;
switch(month) {
    case 1:
        console.log("January");
        break;
    case 2:
        console.log("February");
        break;
    default:
        console.log("Invalid");
}
```

🔴 **HARD LEVEL**
**Problem 5:** Login system check: Username = "admin", Password = "1234".
✅ **Solution:**
```javascript
let username = "admin";
let password = "1234";
if (username === "admin" && password === "1234") {
    console.log("Login Success");
} else {
    console.log("Invalid Credentials");
}
```

**Problem 6 (Real Website Logic 🚀):** Create a form that takes marks as input and shows the grade using conditions.
✅ **Solution:**
```html
<input id="marks" type="text">
<button onclick="grade()">Submit</button>

<script>
function grade() {
    let marks = Number(document.getElementById("marks").value);
    if (marks >= 90) {
        alert("A Grade");
    } else if (marks >= 75) {
        alert("B Grade");
    } else if (marks >= 50) {
        alert("C Grade");
    } else {
        alert("Fail");
    }
}
</script>
```

💡 **Pro Tips**
- Always use `===` instead of `==`.
- Avoid too many nested `if` statements → use `switch` or functions.
- Always validate user input before checking.
