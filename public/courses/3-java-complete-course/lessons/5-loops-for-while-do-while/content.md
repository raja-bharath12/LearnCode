## 1. Loops in Java
for loop: known iterations.
while loop: unknown iterations.
do-while loop: executes at least once.

## Practice Problems
### Easy
**Problem:** Print numbers from 1 to 10.
**Solution:**

```java
for(int i=1; i<=10; i++) System.out.println(i);
```

### Medium
**Problem:** Sum of first N natural numbers.
**Solution:**

```java
int n=5, sum=0;
for(int i=1; i<=n; i++) sum += i;
System.out.println(sum);
```

### Hard
**Problem:** Check prime number.
**Solution:**

```java
int n=7; boolean prime=true;
for(int i=2; i<n; i++) { if(n%i==0) { prime=false; break; } }
System.out.println(prime ? "Prime" : "Not Prime");
```