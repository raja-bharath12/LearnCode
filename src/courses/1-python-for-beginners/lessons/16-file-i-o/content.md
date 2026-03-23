# 📘 Lesson 16: File I/O (Input / Output)

## 📖 Definition
**File I/O** refers to the ability to read data from a file and write data to a file on your computer's storage.

## 🧠 Explanation
Storing data in memory (variables) is temporary. Files allow you to persist data so it remains after the program closes.

### 📂 The `open()` function:
To work with a file, you must first open it:
`file = open("example.txt", "mode")`

### 🔑 Common Modes:
| Mode | Name | Description |
| :--- | :--- | :--- |
| `"r"` | Read | Opens a file for reading (default). Errors if file doesn't exist. |
| `"w"` | Write | Opens for writing. Overwrites existing content. Creates file if missing. |
| `"a"` | Append | Adds content to the end of an existing file. |

### 📖 Reading and Writing:
```python
# Writing
f = open("hello.txt", "w")
f.write("Hello Python!")
f.close()

# Reading
f = open("hello.txt", "r")
print(f.read())
f.close()
```

### ✅ Best Practice: Using `with`
The `with` statement automatically closes the file for you, which is safer and cleaner:
```python
with open("data.txt", "w") as f:
    f.write("Line 1\nLine 2")
```

## 📝 Examples with Answers

### 🟢 Easy
**Problem:** Write a string to a new file named `test.txt`.
```python
with open("test.txt", "w") as f:
    f.write("This is a test.")
```
✅ **Result:** A file named `test.txt` is created with that content.

### 🟡 Medium
**Problem:** Read the content of the `test.txt` file and print it to the console.
```python
with open("test.txt", "r") as f:
    print(f.read())
```
✅ **Output:**
```
This is a test.
```

### 🔴 Advanced
**Problem:** Write a program that counts the number of lines in a given text file.
```python
with open("test.txt", "r") as f:
    lines = f.readlines() # list of lines
    print(f"Total lines: {len(lines)}")
```

## 📌 Summary
- File I/O is critical for building applications that save progress or settings.
- Always remember to close a file or use the `with` block to ensure data is saved and resources are freed.
- Be careful with `"w"` mode, as it completely deletes existing file content before writing.
