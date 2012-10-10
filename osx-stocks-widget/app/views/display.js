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

            this.statusDisplay = this.$('#display-status');
        },

        render: function() {
            this.statusDisplay.html('Retrieving Data...');

            return this;
        }
    });

    return new view();
});
