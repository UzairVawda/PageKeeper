# PageKeeper Authentication Test Plan

## Overview
This document contains test cases for the SignUp and Login screens, including all input fields, buttons, and Google authentication.

**Last Updated:** January 2025
**Version:** 1.0
**Status:** Draft

---

## Priority Definitions
- **P0 (Critical):** Must pass for release. Core functionality that blocks user access.
- **P1 (High):** Important functionality. Should pass before release.
- **P2 (Medium):** Nice to have. Can be fixed in subsequent release.

---

## Test Environment Requirements
- iOS Simulator or physical device
- Development build (not Expo Go) for Google Sign-In
- Firebase project configured
- Network connectivity for backend tests

---

# 1. SIGNUP SCREEN TESTS

## 1.1 Email Input Field

### TC-SU-001: Valid Email Format
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional, Validation |
| **Precondition** | SignUp screen is displayed |

**Steps:**
1. Tap on Email input field
2. Enter `test@example.com`
3. Tap outside the field to blur

**Expected Result:**
- Border turns green
- Green checkmark icon appears
- No error message displayed

---

### TC-SU-002: Invalid Email - Missing @ Symbol
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Validation |
| **Precondition** | SignUp screen is displayed |

**Steps:**
1. Tap on Email input field
2. Enter `testexample.com`
3. Tap outside the field to blur

**Expected Result:**
- Border turns red
- Red alert icon appears
- Error message: "Please enter a valid email address"

---

### TC-SU-003: Invalid Email - Missing Domain
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Validation |
| **Precondition** | SignUp screen is displayed |

**Steps:**
1. Enter `test@`
2. Tap outside the field

**Expected Result:**
- Border turns red
- Error message displayed

---

### TC-SU-004: Invalid Email - Missing TLD
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Validation |
| **Precondition** | SignUp screen is displayed |

**Steps:**
1. Enter `test@example`
2. Tap outside the field

**Expected Result:**
- Border turns red
- Error message displayed

---

### TC-SU-005: Email with Spaces
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Edge Case |
| **Precondition** | SignUp screen is displayed |

**Steps:**
1. Enter `test @example.com`
2. Tap outside the field

**Expected Result:**
- Border turns red
- Error message displayed

---

### TC-SU-006: Email - Empty Field on Blur
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Type** | UI/UX |
| **Precondition** | SignUp screen is displayed |

**Steps:**
1. Tap on Email field
2. Tap outside without entering anything

**Expected Result:**
- Border returns to default brown
- No error message (field not validated until input)

---

### TC-SU-007: Already Registered Email (Backend)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Backend Integration |
| **Precondition** | Email `existing@test.com` already registered in Firebase |

**Steps:**
1. Enter `existing@test.com` in email
2. Enter valid password meeting all requirements
3. Enter matching confirm password
4. Tap Sign Up button

**Expected Result:**
- Loading indicator appears
- Alert displayed: "Sign Up Failed" with message about email already in use
- User remains on SignUp screen

---

## 1.2 Password Input Field

### TC-SU-010: Password - Show Requirements on Focus
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | UI/UX |
| **Precondition** | SignUp screen is displayed |

**Steps:**
1. Tap on Password field

**Expected Result:**
- Password requirements checklist appears below field
- All 4 requirements shown with empty circle icons:
  - At least 8 characters
  - Contains a letter
  - Contains a number
  - Contains a special character
- Strength bar shows "Weak"

---

### TC-SU-011: Password - Hide Requirements on Blur (All Met)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | UI/UX |
| **Precondition** | SignUp screen is displayed |

**Steps:**
1. Tap on Password field
2. Enter `Test123!` (meets all requirements)
3. Tap outside the field

**Expected Result:**
- Password requirements checklist disappears
- Border shows green (valid)

---

### TC-SU-012: Password - Requirements Update in Real-time
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Precondition** | Password field is focused |

**Steps:**
1. Type `test` - observe requirements
2. Continue typing `test1234` - observe
3. Continue typing `Test1234` - observe
4. Continue typing `Test1234!` - observe

**Expected Result:**
1. After `test`: minLength ✗, hasLetter ✓, hasNumber ✗, hasSpecial ✗, Strength: Weak
2. After `test1234`: minLength ✓, hasLetter ✓, hasNumber ✓, hasSpecial ✗, Strength: Medium
3. After `Test1234`: Same as above (case doesn't matter for letter check)
4. After `Test1234!`: All ✓, Strength: Strong, requirements disappear

---

### TC-SU-013: Password - Minimum Length (8 characters)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Validation |
| **Precondition** | Password field is focused |

**Steps:**
1. Enter `Aa1!` (4 chars - has letter, number, special)
2. Observe validation

**Expected Result:**
- minLength shows ✗
- Password is invalid despite having letter, number, special char

---

### TC-SU-014: Password - Exactly 8 Characters (Boundary)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Edge Case |
| **Precondition** | Password field is focused |

**Steps:**
1. Enter `Abcdef1!` (exactly 8 chars)

**Expected Result:**
- All requirements met
- Strength: Strong
- Border turns green

---

### TC-SU-015: Password - Special Characters Validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Validation |
| **Precondition** | Password field is focused |

**Test Data:** Test each special character: `!@#$%^&*(),.?":{}|<>=`

**Steps:**
1. Enter `Abcdefg1!` - verify special char recognized
2. Clear and enter `Abcdefg1@` - verify
3. Continue with other special characters

**Expected Result:**
- Each special character should satisfy the "hasSpecial" requirement

---

### TC-SU-016: Password - Show/Hide Toggle
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Precondition** | SignUp screen is displayed |

**Steps:**
1. Enter `MyPassword123!` in password field
2. Observe field shows dots/bullets
3. Tap eye icon
4. Observe password is visible
5. Tap eye icon again

**Expected Result:**
- Initially: Password hidden (dots)
- After first tap: Password visible as plain text, icon changes to eye-off
- After second tap: Password hidden again, icon changes to eye

---

### TC-SU-017: Password - Empty Field
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Validation |
| **Precondition** | SignUp screen is displayed |

**Steps:**
1. Leave password field empty
2. Fill in valid email and confirm password
3. Attempt to submit

**Expected Result:**
- Sign Up button remains disabled
- Cannot submit form

---

### TC-SU-018: Password - Very Long Password
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Type** | Edge Case |
| **Precondition** | SignUp screen is displayed |

**Steps:**
1. Enter a 100+ character password with letter, number, special char

**Expected Result:**
- Password is accepted
- No UI issues or truncation
- All requirements met

---

## 1.3 Confirm Password Field

### TC-SU-020: Confirm Password - Matching
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Precondition** | Password field has `Test123!` |

**Steps:**
1. Enter `Test123!` in confirm password field
2. Tap outside field

**Expected Result:**
- Border turns green
- No error message

---

### TC-SU-021: Confirm Password - Not Matching
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Validation |
| **Precondition** | Password field has `Test123!` |

**Steps:**
1. Enter `Test456!` in confirm password field
2. Tap outside field

**Expected Result:**
- Border turns red
- Error message: "Passwords do not match"

---

### TC-SU-022: Confirm Password - Updates When Password Changes
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Functional |
| **Precondition** | Both password fields have matching `Test123!` |

**Steps:**
1. Go back to password field
2. Change password to `Test456!`
3. Observe confirm password field

**Expected Result:**
- Confirm password border turns red (no longer matches)
- Error appears: "Passwords do not match"

---

### TC-SU-023: Confirm Password - Show/Hide Toggle
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Functional |
| **Precondition** | SignUp screen displayed |

**Steps:**
1. Enter `Test123!` in confirm password
2. Tap eye icon to show
3. Tap eye icon to hide

**Expected Result:**
- Toggle works independently from password field
- Shows/hides correctly

---

## 1.4 Sign Up Button

### TC-SU-030: Sign Up Button - Disabled State
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | UI/UX |
| **Precondition** | SignUp screen displayed, all fields empty |

**Steps:**
1. Observe Sign Up button appearance
2. Tap the button

**Expected Result:**
- Button appears dimmed/faded (brown[300])
- Button is not clickable / no action on tap

---

### TC-SU-031: Sign Up Button - Enabled When All Valid
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Precondition** | SignUp screen displayed |

**Steps:**
1. Enter valid email: `newuser@test.com`
2. Enter valid password: `Test123!`
3. Enter matching confirm password: `Test123!`
4. Observe button

**Expected Result:**
- Button becomes active (brown[600])
- Shadow appears
- Button is clickable

---

### TC-SU-032: Sign Up Button - Partial Valid (Email Only)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Validation |
| **Precondition** | SignUp screen displayed |

**Steps:**
1. Enter valid email only
2. Observe button

**Expected Result:**
- Button remains disabled

---

### TC-SU-033: Sign Up Button - Partial Valid (Password Invalid)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Validation |
| **Precondition** | SignUp screen displayed |

**Steps:**
1. Enter valid email
2. Enter password missing special char: `Test1234`
3. Enter matching confirm password

**Expected Result:**
- Button remains disabled (password validation fails)

---

### TC-SU-034: Sign Up Button - Loading State
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | UI/UX |
| **Precondition** | All fields valid |

**Steps:**
1. Tap Sign Up button
2. Observe during API call

**Expected Result:**
- Button text replaced with loading spinner
- Button is disabled during loading
- Cannot tap again

---

### TC-SU-035: Sign Up - Success Flow (Backend)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Backend Integration |
| **Precondition** | Valid unique email |

**Steps:**
1. Enter unique email: `newuser_[timestamp]@test.com`
2. Enter valid password: `Test123!`
3. Enter matching confirm password
4. Tap Sign Up

**Expected Result:**
- Loading spinner appears
- Success alert displayed
- User created in Firebase Auth
- User document created in Firestore `users` collection
- UserSettings document created in `userSettings` collection
- UserStats document created in `userStats` collection

---

### TC-SU-036: Sign Up - Network Error
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Error Handling |
| **Precondition** | Device in airplane mode |

**Steps:**
1. Fill all fields with valid data
2. Enable airplane mode
3. Tap Sign Up

**Expected Result:**
- Loading spinner appears then stops
- Error alert displayed with network error message
- User remains on SignUp screen
- Can retry after restoring connection

---

## 1.5 Continue with Google

### TC-SU-040: Google Sign Up - Success (New User)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Backend Integration |
| **Precondition** | Google account not previously used with app |

**Steps:**
1. Tap "Continue with Google" button
2. Select Google account
3. Complete Google sign-in flow

**Expected Result:**
- Loading spinner on button
- Google sign-in sheet appears
- After success: "Welcome!" alert displayed
- User created in Firebase Auth
- User profile created in Firestore (all 3 collections)
- Username auto-generated from email

---

### TC-SU-041: Google Sign Up - Success (Existing User)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Backend Integration |
| **Precondition** | Google account previously registered |

**Steps:**
1. Tap "Continue with Google"
2. Select previously used Google account

**Expected Result:**
- User logged in successfully
- No "Welcome!" alert (not new user)
- lastActive updated in Firestore

---

### TC-SU-042: Google Sign Up - Cancelled
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Error Handling |
| **Precondition** | SignUp screen displayed |

**Steps:**
1. Tap "Continue with Google"
2. Cancel/dismiss the Google sign-in sheet

**Expected Result:**
- No error alert shown
- User remains on SignUp screen
- Button returns to normal state

---

### TC-SU-043: Google Sign Up - Loading State
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | UI/UX |
| **Precondition** | SignUp screen displayed |

**Steps:**
1. Tap "Continue with Google"
2. Observe button during authentication

**Expected Result:**
- Button text replaced with loading spinner
- Button disabled during loading

---

## 1.6 Navigation

### TC-SU-050: Navigate to Login
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Precondition** | SignUp screen displayed |

**Steps:**
1. Tap "Login" link at bottom of screen

**Expected Result:**
- Login screen is displayed
- All Login screen elements visible

---

---

# 2. LOGIN SCREEN TESTS

## 2.1 Username/Email Input Field

### TC-LI-001: Valid Email Input
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Precondition** | Login screen displayed |

**Steps:**
1. Enter `test@example.com`
2. Observe field

**Expected Result:**
- Text is entered
- Border remains brown (no validation colors on login)
- No icons displayed

---

### TC-LI-002: Username Input
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Functional |
| **Precondition** | Login screen displayed |

**Steps:**
1. Enter `myusername`
2. Observe field

**Expected Result:**
- Text is entered
- Border remains brown
- Field accepts input (username login not yet implemented)

---

### TC-LI-003: Border Color - Default
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | UI/UX |
| **Precondition** | Login screen displayed |

**Steps:**
1. Observe Username/Email field without interaction

**Expected Result:**
- Border is light brown (brown[200])

---

### TC-LI-004: Border Color - Focused
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | UI/UX |
| **Precondition** | Login screen displayed |

**Steps:**
1. Tap on Username/Email field

**Expected Result:**
- Border changes to darker brown (brown[500])

---

### TC-LI-005: Border Color - After Input (No Validation Colors)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | UI/UX |
| **Precondition** | Login screen displayed |

**Steps:**
1. Enter any text
2. Tap outside field

**Expected Result:**
- Border returns to light brown (brown[200])
- No green or red colors regardless of input

---

## 2.2 Password Input Field

### TC-LI-010: Password Input
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Precondition** | Login screen displayed |

**Steps:**
1. Enter `anypassword`
2. Observe field

**Expected Result:**
- Password shown as dots/bullets
- Border remains brown

---

### TC-LI-011: Password - Show/Hide Toggle
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Precondition** | Login screen displayed |

**Steps:**
1. Enter `MyPassword`
2. Tap eye icon
3. Tap eye icon again

**Expected Result:**
- Toggle shows/hides password correctly
- Icon changes between eye and eye-off

---

### TC-LI-012: Password - No Validation Colors
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | UI/UX |
| **Precondition** | Login screen displayed |

**Steps:**
1. Enter password
2. Blur field

**Expected Result:**
- Border stays brown (no green/red)

---

## 2.3 Forgot Password

### TC-LI-015: Forgot Password Link Position
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Type** | UI/UX |
| **Precondition** | Login screen displayed |

**Steps:**
1. Observe Forgot Password link

**Expected Result:**
- Link positioned right-aligned below password field
- Text: "Forgot Password?"

---

### TC-LI-016: Forgot Password - Tap Action
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Functional |
| **Precondition** | Login screen displayed |

**Steps:**
1. Tap "Forgot Password?" link

**Expected Result:**
- Alert displayed: "Reset Password" (placeholder for now)
- Or navigates to password reset screen if implemented

---

## 2.4 Login Button

### TC-LI-020: Login Button - Disabled State (Empty Fields)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | UI/UX |
| **Precondition** | Login screen displayed, fields empty |

**Steps:**
1. Observe Login button

**Expected Result:**
- Button appears dimmed (brown[300])
- Button not clickable

---

### TC-LI-021: Login Button - Disabled (Only Email)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Validation |
| **Precondition** | Login screen displayed |

**Steps:**
1. Enter email only
2. Leave password empty

**Expected Result:**
- Button remains disabled

---

### TC-LI-022: Login Button - Disabled (Only Password)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Validation |
| **Precondition** | Login screen displayed |

**Steps:**
1. Leave email empty
2. Enter password only

**Expected Result:**
- Button remains disabled

---

### TC-LI-023: Login Button - Enabled (Both Fields Filled)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Precondition** | Login screen displayed |

**Steps:**
1. Enter any text in email field
2. Enter any text in password field

**Expected Result:**
- Button becomes active (brown[600])
- Shadow appears
- Button is clickable

---

### TC-LI-024: Login - Success Flow (Backend)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Backend Integration |
| **Precondition** | User exists: `existing@test.com` / `Test123!` |

**Steps:**
1. Enter `existing@test.com`
2. Enter `Test123!`
3. Tap Log In

**Expected Result:**
- Loading spinner appears
- Success alert displayed
- lastActive updated in Firestore
- User navigated to home/next screen

---

### TC-LI-025: Login - Wrong Password (Backend)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Error Handling |
| **Precondition** | User exists: `existing@test.com` |

**Steps:**
1. Enter `existing@test.com`
2. Enter `WrongPassword!`
3. Tap Log In

**Expected Result:**
- Loading spinner appears then stops
- Alert: "Login Failed" - "Invalid email or password"
- User remains on Login screen

---

### TC-LI-026: Login - User Not Found (Backend)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Error Handling |
| **Precondition** | Email not registered |

**Steps:**
1. Enter `nonexistent@test.com`
2. Enter any password
3. Tap Log In

**Expected Result:**
- Alert: "Login Failed" - "Invalid email or password"
- (Same message as wrong password for security)

---

### TC-LI-027: Login - Invalid Email Format (Backend)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Error Handling |
| **Precondition** | Login screen displayed |

**Steps:**
1. Enter `notanemail`
2. Enter any password
3. Tap Log In

**Expected Result:**
- Alert: "Login Failed" - "Please enter a valid email address"

---

### TC-LI-028: Login - Too Many Attempts (Backend)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Error Handling |
| **Precondition** | Multiple failed login attempts |

**Steps:**
1. Attempt login with wrong password 5+ times rapidly

**Expected Result:**
- Alert: "Login Failed" - "Too many failed attempts. Please try again later."

---

### TC-LI-029: Login - Username Input (Not Yet Implemented)
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Type** | Functional |
| **Precondition** | Login screen displayed |

**Steps:**
1. Enter `myusername` (no @ symbol)
2. Enter any password
3. Tap Log In

**Expected Result:**
- Alert: "Username Login" - "Please use your email address to log in. Username login coming soon!"

---

### TC-LI-030: Login - Loading State
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | UI/UX |
| **Precondition** | Both fields filled |

**Steps:**
1. Tap Log In button
2. Observe during API call

**Expected Result:**
- Button shows loading spinner
- Button disabled during loading

---

## 2.5 Continue with Google

### TC-LI-040: Google Login - Existing User
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Backend Integration |
| **Precondition** | Google account previously registered |

**Steps:**
1. Tap "Continue with Google"
2. Select registered Google account

**Expected Result:**
- Loading spinner on button
- User logged in successfully
- No "Welcome!" alert
- lastActive updated

---

### TC-LI-041: Google Login - New User (Creates Account)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Backend Integration |
| **Precondition** | Google account not registered |

**Steps:**
1. Tap "Continue with Google"
2. Select new Google account

**Expected Result:**
- "Welcome!" alert shown
- User created in Firebase
- Profile created in Firestore

---

### TC-LI-042: Google Login - Cancelled
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Error Handling |
| **Precondition** | Login screen displayed |

**Steps:**
1. Tap "Continue with Google"
2. Cancel the Google sign-in

**Expected Result:**
- No error alert
- User remains on Login screen

---

## 2.6 Navigation

### TC-LI-050: Navigate to Sign Up
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Precondition** | Login screen displayed |

**Steps:**
1. Tap "Sign Up" link at bottom

**Expected Result:**
- SignUp screen displayed

---

---

# 3. CROSS-SCREEN TESTS

### TC-CS-001: Navigation Flow - Splash to SignUp to Login
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Precondition** | App launched, Splash screen displayed |

**Steps:**
1. Tap "Sign Up" on Splash
2. Observe SignUp screen
3. Tap "Login" link
4. Observe Login screen
5. Tap "Sign Up" link

**Expected Result:**
- Each navigation works correctly
- Screens display properly
- No crashes or blank screens

---

### TC-CS-002: Navigation Flow - Splash to Login to SignUp
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Precondition** | App launched, Splash screen displayed |

**Steps:**
1. Tap "Login" on Splash
2. Observe Login screen
3. Tap "Sign Up" link
4. Observe SignUp screen

**Expected Result:**
- Navigation works correctly both directions

---

### TC-CS-003: Form State Not Persisted Between Screens
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Type** | Functional |
| **Precondition** | SignUp screen displayed |

**Steps:**
1. Enter email and password on SignUp
2. Navigate to Login
3. Navigate back to SignUp

**Expected Result:**
- SignUp form fields are cleared (or persisted - define expected behavior)

---

---

# 4. TEST SUMMARY

## SignUp Screen
| Category | P0 | P1 | P2 | Total |
|----------|----|----|----|----|
| Email Input | 2 | 3 | 1 | 6 |
| Password Input | 4 | 3 | 1 | 8 |
| Confirm Password | 2 | 2 | 0 | 4 |
| Sign Up Button | 4 | 2 | 0 | 6 |
| Google Sign Up | 2 | 2 | 0 | 4 |
| Navigation | 1 | 0 | 0 | 1 |
| **Subtotal** | **15** | **12** | **2** | **29** |

## Login Screen
| Category | P0 | P1 | P2 | Total |
|----------|----|----|----|----|
| Email/Username Input | 1 | 4 | 0 | 5 |
| Password Input | 1 | 2 | 0 | 3 |
| Forgot Password | 0 | 1 | 1 | 2 |
| Login Button | 4 | 4 | 1 | 9 |
| Google Login | 2 | 1 | 0 | 3 |
| Navigation | 1 | 0 | 0 | 1 |
| **Subtotal** | **9** | **12** | **2** | **23** |

## Cross-Screen
| Category | P0 | P1 | P2 | Total |
|----------|----|----|----|----|
| Navigation | 2 | 0 | 1 | 3 |

## **Grand Total: 55 Test Cases**
- P0 (Critical): 26
- P1 (High): 24
- P2 (Medium): 5
