(function() {
  'use strict';

  const bookId = window.QUERY_PARAMETERS.id;

  if (!bookId) {
    window.location.href = '/books.html';
  }

  const renderBook = function(book) {
    $('#title').val(book.title);
    $('#genre').val(book.genre);
    $('#description').text(book.description);
    $('#cover').val(book.coverUrl);
    $('#cancel').attr('href', `/book.html?id=${book.id}`);

    Materialize.updateTextFields();
  };

  const renderAuthors = function(authors, book) {
    const $authors = authors.map((author) => {
      return $('<option>')
        .attr('value', author.id)
        .text(`${author.firstName} ${author.lastName}`);
    });

    $('#author')
      .append($authors)
      .val(book.authorId)
      .material_select();
  };

  const attachListeners = function(book) {
    $('#editBookForm').submit((event) => {
      event.preventDefault();

      const title = $('#title').val().trim();
      const authorId = Number.parseInt($('#author').val());
      const genre = $('#genre').val().trim();
      const description = $('#description').val().trim();
      const coverUrl = $('#cover').val().trim();

      if (!title) {
        return Materialize.toast('Title must not be blank', 3000);
      }

      if (Number.isNaN(authorId)) {
        return Materialize.toast('Author must be selected', 3000);
      }

      if (!genre) {
        return Materialize.toast('Genre must not be blank', 3000);
      }

      if (!description) {
        return Materialize.toast('Description must not be blank', 3000);
      }

      if (!coverUrl) {
        return Materialize.toast('Cover must not be blank', 3000);
      }

      const options = {
        url: `/books/${book.id}`,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify({ title, authorId, genre, description, coverUrl })
      };

      $.ajax(options)
        .done(() => {
          window.location.href = `/book.html?id=${book.id}`;
        })
        .fail(($xhr) => {
          Materialize.toast($xhr.responseText, 3000);
        });
    });
  };

  $.getJSON(`/books/${bookId}`)
    .done((book) => {
      renderBook(book);

      $.getJSON('/authors')
        .done((authors) => {
          renderAuthors(authors, book);

          attachListeners(book);
        })
        .fail(() => {
          Materialize.toast("Unable to retrieve book's author", 3000);
        });
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve book', 3000);
    });
})();
