🧠 **1. What are Events?**
An event is an action that happens in the browser.

👉 **Examples:**
- Click, Typing, Mouse hover, Form submit

🔑 **2. Common Events**
| Event | Description |
| :--- | :--- |
| **click** | Button or element clicked |
| **input** | Typing in an input field |
| **change** | Value (e.g., select menu) changed |
| **mouseover** | Mouse pointer enters an element |
| **submit** | Form is submitted |

🖱️ **3. Inline Event (Basic Method ❌)**
`<button onclick="show()">Click</button>`
👉 Simple, but not recommended for large applications.

🔥 **4. Event Listener (Best Method ✅)**
```javascript
let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    alert("Clicked!");
});
```

📥 **5. Input Event**
```html
<input id="userName" type="text">
<script>
document.getElementById("userName").addEventListener("input", (e) => {
    console.log(e.target.value); // current input value
});
</script>
```

🧾 **6. Event Object (e)**
The event listener function receives an `event` object with useful details.
`btn.addEventListener("click", e => console.log(e));`

⛔ **7. Prevent Default Behavior**
Crucial for forms to prevent immediate page reload.
```javascript
document.getElementById("myForm").addEventListener("submit", (e) => {
    e.preventDefault(); // stop reload
    alert("Form Submitted!");
});
```

🌐 **8. Real Website Example**
Live text display from input:
```html
<input id="input" type="text">
<p id="output"></p>
<script>
let input = document.getElementById("input");
let output = document.getElementById("output");
input.addEventListener("input", () => {
    output.innerText = input.value;
});
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create a button and show an alert when it's clicked using `addEventListener`.
✅ **Solution:** `btn.addEventListener("click", () => alert("Clicked!"));`

**Problem 2:** Print the character you type into an input in the console.
✅ **Solution:** `input.addEventListener("input", e => console.log(e.target.value));`

🟡 **MEDIUM LEVEL**
**Problem 3:** Change the text of a paragraph when a button is clicked.
✅ **Solution:**
```javascript
btn.addEventListener("click", () => {
    document.getElementById("txt").innerText = "Updated!";
});
```

**Problem 4:** Change an element's background color when the mouse enters it (`mouseover`).
✅ **Solution:**
```javascript
box.addEventListener("mouseover", () => { box.style.background = "red"; });
```

🔴 **HARD LEVEL**
**Problem 5:** Create a form that prevents submission if the input field is empty.
✅ **Solution:**
```javascript
form.addEventListener("submit", e => {
    e.preventDefault();
    if (input.value === "") alert("Enter value!");
    else alert("Success!");
});
```

**Problem 6 (Real Website Logic 🚀):** Simple Todo App update using even listeners.
```javascript
btn.addEventListener("click", () => {
    let li = document.createElement("li");
    li.innerText = input.value;
    list.appendChild(li);
});
```

💡 **Pro Tips**
- Always prefer `addEventListener()` over inline `onclick` attributes.
- Use arrow functions for clean callbacks.
- Use `e.preventDefault()` to handle form data without refreshing the page.
