## 1. Interfaces
Multiple inheritance in Java.

## Practice Problems
### Easy
**Problem:** Simple interface.
**Solution:**

```java
interface Animal { void sound(); }
```

### Medium
**Problem:** Multiple interfaces.
**Solution:**

```java
class Dog implements Animal, Pet {}
```

### Hard
**Problem:** Default methods.
**Solution:**

```java
interface Animal { default void sleep() { System.out.println("Sleep"); } }
```