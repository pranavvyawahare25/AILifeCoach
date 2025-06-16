# Fix My Life Agent 🧠

A full-stack AI-powered life coaching web application that helps users analyze recurring challenges, receive personalized insights, and track their personal growth journey.

## Features

### 🔍 AI-Powered Challenge Analysis
- Describe recurring life issues using text or voice input
- Get comprehensive AI insights across 5 key areas:
  - **Root Cause**: Understanding the underlying reasons
  - **Quick Fix**: Immediate actionable solutions
  - **New Habit**: Specific habits to develop
  - **Mindset Shift**: Mental reframing techniques
  - **Long-Term Strategy**: Comprehensive improvement plans

### 🎤 Voice Assistant Integration
- Speech-to-text functionality for hands-free input
- Works in both challenge analysis and journal entry forms
- Browser-based voice recognition (Chrome, Edge, Safari)

### 📖 Personal Journal
- Write daily reflections with voice or text
- Receive AI-powered insights and micro-advice
- Track emotional patterns and progress over time

### 💡 Daily Motivational Nudges
- Curated motivational messages to keep you inspired
- Refresh feature for new inspiration throughout the day
- Category-based messaging system

### 📊 Progress Timeline
- Visual timeline of all your coaching sessions
- Color-coded entries based on challenge types
- Track your growth journey over time

### 🌙 Dark/Light Mode
- Toggle between light and dark themes
- Automatic system preference detection
- Persistent theme settings

## Technology Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Shadcn/ui** component library
- **Web Speech API** for voice recognition

### Backend
- **Express.js** with TypeScript
- **In-memory storage** for demo purposes
- **Drizzle ORM** for type-safe database operations
- **Zod** for validation

### AI Integration
- **Google Gemini API** for intelligent analysis
- Structured prompts for consistent, helpful responses
- Fallback responses for reliability

## Setup Instructions

### Prerequisites
- Node.js 20 or higher
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fix-my-life-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Get your free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to `http://localhost:5000` in your browser

## Usage Guide

### Getting Started
1. Click "Start Your Journey" or navigate to the Analyze tab
2. Describe a recurring challenge you're facing
3. Use the microphone icon for voice input (optional)
4. Select how long the issue has persisted and its impact level
5. Click "Get AI Analysis" to receive personalized insights

### Voice Features
- **Challenge Analysis**: Click the microphone in the problem description field
- **Journal Entries**: Use voice input in the journal textarea
- **Browser Permissions**: Allow microphone access when prompted
- **Supported Browsers**: Chrome, Edge, Safari (Firefox has limited support)

### Navigation
- **Analyze**: Create new challenge analyses
- **Journal**: Write daily reflections and thoughts
- **History**: View your progress timeline
- **Nudges**: Get daily motivation and inspiration

### Dark Mode
- Click the sun/moon icon in the navigation bar
- Theme preference is automatically saved
- Follows system theme by default

## API Endpoints

### Analysis
- `POST /api/analyze-problem` - Analyze a life challenge
- `GET /api/history` - Retrieve analysis history

### Journal
- `POST /api/journal-entry` - Create a journal entry
- `GET /api/journal` - Get journal entries

### Motivation
- `GET /api/nudges` - Get today's motivational nudge
- `POST /api/nudges/random` - Get a random nudge

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and types
│   │   └── App.tsx         # Main application component
├── server/                 # Backend Express application
│   ├── services/           # Business logic services
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Data storage layer
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema definitions
└── README.md
```

## Development

### Adding New Features
1. Define types in `shared/schema.ts`
2. Update storage interface in `server/storage.ts`
3. Add API routes in `server/routes.ts`
4. Create frontend components in `client/src/components/`
5. Update navigation and routing as needed

### Styling Guidelines
- Use Tailwind CSS utility classes
- Include dark mode variants with `dark:` prefix
- Follow the established color scheme (primary, secondary, accent)
- Ensure responsive design with `md:`, `lg:` breakpoints

### Voice Recognition
- Feature automatically detects browser support
- Gracefully degrades when not available
- Provides user feedback for recording states
- Handles errors with toast notifications

## Browser Compatibility

### Voice Recognition Support
- ✅ Chrome (desktop & mobile)
- ✅ Edge (desktop)
- ✅ Safari (desktop & mobile)
- ⚠️ Firefox (limited support)

### General Application
- All modern browsers supporting ES2020+
- Responsive design for mobile and desktop
- Progressive Web App ready

## Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Set the following in your production environment:
- `GEMINI_API_KEY`: Your Google Gemini API key
- `NODE_ENV`: Set to `production`

### Hosting Recommendations
- **Frontend**: Netlify, Vercel, or GitHub Pages
- **Backend**: Railway, Render, or Heroku
- **Database**: For production, consider PostgreSQL with Drizzle ORM

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for intelligent analysis capabilities
- Shadcn/ui for the beautiful component library
- The open-source community for the amazing tools and libraries

---

**Note**: This application is designed for personal development and is not a substitute for professional mental health services. If you're experiencing serious mental health challenges, please consult with a qualified healthcare professional.