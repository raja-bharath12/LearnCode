#  Lesson 20: Classes & Objects (OOP – Introduction)

##  Definition
- A **class** is a blueprint (plan) for creating objects.
- An **object** is a specific instance of a class.

##  Explanation
**Object-Oriented Programming (OOP)** is a paradigm that organizes software design around data (objects) rather than functions and logic.

###  Real-World Analogy:
- **Class**: A Blueprint for a house.
- **Object**: The actual house built from that blueprint. Every house has the same structure but can have different colors or owners.

###  Basic Syntax:
```python
class Student:
    def __init__(self, name, age):
        self.name = name # Attribute
        self.age = age   # Attribute

    def greet(self): # Method
        print(f"Hello, my name is {self.name}!")

# Creating an Object
s1 = Student("Raja", 20)
s1.greet()
```

###  Key Terminology:
- **`__init__`**: The "Constructor" function. It runs automatically when a new object is created.
- **`self`**: A keyword that refers to the specific object being worked on. It must be the first parameter in every class method.
- **Attribute**: A variable that belongs to an object (e.g., `name`).
- **Method**: A function that belongs to a class (e.g., `greet`).

##  Examples with Answers

###  Easy
**Problem:** Create a class named `Car` with an attribute `brand`, create an object of it, and print the brand.
```python
class Car:
    brand = "Toyota"

c = Car()
print(c.brand)
```
 **Output:**
```
Toyota
```

###  Medium
**Problem:** Create a class `Person` with a constructor (`__init__`) that assigns a `name`. Create an object and print the name.
```python
class Person:
    def __init__(self, name):
        self.name = name

p = Person("Raja")
print(p.name)
```
 **Output:**
```
Raja
```

###  Advanced
**Problem:** Create a `Calculator` class with a method `add` that takes two numbers and returns their sum.
```python
class Calculator:
    def add(self, a, b):
        return a + b

my_calc = Calculator()
print(my_calc.add(5, 3))
```
 **Output:**
```
8
```

##  Summary
- Classes allow you to group data and behavior together into logical units.
- Objects represent real-world entities within your code.
- OOP is the foundation of most modern software development, including Python itself.


