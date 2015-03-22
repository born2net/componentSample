// Configure RequireJS
requirejs.config({
    baseUrl: "js",
    paths: {
        'jquery': 'common/jq/jq1.9.1',
        'backbone': 'common/backbone/backbone',
        'text': 'common/requirejs/text',
        'underscore': 'common/underscore/underscore',
        'backbone.controller': 'common/backbone-controller/backbone.controller',
        'backbone.localstorage': 'common/backbone-localstorage/backbone.dualstorage.amd',
        'backbone.stickit': 'common/backbone-stickit/backbone.stickit',
        'platform': 'common/platform/platform',
        'simplestorage': 'common/simplestorage/simplestorage',
        'bootstrap': 'common/bootstrap/js/bootstrap',
        'TimelineMax': 'common/gsap/TimelineMax',
        'TweenMax': 'common/gsap/TweenMax',
        'TweenLite': 'common/gsap/TweenLite',
        'ScrollToPlugin': 'common/gsap/plugins/ScrollToPlugin',
        'CSSPlugin': 'common/gsap/plugins/CSSPlugin',
        'Base64': 'common/base64/jquery.base64',
        'localizer': 'common/localizer/dist/jquery.localize',
        'RC4': 'common/rc4/RC4',
        'RC4V2': 'common/rc4/RC4V2',
        'Lib': 'libs/Lib',
        'Pepper': 'libs/Pepper',
        'PepperHelper': 'libs/PepperHelper',
        'ComBroker': 'common/comBroker/ComBroker',
        'Elements': 'Elements',
        'Consts': 'Consts',
        'StackView': 'views/StackView',
        'SamplePlayerView': 'views/SamplePlayerView',
        'LoadingView': 'views/LoadingView'
    },
    shim: {
        'Elements': {
            exports: 'Elements'
        },
        'Consts': {
            deps: ['backbone']
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.controller': {
            deps: ['underscore', 'jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'underscore': {
            exports: '_'
        },
        'ComBroker': {
            deps: ['backbone', 'jquery']
        },
        'RC4': {
            exports: 'RC4'
        },
        'TweenMax': {
            exports: 'TweenMax'
        },
        'TweenLite': {
            exports: 'TweenLite'
        },
        'TimelineMax': {
            dep: ['TweenLite'],
            exports: 'TimelineMax'
        },
        'CSSPlugin': {
            dep: ['TweenLite'],
            exports: 'CSSPlugin'
        },
        'ScrollToPlugin': {
            exports: 'ScrollToPlugin'
        },
        'Pepper': {
            deps: ['jquery', 'Base64', 'RC4V2'],
            exports: 'Pepper'
        },
        'PepperHelper': {
            exports: 'PepperHelper'
        }
    }
});

requirejs(["playerApp"],
    function (playerApp) {
    }
);
