define([
    'jquery',
    'underscore',
    'backbone',
    'collections/stocks',
    'views/edit',
    'views/display'
], function($, _, Backbone, StocksCollection, EditView, DisplayView) {

    var defaultStocks = [
        'AAPL',
        'GOOG',
        'MSFT'
    ];

    var view = Backbone.View.extend({

        el: '#main',

        render: function() {
            DisplayView.render();

            StocksCollection
                .fetch({
                    success: function(collection) {
                        if (collection.length === 0) {
                            collection.add(_(defaultStocks).map(function(stock) {
                                return {
                                    symbol: stock
                                };
                            }));
                        }
                    }
                });

            return this;
        }

    });

    return new view();
});
