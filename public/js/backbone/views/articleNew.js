App.Views.ArticleNewView = Backbone.View.extend({
	events:{
		"click button" : "create"
	},
	className:"",
	initialize : function($el){
		this.$el = $el;
		//this.template = _.template($("#ArticleNew_tpl").html());
	},
	create: function(){
		
		let title = this.$el.find('#title').val();
		let tag = this.$el.find('#tag').val();
		let content = this.$el.find('#content').val();

		let articleNew = new App.Models.Article({
			id: "ba022fda",
			image: "img/img4.jpg",
			title: title,
			user  : "Jonh Agudelo",
			tag: tag,
			votes : "0",
			content: content
		})

		window.collections.articles.add(articleNew);

		this.$el.find('#title').val("");
		this.$el.find('#tag').val("");
		this.$el.find('#content').val("");

	},
	render: function(data) {
		var self = this;
		var locals = {};

		this.$el.html(this.template({data:locals}));

		return this;
	}
});
