🧠 **1. What are Data Types?**
Data types define what kind of value a variable holds.

👉 **Example:**
```javascript
let name = "Raja";   // String
let age = 20;        // Number
```

🔑 **2. Types of Data in JavaScript**
JavaScript has 2 main categories:

📦 **Primitive Types (Basic)**
- String
- Number
- Boolean
- Undefined
- Null
- BigInt
- Symbol

🧱 **Non-Primitive Types (Complex)**
- Object
- Array
- Function

🧵 **3. Primitive Data Types (with Examples)**
🔤 **String (Text)**
```javascript
let name = "Raja";
```
👉 Used for: Names, Messages, Input values

🔢 **Number**
```javascript
let age = 20;
let price = 99.99;
```
👉 Includes: Integers, Decimals

✅ **Boolean (True/False)**
```javascript
let isLoggedIn = true;
```
👉 Used for: Conditions, Login status

❓ **Undefined**
```javascript
let x;
console.log(x); // undefined
```
👉 Variable declared but not assigned

🚫 **Null**
```javascript
let data = null;
```
👉 Intentional empty value

🔢 **BigInt**
```javascript
let big = 1234567890123456789n;
```
👉 For very large numbers

🔐 **Symbol (Advanced)**
```javascript
let id = Symbol("id");
```
👉 Used in advanced object handling

🧱 **4. Non-Primitive Data Types**
📦 **Object**
```javascript
let person = {
    name: "Raja",
    age: 20
};
```
📚 **Array**
```javascript
let numbers = [1, 2, 3];
```
⚙️ **Function**
```javascript
function greet() {
    console.log("Hello");
}
```

🔍 **5. typeof Operator**
Used to check data type of a variable.

📌 **Syntax:** `typeof variable`

🧪 **Examples:**
```javascript
console.log(typeof "Raja");     // string
console.log(typeof 25);         // number
console.log(typeof true);       // boolean
console.log(typeof undefined);  // undefined
console.log(typeof null);       // object ⚠️ (JS bug)
```
⚠️ **Important Interview Point:** `typeof null` returns "object" (known JavaScript bug).

🌐 **Real Website Example**
```html
<input id="age" type="text">
<button onclick="checkType()">Check</button>

<script>
function checkType() {
    let value = document.getElementById("age").value;
    console.log(typeof value); // always string from input
}
</script>
```
👉 HTML input always gives string

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create variables of type: String, Number, Boolean. Print their types.
✅ **Solution:**
```javascript
let name = "Raja";
let age = 20;
let isStudent = true;
console.log(typeof name, typeof age, typeof isStudent);
```

**Problem 2:** Check type of undefined variable.
✅ **Solution:**
```javascript
let x;
console.log(typeof x); // undefined
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Create an array and object. Check their types.
✅ **Solution:**
```javascript
let arr = [1,2,3];
let obj = {name: "Raja"};
console.log(typeof arr, typeof obj); // object, object
```

**Problem 4:** Check type of null and explain.
✅ **Solution:**
```javascript
let data = null;
console.log(typeof data); // object
```
👉 **Explanation:** This is a JavaScript bug (important!)

🔴 **HARD LEVEL**
**Problem 5:** Take input from user and: 1. Check its type 2. Convert it to number 3. Print new type
✅ **Solution:**
```html
<input id="input" type="text">
<button onclick="check()">Check</button>

<script>
function check() {
    let value = document.getElementById("input").value;
    console.log(typeof value); // string
    let num = Number(value);
    console.log(typeof num); // number
}
</script>
```

**Problem 6 (Real Website Logic 🚀):** Build a form that: 1. Takes age input 2. Checks if it's number 3. Displays error if not
✅ **Solution:**
```html
<input id="age" type="text">
<button onclick="validate()">Submit</button>

<script>
function validate() {
    let age = document.getElementById("age").value;
    if (isNaN(age)) {
        alert("Please enter a valid number");
    } else {
        alert("Valid age: " + age);
    }
}
</script>
```

💡 **Pro Tips**
- Always check type when handling user input
- Inputs from HTML are always strings
- Use `Number()`, `parseInt()`, `parseFloat()`
