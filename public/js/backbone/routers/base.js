App.Routers.BaseRouter = Backbone.Router.extend({
	routes: {
		"" :  "root",
		"article/:id": "articleSingle"
	},
	root: function(){
		let self = this;
		
		window.app.state = "root"
	},
	articleSingle: function(id){
		let self = this;

		$('#contenido > div').hide();
		window.app.state = "articleSingle"
		window.app.article = id;
	}
});
