# Contributing to ChatGPT Clone

Thank you for your interest in contributing to ChatGPT Clone! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please be respectful and professional in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   \`\`\`bash
   git clone https://github.com/your-username/chatgpt-clone.git
   cd chatgpt-clone
   \`\`\`
3. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`
4. **Set up environment variables** as described in README.md
5. **Create a branch** for your feature or bug fix:
   \`\`\`bash
   git checkout -b feature/my-new-feature
   \`\`\`

## Development Guidelines

### Code Style

- We use **TypeScript** for type safety
- Follow **ESLint** rules (run \`npm run lint\`)
- Use **Prettier** for code formatting
- Write **clean, readable code** with meaningful variable names
- Add **comments** for complex logic

### Component Guidelines

- Use **functional components** with hooks
- Follow **ShadCN UI** patterns for new components
- Keep components **small and focused**
- Use **TypeScript interfaces** for props
- Export components from index files when appropriate

### File Organization

\`\`\`
components/
├── ui/ # Reusable UI components
└── chat/ # Feature-specific components

lib/
└── utils/ # Utility functions

app/
├── api/ # API routes
└── (pages)/ # Page components
\`\`\`

### Naming Conventions

- **Components**: PascalCase (e.g., \`ChatMessage.tsx\`)
- **Utilities**: camelCase (e.g., \`formatDate.ts\`)
- **Constants**: UPPER_SNAKE_CASE (e.g., \`MAX_FILE_SIZE\`)
- **Interfaces/Types**: PascalCase with descriptive names

## Testing

Before submitting a pull request:

1. **Test your changes locally**:
   \`\`\`bash
   npm run dev
   \`\`\`
2. **Test in production mode**:
   \`\`\`bash
   npm run build
   npm run start
   \`\`\`
3. **Check for linting errors**:
   \`\`\`bash
   npm run lint
   \`\`\`
4. **Test on multiple devices/browsers**:
   - Desktop (Chrome, Firefox, Safari)
   - Mobile (iOS Safari, Android Chrome)

## Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Update the README.md** if you're adding new features
3. **Ensure your code builds** without errors or warnings
4. **Write a clear PR description**:
   - What changes did you make?
   - Why did you make them?
   - How should reviewers test your changes?
5. **Link related issues** (e.g., "Fixes #123")
6. **Request review** from maintainers

### PR Title Format

Use conventional commit format:

- \`feat: Add new feature\`
- \`fix: Fix bug in chat\`
- \`docs: Update README\`
- \`style: Format code\`
- \`refactor: Refactor component\`
- \`test: Add tests\`
- \`chore: Update dependencies\`

## Feature Requests

To request a new feature:

1. **Check existing issues** to avoid duplicates
2. **Open a new issue** with:
   - Clear description of the feature
   - Use case / motivation
   - Proposed implementation (if applicable)
3. **Wait for discussion** before implementing

## Bug Reports

To report a bug:

1. **Check existing issues** to avoid duplicates
2. **Open a new issue** with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, Node version)

## Development Best Practices

### TypeScript

- Use **strict mode**
- Avoid \`any\` type - use proper types
- Define interfaces for all props and data structures
- Use type inference where appropriate

### React Best Practices

- Use **hooks** instead of class components
- Implement proper **error boundaries**
- Use **memo** for expensive computations
- Avoid prop drilling - use context when needed
- Clean up effects properly

### Performance

- Use **dynamic imports** for code splitting
- Optimize **images** (use Next.js Image component)
- Implement **loading states** for async operations
- Use **debouncing** for frequent events

### Security

- **Never commit** API keys or secrets
- **Validate** all user inputs
- **Sanitize** data before rendering
- Use **HTTPS** in production
- Implement proper **authentication checks**

## Questions?

If you have questions or need help:

1. Check the **README.md**
2. Search **existing issues**
3. Open a **new issue** with your question

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to ChatGPT Clone! 🎉
