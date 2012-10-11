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

        initialize: function() {
            this.stocksView = new ListView({
                el: '#display-stocks-list',
                collection: StocksCollection,
                itemView: StockView
            });

            this.statusDisplay = this.$('#display-status');
            this.statusMessage = '';

            StocksCollection.on('loading', this.loadingHandler, this);
            StocksCollection.on('loaded', this.loadedHandler, this);
        },

        render: function() {
            this.statusDisplay.html(this.statusMessage);

            return this;
        },

        loadingHandler: function() {
            this.setStatus('Retreiving Data...');
        },

        loadedHandler: function() {
            this.setStatus('Quotes last updated at');
            
        },

        setStatus: function(message) {
            this.statusMessage = message;
            this.render();
        }
    });

    return new view();
});
