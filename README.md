# AILifeCoach

AILifeCoach is an AI-powered personal development application that provides personalized coaching, journaling features, and daily nudges to help users improve their lives.

## Features

- **Personalized AI Coaching**: Get tailored advice for your specific life challenges
- **Smart Journaling**: Record your thoughts with AI-powered reflection insights
- **Daily Nudges**: Receive gentle reminders and motivation to stay on track
- **History Timeline**: Track your progress and growth over time
- **Voice Recording**: Capture your thoughts hands-free with voice input

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL (Neon Database)
- **AI Integration**: Google Gemini API
- **Authentication**: Local authentication with secure password storage

## Getting Started

### Prerequisites

- Node.js v18+ and npm
- PostgreSQL database (or Neon Database account)
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pranavvyawahare25/AILifeCoach.git
   cd AILifeCoach
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="your-postgresql-connection-string"
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. Initialize the database:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Express API
- `/shared` - Shared types and schemas
- `/migrations` - Database migration files

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Shadcn UI](https://ui.shadcn.com/)
- AI capabilities powered by [Google Gemini](https://ai.google.dev/)
- Database hosted on [Neon](https://neon.tech/)
