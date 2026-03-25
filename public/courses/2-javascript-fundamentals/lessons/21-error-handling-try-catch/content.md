🧠 **1. Why Error Handling?**
👉 In real-world apps, things go wrong (e.g., Network failure, Invalid input, Bug).

Without error handling: App crashes ❌
With error handling: App says "Something went wrong" but keeps running ✅

🔑 **2. try...catch Syntax**
```javascript
try {
    // code that might fail
} catch (error) {
    // code that runs if failure happens
}
```

⚙️ **3. Basic Example**
```javascript
try {
    let x = 10;
    console.log(x + y); // y is not defined!
} catch (err) {
    console.log("Error caught!");
    console.log(err.message); // y is not defined
}
```

🔥 **4. finally Block**
👉 Runs **always**, whether success or failure.
```javascript
try {
    // ...
} catch (err) {
    // ...
} finally {
    console.log("Cleanup complete.");
}
```

🚀 **5. Throwing Custom Errors**
```javascript
function checkAge(age) {
    if (age < 18) {
        throw new Error("Must be 18+");
    }
    return "Allowed";
}

try {
    checkAge(16);
} catch (err) {
    console.log(err.message); // Must be 18+
}
```

🌐 **6. Real Website Example (Fetch Error Handling)**
```javascript
async function loadData() {
    try {
        let res = await fetch("invalid-url");
        let data = await res.json();
    } catch (err) {
        alert("Server error. Please try later.");
    }
}
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create a `try...catch` block that catches a variable reference error.
✅ **Solution:**
```javascript
try { console.log(a); }
catch (err) { console.log("Caught Error"); }
```

**Problem 2:** Print "End of process" using `finally`.
✅ **Solution:**
```javascript
try { console.log("Start"); }
finally { console.log("End of process"); }
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Create a function that throws an error if a number is negative.
✅ **Solution:**
```javascript
function check(n) {
    if (n < 0) throw new Error("Negative number!");
}
```

**Problem 4:** Use `try...catch` with `async/await` fetch.
✅ **Solution:**
```javascript
async function demo() {
    try { await fetch("url"); }
    catch (e) { console.log("Failed"); }
}
```

🔴 **HARD LEVEL**
**Problem 5:** Write a function that take user input and throws an error if input is not a string.
✅ **Solution:**
```javascript
function validate(u) {
    if (typeof u !== "string") throw new Error("Not a string");
}
```

**Problem 6 (Real Website Logic 🚀):** Build a basic login form validator that throws and catches errors for empty fields.
```javascript
function login(user) {
    try {
        if (!user) throw new Error("Missing username");
        console.log("Logging in...");
    } catch (err) {
        alert(err.message);
    }
}
```

💡 **Pro Tips**
- Always wrap API calls and user input processing in `try...catch`.
- Use custom error messages (`throw new Error`) to make debugging easier.
- Prevents your website from becoming unusable when one part fails.
