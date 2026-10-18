# A practical guide to Copilot instructions
This guide explains how repository instruction files work, how to write them,
and how to use them to steer an AI coding assistant. The examples use this
repository's generative browser instrument, FIELDTONE.

> **Important:** Instructions are guidance, not executable code and not a
> guarantee that an assistant will follow every rule. The exact files loaded
> can depend on the Copilot product, editor version, settings, and task type.
> Keep instructions short enough to apply, check the assistant's proposed
> changes, and verify the result.
## What an instruction file does
An instruction file gives an assistant reusable context and constraints. It
can explain:
- **What the project is:** product, users, and current architecture.
- **What to preserve:** important behavior, compatibility, and user experience.
- **How to change it:** conventions, preferred patterns, and boundaries.
- **How to check work:** relevant tests, validation commands, and documentation.
It is not a database or a transcript of every past chat. A new conversation
may not know decisions that were never written into a project instruction or
documentation file. Put durable project facts in the repository, and put
task-specific details in the request.
## The three useful file types
### 1. Repository-wide Copilot instructions
**File:** `.github/copilot-instructions.md`
Use this for a small set of rules that should usually apply to every coding
task in the repository. Copilot-enabled tools that support repository custom
instructions may load it automatically; confirm that the relevant feature is
enabled in your editor or environment.
**Good contents:** product context, architecture boundaries, core behavior,
code-quality expectations, accessibility requirements, and verification
expectations.
**Avoid:** a copy of the whole README, rules for a single file type, temporary
task instructions, or examples that look like actual requirements.
**Example:**
```md
# Project instructions
This project is a static browser instrument implemented in `index.html`.
Preserve pointer/touch and keyboard access when changing controls.
Start audio only in response to a user gesture.
Update `README.md` when documented controls or shortcuts change.
```
### 2. File-scoped instructions
**Files:** `.github/instructions/<topic>.instructions.md`
Use these for guidance that only applies to matching files. They begin with
YAML frontmatter, including `applyTo`, followed by ordinary Markdown
instructions. The glob in `applyTo` determines which files the instructions
are associated with.
**Example:**
```md
---
applyTo: "src/**/*.ts"
---
# TypeScript instructions
Prefer explicit types at public boundaries. Reuse existing error-handling
helpers instead of introducing a second pattern.
```
For this repository, `.github/instructions/web-audio.instructions.md` is
scoped to `index.html` because the HTML, CSS, and JavaScript for the app are
currently in that single file. If the source is split into separate files,
update the glob to match the new layout.
### 3. Agent guidance files
**Common filename:** `AGENTS.md`
Some agent products and editor versions recognize `AGENTS.md` as general
project or directory guidance. Its exact discovery and inheritance behavior
varies, so check the documentation for the specific tool you use. It is useful
when a team wants guidance shared across agents; do not duplicate the same
large rule set in several files, because copies can drift or conflict.
There is no `AGENTS.md` in this sample setup. The repository-wide and scoped
Copilot files above demonstrate the Copilot-specific arrangement used here.
## How to write instructions that work well
### Start with a concrete project description
State what exists now, not what you might build someday.
**Too vague:** “Make the app modern and great.”
**More useful:** “FIELDTONE is a static, fullscreen instrument with six
generative synth pads. Its UI and Web Audio implementation currently live in
`index.html`.”
Concrete context helps an assistant choose an implementation that fits the
project instead of inventing a new stack.
### State the behavior that must be preserved
Name important user-facing behavior, compatibility requirements, and
constraints. For example:
```md
- Keep pad playback available by pointer/touch and keys `1`–`6`.
- Do not start audio until the user triggers playback.
- Keep the pad grid usable on narrow screens.
```
Avoid listing every existing detail. Pick the requirements that are easy to
break and costly to rediscover.
### Prefer observable rules over taste words
Words such as “clean,” “elegant,” or “intuitive” can communicate direction but
are hard to verify by themselves. Translate them into observable behavior:
```md
Instead of: “Make controls accessible.”
Write: “Use native buttons and inputs, provide visible keyboard focus, and
give each generated pad an accessible name that identifies its shortcut.”
```
### Give the assistant a strategy, not just a ban
A useful instruction says what to do instead:
```md
Instead of: “Do not break audio.”
Write: “Inspect the current node graph first. Extend the existing per-voice
bus and master path, schedule parameter changes on AudioParam, and report
playback setup errors through the existing notice.”
```
### Keep instructions scoped
Put generally applicable project facts in the repository-wide file. Put
specialized rules in a scoped file. A good `applyTo` pattern is as narrow as
possible while still matching all relevant files.
For example, use `"index.html"` when the whole app lives in one file. If the
project later moves audio code into `src/audio/*.js`, use a pattern such as
`"src/audio/**/*.js"` for audio-specific guidance.
### Resolve conflicts deliberately
When two sources disagree, the assistant may need to infer which one to follow.
Make the intended precedence clear in the text:
- A current user request defines the task.
- Project instructions define durable constraints.
- Source code and maintained documentation describe current behavior.
- Examples illustrate a pattern; they are not automatically requirements.
If the README and implementation conflict, investigate before changing either.
Do not use instructions to conceal a mismatch.
## Keywords and what they communicate
Markdown headings and lists are ordinary text; they do not have special
machine-enforced meaning. The following words are common writing conventions,
not magic Copilot commands:
| Word or phrase | Meaning in an instruction | Example |
| --- | --- | --- |
| **MUST** / **must** | A hard requirement for an acceptable change. Use sparingly. | “Audio **must** start only after a user gesture.” |
| **MUST NOT** / **must not** | A prohibited behavior. State the reason or preferred alternative where helpful. | “**Do not** add a dependency for a change that can use the browser APIs already in use.” |
| **SHOULD** / **should** | A strong default with room for a justified exception. | “Keyboard and pointer input **should** share the same action handler.” |
| **MAY** / **may** | An optional approach, not an obligation. | “A helper **may** be extracted if it removes meaningful duplication.” |
| **Prefer** | A default choice that allows alternatives when the task calls for them. | “**Prefer** native HTML controls over custom widgets.” |
| **For example** | The following text is illustrative, not exhaustive or automatically mandatory. | “**For example**, call `makePatch()` from both the button and shortcut.” |
| **Unless** / **except** | Defines a specific exception to a rule. | “Preserve the six-pad layout **unless** the user asks to change it.” |
Be consistent. Avoid writing a rule as both an absolute and an optional
preference in different places.
## Strategies for different tasks
### Adding a feature
1. Identify where the current behavior is implemented.
2. Identify state, visible UI, input handling, accessibility, and documentation
that the feature touches.
3. Reuse existing handlers and data flow.
4. Verify the feature and the behavior around it.
**Example request:** “Add a visible mute button.”
An instruction-aware implementation should inspect the master gain and
existing controls, decide how mute interacts with the dynamic volume levels,
use a native accessible button, preserve keyboard behavior, and update the
README. It should not create an independent audio graph.
### Fixing a bug
Describe the observed result and the expected result, not only a proposed
implementation.
**Example request:** “After rapidly pressing the volume-up shortcut, the
volume jumps. Keep the transition smooth even when a ramp is in progress.”
The useful strategy is to inspect the current ramp scheduling and current
master gain, find the source of the jump, fix that point, and verify repeated
inputs. Merely changing the ramp duration would not prove the bug is fixed.
### Refactoring
State the invariant: behavior should remain the same. Ask for a small
refactoring, and verify representative interactions before and after.
**Example request:** “Extract pad-label generation into a helper without
changing the accessible name, visible readout, or shortcut behavior.”
### Changing design
Describe desired outcomes and constraints rather than prescribing every CSS
declaration.
**Example request:** “Make the HUD easier to use on small phones. Keep all
controls visible, touchable, and keyboard accessible, and do not change the
full-screen instrument layout on desktop.”
This leaves room for a suitable responsive implementation while specifying
measurable outcomes.
### Updating documentation
Ask for claims to be checked against actual code. For a shortcut change, for
example, update both the cheatsheet and the relevant explanation; do not
document a shortcut that the event handler does not implement.
## Mini prompt templates
Use these patterns in a task request. Replace the bracketed text with concrete
details.
### Feature
```text
Add [feature] to [surface].
Expected behavior: [what a user can observe].
Preserve: [existing behavior or constraints].
Update: [documentation, accessibility, or other surfaces].
Verify: [specific tests or interactions].
```
### Bug
```text
When [reproducible steps], the app currently [actual result].
It should [expected result].
Find and fix the root cause; preserve [related behavior].
Verify the same steps and [relevant edge case].
```
### Refactor
```text
Refactor [specific code] to [specific goal].
Do not change [observable behavior/API].
Keep the change limited to [scope].
Run [relevant validation] and report any untested behavior.
```
## Troubleshooting
- **Instructions do not appear to apply:** Check the exact filename, folder,
file extension, YAML frontmatter, `applyTo` glob, and the editor or agent's
support/settings. Reload the editor if its instructions are cached.
- **The assistant follows an example too literally:** Label examples as
illustrative and state the invariant separately. Do not leave an incomplete
snippet looking like a complete implementation.
- **Instructions conflict:** Remove duplicated rules, narrow their scope, and
say which requirement takes priority. Keep task-specific exceptions in the
task request.
- **The file has become very long:** Keep durable, high-value requirements in
instructions. Move detailed explanations into the README or a guide, and
link to that documentation rather than duplicating it.
- **The code and instructions have drifted:** Update instructions when the
architecture or core behavior changes. Instructions are most useful when
they describe the current repository truthfully.
## Files in this example
- `.github/copilot-instructions.md` contains concise repository-wide project
guidance.
- `.github/instructions/web-audio.instructions.md` adds guidance for
`index.html`.
- This guide explains how and why those files are written.