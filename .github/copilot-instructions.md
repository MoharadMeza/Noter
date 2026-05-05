# Copilot Instructions — login-register Project

## Component File Structure

Every component lives in its own folder with two files:

- `component-name.component.tsx` — only the component function, no type definitions
- `component-name.d.ts` — all interfaces and types used by the component

Never define `interface` or `type` inside a `.tsx` file. Always extract them to the paired `.d.ts` file.

## Import Order

Imports must be separated into groups with a blank line between each group:

1. React core (`react`)
2. Next.js packages (`next/...`, `next-intl`)
3. Third-party libraries (`@hookform/...`, `zod`, etc.)
4. Internal `@libs/` path alias
5. Internal `@components/` path alias

Example:

```tsx
import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@libs/components/button/button.component'
import { cn } from '@libs/utils/tailwind'

import { MyComponentProps } from '@components/my/my-component'
```

## Code Formatting

Add a blank line between logical blocks inside a component function:

- State declarations
- Hook calls
- Derived values / memoized values
- Handler functions
- `return` statement

Example:

```tsx
const MyComponent = (props: MyComponentProps) => {
  const { value } = props

  const t = useTranslations()
  const queryClient = useQueryClient()

  const isValid = value > 0

  const handleClick = () => {
    // ...
  }

  return <div>{isValid && <button onClick={handleClick}>{t('LABEL')}</button>}</div>
}
```

## Path Aliases

| Alias          | Maps to           |
| -------------- | ----------------- |
| `@libs/`       | `src/libs/`       |
| `@components/` | `src/components/` |
| `@server/`     | `src/server/`     |

## Conditional Rendering

Use the `<Show>` wrapper component for all conditional rendering:

```tsx
import Show from '@libs/components/show/show.component'

// default: mounts immediately, toggles visibility (React Activity under the hood)
<Show when={isOpen}>
  <MyPanel />
</Show>

// unmount mode: fully unmounts when hidden (use for modals/portals that reset state on close)
<Show when={isOpen} mode='unmount'>
  <Modal />
</Show>
```

Never use bare `<Activity>` directly — always go through `<Show>`.
Never use `&&` or ternary for show/hide toggling.

## Arrays and Objects

Use `lodash-es` for working with arrays and objects. It is fully tree-shakeable (ESM-native), so only the functions you import end up in the bundle:

```ts
import { map as lodashMap } from 'lodash-es'
import { filter as lodashFilter } from 'lodash-es'
import { get as lodashGet } from 'lodash-es'
```

## Type Files (`.d.ts`)

- Use only named exports — no `export default`
- Import types from their `.d.ts` file without the extension:
  ```ts
  import { ButtonProps } from '@libs/components/button/button'
  ```
- Extend HTML element attributes when relevant:
  ```ts
  import { ButtonHTMLAttributes } from 'react'
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { ... }
  ```
