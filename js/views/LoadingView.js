/**
 Loading progress view
 @class LoadingView
 @constructor
 @return {object} instantiated LoadingView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {
    var LoadingView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            BB.comBroker.setService(BB.SERVICES.LOADING_VIEW,self);
        },

        /**
         Load main application
         @method appLoaded
         **/
        appLoaded: function(){
            BB.comBroker.getService(BB.EVENTS.APP_STACK_VIEW).selectView(BB.Elements.DIGG_CONTAINER);
        }
    });
    return LoadingView;
});