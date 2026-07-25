# 🚀 Vector-Share

Vector-Share is a secure file-sharing web application that I built to explore how modern applications handle authentication, authorization, secure file storage, and scalable backend architecture.

The goal of this project was to create a platform where users can securely upload, manage, and share files while following real-world backend development practices. Along the way, I implemented features like JWT authentication, Google OAuth, Redis caching, email verification, and secure file access.

---

## ✨ Features

### 🔐 Authentication & Security

* Sign up with Email OTP verification
* Login using Email or Google OAuth 2.0
* JWT-based authentication
* Refresh token mechanism for seamless login sessions
* Password encryption using BCrypt
* Secure HttpOnly cookies
* Protected REST APIs with Spring Security

### 📁 File Management

* Upload files securely
* Download shared files
* Delete uploaded files
* Generate shareable file links
* Store file metadata in the database
* Organize user-specific uploads

### ⚡ Performance

* Optimized database interactions using Spring Data JPA and indexing techniques
* Efficient authentication workflow

### 💻 User Experience

* Clean and responsive interface
* Fast navigation with React and Vite
* Simple and intuitive file management

---

# 🛠️ Tech Stack

### Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* MySQL
* JWT
* OAuth2 Client
* Maven

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Tools

* Docker
* Git
* GitHub
* Postman

---

# 📂 Project Structure

```text
Vector-Share
├── vector-share-backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── security
│   ├── dto
│   ├── model
│   └── config
│
├── vector-share-frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── assets
│
└── README.md
```

---

# 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/vector-share.git
cd vector-share
```

## Backend

1. Configure your MySQL database.
3. Add your environment variables or update `application.properties`.
4. Run the Spring Boot application.

```bash
mvn spring-boot:run
```

## Frontend

```bash
cd vector-share-frontend

npm install

npm run dev
```

---

# 📌 Why I Built This Project

I wanted to go beyond building a simple CRUD application and work on something that reflects how production-ready applications are designed.

While building Vector-Share, I learned about:

* Implementing secure authentication with JWT and OAuth2
* Managing user sessions using refresh tokens
* Integrating Redis for caching
* Sending OTP verification emails
* Building RESTful APIs with Spring Boot
* Structuring a scalable backend
* Connecting a React frontend with a Spring Boot backend
* Deploying full-stack applications

This project helped me understand many concepts that are commonly used in real-world backend development.

---

# 🤝 Contributing

Contributions, suggestions, and feedback are always welcome.

If you'd like to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

# 👨‍💻 About Me

Hi, I'm **Sourav Gorain**, a final-year B.Tech Information Technology student with a strong interest in backend development and building secure, scalable web applications.

I'm always looking to learn new technologies and improve my software engineering skills by working on practical projects like Vector-Share.

If you found this project interesting, feel free to ⭐ the repository or connect with me on LinkedIn.
LinkedIn : https://www.linkedin.com/in/souravgorain/
