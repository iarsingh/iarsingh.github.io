# iarsingh.github.io — interview questions and answers

[README](README.md) · [Project architecture](PROJECT_ARCHITECTURE.md)

Answers below use this repository’s files and implementation. They distinguish existing behavior from suggested extensions; source links let you verify each walkthrough.

## 1. What problem does iarsingh.github.io address, and what can you demonstrate?

Personal portfolio of Akhilesh Ranjan Singh — Cloud & Platform Engineer moving toward Forward Deployed and AI Platform Engineering.

I would demonstrate the linked implementation or examples and distinguish that evidence from any planned production features. Start with [`README.md`](README.md).

## 2. How is this repository organized?

- [`index.html`](index.html): Implementation or supporting configuration.
- [`script.js`](script.js): Implementation or supporting configuration.
- [`styles.css`](styles.css): Implementation or supporting configuration.
- [`README.md`](README.md): Project explanations or operating notes.

[PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md) contains the component diagram and the implementation walkthrough.

## 3. Is this a running application or a reference repository?

The inspected checkout contains notes, examples, or source assets rather than an identified service entry point. I would describe the actual contents and avoid inventing a backend, database, or deployment. The architecture document records the components that exist.

## 4. What would you verify before extending this repository?

I would identify an executable example or define a concrete acceptance case for the material in [`README.md`](README.md). For code, verify inputs, outputs, and failure handling; for notes or templates, verify that a reader can follow the procedure and distinguish examples from measured results.

## 5. How would you verify correctness when no test suite is present?

There are no dedicated test files in the inspected first-party inventory. I would select one concrete example from [`README.md`](README.md), define expected output or an acceptance checklist, and add repeatable verification before expanding scope. For a documentation-only repository, that means checking links, instructions, and the reproducibility of examples.

## 6. How do you separate the current design from a future production design?

The current design is the source/component map in [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md). A future deployment needs explicit input contracts, persistence decisions, authentication, monitoring, and rollback. I would present these as proposed work until the corresponding implementation and verification exist.

## 7. How would you investigate data ownership and persistence?

Trace the data/configuration files and the code that reads or writes them in the component table. Identify which files are examples, which records are mutable, and which external store is actually configured. I would document those facts before discussing retention, backup, or tenant isolation.

## 8. How would another engineer reproduce your walkthrough?

Start from the repository root:

```bash
python3 -m http.server 8000
```

These commands follow repository manifests; environment setup and command results still need to be checked on the target machine.

## 9. How would you add CI without confusing it with deployment?

First automate the repository-specific checks above, including documentation link validation. Add deployment only after defining the target environment, required credentials, approval boundary, smoke test, and rollback procedure. No GitHub Actions workflow is asserted by the inspected inventory.

## 10. How would you present this project in a Forward Deployed Engineer interview?

Start with the user and operational problem described in [`README.md`](README.md). Explain one constraint that changes the implementation, show the linked code or example, and walk through a success case and a failure case. Agree on a measurable acceptance criterion before expanding the solution, and leave a handoff with data boundaries and rollback ownership. Any proposed production or business metric should be identified as a target until measured.

## 11. What does `script.js` own?

[`script.js`](script.js) defines `syncThemeLabel`, `onScroll`, `setMenu`, `setActive`, `navFor`, `check`.

Trace these definitions and imports to explain the module boundary. Relative imports identify project code; package imports should be checked against the nearest manifest.
