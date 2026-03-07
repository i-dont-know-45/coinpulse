# Contributing to CoinPulse

First off, thank you for considering contributing to CoinPulse! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs what actually happened
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)

### 💡 Suggesting Features

Feature requests are welcome! Please provide:

- **Clear description** of the feature
- **Use case** - why would this be useful?
- **Possible implementation** if you have ideas

### 🔧 Pull Requests

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Ensure tests pass (if applicable)
4. Update documentation if needed
5. Submit your PR!

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/coinpulse.git
cd coinpulse

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

## Pull Request Process

1. **Branch naming**: Use descriptive names
   - `feature/add-portfolio-tracker`
   - `fix/websocket-reconnection`
   - `docs/update-readme`

2. **Commit messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/)
   ```
   feat: add portfolio tracking feature
   fix: resolve WebSocket disconnection issue
   docs: update installation instructions
   style: format code with prettier
   refactor: simplify chart rendering logic
   test: add unit tests for converter
   chore: update dependencies
   ```

3. **PR description**: Include
   - What changes were made
   - Why the changes were made
   - Any breaking changes
   - Screenshots for UI changes

## Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types/interfaces
- Avoid `any` type

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop typing

### CSS/Tailwind

- Use Tailwind CSS utilities
- Follow existing naming conventions
- Keep styles consistent with the design system

### Code Formatting

```bash
# Run linter
npm run lint

# Format code (if prettier is set up)
npm run format
```

## 🙏 Thank You!

Your contributions make CoinPulse better for everyone!
