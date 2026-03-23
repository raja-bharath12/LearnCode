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


