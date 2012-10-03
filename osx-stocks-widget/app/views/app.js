define([
    'jquery',
    'lodash',
    'backbone',
    'collections/stocks',
    'views/edit',
    'views/display'
], function($, _, Backbone, StocksCollection, EditView, DisplayView) {

    var view = Backbone.View.extend({

        el: '#main',

        render: function() {
            StocksCollection.fetch();

            return this;
        }

    });

    return new view();
});
