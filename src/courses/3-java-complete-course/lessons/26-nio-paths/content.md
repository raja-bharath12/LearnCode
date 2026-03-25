## 1. NIO
Faster I/O. `Path` and `Files`.

## Practice Problems
### Easy
**Problem:** Write via NIO.
**Solution:**
 `Files.write(Paths.get("test.txt"), "hello".getBytes());`

### Medium
**Problem:** Read via NIO.
**Solution:**
 `Files.readAllLines()`.

### Hard
**Problem:** Copy file NIO.
**Solution:**
 `Files.copy()`.