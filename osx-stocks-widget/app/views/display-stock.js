define([
    'jquery',
    'lodash',
    'backbone',
    'text!templates/display-stock.html'
], function($, _, Backbone, template) {

    var view = Backbone.View.extend({
        
        tagName: 'li',

        template: _.template(template),

        initialize: function() {
            this.model.on('change:price', this.render, this);
        },

        render: function() {
            var templateModel = this.model.toJSON();
            var isPositive = templateModel.change >= 0;

            templateModel.price = templateModel.price.toFixed(2);
            templateModel.change = Math.abs(templateModel.change.toFixed(2));
            templateModel.sign = isPositive ? '+' : '-';

            this.$el.html(this.template(templateModel));
            this.$('.change').toggleClass('negative', !isPositive);

            return this;
        }
    });

    return view;
});
