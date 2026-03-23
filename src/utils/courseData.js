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
      {
        id: 1, title: "Intro to JavaScript",
        content: `<h1>Welcome to JavaScript ⚡</h1><p>JavaScript is the language of the web. It runs in every browser and powers interactive websites.</p><pre><code>console.log("Hello, World!");</code></pre>`,
        starter: '// Your first JS program\nconsole.log("Hello, World!");\nconsole.log("JavaScript is awesome!");'
      },
      {
        id: 2, title: "Variables: let & const",
        content: `<h1>Variables in JS</h1><p>Use <code>let</code> for variables that change, and <code>const</code> for constants.</p><pre><code>let name = "Alice";\nconst PI = 3.14159;\nconsole.log(name, PI);</code></pre>`,
        starter: 'let name = "Alice";\nconst PI = 3.14159;\nlet age = 25;\n\nconsole.log("Name:", name);\nconsole.log("PI:", PI);\nconsole.log("Age:", age);'
      },
      {
        id: 3, title: "Functions",
        content: `<h1>Functions</h1><p>Functions are reusable blocks of code.</p><pre><code>function greet(name) {\n  return \`Hello, \${name}!\`;\n}\nconsole.log(greet("World"));</code></pre>`,
        starter: 'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconst add = (a, b) => a + b;\n\nconsole.log(greet("World"));\nconsole.log("Sum:", add(5, 3));'
      }
    ]
  }
};
