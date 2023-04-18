const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
let Post;
try {
  Post = mongoose.model('Post');
} catch (error) {
  Post = mongoose.model('Post', postSchema);
}

module.exports = Post;


