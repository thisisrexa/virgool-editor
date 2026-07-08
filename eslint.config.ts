import type { Linter } from 'eslint';

import { defineConfig } from '@fullstacksjs/eslint-config';

export default defineConfig({
  typescript: {
    tsconfigRootDir: import.meta.dirname,
  },
  rules: {
    'max-lines-per-function': 'off',
  },
}) as Linter.Config;
