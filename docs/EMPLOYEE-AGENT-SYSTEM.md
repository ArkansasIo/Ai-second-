# Employee & AI Hiring System

AI Second Brain treats employees as persistent AI agents with roles, compensation-free local capacity, skills, permissions, performance, and assignment history.

## Employee record

- `EMP-00001` permanent employee ID
- display name
- job title
- department
- skills and programming languages
- base Ollama model
- voice preset
- personality/profile
- permissions
- availability
- workload/capacity
- assigned projects
- assigned clusters
- performance metrics
- employment state: applicant, hired, active, paused, leave, terminated

## Hiring workflow

1. Create job opening.
2. Define required skills, tools, environment, permissions, and model requirements.
3. Search available AI agents and saved presets.
4. Clone an existing agent or create a new employee profile.
5. Run an interview/evaluation task.
6. Score technical and behavioral capabilities.
7. Approve hiring.
8. Assign department, workshop, cluster, and manager.
9. Provision tools and permissions.
10. Start onboarding tasks.

## Employee types

### AI employee

Uses an Ollama or explicitly authorized external model for reasoning. Voice is independent from the reasoning model.

### Human employee record

Represents a human collaborator without storing unnecessary personal information. Authentication and sensitive identity data remain in the local security layer.

### Hybrid employee

A persistent team identity that can route work between AI agents and human collaborators.

## Departments

- Engineering
- Software Development
- Game Development
- Research
- QA
- DevOps
- Security
- Project Management
- Product
- Design
- 2D Art
- 3D Art
- CAD
- Robotics
- Documentation
- Finance/Accounting
- Business Analysis
- Operations

## Example hires

- `EMP-00001` C++ Systems Engineer
- `EMP-00002` Android Engineer
- `EMP-00003` Unreal Engine Engineer
- `EMP-00004` Blender Technical Artist
- `EMP-00005` QA Engineer
- `EMP-00006` Project Manager
- `EMP-00007` Research Analyst
- `EMP-00008` Documentation Specialist

## Governance

Hiring, firing, permission escalation, external API access, destructive commands, Git pushes, releases, and data export require explicit approval according to the active security policy.

## Capacity

Employee count is configuration/storage limited rather than an arbitrary fixed number. Active concurrent model generations are governed separately by the resource-aware Ollama scheduler.
