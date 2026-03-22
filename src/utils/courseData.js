// src/utils/courseData.js — Static lesson content

export const COURSES = {
  1: {
    title: "Python for Beginners",
    lang: "python",
    lessons: [
      {
        id: 1, title: "Introduction to Python",
        content: `<h1>Welcome to Python 🐍</h1>
<p>Python is one of the most popular and beginner-friendly programming languages in the world. Created by Guido van Rossum in 1991, Python emphasizes readability and simplicity.</p>
<h3 style="margin:24px 0 12px;color:var(--accent)">Why Python?</h3>
<ul style="color:var(--text2);padding-left:20px;line-height:2">
  <li>Easy to read and write</li><li>Huge community &amp; libraries</li>
  <li>Used in web, data science, AI, automation</li>
</ul>
<h3 style="margin:24px 0 12px;color:var(--accent)">Your First Program</h3>
<p>Try this classic first program in the editor:</p>
<pre><code><span class="c-fn">print</span>(<span class="c-str">"Hello, World!"</span>)</code></pre>
<p>The <code>print()</code> function outputs text to the screen. Run it in the editor on the right! →</p>`,
        starter: '# Your first Python program\nprint("Hello, World!")\nprint("Welcome to LearnCode!")'
      },
      {
        id: 2, title: "Variables & Data Types",
        content: `<h1>Variables &amp; Data Types</h1>
<p>Variables are containers for storing data values. In Python, you don't need to declare the type explicitly.</p>
<h3 style="margin:24px 0 12px;color:var(--accent)">Basic Types</h3>
<pre><code><span class="c-comment"># Integer</span>
age = <span class="c-str">25</span>
<span class="c-comment"># Float</span>
price = <span class="c-str">9.99</span>
<span class="c-comment"># String</span>
name = <span class="c-str">"Alice"</span>
<span class="c-comment"># Boolean</span>
is_student = <span class="c-keyword">True</span>

<span class="c-fn">print</span>(<span class="c-fn">type</span>(age))
<span class="c-fn">print</span>(<span class="c-fn">type</span>(name))</code></pre>`,
        starter: '# Variables & Data Types\nname = "Alice"\nage = 25\nprice = 9.99\nis_student = True\n\nprint("Name:", name)\nprint("Age:", age)\nprint("Type of age:", type(age))'
      },
      {
        id: 3, title: "Operators",
        content: `<h1>Python Operators</h1>
<p>Operators are used to perform operations on variables and values.</p>
<h3 style="margin:24px 0 12px;color:var(--accent)">Arithmetic Operators</h3>
<pre><code>a = <span class="c-str">10</span>
b = <span class="c-str">3</span>
<span class="c-fn">print</span>(a + b)   <span class="c-comment"># 13</span>
<span class="c-fn">print</span>(a - b)   <span class="c-comment"># 7</span>
<span class="c-fn">print</span>(a * b)   <span class="c-comment"># 30</span>
<span class="c-fn">print</span>(a / b)   <span class="c-comment"># 3.33</span>
<span class="c-fn">print</span>(a % b)   <span class="c-comment"># 1</span>
<span class="c-fn">print</span>(a ** b)  <span class="c-comment"># 1000</span></code></pre>`,
        starter: '# Arithmetic Operators\na = 10\nb = 3\nprint("Add:", a + b)\nprint("Sub:", a - b)\nprint("Mul:", a * b)\nprint("Div:", a / b)\nprint("Mod:", a % b)\nprint("Power:", a ** b)'
      },
      {
        id: 4, title: "If / Else Statements",
        content: `<h1>Conditional Statements</h1>
<p>Use <code>if</code>, <code>elif</code>, and <code>else</code> to make decisions in your code.</p>
<pre><code>age = <span class="c-str">18</span>
<span class="c-keyword">if</span> age >= <span class="c-str">18</span>:
    <span class="c-fn">print</span>(<span class="c-str">"You are an adult"</span>)
<span class="c-keyword">elif</span> age >= <span class="c-str">13</span>:
    <span class="c-fn">print</span>(<span class="c-str">"You are a teenager"</span>)
<span class="c-keyword">else</span>:
    <span class="c-fn">print</span>(<span class="c-str">"You are a child"</span>)</code></pre>`,
        starter: '# Conditional Statements\nage = 18\n\nif age >= 18:\n    print("You are an adult")\nelif age >= 13:\n    print("You are a teenager")\nelse:\n    print("You are a child")\n\n# Try changing the age value!'
      },
      {
        id: 5, title: "Loops",
        content: `<h1>Loops in Python</h1>
<p>Loops let you repeat a block of code multiple times.</p>
<h3 style="margin:24px 0 12px;color:var(--accent)">for Loop</h3>
<pre><code><span class="c-keyword">for</span> i <span class="c-keyword">in</span> <span class="c-fn">range</span>(<span class="c-str">5</span>):
    <span class="c-fn">print</span>(<span class="c-str">f"Count: {i}"</span>)</code></pre>
<h3 style="margin:24px 0 12px;color:var(--accent)">while Loop</h3>
<pre><code>count = <span class="c-str">0</span>
<span class="c-keyword">while</span> count < <span class="c-str">5</span>:
    <span class="c-fn">print</span>(<span class="c-str">f"Count: {count}"</span>)
    count += <span class="c-str">1</span></code></pre>`,
        starter: '# Loops\nprint("--- for loop ---")\nfor i in range(5):\n    print(f"Count: {i}")\n\nprint("--- while loop ---")\ncount = 0\nwhile count < 5:\n    print(f"Count: {count}")\n    count += 1'
      }
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
