# The Trusted Circle

A mobile-first account recovery assistant. You choose three trusted guardians from your contacts; if you ever lose your phone, you raise an emergency alert, share a one-time recovery code with a guardian over WhatsApp or a phone call, and regain access to your account on a new device.

This version is an interactive, simulated walkthrough of the full flow:

1. **Choose your circle** (`/` and `/setup`) — search contacts, pick exactly three guardians, send invites.
2. **Emergency alert** (`/emergency`) — recovery code with copy, share via WhatsApp, call from your new number.
3. **Access restored** (`/success`) — verification progress and confirmation that the old device is blocked.
4. **Home dashboard** (`/home`) — circle, security status, recovery readiness, and activity at a glance.

Your guardian selection is remembered in the browser, so it's still there on the dashboard and when you come back later.

## Tech stack

- [TanStack Start](https://tanstack.com/start) + TanStack Router (file-based routes)
- React 19, Tailwind CSS 4, lucide-react icons
- `@tanstack/store` for the shared guardian state
- Deployed on Netlify

## Running locally

```bash
pnpm install
netlify dev   # or: pnpm dev
```

## Where it could go next

- Real accounts (Netlify Identity) in place of the demo owner "Alex G."
- Guardians and invites stored in Netlify Database, with real invite links that guardians accept
- Recovery codes generated per incident and verified server-side, with time limits
