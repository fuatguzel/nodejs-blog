const express = require('express');
const app = express();
const path = require('path')
const articleRouter = require('./routes/articles')

app.set('view engine', 'pug')
app.use(express.static('public'))

app.use('/articles', articleRouter)


app.get('/', (req, res) => {
  const articles = [{
    title: 'Article 1',
    description: 'Article Description',
    createdAt: new Date()
  },
  {
    title: 'Article 2',
    description: 'Article Description',
    createdAt: new Date()
  },
]
  res.render('index', {articles: articles})
})

app.get('/about', (req, res) => {
  res.render('about')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});