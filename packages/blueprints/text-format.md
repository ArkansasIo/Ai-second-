# Blueprint Text Format

AI Second Brain uses a readable, UML-like representation for universal program graphs.

```text
blueprint HelloProgram target=python
  event Start
    -> function print value="Hello from AI Second Brain"
    -> return
```

The same graph can target `cpp`, `python`, or `typescript` without changing its logical nodes. Language adapters can extend the target set.

## Node grammar

- `event` starts execution.
- `function` invokes a function or library operation.
- `operator` represents arithmetic, comparison, boolean, or bitwise logic.
- `branch` represents conditional control flow.
- `loop` represents iteration.
- `data` represents variables/constants/structures.
- `async` represents asynchronous work.
- `return` ends a path.
- `external` represents an adapter-provided library/API call.

Graphs are stored as structured JSON and may be rendered as nodes, UML-like text, or generated source code.
