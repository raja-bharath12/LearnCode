## 1. Arrays
Collection of elements of the same data type.
0-based indexing.

## Practice Problems
### Easy
**Problem:** Print array elements.
**Solution:**

```java
int[] arr = {1, 2, 3};
for(int x : arr) System.out.println(x);
```

### Medium
**Problem:** Sum of array elements.
**Solution:**

```java
int[] arr = {1, 2, 3}; int sum=0;
for(int x : arr) sum += x;
System.out.println(sum);
```

### Hard
**Problem:** Find max element.
**Solution:**

```java
int[] arr = {1, 5, 2}; int max = arr[0];
for(int x : arr) if(x > max) max = x;
System.out.println(max);
```