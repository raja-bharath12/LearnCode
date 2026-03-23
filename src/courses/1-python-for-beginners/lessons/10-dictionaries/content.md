##  Definition
A **dictionary** is a mutable collection of items stored as **key-value pairs**.

##  Explanation
Unlike lists or tuples, dictionaries do not use indexes (like 0, 1, 2). Instead, they use unique keys to access specific values.

###  Key Characteristics:
- **Unordered/Mapped**: Values are accessed via keys, not numerical positions.
- **Mutable**: You can add, remove, or update items.
- **Unique Keys**: Each key must be unique and immutable (like a string or number).

###  Basic Operations:
```python
student = {
    "name": "Raja",
    "age": 20,
    "course": "Python"
}

# Accessing
print(student["name"]) # Raja

# Adding/Updating
student["age"] = 21
student["city"] = "Chennai"

# Removing
student.pop("course")
```

###  Looping Through a Dictionary:
```python
for key, value in student.items():
    print(f"{key}: {value}")
```

###  Useful Methods:
- `.keys()`: Returns all keys.
- `.values()`: Returns all values.
- `.items()`: Returns key-value pairs as tuples.

##  Examples with Answers

###  Easy
**Problem:** Create a dictionary with `name` and `age` and print it.
```python
student = {"name": "Raja", "age": 20}
print(student)
```
 **Output:**
```python
{'name': 'Raja', 'age': 20}
```

###  Medium
**Problem:** Access the value of the `age` key in a student dictionary.
```python
student = {"name": "Raja", "age": 20}
print(student["age"])
```
 **Output:**
```
20
```

###  Advanced
**Problem:** Add a new key called `course` to a student dictionary and print all keys and values using a loop.
```python
student = {"name": "Raja", "age": 20}
student["course"] = "Python"

for key, value in student.items():
    print(f"{key} : {value}")
```
 **Output:**
```
name : Raja
age : 20
course : Python
```

##  Summary
- Dictionaries are ideal for storing structured data (like a database record).
- Keys are used for ultra-fast data lookup.
- Use `{}` or `dict()` to create a new dictionary.


