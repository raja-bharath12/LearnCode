# Lesson 2: Variables (var, let, const)

🧠 **1. What is a Variable?**
A variable is a container used to store data.

👉 **Example:**
```javascript
let name = "Raja";
```
- `name` → variable
- `"Raja"` → value

🔑 **2. Types of Variable Declarations**
JavaScript has 3 ways:
1. `var` (old way ❌)
2. `let` (modern ✅)
3. `const` (modern + constant ✅)

📦 **3. var (Old Method)**
```javascript
var age = 20;
```
⚠️ **Problems with var:**
- Function-scoped (not block-scoped)
- Can be redeclared
- Causes bugs in large apps

```javascript
var x = 10;
var x = 20; // Allowed (bad practice)
```

🆕 **4. let (Modern & Recommended)**
```javascript
let city = "Chennai";
```
✅ **Features:**
- Block-scoped
- Cannot redeclare
- Can update value

```javascript
let score = 50;
score = 80; // ✅ allowed
```

🔒 **5. const (Constant Value)**
```javascript
const pi = 3.14;
```
✅ **Features:**
- Block-scoped
- Cannot redeclare
- Cannot reassign

```javascript
const a = 10;
a = 20; // ❌ Error
```
👉 **BUT for objects/arrays:**
```javascript
const arr = [1,2];
arr.push(3); // ✅ allowed
```

🔍 **6. Difference Table**
| Feature | `var` ❌ | `let` ✅ | `const` 🔒 |
| :--- | :--- | :--- | :--- |
| **Scope** | Function | Block | Block |
| **Redeclare** | Yes | No | No |
| **Reassign** | Yes | Yes | No |
| **Modern Use** | No | Yes | Yes |

⚙️ **7. Block Scope Example**
```javascript
{
    let a = 10;
    var b = 20;
}

console.log(b); // ✅ Works
console.log(a); // ❌ Error
```
👉 `let` stays inside `{}` block
👉 `var` leaks outside (danger)

🌐 **8. Real Website Example**
```html
<input id="name" type="text">
<button onclick="showName()">Submit</button>

<script>
function showName() {
    let userName = document.getElementById("name").value;
    const message = "Hello " + userName;
    alert(message);
}
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create a variable `age` using `let` and assign value 25. Print it.
✅ **Solution:**
```javascript
let age = 25;
console.log(age);
```

**Problem 2:** Create a constant `country = "India"` and print it.
✅ **Solution:**
```javascript
const country = "India";
console.log(country);
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Try redeclaring a `let` variable and observe error.
✅ **Solution:**
```javascript
let x = 10;
let x = 20; // ❌ Error
```
👉 **Explanation:** `let` cannot be redeclared

**Problem 4:** Update a variable value using `let`.
✅ **Solution:**
```javascript
let score = 50;
score = 100;
console.log(score);
```

🔴 **HARD LEVEL**
**Problem 5:** Create a block and:
1. Declare `var` and `let`
2. Print both outside the block
✅ **Solution:**
```javascript
{
    var a = 10;
    let b = 20;
}

console.log(a); // ✅ 10
console.log(b); // ❌ Error
```

**Problem 6 (Real Website Logic 🚀):** Create a simple form:
1. Store user name using `let`
2. Use `const` for greeting message
✅ **Solution:**
```html
<input type="text" id="user">
<button onclick="greet()">Submit</button>

<script>
function greet() {
    let name = document.getElementById("user").value;
    const greeting = "Welcome " + name;
    alert(greeting);
}
</script>
```

💡 **Pro Tips**
- Always prefer: `const` → default, `let` → when value changes
- Avoid `var` ❌
- Helps avoid bugs in big projects
