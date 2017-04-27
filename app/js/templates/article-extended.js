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