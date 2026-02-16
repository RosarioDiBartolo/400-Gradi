import { defineConfig } from 'sanity';
import { structureTool  } from 'sanity/structure';

import { schemaTypes } from './schemaTypes';

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const dataset =
  process.env.SANITY_STUDIO_DATASET ??
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  'production';

const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ??
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ??
  '2024-06-01';

if (!projectId) {
  throw new Error(
    'Missing SANITY_STUDIO_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID) in /cms/.env',
  );
}

export default defineConfig({
  name: 'default',
  title: '400 Gradi Menu',
  projectId,
  dataset,
  apiVersion,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('category').title('Categories'),
            S.documentTypeListItem('item').title('Items'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
