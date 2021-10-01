# wampy-patch
Patch for wampy that converts the headers to `wamp.json` (default is `wamp.2.json`) and converts the server protocol to `json` (since its derived from wamp.2.json string, but that was edited soo)

## How to use

Use is very, very simple. However you **MUST** use the patch before you connect

```js
const WampyPatch = require("wampy-patch")
const Wampy = require("wampy").Wampy

const instance = new Wampy("ws://localhost:8080/path_to_ws", {}) //Or any url obviously, and your options.

isntance.options({}) // If you didnt include options in the constructor

WampyPatch(instance)

instance.connect()
```

Basically, this should work with any instance, just you have to make sure you dont connect before the patch is added.

