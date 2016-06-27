(function() {
  var authors = window.HELPERS.displayResources('author', function(author) {
    var name = `${author.firstName} ${author.lastName}`;
    return {
      id: author.id,
      title: name,
      imageUrl: author.portraitUrl
    };
  }, function (authors) {
    $('.authors .row').append(authors);
  });

  $('.parallax').parallax();
}());
