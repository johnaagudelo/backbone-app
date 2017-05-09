$(document).ready(function () {

	console.log('Starting app')

	let socket = io(window.location.origin);
	socket.on('articles::create', function (article) {
		window.collections.articles.add(article);
	});

	window.views.viewArticleNew = new App.Views.ArticleNewView({ model: new App.Models.ArticleModel() })
	Backbone.Validation.bind(window.views.viewArticleNew)
	window.views.viewArticleNew.render()
	$('#add-article').html(window.views.viewArticleNew.el)

	window.collections.articles = new App.Collections.ArticleCollection();
	window.routers = new App.Routers.BaseRouter();
	window.collections.articles.on('add', function (model) {
		var view = new App.Views.ArticleView({ model: model });
		view.render();
		view.$el.insertAfter('#contenido #add-article');
	});

	window.collections.articles.fetch({
		success: function(collectionArticle, response){
			response.forEach(function (article) {
				collectionArticle.add(new App.Models.ArticleModel(article))
			});
		}
	});
	Backbone.history.start({
		root: '/',
		pushState: false,
		silent: true
	})

	_.extend(Backbone.Validation.callbacks, {
		valid: function (view, attr, selector) {
			var $el = view.$('[name=' + attr + ']'),
				$group = $el.closest('.form-group');

			$group.removeClass('has-error');
			$group.find('.help-block').html('').addClass('hidden');
		},
		invalid: function (view, attr, error, selector) {
			var $el = view.$('[name=' + attr + ']'),
				$group = $el.closest('.form-group');

			$group.addClass('has-error');
			$group.find('.help-block').html(error).removeClass('hidden');
		}
	});
});
