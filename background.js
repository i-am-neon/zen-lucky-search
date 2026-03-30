browser.omnibox.setDefaultSuggestion({
  description: "Go to first result"
});

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
