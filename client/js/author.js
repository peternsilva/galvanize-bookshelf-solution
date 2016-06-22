(function() {
  var imgUrlValid = true;

  $('.button-collapse').sideNav();
  $('.modal-trigger').leanModal();
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
      .val($name.text().split(' ')[0]);

    var $lastNameInput = $('<input type="text">')
      .addClass('last-name')
      .val($name.text().split(' ')[1]);

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

  $('.modal a.confirm-delete').click(function (event) {
    window.location.href = 'authors.html';
  });

  $('a.delete').click(function (event) {
    if($('.book').length > 0) {
      return Materialize.toast('Please remove all books for this author', 2000);
    }
    
    $('#confirm').openModal();
  });
}());
