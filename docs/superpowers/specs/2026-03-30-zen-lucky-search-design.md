# Zen Lucky Search — Design Spec

## Overview

A minimal Firefox/Zen Browser WebExtension that lets you jump directly to the first search result via DuckDuckGo's `!ducky` redirect. Type `! query` in the address bar and press Enter to skip the results page entirely.

## Problem

There's no way in Zen Browser (or Firefox) to go directly to the first search result from the address bar. Users must search, wait for results to load, then click the first link — an unnecessary extra step when you already know what you're looking for.

## Solution

Register an omnibox keyword (`!`) so the user types `! query` in the address bar. The extension constructs a DuckDuckGo `!ducky` URL that server-side redirects to the first result. No DOM scraping, no content scripts, no host permissions.

## Behavior

| Input | Result |
|---|---|
| `! query` + Enter | First DDG result in **current tab** |
| `! query` + Shift+Enter | First DDG result in **new foreground tab** |
| `! query` + Alt+Enter | First DDG result in **new background tab** |

The omnibox dropdown shows a default suggestion: "Search and go to first result for: {query}"

## Technical Details

### Extension Type
- **Manifest V2** Firefox WebExtension
- Compatible with Firefox 52+ and Zen Browser

### Architecture
- `manifest.json` — declares omnibox keyword `!`, extension metadata, icons
- `background.js` — listens for `omnibox.onInputEntered`, constructs DuckDuckGo URL, navigates

### URL Construction
```
https://duckduckgo.com/?q=!ducky+{encodeURIComponent(query)}
```

DuckDuckGo's `!ducky` bang performs a server-side redirect to the first organic result. This is reliable and requires no API keys or scraping.

### Tab Navigation Logic
```javascript
browser.omnibox.onInputEntered.addListener((text, disposition) => {
  const url = `https://duckduckgo.com/?q=!ducky+${encodeURIComponent(text)}`;
  switch (disposition) {
    case "currentTab":
      browser.tabs.update({ url });
      break;
    case "newForegroundTab":
      browser.tabs.create({ url });
      break;
    case "newBackgroundTab":
      browser.tabs.create({ url, active: false });
      break;
  }
});
```

### Permissions
- **None required** beyond the implicit `omnibox` permission from the manifest key. No host permissions, no tabs permission (omnibox handlers get implicit tab access), no web requests.

### File Structure
```
zen-lucky-search/
├── manifest.json
├── background.js
├── icons/
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── LICENSE (MIT)
└── README.md
```

## Distribution

- **GitHub**: Public repo with README, screenshots, and install instructions
- **AMO**: Submit to addons.mozilla.org for Firefox + Zen users
- **Manual install**: Download `.xpi` or load as temporary add-on via `about:debugging`

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| `!` keyword conflicts with Firefox's `@` search shortcuts | `!` does not conflict — `@` is the reserved prefix, not `!` |
| DuckDuckGo deprecates `!ducky` | Unlikely (core DDG feature), but could switch to `\` prefix syntax |
| User expects search suggestions | Could add DDG suggestions API in future, but MVP ships without |

## Non-Goals

- No custom new tab page
- No settings/options page
- No search engine selection (DDG only)
- No content scripts or DOM manipulation
