# Care360 Landing Page

A premium, responsive GitHub Pages landing page for the Care360 healthcare ecosystem.

## Included sections

- Care360 ecosystem overview
- Care360 Plus practitioner onboarding
- First 1,000 practitioners free campaign
- Diverse income opportunities
- Care360 Patient App 60-day countdown
- 200+ growing nationwide community message
- Care360 Hospital Management System
- Google Play, Apple Store and direct APK download options

## Update links and launch details

Open `script.js` and edit the `CARE360_CONFIG` object at the top.

```js
const CARE360_CONFIG = {
  playStore: "YOUR_GOOGLE_PLAY_URL",
  appleStore: "",
  apk: "downloads/Care360Plus.apk",
  apkVersion: "v1.0.0",
  hms: "YOUR_HMS_URL",
  email: "hello@care360.com",
  phoneDisplay: "+234 901 234 5678",
  phoneHref: "+2349012345678",
  launchDate: "2026-09-25T09:00:00+01:00"
};
```

## Replace the APK

1. Put the new APK inside the `downloads` folder.
2. Update the `apk` filename and `apkVersion` in `script.js`.
3. Commit and push the changes.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload all project files to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select `main` and `/root`.
6. Save and wait for the public URL.
