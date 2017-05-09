let template = require('../../templates/articleNew.js')

App.Views.ArticleNewView = Backbone.View.extend({
	events:{
		"click button" : "create",
		"click #aside_header .icon-arrow-down": "toggle"
	},
	bindings: {
		'#title': 'title',
		'#tag': 'tag',
		'#content': 'content'
	},
	className:"newArticle",
	initialize : function(){
		this.template = Handlebars.compile(template);
	},
	toggle: function(){
		$('.newArticle aside').toggleClass('close')
	},
	create: function(){

		Backbone.Validation.bind(this, { model: this.model })
		let isValid = this.model.isValid()
		if(isValid){
            this.model.save();
			this.model.set({ title: "", tag: "", content: ""});
		}
	},
	render: function() {
		this.$el.html(this.template());
		this.stickit();
	}
});
