(function() {
  "use strict";

  angular
    .module("spa-demo.types")
    .component("sdCurrentImages1", {
      templateUrl: imagesTemplateUrl,
      controller: CurrentImagesController,
    })
    .component("sdCurrentImageViewer1", {
      templateUrl: imageViewerTemplateUrl,
      controller: CurrentImageViewerController,
      bindings: {
        name: "@",
        minWidth: "@"
      }
    })
    ;

  imagesTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function imagesTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.current_images_html;
  }    
  imageViewerTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function imageViewerTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.current_image_viewer_html;
  }    

  CurrentImagesController.$inject = ["$scope",
                                     "spa-demo.types.currentTypes"];
  function CurrentImagesController($scope, currentTypes) {
    var vm=this;
    vm.imageClicked = imageClicked;
    vm.isCurrentImage = currentTypes.isCurrentImageIndex;

    vm.$onInit = function() {
      console.log("CurrentImagesController",$scope);
    }
    vm.$postLink = function() {
      $scope.$watch(
        function() { return currentTypes.getImages(); }, 
        function(images) { vm.images = images; }
      );
    }    
    return;
    //////////////
    function imageClicked(index) {
      currentTypes.setCurrentImage(index);
    }
  }

  CurrentImageViewerController.$inject = ["$scope",
                                          "spa-demo.types.currentTypes"];
  function CurrentImageViewerController($scope, currentTypes) {
    var vm=this;
    vm.viewerIndexChanged = viewerIndexChanged;

    vm.$onInit = function() {
      console.log("CurrentImageViewerController",$scope);
    }
    vm.$postLink = function() {
      $scope.$watch(
        function() { return currentTypes.getImages(); }, 
        function(images) { vm.images = images; }
      );
      $scope.$watch(
        function() { return currentTypes.getCurrentImageIndex(); }, 
        function(index) { vm.currentImageIndex = index; }
      );
    }    
    return;
    //////////////
    function viewerIndexChanged(index) {
      console.log("viewer index changed, setting currentImage", index);
      currentTypes.setCurrentImage(index);
    }
  }

})();
