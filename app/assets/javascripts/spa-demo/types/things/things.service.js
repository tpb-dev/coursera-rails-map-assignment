(function() {
  "use strict";

  angular
    .module("spa-demo.types")
    .factory("spa-demo.types.Thing", ThingFactory);

  ThingFactory.$inject = ["$resource","spa-demo.config.APP_CONFIG"];
  function ThingFactory($resource, APP_CONFIG) {
    var service = $resource(APP_CONFIG.server_url + "/api/things/:id",
        { id: '@id'},
        { update: {method:"PUT"} }
      );
    return service;
  }
})();