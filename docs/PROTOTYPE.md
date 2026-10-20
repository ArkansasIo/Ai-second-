# Prototype Architecture

## Core flow

```text
User
  -> Project
  -> Agent Team
  -> Project Memory
  -> Artifacts / Source
  -> Diff Review
  -> Tests / Build
  -> Git Commit
  -> GitHub Push
```

## Artifact types

- UML diagrams
- Blueprints
- Markdown and README files
- Design and requirements documents
- Source code
- Tests
- Research records
- Configuration and data

## Agent roles

- Architect
- UML
- Coding
- Research
- Documentation
- Testing
- Build / DevOps

## Safety model

The prototype defaults to review-before-write for destructive filesystem operations, commits, merges, and GitHub pushes. Project-level policies can later enable controlled autonomous operation.

## Operating modes

- Local/offline
- Online
- Hybrid

## GitHub model

The planned GitHub integration supports up to five connected accounts, multiple repositories per account, and project/repository mappings.
