🧠 **1. What is Web Storage?**
Web storage allows you to save data directly in the browser. The data stays even if you refresh the page.

👉 **Two Types:**
1. **LocalStorage**: Stays forever (even if browser closes).
2. **SessionStorage**: Cleared when the tab is closed.

🔑 **2. How to Save Data**
`localStorage.setItem("key", "value");`
`sessionStorage.setItem("user", "Raja");`

⚙️ **3. How to Get Data**
`let name = localStorage.getItem("key");`

➕ **4. Other Methods**
- **Remove item:** `localStorage.removeItem("key");`
- **Clear all:** `localStorage.clear();`

📦 **5. Storing Objects & Arrays (JSON)**
LocalStorage only stores **strings**. To store objects, use `JSON.stringify()`.
```javascript
let user = { name: "Raja", age: 20 };
localStorage.setItem("user", JSON.stringify(user));

// To read it back:
let data = JSON.parse(localStorage.getItem("user"));
```

🔥 **6. Example: Simple Counter**
```javascript
let count = localStorage.getItem("count") || 0;
count++;
localStorage.setItem("count", count);
console.log(count);
```

🌐 **7. Real Website Example**
- Dark Mode toggle state
- User Login Token (Auth)
- Simple Shopping Cart
- User Preferences

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Save your name in `localStorage` and retrieve it.
✅ **Solution:**
```javascript
localStorage.setItem("name", "Raja");
console.log(localStorage.getItem("name"));
```

**Problem 2:** Clear all items in `localStorage`.
✅ **Solution:** `localStorage.clear();`

🟡 **MEDIUM LEVEL**
**Problem 3:** Store an object `{id: 1, name: "Arun"}` in `localStorage`.
✅ **Solution:**
```javascript
localStorage.setItem("item", JSON.stringify({id: 1, name: "Arun"}));
```

**Problem 4:** Use `sessionStorage` to store a session token "abc123".
✅ **Solution:** `sessionStorage.setItem("token", "abc123");`

🔴 **HARD LEVEL**
**Problem 5:** Create a button that increments a counter saved in `localStorage`.
✅ **Solution:**
```javascript
btn.onclick = () => {
    let c = localStorage.getItem("c") || 0;
    localStorage.setItem("c", ++c);
    alert(c);
};
```

**Problem 6 (Real Website Logic 🚀):** Build a basic "Dark Mode" toggle that remembers the user's choice even after page refresh.
```javascript
let theme = localStorage.getItem("theme");
if (theme === "dark") document.body.classList.add("dark");

function toggle() {
    let isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}
```

💡 **Pro Tips**
- Use `LocalStorage` for user settings (e.g., Theme, Language).
- Use `SessionStorage` for sensitive temporary data.
- Always remember to use `JSON.stringify()` and `JSON.parse()` for complex data.
