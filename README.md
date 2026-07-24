# 🤖 CodeMentor AI

> An AI-powered coding assistant that helps developers manage projects, chat with AI, and receive intelligent coding guidance in real time.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Gemini](https://img.shields.io/badge/Google-Gemini-orange?logo=google)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📸 Screenshots

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Projects

![Projects](./screenshots/projects.png)

### Project Details

![Project Details](./screenshots/project-details.png)

### AI Chat (Streaming)

![AI Chat](./screenshots/chat.png)

### Authentication

![Login](./screenshots/login.png)

> Place screenshots inside a `screenshots/` folder.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes

---

## 📁 Project Management

- Create Project
- Edit Project
- Delete Project
- View Project Details
- Search Projects

---

## 🤖 AI Assistant

- Google Gemini Integration
- Real-time AI Streaming Responses
- Markdown Rendering
- Syntax Highlighted Code Blocks
- Conversation History
- Chat per Project

---

## 🎨 User Experience

- Responsive UI
- Loading States
- Error Handling
- Toast Notifications
- Project Not Found Handling
- Modern Dashboard Layout

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- React Router
- Tailwind CSS
- Axios
- React Markdown
- React Hot Toast
- Highlight.js

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Google Gemini API
- JWT Authentication

---

# 📂 Project Structure

```text
CodeMentor-AI
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── ...
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── prisma
│   ├── middleware
│   └── ...
│
└── README.md
```

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/codementor-ai.git

cd codementor-ai
```

---

## 2️⃣ Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000

DATABASE_URL=*****************

JWT_SECRET=**********************

GEMINI_API_KEY=***************
```

Run Prisma

```bash
npx prisma migrate dev

npx prisma generate
```

Start server

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend

```bash
npm run dev
```

---

# 💬 AI Streaming

The application uses **Server-Sent Events (SSE)** to stream AI responses from Google Gemini in real time.

### Backend

- Express
- SSE
- Async Generators
- Gemini Streaming API

### Frontend

- Fetch API
- ReadableStream
- Incremental Rendering
- Live Markdown Updates

---

# 📸 Screenshots Folder

```text
screenshots/
│
├── dashboard.png
├── projects.png
├── project-details.png
├── chat.png
└── login.png
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register User |
| POST   | `/api/auth/login`    | Login User    |

---

## Projects

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/api/projects`     |
| POST   | `/api/projects`     |
| GET    | `/api/projects/:id` |
| PUT    | `/api/projects/:id` |
| DELETE | `/api/projects/:id` |

---

## AI

| Method | Endpoint                        |
| ------ | ------------------------------- |
| POST   | `/api/conversations/message`    |
| POST   | `/api/conversations/stream`     |
| GET    | `/api/conversations/:projectId` |

---

# 🎯 Future Improvements

- Copy Response
- Stop Generation
- Regenerate Response
- Dark Mode
- File Upload Support
- Mermaid Diagram Rendering
- LaTeX Support
- Export Conversations
- AI Conversation Search

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Atul Patel**

- GitHub: https://github.com/yourusername
- LinkedIn: https://linkedin.com/in/yourprofile

---

⭐ If you found this project useful, don't forget to star the repository!
