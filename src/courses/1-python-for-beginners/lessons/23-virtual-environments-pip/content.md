# 📘 Lesson 23: Virtual Environments & pip

## 📖 Definition
- **Virtual Environment**: An isolated workspace designed for a specific project so its dependencies don't interfere with other projects.
- **pip**: The standard package manager for Python, used to install libraries from the Python Package Index (PyPI).

## 🧠 Explanation
Professional Python developers never install packages globally. They use virtual environments to keep their development environment clean.

### 🔹 Why Virtual Environments?
If Project A needs `Django 3.0` and Project B needs `Django 4.0`, you can't have both globally. Virtual environments solve this.

### ⚙️ Setting Up an Environment:
1. **Create**: `python -m venv myenv`
2. **Activate (Windows)**: `myenv\Scripts\activate`
3. **Activate (Mac/Linux)**: `source myenv/bin/activate`
4. **Deactivate**: `deactivate`

### 📦 Using pip:
```bash
# Install a package
pip install requests

# See what's installed
pip list

# Save current project requirements
pip freeze > requirements.txt

# Install from a list
pip install -r requirements.txt
```

## 📝 Examples with Answers

### 🟢 Easy
**Problem:** Command to install a package like `numpy` using pip.
```bash
pip install numpy
```

### 🟡 Medium
**Problem:** Create a new virtual environment named `env`.
```bash
python -m venv env
```

### 🔴 Advanced
**Problem:** Install multiple packages from a `requirements.txt` file.
```bash
pip install -r requirements.txt
```

## 📌 Summary
- Virtual environments are essential for avoiding dependency conflicts.
- `pip` is your primary tool for expanding Python's capabilities with millions of open-source libraries.
- Always include a `requirements.txt` file in your project repositories.
