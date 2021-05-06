const handlers = require('./handlers');

module.exports = [
  {
    method: 'POST',
    path: '/books',
    handler: handlers.saveBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: handlers.getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: handlers.getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handlers.updateBook,
  },
];
