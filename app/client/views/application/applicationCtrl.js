const angular = require("angular");
const swal = require("sweetalert");

angular.module('reg')
  .controller('ApplicationCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    '$http',
    'currentUser',
    'settings',
    'Session',
    'UserService',
    function($scope, $rootScope, $state, $http, currentUser, settings, Session, UserService) {

      // Set up the user
      var user = currentUser.data;
      $scope.user = user;

      $scope.steps = [true, false, false, false, false];
      $scope.updateStep = (stepToDisable, stepToEnable) => {
      $scope.steps[stepToDisable] = false;
      $scope.steps[stepToEnable] = true;
      };

    _setupForm();
    // -------------------------------
    // All this just for dietary restriction checkboxes fml

      var dietaryRestrictions = {
        'Vegetarian': false,
        'Vegan': false,
        'Halal': false,
        'Kosher': false,
        'Nut Allergy': false
      };

      if (user.profile.dietaryRestrictions){
        user.profile.dietaryRestrictions.forEach(function(restriction){
          if (restriction in dietaryRestrictions){
            dietaryRestrictions[restriction] = true;
          }
        });
      }


      $scope.dietaryRestrictions = dietaryRestrictions;

      

      function _updateUser(e){
        var profile = $scope.user.profile;
        // Get the dietary restrictions as an array
        var drs = [];
        Object.keys($scope.dietaryRestrictions).forEach(function(key){
          if ($scope.dietaryRestrictions[key]){
            drs.push(key);
          }
        });
        profile.dietaryRestrictions = drs;

        UserService
          .updateProfile(Session.getUserId(), $scope.user.profile)
          .then(response => {
            swal("Awesome!", "Your application has been saved.", "success").then(value => {
              $state.go("app.dashboard");
            });
          }, response => {
            swal("Uh oh!", "Something went wrong.", "error");
          });
      }

      function isMinor() {
        return !$scope.user.profile.adult;
      }

      function minorsAreAllowed() {
        return settings.data.allowMinors;
      }

      function minorsValidation() {
        // Are minors allowed to register?
        if (isMinor() && !minorsAreAllowed()) {
          return false;
        }
        return true;
      }

      function _setupForm(){
        // Custom minors validation rule
        $.fn.form.settings.rules.allowMinors = function (value) {
          return minorsValidation();
        };

        // Semantic-UI form validation
        $('.ui.form').form({
          inline: true,
          fields: {
            name: {
              identifier: 'name',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please enter your name.'
                }
              ]
            },
            phone: {
              identifier: "phone",
              rules: [
                {
                  type: "empty",
                  prompt: "Please enter a phone number."
                }
              ]
            },
            age: {
              identifier: 'age',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please enter your age.'
                }
              ]
            },
            // gender: {
            //   identifier: 'gender',
            //   rules: [
            //     {
            //       type: 'empty',
            //       prompt: 'Please select a gender.'
            //     }
            //   ]
            // },
            shirt: {
              identifier: 'shirt',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please give us a shirt size!'
                }
              ]
            },
            educationLevel: {
              identifier: 'educationLevel',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please select an education level.'
                }
              ]
            },
            school: {
              identifier: 'school',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please enter your school name.'
                }
              ]
            },
            // year: {
            //   identifier: 'year',
            //   rules: [
            //     {
            //       type: 'empty',
            //       prompt: 'Please select your graduation year.'
            //     }
            //   ]
            // },
            // employment: {
            //   identifier: 'employment',
            //   rules: [
            //     {
            //       type: 'empty',
            //       prompt: 'Please select an employment status.'
            //     }
            //   ]
            // },
            // description: {
            //   identifier: "description",
            //   rules: [
            //     {
            //       type: "empty",
            //       prompt: "Please tell us what your role will be."
            //     }
            //   ]
            // },
            // languages: {
            //   identifier: "languages",
            //   rules: [
            //     {
            //       type: "empty",
            //       prompt: "Please enter a programming language you know."
            //     }
            //   ]
            // },
            focus: {
              identifier: "focus",
              rules: [
                {
                  type: "empty",
                  prompt: "Please select the based on experience level."
                }
              ]
            },
            essay: {
              identifier: "essay",
              rules: [
                {
                  type: "empty",
                  prompt: "Please tell us why you want to attend BothoHacks."
                }
              ]
            },
            signatureLiability: {
              identifier: 'signatureLiabilityWaiver',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please type your digital signature.'
                }
              ]
            },
            signaturePhotoRelease: {
              identifier: 'signaturePhotoRelease',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please type your digital signature.'
                }
              ]
            },
            signatureCodeOfConduct: {
              identifier: 'signatureCodeOfConduct',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please type your digital signature.'
                }
              ]
            },
          }
        });
      }

      $scope.submitForm = function(){
        if ($('.ui.form').form('is valid')){
          _updateUser();
        } else {
          swal("Uh oh!", "Please Fill The Required Fields", "error");
        }
      };
    }]);



// // Is the student from MIT?
// $scope.isMitStudent = $scope.user.email.split('@')[1] == 'mit.edu';

// // If so, default them to adult: true
// if ($scope.isMitStudent){
//   $scope.user.profile.adult = true;
// }


// Populate the school dropdown
// populateSchools();
// _setupForm();

// $scope.regIsClosed = Date.now() > settings.data.timeClose;

// /**
//  * TODO: JANK WARNING
//  */
// function populateSchools(){
//   $http
//     .get('/assets/schools.json')
//     .then(function(res){
//       var schools = res.data;
//       var email = $scope.user.email.split('@')[1];

//       if (schools[email]){
//         $scope.user.profile.school = schools[email].school;
//         $scope.autoFilledSchool = true;
//       }
//     });

//   $http
//     .get('/assets/schools.csv')
//     .then(function(res){
//       $scope.schools = res.data.split('\n');
//       $scope.schools.push('Other');

//       var content = [];

//       for(i = 0; i < $scope.schools.length; i++) {
//         $scope.schools[i] = $scope.schools[i].trim();
//         content.push({title: $scope.schools[i]})
//       }

//       $('#school.ui.search')
//         .search({
//           source: content,
//           cache: true,
//           onSelect: function(result, response) {
//             $scope.user.profile.school = result.title.trim();
//           }
//         })
//     });
// }