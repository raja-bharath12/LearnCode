🧠 **1. What is DOM?**
DOM = **Document Object Model**. It represents your HTML as a tree structure that JavaScript can control.

👉 **With DOM, you can:**
- Change text
- Update styles
- Handle clicks
- Add/remove elements

🌳 **2. Example DOM Structure**
```html
<html>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```
👉 JavaScript sees it as: `document` → `html` → `body` → `h1`

🔑 **3. Selecting Elements**
- 📌 **By ID:** `let el = document.getElementById("title");`
- 📌 **By Class:** `let els = document.getElementsByClassName("box");`
- 📌 **By Tag:** `let tags = document.getElementsByTagName("p");`
- 🔥 **Modern Way (Best):**
```javascript
document.querySelector("#id");
document.querySelector(".class");
document.querySelectorAll("p");
```

✏️ **4. Changing Content**
- `document.getElementById("title").innerText = "New Text";`
- `document.getElementById("box").innerHTML = "<b>Bold Text</b>";`

🎨 **5. Changing Styles**
```javascript
let el = document.getElementById("title");
el.style.color = "red";
el.style.fontSize = "30px";
```

🖱️ **6. Events (User Interaction)**
```html
<button onclick="show()">Click</button>
<script>
function show() {
    alert("Clicked!");
}
</script>
```

➕ **7. Creating & Removing Elements**
- **Create:**
```javascript
let newEl = document.createElement("p");
newEl.innerText = "Hello World";
document.body.appendChild(newEl);
```
- **Remove:** `document.getElementById("title").remove();`

🌐 **8. Real Website Example**
Dynamic text change on click:
```html
<h1 id="title">Welcome</h1>
<button onclick="change()">Change Text</button>
<script>
function change() {
    document.getElementById("title").innerText = "Hello Raja!";
}
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Change the text of an `<h1>` with id "title" using JavaScript.
✅ **Solution:** `document.getElementById("title").innerText = "Updated";`

**Problem 2:** Change the page background color using JavaScript.
✅ **Solution:** `document.body.style.background = "lightblue";`

🟡 **MEDIUM LEVEL**
**Problem 3:** Create a button in HTML and a JS function to show an alert on click.
✅ **Solution:**
```html
<button onclick="show()">Click</button>
<script>
function show() { alert("Hello!"); }
</script>
```

**Problem 4:** Add a new list item (`<li>`) dynamically to a `<ul>` with id "list".
✅ **Solution:**
```javascript
let li = document.createElement("li");
li.innerText = "New Item";
document.getElementById("list").appendChild(li);
```

🔴 **HARD LEVEL**
**Problem 5:** Create an input and a button that displays the entered text in a `<p>` tag.
✅ **Solution:**
```html
<input id="input" type="text">
<button onclick="show()">Submit</button>
<p id="output"></p>
<script>
function show() {
    let val = document.getElementById("input").value;
    document.getElementById("output").innerText = val;
}
</script>
```

**Problem 6 (Real Website Logic 🚀):** Simple Todo List creator.
```html
<input id="task" type="text">
<button onclick="add()">Add</button>
<ul id="list"></ul>
<script>
function add() {
    let val = document.getElementById("task").value;
    let li = document.createElement("li");
    li.innerText = val;
    document.getElementById("list").appendChild(li);
}
</script>
```

💡 **Pro Tips**
- Use `querySelector()` for maximum flexibility.
- Prefer `innerText` over `innerHTML` for better security (XSS prevention).
- Combined with events and arrays, DOM allows you to build powerful single-page apps.
