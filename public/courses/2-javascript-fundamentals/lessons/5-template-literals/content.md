🧠 **1. What are Template Literals?**
Template literals are a modern way to write strings using backticks: `` ` `` (backtick key near Esc).

👉 **They allow:**
- Variable embedding
- Multi-line strings
- Cleaner code

🔤 **2. Basic Syntax**
```javascript
let name = "Raja";
let message = `Hello ${name}`;
console.log(message); // Hello Raja
```

🔥 **3. String Interpolation (${})**
Instead of concatenation with `+`:
```javascript
let name = "Raja";
console.log("Hello " + name);
```
👉 **Use:**
```javascript
let name = "Raja";
console.log(`Hello ${name}`);
```
✅ Cleaner ✅ More readable

🧮 **4. Expressions Inside Template Literals**
You can run calculations inside `${}`.
```javascript
let a = 10;
let b = 5;
console.log(`Sum is ${a + b}`); // Sum is 15
```

📄 **5. Multi-line Strings**
Now (modern way ✅):
```javascript
let text = `Hello
World`;
console.log(text);
```

🌐 **6. Real Website Example**
```html
<input id="name" type="text">
<button onclick="greet()">Submit</button>

<script>
function greet() {
    let name = document.getElementById("name").value;
    let message = `Welcome ${name}, to our website!`;
    alert(message);
}
</script>
```

🎯 **7. Dynamic HTML Creation (Important 🔥)**
```javascript
let product = "Laptop";
let price = 50000;

let html = `<h1>${product}</h1>
<p>Price: ₹${price}</p>`;

document.body.innerHTML = html;
```
👉 Used in E-commerce sites, Dashboards, and API data display.

⚠️ **8. Common Mistakes**
❌ Using quotes instead of backticks: `"Hello ${name}"` // won't work
✅ Correct: `` `Hello ${name}` ``

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create a variable `name` and print: `Hello <name>`
✅ **Solution:**
```javascript
let name = "Raja";
console.log(`Hello ${name}`);
```

**Problem 2:** Print sum using template literal.
✅ **Solution:**
```javascript
let a = 5;
let b = 10;
console.log(`Sum is ${a + b}`);
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Create a multi-line message:
```text
Name: Raja
Age: 20
```
✅ **Solution:**
```javascript
let name = "Raja";
let age = 20;
let text = `Name: ${name}
Age: ${age}`;
console.log(text);
```

**Problem 4:** Create a product display using template literals.
✅ **Solution:**
```javascript
let product = "Phone";
let price = 20000;
console.log(`Product: ${product}, Price: ₹${price}`);
```

🔴 **HARD LEVEL**
**Problem 5:** Take user input and display a personalized message.
✅ **Solution:**
```html
<input id="user" type="text">
<button onclick="show()">Submit</button>

<script>
function show() {
    let name = document.getElementById("user").value;
    alert(`Hello ${name}, welcome back!`);
}
</script>
```

**Problem 6 (Real Website Logic 🚀):** Create dynamic card UI:
✅ **Solution:**
```javascript
let name = "Raja";
let role = "Developer";

let card = `
<div style="border:1px solid black; padding:10px; border-radius: 8px;">
    <h2>${name}</h2>
    <p>Role: ${role}</p>
</div>
`;

document.body.innerHTML = card;
```

💡 **Pro Tips**
- Always use template literals for dynamic strings and HTML generation.
- It's much cleaner than `+` concatenation.
- Extremely important in frameworks like React and Vue.
