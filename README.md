# 🎓 Student Record System

A backend application built with **Spring Boot** to manage **students**, **courses**, and **enrollments**.  
It provides a RESTful API for performing CRUD operations and retrieving related data efficiently.

---

## 🧠 Overview

**Student Record System** helps institutions maintain student details, manage course assignments, and record marks.  
It uses **Spring Boot**, **Spring Data JPA**, and **Swagger/OpenAPI** for easy documentation and API exploration.

---

## ⚙️ Tech Stack

- **Spring Boot** (REST APIs)
- **Spring Data JPA**
- **MySQL / H2 Database**
- **Swagger / OpenAPI**
- **Lombok**

---

## 📂 Project Structure

student-record-system/
│
├── src/main/java/com/example/studentrecord/
│ ├── controller/ # REST controllers
│ ├── service/ # Business logic
│ ├── repository/ # Data access layer
│ └── model/ # Entity classes
│
├── src/main/resources/
│ ├── application.properties
│ └── data.sql # Optional sample data
│
└── pom.xml # Maven dependencies

pgsql
Copy code

---

## 🚀 Features

- Add, update, and delete student records  
- Manage courses and their details  
- Enroll students in courses  
- View students’ enrolled courses  
- View students in a particular course  
- View/update marks  
- Swagger API documentation  

---

## 📘 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/students` | Add a new student |
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student details |
| PUT | `/api/students/{id}` | Update student info |
| DELETE | `/api/students/{id}` | Delete student |
| POST | `/api/courses` | Add a new course |
| POST | `/api/enrollments` | Enroll a student in a course |
| GET | `/api/enrollments/student/{studentId}` | View student enrollments |
| GET | `/api/enrollments/course/{courseId}` | View course enrollments |

---

## 🧩 Configuration

### application.properties
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
🧠 Swagger Access
After running the app, visit:
👉 http://localhost:8080/swagger-ui.html

🧰 Run the Application
Using Maven
bash
Copy code
mvn spring-boot:run
Or build JAR
bash
Copy code
mvn clean package
java -jar target/student-record-system-0.0.1-SNAPSHOT.jar
