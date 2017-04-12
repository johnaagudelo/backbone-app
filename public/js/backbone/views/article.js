App.Views.ArticleView = Backbone.View.extend({
	events:{
		"show" : "show"
	},
	className:"",
	initialize : function(model){
		let self = this;
		this.model = model;
		//this.template = _.template($("#Article_tpl").html());
		this.model.on('change', function(){
			self.render();
		})
	},
	render: function(data) {
		//var self = this;
		//var locals ={};

		//this.$el.html(this.template({data:locals}));
		this.$el.html( `<h3>${ this.model.get("title") }</h3><p>${ this.model.get("tag") }</p>` );

		return this;
	}
});
