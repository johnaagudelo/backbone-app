App.Routers.BaseRouter = Backbone.Router.extend({
	routes: {
		"" :  "root",
		"article/:id": "articleSingle"
	},
	initialize : function(){
		let self = this;
	},
	root: function(){
		let self = this;
		
		$('#contenido > div').show();
	},
	articleSingle: function(id){
		let self = this;
		$('#contenido > div').hide();
		$('#contenido #'+id).show();
	}
});
