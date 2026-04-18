const DataLoader = require('dataloader');
const Book = require('../models/book');

const batchBookCounts = async (ids) => {
  const books = await Book.find({ author: { $in: ids } });
  const counts = {};
  ids.forEach((id) => {
    return (counts[id.toString()] = 0);
  });
  books.forEach((book) => {
    return counts[book.author.toString()]++;
  });

  return ids.map((id) => counts[id.toString()]);
};
module.exports = { batchBookCounts };
