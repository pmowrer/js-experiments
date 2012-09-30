define([
    'jquery',
    'backbone',
    'collections/stocks',
    'views/stock'
], function($, Backbone, Stocks, StockView) {

    var view = Backbone.View.extend({

        el: '#stocks',

        events: {
            'click li': 'stockSelectedHandler'
        },

        initialize: function() {
            this.selected = undefined;
            this.stockViews = [];

            Stocks.on('add', this.addOne, this);
            Stocks.on('reset', this.addAll, this);
            Stocks.on('remove', this.remove, this);
        },

        render: function() {
            return this;
        },

        addOne: function(stock) {
            var view = new StockView({ model: stock });
            this.stockViews.push(view);
            this.$el.append(view.render().el);
        },

        addAll: function() {
            this.stockViews = [];
            this.$el.html('');
            Stocks.each(this.addOne, this);
        },

        remove: function(stock) {
            var view = this.find(stock);

            if(this.selected === stock) {
                this.selected = undefined;
            }

            view.remove();
            this.stockViews = _.without(this.stockViews, view);
        },

        select: function(stock) {
            if(this.selected) {
                this.find(this.selected).$el.removeClass('selected');
            }

            if(stock !== undefined) {   
                this.selected = stock;
                this.find(this.selected).$el.addClass('selected');
            }
        },

        find: function(stock) {
            return _.find(this.stockViews, function(view) {
                return view.model === stock;
            });
        },

        // Event handlers
        
        stockSelectedHandler: function(event) {
            this.select(_.find(this.stockViews, function(view) {
                return $(event.target).is(view.$el);
            }).model);
        }

    });

    return new view();
});
