🧠 **1. What is a Prototype?**
In JavaScript, every object has a hidden property called `[[Prototype]]`. It links to another object.

👉 **Objects inherit properties and methods from their prototypes.**

🔑 **2. How Prototypes Work**
When you access a property:
1. Browser looks in the **object** itself.
2. If not found, it looks in the **prototype**.
3. If still not found, it goes up the **prototype chain**.

⚙️ **3. Adding Methods via Prototype**
Instead of adding a function to every object, add it to the prototype to save memory.
```javascript
function User(name) {
    this.name = name;
}

User.prototype.greet = function() {
    console.log("Hello " + this.name);
};

const u1 = new User("Raja");
u1.greet(); // Hello Raja
```

🚀 **4. Prototypal Inheritance**
One object inheriting from another.
```javascript
let animal = { eats: true };
let rabbit = { jumps: true };

rabbit.__proto__ = animal; // Inheritance
console.log(rabbit.eats); // true
```
👉 modern way: `Object.setPrototypeOf(rabbit, animal);`

🧱 **5. The Prototype Chain**
`myObj` → `Object.prototype` → `null`
👉 All objects eventually link to `Object.prototype`.

🔍 **6. Constructor Functions**
Before `class` (ES6), constructors were used:
```javascript
function Car(model) {
    this.model = model;
}
const myCar = new Car("Tesla");
```

🌐 **7. Real Website Example**
- Built-in methods like `Array.prototype.map()` and `String.prototype.toUpperCase()` use prototypes.
- Creating reusable UI components or data models.

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Check if an object has a property using `hasOwnProperty()`.
✅ **Solution:** `obj.hasOwnProperty("name");`

**Problem 2:** Set one object as a prototype of another.
✅ **Solution:** `obj2.__proto__ = obj1;`

🟡 **MEDIUM LEVEL**
**Problem 3:** Create a constructor function `User` and add a `greet` method to its prototype.
✅ **Solution:**
```javascript
function User(n) { this.n = n; }
User.prototype.greet = function() { console.log(this.n); }
```

**Problem 4:** Create an inheritance chain: Animal → Person.
✅ **Solution:**
```javascript
let animal = { type: "Animal" };
let person = { name: "Raja" };
person.__proto__ = animal;
```

🔴 **HARD LEVEL**
**Problem 5:** Why is prototype better than adding methods inside the constructor?
✅ **Solution:** Because prototype methods are shared among all instances, saving memory.

**Problem 6 (Real Website Logic 🚀):** Extend the built-in `Array` prototype to include a `sum` method (Advanced!).
```javascript
Array.prototype.sum = function() {
    return this.reduce((a, b) => a + b, 0);
};
console.log([1, 2, 3].sum()); // 6
```

💡 **Pro Tips**
- Avoid using `__proto__` in real apps; use `Object.create()` or `class`.
- Prototypes are the reason why `[1,2].map()` works (it's in `Array.prototype`).
- Understanding this helps you understand how JavaScript classes work under the hood.
