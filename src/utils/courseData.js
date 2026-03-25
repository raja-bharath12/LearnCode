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
,
3: {
    title: "Java Complete Course",
    lang: "java",
    lessons: [
      {
            id: 1,
            title: "Java Basics",
            contentPath: "/courses/3-java-complete-course/lessons/1-java-basics-setup/content.md",
            starter: "// Lesson 1: Java Basics\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Java Basics\");\n    }\n}"
      },
      {
            id: 2,
            title: "Variables & Data Types",
            contentPath: "/courses/3-java-complete-course/lessons/2-variables-data-types/content.md",
            starter: "// Lesson 2: Variables & Data Types\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Variables & Data Types\");\n    }\n}"
      },
      {
            id: 3,
            title: "Operators & Expressions",
            contentPath: "/courses/3-java-complete-course/lessons/3-operators-expressions/content.md",
            starter: "// Lesson 3: Operators & Expressions\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Operators & Expressions\");\n    }\n}"
      },
      {
            id: 4,
            title: "Control Flow (if / else)",
            contentPath: "/courses/3-java-complete-course/lessons/4-control-flow-if-else/content.md",
            starter: "// Lesson 4: Control Flow (if / else)\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Control Flow (if / else)\");\n    }\n}"
      },
      {
            id: 5,
            title: "Loops (for / while / do-while)",
            contentPath: "/courses/3-java-complete-course/lessons/5-loops-for-while-do-while/content.md",
            starter: "// Lesson 5: Loops (for / while / do-while)\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Loops (for / while / do-while)\");\n    }\n}"
      },
      {
            id: 6,
            title: "Methods (Functions)",
            contentPath: "/courses/3-java-complete-course/lessons/6-methods/content.md",
            starter: "// Lesson 6: Methods (Functions)\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Methods (Functions)\");\n    }\n}"
      },
      {
            id: 7,
            title: "Arrays",
            contentPath: "/courses/3-java-complete-course/lessons/7-arrays/content.md",
            starter: "// Lesson 7: Arrays\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Arrays\");\n    }\n}"
      },
      {
            id: 8,
            title: "Strings in Java",
            contentPath: "/courses/3-java-complete-course/lessons/8-strings-in-java/content.md",
            starter: "// Lesson 8: Strings in Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Strings in Java\");\n    }\n}"
      },
      {
            id: 9,
            title: "OOP – Classes & Objects",
            contentPath: "/courses/3-java-complete-course/lessons/9-oop-classes-objects/content.md",
            starter: "// Lesson 9: OOP – Classes & Objects\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from OOP – Classes & Objects\");\n    }\n}"
      },
      {
            id: 10,
            title: "Constructors",
            contentPath: "/courses/3-java-complete-course/lessons/10-constructors/content.md",
            starter: "// Lesson 10: Constructors\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Constructors\");\n    }\n}"
      },
      {
            id: 11,
            title: "Encapsulation",
            contentPath: "/courses/3-java-complete-course/lessons/11-encapsulation/content.md",
            starter: "// Lesson 11: Encapsulation\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Encapsulation\");\n    }\n}"
      },
      {
            id: 12,
            title: "Inheritance",
            contentPath: "/courses/3-java-complete-course/lessons/12-inheritance/content.md",
            starter: "// Lesson 12: Inheritance\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Inheritance\");\n    }\n}"
      },
      {
            id: 13,
            title: "Polymorphism",
            contentPath: "/courses/3-java-complete-course/lessons/13-polymorphism/content.md",
            starter: "// Lesson 13: Polymorphism\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Polymorphism\");\n    }\n}"
      },
      {
            id: 14,
            title: "Abstraction",
            contentPath: "/courses/3-java-complete-course/lessons/14-abstraction/content.md",
            starter: "// Lesson 14: Abstraction\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Abstraction\");\n    }\n}"
      },
      {
            id: 15,
            title: "Interfaces",
            contentPath: "/courses/3-java-complete-course/lessons/15-interfaces/content.md",
            starter: "// Lesson 15: Interfaces\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Interfaces\");\n    }\n}"
      },
      {
            id: 16,
            title: "Packages & Access Modifiers",
            contentPath: "/courses/3-java-complete-course/lessons/16-packages-access-modifiers/content.md",
            starter: "// Lesson 16: Packages & Access Modifiers\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Packages & Access Modifiers\");\n    }\n}"
      },
      {
            id: 17,
            title: "Exception Handling",
            contentPath: "/courses/3-java-complete-course/lessons/17-exception-handling/content.md",
            starter: "// Lesson 17: Exception Handling\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Exception Handling\");\n    }\n}"
      },
      {
            id: 18,
            title: "Generics",
            contentPath: "/courses/3-java-complete-course/lessons/18-generics/content.md",
            starter: "// Lesson 18: Generics\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Generics\");\n    }\n}"
      },
      {
            id: 19,
            title: "Collections – ArrayList",
            contentPath: "/courses/3-java-complete-course/lessons/19-collections-arraylist/content.md",
            starter: "// Lesson 19: Collections – ArrayList\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Collections – ArrayList\");\n    }\n}"
      },
      {
            id: 20,
            title: "Collections – HashMap",
            contentPath: "/courses/3-java-complete-course/lessons/20-collections-hashmap/content.md",
            starter: "// Lesson 20: Collections – HashMap\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Collections – HashMap\");\n    }\n}"
      },
      {
            id: 21,
            title: "Collections – LinkedList",
            contentPath: "/courses/3-java-complete-course/lessons/21-collections-linkedlist/content.md",
            starter: "// Lesson 21: Collections – LinkedList\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Collections – LinkedList\");\n    }\n}"
      },
      {
            id: 22,
            title: "Iterators",
            contentPath: "/courses/3-java-complete-course/lessons/22-iterators/content.md",
            starter: "// Lesson 22: Iterators\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Iterators\");\n    }\n}"
      },
      {
            id: 23,
            title: "Lambda Expressions",
            contentPath: "/courses/3-java-complete-course/lessons/23-lambda-expressions/content.md",
            starter: "// Lesson 23: Lambda Expressions\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Lambda Expressions\");\n    }\n}"
      },
      {
            id: 24,
            title: "Streams API",
            contentPath: "/courses/3-java-complete-course/lessons/24-streams-api/content.md",
            starter: "// Lesson 24: Streams API\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Streams API\");\n    }\n}"
      },
      {
            id: 25,
            title: "File I/O (java.io)",
            contentPath: "/courses/3-java-complete-course/lessons/25-file-i-o-java-io/content.md",
            starter: "// Lesson 25: File I/O (java.io)\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from File I/O (java.io)\");\n    }\n}"
      },
      {
            id: 26,
            title: "NIO & Paths",
            contentPath: "/courses/3-java-complete-course/lessons/26-nio-paths/content.md",
            starter: "// Lesson 26: NIO & Paths\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from NIO & Paths\");\n    }\n}"
      },
      {
            id: 27,
            title: "Multithreading Basics",
            contentPath: "/courses/3-java-complete-course/lessons/27-multithreading-basics/content.md",
            starter: "// Lesson 27: Multithreading Basics\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Multithreading Basics\");\n    }\n}"
      },
      {
            id: 28,
            title: "Concurrency (synchronized)",
            contentPath: "/courses/3-java-complete-course/lessons/28-concurrency-synchronized/content.md",
            starter: "// Lesson 28: Concurrency (synchronized)\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Concurrency (synchronized)\");\n    }\n}"
      },
      {
            id: 29,
            title: "Executor Service",
            contentPath: "/courses/3-java-complete-course/lessons/29-executor-service/content.md",
            starter: "// Lesson 29: Executor Service\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Executor Service\");\n    }\n}"
      },
      {
            id: 30,
            title: "Java 8+ Features",
            contentPath: "/courses/3-java-complete-course/lessons/30-java-8-features/content.md",
            starter: "// Lesson 30: Java 8+ Features\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Java 8+ Features\");\n    }\n}"
      },
      {
            id: 31,
            title: "Inner Classes",
            contentPath: "/courses/3-java-complete-course/lessons/31-inner-classes/content.md",
            starter: "// Lesson 31: Inner Classes\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Inner Classes\");\n    }\n}"
      },
      {
            id: 32,
            title: "Enums",
            contentPath: "/courses/3-java-complete-course/lessons/32-enums/content.md",
            starter: "// Lesson 32: Enums\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Enums\");\n    }\n}"
      },
      {
            id: 33,
            title: "Annotations",
            contentPath: "/courses/3-java-complete-course/lessons/33-annotations/content.md",
            starter: "// Lesson 33: Annotations\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Annotations\");\n    }\n}"
      },
      {
            id: 34,
            title: "Reflection",
            contentPath: "/courses/3-java-complete-course/lessons/34-reflection/content.md",
            starter: "// Lesson 34: Reflection\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Reflection\");\n    }\n}"
      },
      {
            id: 35,
            title: "Design Patterns - Singleton",
            contentPath: "/courses/3-java-complete-course/lessons/35-design-patterns-singleton/content.md",
            starter: "// Lesson 35: Design Patterns - Singleton\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Design Patterns - Singleton\");\n    }\n}"
      },
      {
            id: 36,
            title: "Design Patterns - Factory",
            contentPath: "/courses/3-java-complete-course/lessons/36-design-patterns-factory/content.md",
            starter: "// Lesson 36: Design Patterns - Factory\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Design Patterns - Factory\");\n    }\n}"
      },
      {
            id: 37,
            title: "Design Patterns - Observer",
            contentPath: "/courses/3-java-complete-course/lessons/37-design-patterns-observer/content.md",
            starter: "// Lesson 37: Design Patterns - Observer\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Design Patterns - Observer\");\n    }\n}"
      },
      {
            id: 38,
            title: "JDBC Databases",
            contentPath: "/courses/3-java-complete-course/lessons/38-jdbc-databases/content.md",
            starter: "// Lesson 38: JDBC Databases\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from JDBC Databases\");\n    }\n}"
      },
      {
            id: 39,
            title: "Unit Testing with JUnit",
            contentPath: "/courses/3-java-complete-course/lessons/39-unit-testing-with-junit/content.md",
            starter: "// Lesson 39: Unit Testing with JUnit\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Unit Testing with JUnit\");\n    }\n}"
      },
      {
            id: 40,
            title: "Project - Library Management System",
            contentPath: "/courses/3-java-complete-course/lessons/40-project-library-management-system/content.md",
            starter: "// Lesson 40: Project - Library Management System\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Project - Library Management System\");\n    }\n}"
      }
]
  },
4: {
    title: "Web Dev with HTML & CSS",
    lang: "html",
    lessons: [
      {
            id: 1,
            title: "HTML Basics & Structure",
            contentPath: "/courses/4-web-dev-html-css/lessons/1-html-basics-structure/content.md",
            starter: "<!-- Lesson 1: HTML Basics & Structure -->\n<h1>Hello from HTML Basics & Structure</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 2,
            title: "Text Elements & Semantics",
            contentPath: "/courses/4-web-dev-html-css/lessons/2-text-elements-semantics/content.md",
            starter: "<!-- Lesson 2: Text Elements & Semantics -->\n<h1>Hello from Text Elements & Semantics</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 3,
            title: "Links & Images",
            contentPath: "/courses/4-web-dev-html-css/lessons/3-links-images/content.md",
            starter: "<!-- Lesson 3: Links & Images -->\n<h1>Hello from Links & Images</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 4,
            title: "Lists & Tables",
            contentPath: "/courses/4-web-dev-html-css/lessons/4-lists-tables/content.md",
            starter: "<!-- Lesson 4: Lists & Tables -->\n<h1>Hello from Lists & Tables</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 5,
            title: "Forms & Inputs",
            contentPath: "/courses/4-web-dev-html-css/lessons/5-forms-inputs/content.md",
            starter: "<!-- Lesson 5: Forms & Inputs -->\n<h1>Hello from Forms & Inputs</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 6,
            title: "HTML5 Semantic Elements",
            contentPath: "/courses/4-web-dev-html-css/lessons/6-html5-semantic-elements/content.md",
            starter: "<!-- Lesson 6: HTML5 Semantic Elements -->\n<h1>Hello from HTML5 Semantic Elements</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 7,
            title: "CSS Introduction & Selectors",
            contentPath: "/courses/4-web-dev-html-css/lessons/7-css-introduction-selectors/content.md",
            starter: "<!-- Lesson 7: CSS Introduction & Selectors -->\n<h1>Hello from CSS Introduction & Selectors</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 8,
            title: "CSS Box Model",
            contentPath: "/courses/4-web-dev-html-css/lessons/8-box-model/content.md",
            starter: "<!-- Lesson 8: CSS Box Model -->\n<h1>Hello from CSS Box Model</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 9,
            title: "Colors & Typography",
            contentPath: "/courses/4-web-dev-html-css/lessons/9-colors-typography/content.md",
            starter: "<!-- Lesson 9: Colors & Typography -->\n<h1>Hello from Colors & Typography</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 10,
            title: "Display & Positioning",
            contentPath: "/courses/4-web-dev-html-css/lessons/10-display-positioning/content.md",
            starter: "<!-- Lesson 10: Display & Positioning -->\n<h1>Hello from Display & Positioning</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 11,
            title: "Flexbox Basics",
            contentPath: "/courses/4-web-dev-html-css/lessons/11-flexbox-basics/content.md",
            starter: "<!-- Lesson 11: Flexbox Basics -->\n<h1>Hello from Flexbox Basics</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 12,
            title: "Flexbox Advanced",
            contentPath: "/courses/4-web-dev-html-css/lessons/12-flexbox-advanced/content.md",
            starter: "<!-- Lesson 12: Flexbox Advanced -->\n<h1>Hello from Flexbox Advanced</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 13,
            title: "CSS Grid Basics",
            contentPath: "/courses/4-web-dev-html-css/lessons/13-css-grid-basics/content.md",
            starter: "<!-- Lesson 13: CSS Grid Basics -->\n<h1>Hello from CSS Grid Basics</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 14,
            title: "CSS Grid Advanced",
            contentPath: "/courses/4-web-dev-html-css/lessons/14-css-grid-advanced/content.md",
            starter: "<!-- Lesson 14: CSS Grid Advanced -->\n<h1>Hello from CSS Grid Advanced</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 15,
            title: "Responsive Design & Media Queries",
            contentPath: "/courses/4-web-dev-html-css/lessons/15-responsive-design-media-queries/content.md",
            starter: "<!-- Lesson 15: Responsive Design & Media Queries -->\n<h1>Hello from Responsive Design & Media Queries</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 16,
            title: "CSS Variables",
            contentPath: "/courses/4-web-dev-html-css/lessons/16-css-variables/content.md",
            starter: "<!-- Lesson 16: CSS Variables -->\n<h1>Hello from CSS Variables</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 17,
            title: "Transitions & Animations",
            contentPath: "/courses/4-web-dev-html-css/lessons/17-transitions-animations/content.md",
            starter: "<!-- Lesson 17: Transitions & Animations -->\n<h1>Hello from Transitions & Animations</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 18,
            title: "Pseudo-classes & Pseudo-elements",
            contentPath: "/courses/4-web-dev-html-css/lessons/18-pseudo-classes-pseudo-elements/content.md",
            starter: "<!-- Lesson 18: Pseudo-classes & Pseudo-elements -->\n<h1>Hello from Pseudo-classes & Pseudo-elements</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 19,
            title: "CSS Frameworks Overview (Bootstrap)",
            contentPath: "/courses/4-web-dev-html-css/lessons/19-css-frameworks-overview-bootstrap/content.md",
            starter: "<!-- Lesson 19: CSS Frameworks Overview (Bootstrap) -->\n<h1>Hello from CSS Frameworks Overview (Bootstrap)</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      },
      {
            id: 20,
            title: "Project - Responsive Portfolio Website",
            contentPath: "/courses/4-web-dev-html-css/lessons/20-project-responsive-portfolio-website/content.md",
            starter: "<!-- Lesson 20: Project - Responsive Portfolio Website -->\n<h1>Hello from Project - Responsive Portfolio Website</h1>\n<style>\n  h1 { color: #3498db; }\n</style>"
      }
]
  },
  5: {
    title: "Data Structures & Algorithms",
    lang: "cpp",
    lessons: [
      {
            id: 1,
            title: "Big O Notation",
            contentPath: "/courses/5-dsa/lessons/1-big-o-notation/content.md",
            starter: "// Lesson 1: Big O Notation\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Big O Notation!\" << endl;\n    return 0;\n}"
      },
      {
            id: 2,
            title: "Arrays & Dynamic Arrays",
            contentPath: "/courses/5-dsa/lessons/2-arrays-dynamic-arrays/content.md",
            starter: "// Lesson 2: Arrays & Dynamic Arrays\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Arrays & Dynamic Arrays!\" << endl;\n    return 0;\n}"
      },
      {
            id: 3,
            title: "Linked Lists",
            contentPath: "/courses/5-dsa/lessons/3-linked-lists/content.md",
            starter: "// Lesson 3: Linked Lists\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Linked Lists!\" << endl;\n    return 0;\n}"
      },
      {
            id: 4,
            title: "Doubly Linked Lists",
            contentPath: "/courses/5-dsa/lessons/4-doubly-linked-lists/content.md",
            starter: "// Lesson 4: Doubly Linked Lists\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Doubly Linked Lists!\" << endl;\n    return 0;\n}"
      },
      {
            id: 5,
            title: "Stacks",
            contentPath: "/courses/5-dsa/lessons/5-stacks/content.md",
            starter: "// Lesson 5: Stacks\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Stacks!\" << endl;\n    return 0;\n}"
      },
      {
            id: 6,
            title: "Queues",
            contentPath: "/courses/5-dsa/lessons/6-queues/content.md",
            starter: "// Lesson 6: Queues\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Queues!\" << endl;\n    return 0;\n}"
      },
      {
            id: 7,
            title: "Hash Tables",
            contentPath: "/courses/5-dsa/lessons/7-hash-tables/content.md",
            starter: "// Lesson 7: Hash Tables\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Hash Tables!\" << endl;\n    return 0;\n}"
      },
      {
            id: 8,
            title: "Hash Collisions",
            contentPath: "/courses/5-dsa/lessons/8-hash-collisions/content.md",
            starter: "// Lesson 8: Hash Collisions\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Hash Collisions!\" << endl;\n    return 0;\n}"
      },
      {
            id: 9,
            title: "Binary Trees",
            contentPath: "/courses/5-dsa/lessons/9-binary-trees/content.md",
            starter: "// Lesson 9: Binary Trees\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Binary Trees!\" << endl;\n    return 0;\n}"
      },
      {
            id: 10,
            title: "Binary Search Trees",
            contentPath: "/courses/5-dsa/lessons/10-binary-search-trees/content.md",
            starter: "// Lesson 10: Binary Search Trees\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Binary Search Trees!\" << endl;\n    return 0;\n}"
      },
      {
            id: 11,
            title: "AVL Trees",
            contentPath: "/courses/5-dsa/lessons/11-avl-trees/content.md",
            starter: "// Lesson 11: AVL Trees\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from AVL Trees!\" << endl;\n    return 0;\n}"
      },
      {
            id: 12,
            title: "Heaps & Priority Queues",
            contentPath: "/courses/5-dsa/lessons/12-heaps-priority-queues/content.md",
            starter: "// Lesson 12: Heaps & Priority Queues\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Heaps & Priority Queues!\" << endl;\n    return 0;\n}"
      },
      {
            id: 13,
            title: "Graphs Representation",
            contentPath: "/courses/5-dsa/lessons/13-graphs-representation/content.md",
            starter: "// Lesson 13: Graphs Representation\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Graphs Representation!\" << endl;\n    return 0;\n}"
      },
      {
            id: 14,
            title: "BFS (Breadth-First Search)",
            contentPath: "/courses/5-dsa/lessons/14-bfs-breadth-first-search/content.md",
            starter: "// Lesson 14: BFS (Breadth-First Search)\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from BFS (Breadth-First Search)!\" << endl;\n    return 0;\n}"
      },
      {
            id: 15,
            title: "DFS (Depth-First Search)",
            contentPath: "/courses/5-dsa/lessons/15-dfs-depth-first-search/content.md",
            starter: "// Lesson 15: DFS (Depth-First Search)\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from DFS (Depth-First Search)!\" << endl;\n    return 0;\n}"
      },
      {
            id: 16,
            title: "Sorting: Bubble & Selection",
            contentPath: "/courses/5-dsa/lessons/16-sorting-bubble-selection/content.md",
            starter: "// Lesson 16: Sorting: Bubble & Selection\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Sorting: Bubble & Selection!\" << endl;\n    return 0;\n}"
      },
      {
            id: 17,
            title: "Sorting: Insertion & Merge",
            contentPath: "/courses/5-dsa/lessons/17-sorting-insertion-merge/content.md",
            starter: "// Lesson 17: Sorting: Insertion & Merge\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Sorting: Insertion & Merge!\" << endl;\n    return 0;\n}"
      },
      {
            id: 18,
            title: "Sorting: Quick Sort",
            contentPath: "/courses/5-dsa/lessons/18-sorting-quick-sort/content.md",
            starter: "// Lesson 18: Sorting: Quick Sort\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Sorting: Quick Sort!\" << endl;\n    return 0;\n}"
      },
      {
            id: 19,
            title: "Sorting: Heap Sort",
            contentPath: "/courses/5-dsa/lessons/19-sorting-heap-sort/content.md",
            starter: "// Lesson 19: Sorting: Heap Sort\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Sorting: Heap Sort!\" << endl;\n    return 0;\n}"
      },
      {
            id: 20,
            title: "Binary Search",
            contentPath: "/courses/5-dsa/lessons/20-binary-search/content.md",
            starter: "// Lesson 20: Binary Search\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Binary Search!\" << endl;\n    return 0;\n}"
      },
      {
            id: 21,
            title: "Two Pointers Technique",
            contentPath: "/courses/5-dsa/lessons/21-two-pointers-technique/content.md",
            starter: "// Lesson 21: Two Pointers Technique\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Two Pointers Technique!\" << endl;\n    return 0;\n}"
      },
      {
            id: 22,
            title: "Sliding Window",
            contentPath: "/courses/5-dsa/lessons/22-sliding-window/content.md",
            starter: "// Lesson 22: Sliding Window\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Sliding Window!\" << endl;\n    return 0;\n}"
      },
      {
            id: 23,
            title: "Recursion & Backtracking",
            contentPath: "/courses/5-dsa/lessons/23-recursion-backtracking/content.md",
            starter: "// Lesson 23: Recursion & Backtracking\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Recursion & Backtracking!\" << endl;\n    return 0;\n}"
      },
      {
            id: 24,
            title: "Dynamic Programming Basics",
            contentPath: "/courses/5-dsa/lessons/24-dynamic-programming-basics/content.md",
            starter: "// Lesson 24: Dynamic Programming Basics\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Dynamic Programming Basics!\" << endl;\n    return 0;\n}"
      },
      {
            id: 25,
            title: "DP Memoization",
            contentPath: "/courses/5-dsa/lessons/25-dp-memoization/content.md",
            starter: "// Lesson 25: DP Memoization\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from DP Memoization!\" << endl;\n    return 0;\n}"
      },
      {
            id: 26,
            title: "DP Tabulation",
            contentPath: "/courses/5-dsa/lessons/26-dp-tabulation/content.md",
            starter: "// Lesson 26: DP Tabulation\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from DP Tabulation!\" << endl;\n    return 0;\n}"
      },
      {
            id: 27,
            title: "Greedy Algorithms",
            contentPath: "/courses/5-dsa/lessons/27-greedy-algorithms/content.md",
            starter: "// Lesson 27: Greedy Algorithms\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Greedy Algorithms!\" << endl;\n    return 0;\n}"
      },
      {
            id: 28,
            title: "Tries",
            contentPath: "/courses/5-dsa/lessons/28-tries/content.md",
            starter: "// Lesson 28: Tries\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Tries!\" << endl;\n    return 0;\n}"
      },
      {
            id: 29,
            title: "Segment Trees",
            contentPath: "/courses/5-dsa/lessons/29-segment-trees/content.md",
            starter: "// Lesson 29: Segment Trees\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Segment Trees!\" << endl;\n    return 0;\n}"
      },
      {
            id: 30,
            title: "Fenwick Trees (BIT)",
            contentPath: "/courses/5-dsa/lessons/30-fenwick-trees-bit/content.md",
            starter: "// Lesson 30: Fenwick Trees (BIT)\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Fenwick Trees (BIT)!\" << endl;\n    return 0;\n}"
      },
      {
            id: 31,
            title: "Disjoint Sets (Union Find)",
            contentPath: "/courses/5-dsa/lessons/31-disjoint-sets-union-find/content.md",
            starter: "// Lesson 31: Disjoint Sets (Union Find)\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Disjoint Sets (Union Find)!\" << endl;\n    return 0;\n}"
      },
      {
            id: 32,
            title: "Bellman-Ford Algorithm",
            contentPath: "/courses/5-dsa/lessons/32-bellman-ford-algorithm/content.md",
            starter: "// Lesson 32: Bellman-Ford Algorithm\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Bellman-Ford Algorithm!\" << endl;\n    return 0;\n}"
      },
      {
            id: 33,
            title: "Dijkstra's Algorithm",
            contentPath: "/courses/5-dsa/lessons/33-dijkstra-s-algorithm/content.md",
            starter: "// Lesson 33: Dijkstra's Algorithm\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Dijkstra's Algorithm!\" << endl;\n    return 0;\n}"
      },
      {
            id: 34,
            title: "String Algorithms (KMP)",
            contentPath: "/courses/5-dsa/lessons/34-string-algorithms-kmp/content.md",
            starter: "// Lesson 34: String Algorithms (KMP)\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from String Algorithms (KMP)!\" << endl;\n    return 0;\n}"
      },
      {
            id: 35,
            title: "Project: Interview Problem Set",
            contentPath: "/courses/5-dsa/lessons/35-project-interview-problem-set/content.md",
            starter: "// Lesson 35: Project: Interview Problem Set\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello from Project: Interview Problem Set!\" << endl;\n    return 0;\n}"
      }
    ]
  }
};
