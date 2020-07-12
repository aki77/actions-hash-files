# @aki77/actions-replace-comment

## Usage

```typescript
import * as core from '@actions/core'
import { hashFiles } from '@aki77/actions-hash-files'

async function run(): Promise<void> {
  const hash = await hashFiles(['yarn.lock', 'src/**/*.ts'])
  core.debug(hash)
}
```
