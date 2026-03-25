🧠 **1. What is JSON?**
JSON = **JavaScript Object Notation**. It is the standard format for sending and receiving data on the web.

👉 **It looks like a JavaScript object, but it is a string.**

🔑 **2. JSON Rules**
1. Keys must be in double quotes: `"name": "Raja"`
2. Strings must be in double quotes: `"city": "Chennai"`
3. No comments allowed ❌
4. Supported types: String, Number, Boolean, Array, Object, null

⚙️ **3. JSON to Object (`JSON.parse`)**
```javascript
let jsonStr = '{"name": "Raja", "age": 20}';
let obj = JSON.parse(jsonStr);
console.log(obj.name); // Raja
```

🧱 **4. Object to JSON (`JSON.stringify`)**
```javascript
let user = { name: "Raja", age: 20 };
let json = JSON.stringify(user);
console.log(json); // '{"name":"Raja","age":20}'
```

🌐 **5. API vs JSON**
APIs usually send data formatted as JSON.
```javascript
fetch("api-url")
    .then(res => res.json()) // automatically parses JSON string to object
    .then(data => console.log(data));
```

🚀 **6. Why it Matters?**
When you build your website:
- You fetch products from API (JSON)
- You save user settings to LocalStorage (JSON string)
- You send form data to backend (JSON stringify)

---

🧪 **PRACTICE PROBLEMS**

🟢 **EASY LEVEL**
**Problem 1:** Convert this JSON string to a JS object: `'{"id": 1}'`
✅ **Solution:** `JSON.parse('{"id": 1}')`

**Problem 2:** Convert this object to a JSON string: `{active: true}`
✅ **Solution:** `JSON.stringify({active: true})`

🟡 **MEDIUM LEVEL**
**Problem 3:** Access the name from decoded JSON: `let data = '{"user": {"name": "Raja"}}'`
✅ **Solution:** `JSON.parse(data).user.name`

**Problem 4:** Create a valid JSON object string for a user with name, age, and interests (array).
✅ **Solution:** `'{"name": "Raja", "age": 20, "interests": ["JS", "React"]}'`

🔴 **HARD LEVEL**
**Problem 5:** Take a form input and convert it into a JSON string for sending to a server.
✅ **Solution:**
```javascript
let data = { name: document.getElementById("name").value };
let json = JSON.stringify(data);
```

**Problem 6 (Real Website Logic 🚀):** Simulate fetching from an API and using `JSON.parse` if the data was manually saved in a string format in `localStorage`.
```javascript
let saved = localStorage.getItem("data");
if (saved) {
    let user = JSON.parse(saved);
    console.log(user.name);
}
```

💡 **Pro Tips**
- JSON is the universal language of the web.
- Always use `JSON.parse()` when receiving data from an API or LocalStorage.
- Use `JSON.stringify()` when sending data to a server.
