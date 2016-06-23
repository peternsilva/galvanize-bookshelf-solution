(function() {
  $('.button-collapse').sideNav();

  var $xhr = $.getJSON('http://localhost:8000/authors')
  $xhr.done(function (authors) {
    if($xhr.status !== 200) {
      return Materialize.toast('Unable to retrieve authors. Please try again.', 2000);
    }

    var $author, $img, $a, $link, name;
    for(var author of authors) {
      name = `${author.first_name} ${author.last_name}`
      $author = $('<div class="col s12 m4 l3 center-align author">');
      $a = $(`<a href="author.html?id=${author.id}">`);
      $link = $('<div>')
        .append($a.clone().text(name));
      $img = $('<img>').attr('src', author.portrait_url)
        .attr('alt', name);

      $author.append($('<div>').append($a.append($img)));
      $author.append($link);
      $('.authors .row').append($author);
    }
  });
}());
