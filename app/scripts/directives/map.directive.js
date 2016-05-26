(function() {
  'use strict';

	function MapCtrl() {
    let vm = this;
  }


  function MapDirective($filter) {
    return {
      restrict: 'E',
      replace: true,
      //require: 'ngModel',
      transclude: false,
      scope: {
      },
      bindToController: false, //Bind scope variable to the controller, ie this.member
      //controller: mapCtrl,
      //controllerAs: 'vm',
      templateUrl: 'views/map.directive.html',

    };
  }

  /**
   * Removes server error when user updates input
   */
  angular.module('movementSimulatorApp')
    .directive('map', MapDirective);

})();
