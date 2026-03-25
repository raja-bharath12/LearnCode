## 1. Abstraction
Hiding implementation. `abstract` class or `interface`.

## Practice Problems
### Easy
**Problem:** Abstract class.
**Solution:**

```java
abstract class Shape { abstract void draw(); }
```

### Medium
**Problem:** Implement abstract method.
**Solution:**

```java
class Circle extends Shape { void draw() { System.out.println("Circle"); } }
```

### Hard
**Problem:** Interface payment.
**Solution:**

```java
interface Payment { void pay(); }
class UPI implements Payment { public void pay() { System.out.println("UPI"); } }
```