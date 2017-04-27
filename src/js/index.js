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