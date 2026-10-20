# AI Second Brain Editor Shell

The desktop/web shell uses a VS Code-inspired interaction model without copying VS Code's proprietary UI. The shell is the shared navigation layer for projects, workshops, repositories, agents, terminals, extensions, Git, builds, tests, memory, and settings.

## Global navigation

- Projects
- Workshops
- Agents
- Clusters
- Extensions
- Models
- Memory
- GitHub
- Terminal
- Builds
- Tests
- Files
- Account
- Settings

## Workshop chrome

Each workshop has:

- user-defined name tab
- permanent `WORKSHOP-xxxxx` identifier
- environment badge
- repository badge
- branch/worktree indicator
- Ollama/model indicator
- agent activity indicator
- unsaved-change indicator

## Menus

### File
New Project, New Workshop, Open Repository, Clone Repository, Save Workspace, Close Workshop, Export Workspace.

### Edit
Undo, Redo, Cut, Copy, Paste, Find, Replace, Command History.

### View
Explorer, Search, Source Control, Run, Extensions, Agents, Terminal, Problems, Output, Memory, Cluster Graph.

### Workshop
Rename, Duplicate, Environment, Repository, Agents, Extensions, Memory, Permissions, Resources, Suspend, Resume, Close.

### Run
Run Task, Build, Test, Debug, Package, Stop, Restart.

### Git
Status, Branch, Commit, Pull, Push, Stash, Diff, Worktree.

### Agent
New Agent, Clone Agent, Assign Agent, Start, Pause, Resume, Retry, Stop, Permissions.

### Help
Documentation, Keyboard Shortcuts, Diagnostics, About, Release Notes.

## Safety

Operations that can modify files, execute commands, install extensions, change dependencies, commit, push, or delete data are routed through the workshop permission policy. The UI must show the affected workshop and repository before confirmation.
