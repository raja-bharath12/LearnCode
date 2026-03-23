// src/utils/courseData.js — Static lesson content

export const COURSES = {
  1: {
    title: "Python for Beginners",
    lang: "python",
    lessons: [
      { id: 1, title: "Introduction to Python", contentPath: "/courses/1-python-for-beginners/lessons/1-introduction-to-python/content.md", starter: '# Your first Python program\nprint("Hello, World!")' },
      { id: 2, title: "Variables & Data Types", contentPath: "/courses/1-python-for-beginners/lessons/2-variables-data-types/content.md", starter: '# Variables & Data Types\nname = "Alice"\nage = 25\nprint(f"Name: {name}, Age: {age}")' },
      { id: 3, title: "Strings", contentPath: "/courses/1-python-for-beginners/lessons/3-strings/content.md", starter: '# Strings\ntext = "Python is Fun"\nprint(text.upper())\nprint(text[0:6])' },
      { id: 4, title: "Numbers & Math", contentPath: "/courses/1-python-for-beginners/lessons/4-numbers-math/content.md", starter: '# Numbers & Math\na = 10\nb = 3\nprint("Add:", a + b)\nprint("Power:", a ** b)' },
      { id: 5, title: "Input & Output", contentPath: "/courses/1-python-for-beginners/lessons/5-input-output/content.md", starter: '# Input & Output\nname = input("Enter your name: ")\nprint(f"Hello, {name}!")' },
      { id: 6, title: "Conditional Statements (if/elif/else)", contentPath: "/courses/1-python-for-beginners/lessons/6-conditional-statements-if-elif-else/content.md", starter: '# Conditional Statements\nage = 18\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")' },
      { id: 7, title: "Loops (for & while)", contentPath: "/courses/1-python-for-beginners/lessons/7-loops-for-while/content.md", starter: '# Loops\nfor i in range(5):\n    print(f"Count: {i}")' },
      { id: 8, title: "Lists", contentPath: "/courses/1-python-for-beginners/lessons/8-lists/content.md", starter: '# Lists\nfruits = ["apple", "banana"]\nfruits.append("cherry")\nprint(fruits)' },
      { id: 9, title: "Tuples", contentPath: "/courses/1-python-for-beginners/lessons/9-tuples/content.md", starter: '# Tuples\npoint = (10, 20)\nprint(point[0])' },
      { id: 10, title: "Dictionaries", contentPath: "/courses/1-python-for-beginners/lessons/10-dictionaries/content.md", starter: '# Dictionaries\nuser = {"name": "Raja", "age": 20}\nprint(user["name"])' },
      { id: 11, title: "Sets", contentPath: "/courses/1-python-for-beginners/lessons/11-sets/content.md", starter: '# Sets\ns = {1, 2, 2, 3}\nprint(s) # {1, 2, 3}' },
      { id: 12, title: "Functions", contentPath: "/courses/1-python-for-beginners/lessons/12-functions/content.md", starter: 'def greet():\n    print("Hello!")\n\ngreet()' },
      { id: 13, title: "Arguments & Return Values", contentPath: "/courses/1-python-for-beginners/lessons/13-arguments-return-values/content.md", starter: 'def add(a, b):\n    return a + b\n\nprint(add(5, 7))' },
      { id: 14, title: "Scope & Namespaces", contentPath: "/courses/1-python-for-beginners/lessons/14-scope-namespaces/content.md", starter: 'x = 10\ndef show():\n    global x\n    x = 20\n\nshow()\nprint(x)' },
      { id: 15, title: "Modules & Imports", contentPath: "/courses/1-python-for-beginners/lessons/15-modules-imports/content.md", starter: 'import math\nprint(math.sqrt(16))' },
      { id: 16, title: "File I/O", contentPath: "/courses/1-python-for-beginners/lessons/16-file-i-o/content.md", starter: '# File I/O example\nwith open("test.txt", "w") as f:\n    f.write("Hello World")' },
      { id: 17, title: "Exception Handling", contentPath: "/courses/1-python-for-beginners/lessons/17-exception-handling/content.md", starter: 'try:\n    x = 1/0\nexcept ZeroDivisionError:\n    print("Error!")' },
      { id: 18, title: "List Comprehensions", contentPath: "/courses/1-python-for-beginners/lessons/18-list-comprehensions/content.md", starter: 'nums = [1, 2, 3, 4]\nsquares = [x*x for x in nums]\nprint(squares)' },
      { id: 19, title: "Lambda Functions", contentPath: "/courses/1-python-for-beginners/lessons/19-lambda-functions/content.md", starter: 'add = lambda a, b: a + b\nprint(add(5, 3))' },
      { id: 20, title: "Classes & Objects (OOP Intro)", contentPath: "/courses/1-python-for-beginners/lessons/20-classes-objects-oop-intro/content.md", starter: 'class Dog:\n    def speak(self):\n        print("Woof!")\n\nd = Dog()\nd.speak()' },
      { id: 21, title: "Inheritance", contentPath: "/courses/1-python-for-beginners/lessons/21-inheritance/content.md", starter: 'class Animal:\n    def speak(self):\n        print("Sound")\n\nclass Dog(Animal):\n    def speak(self):\n        print("Bark")' },
      { id: 22, title: "Python Standard Library", contentPath: "/courses/1-python-for-beginners/lessons/22-python-standard-library/content.md", starter: 'import random\nprint(random.randint(1, 100))' },
      { id: 23, title: "Virtual Environments & pip", contentPath: "/courses/1-python-for-beginners/lessons/23-virtual-environments-pip/content.md", starter: '# Commands are run in terminal\n# pip install requests' },
      { id: 24, title: "Project: Build a Calculator", contentPath: "/courses/1-python-for-beginners/lessons/24-project-build-a-calculator/content.md", starter: '# Final Project: Calculator\n# Implement your logic here' }
    ]
  },
  2: {
    title: "JavaScript Fundamentals",
    lang: "javascript",
    lessons: [
      { id: 1, title: "Intro to JavaScript", contentPath: "/courses/2-javascript-fundamentals/lessons/1-introduction-to-javascript/content.md", starter: '// Your first JS program\nconsole.log("Hello World");' },
      { id: 2, title: "Variables: var, let, const", contentPath: "/courses/2-javascript-fundamentals/lessons/2-variables-var-let-const/content.md", starter: 'let name = "Raja";\nconst age = 20;\nvar oldWay = "Avoid this";\n\nconsole.log(name, age);' },
      { id: 3, title: "Data Types & typeof", contentPath: "/courses/2-javascript-fundamentals/lessons/3-data-types-typeof/content.md", starter: 'let name = "Raja";\nlet age = 20;\nlet isStudent = true;\n\nconsole.log(typeof name);\nconsole.log(typeof age);' },
      { id: 4, title: "Operators", contentPath: "/courses/2-javascript-fundamentals/lessons/4-operators/content.md", starter: 'let a = 10;\nlet b = 5;\nconsole.log("Sum:", a + b);\nconsole.log("Is equal:", a === b);' },
      { id: 5, title: "Template Literals", contentPath: "/courses/2-javascript-fundamentals/lessons/5-template-literals/content.md", starter: 'let name = "Raja";\nconsole.log(`Hello ${name}, welcome study JS!`);' },
      { id: 6, title: "Conditionals", contentPath: "/courses/2-javascript-fundamentals/lessons/6-conditionals-if-else/content.md", starter: 'let age = 20;\nif (age >= 18) {\n  console.log("You can vote");\n} else {\n  console.log("Too young");\n}' },
      { id: 7, title: "Switch Statements", contentPath: "/courses/2-javascript-fundamentals/lessons/7-switch-statements/content.md", starter: 'let day = 2;\nswitch(day) {\n  case 1: console.log("Mon"); break;\n  case 2: console.log("Tue"); break;\n  default: console.log("Unknown");\n}' },
      { id: 8, title: "for Loops", contentPath: "/courses/2-javascript-fundamentals/lessons/8-for-loops/content.md", starter: 'for (let i = 1; i <= 5; i++) {\n  console.log("Count:", i);\n}' },
      { id: 9, title: "while & do-while Loops", contentPath: "/courses/2-javascript-fundamentals/lessons/9-while-do-while-loops/content.md", starter: 'let i = 1;\nwhile (i <= 3) {\n  console.log("While:", i);\n  i++;\n}' },
      { id: 10, title: "Functions & Declarations", contentPath: "/courses/2-javascript-fundamentals/lessons/10-functions-declarations/content.md", starter: 'function greet(name) {\n  return "Hello " + name;\n}\nconsole.log(greet("Raja"));' },
      { id: 11, title: "Arrow Functions", contentPath: "/courses/2-javascript-fundamentals/lessons/11-arrow-functions/content.md", starter: 'const add = (a, b) => a + b;\nconsole.log(add(5, 10));' },
      { id: 12, title: "Arrays & Array Methods", contentPath: "/courses/2-javascript-fundamentals/lessons/12-arrays-array-methods/content.md", starter: 'let fruits = ["Apple", "Banana"];\nfruits.push("Mango");\nconsole.log(fruits);' },
      { id: 13, title: "Objects & Properties", contentPath: "/courses/2-javascript-fundamentals/lessons/13-objects-properties/content.md", starter: 'let user = { name: "Raja", age: 20 };\nconsole.log(user.name);' },
      { id: 14, title: "Object Methods & this", contentPath: "/courses/2-javascript-fundamentals/lessons/14-object-methods-this/content.md", starter: 'let person = {\n  name: "Raja",\n  greet() { console.log("Hi " + this.name); }\n};\nperson.greet();' },
      { id: 15, title: "Destructuring", contentPath: "/courses/2-javascript-fundamentals/lessons/15-destructuring/content.md", starter: 'const user = { name: "Raja", age: 20 };\nconst { name, age } = user;\nconsole.log(name, age);' },
      { id: 16, title: "Spread & Rest", contentPath: "/courses/2-javascript-fundamentals/lessons/16-spread-rest/content.md", starter: 'let arr1 = [1, 2];\nlet arr2 = [...arr1, 3, 4];\nconsole.log(arr2);' },
      { id: 17, title: "DOM Manipulation", contentPath: "/courses/2-javascript-fundamentals/lessons/17-dom-manipulation/content.md", starter: '// Check lesson content for DOM examples\nconsole.log(document.title);' },
      { id: 18, title: "Events & Event Listeners", contentPath: "/courses/2-javascript-fundamentals/lessons/18-events-event-listeners/content.md", starter: '// Check lesson content for event examples\n// document.addEventListener("click", () => alert("Hi"));' },
      { id: 19, title: "Fetch API & Promises", contentPath: "/courses/2-javascript-fundamentals/lessons/19-fetch-api-promises/content.md", starter: 'fetch("https://jsonplaceholder.typicode.com/todos/1")\n  .then(res => res.json())\n  .then(data => console.log(data));' },
      { id: 20, title: "Async / Await", contentPath: "/courses/2-javascript-fundamentals/lessons/20-async-await/content.md", starter: 'async function load() {\n  let res = await fetch("https://jsonplaceholder.typicode.com/todos/1");\n  let data = await res.json();\n  console.log(data);\n}\nload();' },
      { id: 21, title: "Error Handling (try/catch)", contentPath: "/courses/2-javascript-fundamentals/lessons/21-error-handling-try-catch/content.md", starter: 'try {\n  console.log(nonExistentVar);\n} catch (err) {\n  console.log("Caught:", err.message);\n}' },
      { id: 22, title: "ES6 Modules", contentPath: "/courses/2-javascript-fundamentals/lessons/22-es6-modules/content.md", starter: '// Use import/export in real files\nconsole.log("Modules are great for local apps");' },
      { id: 23, title: "LocalStorage & SessionStorage", contentPath: "/courses/2-javascript-fundamentals/lessons/23-localstorage-sessionstorage/content.md", starter: 'localStorage.setItem("name", "Raja");\nconsole.log(localStorage.getItem("name"));' },
      { id: 24, title: "JSON & APIs", contentPath: "/courses/2-javascript-fundamentals/lessons/24-json-apis/content.md", starter: 'let user = { name: "Raja" };\nlet json = JSON.stringify(user);\nconsole.log(json);\nconsole.log(JSON.parse(json));' },
      { id: 25, title: "Regular Expressions (Regex)", contentPath: "/courses/2-javascript-fundamentals/lessons/25-regular-expressions-regex/content.md", starter: 'const pattern = /hello/i;\nconsole.log(pattern.test("Hello World"));' },
      { id: 26, title: "Closures", contentPath: "/courses/2-javascript-fundamentals/lessons/26-closures/content.md", starter: 'function outer() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter = outer();\nconsole.log(counter());' },
      { id: 27, title: "Prototype & Inheritance", contentPath: "/courses/2-javascript-fundamentals/lessons/27-prototype-inheritance/content.md", starter: 'function User(n) { this.n = n; }\nUser.prototype.greet = function() { console.log(this.n); };\nnew User("Raja").greet();' },
      { id: 28, title: "Classes in JS", contentPath: "/courses/2-javascript-fundamentals/lessons/28-classes-in-js/content.md", starter: 'class User {\n  constructor(n) { this.n = n; }\n  greet() { console.log(this.n); }\n}\nnew User("Raja").greet();' },
      { id: 29, title: "Callbacks & Higher-Order Functions", contentPath: "/courses/2-javascript-fundamentals/lessons/29-callbacks-higher-order-functions/content.md", starter: 'const nums = [1, 2, 3];\nnums.forEach(n => console.log(n));' },
      { id: 30, title: "Project: Interactive Todo App", contentPath: "/courses/2-javascript-fundamentals/lessons/30-project-interactive-todo-app/content.md", starter: '// Build your Todo App here!\nconsole.log("Project Time!");' }
    ]
  }
};

