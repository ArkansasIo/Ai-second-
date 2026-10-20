# Folder Task & Job System

Each AI Second Brain folder can own a work queue. A folder may contain multiple tasks and jobs, and a job can contain multiple tasks.

## Execution model

```text
AI SECOND BRAIN
  ├─ Folder
  │   ├─ Tasks
  │   ├─ Jobs
  │   ├─ Subtasks
  │   └─ Artifacts
  └─ Folder
      ├─ Tasks
      └─ Jobs
```

Tasks are the smallest actionable work units. Jobs are larger units that group tasks and can be assigned to an agent, project, or environment.

## Required capabilities

- Create multiple tasks from any folder.
- Create multiple jobs from any folder.
- Attach tasks to jobs.
- Track status, priority, dependencies, subtasks, and artifacts.
- Assign jobs/tasks to agents.
- Queue work for later execution.
- Run independent jobs in parallel.
- Preserve folder ownership so work remains discoverable from the navigation tree.

## Planned UI

Every folder can expose `New Task`, `New Job`, `Tasks`, and `Jobs` actions. The folder workspace should show queued, running, blocked, completed, and failed work without leaving the folder context.
