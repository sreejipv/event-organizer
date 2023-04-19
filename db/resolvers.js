const moment = require('moment');
const Post = require('./models/post');
const User = require('./models/user');
const Event = require('./models/event')
const jwt = require('jsonwebtoken');


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
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { name, email, password } = input;
      const user = new User({ name, email, password});
      await user.save();
      return user;
    },

    login: async (_, { input },{ res }) =>{
    const {  email, password } = input;

      const user = await User.findOne({ email }).select('+password');
      if(!user) {
        throw new Error('Invalid login')
      }
      const match = await user.matchPassword(password)
      if(!match){
        throw new Error('Invalid login credentials')
      }
        // Generate JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      const authRes = { user, token }
      return authRes;
    },
    createPost: async (_, { input }) => {
      const { title, content, userId } = input;
      const post = new Post({ title, content, user: userId });
      await post.save();
      return post;
    },

    createEvent: async (_, { input }) => {
      const { name, description, date, count, userId } = input;
      const parsedDate = moment(date, 'MM/DD/YYYY', 'Asia/Kolkata').utc().toDate();
      const event = new Event({ name, description, date: parsedDate, count, user: userId });
      
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
      console.log('event', event?.date)
      return event ? event.date.toString() : null;
    },
  }
};

module.exports = resolvers;
