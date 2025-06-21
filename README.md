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
- **Authentication**: Clerk Authentication
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js v18+ and npm
- PostgreSQL database (or Neon Database account)
- Google Gemini API key
- Clerk account for authentication

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
   VITE_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
   CLERK_SECRET_KEY="your-clerk-secret-key"
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

## Deployment to Vercel

### Prerequisites for Deployment

- A [Vercel](https://vercel.com) account
- A [Neon](https://neon.tech) database (or any PostgreSQL provider)
- A [Google AI Studio](https://ai.google.dev/) account for Gemini API key
- A [Clerk](https://clerk.com) account for authentication

### Steps for Deployment

1. Fork or clone this repository to your GitHub account

2. Log in to your Vercel account and click "New Project"

3. Import your GitHub repository

4. Configure the following environment variables in the Vercel project settings:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
   - `CLERK_SECRET_KEY`: Your Clerk secret key

5. Deploy the project

### Troubleshooting Deployment Issues

If you encounter errors during deployment:

1. **API Key Issues**: Ensure your Gemini API key is valid and has the necessary permissions. Check the Vercel logs for "Forbidden" errors which indicate API key problems.

2. **Database Connection**: Verify your DATABASE_URL is correct and the database is accessible from Vercel's servers. Some database providers require allowing specific IP ranges.

3. **Environment Variables**: Double-check that all required environment variables are set in Vercel's project settings.

4. **Build Failures**: Check the build logs in Vercel for specific error messages. The most common issues are missing dependencies or environment variables.

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Express API
- `/shared` - Shared types and schemas
- `/api` - Serverless functions for Vercel deployment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Shadcn UI](https://ui.shadcn.com/)
- AI capabilities powered by [Google Gemini](https://ai.google.dev/)
- Database hosted on [Neon](https://neon.tech/)
- Authentication by [Clerk](https://clerk.com/)
- Deployed on [Vercel](https://vercel.com/)
