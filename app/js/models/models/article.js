App.Models.ArticleModel = Backbone.Model.extend({
	urlRoot:"/articles/",
	defaults:{
		id: "",
		title: "",
		tag: "",
		content: ""
	},
	idAttribute: "id",
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
		return resp
	}
});