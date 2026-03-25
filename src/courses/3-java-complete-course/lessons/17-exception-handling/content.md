## 1. Exception Handling
try, catch, finally, throw, throws.

## Practice Problems
### Easy
**Problem:** Divide by zero catch.
**Solution:**

```java
try{ int x = 1/0; } catch(Exception e){}
```

### Medium
**Problem:** Array index bounds.
**Solution:**
 Catch `ArrayIndexOutOfBoundsException`.

### Hard
**Problem:** Custom exception.
**Solution:**

```java
class AgeException extends Exception {}
```