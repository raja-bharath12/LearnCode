# Lesson 20: Async / Await

🧠 **1. What is Async/Await?**
👉 `async/await` is a modern way to handle Promises that makes asynchronous code look and feel like synchronous code.

Instead of chain multiple `.then()`:
```javascript
fetch(url).then().then().catch();
```
👉 **Use `async/await`**.

🔑 **2. async Keyword**
```javascript
async function greet() {
    return "Hello";
}
```
👉 Any function marked `async` always returns a **Promise**.

⏳ **3. await Keyword**
👉 **Pauses** execution until the Promise is resolved.
`let result = await somePromise;`

⚙️ **4. Basic Example**
```javascript
async function getData() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await response.json();
    console.log(data);
}
getData();
```

⚠️ **5. Error Handling (VERY IMPORTANT)**
Wrap your code in `try...catch` to handle failures correctly.
```javascript
async function getData() {
    try {
        let res = await fetch("https://jsonplaceholder.typicode.com/users");
        let data = await res.json();
        console.log(data);
    } catch (error) {
        console.log("Error:", error);
    }
}
```

🔄 **6. Async vs Promise (.then)**
✅ **Modern Way:**
```javascript
async function load() {
    try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
    } catch (err) { console.log(err); }
}
```

⚡ **7. Multiple Await Calls**
```javascript
async function load() {
    let res1 = await fetch(url1);
    let res2 = await fetch(url2);
    let d1 = await res1.json();
    let d2 = await res2.json();
    console.log(d1, d2);
}
```

🌐 **8. Real Website Example**
```html
<ul id="users"></ul>
<script>
async function loadUsers() {
    let res = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = await res.json();
    let output = "";
    users.forEach(u => { output += `<li>${u.name}</li>`; });
    document.getElementById("users").innerHTML = output;
}
loadUsers();
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create an `async` function that returns a "Hello" message.
✅ **Solution:** `async function msg() { return "Hello"; }`

**Problem 2:** Use `await` to wait for a `Promise.resolve("Done")`.
✅ **Solution:** `async function test() { let data = await Promise.resolve("Done"); console.log(data); }`

🟡 **MEDIUM LEVEL**
**Problem 3:** Fetch data from an API using `async/await`.
✅ **Solution:**
```javascript
async function fetchData() {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
}
```

**Problem 4:** Use `try/catch` to handle a fetch to a wrong URL.
✅ **Solution:**
```javascript
async function load() {
    try { let res = await fetch("wrong-url"); }
    catch (e) { console.log("Error occurred"); }
}
```

🔴 **HARD LEVEL**
**Problem 5:** Fetch user data and print only their email addresses.
✅ **Solution:**
```javascript
async function getEmails() {
    let res = await fetch(url);
    let users = await res.json();
    users.forEach(u => console.log(u.email));
}
```

**Problem 6 (Real Website Logic 🚀):** Create dynamic cards for users fetched from an API using an `async` function.
```javascript
async function loadUsers() {
    let res = await fetch(url);
    let users = await res.json();
    let out = "";
    users.forEach(u => { out += `<div><h3>${u.name}</h3><p>${u.email}</p></div>`; });
    document.body.innerHTML = out;
}
```

💡 **Pro Tips**
- Remember: `await` only works inside an `async` function.
- Always use `try...catch` for robust error handling.
- Essential for database calls and dynamic single-page applications.
