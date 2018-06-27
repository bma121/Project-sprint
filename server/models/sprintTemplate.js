const mongoose = require('mongoose');

const sprintTemplateSchema = mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model('SprintTemplate',sprintTemplateSchema);
