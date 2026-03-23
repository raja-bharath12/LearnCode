# Lesson 16: Spread & Rest Operators (...)

🧠 **1. What is ... (Three Dots)?**
The same syntax (`...`) is used for two different purposes:
- **Spread** → Expands values
- **Rest** → Collects values

👉 Understanding the difference is very important!

🚀 **2. Spread Operator (Expand)**
Used to expand elements of an array or object.

📦 **Spread with Arrays:**
```javascript
let arr1 = [1, 2];
let arr2 = [3, 4];
let result = [...arr1, ...arr2];
console.log(result); // [1,2,3,4]
```
➕ **Copy Array:** `let copy = [...arr];` (Prevents mutation/original change)

🧱 **Spread with Objects:**
```javascript
let obj1 = {name: "Raja"};
let obj2 = {age: 20};
let merged = {...obj1, ...obj2};
console.log(merged);
```
🔄 **Override Values:**
```javascript
let user = {name: "Raja", age: 20};
let updated = {...user, age: 25};
```

🧠 **3. Rest Operator (Collect)**
Used to collect multiple values into one variable.

📦 **Rest in Functions:**
```javascript
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4));
```
🎯 **Rest with Destructuring:**
```javascript
let [a, ...rest] = [1, 2, 3, 4];
console.log(a);    // 1
console.log(rest); // [2,3,4]
```
🧱 **Rest with Objects:**
```javascript
let {name, ...others} = { name: "Raja", age: 20, city: "Chennai" };
console.log(others); // {age: 20, city: "Chennai"}
```

⚡ **4. Spread vs Rest**
| Feature | Spread | Rest |
| :--- | :--- | :--- |
| **Purpose** | Expand | Collect |
| **Usage** | Arrays/Objects | Parameters/Destructuring |
| **Example** | `[...arr]` | `(...args)` |

🌐 **5. Real Website Example**
```javascript
let user = { name: "Raja", age: 20, city: "Chennai" };
let updatedUser = { ...user, age: 21 };
console.log(updatedUser);
```
Dynamic Cart Total:
```javascript
function total(...prices) {
    return prices.reduce((sum, p) => sum + p, 0);
}
console.log(total(100, 200, 300));
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Merge two arrays using the spread operator.
✅ **Solution:** `let result = [...arr1, ...arr2];`

**Problem 2:** Create a copy of an array using spread.
✅ **Solution:** `let copy = [...originalArr];`

🟡 **MEDIUM LEVEL**
**Problem 3:** Use the rest operator to create a function that sums any number of arguments.
✅ **Solution:**
```javascript
function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }
```

**Problem 4:** Extract the first value of an array and collect the remaining into a variable.
✅ **Solution:** `let [first, ...others] = [1, 2, 3, 4];`

🔴 **HARD LEVEL**
**Problem 5:** Merge two objects and override one property value.
✅ **Solution:**
```javascript
let obj1 = {a:1, b:2}, obj2 = {b:3};
let result = {...obj1, ...obj2};
```

**Problem 6 (Real Website Logic 🚀):** Update a shopping cart array of objects using spread.
```javascript
let cart = [ {price: 100}, {price: 200} ];
let total = cart.reduce((sum, item) => sum + item.price, 0);
console.log(total);
```

💡 **Pro Tips**
- Use spread for copying and merging without changing the originals.
- Use rest for flexible functions that can take any number of arguments.
- Extremely common in React for state updates and handling API props.
