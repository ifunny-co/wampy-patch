/**
 * UNLICENSE 2020
 */

let _constants = require("./node_modules/wampy/dist/constants.js")
let wampy = require("wampy").Wampy

/**
 * Patches wampy to support wamp.json (instead of the default that wampy uses, which is wamp.2.json), and reflects that with the server protocol
 * @param {wampy} wampyInstance 
 */
function WampyPatch (wampyInstance) {
    wampyInstance._wsOnOpen = function() {
        var options = this._merge(this._options.helloCustomDetails, this._wamp_features)
        var serverProtocol = "json"
        if (this._options.authid) {
            options.authmethods = this._options.authmethods;
            options.authid = this._options.authid;
        }
        this._log('[wampy] websocket connected');
        if (this._options.serializer.protocol !== serverProtocol) {
            if (serverProtocol === 'json' || typeof navigator != 'undefined' && navigator.product === 'ReactNative' && typeof this._ws.protocol === 'undefined') {
                this._options.serializer = new _JsonSerializer.JsonSerializer();
            } else {
                this._cache.opStatus = _constants.WAMP_ERROR_MSG.NO_SERIALIZER_AVAILABLE;
                return this;
            }
        }

        if (this._options.serializer.isBinary) {
            this._ws.binaryType = 'arraybuffer';
        }
        this._ws.send(this._encode([_constants.WAMP_MSG_SPEC.HELLO, this._options.realm, options]));
    }.bind(wampyInstance)

    wampyInstance._protocols = ["wamp.json"]
}

module.exports = WampyPatch