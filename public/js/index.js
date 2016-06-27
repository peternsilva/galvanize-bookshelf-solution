(function() {
  'use strict';

  if(window.COOKIES.userId) {
    var container = $('<div class="container">');
    var h1 = $('<h1>').text('My Library');
    var row = $('<div class="row">');

    container.append(h1);
    container.append(row);

    var $xhr = $.getJSON(`/users/${window.COOKIES.userId}/books`);
    $xhr.done(function (books) {
      if($xhr.status !== 200) {
        return Materialize.toast('Unable to retrieve books. Please try again.', 2000);
      }

      var $book, $img, $a, $link;
      for(var book of books) {
        $book = $('<div class="col s12 m4 l3 center-align book">');
        $a = $(`<a href="book.html?id=${book.id}">`);
        $link = $('<div>')
          .append($a.clone().text(book.title));
        $img = $('<img>').attr('src', book.coverUrl).attr('alt', book.title);

        $book.append($('<div>').append($a.append($img)));
        $book.append($link);
        row.append($book);
      }

      $('main .container').replaceWith(container);
    });
  }

  $('.register').click(function(event) {
    var firstName = $('#fname').val().trim();
    var lastName = $('#lname').val().trim();
    var email = $('#email').val().trim();
    var password = $('#password').val();
    var password2 = $('#password2').val();

    // Validation
    if(!firstName) {
      return Materialize.toast('Please enter a first name.', 2000);
    }

    if(!lastName) {
      return Materialize.toast('Please enter a last name.', 2000);
    }

    if(!email) {
      return Materialize.toast('Please enter an email.', 2000);
    }

    if(email.indexOf('@') < 0) {
      return Materialize.toast('Please enter a valid email.', 2000);
    }

    if(!password) {
      return Materialize.toast('Please enter a password.', 2000);
    }

    if(password !== password2) {
      return Materialize.toast('Passwords do not match.', 2000);
    }

    var $xhr = $.ajax({
      url: '/users',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
    });

    $xhr.done(function() {
      if($xhr.status === 409) {
        return Materialize.toast('User already exists. Please login.');
      }

      if($xhr.status !== 200) {
        return Materialize.toast('User could not be created. Please try again.');
      }

      window.location.href = '/login.html';
    });

    $xhr.fail(function() {
      Materialize.toast('User could not be created. Please try again.');
    });
  });
})();
