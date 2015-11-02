angular.module('starter.controllers', [])

.controller('SignInCtrl', function($scope, $state, Forms) {

  $scope.start = function(data){
    if(data && data.emergencyCode){
      Forms.setEmergencyCode(data.emergencyCode);
      $state.go('tab.forms');
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
  $scope.beneficiary = {gender: 'M'};

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
      hideLoading();
      $state.go('tab.forms');
    });

  };

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
