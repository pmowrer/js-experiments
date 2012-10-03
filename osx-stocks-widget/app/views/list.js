define([
    'jquery',
    'backbone'
], function($, Backbone) {

    var view = Backbone.View.extend({

        tagName: 'ul',

        events: {
            'click li': 'clickHandler'
        },

        initialize: function() {
            this.selected = undefined;
            this.itemView = this.options.itemView;
            
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
            this.collection.on('remove', this.remove, this);

            this.addAll();
        },

        render: function() {
            return this;
        },

        addOne: function(item) {
            var view = new this.itemView({ model: item });
            this.itemViews.push(view);
            this.$el.append(view.render().el);
        },

        addAll: function() {
            this.itemViews = [];
            this.$el.html('');
            this.collection.each(this.addOne, this);
        },

        remove: function(item) {
            var view = this.find(item);

            if(this.selected === item) {
                this.selected = undefined;
            }

            view.remove();
            this.itemViews = _.without(this.itemViews, view);
        },

        select: function(item) {
            if(this.selected) {
                this.find(this.selected).$el.removeClass('selected');
            }

            if(item !== undefined) {   
                this.selected = item;
                this.find(this.selected).$el.addClass('selected');
            }
        },

        find: function(item) {
            return _.find(this.itemViews, function(view) {
                return view.model === item;
            });
        },

        // Event handlers
        
        clickHandler: function(event) {
            this.select(_.find(this.itemViews, function(view) {
                return $(event.currentTarget).is(view.$el);
            }).model);
        }

    });

    return view;
});
