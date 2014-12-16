define(["exports", "Globals", "jQuery.tinyPubSub"], function(exports, Globals, TinyPubSub) {

	var Info = (function Info() {

        var _cache = {
            'infoWrap' : null,
            'tabWrap'  : null,
            'tabItems' : null,
            'tabIcons' : null
        },

        _wasInitialized = false,

        _init = function _init(el) {

            //console.log('Info init');

            _setupCache(el);

            // No need to do anything if we only have 1 tab
            if (_cache.tabItems.length > 1) {
                _addEvents();
            }

            _wasInitialized = true;

            // Module is initialized, let everyone know it's a party.
            $.publish(Globals.Settings.CONSTANTS.EVENT_MODULE_INIT, 'Info');

        },

        _setupCache = function _setupCache(el) {
            _cache.infoWrap = el;
            _cache.tabWrap = _cache.infoWrap.find('.tab-wrap');
            _cache.tabItems = _cache.tabWrap.find('> li');
            _cache.tabIcons = _cache.tabItems.find('.tab-btn .icon');

        },

        _addEvents = function _addEvents() {

            _cache.infoWrap.on('click', '.tab-btn', function(e) {

                e.preventDefault();

                _toggleDisplay(this);

            });

            Globals.ResizeManager.addCallback(_resizeInfo);

        },

        _removeEvents = function _removeEvents(){

            _cache.infoWrap.off('click');
            Globals.ResizeManager.removeCallback(_resizeInfo);

        },

        _toggleDisplay = function _toggleDisplay(el) {

            var activeTab = $(el).parent('li'),
                activeIcon = activeTab.find('.tab-btn .icon');

            // Ability to toggle an open tab on mobile/tablet view
            if (activeTab.hasClass('active') && (Globals.Helpers.isMobile() || Globals.Helpers.isTablet())) {

                activeTab.removeClass('active');
                activeIcon.removeClass('icon-minus').addClass('icon-plus');

            } else {

                if( !(Globals.Helpers.isMobile() || Globals.Helpers.isTablet()) ) {
                    _cache.tabItems.removeClass('active');
                    _cache.tabIcons.removeClass('icon-minus').addClass('icon-plus');
                }

                activeTab.addClass('active');
                activeIcon.removeClass('icon-plus').addClass('icon-minus');

            }

        },

        _resizeInfo = function _resizeInfo() {

            var activeTabs = _cache.tabItems.filter('.active');

            if (activeTabs.length === 0 || activeTabs.length > 1) {

                var activeTab = _cache.tabItems.first(),
                    activeIcon = activeTab.find('.tab-btn .icon');

                _cache.tabItems.removeClass('active');
                _cache.tabIcons.removeClass('icon-minus').addClass('icon-plus');

                activeTab.addClass('active');
                activeIcon.removeClass('icon-plus').addClass('icon-minus');

            }

        },

        _eradicate = function _eradicate() {

            if (_wasInitialized) {
                _removeEvents();
                _wasInitialized = false;
                _garbage();
            }

        },

        _garbage = function _garbage() {

            for (var item in _cache) {
                delete _cache[item];
            }

        };

        // Public pointers
        return {
            eradicate : _eradicate,
            init      : _init
        };

    })();


	exports.Module = Info;

});
