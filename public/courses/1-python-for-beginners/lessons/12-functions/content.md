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


