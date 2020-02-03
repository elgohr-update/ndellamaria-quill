const angular = require('angular');
const moment = require('moment');

angular.module('reg')
  .factory('Utils', [
    function(){
      return {
        isRegOpen: function(settings){
          return Date.now() > settings.timeOpen && Date.now() < settings.timeClose;
        },
        isAfter: function(time){
          return Date.now() > time;
        },
        formatTime: function(time){

          if (!time){
            return "Invalid Date";
          }

          date = new Date(time);
          // Hack for timezone
          return moment(date).format('dddd, MMMM Do YYYY, h:mm a') +
            " " + date.toTimeString().substring(18);

        }
        // function calcTime(city, offset) {
        //     // create Date object for current location
        //     d = new Date();
           
        //     // convert to msec
        //     // add local time zone offset
        //     // get UTC time in msec
        //     utc = d.getTime() + (d.getTimezoneOffset() * 60000);
           
        //     // create new Date object for different city
        //     // using supplied offset
        //     nd = new Date(utc + (3600000*offset));
           
        //     // return time as a string
        //     return "The local time in " + city + " is " + nd.toLocaleString();
        // }
      };
    }]);
