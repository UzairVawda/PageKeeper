# PageKeeper

A mobile-first reading habit tracker that helps you build consistent reading habits through daily tracking, streak gamification, and social accountability.

## Features

### Current (v0.1)
- **Splash Screen** - Animated book opening with warm earth tones branding

### Planned
- **Reading Tracking** - Log pages read with optional timer
- **Streaks & Goals** - Daily streaks with "sick days" protection
- **Reading Groups** - Private groups for accountability with friends
- **Book Management** - Add books via Google Books API or manually
- **Achievements** - Unlock badges for milestones
- **Offline Support** - Full offline functionality with sync

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile development |
| **Expo** | Development tooling and build infrastructure |
| **TypeScript** | Type-safe JavaScript |
| **NativeWind** | Tailwind CSS for React Native |
| **React Native Reanimated** | Smooth, native-driven animations |
| **Firebase** | Auth, database, storage, notifications (planned) |

## Project Structure

```
app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # App screens
│   ├── features/       # Feature modules (auth, books, etc.)
│   ├── theme/          # Colors, typography
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API/Firebase services
│   ├── navigation/     # Navigation config
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── assets/             # Images, fonts
└── [config files]      # Expo, Babel, Metro, Tailwind configs
```

## Getting Started

### Prerequisites
- Node.js 18+
- Expo Go app on your phone

### Installation

```bash
cd app
npm install
```

### Running the App

```bash
npm start
```

Scan the QR code with Expo Go (iOS/Android) to run on your device.

## Color Palette

Warm earth tones for a cozy reading experience:

| Color | Hex | Usage |
|-------|-----|-------|
| Brown 600 | `#8B5E3C` | Primary buttons, accents |
| Brown 800 | `#5D4037` | Headings, dark text |
| Amber 600 | `#D97706` | Highlights, warnings |
| Cream 50 | `#FAF5F0` | Background |

## License

Private - All rights reserved
