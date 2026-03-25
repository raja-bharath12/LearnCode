## 1. Streams
Filters, maps, reduces collection processing.

## Practice Problems
### Easy
**Problem:** Print with streams.
**Solution:**
 `list.stream().forEach(System.out::println);`

### Medium
**Problem:** Filter even numbers.
**Solution:**
 `list.stream().filter(n -> n%2==0).collect(Collectors.toList());`

### Hard
**Problem:** Sum of squares.
**Solution:**
 `list.stream().mapToInt(n -> n*n).sum();`