(function() {
  'use strict';

  const authorId = window.QUERY_PARAMETERS.id;

  if (!authorId) {
    window.location.href = '/authors.html';
  }

  const renderAuthor = function(author) {
    const name = `${author.firstName} ${author.lastName}`;

    $('#name').text(name);
    $('#biography').text(author.biography);
    $('#portrait').attr({ src: author.portraitUrl, alt: name });
    $('#editAuthor').attr('href', `/edit_author.html?id=${author.id}`);
  };

  const renderBooks = function(books) {
    const $books = $('#books');

    for (const book of books) {
      const $anchor = $('<a>').attr('href', `/book.html?id=${book.id}`);
      const $book = $('<div>').addClass('col s12 m6 center-align book');
      const $img = $('<img>').attr({ src: book.coverUrl, alt: book.title });
      const $title = $('<div>').text(book.title);

      $anchor.append($img);
      $anchor.append($title);
      $book.append($anchor);
      $books.append($book);
    }
  };

  const attachListeners = function(author) {
    $('#deleteAuthor').click((event) => {
      event.preventDefault();

      $('#deleteModal').openModal();
    });

    $('#confirmDelete').click((event) => {
      event.preventDefault();

      const options = {
        url: `/authors/${author.id}`,
        type: 'DELETE'
      };

      $.ajax(options)
        .done(() => {
          window.location.href = '/authors.html';
        })
        .fail(() => {
          Materialize.toast('Unable to delete author', 3000);
        });
    });
  };

  $.getJSON(`/authors/${authorId}`)
    .done((author) => {
      renderAuthor(author);

      $.getJSON(`/authors/${author.id}/books`)
        .done((books) => {
          renderBooks(books);

          attachListeners(author);
        })
        .fail(() => {
          Materialize.toast("Unable to retrieve author's books", 3000);
        });
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve author', 3000);
    });
})();
