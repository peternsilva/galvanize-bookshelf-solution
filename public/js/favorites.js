(function() {
  'use strict';

  $('.parallax').parallax();

  $.getJSON('/favorites')
    .done((favorites) => {
      const $favs = $('#favorites');

      for (const favs of favorites) {
        const $anchor = $('<a>').attr('href', `/book.html?id=${favs.bookId}`);
        const $card = $('<div>').addClass('card');
        const $cardImage = $('<div>').addClass('card-image');
        const $col = $('<div>').addClass('col s6 m4 l3');
        const $img = $('<img>').attr({ src: favs.coverUrl, alt: favs.title });

        $cardImage.append($img);
        $anchor.append($cardImage);
        $card.append($anchor)
        $col.append($card);
        $favs.append($col);
      }
    })
    .fail(() => {
      window.location.href = '/signup.html';
    });
})();
