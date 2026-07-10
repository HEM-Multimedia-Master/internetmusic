
# UI Interaction Patterns 
## Context
Many contemporary UI interaction patterns originate from Material Design (Google, 2014–), which formalized mobile-first interaction logic based on:
- Clear action hierarchy
- Context-aware interfaces
- Motion as feedback
- Reduction of cognitive load
- Ergonomic thumb zones
This note collects key UI patterns relevant for designing a minimalist, mobile-first LMS with a scientific/academic tone.
---
# Core Patterns
## 1. FAB — Floating Action Button
Definition:
A circular floating button representing the primary action in the current context.
Origin:
Material Design (Google, 2014)
Typical Use:
- Create new thread
- Reply
- Compose message
- Continue lesson
Key Principle:
One primary action per screen.
Risk:
Overuse creates ambiguity.
---
## 2. HUD — Head-Up Display
Definition:
Overlayed informational layer showing status or telemetry without leaving the main context.
Common Use:
- Progress indicator
- Score
- Notifications
- Live metrics
In LMS Context:
- Course progress %
- Current unit
- Upcoming deadline
Design Note:
Should be subtle. Avoid gaming aesthetics.
---
## 3. Bottom Navigation Bar
Definition:
Fixed navigation bar at bottom of mobile screens for primary destinations.
Typical Items (max 5):
- Dashboard
- Course
- Forum
- Messages
- Profile
Material Design Constraint:
- 3–5 items max
- Persistent across main sections
Use Case:
Global navigation, not contextual actions.
---
## 4. Bottom Sheet
Definition:
A panel that slides up from the bottom to reveal additional contextual information.
Types:
- Modal bottom sheet
- Persistent bottom sheet
In LMS Context:
- Course TOC
- Progress breakdown
- Tips / guidance
- Metrics dashboard
Advantage:
Replaces cluttered sidebars on mobile.
---
## 5. Navigation Drawer
Definition:
Hidden panel (usually left side) containing navigation links.
Common in:
- Desktop
- Tablet
In Your Case:
- TOC on desktop
- Collapsible in mobile
---
## 6. Snackbar
Definition:
Temporary message appearing at bottom of screen.
Use:
- “Thread posted”
- “Saved”
- “Assignment submitted”
Duration:
Short-lived (3–5 seconds)
Purpose:
Feedback without interrupting flow.
---
## 7. Toast
Similar to Snackbar but:
- Usually system-level
- No action button
Less interactive than Snackbar.
---
## 8. App Bar / Top App Bar
Definition:
Top fixed bar containing:
- Title
- Back button
- Overflow menu
In LMS:
- Unit title
- “Back to Course”
- Search
- Overflow (•••)
---
## 9. Speed Dial
Definition:
Expanded FAB revealing multiple secondary actions.
Example:
- New Thread
- New Announcement
- New Note
Use carefully.
Can quickly become cluttered.
---
## 10. Chip
Definition:
Compact visual element representing:
- Tag
- Filter
- Category
- Status
In Astro LMS:
- Exoplanets
- Cosmology
- Spectroscopy
- Unit 3
Chips are excellent for semantic structuring.
---
## 11. Stepper
Definition:
Progress visualization divided into steps.
In LMS:
- Week 1 → Week 2 → Week 3
- Module progression
Useful for pedagogical clarity.
---
## 12. Progress Indicator
Types:
- Linear progress bar
- Circular progress
Use minimal thickness (2–4px) for academic tone.
---
## 13. Contextual Menu (Overflow Menu)
The classic:
```
⋮
```
Contains:
- Edit
- Report
- Share
- Settings
Keeps interface clean.
---
## 14. Drawer Navigation vs Bottom Navigation
Material Design distinction:
|Pattern|Best For|
|---|---|
|Bottom Nav|3–5 primary destinations|
|Drawer|Many secondary destinations|
For mobile LMS:
Bottom Nav preferred.
---
# Interaction Hierarchy Model
For your Astro LMS:
Global Navigation → Bottom Nav
Primary Action → FAB
Context Details → Bottom Sheet
Structural Navigation → TOC (Drawer/Desktop, Sheet/Mobile)
Micro Feedback → Snackbar
Semantic Tags → Chips
---
# Pedagogical Layer
UI should:
- Reduce cognitive load
- Support linear progression
- Avoid metric anxiety
- Make status available but not dominant
Avoid:
- Gamified dashboards
- Overlapping overlays
- Excess motion
---
# Brief Material Design Context
Material Design was introduced by Google in 2014 as a unified design language emphasizing:
- Surface layering
- Motion as meaningful transition
- Touch ergonomics
- Visual hierarchy through elevation
- Minimal but expressive interaction cues
It evolved into:
- Material Design 2 (2018)
- Material You (Material 3, 2021)
Key principle:
Interfaces must express structure, not decoration.
---
# Bibliography
Google. (2014–2023). _Material Design Guidelines_.
https://material.io
Wroblewski, L. (2011). _Mobile First_. A Book Apart.
Norman, D. (2013). _The Design of Everyday Things_. Basic Books.
Tidwell, J., Brewer, C., & Valencia, A. (2020). _Designing Interfaces_. O’Reilly.
Nielsen, J. (1994–2020). _Usability Heuristics for User Interface Design_. Nielsen Norman Group.
---
If you want, I can now create:
- A taxonomy diagram of UI patterns for your LMS
- Or a decision tree for when to use FAB vs bottom nav vs drawer
- Or a minimal scientific interaction doctrine tailored specifically for academic platforms