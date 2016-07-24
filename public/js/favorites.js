(function() {
  'use strict';

  $('.parallax').parallax();

  $.getJSON('/favorites')
    .done((favorites) => {
      const $favs = $('#favorites');

      for (const favs of favorites) {
        const $anchor = $('<a>').attr('href', `/book.html?id=${favs.bookId}`);
        const $fav = $('<div>').addClass('col s12 m4 l3 center-align fav');
        const $img = $('<img>').attr({ src: favs.coverUrl, alt: favs.title });
        const $title = $('<div>').text(favs.title);

        $anchor.append($img);
        $anchor.append($title);
        $fav.append($anchor);
        $favs.append($fav);
      }
    })
    .fail(() => {
      window.location.href = '/signup.html';
    });
})();
