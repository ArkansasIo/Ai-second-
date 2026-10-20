# AI Workforce Design

## Purpose

AI Second Brain treats AI agents as specialized employees that can be created, assigned to teams, isolated in virtual environments, and scheduled against jobs and tasks.

## Organization hierarchy

```text
Organization
└── Department
    └── Team
        └── Agent
            └── Environment
                └── Job
                    └── Task
                        └── Subtask
                            └── Tool/API
                                └── Artifact
```

## Agent identity

Every agent has a stable ID, employee number, display name, professional role, department, skills, tools, model, permissions, environment, memory scope, and current workload.

Examples:

- CTO #01
- Lead Game Designer #02
- Gameplay Programmer #03
- Scriptwriter #04
- Lead UI/UX Designer #05
- C++ Systems Programmer #06
- QA Engineer #07
- Security Engineer #08
- DevOps Engineer #09
- Research Analyst #10

## Specialization

Agent roles are not cosmetic labels. A role supplies a default skill set, tool set, capabilities, model policy, and API permission baseline. Project-specific overrides can add or remove capabilities.

## Jobs versus tasks

A job represents an outcome such as `Build RPG Combat System`. A job contains multiple tasks. Tasks are executable units assigned to one agent and may depend on other tasks.

```text
JOB-0042 Build RPG Combat System
├── TASK-0042-01 Combat design → Lead Game Designer
├── TASK-0042-02 Damage formulas → Systems Designer
├── TASK-0042-03 Combat component → Gameplay Programmer
├── TASK-0042-04 Combat HUD → UI Designer
├── TASK-0042-05 Dialogue → Scriptwriter
└── TASK-0042-06 Regression tests → QA Engineer
```

## Parallel execution

Jobs may execute independent tasks concurrently. `maxWorkers` limits concurrency. Dependencies prevent a task from running until required tasks complete.

The runtime records queued, running, paused, blocked, completed, failed, and cancelled states, along with timestamps and events.

## Agent sandbox

Each agent receives an environment scope. Files, processes, credentials, network access, API connections, and secrets are deny-by-default across environment boundaries.

## API tools

Agents can use registered tools through the API gateway. Examples include GitHub, filesystem, terminal, browser, web search, databases, Ollama, model providers, build systems, test runners, and MCP servers.

Sensitive actions can enter the approval gateway before execution.

## Approval policy

Potential approval-gated actions include:

- writing outside the assigned workspace
- deleting files
- installing packages
- executing arbitrary shell commands
- network access
- accessing secrets
- pushing Git branches
- creating releases
- deploying applications
- modifying production databases

## Agent chat

Every agent may expose a chat session. The chat session has access to that employee's role, current task, environment, memory, permitted tools, and relevant project context.

The CTO chat can delegate work to specialist agents and aggregate their results.

## Workforce UI

The Agents page should expose:

- employee directory
- role and specialty
- online/working/blocked status
- current environment
- current job/task
- model
- tools
- API permissions
- memory
- performance
- chat
- workload
- create employee
- clone employee
- assign job
- assign task
- pause/cancel work

## Source implementation

Core models live in:

- `src/agents/agentRoles.ts`
- `src/agents/workforce.ts`
- `src/agents/jobManager.ts`

These are intentionally independent of the UI so the same workforce model can later be used by the browser client, desktop runtime, local API, and background job runner.
