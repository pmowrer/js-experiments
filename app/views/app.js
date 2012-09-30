define([
    'jquery',
    'lodash',
    'backbone',
    'collections/stocks',
    'views/stocks'
], function($, _, Backbone, StocksCollection, StocksView) {
    var view = Backbone.View.extend({

        el: '#main',

        events: {
            'keypress #symbol-entry': 'createStock',
            'click #remove': 'removeStock'
        },

        initialize: function() {
            this.input = this.$('#symbol-entry');

            StocksCollection.fetch();
        },

        render: function() {
            return this;
        },

        createStock: function(event) {
            var symbol = this.input.val().trim();

            if(event.which == 13 && symbol) {
                var stock = this.findStockBySymbol(symbol); 

                if(stock === undefined) {
                    StocksCollection.create({ symbol: this.input.val().trim() });
                }
                else {
                    StocksView.select(stock);
                }

                this.input.val('');
            }

        },

        removeStock: function(event) {
            if(StocksView.selected !== undefined) {
                this.findStockBySymbol(StocksView.selected.get('symbol')).destroy();
            }
        },

        findStockBySymbol: function(symbol) {
            return StocksCollection.find(function(stock) {
                return stock.get('symbol') === symbol;
            });        
        }
    });

    return new view();
});
