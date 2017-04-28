App.Models.ArticleModel = Backbone.Model.extend({
	url:"/articles",
	defaults:{
		"title": "Title",
		"tag": "Tag",
		"content": "Contenido"
	},
	validation: {
		title: {
			required: true,
			pattern: 'title',
			msg: 'Ingrese un titulo'
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