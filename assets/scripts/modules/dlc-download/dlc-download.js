define(["exports", "Globals", "modules/dlc-download/view"], function(exports, Globals, View) {

    var DLCDownload = (function DLCDownload() {

        var _wasInitialized = false,

        _view = null,

        _init = function _init(el) {

            //console.log('DLC init');

            _view = new View();
            _view.init(el);

            _wasInitialized = true;

            // Module is initialized, let everyone know it's a party.
            $.publish(Globals.Settings.CONSTANTS.EVENT_MODULE_INIT, 'DLC Downloads');

        },

        _eradicate = function _eradicate() {
            
            if (_wasInitialized){
                _view.eradicate();
                _wasInitialized = false;
                _garbage();
            }

        },

        _garbage = function _garbage() {
            _view = null;
        };

        // Public pointers
        return {
            eradicate : _eradicate,
            init      : _init
        };

    })();

    exports.Module = DLCDownload;

});
