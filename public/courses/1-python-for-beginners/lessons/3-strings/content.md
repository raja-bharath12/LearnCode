#  Lesson 3: Strings

##  Definition
A **string** is a sequence of characters enclosed in single quotes (`' '`) or double quotes (`" "`).

##  Explanation
Strings are used to store text data such as names, messages, or paragraphs.

###  Key Features:
- **Ordered**: Each character has a fixed position (index).
- **Immutable**: Once created, individual characters cannot be changed directly.
- **Versatile**: Supports powerful operations like indexing, slicing, and manipulation.

### 🔍 Indexing:
Access individual characters using their position (starts at 0):
```python
text = "Python"
print(text[0]) # Output: P
print(text[1]) # Output: y
```

### ✂️ Slicing:
Extract a portion of a string using a range `[start:end]`:
```python
text = "Python"
print(text[0:3]) # Output: Pyt
```

###  Common String Operations:
```python
text = "python"
print(text.upper())           # PYTHON
print(text.lower())           # python
print(len(text))              # 6
print(text.replace("p", "J")) # Jython
```

###  String Concatenation:
Join two or more strings using the `+` operator:
```python
a = "Hello"
b = "World"
print(a + " " + b) # Output: Hello World
```

###  Escape Characters:
| Symbol | Meaning |
| :--- | :--- |
| `\n` | New line |
| `\t` | Tab space |

##  Examples with Answers

###  Easy
**Problem:** Store a name in a variable and print it.
```python
name = "Raja"
print(name)
```
 **Output:**
```
Raja
```

###  Medium
**Problem:** Find the length of a given string.
```python
text = "Python"
print(len(text))
```
 **Output:**
```
6
```

###  Advanced
**Problem:** Replace a specific word in a string with another word.
```python
text = "I love Python"
new_text = text.replace("Python", "Java")
print(new_text)
```
 **Output:**
```
I love Java
```

##  Summary
- Strings store text and are immutable.
- Indexing starts at 0; slicing uses `[start:end]`.
- Native methods like `.upper()`, `.lower()`, and `.replace()` make manipulation easy.


