## 1. Advanced Grid
Grid-template-areas, Minmax, auto-fit, auto-fill.

## Practice Problems
### Easy
**Problem:** Areas header footer
**Solution:**
 grid-template-areas: "header" "footer";

### Medium
**Problem:** minmax columns
**Solution:**
 grid-template-columns: repeat(3, minmax(100px, 1fr));

### Hard
**Problem:** Layout Header, Sidebar, Main, Footer using auto-fit
**Solution:**
 display:grid; grid-template-areas: "h h" "s m" "f f";