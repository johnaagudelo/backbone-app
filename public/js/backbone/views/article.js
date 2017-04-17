App.Views.ArticleView = Backbone.View.extend({
	events:{
		"show" : "show"
	},
	className:"",
	initialize : function(model){
		let self = this;
		this.model = model;
		this.model.on('change', function(){
			self.render();
		})
		this.template = Handlebars.compile($("#entry-template").html());
	},
	render: function() {
		var self = this;
		var locals = {
			post: this.model.collection.toJSON()[0]
		}
		
		this.$el.html(this.template(locals));
		//this.$el.html( `<h3>${ this.model.get("title") }</h3><p>${ this.model.get("tag") }</p>` );

		return this;
	}
});
