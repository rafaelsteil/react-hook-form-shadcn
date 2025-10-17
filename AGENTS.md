# AGENTS.md

## Project Overview

This is a React Hook Form integration library with shadcn/ui components. It provides seamless integration between React Hook Form and shadcn/ui for building beautiful, accessible forms with powerful form state management.

## Setup Commands

- Install deps: `yarn install`
- Start dev (TypeScript watch mode): `yarn dev`
- Build package: `yarn build`
- Run tests: `yarn test`
- Run tests in watch mode: `yarn test:watch`
- Check types: `yarn type-check`
- Lint code: `yarn lint`
- Format code: `yarn format`

## Code Style

- **TypeScript**: Strict mode enabled (`tsconfig.json` has `"strict": true`)
- **Quotes**: Single quotes, no semicolons (enforced by Prettier and ESLint)
- **Import order**: Organized groups (builtin → external → internal → parent → sibling → index)
- **Print width**: 120 characters
- **Trailing commas**: ES5 style
- **JSX**: Single quotes for JSX attributes

## Development Environment Tips

- The project uses **Yarn 4.10+** exclusively - never use npm
- TypeScript watch mode (`yarn dev`) automatically compiles changes in the `src` directory to `dist`
- Use `yarn type-check` to validate TypeScript types without emitting files
- All source files are in `src/`, tests are in `__tests__/`
- Import path alias `@/*` maps to `src/*` for cleaner imports

## Testing Instructions

- Run all tests: `yarn test`
- Test configuration uses Jest with ts-jest for TypeScript support
- Test files should be located in `__tests__/` directory
- Always run `yarn test` before committing to ensure all tests pass

## Code Quality & Linting

- Run `yarn lint` to check code quality with ESLint
- Run `yarn lint:fix` to automatically fix linting issues
- Run `yarn format` to format code with Prettier
- Type check with `yarn type-check` to catch TypeScript errors
- The ESLint configuration extends `@typescript-eslint/recommended` and integrates with Prettier
- Before submitting changes, ensure:
  - `yarn lint` passes
  - `yarn type-check` shows no errors
  - `yarn test` passes

## Building & Publishing

- Build the library: `yarn build` (uses Rollup to generate ES modules)
- Output files are generated in `dist/`:
  - `dist/index.js` - ES module entry point
  - `dist/index.d.ts` - TypeScript type definitions
- Before publishing to npm:
  1. Update version in `package.json`
  2. Run `yarn build` to generate dist files
  3. Run `yarn test` to ensure tests pass
  4. Run `yarn lint` to ensure code quality
  5. Only files in `package.json`'s `files` field will be included in the npm package
