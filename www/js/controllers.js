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

.controller('DashCtrl', function($scope) {

})

.controller('FormsCtrl', function($scope, Forms) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.forms = Forms.all();
  $scope.remove = function(form) {
    Forms.remove(form);
  };
})

.controller('FormDetailCtrl', function($scope, $state, $stateParams, $ionicLoading, $timeout, Forms, Api) {

  $scope.form = Forms.get($stateParams.formId);
  $scope.beneficiary = {
    gender: 'M',
    ticketNumber: 123
  };

  var showLoading = function() {
    $ionicLoading.show({
      template: 'Subiendo información...'
    });
  };

  var hideLoading = function(){
    $ionicLoading.hide();
  };

  $scope.send = function(beneficiary){

    showLoading();

    Api.postBeneficiary(beneficiary)
    .then(function(data){
      console.log(data);
      hideLoading();
      $state.go('tab.forms');
    })
    .catch(function(e){
      console.log(e);
      $ionicLoading.show({
        template: 'Ocurrió un error'
      });
      $timeout(function() {
        hideLoading();
      }, 1500);
    });

  };

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
