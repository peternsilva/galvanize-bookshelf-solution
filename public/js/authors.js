(function() {
  var authors = window.HELPERS.displayResources('author', function(author) {
    var name = `${author.first_name} ${author.last_name}`;
    return {
      id: author.id,
      title: name,
      imageUrl: author.portrait_url
    };
  }, function (authors) {
    $('.authors .row').append(authors);
  });

  $('.parallax').parallax();
}());
