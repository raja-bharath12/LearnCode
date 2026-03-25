## 1. What are Operators?
Symbols used to perform operations on variables and values.
Arithmetic: +, -, *, /, %
Relational: ==, !=, >, <, >=, <=
Logical: &&, ||, !
Assignment: =, +=, -=, *=, /=
Increment/Decrement: ++, --

## Practice Problems
### Easy
**Problem:** Print the sum, difference, and product of two numbers.
**Solution:**

```java
int a=10, b=5; System.out.println((a+b) + " " + (a-b) + " " + (a*b));
```

### Medium
**Problem:** Check whether a number is positive, negative, or zero using ternary operator.
**Solution:**

```java
int n = -5;
String res = (n > 0) ? "Positive" : (n < 0) ? "Negative" : "Zero";
System.out.println(res);
```

### Hard
**Problem:** Find the largest of three numbers using only operators (no if-else).
**Solution:**

```java
int a=10, b=20, c=15;
int max = (a > b) ? (a > c ? a : c) : (b > c ? b : c);
System.out.println(max);
```