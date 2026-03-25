## 1. Singleton
Only one instance.

## Practice Problems
### Easy
**Problem:** Basic singleton.
**Solution:**
 private constructor, static getInstance.

### Medium
**Problem:** Lazy singleton.
**Solution:**
 `if(instance==null) instance = new Singleton();`

### Hard
**Problem:** Thread safe singleton.
**Solution:**
 Double checked locking.