# 📘 Lesson 5: Input & Output

## 📖 Definition
**Input**: Taking data from the user during program execution.  
**Output**: Displaying data, results, or messages to the user.

## 🧠 Explanation
Python provides two main built-in functions for basic communication:

### ⌨️ Taking Input:
The `input()` function pauses the program and waits for the user to type something.
```python
name = input("Enter your name: ")
print(name)
```

### ⚠️ Important Point:
By default, `input()` always returns a string (`str`).
```python
age = input("Enter age: ")
print(type(age)) # Output: <class 'str'>
```

### 🔄 Type Conversion:
To perform calculations, you must convert the input to a number (`int` or `float`):
```python
age = int(input("Enter age: "))
print(f"Next year you will be {age + 1}")
```

### 🖨️ Displaying Output:
The `print()` function displays text or variables to the console.
- **Multiple Values**: `print("Name:", name, "Age:", age)`
- **End Character**: `print("Hello", end=" ")` (prevents a new line)

### 🎯 Formatted Output (f-strings):
The most modern and readable way to format output:
```python
name = "Raja"
age = 20
print(f"My name is {name} and I am {age} years old.")
```

## 📝 Examples with Answers

### 🟢 Easy
**Problem:** Take the user's name as input and greet them.
```python
name = input("Enter name: ")
print("Hello", name)
```
✅ **Example Output:**
```
Enter name: Raja
Hello Raja
```

### 🟡 Medium
**Problem:** Take two numbers from the user and print their sum.
```python
a = int(input("Enter first number: "))
b = int(input("Enter second number: "))
print("Sum:", a + b)
```
✅ **Example Output:**
```
Enter first number: 5
Enter second number: 7
Sum: 12
```

### 🔴 Advanced
**Problem:** Take a number from the user and calculate its square.
```python
num = int(input("Enter a number: "))
print(f"The square of {num} is: {num ** 2}")
```
✅ **Example Output:**
```
Enter a number: 4
The square of 4 is: 16
```

## 📌 Summary
- Use `input()` for receiving data and `print()` for displaying it.
- Remember to cast (`int()`, `float()`) input values used in mathematics.
- Use f-strings (`f"..."`) for clean and efficient output formatting.
