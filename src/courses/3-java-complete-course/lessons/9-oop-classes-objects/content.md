## 1. OOP Basics
Class: Blueprint. Object: Instance.
Methods & Fields. Constructor initializes objects.

## Practice Problems
### Easy
**Problem:** Create Car class and print properties.
**Solution:**

```java
class Car { String brand = "Toyota"; }
public class Main { public static void main(String[] args) { System.out.println(new Car().brand); } }
```

### Medium
**Problem:** Class with constructor.
**Solution:**

```java
class Student { String name; Student(String n) { name = n; } }
```

### Hard
**Problem:** Employee class with methods.
**Solution:**

```java
class Employee {
  String name; int salary;
  Employee(String n, int s) { name=n; salary=s; }
  void display() { System.out.println(name + " " + salary); }
}
```