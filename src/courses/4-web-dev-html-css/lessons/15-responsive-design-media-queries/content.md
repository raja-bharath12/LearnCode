## 1. Responsive Design
Mobile first, Media queries target max-width max devices.

## Practice Problems
### Easy
**Problem:** @media max 600px bg lightblue
**Solution:**
 @media(max-width:600px) { body{background:lightblue;} }

### Medium
**Problem:** Flex row to column on mobile
**Solution:**
 @media(max-width:768px){.container{flex-direction:column;}}

### Hard
**Problem:** 3 col to 2 col to 1 col
**Solution:**
 @media(max-width:768px){cols:repeat(2,1fr)} @media(max-width:480px){cols:1fr;}