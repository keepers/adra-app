angular.module('starter.services', [])

.factory('Forms', function() {
  
  var emergencyCode = null;

  // Some fake testing data
  var forms = [{
    id: 0,
    name: 'Lista de beneficiarios',
    lastText: 'Descripción',
    icon: 'img/doc.png'
  }, {
    id: 1,
    name: 'Encuesta',
    lastText: 'Descripción',
    icon: 'img/doc.png'
  }];

  return {

    getEmergencyCode: function(){
      return emergencyCode;
    },
    setEmergencyCode: function(code){
      emergencyCode = code;
    },

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
