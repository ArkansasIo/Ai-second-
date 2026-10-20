# Workshop Environment System

AI Second Brain uses configurable **Workshop Environments**. A workshop is a browser-like desktop tab backed by a project workspace, toolchain profile, agent cluster, task policy, and permissions.

## Environment switching

Every workshop exposes a selector for:

- programming language
- job/role
- task profile
- platform
- compiler/toolchain
- IDE or creative application
- Ollama model
- voice profile
- memory scope
- filesystem permissions
- terminal permissions
- Git permissions
- resource limits

Changing the selection changes the environment configuration; it does not change the underlying project files unless a task explicitly writes them.

## Examples

```text
C++ Engineer Workshop
  Language: C++20
  Toolchain: CMake + MSVC/Clang/GCC
  Jobs: Systems, Graphics, Unreal
  Tasks: build, debug, test, profile

Python Research Workshop
  Language: Python
  Toolchain: CPython + uv/pip
  Jobs: Research, Data Science, Automation
  Tasks: analyze, prototype, test, document

Android Workshop
  Language: Kotlin + Java + C++
  Toolchain: Android SDK/NDK + Gradle
  Jobs: Android Engineer, QA
  Tasks: build APK/AAB, test, lint, package

Blender Workshop
  Application: Blender
  Language: Python
  Jobs: Modeling, Materials, Animation, Rendering
  Tasks: generate scene, modify assets, render, export
```

## Job and task catalog

The environment selector can use the following categories:

- Programming: C, C++, C#, Rust, Go, Java, Kotlin, Swift, Python, JavaScript, TypeScript, PHP, Ruby, Lua, GDScript, SQL, Assembly
- Engineering: Mechanical, Electrical, Robotics, Systems, CAD, Simulation
- Software: Backend, Frontend, Mobile, Game, Graphics, AI/ML, Database, Security, DevOps, QA
- Business: Project Manager, Product Manager, Business Analyst, Accountant, Operations
- Creative: Game Designer, Writer, UI/UX Designer, 2D Artist, 3D Artist, Animator, Technical Artist
- Research: Researcher, Data Analyst, Technical Writer, Documentation Specialist

Jobs are role definitions. Tasks are executable work units. Languages and tools are capabilities. They remain independently selectable so one agent can perform multiple task types without cloning the entire environment.

## Parallel workshops

Multiple workshops may execute concurrently:

```text
AI Second Brain
├── WORKSHOP-00001 C++ Engineering
├── WORKSHOP-00002 Android
├── WORKSHOP-00003 Unreal Engine
├── WORKSHOP-00004 Blender
├── WORKSHOP-00005 Python Research
└── WORKSHOP-00006 Documentation
```

The cluster scheduler owns concurrency and resource limits. A workshop may be paused without stopping unrelated workshops.

## Safety

Changing an environment never grants new permissions automatically. Filesystem writes, arbitrary commands, Git commits, Git pushes, destructive operations, and external API access remain controlled by the workshop permission policy and approval gates.
