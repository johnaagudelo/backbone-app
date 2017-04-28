let template = require('../../templates/articleNew.js')

App.Views.ArticleNewView = Backbone.View.extend({
	events:{
		"click button" : "create",
		"click #aside_header .icon-arrow-down": "toggle"
	},
	className:"newArticle",
	initialize : function(){
		Backbone.Validation.bind(this)
		this.template = Handlebars.compile(template);
	},
	toggle: function(){
		$('.newArticle aside').toggleClass('close')
	},
	create: function(){
		
		let title = this.$el.find('#title').val();
		let tag = this.$el.find('#tag').val();
		let content = this.$el.find('#content').val();

		let articleNew = new App.Models.ArticleModel({
			title: title,
			tag: tag,
			content: content
		})
		debugger
		console.log(articleNew.toJSON())
		Backbone.Validation.bind(this, {model: articleNew})
		let isValid = articleNew.isValid(true)
		if(isValid){
            articleNew.save();
			this.$el.find('#title').val("");
			this.$el.find('#tag').val("");
			this.$el.find('#content').val("");
		}else{
			alert("ingrese los campos")
		}
	},
	render: function() {
		this.$el.html(this.template());
	}
});
