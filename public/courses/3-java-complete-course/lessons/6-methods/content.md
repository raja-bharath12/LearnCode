## 1. Methods
Reusable blocks of code.
Can have parameters and return types.

## Practice Problems
### Easy
**Problem:** Method to print Hello.
**Solution:**

```java
static void printHello() { System.out.println("Hello"); }
```

### Medium
**Problem:** Method to square a number.
**Solution:**

```java
static int square(int n) { return n * n; }
```

### Hard
**Problem:** Recursion to find factorial.
**Solution:**

```java
static int fact(int n) { return (n==0) ? 1 : n * fact(n-1); }
```