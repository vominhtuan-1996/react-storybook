# RN Storybook Hub Architecture

## Goal
Internal portal to publish, search, preview and download `.rnstorybook` packages distributed as `.tgz`.

## Tech Stack
- Frontend: Next.js
- Database: Supabase PostgreSQL
- Authentication: Supabase Auth
- Storage: Supabase Storage
- Optional Backend Logic: Supabase Edge Functions

## High Level Flow

```text
RN Storybook Generator
        │
Generate .rnstorybook
        │
Build
        ▼
component-x.y.z.tgz
        │
Upload
        ▼
Next.js Admin
        │
Edge Function
        ├──────────────┐
        ▼              ▼
 Supabase Storage   Supabase Database
        │              │
        └──────┬───────┘
               ▼
      RN Storybook Hub
               │
     Search / Preview / Download
               │
               ▼
         Mobile Developers
```

## Storage

Bucket: `storybook-packages`

```
storybook-packages/
  button/
    1.0.0/
      package.tgz
      preview.png
      preview.gif
      screenshots/
```

## Database Schema

### packages
- id
- name
- slug
- category
- description
- author
- latest_version
- cover_image
- created_at
- updated_at

### versions
- id
- package_id
- version
- storage_path
- package_json
- metadata_json
- dependencies
- react_native_version
- storybook_version
- downloads
- created_at

### categories
- id
- name
- icon

### tags
- id
- name

### package_tags
- package_id
- tag_id

### screenshots
- id
- version_id
- image_url
- sort_order

### release_notes
- id
- version_id
- markdown

## TGZ Specification

```
package.tgz
├── package.json
├── metadata.json
├── README.md
├── CHANGELOG.md
├── preview.png
├── preview.gif
├── screenshots/
├── stories/
├── src/
└── assets/
```

### metadata.json

```json
{
  "name": "Button",
  "version": "1.0.0",
  "category": "Form",
  "description": "Primary button",
  "reactNative": "0.81",
  "storybook": "8",
  "tags": ["button","primary"]
}
```

## Upload Flow

1. Upload `.tgz`
2. Extract temporary
3. Read package.json
4. Read metadata.json
5. Read README.md
6. Upload assets to Storage
7. Insert metadata into Database
8. Publish package

## Website Features

- Search
- Categories
- Package Detail
- README Rendering
- Preview Images/GIF
- Version History
- Download TGZ
- Install Command
- Download Counter

## Roles

Viewer
- Read
- Download

Editor
- Upload
- Edit metadata

Admin
- Full access

## Folder Structure

```
apps/
  web/
  admin/
  cli/

supabase/
  migrations/
  functions/
    upload-package/
    publish-version/
    download-counter/

packages/
  ui/
  types/
  utils/
```

## Future CLI

```bash
rnstorybook search button
rnstorybook install button
rnstorybook update
```

## Design Principles

- TGZ is the source of truth.
- Database stores metadata only.
- Storage stores binaries and assets.
- One package supports multiple versions.
- latest_version identifies the default install.
- README is rendered from package content.
- Preview assets are extracted automatically.
- Claude/AI agents should treat this document as the canonical architecture for the RN Storybook Hub.
