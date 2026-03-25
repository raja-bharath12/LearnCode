## 1. Control Flow
Determines how a program executes based on conditions.
Keywords: if, else if, else, switch.

## Practice Problems
### Easy
**Problem:** Check if a number is even or odd.
**Solution:**

```java
int n = 10;
if(n%2 == 0) System.out.println("Even");
else System.out.println("Odd");
```

### Medium
**Problem:** Take marks as input and print grade (A, B, C, Fail).
**Solution:**

```java
int marks = 85;
if(marks >= 90) System.out.println("A");
else if(marks >= 75) System.out.println("B");
else if(marks >= 50) System.out.println("C");
else System.out.println("Fail");
```

### Hard
**Problem:** Leap year check.
**Solution:**

```java
int year = 2024;
if((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) System.out.println("Leap Year");
else System.out.println("Not a Leap Year");
```