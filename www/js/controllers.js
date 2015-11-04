angular.module('starter.controllers', [])

.controller('SignInCtrl', function($scope, $state, Forms, EmergencyCode) {

  $scope.start = function(data){
    // $scope.data = {emergencyCode: '5636e2e3d587f3c81ea9875d'};
    if(data && (data.emergencyCode.toLowerCase() === 'demo')){
      // EmergencyCode.setEmergencyCode(data.emergencyCode);
      EmergencyCode.setEmergencyCode('5636e2e3d587f3c81ea9875d');
      $state.go('tab.forms');
    }
    else{
      alert('Ingrese \'demo\'');
    }
  };
})

.controller('DashCtrl', function($scope, $timeout, Loading, OfflineForms, Api) {

  $scope.offlineForms = OfflineForms.getAll();

  var sendForm = function(form, lastOne){
    Api.postBeneficiary(form)
    .then(function(data){
      console.log(data);
      OfflineForms.remove(form);
      if(lastOne){
        Loading.hide();
      }
    })
    .catch(function(e){
      console.log(e);
      if(lastOne){
        Loading.hide();
      }
    });
  };

  $scope.sendAll = function(){
    Loading.show('Enviando todos');
    for (var i = $scope.offlineForms.length - 1; i >= 0; i--) {
      var form = $scope.offlineForms[i];
      var lastOne = i === 0;
      sendForm(form, lastOne);
    }

  };

})

.controller('FormsCtrl', function($scope, Forms) {
  $scope.forms = Forms.all();
})

.controller('FormDetailCtrl', function($scope, $state, $stateParams, Loading, $timeout, OfflineForms, Forms, Api) {

  $scope.form = Forms.get($stateParams.formId);

  $scope.beneficiary = {
    gender: 'M',
    ticketNumber: 123
  };

  $scope.saveOffline = function(beneficiary){
    OfflineForms.add(beneficiary);
    Loading.show('Item guardado');
    $timeout(function() {
      Loading.hide();
    }, 1500);
    $state.go('tab.forms');
  };

  $scope.send = function(beneficiary){

    Loading.show('Subiendo la información');

    Api.postBeneficiary(beneficiary)
    .then(function(data){
      console.log(data);
      Loading.hide();
      $state.go('tab.forms');
    })
    .catch(function(e){
      console.log(e);
      OfflineForms.add(beneficiary);
      Loading.show('Ocurrió un error');
      $timeout(function() {
        Loading.hide();
      }, 1500);
    });

  };

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
