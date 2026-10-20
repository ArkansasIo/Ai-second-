# BrainScript Language Specification

BrainScript is the native scripting language of AI Binder and NeuroBrain. It is designed to combine conventional programming with AI-agent orchestration and readable prose-like intent.

## Design goals

- Familiar syntax for programmers coming from C, C++, C#, Java, JavaScript, TypeScript, Python and Lua.
- Strong blocks and expressions for deterministic software logic.
- First-class `agent`, `task`, `workflow`, `tool` and `event` concepts.
- Explicit `think`, `remember`, `verify`, `requires` and `ensures` vocabulary for AI-native programs.
- Source can be mapped to Program Canvas, UML and binder documents.
- Sandboxed runtime with execution-step limits.

## Program shape

```brain
application Demo {
    import "math";

    const limit: number = 10;
    let total: number = 0;

    function add(a: number, b: number): number {
        return a + b;
    }

    task Calculate {
        total = add(7, 5);
    }

    workflow Build {
        Calculate;
        Verify;
    }
}
```

## Core syntax

BrainScript supports variables, constants, typed declarations, expressions, operators, functions, classes, inheritance, conditions, loops, arrays, objects, calls, member access, exceptions, imports, events and asynchronous/agent-oriented constructs.

### Logic

```brain
if (score >= 100 and ready) {
    say("Launch");
} else {
    say("Wait");
}

for item in inventory {
    inspect(item);
}
```

### AI-native vocabulary

These words are reserved for the language's higher-level execution model:

- `agent` — declares an autonomous worker boundary.
- `task` — declares a bounded unit of work.
- `workflow` — orders tasks into a program-level process.
- `tool` — declares an external capability.
- `think` — records or executes an explicit reasoning stage.
- `remember` — requests memory retrieval/persistence.
- `verify` — invokes a verification stage.
- `requires` — precondition contract.
- `ensures` — postcondition contract.
- `parallel` — marks independent work eligible for concurrent execution.

## Sentences and paragraphs

BrainScript keeps normal code statements semicolon-delimited, but its AI layer treats a sequence of related statements as a **sentence** and a named group of sentences as a **paragraph**. The future compiler can attach provenance, verification and memory metadata to these units without changing the source code's normal programming semantics.

Conceptually:

```text
sentence = one executable intention
paragraph = a named group of related intentions
program = paragraphs + declarations + workflows
```

This gives BrainScript a distinctive source model: ordinary programming syntax remains precise, while AI-oriented code can retain the structure of written reasoning.

## Execution model

`source -> lexer -> parser -> AST -> verifier -> sandbox runtime -> tools/agents -> result`

The current runtime deliberately does not grant arbitrary filesystem, shell, network or credential access. Those capabilities belong behind AI Binder's existing tool-policy layer.

## Types

The language foundation supports `number`, `string`, `boolean`, `array`, `object`, `void`, `any`, and named user types. The object model includes classes, interfaces, properties, methods, access modifiers and inheritance.

## Example: autonomous development workflow

```brain
agent Builder {
    task Analyze {
        remember("project architecture");
        think("identify the smallest safe implementation");
    }

    task Implement {
        tool("workspace.write", { path: "src/example.ts" });
    }

    task Verify {
        verify("typecheck and tests");
    }
}

workflow FeatureRelease {
    parallel Analyze;
    Implement;
    Verify;
}
```

The final agent/tool compiler will translate these declarations into NeuroBrain workforce jobs while preserving permissions, provenance and verification.
