define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!templates/display-stock.html'
], function($, _, Backbone, app, template) {

    var view = Backbone.View.extend({

        app: app,

        tagName: 'li',

        template: _.template(template),

        initialize: function() {
            this.model.on('change:price', this.render, this);
        },

        render: function(mode) {
            var templateModel = this.model.toJSON(),
                isPositive = templateModel.change >= 0,
                nextMode, modeClass, change, capNumber;

            templateModel.price = templateModel.price.toFixed(2);
            templateModel.sign = isPositive ? '+' : '-';

            // Three different display modes for the change column
            switch (mode) {
                case 2:
                    change = Math.abs((templateModel.change / templateModel.price) * 100).toFixed(2) + '%';
                    modeClass = 'percent';
                    nextMode = 0;
                    break;

                case 1:
                    capNumber = parseFloat(templateModel.cap);
                    capNumber = capNumber.toString().length > 5 ? capNumber.toFixed(2) : capNumber;

                    change = capNumber + templateModel.cap.charAt(templateModel.cap.length - 1);
                    templateModel.sign = '';
                    modeClass = 'cap';
                    nextMode = 2;
                    break;

                case 0:
                    /* falls through */
                default:
                    change = Math.abs(templateModel.change).toFixed(2);
                    modeClass = 'price';
                    nextMode = 1;
            }

            templateModel.change = change;
            templateModel.href = '#/display/' + nextMode;

            this.$el.html(this.template(templateModel));

            this.$('.change')
                .toggleClass('negative', !isPositive)
                .addClass(modeClass);

            return this;
        }
    });

    return view;
});
