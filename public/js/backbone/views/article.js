App.Views.ArticleView = Backbone.View.extend({
	events:{
		"click > article": "navigate",
		"click .likes_up" : "upvote",
		"click .likes_down" : "downvote"
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
	navigate: function(ev){
		console.log(this.model.toJSON())
	},
	upvote: function(ev){
		ev.stopPropagation();
		let votes = this.model.get("votes");
		this.model.set("votes", parseInt(votes, 10) + 1);
	},
	downvote: function(ev){
		ev.stopPropagation();
		let votes = this.model.get("votes");
		this.model.set("votes", parseInt(votes, 10) - 1);
	},
	render: function() {
		var self = this;
		var locals = {
			post: this.model.toJSON()
		}
		
		this.$el.html(this.template(locals));
		//this.$el.html( `<h3>${ this.model.get("title") }</h3><p>${ this.model.get("tag") }</p>` );
		return this;
	}
});
