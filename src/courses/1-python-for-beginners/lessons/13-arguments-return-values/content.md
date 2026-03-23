##  Definition
**Arguments** are the values passed to a function when it is called.  
The **Return value** is the result that a function sends back to the caller using the `return` statement.

##  Explanation
Functions are more flexible and useful when they can take input data and provide output results.

###  Types of Arguments:
1. **Positional Arguments**: Values are passed in the order defined in the function.
```python
def add(a, b):
    return a + b
print(add(2, 3)) # a=2, b=3
```

2. **Keyword Arguments**: Arguments are passed using their parameter names, regardless of order.
```python
def greet(name, age):
    print(name, age)
greet(age=20, name="Raja")
```

3. **Default Arguments**: A parameter can have a default value if no value is provided.
```python
def greet(name="Guest"):
    print("Hello", name)
greet() # Hello Guest
```

4. **Variable-Length Arguments (`*args`)**: Allows a function to take any number of arguments.
```python
def total(*nums):
    return sum(nums)
print(total(1, 2, 3)) # 6
```

###  Multiple Return Values:
A Python function can return more than one result as a tuple:
```python
def calc(a, b):
    return a + b, a * b

sum_val, mul_val = calc(2, 3)
print(sum_val, mul_val) # 5 6
```

##  Examples with Answers

###  Easy
**Problem:** Create a function that takes a name and prints a personalized greeting.
```python
def greet(name):
    print("Hello", name)

greet("Raja")
```
 **Output:**
```
Hello Raja
```

###  Medium
**Problem:** Create a function that takes two numbers and returns their sum.
```python
def add_nums(a, b):
    return a + b

result = add_nums(5, 7)
print(result)
```
 **Output:**
```
12
```

###  Advanced
**Problem:** Create a function with a default argument for age and return a formatted string saying "Name is Age years old".
```python
def display_info(name, age=18):
    return f"{name} is {age} years old"

print(display_info("Raja"))
print(display_info("Kumar", 25))
```
 **Output:**
```
Raja is 18 years old
Kumar is 25 years old
```

##  Summary
- Arguments provide the necessary input for a function to perform its task.
- `return` sends data back, allowing the function result to be stored in a variable.
- Python supports highly flexible argument types, including default values and variable-length inputs.


