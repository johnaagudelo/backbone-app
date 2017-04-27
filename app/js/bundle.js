(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
App.Collections.ArticleCollection = Backbone.Collection.extend({

    model: App.Models.ArticleModel,
    url: "",
    search : function(letters){
        if(letters == "") return this;
        var pattern = new RegExp(letters,"gi");
        return _(this.filter(function(data) {
            return pattern.test(data.get("name"));
        }));
    },
    comparator : function(item){
        return item.get("name");    
    },
    getOne : function(id){
        return this.filter(function(data) {
            return data.get("id") == id;
        });
    },
    parse : function(resp) {
        return resp.data;
    }
});

App.Collections.article = App.Collections.ArticleCollection;
},{}],2:[function(require,module,exports){
App.Models.ArticleModel = Backbone.Model.extend({
	url:"/articles",
	defaults:{

	},
	prettyDate : function(date){
		if (!date || date === "0000-00-00 00:00:00") return "";
		var date = Date.parse(date);
		return date.toString("MMMM dd, yyyy")
	},
	parse : function(resp) {
		// the collection does not output same json format to models;
		if(resp.data){
			return resp.data;
		}else{
			return resp;
		}
	}
});
App.Models.Article = App.Models.ArticleModel;
},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
App.Views.ArticleView = Backbone.View.extend({
	events:{
		"click > article": "navigate",
		"click .likes_up" : "upvote",
		"click .likes_down" : "downvote"
	},
	className:"",
	initialize : function(model){
		let self = this;
		this.model = model;

		this.model.on('change', function(){
			self.render();
		})
		
		window.routers.on('route:root', function(){
			self.render();
		});

		window.routers.on('route:articleSingle', function(){
			self.render();
		});

		this.template = Handlebars.compile($("#entry-template").html());
		this.templateExtended = Handlebars.compile($("#entry-template-extended").html());
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
		ev.stopPropagation();
		let votes = this.model.get("votes");
		this.model.set("votes", parseInt(votes, 10) - 1);
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
		//this.$el.html( `<h3>${ this.model.get("title") }</h3><p>${ this.model.get("tag") }</p>` );
		return this;
	}
});

},{}],5:[function(require,module,exports){
App.Views.ArticleNewView = Backbone.View.extend({
	events:{
		"click button" : "create"
	},
	className:"",
	initialize : function($el){
		this.$el = $el;
		//this.template = _.template($("#ArticleNew_tpl").html());
	},
	create: function(){
		
		let title = this.$el.find('#title').val();
		let tag = this.$el.find('#tag').val();
		let content = this.$el.find('#content').val();

		let articleNew = new App.Models.Article({
			title: title,
			tag: tag,
			content: content
		})

		articleNew.save();

		this.$el.find('#title').val("");
		this.$el.find('#tag').val("");
		this.$el.find('#content').val("");

	},
	render: function(data) {
		var self = this;
		var locals = {};

		this.$el.html(this.template({data:locals}));

		return this;
	}
});

},{}],6:[function(require,module,exports){
/*require('./vendor/backbone.js')
require('./vendor/underscore.js')
require('./vendor/handlebars-v4.0.5.js')*/
 
require('./init.js')

// App Models
require('./backbone/models/article.js')

//App Collections
require('./backbone/collections/article.js')

//App View
require('./backbone/views/article.js')
require('./backbone/views/articleNew.js')

//App Router
require('./backbone/routers/base.js')

//App
require('./main.js')
},{"./backbone/collections/article.js":1,"./backbone/models/article.js":2,"./backbone/routers/base.js":3,"./backbone/views/article.js":4,"./backbone/views/articleNew.js":5,"./init.js":7,"./main.js":8}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
$(document).ready(function(){
	console.log('Starting app');
	let socket = io(window.location.origin);

	socket.on('articles::create', function(article){
		window.collections.articles.add(article);
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

},{}]},{},[6])