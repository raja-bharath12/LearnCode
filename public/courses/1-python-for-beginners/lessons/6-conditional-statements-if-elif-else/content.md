# 📘 Lesson 6: Conditional Statements (if / elif / else)

## 📖 Definition
**Conditional statements** allow a program to make decisions and execute different blocks of code based on whether a condition is true or false.

## 🧠 Explanation
Python uses specific keywords to control logic flow:

### ⚙️ The Structure:
- **`if`**: The starting point; checks the first condition.
- **`elif`** (Else If): Checks another condition if the previous ones were `False`.
- **`else`**: The "fallback"; executes if all previous conditions were `False`.

### 🔍 Simple Example:
```python
age = 18

if age >= 18:
    print("You are an adult.")
else:
    print("You are a minor.")
```

### 🔗 Multiple Conditions:
```python
marks = 85

if marks >= 90:
    print("Grade A")
elif marks >= 50:
    print("Grade B")
else:
    print("Fail")
```

### ⚖️ Logical and Comparison Operators:
| Operator | Meaning | Example |
| :--- | :--- | :--- |
| `==` | Equal to | `x == 5` |
| `!=` | Not equal to | `x != 5` |
| `and` | Both true | `x > 0 and x < 10` |
| `or` | At least one true | `x < 0 or x > 10` |

## 📝 Examples with Answers

### 🟢 Easy
**Problem:** Write a program to check if a number is positive.
```python
num = 5
if num > 0:
    print("Positive")
```
✅ **Output:**
```
Positive
```

### 🟡 Medium
**Problem:** Check if a number entered by the user is even or odd.
```python
num = 10
if num % 2 == 0:
    print("Even")
else:
    print("Odd")
```
✅ **Output:**
```
Even
```

### 🔴 Advanced
**Problem:** Write a program to check if a year is a Leap Year.
```python
year = 2024

if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print("Leap Year")
else:
    print("Not a Leap Year")
```
✅ **Output:**
```
Leap Year
```

## 📌 Summary
- Indentation is mandatory in Python to define code blocks.
- `if`, `elif`, and `else` provide robust decision-making capabilities.
- Combine conditions with logical operators (`and`, `or`, `not`) for complex logic.
