$(document).ready(function(){
	console.log('Starting app');
	let socket = io(window.location.origin);

	socket.on('articles::create', function(article){
		window.collections.articles.add(articleNew);
	});
	
	window.views.articleNew = new App.Views.ArticleNewView($('#contenido aside'));
	window.collections.articles = new App.Collections.ArticleCollection();
	window.routers = new App.Routers.BaseRouter();
	window.collections.articles.on('add', function(model){
		var view = new App.Views.ArticleView(model);
		view.render();
		view.$el.insertAfter('#contenido aside');
	});						  
	const xhr = $.get('/articles/all');

	xhr.done(function(data){
		data.forEach(function(item) {
			window.collections.articles.add(item);
		});

		Backbone.history.start({
			root: '/',
			pushState: false,
			silent: true 
		})
	})
});
