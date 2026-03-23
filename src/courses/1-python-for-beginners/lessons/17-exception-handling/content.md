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


