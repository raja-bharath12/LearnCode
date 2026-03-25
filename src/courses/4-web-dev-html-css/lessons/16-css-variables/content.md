## 1. Variables properties
--varname on :root then var(--varname).

## Practice Problems
### Easy
**Problem:** Color var
**Solution:**
 :root{--c:blue;} p{color:var(--c);}

### Medium
**Problem:** Bg and text variables
**Solution:**
 :root{--bg:red;} .b{background:var(--bg);}

### Hard
**Problem:** Dark mode theme variables
**Solution:**
 .dark{--bg:black;} body{background:var(--bg);}