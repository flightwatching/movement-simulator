'use strict';

/**
* @ngdoc function
* @name movementSimulatorApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the movementSimulatorApp
*/
angular.module('movementSimulatorApp')
.controller('MainCtrl', function ($scope, d3, $timeout) {
  let vm=this;

  $timeout(function () {
    doit();
  }, 1000);

  function doit() {

    vm.routes=d3.select('svg').selectAll('path[id$="_route"]');
    vm.positions={};

    function computeArray () {
      let path=this;
      let zeroOne = d3.range(0,1,1/100);
      let l = path.getTotalLength();
      let arr = zeroOne.map(function(t) {
        let p = path.getPointAtLength(t * l);
        return [p.x.toFixed(2), p.y.toFixed(2)];
      });
      let id=path.getAttribute('id').replace('_route', '');
      vm.positions[id]={arr:arr};
      if (l>3000) {
        vm.positions[id].alert=[Math.random()*20, 20+Math.random()*80];
      }
    }

    vm.alertTexts = [
      'BRAKES TEMP: 370F',
      'OIL PRESS LOW',
      'BLEED PRESSURE < 54psi'
    ];
    let currentAlert=0;
//    vm.alerts[3][3]=d3.range(10,90);

    vm.routes.each(computeArray);
    vm.frames = d3.range(100).map(i => {
      let ret = [];
      for (var path in vm.positions) {
        console.log(path);
        let pos = vm.positions[path];
        if (vm.positions.hasOwnProperty(path)) {
          d3.range(1,11).map(j=>{
            let idx=(i+(j*10))%100;
            let line = {x:pos.arr[idx][0], y:pos.arr[idx][1]};
            if (j===1 && pos.alert && pos.alert[0]<i && pos.alert[1]>i) {
              line.alert = vm.alertTexts[(currentAlert++)%vm.alertTexts.length];
            }
            let prev=(idx-1+99)%100;
            let dist =
              (pos.arr[idx][0]-pos.arr[prev][0])*(pos.arr[idx][0]-pos.arr[prev][0]) +
              (pos.arr[idx][1]-pos.arr[prev][1])*(pos.arr[idx][1]-pos.arr[prev][1]);
            line.d=dist.toFixed(0);
            ret.push(line);
          });
        }
      }
      return ret;
    });

  }


  vm.formatFrames = function() {
    if (!vm.frames) {
      return 'COMPUTING';
    }
    let ret = vm.frames.reduce((ret, f) => {
      return ret+JSON.stringify(f)+',\n';
    }, '[');
    return ret.substring(0, ret.length-2)+']';
  };


});
