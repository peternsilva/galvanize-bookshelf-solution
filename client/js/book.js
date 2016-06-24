(function() {
  var imgUrlValid = true;
  var state = {};

  $('.modal-trigger').leanModal();

  if (window.QUERY_PARAMETERS.id) {
    window.HELPERS.getState({
      book: `http://localhost:8000/books/${window.QUERY_PARAMETERS.id}`
    }, function(bookState) {
      window.HELPERS.getState({
        author: `http://localhost:8000/authors/${bookState.book.author_id}`
      }, function (authorState) {
        Object.assign(state, bookState, authorState);

        if(window.COOKIES.userId) {
          $('.add').removeClass('hide');
        }

        $('.book-metadata h1').text(state.book.title);
        $('.book-metadata h2')
          .append($('<a>')
            .attr('href', `author.html?id=${state.book.author_id}`)
            .text(`${state.author.first_name} ${state.author.last_name}`));
        $('.book-metadata h3').text(state.book.genre);
        $('.book-metadata p').text(state.book.description);
        $('.book img').attr('src', state.book.cover_url)
          .attr('alt', state.book.title);
      });
    });
  }

  var $img = $('.book img').on('error', function(event) {
    imgUrlValid = false;
    $(event.target).width(imgWidth);
    $(event.target).height(imgHeight)
  });

  var imgWidth = $img.width();
  var imgHeight = $img.height();

  $('a.edit').click(function (event) {
    $xhr = $.getJSON(`http://localhost:8000/authors`);
    $xhr.done(function (authors) {
      if ($xhr.status !== 200) {
        return Materialize.toast('Unable to edit. Please try again.', 2000);
      }

      var $title = $('.book-metadata h1');
      var $author = $('.book-metadata h2');
      var $genre = $('.book-metadata h3');
      var $summary = $('.book-metadata p');

      var $titleInput = $('<input type="text">')
        .addClass('title')
        .val($title.text());

      var $genreInput = $('<input type="text">')
        .addClass('genre')
        .val($genre.text());

      var $summaryTextArea = $('<textarea>')
        .addClass('flow-text')
        .height($summary.height())
        .text($summary.text().trim());

      var $imgUrl = $('<input type="url">')
        .addClass('img-url')
        .val($img.attr('src'));

      $imgUrl.on('keyup', function(event) {
        var imgUrl = $(event.target).val();
        imgWidth = $img.width();
        imgHeight = $img.height();
        $img.attr('src', imgUrl);
        $img.css('width', 'auto');
        $img.css('height', 'auto');

        // Assume the image url is valid. It will invalidate if there is an error
        imgUrlValid = true;
      });

      var $selectAuthor = $('<select>').addClass('author');
      var $option;
      for (var i = 0; i < authors.length; i++) {
        $option = $('<option>')
          .attr('value', authors[i].id)
          .text(`${authors[i].first_name} ${authors[i].last_name}`)
          .prop('selected', authors[i].id === state.book.author_id);
        $selectAuthor.append($option);
      }

      $title.replaceWith($titleInput);
      $author.replaceWith($selectAuthor);
      $genre.replaceWith($genreInput);
      $summary.replaceWith($summaryTextArea);
      $img.after($imgUrl);

      // Initialize the select
      $('select').material_select();

      // Replace Actions with Save button
      $('.actions').addClass('hide');
      $('.save').removeClass('hide');

    });
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

    if(!imgUrlValid) {
      return Materialize.toast('Please enter a valid image url', 2000);
    }

    var $putXhr = $.ajax({
      url: `/books/${window.QUERY_PARAMETERS.id}`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        title: $titleInput.val().trim(),
        genre: $genreInput.val().trim(),
        cover_url: $imgUrl.val().trim(),
        author_id: Number.parseInt($authorSelect.find(':selected').attr('value')),
        description: $summaryTextarea.text().trim()
      })
    });

    $putXhr.done(function(updatedBook) {
      if($putXhr.status !== 200) {
        Materialize.toast('Save failed. Please try again.', 2000);
      }

      book = updatedBook;
      var $titleH1 = $('<h1>').text($titleInput.val().trim());
      var $authorH2 = $('<h2>')
        .append($('<a>')
          .attr('href', `author.html?id=${book.author_id}`)
          .text($authorSelect.find(':selected').text()));
      var $genreH3 = $('<h3>').text($genreInput.val().trim());
      var $summaryP = $('<p>').addClass('flow-text')
        .text($summaryTextarea.text());

      var imgUrl = $imgUrl.val();

      $titleInput.replaceWith($titleH1);
      $authorSelect.replaceWith($authorH2);
      $genreInput.replaceWith($genreH3);
      $summaryTextarea.replaceWith($summaryP);
      $imgUrl.remove();

      // Replace Actions with Save button
      $('.save').addClass('hide');
      $('.actions').removeClass('hide');
    });

    $putXhr.fail(function(result) {
      Materialize.toast('Save failed. Please try again.', 2000);
    });
  });

  $('.modal a.confirm-delete')
    .click(window.HELPERS.deleteResource('book'));

  $('a.add').click(function (event) {
    $xhr = $.ajax({
      url: `http://localhost:8000/users/${window.COOKIES.userId}/books/${state.book.id}`,
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
