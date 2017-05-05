(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*require('./vendor/backbone.js')
require('./vendor/underscore.js')
require('./vendor/handlebars-v4.0.5.js')*/
 
require('./init.js')
// App Models
require('./models/models/article.js')
//App Collections
require('./models/collections/article.js')
//App View
require('./models/views/article.js')
require('./models/views/articleNew.js')
//App Router
require('./models/routers/base.js')
//App
require('./main.js')
},{"./init.js":2,"./main.js":3,"./models/collections/article.js":4,"./models/models/article.js":5,"./models/routers/base.js":6,"./models/views/article.js":7,"./models/views/articleNew.js":8}],2:[function(require,module,exports){
window.App = {};

//namespace para agrupar las clases de la aplicacion sin afectar en entorno global windows.
App.Views = {};
App.Collections = {};
App.Models = {};
App.Routers = {};

//Mantener las definicones de la aplicacion (Objetos en tiempior de jecucion de la app) 
window.app = {};
window.routers = {};
window.plugs = {};
window.views = {};
window.collections = {};

},{}],3:[function(require,module,exports){
$(document).ready(function () {

	console.log('Starting app')

	let socket = io(window.location.origin);
	socket.on('articles::create', function (article) {
		window.collections.articles.add(article);
	});
	debugger

	viewArticleNew = new App.Views.ArticleNewView({ model: new App.Models.ArticleModel() })
	Backbone.Validation.bind(viewArticleNew)
	viewArticleNew.render()
	$('#add-article').html(viewArticleNew.el)

	window.collections.articles = new App.Collections.ArticleCollection();
	window.routers = new App.Routers.BaseRouter();

	window.collections.articles.on('add', function (model) {
		var view = new App.Views.ArticleView({model: model});
		view.render();
		view.$el.insertAfter('#contenido #add-article');
	});

	const xhr = $.get('/articles/all');

	xhr.done(function (data) {
		data.forEach(function (article) {
			window.collections.articles.add(new App.Models.ArticleModel(article))
		});
	})

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

},{}],4:[function(require,module,exports){
App.Collections.ArticleCollection = Backbone.Collection.extend({
    model: App.Models.ArticleModel,
    url: "/articles/all",
    getOne : function(id){
        return this.filter(function(data) {
            return data.get("id") == id;
        });
    },
    parse : function(resp) {
        return resp.data;
    }
});
},{}],5:[function(require,module,exports){
App.Models.ArticleModel = Backbone.Model.extend({
	url:"/articles",
	defaults:{
		title: "",
		tag: "",
		content: ""
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
},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
let template = require('../../templates/article.js')
let templeteExtend = require('../../templates/article-extended.js') 

App.Views.ArticleView = Backbone.View.extend({
	events:{
		"click > article": "navigate",
		"click .likes_up" : "upvote",
		"click .likes_down" : "downvote"
	},
	className: "article",
	initialize : function(){
		let self = this;
		this.model.on('change', function(){
			self.render();
		})
		window.routers.on('route:root', function(){
			self.render();
		});
		window.routers.on('route:articleSingle', function(){
			self.render();
		});
		this.template = Handlebars.compile(template);
		this.templateExtended = Handlebars.compile(templeteExtend);
	},
	navigate: function(ev){
		Backbone.history.navigate('article/'+ this.model.get('id'), { trigger: true });
	},
	upvote: function(ev){
		ev.stopPropagation();
		let votes = this.model.get("votes");
		this.model.set("votes", parseInt(votes, 10) + 1);
	},
	downvote: function(ev){
		ev.stopPropagation()
		let votes = parseInt(this.model.get("votes"), 10)
		if(votes > 0){
			this.model.set("votes", parseInt(votes, 10) - 1);
		}
	},
	render: function() {
		var self = this;
		var locals = {
			post: this.model.toJSON()
		}
		if (window.app.state == "articleSingle") {
			if(window.app.article == this.model.get('id')){
				this.$el.show();
				this.$el.html(this.templateExtended(locals));
			}else{
				this.$el.hide();
				this.$el.html('');
			}
		}else{
			this.$el.html(this.template(locals));
		}
		return this;
	}
});

},{"../../templates/article-extended.js":9,"../../templates/article.js":10}],8:[function(require,module,exports){
let template = require('../../templates/articleNew.js')

App.Views.ArticleNewView = Backbone.View.extend({
	events:{
		"click button" : "create",
		"click #aside_header .icon-arrow-down": "toggle"
	},
	bindings: {
		'#title': 'title',
		'#tag': 'tag',
		'#content': 'content'
	},
	className:"newArticle",
	initialize : function(){
		this.template = Handlebars.compile(template);
	},
	toggle: function(){
		$('.newArticle aside').toggleClass('close')
	},
	create: function(){
		
		/*let title = this.$el.find('#title').val();
		let tag = this.$el.find('#tag').val();
		let content = this.$el.find('#content').val();

		this.model.set({
			title: title,
			tag: tag,
			content: content
		})*/
		Backbone.Validation.bind(this, { model: this.model })
		let isValid = this.model.isValid(true)
		if(isValid){
            this.model.save();
			this.model.set({ title: "", tag: "", content: ""});
		}
	},
	render: function() {
		this.$el.html(this.template());
		this.stickit();
	}
});

},{"../../templates/articleNew.js":11}],9:[function(require,module,exports){
module.exports = `<article class="contenido_item extended">
    <figure>
        <a href="#!"><img src="{{ post.image }}"></a>
    </figure>
    <div class="item_info">
        <h2>{{ post.title }}</h2>
        <p class="item_posted">Posted by <a href="#!">{{ post.user }}</a></p>
        <span aria-hidden="true" class="icon-heart-2"></span>
        <div>
            {{{ post.content }}}
        </div>
    </div>
    <div class="item_extra">
        <p class="extra_tag">{{ post.tag }}</p>
        <div class="extra_likes">
            <a class="likes_up" href="#!"><span aria-hidden="true" class="icon-arrow-up"></span></a>
            <div class="likes_numero">{{ post.votes }}</div>
            <a class="likes_down" href="#!"><span aria-hidden="true" class="icon-arrow-down"></span></a>
        </div>
    </div>
</article>`
},{}],10:[function(require,module,exports){
module.exports = `<article class="contenido_item">
    <figure>
        <a href="#!"><img src="{{ post.image }}"></a>
    </figure>
    <div class="item_info">
        <h2>{{ post.title }}</h2>
        <p class="item_posted">Posted by <a href="#!">{{ post.user }}</a></p>
        <span aria-hidden="true" class="icon-heart-2"></span>
    </div>
    <div class="item_extra">
        <p class="extra_tag">{{ post.tag }}</p>
        <div class="extra_likes">
            <a class="likes_up" href="#!"><span aria-hidden="true" class="icon-arrow-up"></span></a>
            <div class="likes_numero">{{ post.votes }}</div>
            <a class="likes_down" href="#!"><span aria-hidden="true" class="icon-arrow-down"></span></a>
        </div>
    </div>
</article>`
},{}],11:[function(require,module,exports){
module.exports = `<aside class="close">
                        <div id="aside_header">
                            <span aria-hidden="true" class="icon-arrow-down"></span>
                            <h3>New article</h3>
                        </div>
                        <div id="aside_body">
                                <form class="form-horizontal" role= "form" >
                                    <div class="form-group">
                                        <div class="col-lg-12">
                                            <input type="text" placeholder="Title" class="form-control" id="title" name="title" />
                                            <span class="help-block hidden"></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-12">
                                            <input type="text" placeholder="Tag" class="form-control" id="tag" name="tag" />
                                            <span class="help-block hidden"></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-12">
                                            <input type="text" placeholder="Content" class="form-control" id="content" name="content" />
                                            <span class="help-block hidden"></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-10">
                                            <button type="button" id="signUpButton" class="btn btn-success">Create</button>
                                        </div>
                                    </div>
                            </form>
                        </div>
                    </aside>`


},{}]},{},[1])