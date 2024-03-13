var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
//calculated fields
AuthorSchema
.virtual('name') // name of calculated field
.get(function () { // how to get 'name'
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
  var datestring = ""
  if (this.date_of_birth) {
    datestring += this.date_of_birth.getFullYear()
  }
  datestring += " - "
  if (this.date_of_death) {
    datestring += this.date_of_death.getFullYear()
  }
  return datestring
}); // would be death date minue birth date, but only if there

//Export model
module.exports = mongoose.model('Author', AuthorSchema);

// to ensure compilation run 'node models/author.js'
