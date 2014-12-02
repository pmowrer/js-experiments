define([
    'jquery',
    'lodash',
    'backbone',
    'models/stock',
    'backbone.localstorage'
], function($, _, Backbone, Stock) {

    var collection = Backbone.Collection.extend({

        model: Stock,

        localStorage: new Store('pmowrer-stocks'),

        initialize: function() {
            this.on('add', function(model) {
                this.load(model);
            }, this);

            this.on('reset', function() {
                if(this.length > 0) {
                    this.load();
                }
            }, this);
        },

        load: function(model) {
            var symbols = model ? model.get('symbol') : this.pluck('symbol').toString();
            var query = "select * from csv where url='http://download.finance.yahoo.com/d/quotes.csv?s=" + symbols + "&f=snl1c6j1&e=.csv' and columns='symbol,name,price,change,cap'"; 

            $.ajax({
                url: 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json'
            }).done($.proxy(this.parseQuotes, this));

            this.trigger('loading');
        },

        findBySymbol: function(symbol) {
            return this.find(function(stock) {
                return stock.get('symbol') === symbol;
            });        
        },

        parseQuotes: function(data) {
            var rows;

            data = data.query ? data : $.parseJSON(data);
            rows = data.query.results.row;
            rows = rows.length ? rows : [rows];

            _.each(rows, function(row) {
                var model = this.findBySymbol(row.symbol);
                model.save({ name: row.name, price: parseFloat(row.price), change: parseFloat(row.change), cap: row.cap });
            }, this);

            this.trigger('loaded');
        }

    });

    return new collection();
});
