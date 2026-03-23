# 📘 Lesson 24: Project – Build a Calculator (Python)

## 📖 Definition
A **calculator** is a practical program that takes user input, performs arithmetic operations, and displays the result. It is the perfect capstone to consolidate everything you've learned.

## 🧠 Project Objective
We will apply all the fundamental concepts we've covered:
- **Variables**: Storing numbers and choices.
- **Functions**: Wrapping operations like `add` and `multiply`.
- **Logic**: Using `if/elif` to decide which function to run.
- **Input/Output**: Interacting with the user.

## 🧩 Step-by-Step Implementation

### 🔹 Step 1: Define Arithmetic Functions
```python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Cannot divide by zero!"
    return a / b
```

### 🔹 Step 2: Main Program Logic
```python
# 1. Take numbers from user
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

# 2. Display operation menu
print("\n--- Menu ---")
print("1. Add")
print("2. Subtract")
print("3. Multiply")
print("4. Divide")

# 3. Get choice
choice = input("\nEnter choice (1/2/3/4): ")

# 4. Perform calculation and show result
if choice == "1":
    print(f"Result: {add(num1, num2)}")
elif choice == "2":
    print(f"Result: {subtract(num1, num2)}")
elif choice == "3":
    print(f"Result: {multiply(num1, num2)}")
elif choice == "4":
    print(f"Result: {divide(num1, num2)}")
else:
    print("Invalid choice!")
```

## 📝 Practice Tests

### 🟢 Easy
**Input**: First number `5`, Second number `3`, Choice `1`.
✅ **Expected Output**: `Result: 8.0`

### 🟡 Medium
**Input**: First number `10`, Second number `2`, Choice `4`.
✅ **Expected Output**: `Result: 5.0`

### 🔴 Advanced
**Input**: First number `5`, Second number `0`, Choice `4`.
✅ **Expected Output**: `Error: Cannot divide by zero!`

## 🚀 Future Improvements:
- **Loop**: Wrap the logic in a `while True` loop so the user can calculate multiple times without restarting the program.
- **UI**: Add a prettier menu or even a GUI using a library like `Tkinter`.
- **Adv. Math**: Add features for square roots or exponents.

## 🏆 Final Summary
- Building a calculator is a rite of passage for every programmer.
- It proves you can handle data, logic, and structure together.
- This codebase can serve as a template for more complex tool-building.
