# YT Shorts Blocker

**YT Shorts Blocker** is a userscript to block YouTube Shorts and redirect Shorts URLs to the regular video player page on YT.
The script removes Shorts elements from the interface and ensures vertical video links open as standard videos.

Many areas on YouTube now aggressively promote Shorts content, including the homepage, sidebars, and video feeds.<br>
While intended to boost short-form engagement, this can result in:

* Constant exposure to unwanted vertical content,
* Disruption of traditional YouTube browsing experience,
* Cluttered UI with Shorts shelves and icons,
* All of the above.

## How it works

This userscript operates by watching for URL changes and DOM mutations to detect Shorts content.<br>
It redirects `/shorts/` URLs to `/watch?v=...`, and hides Shorts sections across the YouTube UI.

It doesn’t use or depend on YouTube’s internal APIs. Instead, the script uses a combination of URL rewriting and DOM cleanup to maintain a Shorts-free environment.

## Supported Browsers

* Firefox
* ~~Chrome~~
* Brave
* Edge
* Safari

## Installation

To use this userscript, you will need a userscript manager extension installed in your browser:

* [Violentmonkey](https://violentmonkey.github.io/)
* [Greasemonkey (for Firefox)](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

### Steps:

1. Install a userscript manager from above.
3. Create a new, empty userscript in the manager.
4. Copy-paste the script into the empty userscript.
5. Enjoy YT without Shorts cluttering your brain.

Thank you to everyone in the userscript community for supporting open customization tools like this one.

## Technical Notes

```
shorts_blocker/
├── yt_shorts_blocker.js  # Main userscript file
├── README.md             # This file
└── LICENSE               # MIT License
```

* The script listens for page navigations to catch YouTube's SPA behavior and redirects Shorts URLs early.
* It continuously monitors the DOM for Shorts elements and removes them as they load.
* It does **not** collect or transmit any user data at any point

## License

MIT.

This software is provided "as is", without warranty of any kind.<br>
**Use at your own risk.** Intended for educational use.<br>
You assume full responsibility for compliance with YouTube's Terms of Service and for any consequences arising from its use.
