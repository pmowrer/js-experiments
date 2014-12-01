define([
    'jquery',
    'lodash',
    'backbone',
    'collections/stocks',
    'views/list',
    'views/edit-stock'
], function($, _, Backbone, StocksCollection, ListView, StockView) {

    var view = Backbone.View.extend({

        el: '#edit-container',

        events: {
            'keypress #symbol-input': 'inputKeyPressHandler',
            'click #add': 'createStock',
            'click #remove': 'removeStock'
        },

        initialize: function() {
            this.input = this.$('#symbol-input');

            this.stocksView = new ListView({ 
                el: '#edit-stocks-list',
                collection: StocksCollection,
                itemView: StockView
            });
        },

        render: function() {
            return this;
        },

        createStock: function() {
            var symbol = this.input.val().trim().toUpperCase();

            if(symbol) {
                var stock = StocksCollection.findBySymbol(symbol); 

                if(stock === undefined) {
                    StocksCollection.create({ symbol: symbol });
                }
                else {
                    this.stocksView.select(stock);
                }

                this.input.val('');
            }

        },

        removeStock: function(event) {
            if(this.stocksView.selected !== undefined) {
                StocksCollection.findBySymbol(this.stocksView.selected.get('symbol')).destroy();
            }
        },

        inputKeyPressHandler: function(event) {
           if(event.which == 13) {
               this.createStock();
           }
        }

    });

    return new view();
});
