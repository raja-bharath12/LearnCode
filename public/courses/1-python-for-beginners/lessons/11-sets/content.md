# 📘 Lesson 11: Sets

## 📖 Definition
A **set** is an unordered collection of **unique** elements.

## 🧠 Explanation
Sets are similar to lists, but they automatically remove duplicate items and do not maintain any specific order.

### 🔑 Key Characteristics:
- **Unique Elements**: Never contains the same item twice.
- **Unordered**: No fixed positions; indexing (`s[0]`) is not supported.
- **Mutable**: You can add or remove items easily.

### ➕ Basic Operations:
```python
s = {1, 2, 3, 3, 3}
print(s) # Output: {1, 2, 3} (duplicates removed)

s.add(4)     # Add item
s.remove(2)  # Remove item
```

### 🔗 Set Mathematics:
Sets are powerful for mathematical operations:
```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b) # Union: {1, 2, 3, 4, 5}
print(a & b) # Intersection: {3}
print(a - b) # Difference: {1, 2}
```

## 📝 Examples with Answers

### 🟢 Easy
**Problem:** Create a set with values 1, 2, and 3 and print it.
```python
s = {1, 2, 3}
print(s)
```
✅ **Output:**
```
{1, 2, 3}
```

### 🟡 Medium
**Problem:** Take a list that has duplicate numbers and use a set to print only the unique numbers.
```python
nums = [1, 2, 2, 3, 3, 4]
unique_nums = set(nums)
print(unique_nums)
```
✅ **Output:**
```
{1, 2, 3, 4}
```

### 🔴 Advanced
**Problem:** Given two sets `a = {1, 2, 3}` and `b = {2, 3, 4}`, find and print the common elements.
```python
a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)
```
✅ **Output:**
```
{2, 3}
```

## 📌 Summary
- Sets are the best way to handle distinct collections of items.
- Use curly braces `{}` to define a set, but note that `{}` alone creates an empty dictionary. Use `set()` for an empty set.
- Take advantage of union, intersection, and difference for complex data comparisons.
