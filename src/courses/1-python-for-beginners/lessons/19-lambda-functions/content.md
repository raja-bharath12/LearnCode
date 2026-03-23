# 📘 Lesson 19: Lambda Functions

## 📖 Definition
A **lambda function** is a small, anonymous (nameless) function defined in a single line using the `lambda` keyword.

## 🧠 Explanation
Lambdas are used for short, throwaway logic where defining a full function with `def` would be overkill.

### ⚙️ Basic Syntax:
`lambda arguments: expression`

### 🔍 Simple Example:
```python
# A lambda that adds 5 to its input
add_five = lambda x: x + 5
print(add_five(10)) # Output: 15
```

### 🔗 Using Lambda with `map()` and `filter()`:
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

## 📝 Examples with Answers

### 🟢 Easy
**Problem:** Create a lambda function that adds 10 to a number.
```python
add_ten = lambda x: x + 10
print(add_ten(5))
```
✅ **Output:**
```
15
```

### 🟡 Medium
**Problem:** Create a lambda function that multiplies two numbers together.
```python
multiply = lambda a, b: a * b
print(multiply(4, 3))
```
✅ **Output:**
```
12
```

### 🔴 Advanced
**Problem:** Use the `filter()` function and a lambda to extract only the ODD numbers from the list `[1, 2, 3, 4, 5]`.
```python
nums = [1, 2, 3, 4, 5]
odd_nums = list(filter(lambda x: x % 2 != 0, nums))
print(odd_nums)
```
✅ **Output:**
```
[1, 3, 5]
```

## 📌 Summary
- Lambda functions have no name and are restricted to a single expression.
- They are perfect for small functional programming tasks.
- While useful, `def` is still better for any logic that is reuseable or takes more than one line.
