(function() {
  var books = window.HELPERS.displayResources('book', function(book) {
    return {
      id: book.id,
      title: book.title,
      imageUrl: book.coverUrl
    };
  }, function (books) {
    $('.books .row').append(books);
  });
}());
