# Maestro E2E Tests

This directory contains end-to-end tests for the PageKeeper app using [Maestro](https://maestro.mobile.dev/).

## Prerequisites

1. **Install Maestro CLI:**
   ```bash
   curl -Ls "https://get.maestro.mobile.dev" | bash
   ```

2. **iOS Simulator or Android Emulator running**

3. **Development build of the app installed:**
   ```bash
   cd pk_app
   npx expo run:ios  # or npx expo run:android
   ```

## Running Tests Locally

### Run all tests (from project root):
```bash
maestro test pk_app/testing/flows/
```

### Run a specific test:
```bash
maestro test pk_app/testing/flows/signup_email_validation.yaml
```

### Run tests with verbose output:
```bash
maestro test pk_app/testing/flows/ --debug-output ./debug
```

### Run in Maestro Studio (visual debugging):
```bash
maestro studio
```

## Test Structure

```
pk_app/testing/
├── config.yaml                      # Global configuration
├── README.md                        # This file
└── flows/
    ├── signup_email_validation.yaml     # TC-SU-001 to TC-SU-006
    ├── signup_password_validation.yaml  # TC-SU-010 to TC-SU-018
    ├── signup_confirm_and_button.yaml   # TC-SU-020 to TC-SU-034
    ├── signup_full_flow.yaml            # TC-SU-035 (Backend integration)
    ├── signup_google.yaml               # TC-SU-040 to TC-SU-043
    ├── signup_navigation.yaml           # TC-SU-050, TC-CS-001
    ├── login_input_fields.yaml          # TC-LI-001 to TC-LI-012
    ├── login_button_states.yaml         # TC-LI-020 to TC-LI-023
    ├── login_backend.yaml               # TC-LI-024 to TC-LI-029
    ├── login_forgot_and_navigation.yaml # TC-LI-015, TC-LI-016, TC-LI-050
    └── cross_screen_navigation.yaml     # TC-CS-001 to TC-CS-003
```

## Test IDs Used

The app components include `testID` props for Maestro to locate elements:

### SignUp Screen
- `email-input` - Email text field
- `email-input-valid-icon` / `email-input-invalid-icon` - Validation icons
- `password-input` - Password text field
- `password-input-toggle` - Show/hide password button
- `confirm-password-input` - Confirm password field
- `confirm-password-input-toggle` - Show/hide confirm password
- `signup-button-enabled` / `signup-button-disabled` - Sign up button
- `signup-loading` - Loading indicator
- `google-signup-button` - Google sign up button
- `google-loading` - Google loading indicator
- `navigate-to-login` - Login link

### Login Screen
- `identifier-input` - Username/email field
- `password-input` - Password field
- `password-input-toggle` - Show/hide password
- `forgot-password-link` - Forgot password link
- `login-button-enabled` / `login-button-disabled` - Login button
- `login-loading` - Loading indicator
- `google-login-button` - Google login button
- `navigate-to-signup` - Sign up link

## Known Limitations

1. **Google Sign-In:** Maestro cannot interact with the native Google Sign-In sheet. Tests verify the button triggers the flow but cannot complete the OAuth flow.

2. **Firebase Backend Tests:** Some tests require pre-existing test users in Firebase. Create test users before running backend integration tests.

3. **Timing:** Some tests may need adjusted timeouts depending on network conditions.

## CI/CD

Tests run automatically on:
- Push to `main` branch
- Pull requests to `main`

See `.github/workflows/e2e-tests.yml` for the GitHub Actions configuration.

## Troubleshooting

### App not found
Make sure you've built and installed the development build:
```bash
npx expo run:ios
```

### Tests timing out
Increase the timeout in specific test files or run with:
```bash
maestro test --timeout 120000 pk_app/testing/flows/
```

### Element not found
1. Check the testID is correctly set in the component
2. Use `maestro studio` to visually debug and find elements
3. Try using text matching instead: `tapOn: "Button Text"`
