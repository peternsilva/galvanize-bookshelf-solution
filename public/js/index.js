(function() {
  'use strict';

  $('.parallax').parallax();

  $.getJSON('/books')
    .done((books) => {
      const $books = $('#books');

      for (const book of books) {
        const $anchor = $('<a>').attr('href', `/book.html?id=${book.id}`);
        const $book = $('<div>').addClass('col s12 m4 l3 center-align book');
        const $img = $('<img>').attr({ src: book.coverUrl, alt: book.title });
        const $title = $('<div>').text(book.title);

        $anchor.append($img);
        $anchor.append($title);
        $book.append($anchor);
        $books.append($book);
      }
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve books', 3000);
    });
})();
