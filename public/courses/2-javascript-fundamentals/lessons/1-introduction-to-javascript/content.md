🧠 **1. What is JavaScript?**
JavaScript is a programming language for the web used to make websites interactive and dynamic.

👉 **Without JavaScript:**
Websites = static (only text & images)

👉 **With JavaScript:**
- Buttons respond
- Forms validate
- Animations work
- Data updates without reload

🌐 **2. Where is JavaScript Used?**
- **Frontend (Browser)**: Button clicks, Form validation, DOM manipulation
- **Backend (Server)**: Using Node.js, APIs and databases
- **Full-stack**: React, Angular, Vue (Frontend frameworks)

⚙️ **3. How JavaScript Works in a Website**
A website has 3 parts:
1. **HTML** → Structure
2. **CSS** → Styling
3. **JavaScript** → Behavior

Example:
```html
<button onclick="sayHello()">Click Me</button>

<script>
function sayHello() {
    alert("Hello, welcome to my website!");
}
</script>
```
👉 When user clicks → JavaScript runs → Action happens

🧩 **4. Ways to Add JavaScript**
1. **Inline** (not recommended): `<button onclick="alert('Hi')">Click</button>`
2. **Internal**:
```html
<script>
console.log("Hello");
</script>
```
3. **External** (Best Practice ✅): `<script src="script.js"></script>`

🔥 **5. Basic JavaScript Syntax**
**Variables**
```javascript
let name = "Raja";
const age = 20;
```
**Output**
```javascript
console.log("Hello World");
alert("Welcome!");
```
**Functions**
```javascript
function greet() {
    console.log("Hi!");
}
```

🎯 **6. Why JavaScript is Important for YOU**
Since you’re building a website:
- Add login/signup logic
- Validate forms
- Build interactive UI
- Connect backend APIs

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Print "Hello JavaScript" in the console.
✅ **Solution:** `console.log("Hello JavaScript");`

**Problem 2:** Show an alert saying "Welcome User" when page loads.
✅ **Solution:** `alert("Welcome User");`

🟡 **MEDIUM LEVEL**
**Problem 3:** Create a button. When clicked, show "Button Clicked!"
✅ **Solution:**
```html
<button onclick="showMessage()">Click Me</button>
<script>
function showMessage() {
    alert("Button Clicked!");
}
</script>
```

**Problem 4:** Store your name in a variable and print it.
✅ **Solution:**
```javascript
let name = "Raja Bharath";
console.log(name);
```

🔴 **HARD LEVEL**
**Problem 5:** Create a webpage where:
1. User clicks a button
2. It shows their name in alert
✅ **Solution:**
```html
<input type="text" id="username" placeholder="Enter your name">
<button onclick="showName()">Submit</button>
<script>
function showName() {
    let name = document.getElementById("username").value;
    alert("Hello " + name);
}
</script>
```

**Problem 6 (Real Website Use 🚀):** When page loads:
1. Show welcome message in console
2. Change button text dynamically
✅ **Solution:**
```html
<button id="btn">Old Text</button>
<script>
console.log("Welcome to my website!");
document.getElementById("btn").innerText = "New Text";
</script>
```

💡 **Pro Tips**
- Always use external JS files
- Use `console.log()` for debugging
- Learn DOM manipulation (next lessons 🔥)
