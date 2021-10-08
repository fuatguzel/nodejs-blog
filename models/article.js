const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const {
  JSDOM
} = require('jsdom')

const dompurify = new createDomPurify(new JSDOM().window)

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://picsum.photos/200/300"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})

ArticleSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true
    });

    if(this.markdown) {
      this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }

  }

  next();
})

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article