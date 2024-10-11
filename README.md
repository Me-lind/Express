# **Product Management API**
![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)   ![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)   ![TS-Node](https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white)   ![XATA](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)  


A RESTful API for managing products using Express.js and Xata as the database. The API supports full CRUD operations and validation.

---

## **Table of Contents**
1. [Getting Started](#getting-started)
2. [API Endpoints](#api-endpoints)
3. [Validation](#validation)
4. [Project Structure](#project-structure)
5. [Technologies Used](#technologies-used)
6. [Running the Project](#running-the-project)
---
## **Getting Started**

### **Prerequisites**

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) 

### **Installation**

1. Clone the repository:
    ```bash
    git clone https://github.com/Me-lind/Express.git
    cd Express
    ```

2. Install the project dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file:
    ```bash
    XATA_API_KEY=your_xata_api_key
    XATA_BRANCH=main
    PORT=3001
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

5. The server will be running at [http://localhost:3001](http://localhost:3001).

---

## **API Endpoints**

Here’s a summary of the available API endpoints:

| HTTP Method | Endpoint               | Description                       |
|-------------|------------------------|-----------------------------------|
| POST        | `/api/products`         | Create a new product              |
| GET         | `/api/products`         | Get all products                  |
| GET         | `/api/products/:id`     | Get a product by ID               |
| PUT         | `/api/products/:id`     | Update a product by ID            |
| DELETE      | `/api/products/:id`     | Delete a product by ID            |

---

## Validation
Validation is handled using Joi to ensure that the request data is well-formed.

| Field       | Validation              | 
|-------------|------------------------|
| name        |Must be a non-empty string |
| price         | Must be a positive number |
| stock         | Must be a positive number | 
| category         | Must be a non-empty string |
|description       | Max length of 200 characters, non-empty| 

---

## Project Structure
``` markdown
src/
│
├── controllers/
│   └── productController.ts  # Product CRUD logic
├── middlewares/
│   ├── resolveProductByID.ts  # Middleware to resolve product by ID
│   ├── customErrorHandler.ts  # Middleware to handle all possible errors
│   └── validateProduct.ts     # Validation middleware for POST/PUT requests
├── routes/
│   └── productRoutes.ts       # Product routes
├── validations/
│   ├── productValidation.ts   # Joi validation schema for product creation/updation
├── xata.ts                    # Xata client setup
└── server.ts                  # Server setup and middleware registration
```
---
## Technologies Used
- Node.js: JavaScript runtime
- Express.js: Web framework for building APIs
- Xata: Serverless database
- Joi: Schema validation

---
## Running the Project
1. Clone the repository:
``` bash
git clone https://github.com/Me-lind/Express.git
```
2. Install the dependencies:
``` bash
npm install
```
3. Create a **.env** file and configure the environment variables.

4. Run the development server:
```bash
npm run dev
```
---

# Screenshot of Tests using Postman
![5created](https://github.com/user-attachments/assets/7641d0a2-9fb0-4a2e-b72d-4616b29498ff)
![1getall](https://github.com/user-attachments/assets/e5ccc46a-c7bf-49fc-87de-10fd0ea3ca1e)
![2getbyid](https://github.com/user-attachments/assets/f5b5d526-804c-4854-911d-f569e183c23e)
![3editproduct](https://github.com/user-attachments/assets/27f66a53-0e2e-4a90-a7cc-1bb9a8295691)
![4delete](https://github.com/user-attachments/assets/7197f451-bf26-4667-9135-c7e493d18855)


