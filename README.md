# ChatGPT Clone

A pixel-perfect ChatGPT clone built with modern web technologies, featuring AI-powered conversations, file uploads, message editing, and conversation memory.

![ChatGPT Clone](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### Core Functionality

- 🎨 **Pixel-Perfect UI** - Exact ChatGPT interface clone with smooth animations
- 💬 **Real-time Chat** - Streaming AI responses using Vercel AI SDK
- 🔐 **Authentication** - Secure user authentication with Clerk
- 📝 **Message Editing** - Edit and regenerate messages seamlessly
- 📁 **File Uploads** - Support for images and documents (PNG, JPG, PDF, DOCX, TXT)
- 🧠 **Conversation Memory** - Persistent chat history with MongoDB
- 🎯 **Context Management** - Smart token management for long conversations
- 🌓 **Dark Mode** - Beautiful dark/light theme support
- 📱 **Fully Responsive** - Mobile-friendly design with touch support
- ♿ **Accessible** - ARIA-compliant components

### Technical Features

- **Server Components** - Next.js 15 App Router with React Server Components
- **Streaming Responses** - Real-time AI response streaming
- **Optimistic Updates** - Instant UI feedback for better UX
- **Error Handling** - Comprehensive error handling and recovery
- **Type Safety** - Full TypeScript coverage
- **SEO Optimized** - Server-side rendering and metadata

## 🛠️ Tech Stack

### Framework & Language

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 19](https://react.dev/)** - UI library

### Styling

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[ShadCN UI](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible primitives
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### AI & Chat

- **[Vercel AI SDK](https://sdk.vercel.ai/)** - AI chat streaming
- **[OpenAI API](https://openai.com/)** - GPT-4 Turbo for responses
- **[react-markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering

### Database & Storage

- **[MongoDB](https://www.mongodb.com/)** - NoSQL database for conversations
- **[Cloudinary](https://cloudinary.com/)** - Cloud file storage

### Authentication

- **[Clerk](https://clerk.com/)** - Complete authentication solution

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/chatgpt-clone.git
cd chatgpt-clone
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set Up Environment Variables

Create a \`.env\` file in the root directory and add the following variables:

\`\`\`env

# Clerk Authentication

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# OpenAI API

OPENAI_API_KEY=your_openai_api_key

# MongoDB

MONGODB_URI=your_mongodb_connection_string

# Cloudinary (for file storage)

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Uploadcare (optional alternative)

NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=your_uploadcare_public_key

# Mem0 AI (for enhanced memory - optional)

MEM0_API_KEY=your_mem0_api_key

# App URL

NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 4. Get Your API Keys

#### Clerk Authentication

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy the publishable key and secret key
4. Configure the sign-in/sign-up pages in the Clerk dashboard

#### OpenAI API

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account or sign in
3. Navigate to API keys section
4. Create a new API key
5. Copy the key (keep it secure!)

#### MongoDB

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string
6. Replace \`<password>\` with your database user password

#### Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com) and create an account
2. Get your cloud name, API key, and API secret from the dashboard
3. Add them to your \`.env\` file

### 5. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

\`\`\`
chatgpt-clone/
├── app/ # Next.js App Router
│ ├── (auth)/ # Authentication pages
│ │ ├── sign-in/ # Sign in page
│ │ └── sign-up/ # Sign up page
│ ├── api/ # API routes
│ │ ├── chat/ # Chat endpoint
│ │ ├── conversations/ # Conversation CRUD
│ │ ├── messages/ # Message CRUD
│ │ └── upload/ # File upload endpoint
│ ├── chat/ # Main chat page
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page
├── components/ # React components
│ ├── chat/ # Chat-specific components
│ │ ├── chat-area.tsx # Main chat display
│ │ ├── chat-input.tsx # Message input
│ │ ├── chat-interface.tsx # Chat container
│ │ ├── chat-message.tsx # Message bubble
│ │ ├── chat-skeleton.tsx # Loading state
│ │ └── sidebar.tsx # Conversation sidebar
│ ├── ui/ # UI components (ShadCN)
│ └── theme-provider.tsx # Theme context
├── lib/ # Utility functions
│ ├── cloudinary.ts # Cloudinary integration
│ ├── db-helpers.ts # Database helpers
│ ├── mongodb.ts # MongoDB connection
│ └── utils.ts # General utilities
├── hooks/ # Custom React hooks
│ └── use-toast.ts # Toast notifications
├── public/ # Static assets
├── .env.example # Environment variables template
├── middleware.ts # Clerk middleware
├── next.config.ts # Next.js configuration
├── package.json # Dependencies
├── tailwind.config.ts # Tailwind configuration
├── tsconfig.json # TypeScript configuration
└── README.md # This file
\`\`\`

## 🎯 Key Features Explained

### Message Editing

Users can edit previously sent messages by clicking the "Edit" button. The system will:

1. Update the message in the database
2. Delete all subsequent messages
3. Regenerate the AI response with the edited message

### File Upload Support

The application supports uploading:

- **Images**: PNG, JPG, JPEG, GIF, WebP
- **Documents**: PDF, DOC, DOCX, TXT

Files are uploaded to Cloudinary and URLs are stored with messages.

### Context Window Management

The chat API automatically manages token limits by:

- Limiting history to the last 20 messages
- Implementing a system message for AI behavior
- Supporting up to 8000 tokens for GPT-4 Turbo

### Conversation Memory

- All conversations are stored in MongoDB
- Messages persist across sessions
- Conversations are listed in the sidebar sorted by last activity

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add all environment variables
5. Deploy!

\`\`\`bash

# Or use Vercel CLI

npm install -g vercel
vercel
\`\`\`

### Environment Variables for Production

Make sure to add all environment variables from your \`.env\` file to your Vercel project settings.

### Database Setup for Production

Ensure your MongoDB cluster allows connections from Vercel's IP addresses (or use 0.0.0.0/0 for all IPs).

## 📝 Scripts

\`\`\`bash
npm run dev # Start development server
npm run build # Build for production
npm run start # Start production server
npm run lint # Run ESLint
\`\`\`

## 🎨 Customization

### Changing the AI Model

Edit \`app/api/chat/route.ts\`:

\`\`\`typescript
const response = await openai.chat.completions.create({
model: "gpt-3.5-turbo", // Change to your preferred model
// ...
});
\`\`\`

### Adjusting Theme Colors

Edit \`app/globals.css\` to customize the color palette:

\`\`\`css
:root {
--background: 0 0% 100%;
--foreground: 0 0% 3.9%;
/_ Add your custom colors _/
}
\`\`\`

### Modifying UI Components

All UI components are in \`components/ui/\`. They follow ShadCN's structure and can be customized easily.

## 🐛 Troubleshooting

### Common Issues

**"Unauthorized" error**

- Check your Clerk API keys
- Ensure middleware.ts is properly configured

**"MongoDB connection failed"**

- Verify your MongoDB connection string
- Check if your IP is whitelisted in MongoDB Atlas

**"OpenAI API error"**

- Verify your OpenAI API key
- Check if you have sufficient credits

**File upload fails**

- Verify Cloudinary credentials
- Check file size (max 10MB)
- Ensure file type is supported

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [ChatGPT](https://chat.openai.com/) for UI/UX inspiration
- [ShadCN](https://ui.shadcn.com/) for beautiful components
- [Vercel](https://vercel.com) for the AI SDK
- [Clerk](https://clerk.com) for authentication
- [Dub](https://github.com/dubinc/dub) for code structure inspiration

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
