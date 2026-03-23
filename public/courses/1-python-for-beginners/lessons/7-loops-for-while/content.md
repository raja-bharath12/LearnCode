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


