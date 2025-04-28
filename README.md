# TP2 - Programming Workshop 2

This project is a **small e-commerce application** developed for academic purposes.  
It was built using **Node.js** and **Express.js**, with **MongoDB** as the database.  
The main objective was to practice backend development concepts such as layered architecture, modularization, middleware handling, testing, and file uploads.

## Team Members and Responsibilities

- **Albin, Sandra**  
  - Developed the exception handling middleware.  
  - Refactored the code at the source level.  
  - Centralized shared components (MongoDB connection, exception handling, and configurations) into a `shared` folder.  
  - Contributed initially to the sales module.

- **Castro Martínez, Gastón**  
  - Developed the users feature (DAO, router, controller, and service).  
  - Implemented tests for the users feature.  
  - Handled file uploads using **Multer**.

- **Godoy, Rubén**  
  - Developed the products feature (DAO, router, controller, and service).  
  - Implemented tests for the products feature.  
  - Built the login layer within its own module, along with the corresponding middleware.

- **Redoni, Franco**  
  - Developed the sales feature (DAO, router, controller, and service).  
  - Implemented tests for the sales feature.  
  - Implemented MongoDB persistence for users, products, and sales.  
  - Led the initial codebase refactoring and structured the project into a layered architecture to enable modular development.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Jest (for testing)

---

