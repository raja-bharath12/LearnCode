## 1. Inheritance
Reusing code from parent using `extends`.

## Practice Problems
### Easy
**Problem:** Simple inheritance.
**Solution:**

```java
class Animal { void eat() { System.out.println("Eat"); } }
class Dog extends Animal {}
```

### Medium
**Problem:** Override method.
**Solution:**

```java
class Dog extends Animal { @Override void eat() { System.out.println("Dog eats"); } }
```

### Hard
**Problem:** `super` keyword.
**Solution:**

```java
class Dog extends Animal { void eat() { super.eat(); System.out.println("Dog eats"); } }
```