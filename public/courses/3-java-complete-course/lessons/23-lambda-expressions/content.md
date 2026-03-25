## 1. Lambdas
Anonymous functions. `(a,b) -> a+b`.

## Practice Problems
### Easy
**Problem:** Simple lambda thread.
**Solution:**
 `new Thread(() -> System.out.println("Hi")).start();`

### Medium
**Problem:** Comparator lambda.
**Solution:**
 `list.sort((a,b) -> a - b);`

### Hard
**Problem:** Custom functional interface.
**Solution:**
 `@FunctionalInterface interface Op { int apply(int a, int b); }`