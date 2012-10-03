define([
    'jquery',
    'lodash',
    'backbone',
    'collections/stocks',
    'views/list',
    'views/display-stock'
], function($, _, Backbone, StocksCollection, ListView, StockView) {

    var view = Backbone.View.extend({

        el: '#display-container',

        events: {
        },

        initialize: function() {
            this.stocksView = new ListView({
                el: '#display-stocks-list',
                collection: StocksCollection,
                itemView: StockView
            });
        },

        render: function() {
            return this;
        }
    });

    return new view();
});
