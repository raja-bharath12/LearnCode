🧠 **1. What is a Switch Statement?**
A switch is used to compare one value against multiple possible cases.

👉 Instead of writing many `if...else`, you use `switch` for cleaner code.

🔑 **2. Basic Syntax**
```javascript
let value = 2;

switch(value) {
    case 1:
        console.log("One");
        break;
    case 2:
        console.log("Two");
        break;
    default:
        console.log("Invalid");
}
```

⚙️ **3. How It Works**
- `switch(value)` → checks the value
- `case` → matches value
- `break` → stops execution
- `default` → runs if no match

⚠️ **4. Importance of break**
Without `break`, all cases below will execute (fall-through).
```javascript
let day = 1;
switch(day) {
    case 1:
        console.log("Monday");
    case 2:
        console.log("Tuesday");
}
```
👉 Output: Monday, Tuesday ❌ (usually a mistake)

🔀 **5. Multiple Cases (Same Output)**
```javascript
let day = 6;
switch(day) {
    case 6:
    case 7:
        console.log("Weekend");
        break;
    default:
        console.log("Weekday");
}
```

🔍 **6. Strict Comparison**
👉 `switch` uses strict equality (`===`).
```javascript
let x = "10";
switch(x) {
    case 10:
        console.log("Number");
        break;
    case "10":
        console.log("String");
        break;
}
```
👉 Output: **String**

🌐 **7. Real Website Example**
```html
<select id="role">
    <option value="admin">Admin</option>
    <option value="user">User</option>
</select>
<button onclick="checkRole()">Login</button>

<script>
function checkRole() {
    let role = document.getElementById("role").value;
    switch(role) {
        case "admin":
            alert("Welcome Admin Dashboard");
            break;
        case "user":
            alert("Welcome User Dashboard");
            break;
        default:
            alert("Invalid Role");
    }
}
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Print day name for number (1–3).
✅ **Solution:**
```javascript
let day = 2;
switch(day) {
    case 1: console.log("Monday"); break;
    case 2: console.log("Tuesday"); break;
    case 3: console.log("Wednesday"); break;
}
```

**Problem 2:** Check fruit name.
✅ **Solution:**
```javascript
let fruit = "apple";
switch(fruit) {
    case "apple": console.log("Red fruit"); break;
    case "banana": console.log("Yellow fruit"); break;
}
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Group grades: A/B → Excellent, C → Good, D → Pass.
✅ **Solution:**
```javascript
let grade = "A";
switch(grade) {
    case "A":
    case "B": console.log("Excellent"); break;
    case "C": console.log("Good"); break;
    case "D": console.log("Pass"); break;
    default: console.log("Fail");
}
```

**Problem 4:** Create calculator using switch.
✅ **Solution:**
```javascript
let a = 10, b = 5, op = "+";
switch(op) {
    case "+": console.log(a + b); break;
    case "-": console.log(a - b); break;
    case "*": console.log(a * b); break;
    case "/": console.log(a / b); break;
}
```

🔴 **HARD LEVEL**
**Problem 5:** Menu system: 1 → Login, 2 → Register, 3 → Exit.
✅ **Solution:**
```javascript
let choice = 1;
switch(choice) {
    case 1: console.log("Login Page"); break;
    case 2: console.log("Register Page"); break;
    case 3: console.log("Exit"); break;
    default: console.log("Invalid Choice");
}
```

**Problem 6 (Real Website Logic 🚀):** Theme changer select menu.
✅ **Solution:**
```html
<select id="theme">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
</select>
<button onclick="changeTheme()">Apply</button>
<script>
function changeTheme() {
    let theme = document.getElementById("theme").value;
    switch(theme) {
        case "light":
            document.body.style.background = "white";
            document.body.style.color = "black";
            break;
        case "dark":
            document.body.style.background = "black";
            document.body.style.color = "white";
            break;
    }
}
</script>
```

💡 **Pro Tips**
- Use `switch` for multiple fixed values.
- Use `if-else` for ranges (>, <).
- Always add `break` and use `default` for safety.
