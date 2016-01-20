angular.module('starter.controllers', [])

.controller('SignInCtrl', function($scope, $state, $ionicPopup, Forms, EmergencyCode) {

  $scope.start = function(data){
    if(data && (data.emergencyCode.toLowerCase() === 'demo')){
      //For this prototype we use a hardcoded ID of an Emergency
      EmergencyCode.setEmergencyCode('5636e2e3d587f3c81ea9875d');
      $state.go('tab.forms');
    }
    else{
      var alertPopup = $ionicPopup.alert({
         title: 'Ooops!',
         template: 'You have to enter "demo"'
       });
    }
  };
})

.controller('DashCtrl', function($scope, $timeout, Loading, OfflineForms, Api) {

  $scope.offlineForms = OfflineForms.getAll();

  var sendForm = function(form, lastOne){
    Api.postBeneficiary(form)
    .then(function(data){
      OfflineForms.remove(form);
      if(lastOne){
        Loading.hide();
      }
    })
    .catch(function(e){
      if(lastOne){
        Loading.hide();
      }
    });
  };

  $scope.sendAll = function(){
    Loading.show('Sending all the items');
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
    Loading.show('Item saved');
    $timeout(function() {
      Loading.hide();
    }, 1500);
    $state.go('tab.forms');
  };

  $scope.send = function(beneficiary){

    Loading.show('Uploading information');

    Api.postBeneficiary(beneficiary)
    .then(function(data){
      Loading.hide();
      $state.go('tab.forms');
    })
    .catch(function(e){
      OfflineForms.add(beneficiary);
      Loading.show('A problem ocurred. The item was saved in pendings.');
      $timeout(function() {
        Loading.hide();
        $state.go('tab.forms');
      }, 2000);
    });

  };

})

.controller('AccountCtrl', function($scope, $ionicPopup, Loading, OfflineForms) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.removeAll = function(){
    var confirmPopup = $ionicPopup.confirm({
      title: 'Confirm',
      template: 'Are you sure?'
    });
    confirmPopup.then(function(res) {
     if(res) {
       OfflineForms.removeAll();
     }
    });
  };
});
