App.Models.ArticleModel = Backbone.Model.extend({
	url:"/articles",
	defaults:{
		title: "Title",
		tag: "Tag",
		content: "Contenido"
	},
	validation: {
		title: {
			required: true,
			msg: 'Ingrese un titulo'
		},
		tag: {
			required: true,
			msg: 'Ingrese un tag'
		},
		content: {
			required: true,
			msg: 'Ingrese un Contenido'
		}
	},
	parse : function(resp) {
		if(resp.data){
			return resp.data;
		}else{
			return resp;
		}
	}
});