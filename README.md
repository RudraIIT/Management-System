# Management System

## Project Setup

This project consists of a **frontend** and **backend** that work together to provide a management system. Follow the steps below to set up and run the project.

---

## Frontend Setup

Navigate to the frontend folder and install dependencies:

```sh
cd frontend
npm install
npm run dev
```

The frontend should now be running on the local development server.

---

## Backend Setup

1. Navigate to the backend folder:
   
   ```sh
   cd backend
   ```

2. Install dependencies:
   
   ```sh
   npm install
   ```

3. Configure environment variables:
   - Copy the `.env.example` file and rename it to `.env`
   - Set up your **DATABASE_URI** in the `.env` file

4. Start the backend server:
   
   ```sh
   npm run dev
   ```

The backend should now be running.

---

## Judge0 Setup

This project integrates **Judge0**, an open-source online code execution system. To set it up:

- Visit the official Judge0 repository: [Judge0 on GitHub](https://github.com/judge0/judge0)
- Follow the installation instructions to set up the Judge0 API
- Ensure that the backend is correctly configured to communicate with Judge0

---

## Running the Project

Once both the frontend and backend are running, you should be able to access the full system. If you encounter any issues, check the logs for errors and ensure all dependencies are installed correctly.

For further improvements and contributions, feel free to submit pull requests or report issues.


