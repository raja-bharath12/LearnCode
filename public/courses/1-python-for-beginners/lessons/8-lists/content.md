#  Lesson 8: Lists

##  Definition
A **list** is an ordered, mutable (changeable) collection of items stored in a single variable.

##  Explanation
Lists are one of the most powerful data structures in Python. They allow you to group related data together.

###  Key Characteristics:
- **Ordered**: Items have a fixed position (index).
- **Mutable**: You can add, remove, or change items after creation.
- **Heterogeneous**: Can store different data types (e.g., `[1, "Apple", 3.5]`).

### 🔍 Accessing Elements (Indexing):
Negative indexing (starts at -1) allows access from the end.
```python
nums = [10, 20, 30]
print(nums[0])  # 10
print(nums[-1]) # 30
```

###  Common List Operations:
```python
fruits = ["Apple", "Banana"]
fruits.append("Cherry")  # Add to end
fruits.remove("Banana")  # Remove specific item
fruits[0] = "Mango"      # Modify element
print(len(fruits))       # Get size
```

### ✂️ Slicing:
Extract a sub-list using `[start:end]`.
```python
nums = [1, 2, 3, 4, 5]
print(nums[1:4]) # Output: [2, 3, 4]
```

##  Examples with Answers

###  Easy
**Problem:** Create a list of three strings and print the first item.
```python
names = ["Raja", "Kumar", "Arun"]
print(names[0])
```
 **Output:**
```
Raja
```

###  Medium
**Problem:** Create a list of two numbers, add a third number to it, and print the updated list.
```python
nums = [10, 20]
nums.append(30)
print(nums)
```
 **Output:**
```
[10, 20, 30]
```

###  Advanced
**Problem:** Use a loop to find the sum of all elements in a numeric list.
```python
nums = [1, 2, 3, 4]
total = 0

for i in nums:
    total += i

print("Total sum:", total)
```
 **Output:**
```
Total sum: 10
```

##  Summary
- Lists are versatile containers for multiple items.
- Support indexing, slicing, and a variety of methods for manipulation.
- Use `.append()`, `.remove()`, and `.insert()` to manage list contents.


