# Contributing to VisitorLens

Thank you for taking the time to contribute.
This document explains how to report bugs, suggest features, and submit code changes.

---

## Reporting a bug

Open an issue using the "Bug Report" template.
Include the browser name and version, the operating system,
and a clear description of what you expected to happen versus what actually happened.
If the bug is related to geo data, include the raw value of `visitor.toJSON()` in your report.

---

## Suggesting a feature

Open an issue using the "Feature Request" template.
Explain what problem the feature solves and how you would expect it to work from the outside.
Features that add new properties to the `visitor` object should also include
a short description of which browser API provides the data.

---

## Submitting a pull request

1. Fork the repository and create a branch named after your change, for example `fix/ie-detection` or `feat/battery-api`.
2. Make your changes in `src/main/visitor.js`. Every new function and every non-trivial line must have a comment explaining what it does.
3. If you add a new `visitor.*` property, document it in the property tables in `README.md`.
4. If you add a new utility method, add a test in `src/test/visitor.test.js`.
5. Run `npx jest` and confirm all tests pass.
6. Open a pull request against the `main` branch. Fill in the pull request template completely.

---

## Code style

- Use `var` for variable declarations, matching the style of the original project.
- Use spaces around `=`, `!==`, and other operators.
- Comment every function with a short description of its purpose.
- Comment every non-trivial line with an inline note after the code.
- Keep functions small and focused on one task.
- Do not introduce external dependencies. The library must remain self-contained.

---

## Running tests locally

```bash
npm install
npx jest
```

---

## Code of Conduct

All contributors are expected to follow the `CODE_OF_CONDUCT.md` in the repository root.
