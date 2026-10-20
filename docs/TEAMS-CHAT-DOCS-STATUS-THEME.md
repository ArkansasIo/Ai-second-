# Teams, Chat, Documents, Status & Themes

## Teams

Teams group AI employees and human collaborators by department, project, or function. Teams support owners, members, roles, workload, shared memory, channels, goals, and permissions.

Examples: Engineering, Game Studio, Research, Design, QA, Operations, Finance, Marketing.

## Team Chat

Chat supports team channels, direct agent conversations, project rooms, cluster rooms, and task threads. Messages can reference tasks, files, commits, builds, agents, and documents.

Chat actions include mention, assign, summarize, create task, attach artifact, hand off, approve, and escalate.

## Chat Log

The Chat Log provides searchable history with filters for team, project, employee, agent, workshop, date, task, and event type. Local-first retention is configurable.

## Documents

Documents are first-class project artifacts. Supported categories include requirements, specifications, meeting notes, research, design documents, architecture, UML, release notes, and generated reports.

Documents can be linked to projects, tasks, employees, teams, chat threads, commits, and releases.

## Status Center

Status is represented at multiple levels:

- System health
- Project health
- Team health
- Employee/agent availability
- Task state
- Build/test state
- Integration health
- Ollama/model state
- Release state

Status badges use semantic states: Healthy, Attention, Blocked, Offline, Running, Paused, and Failed.

## Theme System

The Professional Edition defaults to the white/light theme. A user-selectable dark theme is also supported.

Theme requirements:

- Light: white background, light gray surfaces, charcoal text, blue accents.
- Dark: deep charcoal background, dark gray surfaces, light text, blue accents.
- System: follow the operating-system preference.
- Theme selection is local to the user unless explicitly synchronized.
- Theme changes must preserve accessibility contrast and state meaning.

The UI should provide a theme selector in Settings and a quick toggle in the CTO command header.

## Unified Views

Teams, chat, documents, and status can be presented as grid, table, board, tree, timeline, and chart views where the data supports the representation. The underlying records remain shared so switching views does not duplicate data.
