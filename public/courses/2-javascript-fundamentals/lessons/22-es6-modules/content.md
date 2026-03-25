🧠 **1. What are Modules?**
Modules allow you to split your JavaScript code into multiple files.

👉 **Benefits:**
- Better organization
- Code reuse
- Easy debugging

🔑 **2. How to Use Modules**
In your HTML, use `type="module"`:
`<script type="module" src="main.js"></script>`

📦 **3. Exporting (Sending code)**
There are two ways to export:
1. **Named Export** (many per file)
2. **Default Export** (one per file)

**File: `math.js`**
```javascript
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;

// Default export
const PI = 3.14;
export default PI;
```

📥 **4. Importing (Receiving code)**
**File: `main.js`**
```javascript
import PI, { add, sub } from './math.js';

console.log(add(5, 5)); // 10
console.log(PI);       // 3.14
```

🔥 **5. Named vs Default**
| | Named Export | Default Export |
| :--- | :--- | :--- |
| **Export** | `export const x = 10;` | `export default x;` |
| **Import** | `import { x } from ...` | `import x from ...` |
| **Quantity** | Multiple | Only One |
| **Renaming** | `import { x as num }` | `import anyName` |

🚀 **6. Export All (*) Shortcut**
`import * as MathUtils from './math.js';`
`MathUtils.add(5, 5);`

🌐 **7. Real Website Example**
In React or modern JS apps, you split everything into modules (e.g., `Header.js`, `Utils.js`, `API.js`).

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Create a file and export a variable.
✅ **Solution:** `export const name = "Raja";`

**Problem 2:** Import a default export from a file.
✅ **Solution:** `import data from './file.js';`

🟡 **MEDIUM LEVEL**
**Problem 3:** Use named imports to bring in two separate functions.
✅ **Solution:** `import { fn1, fn2 } from './utils.js';`

**Problem 4:** Rename a named import during the import process.
✅ **Solution:** `import { add as sum } from './math.js';`

🔴 **HARD LEVEL**
**Problem 5:** Create a module that handles all API calls and export them.
✅ **Solution:**
```javascript
// api.js
export const getUsers = () => fetch(url);
export const getPosts = () => fetch(url);
```

**Problem 6 (Real Website Logic 🚀):** Split a small project into `config.js` (colors, URLs) and `main.js` (logic).
```javascript
// config.js
export const COLORS = { dark: "#000", light: "#fff" };

// main.js
import { COLORS } from './config.js';
document.body.style.background = COLORS.dark;
```

💡 **Pro Tips**
- Use Named Exports for utility functions.
- Use Default Exports for main components or classes.
- Essential for React, Angular, and all modern JavaScript development.
