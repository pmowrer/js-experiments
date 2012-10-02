define([
    'jquery',
    'lodash',
    'backbone',
    'text!templates/stock.html'
], function($, _, Backbone, stockTemplate) {

    var view = Backbone.View.extend({
        
        tagName: 'li',

        template: _.template(stockTemplate),

        initialize: function() {
            this.model.on('change:name', this.render, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });

    return view;
});
