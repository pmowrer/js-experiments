require([
    "plugins/domready!",
    "app",
    "router",
    "views/app"
], function(doc, app, Router, AppView) {
    app.router = new Router();
    Backbone.history.start();

    AppView.render();
});
