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
            var symbol = this.input.val().trim().toUpperCase();

            if(event.which == 13 && symbol) {
                var stock = StocksCollection.findBySymbol(symbol); 

                if(stock === undefined) {
                    StocksCollection.create({ symbol: symbol });
                }
                else {
                    StocksView.select(stock);
                }

                this.input.val('');
            }

        },

        removeStock: function(event) {
            if(StocksView.selected !== undefined) {
                StocksCollection.findBySymbol(StocksView.selected.get('symbol')).destroy();
            }
        }

    });

    return new view();
});
