define([
    'lodash',
    'backbone'
], function(_, Backbone) {

    var model = Backbone.Model.extend({

        defaults: {
            symbol: "ADBE",
            price: 0,
            change: 0
        }
    });

    return model;
});
