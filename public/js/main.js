$(document).ready(function(){
	console.log('Starting app');

	window.collections.articles = new App.Collections.ArticleCollection();

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
			pushState: true,
			silent: false 
		})
	})
});
