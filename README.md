# DOB4DIE - Adaptive Learning Platform

A modern, AI-powered adaptive learning platform built with React, TypeScript, and Vite. This platform provides personalized learning experiences with real-time analytics, intelligent assessments, and gamification features.

## 🚀 Features

- **AI-Powered Assessments**: Personalized quizzes and assignments based on learning profiles
- **Real-time Analytics**: Track progress with detailed analytics and performance metrics
- **Smart Recommendations**: AI-driven study suggestions and topic recommendations
- **Multi-role Support**: Student, Teacher, and Admin interfaces
- **Achievement System**: Badges, streaks, and achievements to motivate learning
- **Adaptive Learning**: Content that evolves with your learning style and pace
- **Modern UI**: Beautiful, responsive design with dark mode and animations
- **Accessibility**: Full accessibility support with screen reader compatibility

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Forms**: React Hook Form with Zod validation

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- **Git** (for version control) - [Download here](https://git-scm.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/knowledgeflow-kit-47.git
cd knowledgeflow-kit-47
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Open in Browser

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ai/             # AI chat components
│   ├── analytics/      # Analytics and charts
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   ├── effects/        # Visual effects (particles, etc.)
│   ├── gamification/   # Leaderboards, achievements
│   ├── layout/         # Layout components (navbar, etc.)
│   ├── performance/    # Performance monitoring
│   └── ui/             # Base UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── Auth.tsx        # Authentication page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Index.tsx       # Landing page
│   └── NotFound.tsx    # 404 page
├── App.tsx             # Main app component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Components

### Landing Page
- Hero section with animated logo
- Feature showcase
- Call-to-action sections
- Responsive design

### Dashboard
- **Overview Tab**: Progress cards, subject charts, recent assessments
- **Analytics Tab**: Advanced performance analytics
- **Leaderboard Tab**: Gamification and competition features

### Authentication
- Sign in/Sign up forms
- Role selection (Student/Teacher/Admin)
- Form validation with React Hook Form

## 🎯 Features in Detail

### AI-Powered Learning
- Intelligent assessment generation
- Personalized study recommendations
- Adaptive difficulty adjustment
- Real-time progress tracking

### Analytics Dashboard
- Subject-wise performance tracking
- Question difficulty analysis
- Time-based progress charts
- Achievement tracking

### Gamification
- Badge system
- Streak tracking
- Leaderboards
- Achievement notifications

## 🔧 Configuration

The project uses several configuration files:

- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Other Platforms
The project can be deployed to any platform that supports static sites or Node.js applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Charts from [Recharts](https://recharts.org/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**DOB4DIE** - Adaptive Learning. Personalized for You. 🎓✨