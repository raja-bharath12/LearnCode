# Lesson 15: Destructuring (Objects & Arrays)

🧠 **1. What is Destructuring?**
Destructuring is a modern way to extract values from arrays or objects into separate variables quickly.

👉 **Instead of:**
```javascript
let arr = [10, 20];
let a = arr[0];
let b = arr[1];
```
👉 **Use:**
```javascript
let [a, b] = [10, 20];
```

📦 **2. Array Destructuring**
🔑 **Basic Example:**
```javascript
let numbers = [1, 2, 3];
let [a, b, c] = numbers;
console.log(a, b, c); // 1 2 3
```
⏭️ **Skipping Values:** `let [a, , c] = [1, 2, 3]; // a=1, c=3`
🎯 **Default Values:** `let [a = 10, b = 20] = [5]; // a=5, b=20`
🔄 **Swapping Variables:** `[x, y] = [y, x];`

🧱 **3. Object Destructuring**
🔑 **Basic Example:**
```javascript
let person = { name: "Raja", age: 20 };
let {name, age} = person;
console.log(name, age);
```
✏️ **Rename Variables:** `let {name: userName} = person;`
🎯 **Default Values:** `let {country = "India"} = person;`
🔄 **Nested Destructuring:**
```javascript
let user = { address: { city: "Chennai" } };
let {address: {city}} = user;
console.log(city);
```

⚡ **4. Destructuring in Functions**
```javascript
function greet({name, age}) {
    console.log(`Hello ${name}, Age: ${age}`);
}
greet({name: "Raja", age: 20});
```

🌐 **5. Real Website Example**
Common for handling API-style data:
```javascript
let user = {
    name: "Raja",
    email: "raja@gmail.com",
    role: "admin"
};
let {name, role} = user;
console.log(`Welcome ${name}, Role: ${role}`);
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Destructure array `[1,2,3]` into variables `a, b, c`.
✅ **Solution:** `let [a, b, c] = [1, 2, 3];`

**Problem 2:** Extract `name` from an object `{name: "Raja"}`.
✅ **Solution:** `let {name} = {name: "Raja"};`

🟡 **MEDIUM LEVEL**
**Problem 3:** Skip the second value in an array `[1, 2, 3]` during destructuring.
✅ **Solution:** `let [a, , c] = [1, 2, 3];`

**Problem 4:** Rename an object property during destructuring (e.g., `name` to `userName`).
✅ **Solution:** `let {name: userName} = {name: "Raja"};`

🔴 **HARD LEVEL**
**Problem 5:** Extract a nested city name from an object.
✅ **Solution:**
```javascript
let user = { address: { city: "Chennai" } };
let {address: {city}} = user;
```

**Problem 6 (Real Website Logic 🚀):** Destructure user data from a simulated API response.
```javascript
let data = {
    user: { name: "Raja", email: "raja@gmail.com" }
};
let {user: {name, email}} = data;
console.log(name, email);
```

💡 **Pro Tips**
- Use destructuring for cleaner, more readable code.
- Great for handling complex JSON API responses.
- Useful for passing multiple configuration options to functions.
