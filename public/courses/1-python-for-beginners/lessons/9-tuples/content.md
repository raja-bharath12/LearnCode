#  Lesson 9: Tuples

##  Definition
A **tuple** is an ordered, immutable collection of items stored in a single variable.

##  Explanation
Tuples are very similar to lists, but with one key difference: once a tuple is created, you cannot change, add, or remove its elements.

###  Key Characteristics:
- **Ordered**: Items have a fixed position (index).
- **Immutable**: Elements cannot be modified after the tuple is defined.
- **Efficient**: Tuples use less memory than lists and are faster to process.

###  Accessing Elements (Indexing):
Just like lists, indexing starts at 0.
```python
t = (10, 20, 30)
print(t[0]) # Output: 10
```

### ️ Slicing:
Extract a portion using `[start:end]`.
```python
t = (1, 2, 3, 4)
print(t[1:3]) # Output: (2, 3)
```

###  Immutability (The Rule):
Attempting to change an item will result in an error.
```python
t = (1, 2, 3)
# t[0] = 10  TypeError: 'tuple' object does not support item assignment
```

###  Tuple Packing & Unpacking:
- **Packing**: Combining multiple values into a single tuple.
- **Unpacking**: Assigning elements of a tuple back into individual variables.
```python
# Packing
point = (10, 20, 30)

# Unpacking
x, y, z = point
print(x, y, z) # 10 20 30
```

##  Examples with Answers

###  Easy
**Problem:** Create a tuple with three items and print the entire tuple.
```python
t = (1, 2, 3)
print(t)
```
 **Output:**
```
(1, 2, 3)
```

###  Medium
**Problem:** Create a tuple and access its second element.
```python
t = (10, 20, 30)
print(t[1])
```
 **Output:**
```
20
```

###  Advanced
**Problem:** Unpack a tuple containing three coordinates (x, y, z) into individual variables and print each.
```python
coords = (5, 10, 15)
x, y, z = coords

print(x)
print(y)
print(z)
```
 **Output:**
```
5
10
15
```

##  Summary
- Use tuples when you have data that should not change throughout the life of your program.
- Creating a single-element tuple requires a trailing comma, e.g., `(5,)`.
- Unpacking is a powerful way to distribute tuple data into variables.


