define([
    'lodash',
    'backbone'
], function(_, Backbone) {

    var model = Backbone.Model.extend({

        defaults: {
            symbol: '',
            price: 0,
            change: 0,
            name: '',
            cap: ''
        },

        getPercentageChange: function() {
            return change / price;
        }
    });

    return model;
});
