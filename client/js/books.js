(function() {
  $('.button-collapse').sideNav();
  
  var $xhr = $.getJSON('http://localhost:8000/books')
  $xhr.done(function (data) {
    var $book, $img, $a, $link;
    for(var book of data) {
      $book = $('<div class="col s12 m4 l3 center-align book">');
      $a = $(`<a href="book.html?id=${book.id}">`);
      $link = $('<div>')
        .append($a.clone().text(book.title));
      $img = $('<img>').attr('src', book.cover_url).attr('alt', book.title);

      $book.append($('<div>').append($a.append($img)));
      $book.append($link);
      $('.books .row').append($book);
    }
  });
}());
