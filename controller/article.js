const Article = require('../models/article')

exports.getNewPage = (req, res) => {
  res.render('./articles/new', {article: new Article()})
}

exports.getEditPage = (req, res) => {
  const article = Article.findById(req.params.id)
  res.render('./articles/edit', {article: article})
}

exports.getShowPage = async (req, res) => {
  const article = await Article.findOne({slug: req.params.slug})
  if(article == null) res.redirect('/')
  res.render('articles/show', {article: article})
}

exports.deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
}
