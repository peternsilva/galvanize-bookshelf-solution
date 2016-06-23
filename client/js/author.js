(function() {
  var imgUrlValid = true;
  var author = {};

  $('.button-collapse').sideNav();
  $('.modal-trigger').leanModal();

  var hasQueryParams = window.location.search.indexOf('?') >=0;
  var queryParams = {};
  if (hasQueryParams) {
    window.location.search.substr(1).split('&').forEach(function(paramStr) {
      var param = paramStr.split('=')
      queryParams[param[0]] = param[1];
    });
  }

  if (queryParams.id) {
    $xhr = $.getJSON(`http://localhost:8000/authors/${queryParams.id}`);
    $xhr.done(function (authorResponse) {
      if ($xhr.status !== 200) {
        return Materialize.toast('Unable to retrieve author. Please try again.', 2000);
      }
      author = authorResponse;

      var $booksXhr = $.getJSON(`http://localhost:8000/authors/${queryParams.id}/books`)

      $booksXhr.done(function (books) {
        if ($booksXhr.status !== 200) {
          return Materialize.toast('Unable to retrieve books for author. Please try again.', 2000);
        }

        $('.author-metadata h1').text(`${author.first_name} ${author.last_name}`);
        $('.author-metadata p').text(author.biography);
        $('.author img').attr('src', author.portrait_url)
          .attr('alt', `${author.first_name} ${author.last_name}`);
        $('.author-metadata .books').append(books.map(function(book) {
          var row = $('<div class="row book">');
          var firstCol = $('<div class="col s10">');
          var secondCol = $('<div class="col s2">');
          var title = $('<a>')
            .attr('href', `book.html?id=${book.id}`)
            .text(book.title);
          var img = $('<img>')
            .attr('src', book.cover_url)
            .attr('alt', book.title);

          row.append(firstCol.append(title));
          row.append(secondCol.append(img));

          return row;
        }));
      });
    });
  }

  var $img = $('.author img').on('error', function(event) {
    imgUrlValid = false;
    $(event.target).width(imgWidth);
    $(event.target).height(imgHeight)
  });

  var imgWidth = $img.width();
  var imgHeight = $img.height();

  $('a.edit').click(function (event) {
    var $name = $('.author-metadata h1');
    var $biography = $('.author-metadata p');

    var $firstNameInput = $('<input type="text">')
      .addClass('first-name')
      .val(author.first_name);

    var $lastNameInput = $('<input type="text">')
      .addClass('last-name')
      .val(author.last_name);

    var inputs = [$firstNameInput, $lastNameInput];
    var $inputRow = $('<div class="row name">');
    var $col;
    for(var i = 0; i <= inputs.length; i++) {
      $col = $('<div class="col s6">')
        .append(inputs[i]);
      $inputRow.append($col)
    }

    var $biographyTextarea = $('<textarea>')
      .addClass('flow-text')
      .height($biography.height())
      .text($biography.text().trim());

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

    $name.replaceWith($inputRow);
    $biography.replaceWith($biographyTextarea);
    $img.after($imgUrl);

    // Initialize the select
    $('select').material_select();

    // Replace Actions with Save button
    $('.actions').addClass('hide');
    $('.save').removeClass('hide');
  });

  $('a.save').click(function(event) {
    var $fnameInput = $('.author-metadata .first-name');
    var $lnameInput = $('.author-metadata .last-name');
    var $biographyTextarea = $('.author-metadata textarea');
    var $imgUrl = $('.author .img-url');

    if(!$fnameInput.val().trim()) {
      return Materialize.toast('Please enter a first name', 2000);
    }

    if(!$lnameInput.val().trim()) {
      return Materialize.toast('Please enter a last name', 2000);
    }

    if(!$biographyTextarea.text().trim()) {
      return Materialize.toast('Please add a biography', 2000);
    }

    if(!$imgUrl.val().trim()) {
      return Materialize.toast('Please enter an image url', 2000);
    }

    if(!imgUrlValid) {
      return Materialize.toast('Please enter a valid image url', 2000);
    }

    var $putXhr = $.ajax({
      url: `/authors/${queryParams.id}`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        first_name: $fnameInput.val().trim(),
        last_name: $lnameInput.val().trim(),
        biography: $biographyTextarea.text().trim(),
        portrait_url: $imgUrl.val().trim()
      })
    });

    $putXhr.done(function(updatedAuthor) {
      if($putXhr.status !== 200) {
        Materialize.toast('Save failed. Please try again.', 2000);
      }

      author = updatedAuthor;
      var $nameH1 = $('<h1>')
        .text(`${$fnameInput.val().trim()} ${$lnameInput.val().trim()}`);
      var $biographyP = $('<p>').addClass('flow-text')
        .text($biographyTextarea.text());

      $('.author-metadata .name').replaceWith($nameH1);
      $biographyTextarea.replaceWith($biographyP);
      $imgUrl.remove();

      // Replace Actions with Save button
      $('.save').addClass('hide');
      $('.actions').removeClass('hide');
    });
    $putXhr.fail(function(result) {
      Materialize.toast('Save failed. Please try again.', 2000);
    });
  });

  $('.modal a.confirm-delete').click(function (event) {
    var $delXhr = $.ajax({
      url: `/authors/${queryParams.id}`,
      type: 'DELETE'
    });
    $delXhr.done(function() {
      if($delXhr.status !== 200) {
        Materialize.toast('Delete failed. Please try again.', 2000);
      }

      window.location.href = 'authors.html';
    });
    $delXhr.fail(function(result) {
      Materialize.toast('Delete failed. Please try again.', 2000);
    });
  });

  $('a.delete').click(function (event) {
    if($('.book').length > 0) {
      return Materialize.toast('Please remove all books for this author', 2000);
    }

    $('#confirm').openModal();
  });
}());
