# 📘 Lesson 15: Modules & Imports

## 📖 Definition
A **module** is a file containing Python definitions (functions, classes, variables) that you can reuse in other programs.  
**Import** is the keyword used to bring a module's code into your current script.

## 🧠 Explanation
Modularity is key to building large applications. Instead of one giant file, you break your code into manageable modules.

### 📦 Types of Modules:
- **Built-in Modules**: Pre-installed with Python (e.g., `math`, `random`, `os`).
- **User-defined Modules**: Files you create yourself (e.g., `utils.py`).

### 🔧 Importing Methods:
1. **Entire Module**: `import math`
2. **Specific Part**: `from math import sqrt`
3. **With Alias**: `import datetime as dt`

### 🔍 Using Built-in Modules:
```python
import random
print(random.randint(1, 10)) # Random integer between 1 and 10
```

### 📁 Creating Your Own Module:
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

## 📝 Examples with Answers

### 🟢 Easy
**Problem:** Import the `math` module and calculate the square root of 9.
```python
import math
print(math.sqrt(9))
```
✅ **Output:**
```
3.0
```

### 🟡 Medium
**Problem:** Use `from ... import ...` to only import the `pow` function from the `math` module and use it.
```python
from math import pow
print(pow(2, 3)) # 2 raised to the power of 3
```
✅ **Output:**
```
8.0
```

### 🔴 Advanced
**Problem:** Create a user-defined module (conceptually) with an `add` function and import it into another script.
```python
# --- my_math.py ---
def add(a, b):
    return a + b

# --- main.py ---
import my_math
print(my_math.add(5, 3))
```
✅ **Output:**
```
8
```

## 📌 Summary
- Modules help organize and reuse code across different projects.
- Python has a "Batteries Included" philosophy, providing hundreds of useful built-in modules.
- Custom modules are simply `.py` files located in the same directory as your main script.
