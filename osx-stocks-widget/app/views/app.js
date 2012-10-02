define([
    'jquery',
    'lodash',
    'backbone',
    'collections/stocks',
    'views/stocks'
], function($, _, Backbone, StocksCollection, StocksView) {
    var view = Backbone.View.extend({

        el: '#edit-container',

        events: {
            'keypress #symbol-input': 'inputKeyPressHandler',
            'click #add': 'createStock',
            'click #remove': 'removeStock'
        },

        initialize: function() {
            this.input = this.$('#symbol-input');

            StocksCollection.fetch();
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
                    StocksView.select(stock);
                }

                this.input.val('');
            }

        },

        removeStock: function(event) {
            if(StocksView.selected !== undefined) {
                StocksCollection.findBySymbol(StocksView.selected.get('symbol')).destroy();
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
