let template = require('../../templates/articleNew.js')

App.Views.ArticleNewView = Backbone.View.extend({
	className: "newArticle",
	model: App.Models.ArticleModel,
	events: {
		"click button": "create",
		"click #aside_header .icon-arrow-down": "toggle"
	},
	bindings: {
		'#title': 'title',
		'#tag': 'tag',
		'#content': 'content'
	},
	initialize: function () {
		this.template = Handlebars.compile(template);
	},
	toggle: function () {
		$('.newArticle aside').toggleClass('close')
	},
	create: function () {
		debugger
		Backbone.Validation.bind(this, {
			model: this.model
		});
		let isValid = this.model.isValid(true)
		if (isValid) {
			//window.collections.articles.create(this.model);
			this.model.save();
			//this.model.set({ title: "", tag: "", content: "" });
		}
	},
	render: function () {
		Backbone.Validation.bind(this, {
			valid: function (view, attr) {
				debugger
				var $el = view.$('[name=' + attr + ']'),
					$group = $el.closest('.form-group');

				$group.removeClass('has-error');
				$group.find('.help-block').html('').addClass('hidden');
			},
			invalid: function (view, attr, error) {
				debugger
				var $el = view.$('[name=' + attr + ']'),
					$group = $el.closest('.form-group');

				$group.addClass('has-error');
				$group.find('.help-block').html(error).removeClass('hidden');
			}
		});
		this.$el.html(this.template());
		this.stickit();
	}
});
