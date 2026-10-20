# Project Manager, Deadlines, Roadmaps, and Delivery System

AI Second Brain includes a first-class project management layer integrated with workshops, repositories, agent clusters, tasks, builds, tests, Git, and releases.

## Project manager

Every project can have:

- Project ID and name
- Description
- Owner/account
- Repository mappings
- Workshop mappings
- Project manager agent
- Team/agent assignments
- Milestones
- Roadmap
- Tasks and subtasks
- Dependencies
- Deadlines
- Status and health
- Risks/blockers
- Releases
- Documents and decisions
- Activity timeline

## GitHub-style workflow, with an original implementation

The workflow takes inspiration from familiar repository/project-management concepts such as issues, milestones, boards, pull requests, releases, labels, assignees, and activity history. AI Second Brain does not copy GitHub's UI or proprietary implementation.

```text
Project
  |
  +-- Roadmap
  |    +-- Phase
  |    +-- Milestone
  |    +-- Deliverable
  |
  +-- Work Items
  |    +-- Epic
  |    +-- Task
  |    +-- Subtask
  |    +-- Bug
  |    +-- Research
  |
  +-- Agent Clusters
  |    +-- Agents
  |    +-- Environments
  |    +-- Worktrees
  |
  +-- Releases
  |    +-- Version
  |    +-- Build
  |    +-- Test
  |    +-- Artifacts
  |
  +-- Activity
```

## Roadmap views

The project manager supports multiple views over the same data:

- Roadmap/timeline
- Kanban board
- List
- Calendar
- Milestone view
- Dependency graph
- Agent workload view
- Release view
- Repository activity

## Deadline engine

Deadlines are explicit data, not just UI labels. A work item can contain:

```json
{
  "id": "TASK-00042",
  "title": "Build Android release",
  "status": "in-progress",
  "priority": "high",
  "deadline": "2026-10-30T17:00:00-04:00",
  "estimatedMinutes": 480,
  "dependencies": ["TASK-00031", "TASK-00037"],
  "assignees": ["AGENT-00012"],
  "workshopId": "WORKSHOP-00005"
}
```

The scheduler calculates remaining work, dependency blockers, agent capacity, and deadline risk. It may recommend parallelization or reassignment, but destructive changes require the configured approval policy.

## Project manager agent

`AGENT-00020` is reserved as the default Project Manager profile in the catalog. It can:

- turn requirements into epics and tasks
- create milestones
- build roadmaps
- estimate work
- identify dependencies
- assign agents/clusters
- track progress
- detect blockers
- prepare status reports
- prepare release checklists
- coordinate deadlines

It cannot silently commit, push, delete repositories, install software, or alter permissions unless the project's policy explicitly permits it.

## Deadline states

- `on-track`
- `at-risk`
- `blocked`
- `overdue`
- `completed`
- `cancelled`

## Notifications

The project manager can surface deadline changes through the desktop shell, workshop tabs, voice assistant, and optional scheduled notifications. No cloud service is required for local notifications.

## Local-first

Project plans, deadlines, roadmaps, task history, agent assignments, and project activity remain local by default. GitHub synchronization is an explicit integration and can be disabled.
