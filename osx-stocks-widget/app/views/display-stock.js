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
            this.$el.html(this.template(this.model.toJSON()));
            
            var isPositive = this.model.get('change') >= 0;
            this.$el.toggleClass('positive', isPositive);
            this.$el.toggleClass('negative', !isPositive);

            return this;
        }
    });

    return view;
});
