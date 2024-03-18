let BookInstance = require('../models/bookinstance');

function get_books_status () {
  return Book.find({}, 'title status')
    .sort({title : 1})  // 1 indictes ascending order
}

exports.show_all_books_status = function(res) {
  BookInstance.find({'status': {$eq: 'Available'}})
  .populate('book')
  .exec()
  .then(list => {
    res.send(list.map(function(bi) {
      return bi.book.title + " : " + bi.status
    }))
  })
  .catch(err => console.log(err.message))
}