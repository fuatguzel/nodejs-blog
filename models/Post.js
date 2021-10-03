const mongoose = require('mongoose');
const {Schema} = mongoose;

const Post = new Schema({
  title: String,
  image: String,
  createdAt: {
    type: Date,
    default: `${Date.getFullYear()}/${Date.getMonth()}/${Date. getDate()}`
  },
  description: String
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post