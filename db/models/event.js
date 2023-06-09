const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, 
  },
  venue: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
let Event;
try {
  Event = mongoose.model('Event');
} catch (error) {
  Event = mongoose.model('Event', eventSchema);
}

module.exports = Event;


