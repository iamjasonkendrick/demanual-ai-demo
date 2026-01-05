# demanual-ai

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Biome** - Linting and formatting
- **Husky** - Git hooks for code quality

## Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.

## Project Structure

```
demanual-ai/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
```

## Routes

| Route                  | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `/`                    | Main workflow editor page with drag-and-drop node canvas |
| `/login`               | User login page                                          |
| `/signup`              | User registration page                                   |
| `/auth/reset-password` | Password reset page                                      |

## Available Scripts

- `bun run dev`: Start all applications in development mode
- `bun run build`: Build all applications
- `bun run dev:web`: Start only the web application
- `bun run check-types`: Check TypeScript types across all apps
- `bun run check`: Run Biome formatting and linting
