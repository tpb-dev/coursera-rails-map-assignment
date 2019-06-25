(function() {
  "use strict";

  angular
    .module("spa-demo.types")
    .factory("spa-demo.types.ThingImage", ThingImage);

  ThingImage.$inject = ["$resource", "spa-demo.config.APP_CONFIG"];
  function ThingImage($resource, APP_CONFIG) {
    return $resource(APP_CONFIG.server_url + "/api/things/:thing_id/thing_images/:id",
      { thing_id: '@thing_id', 
        id: '@id'},
      { update: {method:"PUT"} 
      });
  }

})();