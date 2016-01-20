angular.module('adra.services', [])

.factory('Api', function($http, Forms, EmergencyCode) {

  // @TODO: Create gulp task to manage this
  // var API_PATH      = 'https://adra-api.herokuapp.com';
  var API_PATH      = 'http://localhost:9090';

  var emergencyCode = EmergencyCode.getEmergencyCode();
  
  return {
    postBeneficiary: function(beneficiary){
      beneficiary.emergencyCode = emergencyCode;
      return $http.post(API_PATH + '/beneficiary', beneficiary);
    }
  };
})

.factory('EmergencyCode', function() {

  var emergencyCode = null;

  return {
    getEmergencyCode: function(){
      return emergencyCode || window.localStorage.emergencyCode;
    },
    setEmergencyCode: function(code){
      window.localStorage.emergencyCode = code;
    }
  };
})

.factory('Loading', function($ionicLoading) {
  return {
    show: function(text){
      $ionicLoading.show({
        template: text
      });
    },
    hide: function(code){
      $ionicLoading.hide();
    }
  };
})

.factory('OfflineForms', function() {

  var forms = JSON.parse(window.localStorage.getItem("OfflineForms")) || [];

  return {
    add: function(form){
      forms.push(form);
      window.localStorage.setItem("OfflineForms", JSON.stringify(forms));
    },
    getAll: function(code){
      return forms;
    },
    remove: function(form) {
      forms.splice(forms.indexOf(form), 1);
      window.localStorage.setItem("OfflineForms", JSON.stringify(forms));
    },
    removeAll: function(){
      forms.splice(0, forms.length);
      window.localStorage.setItem("OfflineForms", JSON.stringify(forms));
    }
  };
})

.factory('Forms', function() {
  
  var forms = [{
    id: 0,
    name: 'Form 1',
    lastText: 'Description',
    icon: 'img/doc.png'
  }];

  return {

    all: function() {
      return forms;
    },
    remove: function(form) {
      forms.splice(forms.indexOf(form), 1);
    },
    get: function(formId) {
      for (var i = 0; i < forms.length; i++) {
        if (forms[i].id === parseInt(formId)) {
          return forms[i];
        }
      }
      return null;
    }

  };
});
