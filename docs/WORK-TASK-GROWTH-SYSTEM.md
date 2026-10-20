# Work, Task, Integration & Growth System

## Purpose

AI Second Brain treats work as a managed operating system rather than a simple to-do list. Work is represented by goals, projects, tasks, dependencies, employees (AI agents), integrations, metrics, and growth opportunities.

## Core Objects

- **Goal** — measurable outcome owned by a project or organization.
- **Project** — bounded body of work with milestones, budget, agents, integrations, and releases.
- **Task** — actionable unit with status, priority, dependencies, estimate, owner, and artifacts.
- **Subtask** — child task that can execute independently or in parallel.
- **AI Employee** — persistent agent profile with role, model, skills, permissions, workload, compensation metadata, and performance metrics.
- **Department** — grouping of AI employees such as Engineering, Research, Design, QA, Operations, Finance, or Marketing.
- **Integration** — connector to GitHub, IDEs, Unreal, Godot, Blender, databases, APIs, and other applications.
- **Growth Opportunity** — proposed improvement, product opportunity, automation, cost reduction, revenue opportunity, or capability expansion.
- **Metric** — KPI attached to goals, projects, employees, departments, or growth opportunities.

## Task Lifecycle

`Backlog -> Planned -> Assigned -> In Progress -> Review -> Blocked/Waiting -> Done -> Archived`

Tasks support dependencies, recurring schedules, approvals, artifacts, logs, tests, and Git changes.

## AI Employee Lifecycle

`Candidate -> Hired -> Onboarding -> Active -> Paused -> Review -> Retained/Released`

Hiring an AI employee means creating an agent configuration. It does not create a new model or duplicate model weights. Multiple employees can use the same Ollama model while having different roles, system prompts, tools, memory scopes, permissions, and voices.

## Employee Management

Each employee can have:

- Employee ID
- Display name
- Job title
- Department
- Base Ollama model
- System prompt/persona
- Skills
- Tools
- Permissions
- Voice preset
- Assigned projects
- Assigned tasks
- Workload
- Availability
- Performance metrics
- Training/evaluation history
- Cost/resource profile

## Integrations

Integrations are explicit adapters with permissions and health status. Examples:

- GitHub
- Git
- VS Code
- Visual Studio
- JetBrains
- Unreal Engine
- Godot
- Blender
- Android Studio
- Xcode
- MySQL
- Ollama
- REST APIs
- local filesystem
- terminal/build environments

Every integration exposes capabilities, authentication state, health, rate limits, and allowed actions.

## Growth System

The Growth Center tracks:

1. Product opportunities
2. Engineering improvements
3. Automation opportunities
4. User experience improvements
5. Performance/cost optimization
6. New integrations
7. New AI employee roles
8. New markets/use cases
9. Release adoption
10. Technical debt reduction

Each opportunity has an impact estimate, effort estimate, confidence, owner, dependencies, status, and supporting evidence.

## CTO Views

The command center provides multiple representations of the same data:

- **Grid View** — employees, projects, tasks, integrations, and growth opportunities as sortable cards.
- **Chart View** — workload, task completion, project health, resource usage, hiring/employee utilization, and growth pipeline.
- **Board View** — Kanban workflow for tasks and opportunities.
- **Tree View** — project → milestone → task → subtask hierarchy.
- **Org View** — departments and AI employees.
- **Timeline View** — milestones, releases, recurring work, and dependencies.

## Employee Hiring Workflow

`Define Role -> Select Skills -> Select Model -> Configure Permissions -> Assign Voice -> Create Employee -> Assign Department -> Assign Projects -> Onboard -> Activate`

All write, destructive, external, commit, push, deployment, and sensitive integration actions remain subject to the existing approval system.

## Local-First Rule

Employee definitions, task history, project data, growth data, and performance history remain local unless the user explicitly enables synchronization or an external integration requires a remote operation.
