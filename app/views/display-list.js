define([
    'jquery',
    'underscore',
    'views/list',
    'collections/stocks',
    'views/display-stock'
], function($, _, ListView, Collection, ItemView) {

    var view = ListView.extend({

        el: '#display-stocks-list',

        collection: Collection,

        setMode: function(mode) {
            mode = isNaN(mode) ? 0 : mode % 3;

            _.each(this.itemViews, function(view) {
                view.render(mode);
            }, this);
        }
    });

    return new view({ itemView: ItemView });
});
