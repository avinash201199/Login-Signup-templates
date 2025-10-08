# Firebase Auth Demo (Email/Password, Google, Phone)

Simple static site demonstrating Firebase Authentication using CDN modules.

## Setup

1. Copy `config.example.js` to `config.js` and fill with your Firebase project values.
2. Enable providers you need in Firebase Console → Authentication → Sign-in method (Email/Password, Google, Phone).
3. Add your domain(s) in Authentication → Settings → Authorized domains.
4. For Phone Auth, test over http(s) (reCAPTCHA won't work on `file://`).

## Development

Open `index.html` via a local web server (any static server). Example:

```
# Python 3
python -m http.server 5173
# then open http://localhost:5173
```

## Deployment

This is a client-only app. Firebase web `apiKey` is public by design.
- If deploying directly from this repo (e.g., GitHub Pages), `config.js` must be present in the published site and will be public.
- If you prefer not to commit real keys, inject them at build/deploy time to create `config.js`.

## Security Notes

- Restrict your API key by HTTP referrers in Google Cloud Console to your domains.
- Add only trusted domains in Firebase Auth → Authorized domains.
- Lock database/storage rules if you add those products.
