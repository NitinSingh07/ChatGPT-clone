# Getting Started with ChatGPT Clone

Welcome! This guide will help you get the ChatGPT Clone up and running on your local machine.

## ⏱️ Quick Setup (5 minutes)

### Prerequisites

Make sure you have:

- **Node.js 18+** installed ([download](https://nodejs.org/))
- **npm 9+** (comes with Node.js)
- A code editor (we recommend [VS Code](https://code.visualstudio.com/))
- Git installed

### Step 1: Clone and Install

\`\`\`bash

# Clone the repository

git clone https://github.com/yourusername/chatgpt-clone.git
cd chatgpt-clone

# Install dependencies (this may take a few minutes)

npm install
\`\`\`

### Step 2: Get API Keys

You'll need to create accounts and get API keys from these services:

| Service    | Purpose        | Sign Up Link                                               | Time  |
| ---------- | -------------- | ---------------------------------------------------------- | ----- |
| Clerk      | Authentication | [clerk.com](https://clerk.com)                             | 2 min |
| OpenAI     | AI Responses   | [platform.openai.com](https://platform.openai.com)         | 3 min |
| MongoDB    | Database       | [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas) | 5 min |
| Cloudinary | File Storage   | [cloudinary.com](https://cloudinary.com)                   | 2 min |

#### Getting Clerk Keys

1. Go to [clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Choose "Email" as the authentication method
4. Copy the "Publishable key" and "Secret key"

#### Getting OpenAI Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or sign in
3. Go to API keys section
4. Click "Create new secret key"
5. Copy the key (you won't see it again!)

⚠️ **Note**: You'll need to add credit to your OpenAI account to use the API.

#### Getting MongoDB Connection String

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (remember the password!)
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Click "Connect" → "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database user password

#### Getting Cloudinary Keys

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. From the dashboard, copy:
   - Cloud name
   - API Key
   - API Secret

### Step 3: Configure Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`bash

# Copy the example file

cp .env.example .env

# Or create it manually

touch .env
\`\`\`

Add your keys to \`.env\`:

\`\`\`env

# Clerk

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Clerk URLs (keep as is)

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# OpenAI

OPENAI_API_KEY=sk-your_key_here

# MongoDB

MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/chatgpt-clone?retryWrites=true&w=majority

# Cloudinary

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App URL

NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### Step 4: Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 🎉 You're Ready!

### First Steps

1. **Sign Up**: Click "Get Started" and create an account
2. **Start Chatting**: Type "Hello!" and see the AI respond
3. **Upload a File**: Click the paperclip icon and upload an image
4. **Edit a Message**: Hover over your message and click "Edit"
5. **Create Multiple Chats**: Click "New Chat" to start a new conversation

## 🎨 VS Code Setup (Recommended)

Install these VS Code extensions for the best experience:

1. Open VS Code in your project folder
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Extensions: Show Recommended Extensions"
4. Install all recommended extensions

Or install manually:

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **TypeScript and JavaScript Language Features** - Enhanced TS support

## 📱 Testing on Mobile

To test on your mobile device:

1. Find your computer's local IP address:
   \`\`\`bash

   # On Mac/Linux

   ifconfig | grep "inet " | grep -v 127.0.0.1

   # On Windows

   ipconfig
   \`\`\`

2. Update your \`.env\`:
   \`\`\`env
   NEXT_PUBLIC_APP_URL=http://YOUR_IP:3000
   \`\`\`

3. Connect your phone to the same WiFi network

4. Open your browser on your phone and go to `http://YOUR_IP:3000`

## 🔧 Troubleshooting

### "Cannot find module" errors

\`\`\`bash

# Delete node_modules and reinstall

rm -rf node_modules
npm install
\`\`\`

### Port 3000 is already in use

\`\`\`bash

# Use a different port

PORT=3001 npm run dev
\`\`\`

### MongoDB connection fails

- Check your connection string format
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify your database password is correct

### Clerk "Unauthorized" errors

- Double-check your Clerk keys in \`.env\`
- Make sure you copied both the publishable and secret keys
- Restart your development server

### File upload not working

- Verify all three Cloudinary credentials
- Check that your Cloudinary account is active
- Ensure file size is under 10MB

### "Build failed" errors

\`\`\`bash

# Clear Next.js cache

rm -rf .next
npm run dev
\`\`\`

## 🚀 Next Steps

Now that you have it running:

1. **Read the Documentation**

   - [README.md](README.md) - Full documentation
   - [FEATURES.md](FEATURES.md) - Feature details
   - [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Code organization

2. **Customize the App**

   - Change the AI model in \`app/api/chat/route.ts\`
   - Modify theme colors in \`app/globals.css\`
   - Add your own features!

3. **Deploy to Production**

   - Follow the [DEPLOYMENT.md](DEPLOYMENT.md) guide
   - Deploy to Vercel with one click

4. **Contribute**
   - Read [CONTRIBUTING.md](CONTRIBUTING.md)
   - Open issues for bugs or features
   - Submit pull requests

## 📚 Learning Resources

### Next.js

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### React

- [React Documentation](https://react.dev)
- [React Tutorial](https://react.dev/learn)

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

### Tailwind CSS

- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind Components](https://tailwindui.com/components)

## 💡 Tips & Best Practices

### Development Workflow

1. **Always create a new branch for features**
   \`\`\`bash
   git checkout -b feature/my-feature
   \`\`\`

2. **Run linting before committing**
   \`\`\`bash
   npm run lint
   \`\`\`

3. **Test on multiple browsers**

   - Chrome
   - Firefox
   - Safari
   - Edge

4. **Test responsive design**
   - Use browser dev tools
   - Test on actual devices

### Code Quality

- Write TypeScript types for everything
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused
- Follow the existing code style

### Performance

- Use React Server Components when possible
- Optimize images with Next.js Image
- Keep client-side JavaScript minimal
- Use dynamic imports for large components

## ❓ FAQ

**Q: Can I use GPT-3.5 instead of GPT-4?**  
A: Yes! Change the model in \`app/api/chat/route.ts\` to \`gpt-3.5-turbo\`.

**Q: Is this production-ready?**  
A: Yes, but add proper error handling, rate limiting, and monitoring.

**Q: Can I use a different database?**  
A: Yes, but you'll need to rewrite the database helpers in \`lib/db-helpers.ts\`.

**Q: How much does it cost to run?**  
A: See the cost breakdown in [DEPLOYMENT.md](DEPLOYMENT.md).

**Q: Can I self-host everything?**  
A: Yes, but you'll need to replace Clerk with another auth solution and host the database yourself.

## 🆘 Need Help?

If you're stuck:

1. Check the [troubleshooting section](#-troubleshooting) above
2. Search [existing issues](https://github.com/yourusername/chatgpt-clone/issues)
3. Open a [new issue](https://github.com/yourusername/chatgpt-clone/issues/new)
4. Join our community (if available)

## 🎊 Success!

Congratulations on setting up your ChatGPT Clone! You now have a fully functional AI chat application.

**Happy coding! 🚀**

---

Built with ❤️ using Next.js, TypeScript, and OpenAI
