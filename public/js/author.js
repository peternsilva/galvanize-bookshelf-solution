(function() {
  const {
    getState,
    deleteResource,
    updateResource,
    createUrl
  } = window.HELPERS;

  let state = {};
  const inputHTML = $('.author-metadata').html();

  if (window.QUERY_PARAMETERS.id) {
    getState({
      author: createUrl(`/authors/${window.QUERY_PARAMETERS.id}`),
      books: createUrl(`/authors/${window.QUERY_PARAMETERS.id}/books`)
    }, function (completedState) {
      state = completedState;

      const {author, books} = state;
      const name = `${author.first_name} ${author.last_name}`;

      toViewMode();

      $('.books').append(books.map(function(book) {
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
  }

  const toEditMode = function() {
    $('.author-metadata').html(inputHTML);
    $('.author-metadata .first-name').val(state.author.first_name);
    $('.author-metadata .last-name').val(state.author.last_name);
    $('.author-metadata textarea').text(state.author.biography);
    $('.img-url').val(state.author.portrait_url);
    $('.portrait-field').addClass('hide');
    $('label').addClass('active');

    // Replace Actions with Save button
    $('.actions').addClass('hide');
    $('.save-action').removeClass('hide');
  };

  const toViewMode = function() {
    const $nameH1 = $('<h1>')
      .text(`${state.author.first_name} ${state.author.last_name}`);
    const $biographyP = $('<p>').addClass('flow-text')
      .text(state.author.biography);

    $('.author-metadata .name').replaceWith($nameH1);
    $('.author-metadata .biography').replaceWith($biographyP);
    $('.author img').attr('src', state.author.portrait_url)
    $('.portrait-field').addClass('hide');
    $('.author-metadata label').remove();

    // Replace Actions with Save button
    $('.save-action').addClass('hide');
    $('.actions').removeClass('hide');
  };

  $('a.edit').click(function (event) {
    toEditMode();
  });

  $('a.save').click(function(event) {
    var fname = $('.author-metadata .first-name').val().trim();
    var lname = $('.author-metadata .last-name').val().trim();
    var biography = $('.author-metadata textarea').val().trim();
    var imgUrl = $('.author .img-url').val().trim();

    if(!fname) {
      return Materialize.toast('Please enter a first name', 2000);
    }

    if(!lname) {
      return Materialize.toast('Please enter a last name', 2000);
    }

    if(!biography) {
      return Materialize.toast('Please add a biography', 2000);
    }

    if(!imgUrl) {
      return Materialize.toast('Please enter an image url', 2000);
    }

    updateResource('author', {
      firstName: fname,
      lastName: lname,
      biography: biography,
      portraitUrl: imgUrl
    }, function(author) {
      state.author = author;
      toViewMode();
    });
  });

  $('.modal a.confirm-delete')
    .click(deleteResource('author'));

  $('a.delete').click(function (event) {
    if($('.book').length > 0) {
      return Materialize.toast('Please remove all books for this author', 2000);
    }

    $('#confirm').openModal();
  });
}());
