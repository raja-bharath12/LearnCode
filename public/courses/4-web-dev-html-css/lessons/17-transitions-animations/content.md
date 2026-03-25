## 1. Keyframes and Hover
Transitions for hover sizes, Keyframes for constant animation.

## Practice Problems
### Easy
**Problem:** Smooth hover color change
**Solution:**
 transition: background 0.5s; .box:hover{background:red;}

### Medium
**Problem:** Box scales on hover
**Solution:**
 transform:scale(1.2); transition:transform 0.3s;

### Hard
**Problem:** Infinite move animation
**Solution:**
 animation: move 3s infinite linear; @keyframes move { to { transform: translateX(300px); } }