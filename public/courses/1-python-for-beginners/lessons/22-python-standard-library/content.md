#  Lesson 22: Python Standard Library

##  Definition
The **Python Standard Library** is a massive collection of high-quality, pre-installed modules and functions that allow you to do everything from math and networking to date processing.

##  Explanation
Known for the "Batteries Included" philosophy, Python provides these modules so you don't have to reinvent the wheel.

### 📦 Essential Modules:
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


