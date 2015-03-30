//var Harness = Siesta.Harness.Browser.ExtJS;
var Harness = Siesta.Harness.Browser.SenchaTouch;
 
Harness.configure({
    title     : 'Siesta for Sencha Touch JS',
    preload : [
        "assets/lib/sencha-touch/sencha-touch-all-debug.js",
        "assets/lib/sencha-touch/resources/css/sencha-touch.css"
    ]
});
 
Harness.start({
  group       : 'Init',
  hostPageUrl : '/',
  performSetup: false,
  items: [
    'assets/lib/siesta/tests/001_init/001_init.t.js'
  ]
});

