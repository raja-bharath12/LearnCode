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


