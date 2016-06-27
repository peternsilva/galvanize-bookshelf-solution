(function() {
  const {
    getState,
    deleteResource,
    updateResource,
  } = window.HELPERS;

  let state = {};

  const inputHTML = $('.book-metadata').html();

  $('.modal-trigger').leanModal();

  if (window.QUERY_PARAMETERS.id) {
    getState({
      book: `/books/${window.QUERY_PARAMETERS.id}`,
      authors: `/authors`
    }, function(completedState) {
      state = completedState
      state.author = state.authors.filter(function(author) {
        return author.id === state.book.authorId;
      })[0];

      if(window.COOKIES.userId) {
        $('.add').removeClass('hide');
      }

      toViewMode();
    });
  } else {
    getState({
      authors: `/authors`
    }, function(completedState) {
      state = completedState
      state.book = {};
      state.author = {};

      $('.book-metadata .author').append(state.authors.map(function (author) {
        return $('<option>')
          .attr('value', author.id)
          .text(`${author.firstName} ${author.lastName}`);
      }));
      $('select').material_select();
    });
  }

  const toViewMode = function() {
    const titleH1 = $('<h1>').addClass('title').text(state.book.title);
    const authorH2 = $('<h2>').addClass('author')
      .append($('<a>')
        .attr('href', `author.html?id=${state.book.authorId}`)
        .text(`${state.author.firstName} ${state.author.lastName}`));
    const genreH3 = $('<h3>').addClass('genre').text(state.book.genre);
    const descriptionP = $('<p>')
      .addClass('description')
      .addClass('flow-text')
      .text(state.book.description);

    $('.title').replaceWith(titleH1);
    $('.author').replaceWith(authorH2);
    $('.genre').replaceWith(genreH3);
    $('.description').replaceWith(descriptionP);
    $('.cover-field').addClass('hide');
    $('.book img')
      .attr('src', state.book.coverUrl)
      .attr('alt', state.book.title);
    $('.img-url').val(state.book.coverUrl);
    $('.book-metadata label').remove();

    // Replace Actions with Save button
    $('.actions').removeClass('hide');
    $('.save-action').addClass('hide');
  };

  const toEditMode = function() {
    $('.book-metadata').html(inputHTML);
    $('.book-metadata .title').val(state.book.title);
    $('.book-metadata .genre').val(state.book.genre);
    $('.book-metadata textarea').text(state.book.description);
    $('.img-url').val(state.book.coverUrl);
    $('label').addClass('active');
    $('.cover-field').removeClass('hide');

    $('.book-metadata .author').append(state.authors.map(function (author) {
      return $('<option>')
        .attr('value', author.id)
        .text(`${author.firstName} ${author.lastName}`);
    }));
    $(`.book-metadata .author`).val(state.book.authorId);
    $('select').material_select();

    // Replace Actions with Save button
    $('.actions').addClass('hide');
    $('.save-action').removeClass('hide');
  }

  $('a.edit').click(function (event) {
    toEditMode();
  });

  $('a.save').click(function(event) {
    const title = $('.book-metadata .title').val().trim();
    const authorId = Number.parseInt(
      $('.book-metadata div.author').children('select').val());
    const genre = $('.book-metadata .genre').val().trim();
    const description = $('.book-metadata textarea').val().trim();
    const coverUrl = $('.book .img-url').val().trim();

    if(!title) {
      return Materialize.toast('Please enter a title', 2000);
    }

    if(!authorId) {
      return Materialize.toast('Please add an author first', 2000);
    }

    if(!genre) {
      return Materialize.toast('Please enter a genre', 2000);
    }

    if(!description) {
      return Materialize.toast('Please enter a summary', 2000);
    }

    if(!coverUrl) {
      return Materialize.toast('Please enter an image url', 2000);
    }

    updateResource('book', {
      title, genre, coverUrl, description,
      authorId: Number.parseInt(authorId)
    }, function (book) {
      state.book = book;
      state.author = state.authors.filter(function(author) {
        return author.id === state.book.authorId;
      })[0];

      toViewMode();
    });
  });

  $('.modal a.confirm-delete')
    .click(window.HELPERS.deleteResource('book'));

  $('a.add').click(function (event) {
    $xhr = $.ajax({
      url: `/users/${window.COOKIES.userId}/books/${state.book.id}`,
      type: 'POST'
    });

    $xhr.done(function() {
      if($xhr.status !== 200) {
        return Materialize.toast('Could not add book. Please try again.', 2000);
      }

      $('.add').text('Remove From Library');
    });

    $xhr.fail(function() {
      Materialize.toast('Could not add book. Please try again.', 2000);
    });
  });
}());
