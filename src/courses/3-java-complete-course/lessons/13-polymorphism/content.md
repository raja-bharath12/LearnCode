## 1. Polymorphism
Overloading (compile time) & Overriding (runtime).

## Practice Problems
### Easy
**Problem:** Overload method.
**Solution:**

```java
int add(int a, int b) { return a+b; }
double add(double a, double b) { return a+b; }
```

### Medium
**Problem:** Override method.
**Solution:**
 Same as inheritance example.

### Hard
**Problem:** Dynamic method dispatch.
**Solution:**

```java
Animal a = new Dog(); a.eat();
```