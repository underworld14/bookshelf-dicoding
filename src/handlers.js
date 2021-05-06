const nanoId = require('nanoid');
const books = require('./books');

exports.saveBook = (request, h) => {
  const { pageCount, readPage, name } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id: nanoId(16),
    ...request.payload,
    reading: false,
    finished,
    insertedAt,
    updatedAt,
  };

  const isSuccess = books.push(newBook);

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        ...newBook,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

exports.getAllBooks = () => {
  return {
    status: 'success',
    data: {
      books,
    },
  };
};

exports.getBookById = (request, h) => {
  const { id } = request.params;
  const book = books.filter((n) => n.id === id).shift();

  if (book) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

exports.updateBook = (request, h) => {};
