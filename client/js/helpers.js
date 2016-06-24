(function() {

  window.HELPERS = {}
  window.HELPERS.displayResources = function (resourceName, convert) {
    var plural = `${resourceName}s`;
    var $xhr = $.getJSON(`http://localhost:8000/${plural}`)
    $xhr.done(function (resources) {
      if($xhr.status !== 200) {
        return Materialize.toast(`Unable to retrieve ${plural}. Please try again.`, 2000);
      }

      var $resource, $img, $a, $link, converted;
      for(var resource of resources) {
        // Conform to a certain structure for use below
        converted = convert(resource);
        $resource = $(`<div class="col s12 m4 l3 center-align ${resourceName}">`);
        $a = $(`<a href="${resourceName}.html?id=${converted.id}">`);
        $link = $('<div>')
          .append($a.clone().text(converted.title));
        $img = $('<img>')
          .attr('src', converted.imageUrl)
          .attr('alt', converted.title);

        $resource.append($('<div>').append($a.append($img)));
        $resource.append($link);
        $(`.${plural} .row`).append($resource);
      }
    });
  }
}());
