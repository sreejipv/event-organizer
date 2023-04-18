const moment = require('moment');
const Post = require('./models/post');
const User = require('./models/user');
const Event = require('./models/event')


const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    posts: async () => {
      const posts = await Post.find();
      return posts;
    },
    user: async (_, { id }) => {
      const user = await User.findById(id);
      return user;
    },
    post: async (_, { id }) => {
      const post = await Post.findById(id);
      return post;
    },
    event: async (_, { id }) => {
      const event = await Event.findById(id);
      return event;
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { name, email } = input;
      const user = new User({ name, email });
      await user.save();
      return user;
    },
    createPost: async (_, { input }) => {
      const { title, content, userId } = input;
      const post = new Post({ title, content, user: userId });
      await post.save();
      return post;
    },

    createEvent: async (_, { input }) => {
      const { name, description, date, count, userId } = input;
      console.log('Received date:', date);
      const parsedDate = moment(date, 'MM/DD/YYYY').toDate();
  console.log('Parsed date:', parsedDate);

      const event = new Event({ name, description, date: parsedDate, count, user: userId });
  console.log('Parsed event:', event);
      
      await event.save();
      return event;
    },
  },
  User: {
    posts: async (user) => {
      const posts = await Post.find({ user: user.id });
      return posts;
    },
  },
  Post: {
    user: async (post) => {
      const user = await User.findById(post.user);
      return user;
    },
  },
  Event: {
    date: async (parent) => {
      const event = await Event.findById(parent._id);
      return event ? event.Date.toString() : null;
    },
  }
};

module.exports = resolvers;
