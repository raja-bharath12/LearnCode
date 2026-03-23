# Lesson 25: Regular Expressions (Regex)

🧠 **1. What is Regex?**
Regex (Regular Expression) is a pattern used to match character combinations in strings.

👉 **Common uses:**
- Form validation (Email, Password, Mobile)
- Search and replace
- Pattern matching

🔑 **2. Basic Syntax**
There are two ways to create Regex:
1. `/pattern/flags`
2. `new RegExp("pattern", "flags")`

```javascript
let pattern = /java/i; // i = case insensitive
let str = "JavaScript is cool";
console.log(pattern.test(str)); // true
```

🔍 **3. Regex Methods**
- **test()** → Returns true/false (Check if match exists)
- **match()** → Returns the matching values (Array)
- **replace()** → Replaces matching text

⚙️ **4. Common Symbols**
| Symbol | Meaning |
| :--- | :--- |
| **^** | Starts with |
| **$** | Ends with |
| **[a-z]** | Any letter |
| **[0-9]** | Any digit |
| **+** | One or more |
| **\d** | Any digit |
| **\w** | Any word character |

🔥 **5. Example: Email Validation**
```javascript
let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
let email = "raja@gmail.com";
console.log(emailPattern.test(email)); // true
```

🌐 **6. Real Website Example**
```html
<input id="email" type="text" placeholder="Enter email">
<button onclick="validate()">Submit</button>

<script>
function validate() {
    let email = document.getElementById("email").value;
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (pattern.test(email)) {
        alert("Valid Email");
    } else {
        alert("Invalid Email Format");
    }
}
</script>
```

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Check if string "Code" exists in "I Love Code" using Regex.
✅ **Solution:** `/Code/.test("I Love Code");`

**Problem 2:** Check if a string starts with "A" using Regex.
✅ **Solution:** `/^A/.test("Apple");`

🟡 **MEDIUM LEVEL**
**Problem 3:** Create a pattern for a 10-digit mobile number.
✅ **Solution:** `/^[0-9]{10}$/`

**Problem 4:** Find all digits in "Price is 500 dollars" using `.match()`.
✅ **Solution:** `"Price is 500 dollars".match(/\d+/g);`

🔴 **HARD LEVEL**
**Problem 5:** Create a pattern for a strong password (at least one letter, one number, 8+ chars).
✅ **Solution:** `/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/`

**Problem 6 (Real Website Logic 🚀):** Build a search filter that matches names starting with the user's input.
```javascript
let search = "ra";
let pattern = new RegExp("^" + search, "i");
let names = ["Raja", "Arun", "Rahman"];
let results = names.filter(n => pattern.test(n));
console.log(results); // ["Raja", "Rahman"]
```

💡 **Pro Tips**
- Use online tools like **RegExr** or **Regextester** to build patterns.
- Regex can be complex; start simple.
- Essential for high-quality form validation and data parsing.
