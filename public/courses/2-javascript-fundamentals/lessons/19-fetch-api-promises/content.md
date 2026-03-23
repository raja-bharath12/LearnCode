# Lesson 19: Fetch API & Promises

🧠 **1. What is an API?**
API = **Application Programming Interface**. It allows your website to get data from a server (e.g., Weather, User Data, Products).

🌐 **2. What is Fetch API?**
`fetch()` is the modern way to make HTTP requests (get data or send data) to a server.
`fetch(url)`

🔑 **3. What is a Promise?**
A Promise represents the future result of an operation. It can be:
- ⏳ **Pending**: Waiting for result
- ✅ **Fulfilled**: Success
- ❌ **Rejected**: Failed

⚙️ **4. Basic Fetch Example**
```javascript
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json()) // convert response to JSON
    .then(data => console.log(data))    // use the data
    .catch(error => console.log(error)); // handle error
```

🔥 **5. Using Async/Await (Modern Way ✅)**
Cleaner and easier to read.
```javascript
async function getUsers() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
getUsers();
```

📦 **6. Fetch POST Request**
Sending data to a server:
```javascript
fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Hello", body: "World" })
})
.then(res => res.json())
.then(data => console.log(data));
```

🌐 **7. Real Website Example**
Displaying user list from an API:
```html
<ul id="users"></ul>
<script>
fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(users => {
        let output = "";
        users.forEach(user => { output += `<li>${user.name}</li>`; });
        document.getElementById("users").innerHTML = output;
    });
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Fetch data from an API and print it in the console.
✅ **Solution:** `fetch(url).then(res => res.json()).then(data => console.log(data));`

**Problem 2:** Handle a fetch error using `.catch()`.
✅ **Solution:** `fetch("wrong-url").catch(err => console.log(err));`

🟡 **MEDIUM LEVEL**
**Problem 3:** Display names from an API user list in the console.
✅ **Solution:**
```javascript
fetch(url).then(res => res.json()).then(data => data.forEach(u => console.log(u.name)));
```

**Problem 4:** Rewrite a standard `fetch` call into an `async/await` function.
✅ **Solution:**
```javascript
async function load() {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
}
```

🔴 **HARD LEVEL**
**Problem 5:** Create a function that fetches posts and displays only the titles.
✅ **Solution:**
```javascript
async function getPosts() {
    let res = await fetch(url);
    let posts = await res.json();
    posts.forEach(p => console.log(p.title));
}
```

**Problem 6 (Real Website Logic 🚀):** Create dynamic user cards using data from an API.
```javascript
fetch(url).then(res => res.json()).then(users => {
    let output = "";
    users.forEach(user => {
        output += `<div><h3>${user.name}</h3><p>${user.email}</p></div>`;
    });
    document.body.innerHTML = output;
});
```

💡 **Pro Tips**
- Always use `async/await` for cleaner, more readable code.
- Always include a `try...catch` block (or `.catch()`) to handle network failures.
- APIs are the engine behind modern dynamic websites.
