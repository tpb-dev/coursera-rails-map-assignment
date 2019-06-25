(function() {
  "use strict";

  angular
    .module("spa-demo.types")
    .component("sdCurrentThings1", {
      templateUrl: thingsTemplateUrl,
      controller: CurrentThingsController,
    })
    .component("sdCurrentThingInfo1", {
      templateUrl: thingInfoTemplateUrl,
      controller: CurrentThingInfoController,
    })
    ;

  thingsTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function thingsTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.current_things_html;
  }    
  thingInfoTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function thingInfoTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.current_thing_info_html;
  }    

  CurrentThingsController.$inject = ["$scope",
                                     "spa-demo.types.currentTypes"];
  function CurrentThingsController($scope,currentTypes) {
    var vm=this;
    vm.thingClicked = thingClicked;
    vm.isCurrentThing = currentTypes.isCurrentThingIndex;

    vm.$onInit = function() {
      console.log("CurrentThingsController",$scope);
    }
    vm.$postLink = function() {
      $scope.$watch(
        function() { return currentTypes.getThings(); }, 
        function(things) { vm.things = things; }
      );
    }    
    return;
    //////////////
    function thingClicked(index) {
      currentTypes.setCurrentThing(index);
    }    
  }

  CurrentThingInfoController.$inject = ["$scope",
                                        "spa-demo.types.currentTypes",
                                        "spa-demo.types.Thing",
                                        "spa-demo.authz.Authz"];
  function CurrentThingInfoController($scope,currentTypes, Thing, Authz) {
    var vm=this;
    vm.nextThing = currentTypes.nextThing;
    vm.previousThing = currentTypes.previousThing;

    vm.$onInit = function() {
      console.log("CurrentThingInfoController",$scope);
    }
    vm.$postLink = function() {
      $scope.$watch(
        function() { return currentTypes.getCurrentThing(); }, 
        newThing 
      );
      $scope.$watch(
        function() { return Authz.getAuthorizedUserId(); },
        function() { newThing(currentTypes.getCurrentThing()); }
      );        
    }    
    return;
    //////////////
    function newThing(link) {
      vm.link = link; 
      vm.thing = null;
      if (link && link.thing_id) {
        vm.thing=Thing.get({id:link.thing_id});
      }
      
    }







  }
})();
