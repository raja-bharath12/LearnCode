## 1. Constructors
Special method to initialize objects. No return type. Same name as class.

## Practice Problems
### Easy
**Problem:** Default constructor.
**Solution:**

```java
class Demo { Demo() { System.out.println("Created"); } }
```

### Medium
**Problem:** Parameterized constructor.
**Solution:**

```java
class Demo { Demo(int x) { System.out.println(x); } }
```

### Hard
**Problem:** Constructor overloading.
**Solution:**

```java
class Demo {
  Demo() { System.out.println("Default"); }
  Demo(int x) { System.out.println(x); }
}
```