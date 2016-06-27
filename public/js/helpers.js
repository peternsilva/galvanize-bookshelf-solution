(function() {
  var displayResources = function (resourceName, convert, callback) {
    var plural = `${resourceName}s`;
    var $xhr = $.getJSON(`/${plural}`)
    $xhr.done(function (resources) {
      if($xhr.status !== 200) {
        return Materialize.toast(`Unable to retrieve ${plural}. Please try again.`, 2000);
      }

      return callback(resources.map(function(resource) {
        var $resource, $img, $a, $link, converted;

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
        return $resource;
      }));
    });
  };

  var updateResource = function (resourceName, data, callback) {
    let $xhr;
    const dataJSON = JSON.stringify(data);

    if(window.QUERY_PARAMETERS.id) {
      $xhr = $.ajax({
        url: `/${resourceName}s/${window.QUERY_PARAMETERS.id}`,
        type: 'PUT',
        contentType: 'application/json',
        data: dataJSON
      });
    } else {
      $xhr = $.ajax({
        url: `/${resouceName}s`,
        type: 'POST',
        contentType: 'application/json',
        data: dataJSON
      });
    }

    $xhr.done(function(author) {
      if($xhr.status !== 200) {
        Materialize.toast('Save failed. Please try again.', 2000);
      }

      callback(author);
    });

    $xhr.fail(function(result) {
      Materialize.toast('Save failed. Please try again.', 2000);
    });
  };

  var deleteResource = function (resourceName) {
    var plural = `${resourceName}s`;
    return function(event) {
      var $delXhr = $.ajax({
        url: `/${plural}/${window.QUERY_PARAMETERS.id}`,
        type: 'DELETE'
      });
      $delXhr.done(function() {
        if($delXhr.status !== 200) {
          Materialize.toast('Delete failed. Please try again.', 2000);
        }

        window.location.href = `${plural}.html`;
      });
      $delXhr.fail(function(result) {
        Materialize.toast('Delete failed. Please try again.', 2000);
      });
    }
  };

  var getState = function(requestMap, callback) {
    var state = {};
    var requestCompletedCount = 0;
    var requestCount = Object.keys(requestMap).length;
    var requestUrl, $xhr;
    for(stateName in requestMap) {
      requestUrl = requestMap[stateName];
      $xhr = $.getJSON(requestUrl);
      (function ($xhr, stateName) {
        $xhr.done(function (resBody) {
          if ($xhr.status !== 200) {
            return Materialize.toast(`Unable to retrieve ${stateName}. Please try again.`, 2000);
          }

          state[stateName] = resBody;
          requestCompletedCount += 1;
          if(requestCount === requestCompletedCount) {
            return callback(state);
          }
        });
        $xhr.fail(function () {
          return Materialize.toast(`Unable to retrieve ${stateName}. Please try again.`, 2000);
        });
      }($xhr, stateName));

    }
  }

  window.HELPERS = {
    displayResources,
    updateResource,
    deleteResource,
    getState
  };
}());
