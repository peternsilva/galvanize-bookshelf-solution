(function() {
  'use strict';

  var cookies = {};
  document.cookie.split('; ').forEach(function(prop) {
    var propKey = prop.split('=')[0];
    var propValue = prop.split('=')[1];
    cookies[propKey] = propValue;
  });

  if(cookies.userId) {
    console.log('User Exists');
  }

  $('.button-collapse').sideNav();
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
      url: 'http://localhost:8000/users',
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

      Materialize.toast('User Created', 2000);
    });

    $xhr.fail(function() {
      Materialize.toast('User could not be created. Please try again.');
    });
  });
})();
