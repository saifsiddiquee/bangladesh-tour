# Coding Standards

## TypeScript (Strict Mode)
- **No `any`**: Strictly define all types. Use `unknown` if the type is truly unknown, and use type narrowing before usage.
- **Explicit Return Types**: All exported functions and React components must have explicit return types.
- **Discriminated Unions**: Prefer discriminated unions over complex conditional types or multiple boolean flags for variant states.

```typescript
// Example: Discriminated Union
type Result =
  | { status: 'success'; data: Destination[] }
  | { status: 'error'; error: Error };
```

## SOLID Principles in React
- **Single Responsibility Principle (S)**: One component = one responsibility. Break large components into smaller, focused ones.
- **Open/Closed Principle (O)**: Extend components via composition (`children`) and props rather than modifying their internal logic.
- **Liskov Substitution Principle (L)**: Components accepting the same prop interface should be interchangeable without breaking the app.
- **Interface Segregation Principle (I)**: Keep prop interfaces focused. Avoid passing large "god objects" if a component only needs specific fields.
- **Dependency Inversion Principle (D)**: Components should depend on data abstractions (TypeScript types/interfaces), not concrete implementations or direct data sources.

## Naming Conventions
- **Components**: `PascalCase.tsx` (e.g., `DestinationCard.tsx`).
- **Utilities/Hooks**: `camelCase.ts` (e.g., `useScrollProgress.ts`, `formatDate.ts`).
- **Routes**: `kebab-case` (e.g., `app/destinations/[slug]/page.tsx`).
- **Types**: `PascalCase` with descriptive names (e.g., `Destination`, `CategoryList`).

## Import Ordering
Maintain a consistent import order in all files:
1. React / Next.js core (`react`, `next/link`, etc.)
2. External libraries (`framer-motion`, `gsap`, etc.)
3. Internal libraries and utilities (`@/lib/utils`, etc.)
4. Components (`@/components/ui/Button`, etc.)
5. Types (`@/types`, etc.)
6. Styles (`./styles.css`, etc.)

## Component Patterns
- **Named Exports**: Prefer named exports over default exports for everything except Next.js App Router specific files (pages, layouts, etc., which require default exports).
- **Co-locate Types**: Define types specific to a component within the same file or a closely adjacent `types.ts` file if shared among a few related components.
- **Extract Logic**: For complex Client Components, extract state management and side effects into custom hooks to keep the component rendering focused.

## Error Handling
- Use Next.js `error.tsx` boundaries to gracefully catch and display errors.
- Ensure error boundaries log errors appropriately (even if just to `console.error` for now).

## Accessibility (a11y)
- **WCAG 2.1 AA Compliance**: Strive for at least AA level compliance.
- **Semantic HTML**: Use correct HTML tags (`<nav>`, `<main>`, `<article>`, `<button>`).
- **ARIA**: Use ARIA attributes only when semantic HTML falls short. Ensure interactive elements have `aria-label` or text content.
- **Keyboard Navigation**: All interactive elements must be keyboard accessible and have visible focus states.
- **Animations**: Respect `prefers-reduced-motion` for Framer Motion and GSAP animations.

## Performance Rules (Vercel Best Practices)
- **Avoid Barrel Imports**: Avoid importing from `index.ts` files that re-export many modules, as it can hinder tree-shaking in some setups. Import directly from the specific file when possible.
- **`React.cache`**: Use `React.cache` for deduplicating data requests in Server Components.
- **Parallel Fetches**: Await multiple asynchronous data fetches concurrently using `Promise.all` rather than sequentially.
- **Minimize Client Serialization**: Pass only the necessary data as props from Server Components to Client Components to keep the serialized payload small.

## Git Commit Conventions
Follow Conventional Commits:
- `feat:` for new features.
- `fix:` for bug fixes.
- `docs:` for documentation changes.
- `style:` for formatting, missing semi-colons, etc.
- `refactor:` for refactoring production code.
- `perf:` for performance improvements.
- `chore:` for updating build tasks, package manager configs, etc.
