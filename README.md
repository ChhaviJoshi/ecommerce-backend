# 🛒 E-commerce Backend API

A full-stack RESTful API for an e-commerce platform built with **Node.js, Express, and PostgreSQL**. This project includes secure user authentication, product management, shopping cart functionality, order processing, and a microservice for notifications.

**Live Demo:** [https://myshop-chhavi.onrender.com](https://myshop-chhavi.onrender.com)  
*(Note: It may take 30s to wake up on the free tier)*

## 🚀 Features
* **User Module:** Register, Login (JWT Auth), Role-based access (Admin/Customer).
* **Product Module:** CRUD operations, Search by name, Filter by category/price, Pagination.
* **Cart Module:** Add to cart, view cart, calculate totals.
* **Order Module:** Place orders, transactional integrity, order history.
* **Microservice Architecture:** Separate Notification Service (Port 5001) triggered on checkout.
* **Tech Stack:** Node.js, Express, PostgreSQL (Neon Cloud), Render Deployment.

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL (Hosted on Neon.tech)
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt
* **Microservices:** Axios for inter-service communication
* **Deployment:** Render.com

## ⚙️ Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/ChhaviJoshi/ecommerce-backend.git](https://github.com/ChhaviJoshi/ecommerce-backend.git)
    cd ecommerce-backend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory and add:
    ```properties
    PORT=5000
    JWT_SECRET=your_super_secret_key
    # Cloud Database Connection String
    DATABASE_URL=postgres://neondb_owner:...........@ep-cool-frog.aws.neon.tech/neondb?sslmode=require
    ```

4.  **Run the Server**
    ```bash
    # Run locally
    npm run dev
    
    # Run Microservice (in separate terminal)
    cd microservices/notification-service
    node server.js
    ```

## 📚 API Endpoints

| Method   | Endpoint             | Description                             |Auth?|
|      --- |  ---                 | ---                                     | --- |
| **POST** | `/api/auth/register` | Register a new user                     | ❌ |
| **POST** | `/api/auth/login`    | Login user & get Token                  | ❌ |
| **GET**  | `/api/products`      | Fetch all products (with search/filter) | ❌ |
| **POST** | `/api/cart`          | Add item to cart                        | ✅ |
| **GET**  | `/api/cart`          | View my cart                            | ✅ |
| **POST** | `/api/orders`        | Place an order (triggers Microservice)  | ✅ |

## 🏗️ Architecture
This project follows a **Microservices-ready** architecture. The main backend handles core logic (Auth, Products, Orders) while the **Notification Service** runs independently to handle email alerts.

## 👥 Author
**Chhavi Joshi** *Backend Developer Intern*