2026-11-13
## Key Outcomes

- **Outcome:** Students successfully created a basic HTML page and used **GitHub Copilot** to generate a functional "Internet musical instrument" based on a poem.
- **Outcome:** The instructor established a conceptual framework for the course, defining musical instruments as **tools** that extend the human body and serve social or ritual functions. 
- **Outcome:** The class practiced a structured **prompting method** for AI, breaking instrument design into interface, action, visualization, time organization, and sound output. 

## Decisions Made

- **Decision:** Use **VS Code** as the primary local coding environment, with **Live Server** installed for real-time browser preview. 
- **Decision:** Use **Node.js** for running simple JavaScript tests outside the browser. 
- **Decision:** Adopt a specific **prompt structure** for AI-generated instruments:
    1. **Interface** (e.g., full-screen, dark mode)
    2. **Action/Interaction** (e.g., poem-based generation)
    3. **Visualization/Output** (e.g., words, colors, score)
    4. **Time Organization** (e.g., random intervals, pauses)
    5. **Sound Output** (e.g., Web Audio API, specific filters/pitches)
    6. **Termination/Decision** (e.g., end after 15 words with a double bar) 

## Technical Concepts Covered

- **JavaScript Basics:**
    - **Variables:** Used to store values (e.g., `node = 440`). 
    - **Functions:** Reusable blocks of code that can take arguments (e.g., `PlayNote(n)`) and perform logic. 
    - **Conditionals:** Using `if` statements to control program flow (e.g., only print if `n > 20`). 
    - **Expressions vs. Statements:** Expressions resolve to a value (e.g., `node + 20`), while statements perform actions. 
- **Data Types:**
    - **Numbers:** JavaScript handles integers and floats more simply than MaxMSP, which requires separate `int` and `float` objects. 
    - **Strings:** Text enclosed in double quotes. 
    - **Booleans:** Logical values `true` or `false`, with operators like AND/OR. 
- **Character Encoding:**
    - **ASCII/UTF-8:** Computers use equivalence tables to map numbers to characters; UTF-8 is the current web standard supporting over 1 million Unicode code points. 
    - **MaxMSP Objects:** `itoa` converts integers to UTF-8 characters; `atoi` does the opposite. 
- **HTML Structure:**
    - Pages use **tags** (e.g., `<html>`, `<head>`, `<body>`, `<style>`, `<script>`) enclosed in chevrons (`< >`). 
    - The `<style>` tag is used for CSS (e.g., `background: red`). 

## Tooling & Workflow

- **VS Code Shortcuts:**
    - `Cmd + Shift + P`: Open the **Command Palette** to access all commands. 
    - `Cmd + N`: Create a new file. 
    - `Cmd + S`: Save the current file. 
    - `Cmd + Shift + X`: Open the **Extensions** view. 
    - `Cmd + Shift + R`: Refresh the browser page. 
- **Workspace Management:**
    - A **Workspace** in VS Code is equivalent to a folder. 
    - Use **Open Folder** to keep the coding environment clean and organized. 
- **Terminal:**
    - Use `pwd` to see the current directory and `cd [folder]` to change directories. 
    - Run JavaScript files using `node [filename].js`. 

## Action Items

- **Students:** Experiment with the provided **prompt structure** to design a unique instrument for the next class. 
- **Students:** Upload their generated instrument code to the **Discord** channel. 
- **Instructor:** Formalize the prompt-based exercise in Discord for the next session. 

## Next Class

- **Date:** Next week, the 20th. 
- **Time:** 13:00. 
- **Format:** **Online** (not in-person). 
