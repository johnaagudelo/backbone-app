$(document).ready(function(){

	console.log('Starting app')

	let socket = io(window.location.origin);
	socket.on('articles::create', function(article){
		window.collections.articles.add(article);
	});
	debugger

	viewArticleNew = new App.Views.ArticleNewView({ model: new App.Models.ArticleModel() })
	Backbone.Validation.bind(viewArticleNew)
	viewArticleNew.render()
	$('#add-article').html(viewArticleNew.el)

	window.collections.articles = new App.Collections.ArticleCollection();
	window.routers = new App.Routers.BaseRouter();

	window.collections.articles.on('add', function(model){
		var view = new App.Views.ArticleView(model);
		view.render();
		view.$el.insertAfter('#contenido #add-article');
	});						  
	const xhr = $.get('/articles/all');

	xhr.done(function(data){
		data.forEach(function(article) {
			window.collections.articles.add(new App.Models.ArticleModel(article))
		});
	})

	Backbone.history.start({
		root: '/',
		pushState: false,
		silent: true 
	})
});
