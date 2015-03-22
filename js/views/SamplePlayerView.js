/**
 SignagePlayer main Application view
 @class SamplePlayerView
 @constructor
 @return {object} instantiated SamplePlayerView
 **/
define(['jquery', 'backbone', 'text!templates/DiggArticle.html', 'TweenLite', 'ScrollToPlugin'], function ($, Backbone, DiggArticle, TweenLite, ScrollToPlugin) {


    var SamplePlayerView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            BB.comBroker.setService(BB.SERVICES.SAMPLE_VIEW, self);
            self.m_jData = undefined;
            self.m_cacheExpirationSec = 1;
            self.m_purgedIfNotUsedSec = 1000000;
            self.m_scrollPosition = 0;
            self._listenDispose();
            self._listenPlayerEvents();
            self._listenSendEvents();

            self._log('mode: ' + window.mode);
            self._log('WebKit inside SignagePlayer: ' + BB.SIGNAGEPLAYER_MODE);
        },

        /**
         Load two images, one from resources and one from a remote http url.
         keep in mind that if the resources (images / videos / swf etc...) were already loaded once
         and remain within the cache expiration params, they will load from local cache.
         This allows you to develop an HTML5 SignagePlayer component that can operate without a persistent
         internet connection while ensuring no interruption in playback for your audience.

         Also, for performance consideration, when loading multiple resources, you should sequence the load of every resource
         when the previous has completed (i.e.: serial loading). We achieve serial loading here by nesting
         call 2 of  getObjectValue within call 1 of getObjectValue the previous.
         Of course you can achieve better serial loading with libraries such as async (https://github.com/caolan/async).
         @method _loadImages
         **/
        _loadImages: function () {
            try {
                var self = this;
                if (_.isUndefined(self.m_jData.Resource) || _.isUndefined(self.m_jData.Resource._hResource1))
                    return;
                var hResource = parseInt(self.m_jData.Resource._hResource1);
                getObjectValue(0, 'getResourcePath("' + hResource + '")', function (itemSrc) {
                    self._log('image path: ' + itemSrc);
                    // itemSrc = itemSrc.replace(/"/,'');
                    //var a = JSON.parse(itemSrc);
                    $(Elements.IMAGE_FROM_RESOURCE).attr('src', itemSrc);

                    getObjectValue(0, 'getCachingPath("' + self.m_jData._url + '",' + self.m_cacheExpirationSec + ',' + self.m_purgedIfNotUsedSec + ')', function (itemSrc) {
                        $(Elements.IMAGE_FROM_URL).attr('src', itemSrc);
                    });
                });
            } catch (e) {
                log('problem loading images ' + e);
            }
        },

        _log: function (i_data) {
            $(Elements.CONSOLE_LOG).append(i_data + '<br/>');
        },

        /**
         Example of sending event to SignagePlayer every 10 seconds which is cought by a collection and switches images.
         Of course you will need to setup a collection first with proper 'next page' event listener within StudioPro
         @method _sendEvents
         **/
        _listenSendEvents: function () {
            var self = this;
            $(Elements.FIRE_NEXT_EVENT).on('click',function(){
                self._log('sending next event');
                self._sendEvent('next', _.random(1,100));
            });
        },

        /**
         Send event through bridge and into SignagePlayer
         @method _sendEvent
         @param {String} i_event event string
         @param {String} i_value event string
         **/
        _sendEvent: function (i_event, i_value) {
            var self = this;
            getObjectValue(0, 'sendCommand("' + i_event + '", ' + i_value + ')', function (e) {
                // console.log(e);
            });
        },

        /**
         Listen when new player data event is fire from AS3 side of SignagePlayer
         @method _listenPlayerEvents
         **/
        _listenPlayerEvents: function () {
            var self = this;
            BB.comBroker.listen(BB.EVENTS.ON_PLAYER_EVENT, function (e) {
                self._log('event: ' + e.edata.name + ' ' + e.edata.param);
            });
        },

        /**
         Listen application / component removed from timeline
         @method _listenDispose
         **/
        _listenDispose: function () {
            var self = this;
            BB.comBroker.listen(BB.EVENTS.ON_DISPOSE, function (e) {
                BB.comBroker.setService(BB.SERVICES.SAMPLE_VIEW, undefined);
                BB.comBroker.stopListen(BB.EVENTS.ON_PLAYER_EVENT);
                BB.comBroker.stopListen(BB.EVENTS.ON_DISPOSE);
            });
        },

        /**
         Example of storing values locally for later retrieval (works only in Node-Web-Kit)
         @method _exampleSimpleStorage
         **/
        _exampleSimpleStorage: function () {
            var self = this;
            simplestorage.set('test', 123);
            if (simplestorage.get('test')) {
                console.log('storage supported');
            } else {
                console.log('storage not supported');
            }
        },

        /**
         Kick off this component when xml_data is available from AS3 SignagePlayer bridge
         @method _dataLoaded
         @param {XML} i_xmlData
         **/
        dataLoaded: function (i_jData) {
            var self = this;
            self.m_jData = i_jData;
            self._loadImages();
        }
    });

    return SamplePlayerView;
});