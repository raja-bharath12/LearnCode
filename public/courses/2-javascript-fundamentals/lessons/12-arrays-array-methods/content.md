# Lesson 12: Arrays & Array Methods

🧠 **1. What is an Array?**
An array is a collection of values stored in a single variable.
```javascript
let fruits = ["Apple", "Banana", "Mango"];
```
👉 Each value has an index (starting from 0):
- Apple → 0, Banana → 1, Mango → 2

🔑 **2. Accessing Elements**
```javascript
console.log(fruits[0]); // Apple
console.log(fruits[1]); // Banana
```

✏️ **3. Modifying Arrays**
```javascript
fruits[1] = "Orange";
console.log(fruits); // ["Apple", "Orange", "Mango"]
```

📏 **4. Array Length**
```javascript
console.log(fruits.length); // 3
```

🔥 **5. Important Array Methods**
- ➕ `push()` → Add at end: `arr.push(3);`
- ➖ `pop()` → Remove from end: `arr.pop();`
- ⬅️ `shift()` → Remove from start: `arr.shift();`
- ➡️ `unshift()` → Add at start: `arr.unshift(0);`
- 🔍 `indexOf()` → Find index: `fruits.indexOf("Banana");`

🔄 **6. Looping Through Arrays**
```javascript
let nums = [10, 20, 30];
for (let i = 0; i < nums.length; i++) {
    console.log(nums[i]);
}
```

⚡ **7. Modern Array Methods (VERY IMPORTANT 🔥)**
🔁 **forEach()**
```javascript
nums.forEach(num => console.log(num));
```
🔄 **map()** → Transform array
```javascript
let squares = nums.map(n => n * n); // [1, 4, 9]
```
🔍 **filter()** → Select values
```javascript
let even = [1, 2, 3, 4].filter(n => n % 2 === 0); // [2, 4]
```
🧮 **reduce()** → Combine values
```javascript
let sum = [1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0); // 10
```
🔎 **find()**
```javascript
let result = [10, 20, 30].find(n => n > 15); // 20
```

🌐 **8. Real Website Example**
```html
<ul id="products"></ul>
<script>
let products = ["Laptop", "Phone", "Tablet"];
let output = "";
products.forEach(product => {
    output += `<li>${product}</li>`;
});
document.getElementById("products").innerHTML = output;
</script>
```
👉 Essential for product listings, dashboards, and API data rendering.

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create array of 3 numbers and print them using `forEach`.
✅ **Solution:**
```javascript
let arr = [1, 2, 3];
arr.forEach(num => console.log(num));
```

**Problem 2:** Add an element to the end of an array using `push()`.
✅ **Solution:**
```javascript
let arr = [1, 2];
arr.push(3);
console.log(arr);
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Find even numbers in an array using `filter()`.
✅ **Solution:**
```javascript
let nums = [1,2,3,4,5];
let even = nums.filter(n => n % 2 === 0);
console.log(even);
```

**Problem 4:** Double every number in an array using `map()`.
✅ **Solution:**
```javascript
let nums = [1,2,3];
let doubled = nums.map(n => n * 2);
console.log(doubled);
```

🔴 **HARD LEVEL**
**Problem 5:** Find the sum of an array using `reduce()`.
✅ **Solution:**
```javascript
let nums = [1,2,3,4];
let sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum);
```

**Problem 6 (Real Website Logic 🚀):** Filter a list of product objects under a certain price.
```javascript
let products = [
    {name: "Phone", price: 10000},
    {name: "Laptop", price: 50000}
];
let cheap = products.filter(p => p.price < 20000);
console.log(cheap);
```

💡 **Pro Tips**
- Use `map()` to transform, `filter()` to select, and `reduce()` to combine.
- Avoid manual loops when modern array methods exist.
- Very important for processing API data and building dynamic dashboards.
