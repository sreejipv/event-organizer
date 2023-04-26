import { serialize } from 'cookie';
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
    },
    getUser: async (_, __, {req}) => {
      const token = req.cookies.token;
      console.log('token',req.cookies)
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          console.log('decoded', decoded)
          const user = await User.findById(decoded.userId);
          console.log('user', user)
          
          if (user) {
            return user;
          }
        } catch (error) {
          // Handle invalid token
        }
      }
      return null;
    },
  },
  Mutation: {
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
    createUser: async (_, { input },  { res }) => {
      const { name, email, password } = input;
      const user = new User({ name, email, password });
      await user.save();
      // exclude password field from the response
      user.password = undefined;
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      
      const cookieOpts = {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "strict",
        path: "/",
        // secure: process.env.NODE_ENV === "production",
        secure: false,
      };

      const cookieValue = serialize('token', token, cookieOpts);
      res.setHeader('Set-Cookie', [cookieValue]);
      return user;
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
      return event ? event.date.toString() : null;
    },
  }
};

module.exports = resolvers;
