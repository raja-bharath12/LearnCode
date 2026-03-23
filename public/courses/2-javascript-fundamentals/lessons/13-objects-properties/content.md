# Lesson 13: Objects & Properties

🧠 **1. What is an Object?**
An object is a collection of key-value pairs.
```javascript
let person = {
    name: "Raja",
    age: 20,
    city: "Chennai"
};
```
👉 `name, age, city` → properties (keys), `"Raja", 20` → values.

🔑 **2. Accessing Object Properties**
- 🔹 **Dot Notation:** `console.log(person.name);`
- 🔹 **Bracket Notation:** `console.log(person["age"]);`

✏️ **3. Modifying Properties**
```javascript
person.age = 21;
console.log(person);
```

➕ **4. Adding New Properties**
```javascript
person.country = "India";
```

❌ **5. Deleting Properties**
```javascript
delete person.city;
```

🧩 **6. Object Methods (Functions inside objects)**
```javascript
let person = {
    name: "Raja",
    greet: function() {
        console.log("Hello " + this.name);
    }
};
person.greet();
```

🔍 **7. Looping Through Objects**
```javascript
for (let key in person) {
    console.log(key, person[key]);
}
```

🧱 **8. Nested Objects**
```javascript
let user = {
    name: "Raja",
    address: {
        city: "Chennai",
        pincode: 600001
    }
};
console.log(user.address.city);
```

📦 **9. Array of Objects (Very Important 🔥)**
```javascript
let users = [
    {name: "Raja", age: 20},
    {name: "Arun", age: 22}
];
console.log(users[0].name);
```
👉 Essential for handling API responses, databases, and UI rendering.

🌐 **10. Real Website Example**
```html
<div id="user"></div>
<script>
let user = {
    name: "Raja",
    age: 20
};
document.getElementById("user").innerHTML = `Name: ${user.name}, Age: ${user.age}`;
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create object with name and age. Print both.
✅ **Solution:**
```javascript
let person = { name: "Raja", age: 20 };
console.log(person.name, person.age);
```

**Problem 2:** Add a new property `city` to an object.
✅ **Solution:** `person.city = "Chennai";`

🟡 **MEDIUM LEVEL**
**Problem 3:** Create object with method to greet using `this`.
✅ **Solution:**
```javascript
let person = {
    name: "Raja",
    greet: function() { console.log("Hello " + this.name); }
};
person.greet();
```

**Problem 4:** Loop through all keys and values of an object.
✅ **Solution:**
```javascript
for (let key in obj) { console.log(key, obj[key]); }
```

🔴 **HARD LEVEL**
**Problem 5:** Create an array of objects and print all names.
✅ **Solution:**
```javascript
let users = [ {name: "Raja"}, {name: "Arun"} ];
users.forEach(user => console.log(user.name));
```

**Problem 6 (Real Website Logic 🚀):** Display a product list from an array of objects.
```javascript
let products = [
    {name: "Phone", price: 10000},
    {name: "Laptop", price: 50000}
];
let output = "";
products.forEach(p => {
    output += `<p>${p.name} - ₹${p.price}</p>`;
});
document.body.innerHTML = output;
```

💡 **Pro Tips**
- Objects model real-world data like users or products.
- Always use `this` inside methods to refer to the object's properties.
- Use an array of objects for API responses and building dynamic UI.
