#  Lesson 14: Scope & Namespaces

##  Definition
**Scope** refers to the specific region of a program where a variable is accessible.  
**Namespace** is a container (like a dictionary) that stores variable names and connects them to their values.

##  Explanation
Python uses scope to prevent variable name conflicts. It follows the **LEGB rule** to look up variables.

###  The LEGB Rule:
1. **L**ocal: Inside a function.
2. **E**nclosing: Inside a nested function (closure).
3. **G**lobal: At the top level of a file.
4. **B**uilt-in: Reserved Python names (`print`, `len`, etc.).

###  1. Local Scope:
Variables created inside a function are only accessible there.
```python
def func():
    x = 10 # Local
    print(x)

func()
# print(x) #  Error: x is not defined outside
```

###  2. Global Scope:
Variables created outside all functions are global.
```python
x = 20 # Global

def func():
    print(x) # Accessible here

func()
```

###  Modifying a Global Variable:
Use the `global` keyword to change a global variable from within a function:
```python
x = 10

def update_x():
    global x
    x = 20

update_x()
print(x) # Output: 20
```

##  Examples with Answers

###  Easy
**Problem:** Define a global variable and access it inside a function.
```python
x = 100

def show_val():
    print(x)

show_val()
```
 **Output:**
```
100
```

###  Medium
**Problem:** Show the difference between a local and global variable with the same name.
```python
x = 10 # Global

def func():
    x = 5 # Local
    print("Local x:", x)

func()
print("Global x:", x)
```
 **Output:**
```
Local x: 5
Global x: 10
```

###  Advanced
**Problem:** Demonstrate accessing a variable from an enclosing scope (nested function).
```python
def outer():
    msg = "Hello from Outer"

    def inner():
        print(msg) # Enclosing scope access

    inner()

outer()
```
 **Output:**
```
Hello from Outer
```

##  Summary
- Scope defines where variables "live."
- Local variables are private to their functions.
- Global variables should be used sparingly; use the `global` keyword to modify them inside functions.


