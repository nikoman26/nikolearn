# NIKOlearn MVP

An offline-first, privacy-centric learning platform designed for neurodivergent students and aligned with the Kenyan CBC curriculum.

## Tech Stack (2025)
- **Frontend**: React (with Tailwind CSS for Soma-UI)
- **AI**: Gemini 2.0 Flash (Mwalimu AI)
- **Design System**: Soma-UI (Claymorphism / Bento Grids)
- **Icons**: Lucide React
- **Animations**: Tailwind Transitions (Framer Motion ready)

## Change Log

### Phase 1: Identity & Layout (Completed)
- [x] Initialized project with Soma-UI theme (Claymorphism).
- [x] Created responsive Bento Grid Dashboard.
- [x] Implemented mobile-first Navigation Bar.
- [x] Defined core TypeScript types for Students and Lessons.

### Phase 2: Mwalimu AI (Completed)
- [x] Integrated Gemini API for conversational CBC tutoring.
- [x] Created "Mwalimu" system instructions for Kenyan cultural context.
- [x] Built the floating AI chat interface with localized responses.

### Phase 3: Science Lab & Mock Interaction (Completed)
- [x] Built a simulated 3D Science Lab for "Photosynthesis" using CSS transforms.
- [x] Added interaction hotspots for interactive learning.

### Phase 4: Economy & Gamification (In Progress)
- [ ] Implement LearnCoin transaction history.
- [ ] Connect Shop logic to actual user wallet state.

### Phase 5: Profile Management & Logging (Completed)
- [x] ProfileManager Component: Added comprehensive user profile management interface.
- [x] ActivityLogger Component: Integrated activity tracking system.
- [x] Improved Navigation: Integrated Profile and Activity options with role-based access and responsive menu.
- [x] Logout Functionality: Added session termination interface.

### Phase 6: Modules Creation & Bug Fixes (Completed)
- [x] VRExperience: Initialized VR experience module.
- [x] AROverlay: Initialized AR overlay module.
- [x] AnalyticsDashboard: Initialized analytics dashboard.
- [x] Asset Pathing: Fixed critical pathing issues in index.html.
- [x] Component Imports: Corrected import errors in App.tsx.
- [x] Responsiveness: Enhanced UI scaling across various viewports.

## Progress Notes
- **Bugs**: Gemini API requires an environment variable `API_KEY`. Added check to provide helpful feedback to devs if missing.
- **Solution**: Used CSS `shadow-clay` custom extensions in Tailwind for consistent UI aesthetics across all components.
