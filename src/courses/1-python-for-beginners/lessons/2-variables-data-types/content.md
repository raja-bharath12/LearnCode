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

### 🔍 Checking Data Type:
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


