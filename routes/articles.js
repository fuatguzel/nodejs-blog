const express = require('express')
const { getNewPage, getEditPage, getShowPage, deleteArticle } = require('../controller/article')
const router = express.Router()

router.get('/new', getNewPage)

router.get('/edit/:id', getEditPage)

router.get('/:slug', getShowPage)

router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', deleteArticle)

// middleware
function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (error) {
      res.render(`articles/${path}`, {article: article})  
    }
  }
}


module.exports = router