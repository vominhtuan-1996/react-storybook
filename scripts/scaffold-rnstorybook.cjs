#!/usr/bin/env node
/**
 * Scaffold a new .rnstorybook component package.
 * Usage: node scripts/scaffold-rnstorybook.js <ComponentName> [--out packages]
 */
const fs = require('fs');
const path = require('path');

function toPascalCase(input) {
  return input
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (c) => c.toUpperCase());
}

function toKebabCase(input) {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const positional = args.filter((a) => !a.startsWith('--'));
  const outIndex = args.indexOf('--out');
  const out = outIndex !== -1 ? args[outIndex + 1] : 'packages';

  if (positional.length === 0) {
    console.error('Usage: node scripts/scaffold-rnstorybook.js <ComponentName> [--out packages]');
    process.exit(1);
  }

  return { rawName: positional[0], out };
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`created ${path.relative(process.cwd(), filePath)}`);
}

function templates(name, kebab) {
  const packageJson = `{
  "name": "@rnstorybook/${kebab}",
  "version": "0.1.0",
  "description": "${name} component for RN Storybook Hub",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "peerDependencies": {
    "react": "*",
    "react-native": "*"
  },
  "keywords": ["rnstorybook", "${kebab}"]
}
`;

  const metadataJson = `{
  "name": "${name}",
  "version": "0.1.0",
  "tags": [],
  "category": "uncategorized",
  "preview": "assets/preview.png"
}
`;

  const readme = `# ${name}

## Install

\`\`\`bash
npm install @rnstorybook/${kebab}
\`\`\`

## Usage

\`\`\`tsx
import { ${name} } from '@rnstorybook/${kebab}';

<${name} />
\`\`\`
`;

  const changelog = `# Changelog

## 0.1.0
- Initial scaffold.
`;

  const componentTsx = `import { ${name}Props } from './${name}.types';
import { styles } from './${name}.styles';

export const ${name} = (props: ${name}Props) => {
  return null;
};
`;

  const typesTs = `export interface ${name}Props {
  testID?: string;
}
`;

  const stylesTs = `import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {},
});
`;

  const indexTs = `export { ${name} } from './${name}';
export type { ${name}Props } from './${name}.types';
`;

  const stories = `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from '../src/${name}';

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
};

export default meta;
type Story = StoryObj<typeof ${name}>;

export const Default: Story = {
  args: {},
};
`;

  return {
    packageJson,
    metadataJson,
    readme,
    changelog,
    componentTsx,
    typesTs,
    stylesTs,
    indexTs,
    stories,
  };
}

function scaffold(rawName, outDir) {
  const name = toPascalCase(rawName);
  const kebab = toKebabCase(name);
  const root = path.resolve(process.cwd(), outDir, `${name}.rnstorybook`);

  if (fs.existsSync(root)) {
    console.error(`already exists: ${path.relative(process.cwd(), root)}`);
    process.exit(1);
  }

  const t = templates(name, kebab);

  writeFile(path.join(root, 'package.json'), t.packageJson);
  writeFile(path.join(root, 'metadata.json'), t.metadataJson);
  writeFile(path.join(root, 'README.md'), t.readme);
  writeFile(path.join(root, 'CHANGELOG.md'), t.changelog);
  writeFile(path.join(root, 'stories', `${name}.stories.tsx`), t.stories);
  writeFile(path.join(root, 'src', `${name}.tsx`), t.componentTsx);
  writeFile(path.join(root, 'src', `${name}.types.ts`), t.typesTs);
  writeFile(path.join(root, 'src', `${name}.styles.ts`), t.stylesTs);
  writeFile(path.join(root, 'src', 'index.ts'), t.indexTs);

  ['assets', 'mocks', 'examples', 'tests'].forEach((dir) => {
    const gitkeep = path.join(root, dir, '.gitkeep');
    writeFile(gitkeep, '');
  });

  console.log(`\ndone: ${path.relative(process.cwd(), root)}`);
}

const { rawName, out } = parseArgs(process.argv);
scaffold(rawName, out);
