(function() {
  'use strict';

  const authorId = window.QUERY_PARAMETERS.id;

  if (!authorId) {
    window.location.href = '/authors.html';
  }

  const renderAuthor = function(author) {
    $('#firstName').val(author.firstName);
    $('#lastName').val(author.lastName);
    $('#biography').text(author.biography);
    $('#portrait').val(author.portraitUrl);
    $('#cancel').attr('href', `/author.html?id=${author.id}`);

    Materialize.updateTextFields();
  };

  const attachListeners = function(author) {
    $('#editAuthorForm').submit((event) => {
      event.preventDefault();

      const firstName = $('#firstName').val().trim();
      const lastName = $('#lastName').val().trim();
      const biography = $('#biography').val().trim();
      const portraitUrl = $('#portrait').val().trim();

      if (!firstName) {
        return Materialize.toast('First name must not be blank', 3000);
      }

      if (!lastName) {
        return Materialize.toast('Last name must not be blank', 3000);
      }

      if (!biography) {
        return Materialize.toast('Biography must not be blank', 3000);
      }

      if (!portraitUrl) {
        return Materialize.toast('Portrait must not be blank', 3000);
      }

      const options = {
        url: `/authors/${author.id}`,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify({ firstName, lastName, biography, portraitUrl })
      };

      $.ajax(options)
        .done(() => {
          window.location.href = `/author.html?id=${author.id}`;
        })
        .fail(($xhr) => {
          Materialize.toast($xhr.responseText, 3000);
        });
    });
  };

  $.getJSON(`/authors/${authorId}`)
    .done((author) => {
      renderAuthor(author);

      attachListeners(author);
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve author', 3000);
    });
})();
