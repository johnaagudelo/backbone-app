let template = require('../../templates/article.js')
let templeteExtend = require('../../templates/article-extended.js') 

App.Views.ArticleView = Backbone.View.extend({
	events:{
		"click .icon-heart-2": "navigate",
		"click .likes_up" : "upvote",
		"click .likes_down" : "downvote",
		"click #delete": "delete"
	},
	className: "article",
	initialize : function(){
		let self = this;
		self.model.bind("destroy", this.close, this);
		self.model.on('change', this.render, this);

		window.routers.on('route:root', this.render, this);
		window.routers.on('route:articleSingle', this.render, this);

		self.template = Handlebars.compile(template);
		self.templateExtended = Handlebars.compile(templeteExtend);
	},
	navigate: function(ev){
		Backbone.history.navigate('article/'+ this.model.get('id'), { trigger: true });
	},
	upvote: function(ev){
		ev.stopPropagation();
		let votes = this.model.get("votes");
		this.model.set("votes", parseInt(votes, 10) + 1);
	},
	close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    },
	delete: function(ev){
		debugger
		console.log(this.model.toJSON())
		this.model.destroy();
	},
	downvote: function(ev){
		ev.stopPropagation()
		let votes = parseInt(this.model.get("votes"), 10)
		if(votes > 0){
			this.model.set("votes", parseInt(votes, 10) - 1);
		}
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
		return this;
	}
});
