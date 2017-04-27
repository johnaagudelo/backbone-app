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
		
		window.routers.on('route:root', function(){
			self.render();
		});

		window.routers.on('route:articleSingle', function(){
			self.render();
		});

		this.template = Handlebars.compile($("#entry-template").html());
		this.templateExtended = Handlebars.compile($("#entry-template-extended").html());
	},
	navigate: function(ev){
		Backbone.history.navigate('article/'+ this.model.get('id'), { trigger: true });
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

		if (window.app.state == "articleSingle") {
			if(window.app.article == this.model.get('id')){
				this.$el.show();
				this.$el.html(this.templateExtended(locals));
			}else{
				this.$el.hide();
				this.$el.html('');
			}
		}else{
			this.$el.html(this.template(locals));
		}
		//this.$el.html( `<h3>${ this.model.get("title") }</h3><p>${ this.model.get("tag") }</p>` );
		return this;
	}
});
