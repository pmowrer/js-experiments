define([
    'lodash',
    'backbone',
    'models/stock',
    'plugins/backbone.localstorage'
], function(_, Backbone, Stock) {

    var collection = Backbone.Collection.extend({

        model: Stock,

        localStorage: new Store('pmowrer-stocks')

    });

    return new collection();
});
