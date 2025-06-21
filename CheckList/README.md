# CheckList App 📝

A beautiful, full-stack task management application built with Next.js, MongoDB, and Docker. Features authentication, CRUD operations, pagination, filtering, and a responsive design.

## 🚀 Features

- **Complete Task Management**: Create, read, update, and delete tasks
- **Task Properties**: Title (required), description (optional), status (Open/In Progress/Done), timestamps
- **Advanced Filtering**: Filter tasks by status with real-time updates
- **Pagination**: Navigate through tasks with 5 per page
- **Authentication**: Secure login system with NextAuth.js
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Real-time Updates**: Instant feedback with toast notifications
- **Docker Support**: Containerized for easy deployment

  ---
  ## 🌐 Live Demo

- You can try out the live version of CheckList below:
- **CheckList**: https://check-list-sooty.vercel.app/
- Feel free to explore the platform,and start your journey!

  ---

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: NextAuth.js with credentials provider
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- Docker (optional, for containerized deployment)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd checklist-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/checklist-app?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Node Environment
NODE_ENV=development
```

### 4. MongoDB Setup

1. Create a free MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Get your connection string and replace `MONGODB_URI` in `.env.local`
4. Add your IP address to the allowed list in MongoDB Atlas

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Sign In

Use any email and password combination to sign in (demo authentication).

## 🐳 Docker Deployment

### Option 1: Docker with MongoDB Atlas

1. Update `.env.local` with your MongoDB Atlas connection string
2. Build and run with Docker:

```bash
# Build the image
docker build -t checklist-app .

# Run the container
docker run -p 3000:3000 --env-file .env.local checklist-app
```

### Option 2: Docker Compose with Local MongoDB

1. Update the environment variables in `docker-compose.yml`
2. Run with Docker Compose:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

This will start:
- CheckList App on http://localhost:3000
- MongoDB on localhost:27017

### Option 3: Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📡 API Routes

The application provides RESTful API endpoints:

### Tasks API

- **GET** `/api/tasks` - Get paginated tasks with optional filtering
  - Query params: `page`, `limit`, `status`
  - Returns: `{ tasks, totalCount, currentPage, totalPages }`

- **POST** `/api/tasks` - Create a new task
  - Body: `{ title, description?, status? }`
  - Returns: Created task object

- **PUT** `/api/tasks/[id]` - Update a task
  - Body: `{ title, description?, status }`
  - Returns: Updated task object

- **DELETE** `/api/tasks/[id]` - Delete a task
  - Returns: Success message

### Authentication API

- **POST** `/api/auth/signin` - Sign in user
- **POST** `/api/auth/signout` - Sign out user
- **GET** `/api/auth/session` - Get current session

## 🏗️ Project Structure

```
checklist-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   └── tasks/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   ├── auth/
│   │   └── signin/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   └── [shadcn components]
│   ├── NextAuthProvider.tsx
│   ├── Pagination.tsx
│   ├── TaskCard.tsx
│   ├── TaskFilters.tsx
│   └── TaskForm.tsx
├── lib/
│   ├── mongodb.ts
│   ├── types.ts
│   └── utils.ts
├── types/
│   └── next-auth.d.ts
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## 🎨 UI Features

- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Glass Morphism**: Subtle transparency effects and shadows
- **Micro-interactions**: Smooth hover states and animations
- **Status Indicators**: Color-coded badges for task status
- **Responsive Layout**: Mobile-first design with breakpoints
- **Toast Notifications**: Real-time feedback for user actions

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **Database Schema**: Update types in `lib/types.ts`
2. **API Routes**: Add endpoints in `app/api/`
3. **UI Components**: Create reusable components in `components/`
4. **Styling**: Use Tailwind classes and CSS variables

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy with one click

### DigitalOcean App Platform
1. Connect GitHub repository
2. Configure build settings
3. Add environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- [ ] Real-time collaboration
- [ ] Task assignments and teams
- [ ] Due dates and reminders
- [ ] File attachments
- [ ] Task categories and tags
- [ ] Advanced search and filtering
- [ ] Dark mode theme
- [ ] Mobile app with React Native
- [ ] Email notifications
- [ ] Calendar integration

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify your connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure network connectivity

2. **Authentication Issues**
   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your domain

3. **Build Errors**
   - Clear `.next` folder and rebuild
   - Verify all dependencies are installed

### Getting Help

- Check the GitHub Issues
- Review MongoDB Atlas documentation
- Consult Next.js documentation

---

Built with ❤️ using Next.js, MongoDB, and Docker
