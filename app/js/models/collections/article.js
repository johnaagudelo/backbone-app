App.Collections.ArticleCollection = Backbone.Collection.extend({
    url: "/articles",
    model: App.Models.ArticleModel,
    getOne : function(id){
        return this.filter(function(data) {
            return data.get("id") == id;
        });
    },
    parse : function(resp) {
        return resp;
    }
});