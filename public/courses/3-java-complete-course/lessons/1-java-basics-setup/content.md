## 1. What is Java?
Java is a high-level, object-oriented programming language developed by Sun Microsystems (now owned by Oracle Corporation).

💡 Key Features:
Platform Independent (Write Once, Run Anywhere)
Object-Oriented
Secure & Robust
Multithreaded
Automatic Memory Management (Garbage Collection)

## 2. How Java Works?
⚙️ Flow:
Write code → .java
Compile using javac → .class (bytecode)
Run using JVM → Output

📌 Important Components:
JDK (Java Development Kit) → For development
JRE (Java Runtime Environment) → For running
JVM (Java Virtual Machine) → Executes bytecode

## 3. Basic Java Program Structure
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

## 4. Variables in Java
📌 Data Types: int, float, double, char, boolean, String
✅ Example:
```java
int age = 20;
double price = 99.99;
String name = "Java";
```

## Practice Problems
### Easy
**Problem:** Write a Java program to print "Hello World".
**Solution:**

```java
public class Main { public static void main(String[] args) { System.out.println("Hello World"); } }
```

### Medium
**Problem:** Take two numbers and print their sum.
**Solution:**

```java
public class Main { public static void main(String[] args) { int a = 5, b = 10; System.out.println("Sum: " + (a+b)); } }
```

### Hard
**Problem:** Take name and age as input and print a formatted string.
**Solution:**

```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();
        int age = sc.nextInt();
        System.out.println(name + " is " + age + " years old.");
    }
}
```