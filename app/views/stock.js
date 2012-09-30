define([
    'jquery',
    'lodash',
    'backbone',
    'text!templates/stock.html'
], function($, _, Backbone, stockTemplate) {
    var view = Backbone.View.extend({
        
        tagName: 'li',

        template: _.template(stockTemplate),

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });

    return view;
});
