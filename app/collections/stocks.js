define([
    'jquery',
    'underscore',
    'backbone',
    'models/stock',
    'backbone.localstorage'
], function($, _, Backbone, Stock) {

    var collection = Backbone.Collection.extend({

        model: Stock,

        localStorage: new Store('pmowrer-stocks'),

        initialize: function() {
            this.on('add', this.refreshQuotes, this);

            this.on('reset', function() {
                if (this.length > 0) {
                    this.refreshQuotes();
                }
            }, this);
        },

        findBySymbol: function(symbol) {
            return this.findWhere({
                symbol: symbol
            });
        },

        refreshQuotes: function() {
            var symbols = this.pluck('symbol').toString(),
                query = "select * from csv where url='http://download.finance.yahoo.com/d/quotes.csv?s=" + symbols + "&f=snl1c6j1&e=.csv' and columns='symbol,name,price,change,cap'",
                url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json',
                self = this;

            $.ajax({
                url: url
            }).done(function(data) {
                self.set(self.parseQuotes(data));
                self.each(function(model) {
                    model.save();
                });

                self.trigger('loaded');
            });

            this.trigger('loading');
        },

        parseQuotes: function(data) {
            var stocks = data.query.results.row;

            return _(stocks).map(function(stock) {
                return _(stock)
                    .chain()
                    .pick('symbol', 'name', 'cap')
                    .extend({
                        price: parseFloat(stock.price),
                        change: parseFloat(stock.change),

                    })
                    .value();
            });
        }

    });

    return new collection();
});
