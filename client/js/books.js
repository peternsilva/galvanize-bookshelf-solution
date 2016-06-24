(function() {
  window.HELPERS.displayResources('book', function(book) {
    return {
      id: book.id,
      title: book.title,
      imageUrl: book.cover_url
    };
  });  
}());
