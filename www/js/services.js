angular.module('starter.services', [])

.factory('Api', function($http, Forms, EmergencyCode) {

  // var API_PATH      = 'http://localhost:9090';
  var API_PATH      = 'https://adra-api.herokuapp.com';
  var emergencyCode = EmergencyCode.getEmergencyCode();
  
  // @TODO: Check connection

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

.factory('Forms', function() {
  
  var forms = [{
    id: 0,
    name: 'Distribución',
    lastText: 'Descripción',
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
