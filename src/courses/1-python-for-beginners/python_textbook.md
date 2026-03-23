#  Lesson 1: Introduction to Python

##  Definition
Python is a high-level, interpreted, general-purpose programming language designed to be simple, readable, and easy to learn.

##  Explanation
Python was created by Guido van Rossum and released in 1991.

###  Key Features:
 **Easy to understand**: Simple syntax similar to English.  
 **Interpreted**: No compilation needed; code runs line by line.  
 **Platform independent**: Runs on Windows, Linux, Mac.  
 **Supports multiple paradigms**: Procedural, object-oriented, functional.  
 **Large community**: Extensive libraries for AI, Data Science, Web, etc.

###  Where Python is Used:
- Web Development (Django, Flask)
- Data Science & AI
- Automation & Scripting
- Game Development
- Cybersecurity

###  How Python Works:
1. You write code.
2. The Python interpreter executes it line by line.
3. Output is displayed.
 *No need for compilation like C/C++.*

###  Basic Syntax Example:
```python
print("Hello, World!")
```
 **Output:**
```
Hello, World!
```

###  Important Rules:
- **Case-sensitive**: `name` and `Name` are different variables.
- **Indentation**: Uses whitespace instead of curly braces `{}` to define code blocks.

##  Examples with Answers

###  Easy
**Problem:** Print your name.
```python
print("Raja Bharath")
```
 **Output:**
```
Raja Bharath
```

###  Medium
**Problem:** Print two lines using a single print statement.
```python
print("Welcome to Python\nLearning is fun")
```
 **Output:**
```
Welcome to Python
Learning is fun
```

###  Advanced
**Problem:** Use variables and print formatted output.
```python
name = "Raja"
course = "Python"
print(f"{name} is learning {course}")
```
 **Output:**
```
Raja is learning Python
```

##  Summary
- Python is beginner-friendly and highly readable.
- It is widely used in real-world applications.
- Indentation is critical for defining code structure.


---

#  Lesson 2: Variables & Data Types

##  Definition
A **variable** is a container used to store data values in a program.  
A **data type** defines the type of value a variable can hold.

##  Explanation
In Python:
- You don’t need to declare the variable type explicitly.
- Python automatically assigns the data type based on the value.

###  Common Data Types:
| Data Type | Description | Example |
| :--- | :--- | :--- |
| `int` | Integer numbers (whole numbers) | `10` |
| `float` | Decimal numbers (floating point) | `3.14` |
| `str` | Text (string of characters) | `"Hello"` |
| `bool` | Boolean (True or False) | `True` |

###  Dynamic Typing:
Python allows changing the type of a variable during execution:
```python
x = 10        # x is an int
x = "Python"  # now x is a str
```

###  Checking Data Type:
Use the `type()` function to see the data type of a variable:
```python
x = 10
print(type(x)) # Output: <class 'int'>
```

###  Type Conversion:
You can convert one type to another (casting):
```python
x = "10"
y = int(x)
print(y) # Output: 10 (as an integer)
```

##  Examples with Answers

###  Easy
**Problem:** Store a number in a variable and print it.
```python
num = 5
print(num)
```
 **Output:**
```
5
```

###  Medium
**Problem:** Store a name and an age, then print them on the same line.
```python
name = "Raja"
age = 20
print(name, age)
```
 **Output:**
```
Raja 20
```

###  Advanced
**Problem:** Add an integer and a float, then display the result and its data type.
```python
a = 10
b = 2.5
result = a + b

print(result)
print(type(result))
```
 **Output:**
```
12.5
<class 'float'>
```

##  Important Rules for Variable Names:
- Must start with a letter or an underscore (`_`).
- Cannot start with a number.
- Are case-sensitive (`a = 10` and `A = 20` are different).

##  Summary
- Variables store data and use dynamic typing.
- Common types include `int`, `float`, `str`, and `bool`.
- Use `type()` to check types and casting functions (like `int()`) to convert them.


---

#  Lesson 3: Strings

##  Definition
A **string** is a sequence of characters enclosed in single quotes (`' '`) or double quotes (`" "`).

##  Explanation
Strings are used to store text data such as names, messages, or paragraphs.

###  Key Features:
- **Ordered**: Each character has a fixed position (index).
- **Immutable**: Once created, individual characters cannot be changed directly.
- **Versatile**: Supports powerful operations like indexing, slicing, and manipulation.

###  Indexing:
Access individual characters using their position (starts at 0):
```python
text = "Python"
print(text[0]) # Output: P
print(text[1]) # Output: y
```

### ️ Slicing:
Extract a portion of a string using a range `[start:end]`:
```python
text = "Python"
print(text[0:3]) # Output: Pyt
```

###  Common String Operations:
```python
text = "python"
print(text.upper())           # PYTHON
print(text.lower())           # python
print(len(text))              # 6
print(text.replace("p", "J")) # Jython
```

###  String Concatenation:
Join two or more strings using the `+` operator:
```python
a = "Hello"
b = "World"
print(a + " " + b) # Output: Hello World
```

###  Escape Characters:
| Symbol | Meaning |
| :--- | :--- |
| `\n` | New line |
| `\t` | Tab space |

##  Examples with Answers

###  Easy
**Problem:** Store a name in a variable and print it.
```python
name = "Raja"
print(name)
```
 **Output:**
```
Raja
```

###  Medium
**Problem:** Find the length of a given string.
```python
text = "Python"
print(len(text))
```
 **Output:**
```
6
```

###  Advanced
**Problem:** Replace a specific word in a string with another word.
```python
text = "I love Python"
new_text = text.replace("Python", "Java")
print(new_text)
```
 **Output:**
```
I love Java
```

##  Summary
- Strings store text and are immutable.
- Indexing starts at 0; slicing uses `[start:end]`.
- Native methods like `.upper()`, `.lower()`, and `.replace()` make manipulation easy.


---

#  Lesson 4: Numbers & Math

##  Definition
Numbers in Python are used to store numeric values and perform various mathematical operations.

##  Explanation
Python supports three primary numeric types:

| Type | Description | Example |
| :--- | :--- | :--- |
| `int` | Whole numbers | `10`, `-5` |
| `float` | Decimal numbers | `3.14`, `-0.5` |
| `complex` | Numbers with real and imaginary parts | `2 + 3j` |

###  Arithmetic Operations:
```python
a = 10
b = 3

print(a + b)  # Addition (13)
print(a - b)  # Subtraction (7)
print(a * b)  # Multiplication (30)
print(a / b)  # Division (3.333...)
print(a % b)  # Modulus/Remainder (1)
print(a ** b) # Power/Exponent (1000)
print(a // b) # Floor Division (3)
```

###  Type Conversion:
```python
x = 10
y = float(x)
print(y) # Output: 10.0
```

###  The Math Module:
For advanced math, import the built-in `math` module:
```python
import math

print(math.sqrt(16))  # 4.0
print(math.ceil(4.2)) # 5
print(math.floor(4.8)) # 4
print(math.pi)        # 3.14159...
```

##  Examples with Answers

###  Easy
**Problem:** Write a program to add two numbers.
```python
a = 5
b = 7
print(a + b)
```
 **Output:**
```
12
```

###  Medium
**Problem:** Find the remainder when 10 is divided by 3.
```python
a = 10
b = 3
print(a % b)
```
 **Output:**
```
1
```

###  Advanced
**Problem:** Calculate the area of a circle with a radius of 7.
```python
import math

radius = 7
area = math.pi * radius ** 2
print(area)
```
 **Output:**
```
153.93804002589985
```

##  Summary
- Python handles `int`, `float`, and `complex` numbers easily.
- Division always returns a `float`.
- Use the `math` module for advanced trigonometry, logarithms, and constants like Pi.


---

#  Lesson 5: Input & Output

##  Definition
**Input**: Taking data from the user during program execution.  
**Output**: Displaying data, results, or messages to the user.

##  Explanation
Python provides two main built-in functions for basic communication:

###  Taking Input:
The `input()` function pauses the program and waits for the user to type something.
```python
name = input("Enter your name: ")
print(name)
```

###  Important Point:
By default, `input()` always returns a string (`str`).
```python
age = input("Enter age: ")
print(type(age)) # Output: <class 'str'>
```

###  Type Conversion:
To perform calculations, you must convert the input to a number (`int` or `float`):
```python
age = int(input("Enter age: "))
print(f"Next year you will be {age + 1}")
```

###  Displaying Output:
The `print()` function displays text or variables to the console.
- **Multiple Values**: `print("Name:", name, "Age:", age)`
- **End Character**: `print("Hello", end=" ")` (prevents a new line)

###  Formatted Output (f-strings):
The most modern and readable way to format output:
```python
name = "Raja"
age = 20
print(f"My name is {name} and I am {age} years old.")
```

##  Examples with Answers

###  Easy
**Problem:** Take the user's name as input and greet them.
```python
name = input("Enter name: ")
print("Hello", name)
```
 **Example Output:**
```
Enter name: Raja
Hello Raja
```

###  Medium
**Problem:** Take two numbers from the user and print their sum.
```python
a = int(input("Enter first number: "))
b = int(input("Enter second number: "))
print("Sum:", a + b)
```
 **Example Output:**
```
Enter first number: 5
Enter second number: 7
Sum: 12
```

###  Advanced
**Problem:** Take a number from the user and calculate its square.
```python
num = int(input("Enter a number: "))
print(f"The square of {num} is: {num ** 2}")
```
 **Example Output:**
```
Enter a number: 4
The square of 4 is: 16
```

##  Summary
- Use `input()` for receiving data and `print()` for displaying it.
- Remember to cast (`int()`, `float()`) input values used in mathematics.
- Use f-strings (`f"..."`) for clean and efficient output formatting.


---

#  Lesson 6: Conditional Statements (if / elif / else)

##  Definition
**Conditional statements** allow a program to make decisions and execute different blocks of code based on whether a condition is true or false.

##  Explanation
Python uses specific keywords to control logic flow:

###  The Structure:
- **`if`**: The starting point; checks the first condition.
- **`elif`** (Else If): Checks another condition if the previous ones were `False`.
- **`else`**: The "fallback"; executes if all previous conditions were `False`.

###  Simple Example:
```python
age = 18

if age >= 18:
    print("You are an adult.")
else:
    print("You are a minor.")
```

###  Multiple Conditions:
```python
marks = 85

if marks >= 90:
    print("Grade A")
elif marks >= 50:
    print("Grade B")
else:
    print("Fail")
```

###  Logical and Comparison Operators:
| Operator | Meaning | Example |
| :--- | :--- | :--- |
| `==` | Equal to | `x == 5` |
| `!=` | Not equal to | `x != 5` |
| `and` | Both true | `x > 0 and x < 10` |
| `or` | At least one true | `x < 0 or x > 10` |

##  Examples with Answers

###  Easy
**Problem:** Write a program to check if a number is positive.
```python
num = 5
if num > 0:
    print("Positive")
```
 **Output:**
```
Positive
```

###  Medium
**Problem:** Check if a number entered by the user is even or odd.
```python
num = 10
if num % 2 == 0:
    print("Even")
else:
    print("Odd")
```
 **Output:**
```
Even
```

###  Advanced
**Problem:** Write a program to check if a year is a Leap Year.
```python
year = 2024

if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print("Leap Year")
else:
    print("Not a Leap Year")
```
 **Output:**
```
Leap Year
```

##  Summary
- Indentation is mandatory in Python to define code blocks.
- `if`, `elif`, and `else` provide robust decision-making capabilities.
- Combine conditions with logical operators (`and`, `or`, `not`) for complex logic.


---

#  Lesson 7: Loops (for & while)

##  Definition
**Loops** are used to repeat a block of code multiple times until a specific condition is met or a sequence is exhausted.

##  Explanation
Python provides two primary loop types:

###  1. The `for` Loop:
Used when you know beforehand how many times the code should run. It is often used with sequences (like lists) or the `range()` function.
```python
for i in range(5): # Runs from 0 to 4
    print(i)
```

###  2. The `while` Loop:
Used when the number of iterations is NOT known ahead of time. It repeats as long as its condition remains `True`.
```python
i = 0
while i < 5:
    print(i)
    i += 1 # Critical: update the counter to avoid infinite loops
```

###  Loop Control Statements:
- **`break`**: Immediately exits the loop.
- **`continue`**: Skips the rest of the current iteration and jumps to the next.

##  Examples with Answers

###  Easy
**Problem:** Print numbers from 1 to 5 using a `for` loop.
```python
for i in range(1, 6):
    print(i)
```
 **Output:**
```
1
2
3
4
5
```

###  Medium
**Problem:** Calculate the sum of the first 10 numbers (1 to 10).
```python
total = 0
for i in range(1, 11):
    total += i
print("Total sum:", total)
```
 **Output:**
```
Total sum: 55
```

###  Advanced
**Problem:** Print the multiplication table for a number provided by the user.
```python
num = 5
for i in range(1, 11):
    print(f"{num} x {i} = {num * i}")
```
 **Output:**
```
5 x 1 = 5
5 x 2 = 10
...
5 x 10 = 50
```

##  Summary
- Use `for` loops for iterating over ranges or collections.
- Use `while` loops for condition-based repetition.
- Always ensure `while` loop conditions eventually become `False` to prevent infinite loops.


---

#  Lesson 8: Lists

##  Definition
A **list** is an ordered, mutable (changeable) collection of items stored in a single variable.

##  Explanation
Lists are one of the most powerful data structures in Python. They allow you to group related data together.

###  Key Characteristics:
- **Ordered**: Items have a fixed position (index).
- **Mutable**: You can add, remove, or change items after creation.
- **Heterogeneous**: Can store different data types (e.g., `[1, "Apple", 3.5]`).

###  Accessing Elements (Indexing):
Negative indexing (starts at -1) allows access from the end.
```python
nums = [10, 20, 30]
print(nums[0])  # 10
print(nums[-1]) # 30
```

###  Common List Operations:
```python
fruits = ["Apple", "Banana"]
fruits.append("Cherry")  # Add to end
fruits.remove("Banana")  # Remove specific item
fruits[0] = "Mango"      # Modify element
print(len(fruits))       # Get size
```

### ️ Slicing:
Extract a sub-list using `[start:end]`.
```python
nums = [1, 2, 3, 4, 5]
print(nums[1:4]) # Output: [2, 3, 4]
```

##  Examples with Answers

###  Easy
**Problem:** Create a list of three strings and print the first item.
```python
names = ["Raja", "Kumar", "Arun"]
print(names[0])
```
 **Output:**
```
Raja
```

###  Medium
**Problem:** Create a list of two numbers, add a third number to it, and print the updated list.
```python
nums = [10, 20]
nums.append(30)
print(nums)
```
 **Output:**
```
[10, 20, 30]
```

###  Advanced
**Problem:** Use a loop to find the sum of all elements in a numeric list.
```python
nums = [1, 2, 3, 4]
total = 0

for i in nums:
    total += i

print("Total sum:", total)
```
 **Output:**
```
Total sum: 10
```

##  Summary
- Lists are versatile containers for multiple items.
- Support indexing, slicing, and a variety of methods for manipulation.
- Use `.append()`, `.remove()`, and `.insert()` to manage list contents.


---

#  Lesson 9: Tuples

##  Definition
A **tuple** is an ordered, immutable collection of items stored in a single variable.

##  Explanation
Tuples are very similar to lists, but with one key difference: once a tuple is created, you cannot change, add, or remove its elements.

###  Key Characteristics:
- **Ordered**: Items have a fixed position (index).
- **Immutable**: Elements cannot be modified after the tuple is defined.
- **Efficient**: Tuples use less memory than lists and are faster to process.

###  Accessing Elements (Indexing):
Just like lists, indexing starts at 0.
```python
t = (10, 20, 30)
print(t[0]) # Output: 10
```

### ️ Slicing:
Extract a portion using `[start:end]`.
```python
t = (1, 2, 3, 4)
print(t[1:3]) # Output: (2, 3)
```

###  Immutability (The Rule):
Attempting to change an item will result in an error.
```python
t = (1, 2, 3)
# t[0] = 10  TypeError: 'tuple' object does not support item assignment
```

###  Tuple Packing & Unpacking:
- **Packing**: Combining multiple values into a single tuple.
- **Unpacking**: Assigning elements of a tuple back into individual variables.
```python
# Packing
point = (10, 20, 30)

# Unpacking
x, y, z = point
print(x, y, z) # 10 20 30
```

##  Examples with Answers

###  Easy
**Problem:** Create a tuple with three items and print the entire tuple.
```python
t = (1, 2, 3)
print(t)
```
 **Output:**
```
(1, 2, 3)
```

###  Medium
**Problem:** Create a tuple and access its second element.
```python
t = (10, 20, 30)
print(t[1])
```
 **Output:**
```
20
```

###  Advanced
**Problem:** Unpack a tuple containing three coordinates (x, y, z) into individual variables and print each.
```python
coords = (5, 10, 15)
x, y, z = coords

print(x)
print(y)
print(z)
```
 **Output:**
```
5
10
15
```

##  Summary
- Use tuples when you have data that should not change throughout the life of your program.
- Creating a single-element tuple requires a trailing comma, e.g., `(5,)`.
- Unpacking is a powerful way to distribute tuple data into variables.


---

#  Lesson 10: Dictionaries

##  Definition
A **dictionary** is a mutable collection of items stored as **key-value pairs**.

##  Explanation
Unlike lists or tuples, dictionaries do not use indexes (like 0, 1, 2). Instead, they use unique keys to access specific values.

###  Key Characteristics:
- **Unordered/Mapped**: Values are accessed via keys, not numerical positions.
- **Mutable**: You can add, remove, or update items.
- **Unique Keys**: Each key must be unique and immutable (like a string or number).

###  Basic Operations:
```python
student = {
    "name": "Raja",
    "age": 20,
    "course": "Python"
}

# Accessing
print(student["name"]) # Raja

# Adding/Updating
student["age"] = 21
student["city"] = "Chennai"

# Removing
student.pop("course")
```

###  Looping Through a Dictionary:
```python
for key, value in student.items():
    print(f"{key}: {value}")
```

###  Useful Methods:
- `.keys()`: Returns all keys.
- `.values()`: Returns all values.
- `.items()`: Returns key-value pairs as tuples.

##  Examples with Answers

###  Easy
**Problem:** Create a dictionary with `name` and `age` and print it.
```python
student = {"name": "Raja", "age": 20}
print(student)
```
 **Output:**
```python
{'name': 'Raja', 'age': 20}
```

###  Medium
**Problem:** Access the value of the `age` key in a student dictionary.
```python
student = {"name": "Raja", "age": 20}
print(student["age"])
```
 **Output:**
```
20
```

###  Advanced
**Problem:** Add a new key called `course` to a student dictionary and print all keys and values using a loop.
```python
student = {"name": "Raja", "age": 20}
student["course"] = "Python"

for key, value in student.items():
    print(f"{key} : {value}")
```
 **Output:**
```
name : Raja
age : 20
course : Python
```

##  Summary
- Dictionaries are ideal for storing structured data (like a database record).
- Keys are used for ultra-fast data lookup.
- Use `{}` or `dict()` to create a new dictionary.


---

#  Lesson 11: Sets

##  Definition
A **set** is an unordered collection of **unique** elements.

##  Explanation
Sets are similar to lists, but they automatically remove duplicate items and do not maintain any specific order.

###  Key Characteristics:
- **Unique Elements**: Never contains the same item twice.
- **Unordered**: No fixed positions; indexing (`s[0]`) is not supported.
- **Mutable**: You can add or remove items easily.

###  Basic Operations:
```python
s = {1, 2, 3, 3, 3}
print(s) # Output: {1, 2, 3} (duplicates removed)

s.add(4)     # Add item
s.remove(2)  # Remove item
```

###  Set Mathematics:
Sets are powerful for mathematical operations:
```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b) # Union: {1, 2, 3, 4, 5}
print(a & b) # Intersection: {3}
print(a - b) # Difference: {1, 2}
```

##  Examples with Answers

###  Easy
**Problem:** Create a set with values 1, 2, and 3 and print it.
```python
s = {1, 2, 3}
print(s)
```
 **Output:**
```
{1, 2, 3}
```

###  Medium
**Problem:** Take a list that has duplicate numbers and use a set to print only the unique numbers.
```python
nums = [1, 2, 2, 3, 3, 4]
unique_nums = set(nums)
print(unique_nums)
```
 **Output:**
```
{1, 2, 3, 4}
```

###  Advanced
**Problem:** Given two sets `a = {1, 2, 3}` and `b = {2, 3, 4}`, find and print the common elements.
```python
a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)
```
 **Output:**
```
{2, 3}
```

##  Summary
- Sets are the best way to handle distinct collections of items.
- Use curly braces `{}` to define a set, but note that `{}` alone creates an empty dictionary. Use `set()` for an empty set.
- Take advantage of union, intersection, and difference for complex data comparisons.


---

#  Lesson 12: Functions

##  Definition
A **function** is a reusable block of code that performs a specific task.

##  Explanation
Functions allow you to write code once and use it many times, making your programs organized, readable, and easier to debug.

###  Key Benefits:
- **Code Reusability**: Call the same logic with one line.
- **Modularity**: Break down complex problems into smaller parts.
- **Maintainability**: Update logic in one place to affect the whole program.

###  The Structure:
Use the `def` keyword to define yours:
```python
def greet():
    print("Hello, World!")

greet() # This is a function call
```

###  Functions with Parameters:
Send information into the function:
```python
def greet_user(name):
    print(f"Hello, {name}!")

greet_user("Raja") # Raja is passed as an argument
```

###  Returning Results:
Use `return` to send a value back to the caller:
```python
def square(n):
    return n * n

result = square(4)
print(result) # Output: 16
```

##  Examples with Answers

###  Easy
**Problem:** Create a function that prints "Welcome to Python" and call it.
```python
def welcome():
    print("Welcome to Python")

welcome()
```
 **Output:**
```
Welcome to Python
```

###  Medium
**Problem:** Create a function that takes a number as input and returns its square.
```python
def square_val(num):
    return num * num

print(square_val(5))
```
 **Output:**
```
25
```

###  Advanced
**Problem:** Create a function that takes a number and returns a message saying whether it is "Even" or "Odd".
```python
def check_even_odd(num):
    if num % 2 == 0:
        return "Even"
    else:
        return "Odd"

print(check_even_odd(7))
```
 **Output:**
```
Odd
```

##  Summary
- Functions are the building blocks of efficient programs.
- Parameters go inside the `(...)` when defining; arguments go there when calling.
- Always use the `return` statement if you want the function to produce a result that can be assigned to a variable.


---

#  Lesson 13: Arguments & Return Values

##  Definition
**Arguments** are the values passed to a function when it is called.  
The **Return value** is the result that a function sends back to the caller using the `return` statement.

##  Explanation
Functions are more flexible and useful when they can take input data and provide output results.

###  Types of Arguments:
1. **Positional Arguments**: Values are passed in the order defined in the function.
```python
def add(a, b):
    return a + b
print(add(2, 3)) # a=2, b=3
```

2. **Keyword Arguments**: Arguments are passed using their parameter names, regardless of order.
```python
def greet(name, age):
    print(name, age)
greet(age=20, name="Raja")
```

3. **Default Arguments**: A parameter can have a default value if no value is provided.
```python
def greet(name="Guest"):
    print("Hello", name)
greet() # Hello Guest
```

4. **Variable-Length Arguments (`*args`)**: Allows a function to take any number of arguments.
```python
def total(*nums):
    return sum(nums)
print(total(1, 2, 3)) # 6
```

###  Multiple Return Values:
A Python function can return more than one result as a tuple:
```python
def calc(a, b):
    return a + b, a * b

sum_val, mul_val = calc(2, 3)
print(sum_val, mul_val) # 5 6
```

##  Examples with Answers

###  Easy
**Problem:** Create a function that takes a name and prints a personalized greeting.
```python
def greet(name):
    print("Hello", name)

greet("Raja")
```
 **Output:**
```
Hello Raja
```

###  Medium
**Problem:** Create a function that takes two numbers and returns their sum.
```python
def add_nums(a, b):
    return a + b

result = add_nums(5, 7)
print(result)
```
 **Output:**
```
12
```

###  Advanced
**Problem:** Create a function with a default argument for age and return a formatted string saying "Name is Age years old".
```python
def display_info(name, age=18):
    return f"{name} is {age} years old"

print(display_info("Raja"))
print(display_info("Kumar", 25))
```
 **Output:**
```
Raja is 18 years old
Kumar is 25 years old
```

##  Summary
- Arguments provide the necessary input for a function to perform its task.
- `return` sends data back, allowing the function result to be stored in a variable.
- Python supports highly flexible argument types, including default values and variable-length inputs.


---

#  Lesson 14: Scope & Namespaces

##  Definition
**Scope** refers to the specific region of a program where a variable is accessible.  
**Namespace** is a container (like a dictionary) that stores variable names and connects them to their values.

##  Explanation
Python uses scope to prevent variable name conflicts. It follows the **LEGB rule** to look up variables.

###  The LEGB Rule:
1. **L**ocal: Inside a function.
2. **E**nclosing: Inside a nested function (closure).
3. **G**lobal: At the top level of a file.
4. **B**uilt-in: Reserved Python names (`print`, `len`, etc.).

###  1. Local Scope:
Variables created inside a function are only accessible there.
```python
def func():
    x = 10 # Local
    print(x)

func()
# print(x) #  Error: x is not defined outside
```

###  2. Global Scope:
Variables created outside all functions are global.
```python
x = 20 # Global

def func():
    print(x) # Accessible here

func()
```

###  Modifying a Global Variable:
Use the `global` keyword to change a global variable from within a function:
```python
x = 10

def update_x():
    global x
    x = 20

update_x()
print(x) # Output: 20
```

##  Examples with Answers

###  Easy
**Problem:** Define a global variable and access it inside a function.
```python
x = 100

def show_val():
    print(x)

show_val()
```
 **Output:**
```
100
```

###  Medium
**Problem:** Show the difference between a local and global variable with the same name.
```python
x = 10 # Global

def func():
    x = 5 # Local
    print("Local x:", x)

func()
print("Global x:", x)
```
 **Output:**
```
Local x: 5
Global x: 10
```

###  Advanced
**Problem:** Demonstrate accessing a variable from an enclosing scope (nested function).
```python
def outer():
    msg = "Hello from Outer"

    def inner():
        print(msg) # Enclosing scope access

    inner()

outer()
```
 **Output:**
```
Hello from Outer
```

##  Summary
- Scope defines where variables "live."
- Local variables are private to their functions.
- Global variables should be used sparingly; use the `global` keyword to modify them inside functions.


---

#  Lesson 15: Modules & Imports

##  Definition
A **module** is a file containing Python definitions (functions, classes, variables) that you can reuse in other programs.  
**Import** is the keyword used to bring a module's code into your current script.

##  Explanation
Modularity is key to building large applications. Instead of one giant file, you break your code into manageable modules.

###  Types of Modules:
- **Built-in Modules**: Pre-installed with Python (e.g., `math`, `random`, `os`).
- **User-defined Modules**: Files you create yourself (e.g., `utils.py`).

###  Importing Methods:
1. **Entire Module**: `import math`
2. **Specific Part**: `from math import sqrt`
3. **With Alias**: `import datetime as dt`

###  Using Built-in Modules:
```python
import random
print(random.randint(1, 10)) # Random integer between 1 and 10
```

###  Creating Your Own Module:
1. Create `mymodule.py`:
```python
def say_hi():
    print("Hello from the module!")
```
2. Use it in `main.py`:
```python
import mymodule
mymodule.say_hi()
```

##  Examples with Answers

###  Easy
**Problem:** Import the `math` module and calculate the square root of 9.
```python
import math
print(math.sqrt(9))
```
 **Output:**
```
3.0
```

###  Medium
**Problem:** Use `from ... import ...` to only import the `pow` function from the `math` module and use it.
```python
from math import pow
print(pow(2, 3)) # 2 raised to the power of 3
```
 **Output:**
```
8.0
```

###  Advanced
**Problem:** Create a user-defined module (conceptually) with an `add` function and import it into another script.
```python
# --- my_math.py ---
def add(a, b):
    return a + b

# --- main.py ---
import my_math
print(my_math.add(5, 3))
```
 **Output:**
```
8
```

##  Summary
- Modules help organize and reuse code across different projects.
- Python has a "Batteries Included" philosophy, providing hundreds of useful built-in modules.
- Custom modules are simply `.py` files located in the same directory as your main script.


---

#  Lesson 16: File I/O (Input / Output)

##  Definition
**File I/O** refers to the ability to read data from a file and write data to a file on your computer's storage.

##  Explanation
Storing data in memory (variables) is temporary. Files allow you to persist data so it remains after the program closes.

###  The `open()` function:
To work with a file, you must first open it:
`file = open("example.txt", "mode")`

###  Common Modes:
| Mode | Name | Description |
| :--- | :--- | :--- |
| `"r"` | Read | Opens a file for reading (default). Errors if file doesn't exist. |
| `"w"` | Write | Opens for writing. Overwrites existing content. Creates file if missing. |
| `"a"` | Append | Adds content to the end of an existing file. |

###  Reading and Writing:
```python
# Writing
f = open("hello.txt", "w")
f.write("Hello Python!")
f.close()

# Reading
f = open("hello.txt", "r")
print(f.read())
f.close()
```

###  Best Practice: Using `with`
The `with` statement automatically closes the file for you, which is safer and cleaner:
```python
with open("data.txt", "w") as f:
    f.write("Line 1\nLine 2")
```

##  Examples with Answers

###  Easy
**Problem:** Write a string to a new file named `test.txt`.
```python
with open("test.txt", "w") as f:
    f.write("This is a test.")
```
 **Result:** A file named `test.txt` is created with that content.

###  Medium
**Problem:** Read the content of the `test.txt` file and print it to the console.
```python
with open("test.txt", "r") as f:
    print(f.read())
```
 **Output:**
```
This is a test.
```

###  Advanced
**Problem:** Write a program that counts the number of lines in a given text file.
```python
with open("test.txt", "r") as f:
    lines = f.readlines() # list of lines
    print(f"Total lines: {len(lines)}")
```

##  Summary
- File I/O is critical for building applications that save progress or settings.
- Always remember to close a file or use the `with` block to ensure data is saved and resources are freed.
- Be careful with `"w"` mode, as it completely deletes existing file content before writing.


---

#  Lesson 17: Exception Handling

##  Definition
**Exception Handling** is a mechanism used to gracefully handle runtime errors, preventing your program from crashing when something unexpected happens.

##  Explanation
An "Exception" is an error that occurs during the execution of a program (e.g., dividing by zero, opening a missing file).

###  The `try...except` Block:
- **`try`**: Place the code that might cause an error here.
- **`except`**: Place the code that should run if an error occurs.

###  Basic Example:
```python
try:
    num = int("abc") # This will fail
except ValueError:
    print("Error: That is not a valid number!")
```

###  More Fine-Grained Control:
- **`else`**: Runs if **no** exceptions occur in the `try` block.
- **`finally`**: Runs no matter what (even if there was an error or a `return`).

```python
try:
    a = 10 / 2
except ZeroDivisionError:
    print("Cannot divide by zero.")
else:
    print("Result:", a)
finally:
    print("Execution complete.")
```

##  Examples with Answers

###  Easy
**Problem:** Handle a potential error when converting a string to an integer.
```python
try:
    num = int("abc")
except:
    print("Invalid input detected")
```
 **Output:**
```
Invalid input detected
```

###  Medium
**Problem:** Handle a `ZeroDivisionError` specifically when dividing two numbers.
```python
try:
    a = 10
    b = 0
    print(a / b)
except ZeroDivisionError:
    print("Cannot divide by zero")
```
 **Output:**
```
Cannot divide by zero
```

###  Advanced
**Problem:** Create a block that uses `try`, `except`, `else`, and `finally` to handle a conversion.
```python
try:
    num = int("5")
except ValueError:
    print("Error in conversion")
else:
    print("Converted successfully")
finally:
    print("Cleanup step: Done")
```
 **Output:**
```
Converted successfully
Cleanup step: Done
```

##  Summary
- Exception handling makes your code more robust and user-friendly.
- Always try to catch specific exceptions (like `ValueError`) rather than using a generic `except` block.
- Use `finally` for tasks like closing files or database connections that must happen regardless of success or failure.


---

#  Lesson 18: List Comprehensions

##  Definition
A **list comprehension** is a concise, one-line syntax for creating new lists based on existing lists or iterables.

##  Explanation
It is a "Pythonic" alternative to using a multi-line `for` loop and the `.append()` method.

###  Basic Syntax:
`[expression for item in iterable if condition]`

###  Comparison:
**Standard Loop:**
```python
nums = []
for i in range(5):
    nums.append(i * 2)
# Result: [0, 2, 4, 6, 8]
```

**List Comprehension:**
```python
nums = [i * 2 for i in range(5)]
# Result: [0, 2, 4, 6, 8]
```

###  Adding a Condition:
You can filter items by adding an `if` statement at the end:
```python
# Only get even numbers
evens = [i for i in range(10) if i % 2 == 0]
# Result: [0, 2, 4, 6, 8]
```

##  Examples with Answers

###  Easy
**Problem:** Create a list containing numbers from 1 to 5 using a list comprehension.
```python
nums = [i for i in range(1, 6)]
print(nums)
```
 **Output:**
```
[1, 2, 3, 4, 5]
```

###  Medium
**Problem:** Given a list `[1, 2, 3, 4, 5, 6]`, use a list comprehension to create a new list containing only the even numbers.
```python
nums = [1, 2, 3, 4, 5, 6]
even = [i for i in nums if i % 2 == 0]
print(even)
```
 **Output:**
```
[2, 4, 6]
```

###  Advanced
**Problem:** Create a new list containing the squares (`i*i`) of all ODD numbers in the list `[1, 2, 3, 4, 5]`.
```python
nums = [1, 2, 3, 4, 5]
result = [i*i for i in nums if i % 2 != 0]
print(result)
```
 **Output:**
```
[1, 9, 25]
```

##  Summary
- List comprehensions make code shorter, cleaner, and often more efficient.
- Use them for simple mapping and filtering tasks.
- Avoid overusing them for very complex logic, as it can reduce code readability.


---

#  Lesson 19: Lambda Functions

##  Definition
A **lambda function** is a small, anonymous (nameless) function defined in a single line using the `lambda` keyword.

##  Explanation
Lambdas are used for short, throwaway logic where defining a full function with `def` would be overkill.

###  Basic Syntax:
`lambda arguments: expression`

###  Simple Example:
```python
# A lambda that adds 5 to its input
add_five = lambda x: x + 5
print(add_five(10)) # Output: 15
```

###  Using Lambda with `map()` and `filter()`:
Lambdas are most powerful when used as arguments to other functions:

- **`map()`**: Apply a function to every item in a list.
```python
nums = [1, 2, 3]
doubled = list(map(lambda x: x * 2, nums)) # [2, 4, 6]
```

- **`filter()`**: Select items from a list that meet a condition.
```python
nums = [1, 2, 3, 4]
evens = list(filter(lambda x: x % 2 == 0, nums)) # [2, 4]
```

##  Examples with Answers

###  Easy
**Problem:** Create a lambda function that adds 10 to a number.
```python
add_ten = lambda x: x + 10
print(add_ten(5))
```
 **Output:**
```
15
```

###  Medium
**Problem:** Create a lambda function that multiplies two numbers together.
```python
multiply = lambda a, b: a * b
print(multiply(4, 3))
```
 **Output:**
```
12
```

###  Advanced
**Problem:** Use the `filter()` function and a lambda to extract only the ODD numbers from the list `[1, 2, 3, 4, 5]`.
```python
nums = [1, 2, 3, 4, 5]
odd_nums = list(filter(lambda x: x % 2 != 0, nums))
print(odd_nums)
```
 **Output:**
```
[1, 3, 5]
```

##  Summary
- Lambda functions have no name and are restricted to a single expression.
- They are perfect for small functional programming tasks.
- While useful, `def` is still better for any logic that is reuseable or takes more than one line.


---

#  Lesson 20: Classes & Objects (OOP – Introduction)

##  Definition
- A **class** is a blueprint (plan) for creating objects.
- An **object** is a specific instance of a class.

##  Explanation
**Object-Oriented Programming (OOP)** is a paradigm that organizes software design around data (objects) rather than functions and logic.

###  Real-World Analogy:
- **Class**: A Blueprint for a house.
- **Object**: The actual house built from that blueprint. Every house has the same structure but can have different colors or owners.

###  Basic Syntax:
```python
class Student:
    def __init__(self, name, age):
        self.name = name # Attribute
        self.age = age   # Attribute

    def greet(self): # Method
        print(f"Hello, my name is {self.name}!")

# Creating an Object
s1 = Student("Raja", 20)
s1.greet()
```

###  Key Terminology:
- **`__init__`**: The "Constructor" function. It runs automatically when a new object is created.
- **`self`**: A keyword that refers to the specific object being worked on. It must be the first parameter in every class method.
- **Attribute**: A variable that belongs to an object (e.g., `name`).
- **Method**: A function that belongs to a class (e.g., `greet`).

##  Examples with Answers

###  Easy
**Problem:** Create a class named `Car` with an attribute `brand`, create an object of it, and print the brand.
```python
class Car:
    brand = "Toyota"

c = Car()
print(c.brand)
```
 **Output:**
```
Toyota
```

###  Medium
**Problem:** Create a class `Person` with a constructor (`__init__`) that assigns a `name`. Create an object and print the name.
```python
class Person:
    def __init__(self, name):
        self.name = name

p = Person("Raja")
print(p.name)
```
 **Output:**
```
Raja
```

###  Advanced
**Problem:** Create a `Calculator` class with a method `add` that takes two numbers and returns their sum.
```python
class Calculator:
    def add(self, a, b):
        return a + b

my_calc = Calculator()
print(my_calc.add(5, 3))
```
 **Output:**
```
8
```

##  Summary
- Classes allow you to group data and behavior together into logical units.
- Objects represent real-world entities within your code.
- OOP is the foundation of most modern software development, including Python itself.


---

#  Lesson 21: Inheritance

##  Definition
**Inheritance** is a core Object-Oriented Programming (OOP) feature that allows one class (the **child**) to acquire the attributes and methods of another class (the **parent**).

##  Explanation
Inheritance allows you to create specialized versions of existing classes, promoting code reusability and reducing duplication.

###  Terminology:
- **Parent Class (Base Class)**: The original class being inherited from.
- **Child Class (Derived Class)**: The new class that inherits features and can add its own.

###  Basic Syntax:
```python
class Parent:
    def greet(self):
        print("Hello from the Parent!")

class Child(Parent): # Inherit from Parent
    pass

c = Child()
c.greet() # Output: Hello from the Parent!
```

###  Method Overriding:
A child class can "redefine" a method from the parent to change its behavior.
```python
class Animal:
    def speak(self):
        print("Animal makes a sound.")

class Dog(Animal):
    def speak(self): # Overriding
        print("Dog barks!")

d = Dog()
d.speak() # Output: Dog barks!
```

##  Examples with Answers

###  Easy
**Problem:** Create a parent class `Animal` with a method `sound` and a child class `Cat` that inherits from it.
```python
class Animal:
    def sound(self):
        print("Some generic sound")

class Cat(Animal):
    pass

my_cat = Cat()
my_cat.sound()
```
 **Output:**
```
Some generic sound
```

###  Medium
**Problem:** Override a `show` method from a `Parent` class in a `Child` class to print "Child class here".
```python
class Parent:
    def show(self):
        print("Parent class")

class Child(Parent):
    def show(self):
        print("Child class here")

obj = Child()
obj.show()
```
 **Output:**
```
Child class here
```

###  Advanced
**Problem:** Demonstrate multilevel inheritance where `Class C` inherits from `Class B`, and `Class B` inherits from `Class A`.
```python
class A:
    def say_a(self):
        print("A")

class B(A): # B inherits from A
    pass

class C(B): # C inherits from B
    pass

obj = C()
obj.say_a() # Can access A because of inheritance chain
```
 **Output:**
```
A
```

##  Summary
- Inheritance allows for a hierarchy of classes, sharing common functionality.
- Method overriding is used to customize or replace parent behavior in a child class.
- Use `super()` if you want to call the parent version of a method from within the child class.


---

#  Lesson 22: Python Standard Library

##  Definition
The **Python Standard Library** is a massive collection of high-quality, pre-installed modules and functions that allow you to do everything from math and networking to date processing.

##  Explanation
Known for the "Batteries Included" philosophy, Python provides these modules so you don't have to reinvent the wheel.

###  Essential Modules:
| Module | Use Case | Example |
| :--- | :--- | :--- |
| `math` | Advanced math | `math.sqrt(16)` |
| `random` | Random values | `random.randint(1, 10)` |
| `datetime` | Working with time | `datetime.now()` |
| `os` | Interact with OS | `os.getcwd()` (get path) |
| `sys` | System parameters | `sys.version` |

###  Examples of Use:
```python
import math
print(math.pi) # 3.14159...

import random
print(random.choice(["Heads", "Tails"]))

import datetime
print(datetime.date.today())
```

##  Examples with Answers

###  Easy
**Problem:** Use the `math` module to find the square root of 25.
```python
import math
print(math.sqrt(25))
```
 **Output:**
```
5.0
```

###  Medium
**Problem:** Generate a random number between 1 and 5 using the `random` module.
```python
import random
print(random.randint(1, 5))
```
 **Possible Output:**
```
3
```

###  Advanced
**Problem:** Get and print the current date and time using the `datetime` module.
```python
import datetime
print(datetime.datetime.now())
```
 **Output:**
```
2026-03-23 11:05:22.451...
```

##  Summary
- The Standard Library is one of Python's greatest strengths.
- Always check if a library is built-in before looking for third-party packages.
- Learning these modules will make you a much more efficient developer.


---

#  Lesson 23: Virtual Environments & pip

##  Definition
- **Virtual Environment**: An isolated workspace designed for a specific project so its dependencies don't interfere with other projects.
- **pip**: The standard package manager for Python, used to install libraries from the Python Package Index (PyPI).

##  Explanation
Professional Python developers never install packages globally. They use virtual environments to keep their development environment clean.

###  Why Virtual Environments?
If Project A needs `Django 3.0` and Project B needs `Django 4.0`, you can't have both globally. Virtual environments solve this.

###  Setting Up an Environment:
1. **Create**: `python -m venv myenv`
2. **Activate (Windows)**: `myenv\Scripts\activate`
3. **Activate (Mac/Linux)**: `source myenv/bin/activate`
4. **Deactivate**: `deactivate`

###  Using pip:
```bash
# Install a package
pip install requests

# See what's installed
pip list

# Save current project requirements
pip freeze > requirements.txt

# Install from a list
pip install -r requirements.txt
```

##  Examples with Answers

###  Easy
**Problem:** Command to install a package like `numpy` using pip.
```bash
pip install numpy
```

###  Medium
**Problem:** Create a new virtual environment named `env`.
```bash
python -m venv env
```

###  Advanced
**Problem:** Install multiple packages from a `requirements.txt` file.
```bash
pip install -r requirements.txt
```

##  Summary
- Virtual environments are essential for avoiding dependency conflicts.
- `pip` is your primary tool for expanding Python's capabilities with millions of open-source libraries.
- Always include a `requirements.txt` file in your project repositories.


---

#  Lesson 24: Project – Build a Calculator (Python)

##  Definition
A **calculator** is a practical program that takes user input, performs arithmetic operations, and displays the result. It is the perfect capstone to consolidate everything you've learned.

##  Project Objective
We will apply all the fundamental concepts we've covered:
- **Variables**: Storing numbers and choices.
- **Functions**: Wrapping operations like `add` and `multiply`.
- **Logic**: Using `if/elif` to decide which function to run.
- **Input/Output**: Interacting with the user.

##  Step-by-Step Implementation

###  Step 1: Define Arithmetic Functions
```python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Cannot divide by zero!"
    return a / b
```

###  Step 2: Main Program Logic
```python
# 1. Take numbers from user
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

# 2. Display operation menu
print("\n--- Menu ---")
print("1. Add")
print("2. Subtract")
print("3. Multiply")
print("4. Divide")

# 3. Get choice
choice = input("\nEnter choice (1/2/3/4): ")

# 4. Perform calculation and show result
if choice == "1":
    print(f"Result: {add(num1, num2)}")
elif choice == "2":
    print(f"Result: {subtract(num1, num2)}")
elif choice == "3":
    print(f"Result: {multiply(num1, num2)}")
elif choice == "4":
    print(f"Result: {divide(num1, num2)}")
else:
    print("Invalid choice!")
```

##  Practice Tests

###  Easy
**Input**: First number `5`, Second number `3`, Choice `1`.
 **Expected Output**: `Result: 8.0`

###  Medium
**Input**: First number `10`, Second number `2`, Choice `4`.
 **Expected Output**: `Result: 5.0`

###  Advanced
**Input**: First number `5`, Second number `0`, Choice `4`.
 **Expected Output**: `Error: Cannot divide by zero!`

##  Future Improvements:
- **Loop**: Wrap the logic in a `while True` loop so the user can calculate multiple times without restarting the program.
- **UI**: Add a prettier menu or even a GUI using a library like `Tkinter`.
- **Adv. Math**: Add features for square roots or exponents.

##  Final Summary
- Building a calculator is a rite of passage for every programmer.
- It proves you can handle data, logic, and structure together.
- This codebase can serve as a template for more complex tool-building.


---




