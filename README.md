# react-hook-form-shadcn

React Hook Form integration with shadcn/ui components.

## 🎯 Goal

`react-hook-form-shadcn` provides **React Hook Form adapters** for apps built with [shadcn/ui](https://ui.shadcn.com), similar to how [`react-hook-form-mui`](https://github.com/dohomi/react-hook-form-mui) integrates with Material UI.

Unlike MUI, shadcn/ui is **not a package**, but a set of local components.
Therefore, this package must remain **UI-agnostic** and rely on a **registry provider** where consumers inject their own components.

## 🧩 Architecture Overview

### Key Difference from `react-hook-form-mui`

| Aspect        | MUI Version                           | Shadcn Version                                                  |
| ------------- | ------------------------------------- | --------------------------------------------------------------- |
| UI Library    | External dependency (`@mui/material`) | Local components copied into the app                            |
| Integration   | Imports MUI components directly       | Uses a **registry provider** to access user-provided components |
| Customization | Limited to MUI theme system           | Fully customizable (user defines Tailwind/shadcn variants)      |

## Development Setup

### Prerequisites

- Node.js 20+
- Yarn 4.10+

### Installation

```bash
yarn install
```

## Available Scripts

### Development

- `yarn dev` - Start TypeScript compiler in watch mode
- `yarn type-check` - Run TypeScript type checking

### Building

- `yarn build` - Build the package for ES modules with Rollup
- Output: `dist/index.js` and `dist/index.d.ts`

### Testing

- `yarn test` - Run all tests with Jest

### Linting & Formatting

- `yarn lint` - Run ESLint to check code quality
- `yarn lint:fix` - Run ESLint and auto-fix issues
- `yarn format` - Format code with Prettier

## Publishing

The package is configured to publish ES modules to npm. Before publishing:

1. Update version in `package.json`
2. Run `yarn build` to generate `dist/` files
3. Ensure all tests pass: `yarn test`
4. Ensure code quality: `yarn lint`

Only the files specified in `package.json`'s `files` field will be included in the npm package.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `yarn lint:fix` to format your code
4. Run `yarn test` to ensure tests pass
5. Submit a pull request

## License

MIT
