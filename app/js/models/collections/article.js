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