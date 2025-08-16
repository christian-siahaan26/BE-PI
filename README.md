# Complaint App Backend

This is the backend for a note-taking application built with Express.js.

This project follows a clean architecture approach, which aims to separate concerns and create a maintainable and scalable codebase. Here's a brief explanation of the structure:

## Architecture:
```mermaid
graph TD
    A[Presentation Layer] -->|Handles Requests| B[Routes]
    B -->|Calls Controllers| C[Controllers]
    C -->|Processes Logic| D[Services]
    D -->|Accesses Data| E[Repositories]
    E -->|Interacts with DB| F[Prisma ORM]

    subgraph Domain Layer
        D
    end

    subgraph Data Layer
        E
        F
    end
```

### 📁 Project Structure  

This project follows a clean and organized structure, ensuring maintainability and scalability. Below is an overview of the main directories and files:  

### 📂 Root Directories  
- **`api/`** - Entry point for the API, responsible for initializing and configuring the server.  
- **`prisma/`** - Contains database schema and migration files.  
- **`public/`** - Serves static files used by the application.  
  - **`swagger-ui/`** - Assets for API documentation using Swagger UI.  
- **`src/`** - Main source code directory.  

### 📂 Source Code (`src/`)  
#### 🏗️ Architecture Layers  
- **`controllers/`** - Handles HTTP requests and responses.  
- **`routes/`** - Defines API endpoints and connects them to controllers.  
- **`services/`** - Contains business logic and core application functionality.  
- **`repositories/`** - Manages database operations and interactions.  
- **`models/`** - Defines data structures and database models.  

#### 🔧 Supporting Modules  
- **`middleware/`** - Custom middleware functions for request handling.  
- **`utils/`** - Utility functions to support the application.  
- **`types/`** - TypeScript type definitions for better type safety.  
- **`docs/`** - OPEN API documentation.

## 🛠️ Configuration Files  
- **`package.json`** - Project manifest file.
- **`tsconfig.json`** - TypeScript configuration file.  
- **`vercel.json`** - Configuration for deployment on Vercel.  

## API Endpoints

### Citizen

- `GET /api/citizens` - Retrieve all citizens
- `POST /api/citizens` - Create a new citizen
- `GET /api/citizens/:id` - Retrieve a specific citizen by ID
- `PUT /api/citizens/:id` - Update a specific citizen by ID
- `DELETE /api/citizens/:id` - Soft delete a specific citizen by ID

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Log in an existing user
- `POST /api/auth/authorize` - Authorize a user session

### Complaint

- `GET /api/complaints` - Retrieve all complaints
- `POST /api/complaints` - Create a new complaint
- `GET /api/complaints/:id` - Retrieve a specific complaint by ID
- `PUT /api/complaints/:id` - Update a specific complaint by ID
- `PATCH /api/complaints/:id` - Soft delete a specific complaint by ID

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

```sh
git clone https://github.com/christian-siahaan26/BE-PI.git note-app-backend
```

2. Navigate to the project directory:

```sh
cd complaint-app-backend
```

3. Install dependencies:

```sh
npm install
```

### Database Setup

#### ERD

```mermaid
erDiagram
    CITIZEN {
        Int idCitizen
        String name
        String nik
        String block
        DateTime createdAt
        DateTime updatedAt
    }

    USER {
        Int idUser
        String nameCitizen
        String nik
        String block
        String email
        String password
        String role
        DateTime createdAt
        DateTime updatedAt
        Int citizenId
    }

    COMPLAINT {
        Int idComplaint
        String name
        String location
        String description
        String photo
        Boolean status
        DateTime createdAt
        DateTime updatedAt
        Boolean isDeleted
        Int userId
    }

    CITIZEN ||--o{ USER : "has one"
    USER ||--o{ COMPLAINT : "has many"
```

1. Migrate prisma database:

```sh
npx prisma migrate dev
```

### Running the Server

1. Start the development server:

```sh
npm start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
