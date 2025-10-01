# Quick Start Guide

Get your ChatGPT Clone up and running in 5 minutes!

## 📦 Installation

\`\`\`bash

# Clone the repository

git clone https://github.com/yourusername/chatgpt-clone.git
cd chatgpt-clone

# Install dependencies

npm install
\`\`\`

## 🔑 Essential Setup

### 1. Create accounts (if you don't have them):

- **Clerk**: [clerk.com](https://clerk.com) - Authentication
- **OpenAI**: [platform.openai.com](https://platform.openai.com) - AI API
- **MongoDB**: [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) - Database
- **Cloudinary**: [cloudinary.com](https://cloudinary.com) - File storage

### 2. Get API Keys

Create a \`.env\` file in the root directory:

\`\`\`env

# Clerk (from clerk.com dashboard)

NEXT*PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test*...
CLERK*SECRET_KEY=sk_test*...

# URLs (keep these as is)

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# OpenAI (from platform.openai.com/api-keys)

OPENAI_API_KEY=sk-...

# MongoDB (from MongoDB Atlas connection string)

MONGODB_URI=mongodb+srv://...

# Cloudinary (from cloudinary.com/console)

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# App URL

NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## 🚀 Run the App

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✅ First Steps

1. **Sign Up**: Click "Get Started" and create an account
2. **Start Chatting**: Type a message and hit Enter
3. **Upload Files**: Click the paperclip icon to upload images or documents
4. **Edit Messages**: Hover over your messages and click "Edit"
5. **New Chat**: Click "New Chat" in the sidebar

## 🎨 Customize

### Change AI Model

Edit \`app/api/chat/route.ts\`:

\`\`\`typescript
model: "gpt-4-turbo-preview", // Change to gpt-3.5-turbo for faster responses
\`\`\`

### Change Theme Colors

Edit \`app/globals.css\` - modify the CSS variables under \`:root\`.

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## 🐛 Common Issues

**"Unauthorized" error?**
→ Check your Clerk keys in \`.env\`

**"MongoDB connection failed"?**
→ Check your MongoDB URI and IP whitelist

**File upload not working?**
→ Verify Cloudinary credentials

**Still having issues?**
→ Open an issue on GitHub

## 🎉 That's it!

You now have a fully functional ChatGPT clone running locally!

---

**Need help?** Open an issue or check the documentation.
