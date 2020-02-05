const swal = require('sweetalert');

angular.module('reg')
  .controller('ConfirmationCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    'currentUser',
    'Utils',
    'UserService',
    function($scope, $rootScope, $state, currentUser, Utils, UserService){

      // Set up the user
      var user = currentUser.data;
      $scope.user = user;

      $scope.pastConfirmation = Date.now() > user.status.confirmBy;

      $scope.formatTime = Utils.formatTime;

      _setupForm();

      $scope.fileName = user._id + "_" + user.profile.name.split(" ").join("_");

      // -------------------------------

      function _updateUser(e){
        var confirmation = $scope.user.confirmation;

        UserService
          .updateConfirmation(user._id, confirmation)
          .then(response => {
            if(response.data.confirmation.confirm == true) {
              swal("Woo!", "You're confirmed!", "success").then(value => {
              $state.go("app.dashboard");
            });
            }
            else {
              swal("We'll Miss You!", "Your attendance is no longer confirmed.", "success").then(value => {
              $state.go("app.dashboard");
            });
            }
          }, response => {
            swal("Uh oh!", "Something went wrong.", "error");
          });
      }

      function _setupForm(){
        // Semantic-UI form validation
        $('.ui.form').form({
          fields: {
            confirm: {
              identifier: 'confirm',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please confirm your attendance!'
                }
              ]
            },
          }
        });
      }

      $scope.submitForm = function(){
        if ($('.ui.form').form('is valid')){
          _updateUser();
        }
      };

    }]);
