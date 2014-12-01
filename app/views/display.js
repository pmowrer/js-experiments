define([
    'jquery',
    'lodash',
    'backbone',
    'collections/stocks',
    'views/display-list',
    'views/display-stock'
], function($, _, Backbone, StocksCollection, DisplayList, StockView) {

    var view = Backbone.View.extend({

        el: '#display-container',

        initialize: function() {

            this.statusDisplay = this.$('#display-status');
            this.statusMessage = '';

            StocksCollection.on('loading', this.loadingHandler, this);
            StocksCollection.on('loaded', this.loadedHandler, this);
        },

        render: function() {
            this.statusDisplay.html(this.statusMessage);

            return this;
        },

        loadingHandler: function() {
            this.setStatus('Retreiving Data...');
        },

        loadedHandler: function() {
            var now = new Date();
            var ampm = now.getHours() < 12 ? 'AM' : 'PM';
            var hour = 12 - ((-now.getHours() % 12) + 12) % 12;
            var minutes = now.getMinutes();
            minutes = minutes < 10 ? '0' + minutes : minutes;

            var dateString = hour + ':' + minutes + ' ' + ampm;
            this.setStatus('Quotes last updated at ' + dateString);
        },

        setStatus: function(message) {
            this.statusMessage = message;
            this.render();
        }
    });

    return new view();
});
