# Project Structure

This document explains the organization and architecture of the ChatGPT Clone project.

## 📂 Directory Overview

\`\`\`
chatgpt-clone/
├── app/ # Next.js 15 App Router
├── components/ # React components
├── lib/ # Utility functions and integrations
├── hooks/ # Custom React hooks
├── types/ # TypeScript type definitions
├── public/ # Static assets
└── configuration files # Various config files
\`\`\`

## 🗂️ Detailed Structure

### `/app` Directory

The App Router directory contains all pages and API routes.

\`\`\`
app/
├── (auth)/ # Authentication routes group
│ ├── sign-in/
│ │ └── [[...sign-in]]/
│ │ └── page.tsx # Sign in page
│ └── sign-up/
│ └── [[...sign-up]]/
│ └── page.tsx # Sign up page
│
├── api/ # API routes
│ ├── chat/
│ │ └── route.ts # Main chat API (streaming)
│ ├── conversations/
│ │ ├── route.ts # List/create conversations
│ │ └── [id]/
│ │ └── route.ts # Get/update/delete conversation
│ ├── messages/
│ │ ├── route.ts # List/create messages
│ │ └── [id]/
│ │ ├── route.ts # Update/delete message
│ │ └── after/
│ │ └── route.ts # Delete messages after this one
│ └── upload/
│ └── route.ts # File upload API
│
├── chat/
│ └── page.tsx # Main chat page
│
├── globals.css # Global styles & CSS variables
├── layout.tsx # Root layout with providers
└── page.tsx # Home page (redirects to chat)
\`\`\`

### `/components` Directory

Reusable React components organized by feature.

\`\`\`
components/
├── chat/ # Chat-specific components
│ ├── chat-area.tsx # Main chat display area
│ ├── chat-input.tsx # Message input with file upload
│ ├── chat-interface.tsx # Chat container & state management
│ ├── chat-message.tsx # Individual message bubble
│ ├── chat-skeleton.tsx # Loading skeleton
│ └── sidebar.tsx # Conversation sidebar
│
├── ui/ # Reusable UI components (ShadCN)
│ ├── avatar.tsx
│ ├── button.tsx
│ ├── dialog.tsx
│ ├── dropdown-menu.tsx
│ ├── input.tsx
│ ├── scroll-area.tsx
│ ├── separator.tsx
│ ├── textarea.tsx
│ ├── toast.tsx
│ ├── toaster.tsx
│ └── tooltip.tsx
│
└── theme-provider.tsx # Theme context provider
\`\`\`

### `/lib` Directory

Utility functions, database helpers, and third-party integrations.

\`\`\`
lib/
├── cloudinary.ts # Cloudinary file upload integration
├── db-helpers.ts # MongoDB CRUD operations
├── mem0-integration.ts # Mem0 AI memory integration (optional)
├── mongodb.ts # MongoDB connection setup
└── utils.ts # General utility functions
\`\`\`

### `/hooks` Directory

Custom React hooks for shared logic.

\`\`\`
hooks/
└── use-toast.ts # Toast notification hook
\`\`\`

### `/types` Directory

TypeScript type definitions.

\`\`\`
types/
└── index.ts # Global type definitions
\`\`\`

### Root Configuration Files

\`\`\`
├── .eslintrc.json # ESLint configuration
├── .gitignore # Git ignore rules
├── .prettierrc # Prettier configuration
├── middleware.ts # Clerk authentication middleware
├── next.config.ts # Next.js configuration
├── package.json # Dependencies and scripts
├── postcss.config.mjs # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── vercel.json # Vercel deployment configuration
\`\`\`

## 🏗️ Architecture Patterns

### 1. Server Components by Default

- Most components are React Server Components
- Client components are explicitly marked with \`"use client"\`
- Minimizes JavaScript sent to the browser

### 2. API Route Organization

- RESTful API design
- Separate routes for different resources
- Consistent error handling
- Proper HTTP status codes

### 3. Database Abstraction

All database operations are abstracted in \`lib/db-helpers.ts\`:

\`\`\`typescript
// Instead of writing MongoDB queries everywhere:
await db.collection("messages").find(...)

// We use helper functions:
await getMessages(conversationId)
\`\`\`

### 4. Component Composition

Components are small and focused:

\`\`\`
ChatInterface (container)
├── Sidebar (navigation)
└── ChatArea (main content)
├── ChatMessage (display)
└── ChatInput (input)
\`\`\`

### 5. Type Safety

- All components have TypeScript interfaces
- API routes use typed request/response
- Database schemas are typed
- Environment variables are typed

## 📊 Data Flow

### Message Sending Flow

\`\`\`
User types message
↓
ChatInput component
↓
ChatArea handler
↓
Create/Get conversation → MongoDB
↓
Save user message → MongoDB
↓
Call /api/chat → OpenAI API
↓
Stream response → UI
↓
Save assistant message → MongoDB
↓
Update conversation timestamp
\`\`\`

### File Upload Flow

\`\`\`
User selects file
↓
ChatInput component
↓
POST /api/upload
↓
Upload to Cloudinary
↓
Return URL
↓
Attach URL to message
↓
Display in message
\`\`\`

## 🎨 Styling Architecture

### CSS Variables

Global theme colors in \`app/globals.css\`:

\`\`\`css
:root {
--background: 0 0% 100%;
--foreground: 0 0% 3.9%;
/_ ... more variables _/
}

.dark {
--background: 0 0% 8%;
--foreground: 0 0% 98%;
/_ ... dark mode overrides _/
}
\`\`\`

### Tailwind Utilities

- Custom utilities in \`tailwind.config.ts\`
- ShadCN components use \`cn()\` helper
- Responsive design with Tailwind breakpoints

### Component Styling

\`\`\`typescript
// Using cn() helper for conditional classes
className={cn(
"base-classes",
isActive && "active-classes",
className
)}
\`\`\`

## 🔐 Authentication Flow

\`\`\`
User visits site
↓
middleware.ts checks authentication
↓
If not authenticated → /sign-in
↓
Clerk handles sign-in/sign-up
↓
Redirect to /chat
↓
All API routes verify authentication
\`\`\`

## 🚀 Performance Optimizations

### 1. Code Splitting

- Dynamic imports for large components
- Route-based splitting automatic with Next.js

### 2. Image Optimization

- Next.js Image component for all images
- Cloudinary serves optimized images

### 3. Streaming

- Server-Sent Events for AI responses
- Immediate user feedback

### 4. Caching

- MongoDB queries are not cached (real-time data)
- Static assets cached by Vercel
- API routes can add cache headers

## 🧪 Testing Strategy

### Unit Tests (Recommended to Add)

- Test utility functions in \`lib/\`
- Test React hooks
- Test API route handlers

### Integration Tests

- Test complete user flows
- Test API endpoints with real database

### E2E Tests

- Test critical user journeys
- Sign up → Chat → Upload → Edit

## 📈 Scalability Considerations

### Database

- MongoDB indexes on frequently queried fields
- Consider pagination for message lists
- Archive old conversations

### API

- Rate limiting for API routes
- Caching for conversation lists
- Queue system for background tasks

### Files

- CDN delivery via Cloudinary
- Consider file size limits
- Implement file cleanup

## 🔍 Monitoring

### Recommended Tools

- **Vercel Analytics**: Traffic and performance
- **Sentry**: Error tracking
- **MongoDB Atlas**: Database monitoring
- **OpenAI Dashboard**: API usage and costs

## 📚 Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)

---

For questions about the project structure, open an issue on GitHub.
