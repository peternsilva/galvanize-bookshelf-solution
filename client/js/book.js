(function() {
  const {
    getState,
    deleteResource,
    updateResource,
    createUrl
  } = window.HELPERS;

  let state = {};

  const inputHTML = $('.book-metadata').html();

  $('.modal-trigger').leanModal();

  if (window.QUERY_PARAMETERS.id) {
    getState({
      book: createUrl(`/books/${window.QUERY_PARAMETERS.id}`),
      authors: createUrl(`/authors`)
    }, function(completedState) {
      state = completedState
      state.author = state.authors.filter(function(author) {
        return author.id === state.book.author_id;
      })[0];

      if(window.COOKIES.userId) {
        $('.add').removeClass('hide');
      }

      toViewMode();
    });
  } else {
    getState({
      authors: createUrl(`/authors`)
    }, function(completedState) {
      state = completedState
      state.book = {};
      state.author = {};

      $('.book-metadata .author').append(state.authors.map(function (author) {
        return $('<option>')
          .attr('value', author.id)
          .text(`${author.first_name} ${author.last_name}`);
      }));
      $('select').material_select();
    });
  }

  const toViewMode = function() {
    const titleH1 = $('<h1>').addClass('title').text(state.book.title);
    const authorH2 = $('<h2>').addClass('author')
      .append($('<a>')
        .attr('href', `author.html?id=${state.book.author_id}`)
        .text(`${state.author.first_name} ${state.author.last_name}`));
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
      .attr('src', state.book.cover_url)
      .attr('alt', state.book.title);
    $('.img-url').val(state.book.cover_url);
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
    $('.img-url').val(state.book.cover_url);
    $('label').addClass('active');
    $('.cover-field').removeClass('hide');

    $('.book-metadata .author').append(state.authors.map(function (author) {
      return $('<option>')
        .attr('value', author.id)
        .text(`${author.first_name} ${author.last_name}`);
    }));
    $(`.book-metadata .author`).val(state.book.author_id);
    $('select').material_select();

    // Replace Actions with Save button
    $('.actions').addClass('hide');
    $('.save-action').removeClass('hide');
  }

  $('a.edit').click(function (event) {
    toEditMode();
  });

  $('a.save').click(function(event) {
    var $titleInput = $('.book-metadata .title');
    var $authorSelect = $('.book-metadata div.author');
    var $titleInput = $('.book-metadata .title');
    var $genreInput = $('.book-metadata .genre');
    var $summaryTextarea = $('.book-metadata textarea');
    var $imgUrl = $('.book .img-url');

    if(!$titleInput.val().trim()) {
      return Materialize.toast('Please enter a title', 2000);
    }

    if(!$authorSelect.children('select').val()) {
      return Materialize.toast('Please add an author first', 2000);
    }

    if(!$genreInput.val().trim()) {
      return Materialize.toast('Please enter a genre', 2000);
    }

    if(!$summaryTextarea.text().trim()) {
      return Materialize.toast('Please enter a summary', 2000);
    }

    if(!$imgUrl.val().trim()) {
      return Materialize.toast('Please enter an image url', 2000);
    }

    var $xhr = $.ajax({
      url: `/books/${window.QUERY_PARAMETERS.id}`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        title: $titleInput.val().trim(),
        genre: $genreInput.val().trim(),
        coverUrl: $imgUrl.val().trim(),
        authorId: Number.parseInt($authorSelect.find(':selected').attr('value')),
        description: $summaryTextarea.text().trim()
      })
    });

    $xhr.done(function(updatedBook) {
      if($xhr.status !== 200) {
        Materialize.toast('Save failed. Please try again.', 2000);
      }

      state.book = updatedBook;
      toViewMode();
    });

    $xhr.fail(function(result) {
      Materialize.toast('Save failed. Please try again.', 2000);
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
