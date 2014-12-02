define([
    'jquery',
    'underscore',
    'backbone',
    'collections/stocks',
    'views/edit',
    'views/display'
], function($, _, Backbone, StocksCollection, EditView, DisplayView) {

    var view = Backbone.View.extend({

        el: '#main',

        render: function() {
            DisplayView.render();

            StocksCollection.fetch({ success: function(collection, response) {
                if(collection.length === 0) {
                    collection.add([
                        { symbol: 'ADBE' },
                        { symbol: 'PKT' },
                        { symbol: 'GOOG' },
                        { symbol: 'MSFT' }
                    ]);
                }
            }});

            return this;
        }

    });

    return new view();
});
