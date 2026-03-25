## 1. Grid
2D layouts. Columns, rows, grid gap.

## Practice Problems
### Easy
**Problem:** 3 equal cols grid
**Solution:**
 display:grid; grid-template-columns: repeat(3, 1fr);

### Medium
**Problem:** 4 cols with gap
**Solution:**
 grid-template-columns: repeat(4, 1fr); gap: 10px;

### Hard
**Problem:** 3 columns, span 2 item
**Solution:**
 grid-column: span 2;