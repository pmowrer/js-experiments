define([
    'jquery',
    'lodash',
    'views/list'
], function($, _, ListView) {

    var view = ListView.extend({

        events: function() {
            return _.extend({}, ListView.prototype.events, {
                'click .change': 'changeClickHandler'
            });
        },

        changeClickHandler: function() {
            this.mode = this.mode !== undefined ? ++this.mode % 3 : 1;

            _.each(this.itemViews, function(view) {
                view.render(this.mode);
            }, this);
        }
    });

    return view;
});
