# 📘 Lesson 21: Inheritance

## 📖 Definition
**Inheritance** is a core Object-Oriented Programming (OOP) feature that allows one class (the **child**) to acquire the attributes and methods of another class (the **parent**).

## 🧠 Explanation
Inheritance allows you to create specialized versions of existing classes, promoting code reusability and reducing duplication.

### 🔑 Terminology:
- **Parent Class (Base Class)**: The original class being inherited from.
- **Child Class (Derived Class)**: The new class that inherits features and can add its own.

### ⚙️ Basic Syntax:
```python
class Parent:
    def greet(self):
        print("Hello from the Parent!")

class Child(Parent): # Inherit from Parent
    pass

c = Child()
c.greet() # Output: Hello from the Parent!
```

### 🔧 Method Overriding:
A child class can "redefine" a method from the parent to change its behavior.
```python
class Animal:
    def speak(self):
        print("Animal makes a sound.")

class Dog(Animal):
    def speak(self): # Overriding
        print("Dog barks!")

d = Dog()
d.speak() # Output: Dog barks!
```

## 📝 Examples with Answers

### 🟢 Easy
**Problem:** Create a parent class `Animal` with a method `sound` and a child class `Cat` that inherits from it.
```python
class Animal:
    def sound(self):
        print("Some generic sound")

class Cat(Animal):
    pass

my_cat = Cat()
my_cat.sound()
```
✅ **Output:**
```
Some generic sound
```

### 🟡 Medium
**Problem:** Override a `show` method from a `Parent` class in a `Child` class to print "Child class here".
```python
class Parent:
    def show(self):
        print("Parent class")

class Child(Parent):
    def show(self):
        print("Child class here")

obj = Child()
obj.show()
```
✅ **Output:**
```
Child class here
```

### 🔴 Advanced
**Problem:** Demonstrate multilevel inheritance where `Class C` inherits from `Class B`, and `Class B` inherits from `Class A`.
```python
class A:
    def say_a(self):
        print("A")

class B(A): # B inherits from A
    pass

class C(B): # C inherits from B
    pass

obj = C()
obj.say_a() # Can access A because of inheritance chain
```
✅ **Output:**
```
A
```

## 📌 Summary
- Inheritance allows for a hierarchy of classes, sharing common functionality.
- Method overriding is used to customize or replace parent behavior in a child class.
- Use `super()` if you want to call the parent version of a method from within the child class.
