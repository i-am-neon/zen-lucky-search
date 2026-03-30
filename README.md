# Zen Lucky Search

Skip the search results page. Type `! query` in the address bar and jump straight to the first result.

Built for [Zen Browser](https://zen-browser.app) and Firefox. Powered by [DuckDuckGo](https://duckduckgo.com).

## Usage

1. Type `!` in the address bar
2. Press `Space`, type your query
3. Press `Enter` — you land on the first result

| Shortcut | Behavior |
|---|---|
| `Enter` | Opens in current tab |
| `Shift+Enter` | Opens in new tab |
| `Alt+Enter` | Opens in background tab |

## Install

### Firefox Add-ons

Coming soon.

### Manual

1. Clone this repo
2. Open `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on** and select `manifest.json`

## How it works

The extension registers `!` as an [omnibox keyword](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/omnibox). Your query is sent through DuckDuckGo's `!ducky` bang, which redirects server-side to the first organic result.

No API keys. No scraping. No content scripts. Zero permissions.

## License

[MIT](LICENSE)
