## 1. Encapsulation
Wrapping data and methods. Private variables with public getter/setter.

## Practice Problems
### Easy
**Problem:** Private variable with getter/setter.
**Solution:**

```java
class Person {
  private String name;
  void setName(String n) { name=n; }
  String getName() { return name; }
}
```

### Medium
**Problem:** Validation in setter.
**Solution:**

```java
class Account {
  private int balance;
  void deposit(int amt) { if(amt>0) balance+=amt; }
}
```

### Hard
**Problem:** Secure Bank Account.
**Solution:**
 // Combined above logics