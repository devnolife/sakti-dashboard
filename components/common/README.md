# Common Components

This directory contains shared components that are used across multiple features in the application.

## Available Components

- **Header**: Main application header with user information and notifications
- **MobileMenu**: Responsive mobile navigation menu
- **NotificationDropdown**: Dropdown for displaying user notifications
- **SessionProvider**: Authentication session provider
- **TeamMemberSelector**: Component for selecting team members
- **ThemeProvider**: Application theme provider

## Usage

Import components directly:

```tsx
import { Header, NotificationDropdown } from "@/components/common";
```

Or import individual components:

```tsx
import { Header } from "@/components/common/header";
``` 