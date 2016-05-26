(function(){
  'use strict';

  function D3Service() {
		return d3;
  }

  angular.module('movementSimulatorApp')
    .factory('d3', D3Service);
})();
