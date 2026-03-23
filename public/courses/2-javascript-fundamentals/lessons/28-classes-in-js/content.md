# Lesson 28: Classes in JS

🧠 **1. What is a Class?**
👉 A class is a template for creating objects. It was introduced in ES6 to make Object-Oriented Programming (OOP) easier.

🔑 **2. Basic Syntax**
```javascript
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hello ${this.name}`);
    }
}
const u1 = new User("Raja", 20);
u1.greet();
```

⚙️ **3. Constructor**
The `constructor` method runs automatically when a new object is created using `new`.

🚀 **4. Inheritance (extends & super)**
A class can inherit from another class.
```javascript
class Admin extends User {
    constructor(name, age, role) {
        super(name, age); // Calls parent constructor
        this.role = role;
    }
    showRole() {
        console.log(this.role);
    }
}
const boss = new Admin("Raja", 25, "CEO");
```

🛡️ **5. Getters & Setters**
Used to get and set property values with custom logic.
```javascript
class User {
    get name() { return this._name; }
    set name(val) { this._name = val.toUpperCase(); }
}
```

⚡ **6. Static Methods**
Belong to the class itself, not the objects.
```javascript
class MathUtils {
    static add(a, b) { return a + b; }
}
console.log(MathUtils.add(5, 5)); // No 'new' needed
```

🌐 **7. Real Website Example**
- Building a Shopping Cart component
- Managing complex User data
- Component-based architecture (like in old React)

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create a `Car` class with `brand` and a `show()` method.
✅ **Solution:**
```javascript
class Car {
    constructor(b) { this.b = b; }
    show() { console.log(this.b); }
}
```

**Problem 2:** Create an instance of the `Car` class.
✅ **Solution:** `const myCar = new Car("Tesla");`

🟡 **MEDIUM LEVEL**
**Problem 3:** Use `extends` to create a `ElectricCar` class from `Car`.
✅ **Solution:**
```javascript
class ElectricCar extends Car {
    constructor(b, battery) { super(b); this.battery = battery; }
}
```

**Problem 4:** Create a static method `greet()` in a `Helloworld` class.
✅ **Solution:** `class Helloworld { static greet() { return "Hi"; } }`

🔴 **HARD LEVEL**
**Problem 5:** Implement a getter that returns a name in all caps.
✅ **Solution:**
```javascript
class Person {
    constructor(n) { this.n = n; }
    get name() { return this.n.toUpperCase(); }
}
```

**Problem 6 (Real Website Logic 🚀):** Create a simple `Product` class and a `Cart` class that managing an array of Product objects.
```javascript
class Product {
    constructor(n, p) { this.n = n; this.p = p; }
}
class Cart {
    constructor() { this.items = []; }
    add(p) { this.items.push(p); }
}
```

💡 **Pro Tips**
- Classes are "syntactic sugar" for Prototypes.
- Use `PascalCase` for class names (e.g., `User`, `DataManager`).
- Essential for modern enterprise-level JavaScript and Frameworks.
