## 1. Generics
Type safety. `<T>`.

## Practice Problems
### Easy
**Problem:** Generic Box class.
**Solution:**

```java
class Box<T> { T value; }
```

### Medium
**Problem:** Generic method.
**Solution:**

```java
<T> void print(T val) { System.out.println(val); }
```

### Hard
**Problem:** Generic Pair.
**Solution:**

```java
class Pair<K,V> { K key; V val; }
```