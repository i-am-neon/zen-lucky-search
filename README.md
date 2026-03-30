# Zen Lucky Search

Skip the search results page. Type `! query` in the address bar and go directly to the first result.

Built for [Zen Browser](https://zen-browser.app) and Firefox. Powered by DuckDuckGo's `!ducky` redirect.

## How it works

1. Type `!` in the address bar — the extension activates
2. Press `Space`, then type your search query
3. Press `Enter` — you're taken directly to the first search result

### Modifier keys

| Action | Result |
|---|---|
| `Enter` | First result in current tab |
| `Shift+Enter` | First result in new foreground tab |
| `Alt+Enter` | First result in new background tab |

## Install

### From Firefox Add-ons (recommended)

Coming soon — submission pending.

### Manual install

1. Download or clone this repo
2. Open `about:debugging#/runtime/this-firefox` in Zen/Firefox
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file

### From source

```bash
git clone https://github.com/i-am-neon/zen-lucky-search.git
cd zen-lucky-search
```

Then load as a temporary add-on (see above).

## How it works under the hood

The extension registers `!` as an [omnibox keyword](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/omnibox). When you type `! query` and press Enter, it navigates to:

```
https://duckduckgo.com/?q=!ducky+{your query}
```

DuckDuckGo's `!ducky` bang performs a server-side redirect to the first organic search result. No API keys, no scraping, no content scripts.

## Permissions

None. This extension only uses the omnibox API — it cannot read your browsing data, modify pages, or access any other browser functionality.

## Compatibility

- Zen Browser (all versions)
- Firefox 52+

Works with Zen's floating URL bar out of the box.

## License

[MIT](LICENSE)
