'use strict';
//module.exports is the actual object which is exported out of a module.
//using module.exports you can export the entire object containing the properties and methods all at once.

/* 
module.exports = function(){
   This is a constructor function
 } 
 */

module.exports = function(){
     return {
       hello: (user) =>{
        return 'Hello ' + user;
       },
       goodmorning: (user) =>{
           return 'Goodmorning '+ user;
       }
     }
}