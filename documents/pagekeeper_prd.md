# Product Requirements Document (PRD)
## PageKeeper - Reading Habit Tracker

**App Name:** PageKeeper  
**Tagline:** "Build your reading habit, one page at a time"  
**Version:** 1.0  
**Date:** January 29, 2026  
**Status:** Planning Phase  
**Author:** Product Team

---

## Table of Contents
1. [Product Overview](#1-product-overview)
2. [User Personas & Use Cases](#2-user-personas--use-cases)
3. [Core Features](#3-core-features)
4. [Technical Stack](#4-technical-stack)
5. [User Flows](#5-user-flows)
6. [Data Models](#6-data-models)
7. [User Constraints & Limitations](#7-user-constraints--limitations)
8. [Monetization Strategy](#8-monetization-strategy)
9. [Success Metrics](#9-success-metrics)
10. [Future Roadmap (V2)](#10-future-roadmap-v2)

---

## 1. Product Overview

### 1.1 Vision
A simple, beautiful mobile app that helps people build consistent reading habits through effortless daily tracking, motivating streak gamification, and gentle accountability with 1-2 close reading friends.

### 1.2 Mission
Make reading a sustainable daily habit by removing all friction from tracking while providing optional, non-intrusive accountability through close friends.

### 1.3 Target Users
- **Primary:** Adults (25-45) who want to read more but struggle with consistency
- **Secondary:** Couples, close friends, or reading partners who want to motivate each other
- **Persona Example:** Sarah, 32, professional who sets reading goals each year but rarely achieves them. Wants something simpler than Goodreads, focused on habit-building not social networking.

### 1.4 Problem Statement
Aspiring readers struggle with:
1. Building consistent reading habits
2. Staying motivated without external accountability
3. Finding simple tools focused on habit-building (not book reviews)
4. Tracking progress across multiple books
5. Maintaining streaks without guilt or pressure
6. Having gentle accountability without overwhelming social features
7. Remembering what they read each day

### 1.5 Solution
A mobile-first reading tracker that:
- Makes logging reading as simple as entering a number
- Gamifies consistency through streaks and achievements
- Provides gentle accountability through 1-2 close reading friends
- Sends smart reminders that respect user habits
- Captures daily reading notes for reflection
- Works offline and syncs seamlessly
- Respects privacy and keeps it personal

---

## 2. User Personas & Use Cases

### Persona 1: The Goal-Setter
**Name:** Sarah, 32  
**Occupation:** Marketing Manager  
**Reading Goal:** Read 24 books this year  
**Pain Points:**
- Starts strong in January, loses momentum by March
- Gets distracted by phone/social media while reading
- Forgets to track reading consistently
- No accountability when life gets busy
- Can't remember what happened in books she read months ago

**How PageKeeper helps:**
- Daily streak keeps her motivated
- Reading timer with lock screen prevents distractions
- Weekend vs. weekday goals accommodate her schedule
- Sick days prevent guilt when she's genuinely busy
- Daily notes help her remember key moments from each book

### Persona 2: The Reading Couple
**Name:** Mike & Jessica (engaged couple)  
**Occupation:** Software Engineer & Teacher  
**Reading Goal:** Read together for 30 mins before bed  
**Pain Points:**
- One person reads faster, creates imbalance
- Lose motivation when partner is busy
- Want to encourage each other without pressure
- No way to gently remind partner without nagging

**How PageKeeper helps:**
- Connect as reading friends (just the two of them)
- See each other's daily progress and streaks
- Send gentle "time to read!" reminder notifications
- Both get achievement notifications when one hits milestones
- Private and personal, not public social media

### Persona 3: The Busy Parent
**Name:** David, 38  
**Occupation:** Parent of 2, works from home  
**Reading Goal:** Read 15 minutes daily  
**Pain Points:**
- Inconsistent schedule (kids, work, life)
- Feels guilty breaking reading streaks
- Reads in short bursts throughout the day
- Forgets book details quickly with interruptions

**How PageKeeper helps:**
- Can log multiple short sessions per day
- Sick days prevent streak anxiety
- Simple page tracking (doesn't matter how long it takes)
- Flexible notification schedule
- Daily notes capture thoughts before forgetting

---

## 3. Core Features

### 3.1 Authentication & Onboarding

**Sign Up Options:**
- Email & password
- Google Sign-In (OAuth)

**Splash Screen:**
- PageKeeper branding
- Tagline: "Build your reading habit, one page at a time"
- "Sign Up" and "Login" buttons
- Clean, book-themed design

**Sign-Up Page:**

**Email/Password:**
- Email address (required)
- Password (required, min 8 characters)
- Confirm password (required)

**Google Sign-In:**
- One-tap authentication
- Auto-populates email, name, profile picture

**Onboarding Flow (Immediately After Sign-Up):**

**Screen 1: Welcome Tour (Skippable)**
- Slide 1: "Track your reading effortlessly"
- Slide 2: "Build streaks and hit your goals"  
- Slide 3: "Connect with a reading friend (optional)"
- Skip button available on all slides

**Screen 2: Profile Setup**
- Full name (required)
- Username (required, 3-20 characters, uniqueness check)
- Profile picture (optional, "Add later" button)
- Phone number (optional, "For SMS notifications (optional)")

**Screen 3: Set Your Goals**
- Weekday goal (slider, default 20 pages)
- Weekend goal (slider, default 30 pages)
- "Why different goals?" tooltip

**Screen 4: Notification Preferences**
- Enable notifications toggle
- If enabled:
  - Weekday reminder days (checkboxes: M, T, W, Th, F)
  - Weekday time (time picker, default 7:00 PM)
  - Weekend reminder days (checkboxes: Sat, Sun)
  - Weekend time (time picker, default 10:00 AM)
- Timezone auto-detected

**Screen 5: Add Your First Book (Optional)**
- Search Google Books API or manual entry
- "Skip for now" prominent button
- "You can add books anytime" reassurance

**Result:** User has complete profile in ~2 minutes, ready to start tracking

**Password Recovery:**
- "Forgot Password?" link on login screen
- Email with reset link (valid 24 hours)
- Standard secure reset flow

---

### 3.2 Book Management

#### Adding Books

**Method 1: Google Books API Search**
- Search bar with real-time autocomplete
- Results show: Cover image, title, author, page count
- Tap to select → Auto-fills all details
- "Can't find it? Add manually" link

**Method 2: Manual Entry**
- Title (required, max 200 characters)
- Author (required, max 100 characters)
- Total pages (required, number input)
- Cover image (optional, upload from camera/gallery or leave default)

**Book Details Stored:**
- Title, author, total pages
- Cover image URL
- Status: "Reading", "Completed", "Paused"
- Start date (auto-set when added)
- Completion date (auto-set when marked complete)
- Google Books ID (if from API)

#### Multiple Books Simultaneously
- Users can track unlimited books with "Reading" status
- Default sort: Most recently updated
- Can search/filter book list
- Swipe actions: Archive, Mark complete, Pause

---

### 3.3 Reading Session Tracking

#### Logging Pages Read

**Quick Log Screen:**
- Select book (if tracking multiple)
- Enter pages read this session (number input)
- Optional: Add reading notes (see section 3.4)
- "Log Reading" button

**What Happens:**
- Updates book progress automatically
- Increments daily page count
- Updates streak if first log of the day
- Triggers achievement if milestone reached
- Syncs with reading friends

**Progress Display:**
```
Current book: "The Last Lecture" (206 pages)
Pages read so far: 45/206 (22%)
Today's reading: +15 pages
Current streak: 12 days 🔥
```

**Multiple Sessions Per Day:**
- Can log reading multiple times
- Each session adds to daily total
- History shows all sessions with timestamps

**Session History:**
- View all past reading sessions
- Filter by book, date range
- Shows: Date, pages read, time spent (if timer used), notes

#### Optional Reading Timer

**Two Modes:**

**Timer Mode (Countdown):**
- User sets duration (5, 10, 15, 20, 30, 45, 60 minutes)
- Large countdown display
- Gentle alarm/vibration when complete
- Prompts: "How many pages did you read?"

**Stopwatch Mode (Count Up):**
- Starts at 0, counts up
- User stops when finished reading
- Shows elapsed time
- Prompts: "How many pages did you read?"

**Lock Screen Feature:**
- "Lock Reading Mode" toggle before starting
- Screen dims, shows only large timer
- Unlock requires: Swipe up + hold for 2 seconds
- Purpose: Prevent quick app-switching distractions
- Emergency calls still work (phone functionality unaffected)

**Timer Behavior:**
- Leaving app → Timer pauses automatically
- Locking phone → Timer pauses automatically
- Notification: "Your reading timer was paused"
- Can resume or end session

**Post-Timer:**
- Shows total time
- Prompts for pages read
- Option to add notes
- Saves as complete session

---

### 3.4 Daily Reading Notes

**Feature Description:**
After logging pages read, users can optionally write notes about what they read that day.

**Note Creation:**
- Appears after "Log Reading" button
- Text area: "Add notes about today's reading (optional)"
- 500 character limit
- Placeholder: "What happened? Any favorite quotes or thoughts?"
- "Skip" and "Save" buttons

**Note Details Stored:**
- Date of reading session
- Associated book
- Note text
- Tags (optional, future feature)

**Viewing Notes:**
- "Reading Journal" tab in profile
- Timeline view of all notes
- Filter by book
- Search notes by keyword
- Export notes for a specific book

**Privacy:**
- Notes are private by default
- NOT visible to reading friends
- User owns and controls all notes
- Can export as PDF/text file

**Use Cases:**
- Remember plot points
- Track character development
- Save favorite quotes
- Note questions or thoughts
- Build reading comprehension

**Example Flow:**
```
User logs 15 pages → 
"Add notes about today's reading?" →
User writes: "The chapter where Randy talks about his 
childhood dreams really hit me. Makes me think about 
what I've given up on." →
Saves to Reading Journal →
Later can review all notes for "The Last Lecture"
```

---

### 3.5 Streaks & Goals

#### Daily Reading Streaks

**How it Works:**
- Streak = consecutive days with at least 1 page logged
- Streak increments when user logs on a new calendar day
- Streak breaks if user misses a day (no logging)
- Longest streak saved as personal record

**Streak Protection: Sick Days**
- Users get 2 "sick days" per month
- Can use sick day to protect streak when can't read
- Must be used proactively (not retroactive)
- Shows in UI: "Sick days: 2/2 available"
- Resets on 1st of each month

**Example:**
```
Day 12 streak → User doesn't read today
Before day ends:
- Use sick day → Streak protected at 12 days
- Don't use → Streak breaks tomorrow, resets to 0
```

**Streak Display:**
- Current streak with flame emoji (🔥 12 days)
- Longest streak achievement
- Calendar view showing logged days
- "At risk!" warning if haven't logged today

#### Reading Goals

**Daily Goals (Customizable):**
- **Weekday Goal:** Default 20 pages (Mon-Fri)
- **Weekend Goal:** Default 30 pages (Sat-Sun)
- User can adjust anytime
- Can make them the same or different

**Goal Tracking:**
- Today's progress: "12/20 pages (60%)"
- Visual progress bar
- Celebration when goal achieved
- No punishment for missing goals (positive reinforcement only)

**Weekly View:**
- Bar chart: Pages read each day
- Green bars when goal met, blue when not
- Total pages for week
- Avg pages per day

**Monthly Stats:**
- Total books completed this month
- Total pages read
- Days reading / days in month
- Average pages per day
- Streak milestones reached

---

### 3.6 Notifications

#### Notification Types

**1. Daily Reading Reminders**

**Customizable Schedule:**
- Weekday options:
  - Select days (Mon-Fri checkboxes)
  - Set time (time picker)
- Weekend options:
  - Select days (Sat, Sun checkboxes)
  - Set time (time picker)
- Can have different times for weekdays vs weekends

**Smart Logic:**
- Check: Has user logged reading today?
- If NO → Send reminder at scheduled time
- If YES → Skip reminder (already logged)
- Respects quiet hours (10 PM - 8 AM default, customizable)

**Example Notifications:**
- "📚 Time to read! You're on a 12-day streak 🔥"
- "📖 Your daily reading awaits! Keep that momentum."
- "🔥 Don't break your 25-day streak! Read a few pages."

**2. Streak Milestone Celebrations**

Sent when user logs reading and hits milestone:
- 3 days: "🎉 3 days! You're building a habit!"
- 7 days: "🔥 One week streak! Keep it going!"
- 14 days: "⭐ Two weeks! You're on fire!"
- 30 days: "🏆 30 days! That's dedication!"
- 50 days: "💪 50 days! Unstoppable!"
- 100 days: "👑 100 DAYS! You're a reading legend!"
- 365 days: "🎊 ONE YEAR! You've built a lifelong habit!"

**3. Friend Activity Notifications**

When you have reading friends:
- "Sarah just logged 25 pages! 🎉"
- "Mike completed 'The Last Lecture'! ⭐⭐⭐⭐⭐"
- "Jessica reached a 30-day streak! 🔥"
- "Your friend reminded you to read today 💙"

**4. Achievement Unlocked**

When user earns a badge:
- "🏆 Achievement Unlocked: Week Warrior!"
- "⭐ You've read 5 books this year!"
- "📚 1,000 pages milestone reached!"

**User Controls:**
- Toggle each notification type on/off independently
- Set quiet hours (no notifications during sleep)
- Snooze reminders for a day
- Notification frequency settings

---

### 3.7 Reading Friends

**Concept:**
Connect with 1-2 close friends (partner, best friend, etc.) to share progress and provide gentle accountability. No public social network, just intimate friend connections.

#### Friend Limits
- Maximum 2 reading friends
- Deliberately limited to keep it personal
- Not a social network - just close accountability

#### Adding Friends

**Method 1: Friend Code**
- Each user has unique friend code (e.g., "SARAH2847")
- Share code via text, email, in person
- Friend enters code → Sends friend request
- You approve → Connected

**Method 2: Username Search**
- Search by exact username
- Send friend request
- They approve → Connected

**Friend Request Flow:**
```
User A sends request → 
User B gets notification →
User B approves/denies →
If approved: Both connected as friends
```

#### What Friends Can See

**Visible to Friends (Based on Privacy Settings):**
- Current book title
- Current reading streak
- Pages read today
- Daily/weekly goals
- Book completions (title, rating)
- Achievements earned

**Privacy Controls:**
User can toggle what friends see:
- ✅/❌ Show current book
- ✅/❌ Show streak
- ✅/❌ Show daily progress
- ✅/❌ Show completed books
- ✅/❌ Show achievements

**Default Settings:**
- All visible (since friends are intentionally added)
- User can hide specific items

**NOT Visible to Friends:**
- Reading notes (always private)
- Book reviews (private)
- Saved quotes (private)
- Reading timer usage
- Exact reading times/sessions

#### Friend Features

**Friend Dashboard:**
- See friends' current stats in one view
- Quick access to each friend's profile
- Recent activity feed
- Upcoming milestones

**Friend Profile View:**
```
Sarah's Reading
━━━━━━━━━━━━━━━
Currently Reading: "Atomic Habits"
Progress: 85/320 pages (27%)
Streak: 🔥 15 days
Today: 12 pages read
This week: 85 pages

Recent completions:
📚 "The Last Lecture" ⭐⭐⭐⭐⭐ (Jan 20)
📚 "Tuesdays with Morrie" ⭐⭐⭐⭐ (Jan 5)

[Send Reading Reminder]
```

**Send Reading Reminder:**
- Big friendly button on friend's profile
- One tap → Friend gets notification
- Rate limited: Max 1 reminder per friend per day
- Notification to friend: "Sarah sent you a gentle reminder to read today 💙"
- Non-intrusive, supportive tone

**Friend Activity in Your Feed:**
- "Sarah logged 25 pages today!"
- "Mike completed a book! ⭐⭐⭐⭐"
- "Jessica is on a 30-day streak! 🔥"
- Opt-in: Can mute friend activity notifications

#### Removing Friends

- Can remove friend anytime
- Both users notified
- Previous shared data not deleted
- Can re-add later if desired

**Graceful Handling:**
- "Are you sure? Sarah won't be notified, but you'll both lose connection."
- Confirm button
- Clean removal, no drama

---

### 3.8 Book Completion Flow

When user marks book as complete:

**Step 1: Confirmation**
- "You've read 206/206 pages. Mark 'The Last Lecture' as complete?"
- [Cancel] [Complete Book]

**Step 2: Rate the Book**
- "How would you rate this book?"
- 1-5 star selector (large, tappable stars)
- Required field

**Step 3: Write Review (Optional)**
- "Share your thoughts (optional)"
- Text area, 500 character limit
- Placeholder: "What did you think? Any highlights?"
- [Skip] [Save Review]

**Step 4: Review Privacy**
- "Who can see this review?"
- Radio buttons:
  - ○ Private (only you)
  - ○ Friends (your 1-2 reading friends)
  - ○ Public (for V2 feature - all app users)
- Default: Private
- Note: "Public reviews will be available in a future update"

**Step 5: Celebration**
- Full-screen confetti animation
- "🎉 Book Complete!"
- Summary:
  - Title and author
  - Pages read: 206
  - Time to complete: 14 days
  - Average pace: 15 pages/day
- Badge earned (if applicable):
  - "First book completed!" 📚
  - "5 books this year!" 📚📚📚
  - "1,000 pages milestone!" 📄

**Step 6: What's Next?**
- "Start your next book?"
- [Add New Book] button
- [View Reading History] button
- [Back to Home] button

**Behind the Scenes:**
- Book status → "Completed"
- Completion date saved
- Added to reading history
- Visible to friends (if privacy allows)
- Achievement check triggered
- Stats updated

---

### 3.9 Quotes & Highlights

**Saving Quotes:**

**From Reading Session:**
- While logging pages, option: "Save a quote"
- Book auto-selected (current book)
- Enter quote text (500 char max)
- Page number (optional)
- Your thoughts (optional, 200 char)

**Anytime:**
- From book details page → "Add Quote"
- Select book from library
- Enter details

**Quote Library:**
- Accessible from profile tab
- List view of all saved quotes
- Search by quote text or book
- Filter by book
- Sort by: Date added, Book title, Page number

**Quote Card Display:**
```
┌─────────────────────────────────────┐
│ "We cannot change the cards we are  │
│ dealt, just how we play the hand."  │
│                                     │
│ The Last Lecture, p. 52             │
│ Randy Pausch                        │
│                                     │
│ Your note: This really resonated... │
│                                     │
│ Saved: Jan 28, 2026                │
└─────────────────────────────────────┘
```

**Quote Actions:**
- Share as image (pretty card design with book theme)
- Copy to clipboard
- Edit note
- Delete quote

**Privacy:**
- All quotes private by default
- NOT visible to friends
- Export quotes for a book as PDF
- Include in book review (optional)

---

### 3.10 Achievements & Badges

**Achievement Categories:**

**Streak Achievements:**
- 🔥 Spark - 3 day streak
- 🔥 Flame - 7 day streak
- 🔥 Blaze - 14 day streak
- 🏆 Inferno - 30 day streak
- 💪 Unstoppable - 50 day streak
- 👑 Century - 100 day streak
- 🎊 Legend - 365 day streak

**Book Milestones:**
- 📚 First Pages - Complete first book
- 📚 Bookworm - 5 books completed
- 📚 Scholar - 10 books completed
- 🎯 Bibliophile - 25 books completed
- 🌟 Library - 50 books completed
- 👑 Librarian - 100 books completed

**Page Milestones:**
- 📄 Getting Started - 100 pages
- 📄 Momentum - 500 pages
- 📄 Milestone - 1,000 pages
- 📄 Journey - 5,000 pages
- 📄 Epic Reader - 10,000 pages
- 📄 Master Reader - 25,000 pages

**Habit Building:**
- ⏰ Focused Reader - Used timer 10 times
- ⏰ Time Keeper - Used timer 50 times
- 🎯 Goal Crusher - Met daily goal 30 days
- 🎯 Dedicated - Met daily goal 100 days
- 💪 Resilient - Used all sick days wisely
- 📝 Reflective - Wrote 25 reading notes

**Social:**
- 👥 Accountable - Added first reading friend
- 💙 Supportive - Sent 10 reading reminders to friends
- 🎉 Motivator - Friend completed book after your reminder

**Badge Display:**
- Profile tab → "Achievements" section
- Grid view of all badges
- Unlocked badges in color
- Locked badges in grayscale with progress
- Tap badge → See details and unlock date
- Share achievement on social media (optional)

**Notifications:**
- When badge earned: "🏆 Achievement Unlocked: Week Warrior!"
- Shows badge graphic
- Celebration animation
- Friends notified (if privacy allows)

---

### 3.11 Offline Support

**Works Offline:**
- ✅ View all reading stats, history, current books
- ✅ Log pages read (queued for sync)
- ✅ Start/stop reading timer
- ✅ Write reading notes
- ✅ View saved quotes
- ✅ View achievements
- ✅ View reading friends' cached data

**Requires Internet:**
- ❌ Add new books via Google Books API (manual entry works offline)
- ❌ Upload profile pictures
- ❌ Add/remove reading friends
- ❌ Send friend reminders
- ❌ See real-time friend updates
- ❌ Sign up / Login
- ❌ Sync data across devices

**Sync Behavior:**
- Icon shows sync status (synced, syncing, offline)
- Auto-syncs when connection restored
- Conflict resolution: Local changes take priority
- Warning if offline for 7+ days
- Manual "Force Sync" button in settings

---

## 4. Technical Stack

### 4.1 Mobile Framework

**React Native**
- Single codebase for iOS and Android
- Fast development and iteration
- Large ecosystem of libraries
- Familiar React patterns
- Excellent performance for this use case

**Key Libraries:**
- **React Navigation** - Screen navigation and routing
- **React Native Paper** - UI component library
- **React Native Firebase** - Backend integration
- **AsyncStorage** - Local offline storage
- **React Native Push Notification** - Push notifications
- **React Native Image Picker** - Photo uploads
- **React Native Keychain** - Secure credential storage
- **React Native Biometrics** - Face ID / Touch ID
- **React Native Device Info** - Device identification
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch interactions

### 4.2 Backend & Database

**Firebase Suite:**

**1. Firebase Authentication**
- Email/password authentication
- Google OAuth integration
- Password reset functionality
- Secure session management
- Multi-device support

**2. Cloud Firestore (Database)**
- NoSQL document database
- Real-time syncing
- Offline persistence built-in
- Excellent scalability
- Security rules for access control

**3. Firebase Storage**
- Profile pictures
- Book cover uploads
- Quote share images
- Secure file hosting

**4. Firebase Cloud Messaging (FCM)**
- Push notifications to iOS and Android
- Scheduled notifications via Cloud Functions
- Friend reminder notifications
- Achievement notifications

**5. Firebase Cloud Functions**
- Scheduled jobs (daily reminder checks)
- Send push notifications
- Calculate streaks
- Award achievements
- Friend request handling
- Data aggregation for stats

**6. Firebase Analytics**
- Track user engagement
- Feature usage metrics
- Retention analysis
- Funnel tracking

**7. Firebase Security**
- Firebase Security Rules - Database access control
- Firebase App Check - Verify legitimate app instances
- Secure authentication flows
- Server-side validation via Cloud Functions

**Cost Estimate (10,000 active users):**
- Free tier covers: 50k reads/day, 20k writes/day, 1GB storage
- Estimated cost: $50-150/month once exceeding free tier
- Scales automatically

---

### 4.3 Third-Party APIs & Services

**Google Books API:**
- Book search and metadata
- Cover image URLs
- Author and publisher info
- Free tier: 1,000 requests/day
- Sufficient for MVP needs

**Image Handling:**
- Book covers cached in Firebase Storage
- Profile pics stored in Firebase Storage
- Image compression before upload (reduce bandwidth)
- CDN delivery via Firebase Hosting

**Future Services (Post-MVP):**
- SendGrid - Transactional emails (password reset, etc.)
- Sentry - Error tracking and monitoring
- Mixpanel - Advanced product analytics

---

### 4.4 Development Tools

**Version Control:**
- Git + GitHub
- Branch strategy: `main`, `develop`, `feature/*`
- Pull request reviews required
- Protected main branch

**CI/CD:**
- GitHub Actions for automation
- Automated testing on PR
- Build iOS/Android on merge
- Deploy to TestFlight/Play Console Beta

**Testing:**
- **Jest** - Unit tests for business logic
- **React Native Testing Library** - Component tests
- **Detox** - End-to-end testing (optional for V1)
- Manual QA on physical devices

**Design Tools:**
- **Figma** - UI/UX design and prototyping
- Design system with reusable components
- Shared component library

**Code Quality:**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type safety (optional but recommended)
- **Husky** - Pre-commit hooks

---

## 4.5 Security & Data Protection

### 4.5.1 Security Philosophy

PageKeeper prioritizes user security and privacy while maintaining an excellent user experience. We implement industry-standard security practices appropriate for a personal reading app.

**Core Principles:**
- Security by design
- Transparent data practices
- User control over personal data
- Compliance with privacy regulations
- Regular security audits

### 4.5.2 Data Encryption

**Encryption in Transit:**
- TLS 1.3 for all client-server communication
- Certificate pinning to prevent MITM attacks
- Secure OAuth flows with PKCE
- Encrypted WebSocket connections

**Encryption at Rest:**
- AES-256 encryption on Firebase servers
- Automatic encryption via Google Cloud Platform
- Encrypted database backups
- Secure key management by Google

**Local Device Storage:**
- iOS: Keychain Services for sensitive data
- Android: Android Keystore System
- Credentials encrypted at rest
- Session tokens secured

### 4.5.3 Authentication & Access Control

**Password Security:**
- Minimum 8 characters required
- Passwords hashed with bcrypt (work factor 12)
- Never stored in plain text
- Never logged or transmitted in errors

**Session Management:**
- JWT tokens with 30-day expiration
- Automatic refresh for active users
- Logout from all devices option
- Session revocation on password change

**OAuth (Google Sign-In):**
- Standard OAuth 2.0 flow
- PKCE for mobile security
- Minimal permissions (profile, email only)
- User can revoke access anytime

**Two-Factor Authentication (Optional):**
- SMS-based verification codes
- Optional for users wanting extra security
- Firebase Phone Auth implementation

### 4.5.4 Firebase Security Rules

**User Data Protection:**
```javascript
// Users can only access their own data
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}

// Book data restricted to owner
match /books/{bookId} {
  allow read, write: if resource.data.userId == request.auth.uid;
}

// Reading sessions protected
match /sessions/{sessionId} {
  allow read, write: if resource.data.userId == request.auth.uid;
}
```

**Friend Access:**
```javascript
// Friends can view limited profile data
match /users/{userId} {
  allow read: if request.auth.uid in resource.data.friends;
}
```

### 4.5.5 Input Validation & Sanitization

**Client-Side Validation:**
- All user input validated before submission
- Type checking for numeric inputs
- Length limits enforced
- Email format validation
- Username alphanumeric validation

**Server-Side Validation:**
- Re-validate all inputs (never trust client)
- Sanitize text to prevent XSS
- Length limits enforced
- Rate limiting on all endpoints

**Content Security:**
- XSS protection via input sanitization
- No inline script execution
- Content Security Policy headers
- Image uploads scanned

### 4.5.6 Rate Limiting

**Authentication:**
- Login attempts: 5 per IP per 15 minutes
- Sign-up: 3 per IP per hour
- Password reset: 3 per email per hour

**App Actions:**
- Book additions: 20 per user per day
- Friend requests: 10 per user per day
- Friend reminders: 1 per friend per day
- Message limits: N/A (no messaging feature)

**Firebase App Check:**
- Verify requests from legitimate app
- Prevent API abuse from clones
- Device attestation

### 4.5.7 Privacy & User Control

**Privacy by Default:**
- Reading notes always private
- Friend connections intentional (not automatic)
- User controls what friends see
- No public social features (until V2)

**User Privacy Controls:**
- Toggle friend visibility for each data type
- Delete account and all data
- Export all personal data (GDPR)
- Opt-out of analytics
- Manage all notification preferences

**Data Retention:**
- Active accounts: Data kept indefinitely
- Deleted accounts: All data erased in 30 days
- Backup retention: 90 days
- Friend connections: Cleaned immediately on removal

**GDPR Compliance:**
- Clear privacy policy
- Explicit consent for data collection
- Right to access (data export)
- Right to erasure (account deletion)
- Right to portability (JSON export)
- Right to rectification (edit profile)

### 4.5.8 Third-Party Security

**Dependency Management:**
- Regular dependency updates
- Automated vulnerability scanning (Dependabot)
- Only vetted, maintained libraries
- Minimal dependencies

**Third-Party Services:**
- Google Books API: Read-only, no PII sent
- Firebase: SOC 2, ISO 27001 certified
- All files served over HTTPS

**API Key Security:**
- Stored in environment variables
- Different keys per environment
- Key rotation every 90 days
- Restricted API keys

### 4.5.9 Monitoring & Incident Response

**Security Monitoring:**
- Firebase Crashlytics for errors
- Failed login monitoring
- Unusual activity alerts
- Regular security logs review

**Incident Response:**
1. Detection (automated + user reports)
2. Assessment (scope and severity)
3. Containment (isolate affected systems)
4. Eradication (patch vulnerability)
5. Recovery (restore normal operations)
6. Notification (inform users within 72 hours)
7. Post-mortem (document and improve)

### 4.5.10 Compliance & Certifications

**Current Compliance:**
- **GDPR** (EU data protection)
- **CCPA** (California privacy)
- **COPPA** (must be 13+ to use app)

**Inherited from Firebase:**
- SOC 2 Type II
- SOC 3
- ISO 27001
- ISO 27017
- ISO 27018

### 4.5.11 Mobile-Specific Security

**iOS Security:**
- App Transport Security enabled
- Keychain for sensitive data
- Face ID / Touch ID support
- Secure enclave usage
- Code signing

**Android Security:**
- Network Security Configuration
- Android Keystore
- Fingerprint / Face authentication
- ProGuard code obfuscation
- SafetyNet attestation

**App Permissions (Minimal):**
- Camera (for profile/book photos)
- Photo Library (for uploads)
- Notifications (for reminders)
- Internet (for syncing)

**Secure Storage:**
- No sensitive data in SharedPreferences/UserDefaults
- Encrypted storage for tokens
- Clear data on logout
- Secure data on uninstall

### 4.5.12 Pre-Launch Security Checklist

- [ ] API keys secured and restricted
- [ ] Firebase Security Rules tested
- [ ] Dependencies updated
- [ ] Rate limiting implemented
- [ ] Input validation on all forms
- [ ] Password requirements enforced
- [ ] Session management secure
- [ ] Privacy policy complete
- [ ] GDPR compliance ready
- [ ] Security monitoring configured
- [ ] Incident response plan documented
- [ ] Code security review complete
- [ ] App permissions minimized
- [ ] Penetration testing done

---

## 5. User Flows

### 5.1 First-Time User Flow

```
App Launch
↓
Splash Screen
- PageKeeper logo
- "Build your reading habit, one page at a time"
↓
[Sign Up] or [Login] buttons
↓
──── Sign Up Flow ────
Choose:
- Email/Password
- Google Sign-In
↓
Email/Password:
- Enter email
- Create password
- Confirm password
- [Create Account]
↓
OR Google Sign-In:
- One tap authentication
- Auto-fills email, name
↓
──── Onboarding ────
Screen 1: Welcome Tour (3 slides, skippable)
↓
Screen 2: Profile Setup
- Full name
- Username (uniqueness check)
- Profile picture (optional)
- Phone (optional)
↓
Screen 3: Set Goals
- Weekday pages: [20] (slider)
- Weekend pages: [30] (slider)
↓
Screen 4: Notifications
- Enable toggle
- Weekday days + time
- Weekend days + time
↓
Screen 5: Add First Book (optional)
- Search or manual entry
- [Skip for now]
↓
Home Screen - Ready to read!
```

### 5.2 Daily Usage Flow

```
Open App
↓
Home Screen Shows:
━━━━━━━━━━━━━━━━━━
- Current streak: 🔥 12 days
- Today's goal: 12/20 pages (60%)
- Currently reading:
  "The Last Lecture"
  85/206 pages (41%)
- [Log Reading] button (prominent)
- Reading Friends section (if connected)
  - Sarah: 15 pages today, 🔥 8 days
  - Mike: Not read yet today
━━━━━━━━━━━━━━━━━━
↓
Tap [Log Reading]
↓
Log Reading Screen:
- Book: "The Last Lecture" (dropdown if multiple)
- Pages read: [  ] (number input)
- [Start Timer] (optional)
  OR
- [Quick Log] (no timer)
↓
User chooses Quick Log:
- Enters: 15 pages
- Tap [Log Reading]
↓
Success Screen:
✓ 15 pages logged!
- Book progress: 85 → 100/206 (49%)
- Today's goal: Met! 27/20 pages ✓
- Streak continues: 🔥 13 days
↓
[Add Reading Notes?]
(Optional)
↓
If yes:
- Text area opens
- User writes: "Chapter about childhood dreams..."
- [Save Note]
↓
Returns to Home
- Updated stats visible
- Friends see your update (if connected)
```

### 5.3 Using Reading Timer Flow

```
From Log Reading Screen
↓
Tap [Start Timer]
↓
Timer Setup:
- Choose mode:
  ○ Timer (countdown)
  ○ Stopwatch (count up)
↓
Timer Mode Selected:
- Duration: [20 minutes] (preset buttons: 10, 20, 30, 45, 60)
- [Lock Reading Mode] toggle
- [Start Reading]
↓
Reading Screen:
━━━━━━━━━━━━━━
   19:45
   ⏸ Pause
━━━━━━━━━━━━━━
(If locked: dim screen, swipe+hold to unlock)
↓
Timer completes:
- Gentle vibration
- "Time's up! Great reading session"
↓
Log Pages Screen:
- Timer was: 20 minutes
- How many pages? [  ]
- User enters: 12 pages
- [Add Notes?] optional
- [Save]
↓
Session saved with time + pages
Returns to Home
```

### 5.4 Adding a Reading Friend Flow

```
From Profile Tab
↓
Tap [Reading Friends]
↓
Reading Friends Screen:
- "Connect with 1-2 close friends"
- Current friends: 0/2
- [Add Friend] button
↓
Add Friend Options:
━━━━━━━━━━━━━━━━
1. Friend Code
   "Share your code: SARAH2847"
   [Copy Code] [Share Code]
   
   Or enter friend's code:
   [________]
   [Add Friend]

2. Search Username
   [________]
   [Search]
━━━━━━━━━━━━━━━━
↓
User enters friend code: MIKE4521
Tap [Add Friend]
↓
Friend Request Sent:
- "Request sent to Mike!"
- "Waiting for approval..."
↓
Mike receives notification:
- "Sarah wants to connect as reading friends"
- [Accept] [Decline]
↓
Mike taps Accept
↓
Both users notified:
- "You're now reading friends with Mike!"
↓
Friend appears in Friends list:
━━━━━━━━━━━━━━━━
Mike
Currently reading: "Atomic Habits"
Streak: 🔥 5 days
Today: 10 pages

[View Profile] [Send Reminder]
━━━━━━━━━━━━━━━━
```

### 5.5 Sending Friend Reminder Flow

```
From Reading Friends list
↓
Tap friend who hasn't read today
↓
Friend Profile View:
━━━━━━━━━━━━━━━━
Mike's Reading
Currently Reading: "Atomic Habits"
Progress: 45/320 pages
Streak: 🔥 5 days
Today: 0 pages (not read yet)
━━━━━━━━━━━━━━━━

[Send Reading Reminder] 💙
(Large, friendly button)
↓
Tap [Send Reading Reminder]
↓
Confirmation:
"Send Mike a gentle reminder to read?"
[Cancel] [Send]
↓
Tap [Send]
↓
Success:
✓ Reminder sent!
- Toast message: "Mike will get a notification"
- Button disabled: "Reminder sent today"
↓
Mike receives notification:
📚 "Sarah sent you a gentle reminder to read today 💙"
↓
Mike taps notification:
- Opens app to Home Screen
- [Log Reading] button prominent
```

### 5.6 Book Completion Flow

```
Book reaches 100% progress
(206/206 pages)
↓
Home Screen shows:
🎉 "Ready to complete 'The Last Lecture'?"
[Mark Complete]
↓
Tap [Mark Complete]
↓
Confirmation:
"Complete 'The Last Lecture'?"
- You read 206 pages
- Started: Jan 15, 2026
- Today: Jan 29, 2026
- 14 days to complete
[Cancel] [Yes, Complete]
↓
Rate the Book:
"How would you rate this book?"
⭐⭐⭐⭐⭐ (tappable stars)
- User taps: 5 stars
[Continue]
↓
Write Review (Optional):
"Share your thoughts"
[Text area]
User writes: "Incredibly moving..."
[Skip] [Save Review]
↓
Review Privacy:
"Who can see this review?"
○ Private (only you)
● Friends (Mike, Sarah)
○ Public (coming in V2)
[Continue]
↓
Celebration Screen:
━━━━━━━━━━━━━━━━
   🎉 🎊 ✨
   
   Book Complete!
   
   The Last Lecture
   by Randy Pausch
   
   📖 206 pages read
   📅 14 days
   📊 15 pages/day avg
   
   Achievement Unlocked!
   📚 First Book of 2026
   
━━━━━━━━━━━━━━━━
[Start Next Book]
[View History]
[Back to Home]
↓
User taps [Start Next Book]
↓
Add Book Screen opens
```

### 5.7 Viewing Reading Notes Flow

```
From Profile Tab
↓
Tap [Reading Journal]
↓
Reading Journal Screen:
━━━━━━━━━━━━━━━━
📝 Reading Journal

Filter: [All Books ▼]
Search: [______]

───────────────────
Jan 29, 2026
The Last Lecture (p. 100)

"Chapter about childhood dreams
really resonated. Makes me think..."

───────────────────
Jan 28, 2026  
The Last Lecture (p. 85)

"Randy's perspective on time is
different from what I expected..."

───────────────────
Jan 27, 2026
The Last Lecture (p. 70)

"The brick wall metaphor 🧱"

───────────────────
━━━━━━━━━━━━━━━━
↓
Tap on a note
↓
Note Detail:
- Full note text
- Book title
- Pages read that session
- Date
- [Edit] [Delete] [Share]
↓
Tap [Share]
↓
Share as image (pretty card design)
Share via: Messages, Email, etc.
```

---

## 6. Data Models

### 6.0 Database Structure Overview

The data is organized into **separate top-level collections** optimized for:
- **Performance**: Minimize reads, only fetch what's needed per screen
- **Cost**: Firestore charges per document read/write
- **Organization**: Logical groupings for maintainability

```
Firestore Structure:
├── users/{userId}              # Core identity (small, frequently read)
├── userSettings/{userId}       # Settings (read on app launch)
├── userStats/{userId}          # Stats (read on home screen)
├── books/{bookId}              # All books (query by userId)
├── sessions/{sessionId}        # Reading sessions (query by userId + date)
├── quotes/{quoteId}            # Saved quotes (query by userId)
├── notes/{noteId}              # Reading notes (query by userId + bookId)
├── achievements/{achievementId}# User achievements (query by userId)
└── friendRequests/{requestId}  # Friend requests (query by from/to userId)
```

**Read Optimization by Screen:**

| Screen | Documents Read | Benefit |
|--------|---------------|---------|
| Home | users + userStats + 1 book | 3 small reads instead of 1 massive read |
| Settings | userSettings only | Isolated, no unnecessary data |
| Log Reading | books (query) + create session | Targeted writes |
| Friend Profile | users + userStats (friend) | 2 small reads |
| Reading Journal | notes (paginated query) | No user doc needed |
| Quotes | quotes (paginated query) | No user doc needed |

---

### 6.1 Users Collection

Core identity data only - kept small for frequent reads (~500 bytes)

```javascript
{
  odId: "abc123",                    // Auto-generated Firebase UID
  email: "sarah@email.com",
  username: "bookworm_sarah",          // Unique, 3-20 chars
  fullName: "Sarah Johnson",
  phoneNumber: "+1234567890",          // Optional
  profilePictureUrl: "https://storage.googleapis.com/...",
  friendCode: "SARAH2847",             // Auto-generated, unique
  friends: ["userId_def456", "userId_ghi789"], // Max 2, denormalized for quick lookup
  createdAt: Timestamp,
  lastActive: Timestamp,
  accountStatus: "active"              // "active", "deleted"
}
```

---

### 6.2 User Settings Collection

All preferences in one document - read on app launch (~800 bytes)

```javascript
{
  userId: "abc123",

  // Goals
  dailyGoals: {
    weekday: 20,
    weekend: 30
  },

  // Streak Protection
  streakSettings: {
    sickDaysPerMonth: 2,
    sickDaysUsedThisMonth: 1,
    lastSickDayUsed: "2026-01-15",
    monthReset: "2026-02-01"
  },

  // Notifications
  notificationSettings: {
    enabled: true,
    weekdayReminders: {
      enabled: true,
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      time: "19:00"
    },
    weekendReminders: {
      enabled: true,
      days: ["Saturday", "Sunday"],
      time: "10:00"
    },
    timezone: "America/New_York",
    streakMilestones: true,
    friendActivity: true,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00"
  },

  // Privacy Settings (for friends)
  privacySettings: {
    showCurrentBook: true,
    showStreak: true,
    showDailyProgress: true,
    showCompletedBooks: true,
    showAchievements: true
  },

  // Device Tokens (for push notifications)
  deviceTokens: ["fcm_token_ios", "fcm_token_android"],

  updatedAt: Timestamp
}
```

---

### 6.3 User Stats Collection

Reading statistics - updated frequently, read on home screen (~200 bytes)

```javascript
{
  userId: "abc123",
  currentStreak: 12,
  longestStreak: 45,
  totalBooksCompleted: 8,
  totalPagesRead: 2450,
  lastReadDate: "2026-01-29",        // For streak calculation
  updatedAt: Timestamp
}
```

---

### 6.4 Books Collection

One document per book (~600 bytes)

```javascript
{
  bookId: "book123",                 // Auto-generated
  userId: "abc123",                  // For querying user's books

  // Book Info
  title: "The Last Lecture",
  author: "Randy Pausch",
  totalPages: 206,
  coverImageUrl: "https://...",
  googleBooksId: "xyz789",           // If from API, null if manual

  // Reading Progress
  status: "reading",                 // "reading", "completed", "paused"
  pagesRead: 100,
  percentComplete: 48.5,

  // Dates
  startDate: "2026-01-15",
  completedDate: null,
  lastReadDate: "2026-01-29",

  // Stats
  daysReading: 12,
  totalTimeMinutes: 240,             // If timer used

  // User Review (when completed)
  rating: null,                      // 1-5 stars
  reviewText: null,
  reviewPrivacy: "private",          // "private", "friends", "public"

  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

### 6.5 Reading Sessions Collection

One document per reading session (~300 bytes)

```javascript
{
  sessionId: "session456",           // Auto-generated
  userId: "abc123",
  bookId: "book123",
  date: "2026-01-29",                // For daily queries
  pagesRead: 15,

  // Timer (if used)
  usedTimer: true,
  timerType: "countdown",            // "countdown", "stopwatch", or null
  timeSpentMinutes: 30,

  createdAt: Timestamp
}
```

---

### 6.6 Notes Collection

Reading notes - separate for efficient querying and pagination (~400 bytes)

```javascript
{
  noteId: "note789",                 // Auto-generated
  userId: "abc123",
  bookId: "book123",
  sessionId: "session456",           // Optional link to session

  // Denormalized for display (avoids extra book lookup)
  bookTitle: "The Last Lecture",

  // Note Content
  noteText: "Chapter about childhood dreams really resonated...",
  pageNumber: 85,

  date: "2026-01-29",
  createdAt: Timestamp
}
```

---

### 6.7 Quotes Collection

Saved quotes with user thoughts (~500 bytes)

```javascript
{
  quoteId: "quote123",               // Auto-generated
  userId: "abc123",
  bookId: "book123",

  // Denormalized for display
  bookTitle: "The Last Lecture",
  bookAuthor: "Randy Pausch",

  // Quote Details
  quoteText: "We cannot change the cards we are dealt, just how we play the hand.",
  pageNumber: 52,
  userThoughts: "This resonated with me because...",

  createdAt: Timestamp
}
```

---

### 6.8 Achievements Collection

Earned badges and achievements (~200 bytes)

```javascript
{
  achievementId: "ach001",           // Auto-generated
  userId: "abc123",

  // Achievement Info
  type: "streak_7",                  // Unique achievement identifier
  category: "streak",                // "streak", "books", "pages", "habit", "social"
  title: "Flame",
  description: "Maintained a 7-day reading streak",

  unlockedAt: Timestamp,
  seen: true                         // User has viewed achievement
}
```

**Achievement Types:**
```
Streaks: streak_3, streak_7, streak_14, streak_30, streak_50, streak_100, streak_365
Books: books_1, books_5, books_10, books_25, books_50, books_100
Pages: pages_100, pages_500, pages_1000, pages_5000, pages_10000, pages_25000
Habit: timer_10, timer_50, goal_30, goal_100, sick_days_wise, notes_25
Social: friend_added, reminders_10, friend_completed
```

---

### 6.9 Friend Requests Collection

Friend request management (~300 bytes)

```javascript
{
  requestId: "req001",               // Auto-generated

  // Requester
  fromUserId: "abc123",
  fromUsername: "sarah_reader",

  // Recipient
  toUserId: "def456",
  toUsername: "mike_books",

  // Status
  status: "pending",                 // "pending", "accepted", "declined"

  createdAt: Timestamp,
  respondedAt: null                  // Timestamp when accepted/declined
}
```

---

## 7. User Constraints & Limitations

### 7.1 Account Limits

**Per User:**
- Unlimited books tracked (reading + completed)
- Unlimited reading sessions
- Maximum 2 reading friends
- Maximum 100 saved quotes
- Maximum 50 achievements
- Unlimited reading notes

**Friend Limits:**
- Maximum 2 friends per user
- Maximum 10 friend requests sent (pending)
- Maximum 1 reminder per friend per day
- Friends can be removed and re-added

### 7.2 Data Limits

**Text Limits:**
- Username: 3-20 characters (alphanumeric + underscore)
- Full name: 2-50 characters
- Book title: 200 characters
- Book author: 100 characters
- Reading notes: 500 characters
- Book review: 500 characters
- Quote text: 500 characters
- User thoughts on quote: 200 characters

**File Limits:**
- Profile picture: Max 5 MB, JPG/PNG
- Book cover upload: Max 3 MB, JPG/PNG
- Compressed before upload

### 7.3 Rate Limits

**Authentication:**
- Login attempts: 5 per IP per 15 minutes
- Sign-up attempts: 3 per IP per hour
- Password reset: 3 per email per hour

**App Actions:**
- Add books: 20 per user per day
- Friend requests sent: 10 per user per day
- Friend reminders sent: 1 per friend per day (hard limit)
- Reading sessions logged: Unlimited
- Notes written: Unlimited
- Quotes saved: 20 per day

**API Calls:**
- Google Books API: 1,000 searches per day (free tier)

### 7.4 Inactivity Policies

**User Accounts:**
- No automatic deletion
- Accounts remain active indefinitely
- User can delete account manually anytime

**Friend Connections:**
- No automatic removal for inactivity
- Users can remove friends anytime
- Both notified on removal

**Data Retention:**
- Active accounts: All data kept
- Deleted accounts: All data erased in 30 days
- Backups: 90-day retention, then permanent deletion

### 7.5 Platform Requirements

**iOS:**
- Minimum: iOS 13.0+
- Devices: iPhone 6S and newer
- iPad: Supported (responsive layout)
- Apple Watch: Future consideration

**Android:**
- Minimum: Android 8.0 (API 26)+
- Devices: 2GB+ RAM
- Tablets: Supported (responsive layout)
- Wear OS: Future consideration

**Permissions Required:**
- 📷 Camera (optional - profile/book photos)
- 🖼️ Photo Library (optional - uploads)
- 🔔 Notifications (optional - reminders)
- 🌐 Internet (required - syncing)

### 7.6 Business Rules

**Sick Days:**
- 2 per month maximum
- Resets on 1st of each month
- Cannot be saved/accumulated
- Must be used before day ends (not retroactive)

**Streaks:**
- Must log at least 1 page to maintain streak
- Breaks at midnight local time if no log
- Cannot be recovered once broken (except sick days)
- Current and longest streak both tracked

**Friend Reminders:**
- Maximum 1 per friend per day
- Button disabled after sending
- Resets at midnight local time
- Cannot spam friends

---

## 8. Monetization Strategy

### 8.1 Constraints
- No tiered/freemium model
- All users get all features
- No aggressive ads
- Ethical monetization only
- Maintain excellent user experience

### 8.2 Monetization Approaches

**Phase 1: Launch (Months 1-3)**
- No monetization initially
- Focus on user growth and retention
- Gather feedback and build trust
- Establish user base

**Phase 2: Gentle Monetization (Months 4-6)**

**Option 1: Minimal Banner Ads**
- Single, small banner ad on non-critical screens only:
  - Reading history screen (bottom)
  - Book search results (bottom)
  - Achievements screen (bottom)
- **Never on:**
  - Home screen
  - Log reading screen
  - Reading timer screen
  - Book detail pages
- Ad network: Google AdMob (trusted, quality-controlled)
- Malware filtering enabled
- User can report inappropriate ads
- **Estimated revenue: $0.50-0.75/user/month**

**Option 2: Book Affiliate Links**
- "Buy this book" button on book detail pages
- Links to:
  - Amazon (4-8% commission)
  - Bookshop.org (10% commission - supports indie bookstores)
- Clearly marked as affiliate links
- User sees: "Support indie bookstores & PageKeeper"
- **Estimated revenue: $0.20-0.40/user/month**

**Option 3: Optional Support ("Tip Jar")**
- "Support PageKeeper" button in settings
- One-time tips or monthly support
- Tiers: $1, $3, $5, $10 per month
- No features locked behind payment
- "Help keep PageKeeper ad-free and awesome!"
- Optional supporter badge on profile (if wanted)
- **Estimated revenue: $0.15-0.30/user/month (10% conversion)**

**Phase 3: Optimization (Months 7-12)**

**Test additional options:**
- Sponsored book recommendations (clearly labeled)
- Publisher partnerships for new releases
- "Book of the Month" feature (sponsored)
- All optional, non-intrusive

### 8.3 Revenue Projections

**Assumptions:**
- 10,000 active users by Month 12
- Conservative estimates

**Monthly Revenue (at 10k users):**
- Banner ads: $5,000-7,500
- Affiliate links: $2,000-4,000
- Tip jar support: $1,500-3,000
- **Total: $8,500-14,500/month**

**Costs:**
- Firebase: $150-200/month
- App Store fee: $99/year
- Play Store fee: $25 one-time
- Domains/hosting: $20/month
- **Total monthly: ~$200**

**Net Profit: $8,300-14,300/month**

### 8.4 Ethical Guidelines

**Will Never:**
- ❌ Lock features behind paywall
- ❌ Create artificial limits for free users
- ❌ Sell user data
- ❌ Show intrusive full-screen ads
- ❌ Auto-play video ads
- ❌ Trick users into clicking ads

**Will Always:**
- ✅ Be transparent about monetization
- ✅ Give users control over ads/privacy
- ✅ Support indie bookstores when possible
- ✅ Respect user experience above profit
- ✅ Keep the app clean and focused

---

## 9. Success Metrics

### 9.1 Key Performance Indicators (KPIs)

**User Acquisition:**
- App downloads per week
- Sign-up conversion rate (downloads → accounts)
- Referral rate (organic invites)

**Engagement:**
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- DAU/WAU ratio (stickiness - target 40%+)
- Average session duration
- Sessions per user per week
- Pages logged per user per week

**Retention:**
- Day 1 retention (target: 70%+)
- Day 7 retention (target: 50%+)
- Day 30 retention (target: 30%+)
- Monthly churn rate

**Core Feature Usage:**
- % users logging reading daily (target: 40%+)
- % users with 7+ day streak (target: 30%+)
- % users with at least 1 friend (target: 50%+)
- % users using timer feature (target: 25%+)
- % users writing notes (target: 35%+)
- Average books tracked per user (target: 2-3)

**Social Features:**
- % users with friends (target: 50%+)
- Average friends per user (target: 1.2)
- Friend reminders sent per week (target: 0.5/user)
- Friend activity engagement

**Monetization:**
- Click-through rate on affiliate links (target: 2-3%)
- Ad impression rate
- Tip conversion rate (target: 5-10%)
- Revenue per user (target: $0.85-1.45/month)

### 9.2 Success Targets (Month 12)

**User Growth:**
- 10,000+ registered users
- 5,000+ monthly active users
- 2,000+ daily active users
- 40%+ DAU/WAU ratio (strong stickiness)

**Engagement:**
- 50%+ users log reading weekly
- 35%+ users with 30+ day streak
- 50%+ users have at least 1 reading friend
- 30%+ users write notes regularly

**Retention:**
- 70%+ Day 1 retention
- 50%+ Day 7 retention
- 30%+ Day 30 retention
- <10% monthly churn

**Monetization:**
- $8,500-14,500 monthly revenue
- <5% user complaints about ads
- Sustainable cost structure

**Quality:**
- 4.5+ star rating (iOS App Store)
- 4.5+ star rating (Google Play)
- <1% crash rate
- <5% negative reviews

### 9.3 Analytics Tracking

**Events to Track:**

**User Lifecycle:**
- User signed up (method: email, Google)
- Profile setup completed
- First book added
- First reading logged
- Onboarding completed
- Onboarding abandoned (which screen)

**Core Actions:**
- Reading logged (with/without timer, with/without notes)
- Book added (manual vs. API)
- Book completed
- Goal achieved
- Streak milestone reached
- Sick day used

**Social:**
- Friend request sent
- Friend request accepted
- Friend added successfully
- Friend reminder sent
- Viewed friend's profile

**Content:**
- Reading note written
- Quote saved
- Achievement unlocked
- Achievement viewed

**Monetization:**
- Ad viewed
- Ad clicked
- Affiliate link clicked
- Tip/donation made

**User Properties:**
- Total books completed
- Current streak
- Longest streak
- Days since sign-up
- Number of friends
- Notification settings
- Has used timer
- Has written notes

---

## 10. Future Roadmap (V2+)

### 10.1 V2 Features (6-12 months post-launch)

**Public Book Reviews & Recommendations:**
- Opt-in to make reviews public
- "Discover" tab to browse community reviews
- Filter by genre, rating, reading level
- "Readers who enjoyed X also liked Y"
- Follow interesting reviewers (not full social network)

**Enhanced Reading Journal:**
- Tag notes by theme/topic
- Search across all notes
- Export reading journal as PDF book
- "Memories" feature: "One year ago you read..."

**Reading Challenges:**
- Monthly reading challenges (e.g., "Read 500 pages in February")
- Personal challenges (e.g., "Read 24 books in 2026")
- Progress tracking
- Challenge badges

**Advanced Stats & Insights:**
- Reading heatmap (calendar view)
- Genre breakdown (if we add genres)
- Reading pace trends over time
- "Year in Books" annual summary
- Most-read authors
- Reading patterns (weekday vs. weekend)

**Social Expansion (Thoughtful):**
- Increase friend limit to 5-10
- Small reading circles (3-5 people)
- Optional book recommendations between friends
- "Currently reading" status visible to friends
- Reading milestones shared to friends feed

### 10.2 V3 Features (12-24 months post-launch)

**AI-Powered Features:**
- Personalized book recommendations based on reading history
- Auto-detect reading patterns
- Suggest optimal reading times
- Smart goal adjustments based on patterns
- Auto-summarize your reading notes

**Audiobook Support:**
- Track listening time for audiobooks
- Integration with Audible (if API available)
- Hybrid tracking (physical + audio for same book)
- Switch between formats seamlessly

**Reading Clubs (Larger Groups):**
- Create larger reading groups (10-15 people)
- Scheduled discussions
- Reading schedules
- Book voting for next read
- Optional chat feature (text only)

**Advanced Gamification:**
- Reading XP and levels
- Customizable avatars that level up
- More detailed achievement categories
- Seasonal events and challenges

**Physical Product Integration:**
- Bookmarks with QR codes (scan to log pages)
- PageKeeper reading journal (physical + digital sync)
- Stickers/merch for achievements

### 10.3 Platform Expansion

**Other Platforms:**
- Web app (view stats, edit profile)
- Browser extension (save quotes from Kindle, etc.)
- Apple Watch app (log reading from wrist)
- Widgets for iOS/Android home screen

**Integrations:**
- Kindle integration (auto-sync progress)
- Goodreads import
- Libby (library app) integration
- Google Calendar (reading time blocks)

### 10.4 Monetization Evolution

**Premium Tier (Optional - Only if free tier stays robust):**
- Ad-free experience
- Advanced stats and insights
- Unlimited friends (vs. 2)
- Export options (PDF, EPUB of notes)
- Early access to new features
- Price: $2.99/month or $24.99/year

**B2B Opportunities:**
- White-label for schools/libraries
- Corporate reading programs
- Book clubs (group subscriptions)

---

## Appendices

### Appendix A: Competitive Analysis

**Goodreads:**
- Strengths: Huge database, social network, recommendations
- Weaknesses: Cluttered UI, focused on reviews not habits, overwhelming
- **PageKeeper Advantage:** Simplicity, habit-building focus, intimate friend connections

**Bookly:**
- Strengths: Beautiful UI, reading timer, great stats
- Weaknesses: No social features, paid app ($2.99), iOS only
- **PageKeeper Advantage:** Free, has friend features, cross-platform

**StoryGraph:**
- Strengths: Great recommendations, mood tracking, Goodreads alternative
- Weaknesses: Complex, steep learning curve, focused on tracking not habits
- **PageKeeper Advantage:** Simpler onboarding, streak gamification, friend accountability

**Readerly:**
- Strengths: Clean design, simple tracking
- Weaknesses: Very basic, no social features, no gamification
- **PageKeeper Advantage:** Full feature set, friend connections, achievements

**Key Insight:** There's a gap for an app that's:
1. Simple and focused (not overwhelming like Goodreads)
2. Habit-building oriented (streaks, goals, reminders)
3. Has gentle social features (not full social network)
4. Free and accessible
5. Beautiful and delightful to use

PageKeeper fills this gap.

### Appendix B: Design Principles

1. **Simplicity First**
   - Every screen has one clear purpose
   - Remove unnecessary options
   - Default to the most common action
   - Progressive disclosure of features

2. **Celebrate Progress**
   - Positive reinforcement for all achievements
   - Gentle encouragement, never shame
   - Make logging reading feel rewarding
   - Delight in small wins

3. **Respect Focus**
   - No notifications during reading timer
   - Lock screen prevents distractions
   - Minimal UI during focused reading
   - Quick logging (< 10 seconds)

4. **Privacy by Default**
   - User controls all sharing
   - Reading notes always private
   - Clear privacy settings
   - Intimate, not public

5. **Joyful Interactions**
   - Delightful animations
   - Warm, encouraging tone
   - Playful micro-interactions
   - Make the app feel alive

6. **Accessible to All**
   - High contrast text
   - Large tap targets
   - VoiceOver/TalkBack support
   - Works for all reading speeds

### Appendix C: Brand Guidelines

**Voice & Tone:**
- Warm and encouraging
- Never judgmental or pushy
- Celebrates effort, not perfection
- Personal and intimate
- Supportive friend, not taskmaster

**Example Copy:**
- ✅ "Great job! You read today 📚"
- ❌ "Don't break your streak! Read NOW!"
- ✅ "Missed a day? Use a sick day or start fresh tomorrow"
- ❌ "Streak broken. You failed."
- ✅ "Your friend Sarah would love a reading reminder 💙"
- ❌ "Remind Sarah to read (she's slacking)"

**Visual Identity:**
- Primary color: Warm blue (#4A90E2) - Trust, calm
- Secondary: Warm orange (#F5A623) - Energy, celebration
- Accent: Soft green (#7ED321) - Growth, achievement
- Neutrals: Warm grays, not cold
- Typography: Friendly but legible (SF Pro, Roboto)

**Iconography:**
- Books, pages, flames (streak), hearts (friends)
- Rounded, friendly shapes
- Consistent stroke weight
- Playful but not childish

### Appendix D: Technical Decisions Log

| Decision | Rationale | Date | Status |
|----------|-----------|------|--------|
| React Native over Flutter | Team familiarity, faster development, mature ecosystem | 2026-01-29 | ✅ Approved |
| Firebase over custom backend | Speed to MVP, built-in features, scales well | 2026-01-29 | ✅ Approved |
| Remove groups, add friends | Simpler, more personal, faster to build | 2026-01-29 | ✅ Approved |
| 2 friend limit (not unlimited) | Keep it intimate and personal | 2026-01-29 | ✅ Approved |
| Add reading notes feature | Helps memory, enhances value | 2026-01-29 | ✅ Approved |
| Name: PageKeeper | Clear, memorable, available domains | 2026-01-29 | ✅ Approved |
| Tagline: Build your reading habit, one page at a time | Conveys core value prop | 2026-01-29 | ✅ Approved |
| Separate Firestore collections | Performance (fewer reads), cost optimization, logical grouping | 2026-01-30 | ✅ Approved |
| Remove username from signup | Collect during profile setup for smoother onboarding | 2026-01-30 | ✅ Approved |

### Appendix E: Privacy Policy Outline

**PageKeeper Privacy Policy (Summary)**

**What we collect:**
- Account info (email, name, username)
- Reading data (books, pages, sessions, notes, quotes)
- Usage analytics (feature usage, retention)
- Device tokens (for notifications)

**What we DON'T collect:**
- Reading notes (stored locally first, encrypted in transit)
- Location data
- Contacts
- Other apps on your device

**How we use your data:**
- Provide the app service
- Send notifications (if enabled)
- Improve the app (analytics)
- Show relevant book recommendations (V2)

**We NEVER:**
- Sell your data
- Share your data with advertisers
- Track you across other apps/websites

**Your rights:**
- Export all your data
- Delete your account (full data deletion)
- Control what friends see
- Opt out of analytics

**Full policy:** pagekeeper.app/privacy

### Appendix F: Launch Checklist

**Pre-Launch (4 weeks before):**
- [ ] App Store listing prepared (screenshots, description)
- [ ] Play Store listing prepared
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Support email set up
- [ ] Social media accounts created
- [ ] Landing page live
- [ ] Beta testing complete (10-20 users)
- [ ] All critical bugs fixed
- [ ] Analytics configured
- [ ] Push notifications tested

**Launch Week:**
- [ ] Submit to App Store (allow 1-2 weeks review)
- [ ] Submit to Play Store (allow 1-3 days review)
- [ ] Press kit prepared
- [ ] Launch announcement written
- [ ] Friends & family invited to download

**Post-Launch:**
- [ ] Monitor crash reports daily
- [ ] Respond to user reviews
- [ ] Track metrics daily
- [ ] Fix critical bugs immediately
- [ ] Gather user feedback
- [ ] Plan first update (bug fixes)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-29 | Product Team | Initial PRD - PageKeeper |
| 1.1 | 2026-01-30 | Product Team | Optimized data model - separated into multiple collections for performance, cost, and maintainability |

---

**Approval Signatures:**

- [ ] Product Lead: ________________
- [ ] Engineering Lead: ________________
- [ ] Design Lead: ________________

---

**END OF DOCUMENT**