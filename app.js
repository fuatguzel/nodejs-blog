const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const path = require('path')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')

mongoose.connect('mongodb+srv://fuatguzel:BuLmggoAU1L4vKka@cluster0.sxzwy.mongodb.net/node-photo-gallery?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true,
  //useCreateIndex: true
})

app.set('view engine', 'pug')
app.use(express.static('public'))

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
//   const articles = [{
//     title: 'Article 1',
//     description: 'Article Description',
//     createdAt: new Date()
//   },
//   {
//     title: 'Article 2',
//     description: 'Article Description',
//     createdAt: new Date()
//   },
// ]

  const articles = await Article.find({}).sort('-createdAt')
  res.render('articles/index', {articles})
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.use('/articles', articleRouter)

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});