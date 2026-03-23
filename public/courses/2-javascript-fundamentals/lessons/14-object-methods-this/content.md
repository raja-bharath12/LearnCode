# Lesson 14: Object Methods & this

🧠 **1. What are Object Methods?**
👉 A method is simply a function inside an object.
```javascript
let person = {
    name: "Raja",
    greet: function() {
        console.log("Hello!");
    }
};
person.greet();
```

🔑 **2. Using this Keyword**
👉 `this` refers to the current object.
```javascript
let person = {
    name: "Raja",
    greet: function() {
        console.log("Hello " + this.name);
    }
};
person.greet(); // Hello Raja
```

⚙️ **3. Why this is Important**
Without `this`, you can't easily access object properties inside its own methods.

❌ **Wrong Way:** `console.log("Hello " + name); // Error: name is not defined`
✅ **Correct Way:** `console.log("Hello " + this.name);`

🔄 **4. Multiple Methods in Object**
```javascript
let calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};
console.log(calculator.add(5, 3));
```

⚡ **5. Shorthand Method Syntax (Modern)**
```javascript
let person = {
    name: "Raja",
    greet() {
        console.log(`Hello ${this.name}`);
    }
};
```

⚠️ **6. Arrow Function Problem with this**
👉 Arrow functions do **NOT** have their own `this`.

❌ **Wrong:**
```javascript
let person = {
    name: "Raja",
    greet: () => {
        console.log(this.name); // ❌ undefined
    }
};
```
✅ **Correct:** Use normal function or shorthand syntax.

🔍 **7. this in Different Contexts**
| Context | `this` refers to |
| :--- | :--- |
| **Object method** | The object itself |
| **Global scope** | window (browser) |
| **Arrow function** | Parent scope |

🌐 **8. Real Website Example**
```html
<button onclick="show()">Show Profile</button>
<script>
let user = {
    name: "Raja",
    age: 20,
    display() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
};
function show() {
    alert(user.display());
}
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create object with method that prints its name using `this`.
✅ **Solution:**
```javascript
let person = { name: "Raja", greet() { console.log(this.name); } };
person.greet();
```

**Problem 2:** Create object with an `add` method.
✅ **Solution:**
```javascript
let calc = { add(a, b) { return a + b; } };
console.log(calc.add(2, 3));
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Create object with multiple methods (e.g., `add` and `multiply`).
✅ **Solution:**
```javascript
let calc = {
    add(a, b) { return a + b; },
    multiply(a, b) { return a * b; }
};
```

**Problem 4:** Use `this` to access nested properties.
✅ **Solution:**
```javascript
let car = { brand: "Toyota", show() { console.log(this.brand); } };
```

🔴 **HARD LEVEL**
**Problem 5:** Create student object with `name`, `marks`, and a method to check pass/fail.
✅ **Solution:**
```javascript
let student = {
    name: "Raja",
    marks: 60,
    result() { return this.marks >= 50 ? "Pass" : "Fail"; }
};
console.log(student.result());
```

**Problem 6 (Real Website Logic 🚀):** Cart system object that calculates total price.
```javascript
let cart = {
    items: [
        {name: "Phone", price: 10000},
        {name: "Laptop", price: 50000}
    ],
    total() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }
};
console.log(cart.total());
```

💡 **Pro Tips**
- Use method shorthand (`greet() {}`) for cleaner code.
- Avoid arrow functions for object methods if you need `this`.
- Great for building complex systems like shopping carts or user profiles.
