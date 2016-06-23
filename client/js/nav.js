(function() {
  $('.button-collapse').sideNav();

  window.COOKIES = {};
  document.cookie.split('; ').forEach(function(prop) {
    var propKey = prop.split('=')[0];
    var propValue = prop.split('=')[1];
    window.COOKIES[propKey] = propValue;
  });

  if(window.COOKIES.userId) {
    $('.session').text('Logout').click(function(event) {
      var $xhr = $.ajax({
        url: 'http://localhost:8000/users/authentication',
        type: 'DELETE',
      });

      $xhr.done(function() {
        if($xhr.status !== 200) {
          return Materialize.toast('Unable to log out. Please try again.');
        }

        window.location.href = '/';
      });

      $xhr.fail(function() {
        Materialize.toast('Unable to log out. Please try again.');
      });
    });
  }

}());
