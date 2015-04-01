Ext.data.JsonP.testing_mvc_app({"guide":"<h2 id='testing_mvc_app-section-intro'>Intro</h2>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/testing_mvc_app-section-intro'>Intro</a></li>\n<li><a href='#!/guide/testing_mvc_app-section-setting-up-the-test-suite'>Setting up the test suite</a></li>\n<li><a href='#!/guide/testing_mvc_app-section-testing-strategies'>Testing strategies</a></li>\n<li><a href='#!/guide/testing_mvc_app-section-test-the-model-first.'>Test the model first.</a></li>\n<li><a href='#!/guide/testing_mvc_app-section-test-views-%28individual-components%29-after-model.'>Test views (individual components) after Model.</a></li>\n<li><a href='#!/guide/testing_mvc_app-section-test-the-application-as-a-whole.'>Test the application as a whole.</a></li>\n<li><a href='#!/guide/testing_mvc_app-section-buy-this-product'>Buy this product</a></li>\n<li><a href='#!/guide/testing_mvc_app-section-support'>Support</a></li>\n<li><a href='#!/guide/testing_mvc_app-section-see-also'>See also</a></li>\n<li><a href='#!/guide/testing_mvc_app-section-copyright-and-license'>COPYRIGHT AND LICENSE</a></li>\n</ol>\n</div>\n\n<p>This guide describes how you can test an Ext JS MVC application with Siesta.</p>\n\n<h2 id='testing_mvc_app-section-setting-up-the-test-suite'>Setting up the test suite</h2>\n\n<p>When setting up the test suite for an MVC application, put the test harness file (called index.html in the\n<a href=\"#!/guide/siesta_getting_started\">Getting Started Guide</a>) in the same folder as your \"app.html\" file.\nThis way you won't have to change any URLs for your proxies (which are probably configured relative to \"app.html\").</p>\n\n<p>Make use of <a href=\"#!/api/Siesta.Harness.Browser.ExtJS-cfg-loaderPath\" rel=\"Siesta.Harness.Browser.ExtJS-cfg-loaderPath\" class=\"docClass\">loaderPath</a> option which will set up the Ext.Loader for all of your tests.</p>\n\n<p>Also check the <a href=\"#!/api/Siesta.Harness.Browser.ExtJS-cfg-waitForAppReady\" rel=\"Siesta.Harness.Browser.ExtJS-cfg-waitForAppReady\" class=\"docClass\">waitForAppReady</a> option - it will be useful if you have a group of tests which should start\nafter the launch of application.</p>\n\n<p>See the <code>/examples/025-extjs-mvc</code> in the Siesta package for a sample setup.</p>\n\n<h2 id='testing_mvc_app-section-testing-strategies'>Testing strategies</h2>\n\n<p>Here we'll describe various testing strategies for your application.</p>\n\n<h2 id='testing_mvc_app-section-test-the-model-first.'>Test the model first.</h2>\n\n<p>You may already have heard the \"fat model, skinny view\" idiom. It means - put as much of business logic in the Model, don't pollute the View with it.\nThe Model should be completely unaware about the UI and be self-contained. It's not only a clean separation of your code, but you also ensure that you can safely\nrefactor the UI whilst keeping the business requirements intact. This way the model can also be easily tested, w/o involving any the interaction with the UI.</p>\n\n<p>By starting your test suite with Model you also limit the scope of uncertainty during debugging. Having the Model well test-covered, you can always say\n\"this bug must be somewhere in the View or Controller\".</p>\n\n<p>For example. If you have a login form, don't put the authentication logic to the \"click\" handler of the \"Login\" button.\nInstead, you can have an \"App.AuthManager\" class in your application, which can have a \"login\" method.\nThen, in the \"click\" handler, you will just call \"App.AuthManager.login()\".</p>\n\n<h2 id='testing_mvc_app-section-test-views-%28individual-components%29-after-model.'>Test views (individual components) after Model.</h2>\n\n<p>Second step in testing your application will be to test your views (individual components such as grids and trees). This does not mean you need to use exactly one component class in your test -\nbut use as few classes as required to instantiate and operate on the component being tested.</p>\n\n<p>Again, testing the individual parts of your application limits the scope of uncertainty and side-effects.</p>\n\n<h2 id='testing_mvc_app-section-test-the-application-as-a-whole.'>Test the application as a whole.</h2>\n\n<p>Finally, test your application \"in the wild\" facing all possible side effects. When finding a bug, first try to move the test for it to on one of described testing strategies.\nOnly if that is not possible write tests at the whole application level.</p>\n\n<h2 id='testing_mvc_app-section-buy-this-product'>Buy this product</h2>\n\n<p>Visit our store: <a href=\"http://bryntum.com/store/siesta\">http://bryntum.com/store/siesta</a></p>\n\n<h2 id='testing_mvc_app-section-support'>Support</h2>\n\n<p>Ask question in our community forum: <a href=\"http://www.bryntum.com/forum/viewforum.php?f=20\">http://www.bryntum.com/forum/viewforum.php?f=20</a></p>\n\n<p>Share your experience in our IRC channel: <a href=\"http://webchat.freenode.net/?randomnick=1&amp;channels=bryntum&amp;prompt=1\">#bryntum</a></p>\n\n<p>Please report any bugs through the web interface at <a href=\"https://www.assembla.com/spaces/bryntum/support/tickets\">https://www.assembla.com/spaces/bryntum/support/tickets</a></p>\n\n<h2 id='testing_mvc_app-section-see-also'>See also</h2>\n\n<p>Web page of this product: <a href=\"http://bryntum.com/products/siesta\">http://bryntum.com/products/siesta</a></p>\n\n<p>Other Bryntum products: <a href=\"http://bryntum.com/products\">http://bryntum.com/products</a></p>\n\n<h2 id='testing_mvc_app-section-copyright-and-license'>COPYRIGHT AND LICENSE</h2>\n\n<p>Copyright (c) 2009-2014, Bryntum &amp; Nickolay Platonov</p>\n\n<p>All rights reserved.</p>\n","title":"Testing an Ext JS MVC application with Siesta"});