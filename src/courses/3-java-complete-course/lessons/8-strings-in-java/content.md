## 1. Strings
Sequence of characters. Objects in Java.
Immutable. Use StringBuilder for mutable strings.

## Practice Problems
### Easy
**Problem:** Print string length.
**Solution:**

```java
String s = "Java"; System.out.println(s.length());
```

### Medium
**Problem:** Check palindrome string.
**Solution:**

```java
String s = "madam";
String rev = new StringBuilder(s).reverse().toString();
System.out.println(s.equals(rev) ? "Palindrome" : "Not Palindrome");
```

### Hard
**Problem:** Count vowels and consonants in a string.
**Solution:**

```java
String s = "hello"; int v=0, c=0;
for(char ch : s.toLowerCase().toCharArray()) {
  if("aeiou".indexOf(ch) != -1) v++;
  else if(Character.isLetter(ch)) c++;
}
System.out.println("Vowels: " + v + ", Consonants: " + c);
```