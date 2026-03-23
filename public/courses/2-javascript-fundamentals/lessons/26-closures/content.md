# Lesson 26: Closures

🧠 **1. What is a Closure?**
A closure is a function that "remembers" its outer variables even after the outer function has finished executing.

👉 Simply: **Inner Function + Outer Variables = Closure**.

🔑 **2. Basic Example**
```javascript
function outer() {
    let count = 0;
    return function inner() {
        count++;
        console.log(count);
    };
}
const counter = outer();
counter(); // 1
counter(); // 2
```
👉 Even though `outer()` finished, `inner()` still has access to `count`.

⚙️ **3. Why Use Closures?**
1. **Data Privacy**: Keep variables hidden from the outside world.
2. **State Management**: Maintain values between calls.

🚀 **4. Private Variables with Closures**
```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private variable
    return {
        deposit(amount) {
            balance += amount;
            console.log("Balance: " + balance);
        },
        withdraw(amount) {
            if (amount > balance) console.log("Insufficient funds");
            else {
                balance -= amount;
                console.log("Balance: " + balance);
            }
        }
    };
}
const myAcc = createBankAccount(100);
myAcc.deposit(50); // Balance: 150
console.log(myAcc.balance); // ❌ undefined (Hidden!)
```

⚠️ **5. Closure in a Loop (Common Issue)**
```javascript
for (var i = 1; i <= 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
```
👉 Output: 4, 4, 4 ❌ (because `var` is function-scoped).
✅ **Solution:** Use `let` (block-scoped) or a closure.

🌐 **6. Real Website Example**
- Button Click Counter
- Function Factory (e.g., creating different greeting functions)

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create a function that returns another function that prints "Hello".
✅ **Solution:**
```javascript
function outer() { return () => console.log("Hello"); }
```

**Problem 2:** Show how a closure can access outer parameters.
✅ **Solution:**
```javascript
function greet(msg) { return () => console.log(msg); }
```

🟡 **MEDIUM LEVEL**
**Problem 3:** Create a simple counter using a closure.
✅ **Solution:**
```javascript
function makeCounter() {
    let c = 0;
    return () => ++c;
}
```

**Problem 4:** Create a function `adder(x)` that returns a function that adds `x` to its argument.
✅ **Solution:**
```javascript
function adder(x) { return (y) => x + y; }
const add5 = adder(5);
console.log(add5(10)); // 15
```

🔴 **HARD LEVEL**
**Problem 5:** Create a private secret storage using a closure.
✅ **Solution:**
```javascript
function mySecret() {
    let secret = "Top Secret";
    return { getSecret: () => secret };
}
```

**Problem 6 (Real Website Logic 🚀):** Build a debouncing function simulation (Wait for user to stop typing).
```javascript
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
```

💡 **Pro Tips**
- Closures are the foundation for many JS design patterns.
- Use them to create "Private" methods and variables.
- Essential for understanding how modern frameworks like React manage state.
