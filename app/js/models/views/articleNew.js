let template = require('../../templates/articleNew.js')

App.Views.ArticleNewView = Backbone.View.extend({
	events:{
		"click button" : "create",
		"click #aside_header": "toggle"
	},
	className:"",
	initialize : function(){
		this.template = Handlebars.compile(template);
	},
	toggle: function(){
		this.$el.find('#title').toggleClass('article-show');
	},
	create: function(){
		alert('create uevo articulo')
		let title = this.$el.find('#title').val();
		let tag = this.$el.find('#tag').val();
		let content = this.$el.find('#content').val();

		let articleNew = new App.Models.Article({
			title: title,
			tag: tag,
			content: content
		})

		articleNew.save();

		this.$el.find('#title').val("");
		this.$el.find('#tag').val("");
		this.$el.find('#content').val("");

	},
	render: function() {
		this.$el.html(this.template());
	}
});
