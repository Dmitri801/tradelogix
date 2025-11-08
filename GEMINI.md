# GEMINI.md

## Project Overview

This is a Next.js application for a trading journal called Tradelogix. It allows users to log and analyze their trades. The application is built with a modern tech stack, including:

*   **Framework:** [Next.js](https://nextjs.org/) with Turbopack
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Database ORM:** [Prisma](https://www.prisma.io/)
*   **API:** [tRPC](https://trpc.io/)
*   **Background Jobs:** [Inngest](https://www.inngest.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
*   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
*   **Authentication:** `better-auth`

The application's data model is centered around the `Trade` and `TradeAction` models, which allow for detailed logging of trading activity.

## Building and Running

### Development

To run the application in development mode, you can use one of the following commands:

*   **`pnpm dev`**: Starts the Next.js development server with Turbopack.
*   **`pnpm dev:all`**: Starts the Next.js development server, Inngest, and Prisma Studio for a complete development environment.
*   **`pnpm dev:studio`**: Starts the Next.js development server and Prisma Studio.

### Database

*   **`pnpm migratedb`**: To run database migrations.
*   **`npx prisma studio`**: To open the Prisma Studio to view and edit data in the database.

### Production

*   **`pnpm build`**: To create a production build of the application.
*   **`pnpm start`**: To start the production server.

### Linting

*   **`pnpm lint`**: To lint the codebase for errors and style issues.

## Development Conventions

*   **Path Aliases:** The project uses the `@/*` path alias to refer to the `src` directory (e.g., `import { db } from '@/lib/db'`).
*   **Styling:** The project uses Tailwind CSS for styling, with components from Shadcn/ui.
*   **API:** The API is built with tRPC, which provides end-to-end typesafe APIs.
*   **Database:** Prisma is used as the ORM for interacting with the PostgreSQL database.
