define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/display-stock.html'
], function($, _, Backbone, template) {

    var view = Backbone.View.extend({

        tagName: 'li',

        template: _.template(template),

        initialize: function() {
            this.model.on('change:price', this.render, this);
        },

        render: function(mode) {
            var templateModel = this.model.toJSON();
            var isPositive = templateModel.change >= 0;
            var nextMode;
            var modeClass;

            templateModel.price = templateModel.price.toFixed(2);
            templateModel.sign = isPositive ? '+' : '-';

            // Three different display modes for the change column
            switch(mode) {
                case 2 :
                    templateModel.change = Math.abs((templateModel.change / templateModel.price) * 100).toFixed(2) + '%';
                    modeClass = 'percentChange';
                    nextMode = 0;
                    break;

                case 1 :
                    var capNumber = parseFloat(templateModel.cap);
                    capNumber = capNumber.toString().length > 5 ? capNumber.toFixed(2) : capNumber;

                    templateModel.change = capNumber + templateModel.cap.charAt(templateModel.cap.length - 1);
                    templateModel.sign = '';
                    modeClass = 'cap';
                    nextMode = 2;
                    break;

                case 0 :
                    /* falls through */
                default :
                    templateModel.change = Math.abs(templateModel.change).toFixed(2);
                    modeClass = 'priceChange';
                    nextMode = 1;
            }

            this.$el.html(this.template(templateModel));
            this.$('.change')
                .toggleClass('negative', !isPositive)
                .addClass(modeClass)
                .attr('href', '#/display/' + nextMode);

            return this;
        }
    });

    return view;
});
