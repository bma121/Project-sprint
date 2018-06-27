const mongoose = require('mongoose');

const pastSprintSchema = mongoose.Schema({
  length: {type: String, required: true},
  status: {type: String, required: true},
  createdAt: {type: String, required: true},
  startedAt: {type: String, required: true},
  finishedAt: {type: String, required: true},
  description: {type: String, required: true},

});


module.exports = mongoose.model('PastSprint', pastSprintSchema);
