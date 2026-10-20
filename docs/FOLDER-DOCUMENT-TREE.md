# Folder and Document Tree

The AI Second Brain workspace uses a clickable document tree as the primary navigation model.

## Node hierarchy

```text
Workspace
├── Folder
│   ├── Subfolder
│   │   ├── Document
│   │   ├── Component
│   │   └── Subcomponent
│   ├── Design Document
│   ├── Markdown
│   ├── UML
│   ├── Code
│   ├── Tests
│   └── Artifacts
└── Folder
```

## Stable node identity

Every node has:

- `id` — stable machine identifier
- `number` — human-readable numeric identifier
- `name` — display name
- `key` — route/configuration key
- `kind` — folder, document, component, subcomponent, design, markdown, UML, code, asset, test, config, or sticky
- `parentId` — parent tree node
- `folderId` — owning folder where applicable
- `path` — workspace path
- `children` — child node IDs
- `documentStyle` — editor presentation style

## Interaction

- Click a folder to expand or collapse its branch.
- Click a document to open it in the main workspace.
- Use the `+` control to create content beneath a folder.
- Use the open control to focus a node from any tree branch.
- The breadcrumb path shows the complete folder hierarchy for the selected node.
- Mobile layouts use larger touch targets and a collapsible tree panel.

## Document types

The tree is designed to hold the complete development record:

- source files
- components and subcomponents
- Markdown files
- design documents
- UML diagrams
- configuration files
- tests
- build artifacts
- generated reports
- sticky notes
- imported files
- project documentation

## Implementation

The registry is defined in `src/folder-ui/documentTree.ts`, the node model in `src/folder-ui/treeTypes.ts`, and the interactive renderer in `src/folder-ui/DocumentTree.tsx`.

The main workspace mounts the tree directly beside the application sidebar, making the tree a live navigation surface rather than a placeholder.
