(function() {
  'use strict';

  $('.parallax').parallax();

  $.getJSON('/authors')
    .done((authors) => {
      const $authors = $('#authors');

      for (const author of authors) {
        const name = `${author.firstName} ${author.lastName}`;
        const $anchor = $('<a>').attr('href', `/author.html?id=${author.id}`);
        const $author = $('<div>')
          .addClass('col s12 m4 l3 center-align author');
        const $img = $('<img>').attr({ src: author.portraitUrl, alt: name });
        const $name = $('<div>').text(name);

        $anchor.append($img);
        $anchor.append($name);
        $author.append($anchor);
        $authors.append($author);
      }
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve authors', 3000);
    });
})();
