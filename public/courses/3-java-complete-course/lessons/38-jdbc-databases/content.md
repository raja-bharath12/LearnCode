## 1. JDBC
Connecting Java to SQL databases.

## Practice Problems
### Easy
**Problem:** Connection.
**Solution:**
 DriverManager.getConnection

### Medium
**Problem:** Statement and ResultSet.
**Solution:**
 stmt.executeQuery("SELECT * ...");

### Hard
**Problem:** PreparedStatement.
**Solution:**
 `PreparedStatement pstmt = conn.prepareStatement("INSERT INTO...");`